import React, { useState } from "react";
import { AlertTriangle, Search, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function DataLeakCaseStudy() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
      title: "L'Incident (Inspiré de faits réels)",
      content: "Des ingénieurs d'une grande entreprise technologique ont utilisé un LLM public (ChatGPT) pour corriger des bugs dans du code source propriétaire et pour optimiser des notes de réunion confidentielles. Quelques semaines plus tard, des extraits de ce code et des informations stratégiques sont apparus dans les réponses générées par le LLM pour d'autres utilisateurs externes.",
      action: "Analyser la cause"
    },
    {
      icon: Search,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      title: "L'Analyse Post-Mortem",
      content: "La cause racine n'est pas un piratage, mais une fonctionnalité standard : par défaut, les LLM grand public utilisent les conversations des utilisateurs pour ré-entraîner et améliorer leurs modèles. Les ingénieurs ont ignoré cette condition d'utilisation, provoquant une fuite de données (Shadow IT).",
      action: "Voir les mesures correctives"
    },
    {
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      title: "Les Mesures Correctives",
      content: (
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Blocage immédiat :</strong> Accès restreint aux LLM publics depuis le réseau de l'entreprise.</li>
          <li><strong>Alternative sécurisée :</strong> Déploiement d'une instance privée (ex: Azure OpenAI) avec un contrat (DPA) garantissant la non-réutilisation des données.</li>
          <li><strong>Sensibilisation :</strong> Formation obligatoire de tous les employés sur les risques du Shadow AI.</li>
          <li><strong>Politique claire :</strong> Rédaction d'une charte d'utilisation de l'IA précisant les outils autorisés et interdits.</li>
        </ul>
      ),
      action: "Terminer l'étude"
    }
  ];

  return (
    <div className="my-8 border rounded-xl overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
      <div className="flex border-b dark:border-slate-800">
        {steps.map((s, i) => (
          <div 
            key={i} 
            className={cn(
              "flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 transition-colors",
              step === i 
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10" 
                : step > i 
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" 
                  : "border-transparent text-slate-500"
            )}
          >
            <span className="hidden sm:inline">Étape {i + 1}</span>
            <span className="sm:hidden">{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {step < steps.length ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className={cn("p-3 rounded-xl shrink-0", steps[step].bg, steps[step].color)}>
                {React.createElement(steps[step].icon, { className: "h-8 w-8" })}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{steps[step].title}</h3>
                <div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  {steps[step].content}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {steps[step].action}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Étude de cas terminée</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Vous avez compris les mécanismes d'une fuite de données via l'IA et les mesures pour s'en prémunir.
            </p>
            <button
              onClick={() => setStep(0)}
              className="text-blue-600 hover:underline font-medium"
            >
              Revoir l'étude de cas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
