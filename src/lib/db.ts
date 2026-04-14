import { AppDatabase, UserProfile, UserProgress, FavoriteItem } from '../types/models';

const DB_KEY = 'app_database_v1';

const defaultDatabase: AppDatabase = {
  version: 1,
  user: null,
  progress: null,
  favorites: [],
  settings: {
    theme: 'system',
    notificationsEnabled: true
  }
};

/**
 * Initialise ou récupère la base de données simulée depuis le localStorage.
 * Gère également la migration des anciennes clés éparpillées vers la nouvelle structure unifiée.
 */
export function getDatabase(): AppDatabase {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (data) {
      return JSON.parse(data) as AppDatabase;
    }

    // --- MIGRATION DES ANCIENNES DONNÉES ---
    // Si la nouvelle base n'existe pas, on tente de récupérer les anciennes clés
    const oldProfile = localStorage.getItem('user_profile');
    const oldProgress = localStorage.getItem('course_progress'); // C'était un Set/Array de strings
    const oldFavs = localStorage.getItem('ia-glossary-favs'); // Array de strings

    const db = { ...defaultDatabase };

    if (oldProfile) {
      db.user = {
        id: 'user_' + Date.now(),
        name: 'Utilisateur',
        role: oldProfile as any,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      
      db.progress = {
        userId: db.user.id,
        modules: {},
      };

      if (oldProgress) {
        try {
          const parsedProgress = JSON.parse(oldProgress) as string[];
          parsedProgress.forEach(moduleId => {
            if (db.progress) {
              db.progress.modules[moduleId] = {
                moduleId,
                isCompleted: true,
                completedAt: new Date().toISOString()
              };
            }
          });
        } catch (e) {
          console.error("Erreur lors de la migration de la progression", e);
        }
      }
    }

    if (oldFavs) {
      try {
        const parsedFavs = JSON.parse(oldFavs) as string[];
        db.favorites = parsedFavs.map(favId => ({
          id: favId,
          type: 'tool', // Par défaut pour le glossaire
          title: favId, // On n'a pas le titre exact ici, on met l'ID
          url: '/atelier',
          addedAt: new Date().toISOString()
        }));
      } catch (e) {
        console.error("Erreur lors de la migration des favoris", e);
      }
    }

    // Sauvegarde de la nouvelle structure migrée
    saveDatabase(db);
    
    // Nettoyage optionnel des anciennes clés (commenté pour sécurité pendant la transition)
    // localStorage.removeItem('user_profile');
    // localStorage.removeItem('course_progress');
    // localStorage.removeItem('ia-glossary-favs');

    return db;
  } catch (error) {
    console.error("Erreur lors de la lecture de la base de données", error);
    return defaultDatabase;
  }
}

/**
 * Sauvegarde la base de données complète dans le localStorage.
 */
export function saveDatabase(db: AppDatabase): void {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la base de données", error);
  }
}

/**
 * Met à jour une partie spécifique de la base de données.
 */
export function updateDatabase(updater: (db: AppDatabase) => AppDatabase): AppDatabase {
  const currentDb = getDatabase();
  const newDb = updater(currentDb);
  saveDatabase(newDb);
  return newDb;
}
