/**
 * Types et Interfaces globaux pour l'application
 * Phase 1 du plan "Backend Ready"
 */

// ==========================================
// 1. Utilisateur et Profil
// ==========================================

export type UserRole = 'rh' | 'dev' | 'juriste' | 'dpo' | 'autre';

export interface UserProfile {
  id: string; // Identifiant unique (sera généré par le backend plus tard)
  name: string;
  role: UserRole;
  companyName?: string;
  createdAt: string; // Date au format ISO
  lastLoginAt: string;
}

// ==========================================
// 2. Progression et Scores
// ==========================================

export interface ModuleProgress {
  moduleId: string;
  isCompleted: boolean;
  score?: number; // Score au quiz s'il y en a un
  completedAt?: string;
}

export interface ExamResult {
  passed: boolean;
  score: number;
  totalQuestions: number;
  completedAt: string;
  certificateId?: string; // Pour générer un certificat unique plus tard
}

export interface UserProgress {
  userId: string;
  modules: Record<string, ModuleProgress>; // Clé = moduleId
  examResult?: ExamResult;
  lastAccessedModuleId?: string;
}

// ==========================================
// 3. Contenu et Favoris
// ==========================================

export type FavoriteType = 'module' | 'tool' | 'practice';

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  title: string;
  url: string;
  addedAt: string;
}

// ==========================================
// 4. Structure Globale de la Base de Données (Mock)
// ==========================================

/**
 * Représente la structure complète des données qui sera sauvegardée
 * dans le localStorage (en attendant un vrai backend).
 */
export interface AppDatabase {
  version: number; // Pour gérer les futures migrations de données
  user: UserProfile | null;
  progress: UserProgress | null;
  favorites: FavoriteItem[];
  settings: {
    theme: 'light' | 'dark' | 'system';
    notificationsEnabled: boolean;
  };
}

// ==========================================
// 5. Réponses API Mockées (Pour la Phase 2)
// ==========================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}
