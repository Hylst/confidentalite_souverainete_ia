import React, { useState } from 'react';
import { Card, CardContent } from './Card';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type RiskLevel = 'Rouge' | 'Orange' | 'Jaune' | 'Vert';

interface DataItem {
  id: number;
  text: string;
  level: RiskLevel;
  explanation: string;
}

const items: DataItem[] = [
  { id: 1, text: "Dossier médical d'un collaborateur", level: "Rouge", explanation: "Donnée de santé très sensible (RGPD). L'accès doit être strictement restreint aux professionnels de santé." },
  { id: 2, text: "Code source de l'algorithme principal", level: "Rouge", explanation: "Secret industriel critique. Une fuite compromettrait l'avantage concurrentiel de l'entreprise." },
  { id: 3, text: "Base de données des emails clients", level: "Orange", explanation: "Données personnelles (RGPD). Nécessite une protection adéquate et le recueil du consentement." },
  { id: 4, text: "Projet d'acquisition d'un concurrent", level: "Orange", explanation: "Information stratégique confidentielle avant son annonce officielle (délit d'initié potentiel)." },
  { id: 5, text: "Procédure interne de demande de congés", level: "Jaune", explanation: "Document à usage interne uniquement, mais sans risque majeur pour l'entreprise en cas de fuite." },
  { id: 6, text: "Plaquette commerciale de l'entreprise", level: "Vert", explanation: "Information publique destinée à être partagée librement à l'extérieur." }
];

const levels: { id: RiskLevel; label: string; color: string; bg: string; border: string }[] = [
  { id: 'Rouge', label: 'Strictement Confidentiel', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-500' },
  { id: 'Orange', label: 'Confidentiel', color: 'text-orange-700 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30', border: 'border-orange-500' },
  { id: 'Jaune', label: 'Usage Interne', color: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', border: 'border-yellow-500' },
  { id: 'Vert', label: 'Public', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30', border: 'border-emerald-500' }
];

export function DataClassificationGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<RiskLevel | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentItem = items[currentIndex];
  const isGameOver = currentIndex >= items.length;

  const handleSelect = (level: RiskLevel) => {
    if (showFeedback) return;
    setSelectedLevel(level);
    setShowFeedback(true);
    if (level === currentItem.level) {
      setScore(s => s + 1);
    }
  };

  const nextItem = () => {
    setSelectedLevel(null);
    setShowFeedback(false);
    setCurrentIndex(i => i + 1);
  };

  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedLevel(null);
    setShowFeedback(false);
  };

  if (isGameOver) {
    return (
      <Card className="border-blue-200 dark:border-blue-900">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold">Classification terminée !</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Vous avez correctement classé {score} type(s) de données sur {items.length}.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            Recommencer
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm font-medium text-slate-500">
        <span>Donnée {currentIndex + 1} sur {items.length}</span>
        <span>Score : {score}</span>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 text-center border-b border-slate-200 dark:border-slate-800 min-h-[160px] flex items-center justify-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            "{currentItem.text}"
          </h3>
        </div>

        <CardContent className="p-6">
          <h4 className="font-semibold mb-4 text-center text-slate-900 dark:text-slate-100">Quel est le niveau de sensibilité de cette donnée ?</h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {levels.map((level) => {
              const isSelected = selectedLevel === level.id;
              const isCorrect = showFeedback && level.id === currentItem.level;
              const isWrong = showFeedback && isSelected && level.id !== currentItem.level;

              return (
                <button
                  key={level.id}
                  onClick={() => handleSelect(level.id)}
                  disabled={showFeedback}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center",
                    !showFeedback && "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600",
                    isSelected && !showFeedback && level.border,
                    isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
                    isWrong && "border-red-500 bg-red-50 dark:bg-red-900/20",
                    showFeedback && !isCorrect && !isWrong && "opacity-40 border-slate-200 dark:border-slate-800"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full", level.bg, level.border, "border-2")} />
                  <span className="font-bold text-sm">{level.label}</span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className={cn(
                "p-4 rounded-xl flex gap-4 items-start",
                selectedLevel === currentItem.level 
                  ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/50"
                  : "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-200 border border-red-200 dark:border-red-800/50"
              )}>
                {selectedLevel === currentItem.level ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold mb-1">
                    {selectedLevel === currentItem.level ? "Bonne réponse !" : `Mauvaise réponse. C'était : ${currentItem.level}`}
                  </h4>
                  <p className="text-sm opacity-90">{currentItem.explanation}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextItem}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium transition-colors"
                >
                  Suivant <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
