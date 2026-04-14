import React, { useState } from "react";
import { useProgress } from "@/src/contexts/ProgressContext";
import { X, Info, Star, BookOpen, Map, Lightbulb, User, Mail, Shield, ShieldCheck, Scale, Code, Maximize } from "lucide-react";
import { cn } from "@/src/lib/utils";

const tabs = [
  { id: 'about', label: 'À propos', icon: Info },
  { id: 'features', label: 'Fonctionnalités', icon: Star },
  { id: 'content', label: 'Contenu', icon: BookOpen },
  { id: 'guide', label: 'Mode d\'emploi', icon: Map },
  { id: 'tips', label: 'Astuces', icon: Lightbulb },
  { id: 'creator', label: 'Créateur', icon: User }
];

export function AboutModal() {
  const { isAboutOpen, setIsAboutOpen } = useProgress();
  const [activeTab, setActiveTab] = useState('about');

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        role="dialog"
        aria-modal="true"
        className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative"
      >
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Conformité IA, RGPD & Souveraineté</h2>
          </div>
          <button 
            onClick={() => setIsAboutOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto md:overflow-y-auto shrink-0">
            <nav className="flex md:flex-col p-2 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {activeTab === 'about' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold mb-4">À propos de l'application</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  <strong>Conformité IA, RGPD & Souveraineté</strong> est une initiative éducative interactive conçue pour démystifier les enjeux légaux, éthiques et sécuritaires liés à l'utilisation de l'Intelligence Artificielle en entreprise.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                    <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                    <h4 className="font-bold mb-2">Souveraineté des données</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Protéger les secrets industriels et éviter les fuites d'informations via le Shadow IT.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
                    <Scale className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-3" />
                    <h4 className="font-bold mb-2">Cadre Légal</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Anticiper le RGPD et l'IA Act pour innover sans risquer de lourdes sanctions financières.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold mb-4">Fonctionnalités clés</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 shrink-0"><User className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-bold">Parcours personnalisé</h4>
                      <p className="text-slate-600 dark:text-slate-400">Le contenu s'adapte à votre profil (RH, Développeur, Juriste, DPO) pour vous recommander les modules les plus pertinents.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0"><Code className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-bold">Ateliers interactifs</h4>
                      <p className="text-slate-600 dark:text-slate-400">Des exercices pratiques (Drag & Drop, Quiz, Arbres de décision) pour appliquer immédiatement les concepts théoriques.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400 shrink-0"><BookOpen className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-bold">Générateur de Charte IA</h4>
                      <p className="text-slate-600 dark:text-slate-400">Un outil intégré pour créer une charte d'utilisation de l'IA sur mesure pour votre entreprise, exportable en Markdown.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400 shrink-0"><Star className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-bold">Suivi de progression & Examen</h4>
                      <p className="text-slate-600 dark:text-slate-400">Visualisez votre avancement et validez vos acquis avec un examen final générant un certificat de réussite.</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold mb-4">Contenu de la formation</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Section 1 : RGPD & IA Act</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 ml-2">
                      <li>Module 1 : Objectifs & Présentation</li>
                      <li>Module 2 : Rappels RGPD & IA Act</li>
                      <li>Module 3 : Identifier les données à risques</li>
                      <li>Module 4 : Cartographier les usages</li>
                      <li>Module 5 : Bonnes pratiques</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">Section 2 : Éthique de l'IA</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 ml-2">
                      <li>Module 6 : Principes & Biais</li>
                      <li>Module 7 : Propriété Intellectuelle</li>
                      <li>Module 8 : Confidentialité</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">Section 3 : Ateliers & Outils</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 ml-2">
                      <li>Atelier 1 : Déploiement éthique (Cas pratique RH)</li>
                      <li>Atelier 2 : Configuration d'outils IA</li>
                      <li>Atelier 3 : Nettoyage de données</li>
                      <li>Générateur de Charte IA</li>
                      <li>Examen Final</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold mb-4">Mode d'emploi</h3>
                <div className="relative border-l-2 border-blue-200 dark:border-blue-800 ml-3 space-y-8 pb-4">
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-950" />
                    <h4 className="font-bold text-lg">1. Définissez votre profil</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Utilisez le bouton "Modifier" dans la barre latérale pour choisir votre métier. L'application mettra en évidence (avec une étoile ⭐️) les modules les plus importants pour vous.</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-950" />
                    <h4 className="font-bold text-lg">2. Suivez les modules</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Lisez le contenu théorique et cliquez sur "Marquer comme terminé" en bas de chaque page pour faire avancer votre jauge de progression.</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-950" />
                    <h4 className="font-bold text-lg">3. Pratiquez avec les ateliers</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Mettez les mains dans le cambouis ! Les ateliers sont interactifs et vous permettent de tester vos réflexes face à des situations réelles.</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-950" />
                    <h4 className="font-bold text-lg">4. Passez l'examen</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Une fois tous les modules terminés, testez vos connaissances avec l'examen final pour obtenir votre certificat.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold mb-4">Astuces</h3>
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex gap-4 items-start">
                    <Maximize className="h-6 w-6 text-slate-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold">Mode Focus</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Utilisez l'icône d'agrandissement en haut à droite de l'écran pour masquer la barre latérale et vous concentrer pleinement sur la lecture.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex gap-4 items-start">
                    <BookOpen className="h-6 w-6 text-slate-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold">Glossaire</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Un terme technique vous échappe ? Consultez le Glossaire (dans les Annexes) pour retrouver toutes les définitions liées à l'IA et au RGPD.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex gap-4 items-start">
                    <Star className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold">Recommandations</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Si vous manquez de temps, concentrez-vous en priorité sur les modules marqués d'une étoile jaune dans le menu, ils sont spécifiques à votre métier.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'creator' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold mb-6">Créateur de l'application</h3>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center shrink-0 border-4 border-white dark:border-slate-950 shadow-lg">
                    <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div className="text-center sm:text-left space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Geoffroy Streit</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">alias Hylst</p>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                      Passionné par les nouvelles technologies et conscient des défis qu'elles représentent, mon objectif est de fournir un cadre clair et accessible pour un déploiement responsable de l'IA en entreprise.
                    </p>
                    
                    <div className="pt-2">
                      <a 
                        href="mailto:geoffroy.streit@gmail.com"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        geoffroy.streit@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
