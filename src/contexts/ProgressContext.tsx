import React, { createContext, useContext, useState, useEffect } from 'react';
import { navigation } from '@/src/data/navigation';
import { api } from '@/src/services/api';
import { UserProfile, UserRole } from '@/src/types/models';
import { useToast } from '@/src/contexts/ToastContext';

interface ProgressContextType {
  completedItems: string[];
  toggleCompletion: (path: string) => void;
  isCompleted: (path: string) => boolean;
  progressPercentage: number;
  userProfile: UserProfile | null;
  login: (name: string, role: UserRole, company?: string) => Promise<void>;
  logout: () => Promise<void>;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (isOpen: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (isOpen: boolean) => void;
  getNextModule: () => string;
  isLoading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

/**
 * Contexte global de progression et d'authentification (Mock Auth)
 * 
 * Ce contexte gère l'état global de l'application de manière asynchrone,
 * en communiquant avec la couche de service (api.ts).
 * Il implémente des patterns d'Optimistic UI pour une meilleure UX.
 */
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToast } = useToast();

  // Initialisation asynchrone depuis l'API mockée
  useEffect(() => {
    async function initData() {
      setIsLoading(true);
      try {
        const [userRes, progressRes] = await Promise.all([
          api.getUser(),
          api.getProgress()
        ]);

        if (userRes.data) {
          setUserProfileState(userRes.data);
        } else {
          setIsOnboardingOpen(true);
        }

        if (progressRes.data) {
          // Reconstruire le tableau completedItems à partir de l'objet modules
          const completed = Object.values(progressRes.data.modules)
            .filter(m => m.isCompleted)
            .map(m => m.moduleId);
          setCompletedItems(completed);
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation", error);
        addToast("Erreur de connexion au serveur", "error");
      } finally {
        setIsLoading(false);
      }
    }

    initData();
  }, [addToast]);

  const login = async (name: string, role: UserRole, company?: string) => {
    setIsLoading(true);
    try {
      const res = await api.createUser(name, role, company);
      if (res.data) {
        setUserProfileState(res.data);
        setIsOnboardingOpen(false);
        addToast("Profil créé avec succès", "success");
      }
    } catch (error) {
      console.error("Erreur lors de la création du profil", error);
      addToast("Impossible de créer le profil", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.logout();
      setUserProfileState(null);
      setCompletedItems([]); // Réinitialiser la progression locale
      addToast("Déconnexion réussie", "info");
    } catch (error) {
      addToast("Erreur lors de la déconnexion", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCompletion = async (path: string) => {
    const isCurrentlyCompleted = completedItems.includes(path);
    const newStatus = !isCurrentlyCompleted;
    
    // Optimistic UI update
    setCompletedItems(prev => 
      newStatus ? [...prev, path] : prev.filter(p => p !== path)
    );

    // Appel API en arrière-plan
    try {
      await api.updateModuleProgress(path, newStatus);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la progression", error);
      addToast("Échec de la sauvegarde de votre progression", "error");
      // Revert en cas d'erreur (simplifié ici)
      setCompletedItems(prev => 
        !newStatus ? [...prev, path] : prev.filter(p => p !== path)
      );
    }
  };

  const isCompleted = (path: string) => completedItems.includes(path);

  // Calculate total trackable items (exclude home '/')
  const trackableItems = navigation.flatMap(section => section.items).filter(item => item.href !== '/');
  const totalItems = trackableItems.length;
  const completedCount = completedItems.filter(item => trackableItems.some(t => t.href === item)).length;
  const progressPercentage = totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);

  const getNextModule = () => {
    const next = trackableItems.find(item => !completedItems.includes(item.href));
    return next ? next.href : '/module/1';
  };

  return (
    <ProgressContext.Provider value={{ 
      completedItems, 
      toggleCompletion, 
      isCompleted, 
      progressPercentage, 
      userProfile, 
      login,
      logout,
      isOnboardingOpen, 
      setIsOnboardingOpen, 
      isAboutOpen, 
      setIsAboutOpen, 
      getNextModule,
      isLoading
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
