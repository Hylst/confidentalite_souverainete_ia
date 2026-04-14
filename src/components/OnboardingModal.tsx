import { useState } from "react";
import { useProgress } from "@/src/contexts/ProgressContext";
import { UserRole } from "@/src/types/models";
import { Card, CardContent } from "./ui/Card";
import { Users, Code, Scale, ShieldCheck, User, X, ChevronRight, Shield, Lock, BookOpen } from "lucide-react";
import { profileLabels } from "@/src/data/profiles";

const profiles = [
  { id: 'rh', icon: Users, label: profileLabels['rh'], description: 'Recrutement, gestion des talents, SIRH' },
  { id: 'dev', icon: Code, label: profileLabels['dev'], description: 'Ingénierie, data science, architecture IT' },
  { id: 'juriste', icon: Scale, label: profileLabels['juriste'], description: 'Contrats, propriété intellectuelle, conseil' },
  { id: 'dpo', icon: ShieldCheck, label: profileLabels['dpo'], description: 'Protection des données, conformité globale' },
  { id: 'autre', icon: User, label: profileLabels['autre'], description: 'Je souhaite tout découvrir' },
];

export function OnboardingModal() {
  const { isOnboardingOpen, setIsOnboardingOpen, setUserProfile, isLoading } = useProgress();
  const [step, setStep] = useState(1);

  if (!isOnboardingOpen) {
    return null;
  }

  const handleClose = () => {
    setIsOnboardingOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        aria-describedby="onboarding-desc"
        className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300 relative"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
          aria-label="Fermer"
        >
          <X className="h-5 w-5 text-slate-500" />
        </button>
        
        {step === 1 ? (
          <div className="p-8 sm:p-10">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="h-8 w-8" />
            </div>
            <h2 id="onboarding-title" className="text-3xl font-extrabold mb-4 text-center">
              Bienvenue sur Conformité IA, RGPD & Souveraineté
            </h2>
            <p id="onboarding-desc" className="text-lg text-slate-600 dark:text-slate-400 text-center mb-8">
              Ce guide interactif a été conçu pour vous accompagner dans le déploiement de l'Intelligence Artificielle de manière éthique, légale et sécurisée.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <Lock className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Souveraineté & Confidentialité</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Apprenez à protéger vos données stratégiques face aux risques liés aux IA génératives.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <Scale className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">RGPD & IA Act</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Maîtrisez le cadre légal européen pour innover sans risquer de lourdes sanctions.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                <BookOpen className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Honnêteté Intellectuelle</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Déployez des systèmes transparents, équitables et respectueux du droit d'auteur.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              Commencer <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="p-8 text-center border-b dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-2">Quel est votre profil ?</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Pour personnaliser votre parcours d'apprentissage et vous recommander les modules les plus pertinents.
              </p>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    disabled={isLoading}
                    onClick={() => {
                      setUserProfile(profile.id as UserRole);
                      setStep(1);
                    }}
                    className="text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:border-blue-500 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <profile.icon className="h-5 w-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100">{profile.label}</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 ml-11">
                      {profile.description}
                    </p>
                  </button>
                ))}
              </div>
              {isLoading && (
                <p className="text-center text-sm text-blue-600 dark:text-blue-400 mt-4 animate-pulse font-medium">
                  Création de votre profil en cours...
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
