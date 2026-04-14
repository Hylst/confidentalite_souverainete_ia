import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, ArrowRight, RefreshCw, ShieldAlert, Users, XCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

const initialCandidates = [
  { id: 1, name: "Thomas", gender: "Homme", origin: "Europe", exp: 8, score: 92 },
  { id: 2, name: "Marie", gender: "Femme", origin: "Europe", exp: 8, score: 74 },
  { id: 3, name: "Ahmed", gender: "Homme", origin: "Afrique", exp: 9, score: 71 },
  { id: 4, name: "Sophie", gender: "Femme", origin: "Europe", exp: 4, score: 55 },
  { id: 5, name: "Lucas", gender: "Homme", origin: "Europe", exp: 4, score: 78 },
  { id: 6, name: "Fatima", gender: "Femme", origin: "Afrique", exp: 10, score: 68 },
];

export function BiasDetectionSimulator() {
  const [step, setStep] = useState(0);
  const [selectedBias, setSelectedBias] = useState<string | null>(null);
  const [excludedFeatures, setExcludedFeatures] = useState<Record<string, boolean>>({
    gender: false,
    origin: false,
    exp: false,
    name: false
  });
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeatureToggle = (feature: string) => {
    setExcludedFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  const checkFix = () => {
    if (excludedFeatures.gender && excludedFeatures.origin && excludedFeatures.name && !excludedFeatures.exp) {
      setStep(3); // Success
    } else {
      setShowFeedback(true);
    }
  };

  const reset = () => {
    setStep(0);
    setSelectedBias(null);
    setExcludedFeatures({ gender: false, origin: false, exp: false, name: false });
    setShowFeedback(false);
  };

  const getCorrectedScore = (exp: number) => {
    return Math.min(100, exp * 8 + 20);
  };

  return (
    <div className="my-8 border rounded-xl overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
      <div className="bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 border-b dark:border-slate-800 flex items-center gap-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Simulateur : Détection de Biais de Recrutement</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Analysez les résultats de l'IA de tri de CV et corrigez le modèle.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {step === 0 && (
          <div className="animate-in fade-in">
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              Votre entreprise utilise une nouvelle IA pour pré-sélectionner les candidats. Voici les scores attribués par l'IA sur les 6 derniers profils. <strong>Observez attentivement les données.</strong>
            </p>
            
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Candidat</th>
                    <th className="px-4 py-3 font-semibold">Genre</th>
                    <th className="px-4 py-3 font-semibold">Origine</th>
                    <th className="px-4 py-3 font-semibold">Expérience</th>
                    <th className="px-4 py-3 font-semibold text-right">Score IA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {initialCandidates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3">{c.gender}</td>
                      <td className="px-4 py-3">{c.origin}</td>
                      <td className="px-4 py-3">{c.exp} ans</td>
                      <td className="px-4 py-3 text-right font-bold text-blue-600 dark:text-blue-400">{c.score}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Analyser les résultats <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h4 className="text-lg font-bold mb-4">Diagnostic</h4>
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              En comparant les profils (ex: Thomas vs Marie, ou Thomas vs Ahmed), quel problème majeur observez-vous dans les scores de l'IA ?
            </p>

            <div className="space-y-3 mb-6">
              {[
                { id: "exp", label: "L'IA ne prend pas du tout en compte l'expérience." },
                { id: "gender", label: "L'IA pénalise les femmes (biais de genre)." },
                { id: "origin", label: "L'IA pénalise les candidats d'origine africaine (biais d'origine)." },
                { id: "both", label: "L'IA présente à la fois un biais de genre et un biais d'origine." }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedBias(opt.id);
                    if (opt.id === "both") {
                      setTimeout(() => setStep(2), 1000);
                    }
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    selectedBias === opt.id 
                      ? opt.id === "both" 
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" 
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-400"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{opt.label}</span>
                    {selectedBias === opt.id && opt.id === "both" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                    {selectedBias === opt.id && opt.id !== "both" && <XCircle className="h-5 w-5 text-red-500" />}
                  </div>
                </button>
              ))}
            </div>
            
            {selectedBias && selectedBias !== "both" && (
              <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <p>C'est vrai, mais regardez de plus près. Comparez Thomas (8 ans d'exp) avec Marie (8 ans d'exp) ET avec Ahmed (9 ans d'exp).</p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <h4 className="text-lg font-bold mb-4">Correction du Modèle</h4>
            <div className="p-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 rounded-lg flex items-start gap-3 mb-6">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <p>
                L'IA a reproduit les biais présents dans les données d'entraînement historiques de l'entreprise. 
                Pour corriger cela, vous devez <strong>exclure les variables discriminatoires</strong> de l'entraînement du modèle.
              </p>
            </div>

            <p className="mb-4 font-medium">Quelles données allez-vous masquer (exclure) pour garantir un score équitable basé uniquement sur les compétences ?</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <label className={cn("flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors", excludedFeatures.name ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700")}>
                <input type="checkbox" checked={excludedFeatures.name} onChange={() => handleFeatureToggle('name')} className="w-5 h-5" />
                <span className="font-medium">Prénom (Name)</span>
              </label>
              <label className={cn("flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors", excludedFeatures.gender ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700")}>
                <input type="checkbox" checked={excludedFeatures.gender} onChange={() => handleFeatureToggle('gender')} className="w-5 h-5" />
                <span className="font-medium">Genre (Gender)</span>
              </label>
              <label className={cn("flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors", excludedFeatures.origin ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700")}>
                <input type="checkbox" checked={excludedFeatures.origin} onChange={() => handleFeatureToggle('origin')} className="w-5 h-5" />
                <span className="font-medium">Origine (Origin)</span>
              </label>
              <label className={cn("flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors", excludedFeatures.exp ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-slate-200 dark:border-slate-700")}>
                <input type="checkbox" checked={excludedFeatures.exp} onChange={() => handleFeatureToggle('exp')} className="w-5 h-5" />
                <span className="font-medium">Expérience (Exp)</span>
              </label>
            </div>

            {showFeedback && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 rounded-lg flex items-start gap-3">
                <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  Configuration incorrecte. Vous devez exclure <strong>toutes</strong> les variables qui peuvent causer de la discrimination (directe ou indirecte comme le prénom), mais vous <strong>devez conserver</strong> l'expérience qui est le critère objectif.
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={checkFix}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Ré-entraîner le modèle <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Modèle corrigé avec succès !</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              En excluant le prénom, le genre et l'origine, l'IA se base désormais uniquement sur les compétences objectives. Voici les nouveaux scores :
            </p>

            <div className="overflow-x-auto rounded-lg border border-emerald-200 dark:border-emerald-900/50 mb-6">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-900/50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Candidat</th>
                    <th className="px-4 py-3 font-semibold text-slate-400 line-through">Genre</th>
                    <th className="px-4 py-3 font-semibold text-slate-400 line-through">Origine</th>
                    <th className="px-4 py-3 font-semibold">Expérience</th>
                    <th className="px-4 py-3 font-semibold text-right text-emerald-700 dark:text-emerald-400">Nouveau Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900/30">
                  {initialCandidates.map(c => (
                    <tr key={c.id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10">
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3 text-slate-400">Masqué</td>
                      <td className="px-4 py-3 text-slate-400">Masqué</td>
                      <td className="px-4 py-3 font-bold">{c.exp} ans</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        {getCorrectedScore(c.exp)}/100
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 rounded-lg">
              <strong>Leçon :</strong> Les IA apprennent des données passées, qui contiennent souvent des biais humains. L'Article 10 de l'IA Act impose d'examiner les jeux de données pour détecter et corriger ces biais avant le déploiement d'un système à haut risque.
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium rounded-lg transition-colors"
              >
                Recommencer <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
