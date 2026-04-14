import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

const rows = [
  {
    id: "risk",
    dimension: "Niveau de risque IA Act",
    analysis: "Risque limité (chatbot informatif) — mais données RH impliquées → surveillance accrue",
    options: [
      { id: "a", text: "Ignorer les obligations car c'est un risque limité" },
      { id: "b", text: "Documenter comme risque limité+ avec mesures renforcées" },
      { id: "c", text: "Interdire le projet (risque inacceptable)" }
    ],
    correctId: "b",
    explanation: "Bien que formellement à 'risque limité', la sensibilité des données RH impose une gouvernance stricte."
  },
  {
    id: "data",
    dimension: "Données traitées",
    analysis: "Questions des salariés (potentiellement sensibles, ex: santé, salaire)",
    options: [
      { id: "a", text: "Conserver tous les logs pendant 5 ans pour analyse" },
      { id: "b", text: "Ne pas mémoriser les conversations ; purge automatique après 24h" },
      { id: "c", text: "Revendre les données anonymisées" }
    ],
    correctId: "b",
    explanation: "Le principe de minimisation (RGPD) impose de ne conserver les données que le temps strictement nécessaire."
  },
  {
    id: "bias",
    dimension: "Biais potentiels",
    analysis: "Réponses différentes selon le profil ? Discrimination indirecte possible",
    options: [
      { id: "a", text: "Tester avec profils variés (sénior/junior, homme/femme)" },
      { id: "b", text: "Faire confiance au modèle car il a été entraîné par une grande entreprise" },
      { id: "c", text: "Ajouter un avertissement légal et ignorer le problème" }
    ],
    correctId: "a",
    explanation: "L'équité exige des tests proactifs avant déploiement pour identifier et corriger les biais (Phase 4 de la méthode)."
  },
  {
    id: "conf",
    dimension: "Confidentialité",
    analysis: "Les questions RH sont confidentielles",
    options: [
      { id: "a", text: "Utiliser ChatGPT gratuit pour réduire les coûts" },
      { id: "b", text: "Héberger le modèle aux États-Unis sans contrat" },
      { id: "c", text: "LLM hébergé EU avec DPA + Information au CSE avant déploiement" }
    ],
    correctId: "c",
    explanation: "Le DPA et l'hébergement européen sécurisent le RGPD, l'information au CSE est une obligation en droit du travail."
  }
];

export function InteractiveEvaluationTable() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (rowId: string, optionId: string) => {
    if (answers[rowId]) return; // Prevent changing answer once selected
    setAnswers((prev) => ({ ...prev, [rowId]: optionId }));
  };

  const isComplete = Object.keys(answers).length === rows.length;
  const score = rows.filter(r => answers[r.id] === r.correctId).length;

  return (
    <div className="my-8">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <table className="min-w-full text-left text-sm bg-white dark:bg-slate-950">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr className="border-b dark:border-slate-800">
              <th className="p-4 font-semibold w-1/4">Dimension</th>
              <th className="p-4 font-semibold w-1/3">Analyse</th>
              <th className="p-4 font-semibold">Recommandation (À vous de jouer)</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            {rows.map((row) => {
              const answered = !!answers[row.id];
              const isCorrect = answers[row.id] === row.correctId;

              return (
                <tr key={row.id} className={cn(answered && isCorrect ? "bg-emerald-50/30 dark:bg-emerald-950/10" : answered && !isCorrect ? "bg-red-50/30 dark:bg-red-950/10" : "")}>
                  <td className="p-4 font-medium align-top">{row.dimension}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 align-top">{row.analysis}</td>
                  <td className="p-4 align-top">
                    {!answered ? (
                      <div className="space-y-2">
                        {row.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelect(row.id, opt.id)}
                            className="w-full text-left px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-md hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="animate-in fade-in">
                        <div className={cn(
                          "flex items-start gap-2 p-3 rounded-md border",
                          isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300" : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
                        )}>
                          {isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 shrink-0 mt-0.5" />}
                          <div>
                            <p className="font-medium mb-1">
                              {row.options.find(o => o.id === answers[row.id])?.text}
                            </p>
                            <p className="text-xs opacity-90">
                              {row.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isComplete && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between animate-in slide-in-from-bottom-4">
          <div>
            <h4 className="font-bold text-blue-900 dark:text-blue-100">Évaluation terminée</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Vous avez obtenu {score} bonne(s) réponse(s) sur {rows.length}.
            </p>
          </div>
          <button
            onClick={() => setAnswers({})}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}
