import React, { useState } from "react";
import { Card, CardContent } from "./Card";
import { CheckCircle2, XCircle, AlertTriangle, ShieldAlert, Info, CheckCircle, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

type RiskLevel = 'unacceptable' | 'high' | 'limited' | 'minimal';

interface Scenario {
  id: number;
  title: string;
  description: string;
  correctLevel: RiskLevel;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Tri automatique des CV",
    description: "Une IA analyse et classe les CV des candidats pour présélectionner les meilleurs profils pour un poste.",
    correctLevel: 'high',
    explanation: "L'IA Act classe les systèmes d'IA utilisés pour le recrutement et la sélection de candidats comme étant à haut risque (Annexe III)."
  },
  {
    id: 2,
    title: "Générateur d'images pour le marketing",
    description: "Un outil basé sur l'IA générative (type Midjourney) utilisé pour créer des visuels pour les réseaux sociaux de l'entreprise.",
    correctLevel: 'limited',
    explanation: "Il s'agit d'une IA générative. Elle est soumise à des obligations de transparence (informer que l'image est générée par IA)."
  },
  {
    id: 3,
    title: "Reconnaissance faciale dans la rue",
    description: "Un système de vidéosurveillance municipal qui identifie en temps réel les passants dans la rue pour prévenir la criminalité.",
    correctLevel: 'unacceptable',
    explanation: "La reconnaissance biométrique à distance en temps réel dans l'espace public est interdite (sauf exceptions très strictes pour les forces de l'ordre)."
  },
  {
    id: 4,
    title: "Filtre anti-spam d'entreprise",
    description: "Un algorithme de machine learning qui détecte et bloque les emails malveillants ou indésirables.",
    correctLevel: 'minimal',
    explanation: "C'est un usage courant et à faible impact sur les droits fondamentaux. Il n'y a pas d'obligations spécifiques sous l'IA Act."
  },
  {
    id: 5,
    title: "Chatbot de support client",
    description: "Un assistant virtuel sur le site web de l'entreprise qui répond aux questions fréquentes des clients.",
    correctLevel: 'limited',
    explanation: "L'utilisateur doit être informé qu'il interagit avec une machine (obligation de transparence)."
  }
];

const levels: { id: RiskLevel; label: string; color: string; icon: React.ElementType }[] = [
  { id: 'unacceptable', label: 'Inacceptable', color: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200', icon: AlertTriangle },
  { id: 'high', label: 'Élevé', color: 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200', icon: ShieldAlert },
  { id: 'limited', label: 'Limité', color: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200', icon: Info },
  { id: 'minimal', label: 'Minimal', color: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200', icon: CheckCircle },
];

export function RiskClassificationGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<RiskLevel | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentScenario = scenarios[currentIndex];

  const handleSelect = (level: RiskLevel) => {
    if (selectedLevel) return; // Prevent multiple clicks
    
    setSelectedLevel(level);
    if (level === currentScenario.correctLevel) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedLevel(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedLevel(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <Card className="my-8 text-center p-8">
        <h3 className="text-2xl font-bold mb-4">Atelier terminé !</h3>
        <p className="text-lg mb-6">
          Votre score : <span className="font-bold text-blue-600">{score} / {scenarios.length}</span>
        </p>
        <button 
          onClick={handleRestart}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Recommencer l'atelier
        </button>
      </Card>
    );
  }

  const isCorrect = selectedLevel === currentScenario.correctLevel;

  return (
    <Card className="my-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6 text-sm font-medium text-slate-500">
          <span>Cas pratique {currentIndex + 1} sur {scenarios.length}</span>
          <span>Score : {score}</span>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">{currentScenario.title}</h3>
          <p className="text-slate-700 dark:text-slate-300">{currentScenario.description}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" role="group" aria-label="Niveaux de risque">
          {levels.map((level) => {
            const isSelected = selectedLevel === level.id;
            const showCorrect = selectedLevel && level.id === currentScenario.correctLevel;
            const showIncorrect = isSelected && !isCorrect;

            return (
              <button
                key={level.id}
                onClick={() => handleSelect(level.id)}
                disabled={selectedLevel !== null}
                aria-pressed={isSelected}
                className={cn(
                  "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  selectedLevel === null ? level.color : "opacity-50 cursor-not-allowed grayscale",
                  showCorrect && "opacity-100 ring-4 ring-emerald-500 ring-offset-2 grayscale-0",
                  showIncorrect && "opacity-100 ring-4 ring-red-500 ring-offset-2 grayscale-0"
                )}
              >
                <level.icon className="h-6 w-6" />
                <span className="font-semibold text-sm">{level.label}</span>
              </button>
            );
          })}
        </div>

        {selectedLevel && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300" aria-live="polite">
            <div className={cn(
              "p-4 rounded-lg mb-6 flex gap-3",
              isCorrect ? "bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-800" 
                        : "bg-red-50 text-red-900 border border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-800"
            )}>
              {isCorrect ? <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" /> : <XCircle className="h-6 w-6 shrink-0 text-red-600" />}
              <div>
                <p className="font-bold mb-1">{isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}</p>
                <p className="text-sm">{currentScenario.explanation}</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleNext}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {currentIndex < scenarios.length - 1 ? "Cas suivant" : "Voir les résultats"}
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
