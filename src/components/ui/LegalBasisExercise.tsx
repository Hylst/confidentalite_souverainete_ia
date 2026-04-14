import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

const cases = [
  {
    id: 1,
    context: "Une entreprise déploie un chatbot IA sur son site e-commerce pour recommander des produits basés sur l'historique de navigation de l'utilisateur.",
    options: [
      { id: "consent", label: "Consentement", isCorrect: true, feedback: "Correct. Le profilage à des fins de recommandation commerciale nécessite le consentement explicite de l'utilisateur (souvent via le bandeau cookies)." },
      { id: "contract", label: "Exécution d'un contrat", isCorrect: false, feedback: "Faux. La recommandation de produits n'est pas strictement nécessaire à l'exécution du contrat de vente." },
      { id: "legitimate", label: "Intérêt légitime", isCorrect: false, feedback: "Faux. L'intérêt commercial ne prévaut pas sur les droits de l'utilisateur face à un profilage automatisé." }
    ]
  },
  {
    id: 2,
    context: "Une banque utilise une IA pour analyser les transactions de ses clients afin de détecter les fraudes en temps réel.",
    options: [
      { id: "consent", label: "Consentement", isCorrect: false, feedback: "Faux. Demander le consentement permettrait aux fraudeurs de le refuser." },
      { id: "contract", label: "Exécution d'un contrat", isCorrect: false, feedback: "Faux. Bien que lié au service, la détection de fraude relève d'une obligation plus large." },
      { id: "legitimate", label: "Obligation légale / Intérêt légitime", isCorrect: true, feedback: "Correct. La banque a l'obligation légale de lutter contre la fraude, et c'est aussi dans son intérêt légitime (et celui de ses clients)." }
    ]
  },
  {
    id: 3,
    context: "Une application de traduction vocale par IA traite la voix de l'utilisateur pour fournir la traduction demandée.",
    options: [
      { id: "consent", label: "Consentement", isCorrect: false, feedback: "Faux. Le consentement peut être retiré à tout moment, ce qui n'est pas adapté ici." },
      { id: "contract", label: "Exécution d'un contrat", isCorrect: true, feedback: "Correct. Le traitement de la voix est strictement nécessaire pour fournir le service demandé par l'utilisateur (le contrat d'utilisation de l'app)." },
      { id: "legitimate", label: "Intérêt légitime", isCorrect: false, feedback: "Faux. C'est l'exécution même du service qui justifie le traitement." }
    ]
  }
];

export function LegalBasisExercise() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentCase = cases[currentStep];

  const handleSelect = (id: string) => {
    if (showFeedback) return;
    setSelectedOption(id);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentStep(prev => prev + 1);
  };

  const handleRestart = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentStep(0);
  };

  if (currentStep >= cases.length) {
    return (
      <div className="my-8 border rounded-xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 text-center shadow-sm">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-4">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Exercice terminé !</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Vous avez compris comment identifier la bonne base légale pour un traitement IA.
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="my-8 border rounded-xl overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
      <div className="bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 border-b dark:border-slate-800">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Cas pratique {currentStep + 1} / {cases.length}
        </div>
        <p className="text-lg font-medium">{currentCase.context}</p>
      </div>

      <div className="p-4 sm:p-6">
        <p className="font-medium mb-4 text-slate-700 dark:text-slate-300">Quelle est la base légale la plus appropriée ?</p>
        
        <div className="grid gap-3 sm:grid-cols-3">
          {currentCase.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.isCorrect;
            
            let buttonClass = "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20";
            
            if (showFeedback) {
              if (isCorrect) {
                buttonClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500";
              } else if (isSelected && !isCorrect) {
                buttonClass = "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500";
              } else {
                buttonClass = "border-slate-200 dark:border-slate-800 opacity-50";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={showFeedback}
                className={cn(
                  "text-center p-4 rounded-lg border-2 transition-all duration-200 font-medium",
                  buttonClass
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 animate-in fade-in">
            {currentCase.options.map(opt => {
              if (opt.id === selectedOption || opt.isCorrect) {
                return (
                  <div key={opt.id} className={cn(
                    "mb-4 p-4 rounded-lg flex items-start gap-3",
                    opt.isCorrect ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 hidden"
                  )}
                  style={{ display: (opt.id === selectedOption || opt.isCorrect) ? 'flex' : 'none' }}>
                    {opt.isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 shrink-0 mt-0.5" />}
                    <div>
                      <strong>{opt.label} : </strong>
                      {opt.feedback}
                    </div>
                  </div>
                )
              }
              return null;
            })}
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {currentStep < cases.length - 1 ? "Cas suivant" : "Terminer"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
