import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { ChevronRight, Menu, X, Shield, CheckCircle2, Maximize, Minimize, Star, Info, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { navigation } from "@/src/data/navigation";
import { useProgress } from "@/src/contexts/ProgressContext";
import { profileRecommendations, profileLabels } from "@/src/data/profiles";
import { OnboardingModal } from "./OnboardingModal";
import { AboutModal } from "./AboutModal";
import { Footer } from "./Footer";
import { ConsentBanner } from "./ConsentBanner";
import { AnimatePresence, motion } from "motion/react";

const AnimatedTitle = () => {
  const titles = ["Conformité IA", "RGPD", "Souveraineté données", "IA Act"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-6 flex-1 overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 w-full truncate"
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export function Sidebar({ isOpen, setIsOpen, isFocusMode }: { isOpen: boolean, setIsOpen: (v: boolean) => void, isFocusMode: boolean }) {
  const location = useLocation();
  const { isCompleted, progressPercentage, userProfile, logout } = useProgress();

  const recommendedPaths = userProfile ? profileRecommendations[userProfile.role] : [];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
        aria-label="Ouvrir le menu"
        className={cn(
          "fixed top-4 left-4 z-50 rounded-md p-2 bg-white border shadow-sm md:hidden dark:bg-slate-950 dark:border-slate-800",
          isFocusMode && "hidden"
        )}
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside 
        id="mobile-sidebar"
        aria-label="Navigation principale"
        className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-slate-50/50 pb-10 transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950/50 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        !isFocusMode && "md:translate-x-0"
      )}>
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b dark:border-slate-800">
          <Link to="/" className="flex flex-1 items-center gap-2 font-bold tracking-tight text-lg overflow-hidden mr-2" onClick={() => setIsOpen(false)}>
            <Shield className="h-5 w-5 text-blue-600 shrink-0" />
            <AnimatedTitle />
          </Link>
          <button 
            onClick={() => setIsOpen(false)} 
            className="md:hidden shrink-0"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4 border-b dark:border-slate-800 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progression globale</span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progressPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800 mb-4">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out dark:bg-blue-500" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {userProfile && (
            <div className="flex items-center justify-between text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-md">
              <span className="font-medium truncate mr-2">{userProfile.name} ({profileLabels[userProfile.role]})</span>
              <button 
                onClick={() => logout()}
                className="hover:underline shrink-0"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          {navigation.map((section, i) => (
            <div key={i}>
              <h4 className="mb-2 flex items-center gap-2 px-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <section.icon className="h-4 w-4 text-slate-500" />
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item, j) => {
                  const isActive = location.pathname === item.href;
                  const completed = item.href !== '/' && isCompleted(item.href);
                  const isRecommended = recommendedPaths.includes(item.href);
                  
                  return (
                    <li key={j}>
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                          isActive 
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {item.title}
                          {isRecommended && !completed && (
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" title="Recommandé pour votre profil" />
                          )}
                        </span>
                        <div className="flex items-center gap-1">
                          {completed && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                          {isActive && <ChevronRight className="h-4 w-4" />}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setIsAboutOpen, isLoading, userProfile, isOnboardingOpen } = useProgress();

  // Initial global loading state
  if (isLoading && !userProfile && !isOnboardingOpen) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Chargement de l'application...</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Connexion au serveur sécurisé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300 flex flex-col">
      <OnboardingModal />
      <AboutModal />
      <ConsentBanner />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isFocusMode={isFocusMode} />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out flex-1",
        !isFocusMode ? "md:pl-72" : "pl-0"
      )}>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 relative min-h-screen flex flex-col">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsAboutOpen(true)}
              aria-label="À propos de l'application"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
              title="À propos de l'application"
            >
              <Info className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              aria-pressed={isFocusMode}
              aria-label={isFocusMode ? "Quitter le mode focus" : "Activer le mode focus"}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors dark:hover:bg-slate-800 dark:hover:text-slate-100 hidden md:flex"
              title={isFocusMode ? "Quitter le mode focus" : "Mode focus"}
            >
              {isFocusMode ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
          
          <div className="flex-1 mt-8 md:mt-0">
            {children}
          </div>
          
          <Footer />
        </div>
      </main>
    </div>
  );
}
