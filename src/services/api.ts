import { AppDatabase, UserProfile, UserProgress, FavoriteItem, ApiResponse, UserRole } from '../types/models';
import { getDatabase, updateDatabase } from '../lib/db';

// Simulation de latence réseau (en millisecondes)
const DELAY_MS = 500;

/**
 * Fonction utilitaire pour simuler un délai asynchrone
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fonction utilitaire pour formater les réponses de l'API
 */
function createResponse<T>(data: T | null, error: string | null = null, status: number = 200): ApiResponse<T> {
  return { data, error, status };
}

/**
 * Couche de Service (API Mockée) - Architecture "Backend Ready"
 * 
 * Toutes les fonctions retournent des Promesses pour simuler un vrai backend.
 * Conformément au RGPD et au principe de Privacy by Design, aucune donnée
 * n'est envoyée sur un serveur distant. Tout est stocké localement.
 * 
 * @author Geoffroy Streit <geoffroy.streit@gmail.com>
 */
export const api = {
  // ==========================================
  // UTILISATEUR
  // ==========================================

  async getUser(): Promise<ApiResponse<UserProfile | null>> {
    await delay(DELAY_MS);
    try {
      const db = getDatabase();
      return createResponse(db.user);
    } catch (e) {
      return createResponse(null, "Erreur lors de la récupération du profil", 500);
    }
  },

  async createUser(name: string, role: UserRole, companyName?: string): Promise<ApiResponse<UserProfile>> {
    await delay(DELAY_MS);
    try {
      const newUser: UserProfile = {
        id: 'user_' + Date.now(),
        name,
        role,
        companyName,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      updateDatabase(db => ({ 
        ...db, 
        user: newUser,
        // Initialiser la progression vide pour ce nouvel utilisateur
        progress: { userId: newUser.id, modules: {} } 
      }));
      
      return createResponse(newUser);
    } catch (e) {
      return createResponse(null, "Erreur lors de la création du profil", 500);
    }
  },

  async logout(): Promise<ApiResponse<boolean>> {
    await delay(DELAY_MS);
    try {
      // Dans une vraie app, on supprimerait le token de session.
      // Ici, on pourrait vider la DB locale, mais pour l'instant on simule juste la déconnexion.
      return createResponse(true);
    } catch (e) {
      return createResponse(null, "Erreur lors de la déconnexion", 500);
    }
  },

  // ==========================================
  // PROGRESSION
  // ==========================================

  async getProgress(): Promise<ApiResponse<UserProgress | null>> {
    await delay(DELAY_MS);
    try {
      const db = getDatabase();
      return createResponse(db.progress);
    } catch (e) {
      return createResponse(null, "Erreur lors de la récupération de la progression", 500);
    }
  },

  async updateModuleProgress(moduleId: string, isCompleted: boolean, score?: number): Promise<ApiResponse<UserProgress>> {
    await delay(DELAY_MS);
    try {
      const db = updateDatabase(currentDb => {
        if (!currentDb.progress) return currentDb;
        
        const updatedModules = { ...currentDb.progress.modules };
        updatedModules[moduleId] = {
          moduleId,
          isCompleted,
          score,
          completedAt: isCompleted ? new Date().toISOString() : undefined
        };

        return {
          ...currentDb,
          progress: {
            ...currentDb.progress,
            modules: updatedModules,
            lastAccessedModuleId: moduleId
          }
        };
      });
      return createResponse(db.progress);
    } catch (e) {
      return createResponse(null, "Erreur lors de la mise à jour de la progression", 500);
    }
  },

  // ==========================================
  // FAVORIS
  // ==========================================

  async getFavorites(): Promise<ApiResponse<FavoriteItem[]>> {
    await delay(DELAY_MS);
    try {
      const db = getDatabase();
      return createResponse(db.favorites);
    } catch (e) {
      return createResponse(null, "Erreur lors de la récupération des favoris", 500);
    }
  },

  async toggleFavorite(item: Omit<FavoriteItem, 'addedAt'>): Promise<ApiResponse<FavoriteItem[]>> {
    await delay(DELAY_MS);
    try {
      const db = updateDatabase(currentDb => {
        const exists = currentDb.favorites.some(f => f.id === item.id);
        let newFavorites;
        
        if (exists) {
          // Retirer des favoris
          newFavorites = currentDb.favorites.filter(f => f.id !== item.id);
        } else {
          // Ajouter aux favoris
          newFavorites = [...currentDb.favorites, { ...item, addedAt: new Date().toISOString() }];
        }
        
        return { ...currentDb, favorites: newFavorites };
      });
      return createResponse(db.favorites);
    } catch (e) {
      return createResponse(null, "Erreur lors de la mise à jour des favoris", 500);
    }
  }
};
