import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw, Lock, Globe, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { cn } from '@/src/lib/utils';

type Tool = 'public' | 'private' | 'local';

interface Scenario {
  id: number;
  title: string;
  description: string;
  dataSensitivity: 'Haute' | 'Moyenne' | 'Faible';
  correctTool: Tool | Tool[];
  feedback: Record<Tool, string>;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Résumé d'un contrat de travail",
    description: "Vous devez résumer un contrat de travail de 15 pages pour le nouveau Directeur Financier. Le document contient son salaire, son adresse personnelle et des clauses de confidentialité.",
    dataSensitivity: 'Haute',
    correctTool: 'private', // Assuming private enterprise tool is OK, local is OK. Let's say local or private.
    feedback: {
      public: "ALERTE RGPD ! Vous venez d'envoyer des données personnelles et confidentielles sur des serveurs publics. Ces données pourraient être utilisées pour entraîner de futurs modèles.",
      private: "Correct. Un outil d'entreprise sécurisé (avec un accord DPA garantissant la non-réutilisation des données) est adapté.",
      local: "Parfait. Un modèle local garantit qu'aucune donnée ne quitte votre ordinateur."
    }
  },
  {
    id: 2,
    title: "Correction de code source propriétaire",
    description: "Vous êtes développeur et vous bloquez sur un algorithme critique qui constitue le cœur de métier (secret industriel) de votre entreprise.",
    dataSensitivity: 'Haute',
    correctTool: 'local',
    feedback: {
      public: "FUITE DE PROPRIÉTÉ INTELLECTUELLE ! Le code source de votre entreprise a été exposé. Des concurrents pourraient y avoir accès via de futures générations du modèle.",
      private: "Acceptable si le contrat (DPA) stipule explicitement que le code n'est pas utilisé pour l'entraînement, mais un risque de fuite subsiste.",
      local: "Excellent choix. Pour le secret industriel critique, un LLM hébergé localement (ex: Ollama) ou sur un cloud souverain (SecNumCloud) est la seule garantie absolue."
    }
  },
  {
    id: 3,
    title: "Rédaction d'un post LinkedIn",
    description: "Vous souhaitez rédiger une annonce publique pour annoncer la participation de votre entreprise à un salon professionnel le mois prochain.",
    dataSensitivity: 'Faible',
    correctTool: ['public', 'private', 'local'],
    feedback: {
      public: "Bon choix. L'information a vocation à être publique, il n'y a donc aucun risque de confidentialité à utiliser un outil grand public.",
      private: "C'est correct, bien que l'utilisation d'un outil sécurisé ne soit pas strictement nécessaire pour des données publiques.",
      local: "C'est correct, mais peut-être surdimensionné pour une tâche ne nécessitant aucune confidentialité."
    }
  }
];

export function ShadowITSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = scenarios[currentStep];
  const isGameOver = currentStep >= scenarios.length;

  const handleToolSelect = (tool: Tool) => {
    if (showFeedback) return;
    setSelectedTool(tool);
    setShowFeedback(true);

    const isCorrect = Array.isArray(scenario.correctTool) 
      ? scenario.correctTool.includes(tool)
      : scenario.correctTool === tool || (scenario.correctTool === 'local' && tool === 'private' && scenario.id !== 2); // Simplification

    // Custom scoring logic based on strictness
    if (tool === 'public' && scenario.dataSensitivity === 'Haute') {
      // Big penalty
    } else if (isCorrect || (tool === 'local') || (tool === 'private' && scenario.id !== 2)) {
      setScore(s => s + 1);
    }
  };

  const nextScenario = () => {
    setSelectedTool(null);
    setShowFeedback(false);
    setCurrentStep(s => s + 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedTool(null);
    setShowFeedback(false);
  };

  if (isGameOver) {
    return (
      <Card className="border-blue-200 dark:border-blue-900">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold">Simulation terminée</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Vous avez obtenu un score de sécurité de {score} / {scenarios.length}.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-left text-sm text-slate-600 dark:text-slate-400">
            <p><strong>Règle d'or :</strong> Ne copiez jamais de données personnelles (RGPD) ou de secrets industriels dans une IA générative grand public. Privilégiez toujours les environnements contrôlés par votre DSI.</p>
          </div>
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
        <span>Scénario {currentStep + 1} sur {scenarios.length}</span>
        <span>Score de sécurité : {score}</span>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
              scenario.dataSensitivity === 'Haute' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
              scenario.dataSensitivity === 'Moyenne' ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
              "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            )}>
              Sensibilité : {scenario.dataSensitivity}
            </span>
          </div>
          <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
          <p className="text-slate-600 dark:text-slate-400">{scenario.description}</p>
        </div>

        <CardContent className="p-6">
          <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Choisissez l'outil IA à utiliser :</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <button
              onClick={() => handleToolSelect('public')}
              disabled={showFeedback}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all flex flex-col items-center text-center gap-3",
                selectedTool === 'public' ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
                showFeedback && selectedTool !== 'public' && "opacity-50 cursor-not-allowed"
              )}
            >
              <Globe className="h-8 w-8 text-slate-400" />
              <div>
                <div className="font-bold">IA Grand Public</div>
                <div className="text-xs text-slate-500 mt-1">(ex: ChatGPT gratuit, Claude)</div>
              </div>
            </button>

            <button
              onClick={() => handleToolSelect('private')}
              disabled={showFeedback}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all flex flex-col items-center text-center gap-3",
                selectedTool === 'private' ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
                showFeedback && selectedTool !== 'private' && "opacity-50 cursor-not-allowed"
              )}
            >
              <Lock className="h-8 w-8 text-blue-500" />
              <div>
                <div className="font-bold">IA d'Entreprise</div>
                <div className="text-xs text-slate-500 mt-1">(ex: Copilot Enterprise, API sécurisée)</div>
              </div>
            </button>

            <button
              onClick={() => handleToolSelect('local')}
              disabled={showFeedback}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all flex flex-col items-center text-center gap-3",
                selectedTool === 'local' ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
                showFeedback && selectedTool !== 'local' && "opacity-50 cursor-not-allowed"
              )}
            >
              <Server className="h-8 w-8 text-emerald-500" />
              <div>
                <div className="font-bold">IA Locale / Souveraine</div>
                <div className="text-xs text-slate-500 mt-1">(ex: Ollama, SecNumCloud)</div>
              </div>
            </button>
          </div>

          {showFeedback && selectedTool && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className={cn(
                "p-4 rounded-xl flex gap-4 items-start",
                (selectedTool === 'public' && scenario.dataSensitivity === 'Haute') 
                  ? "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-200 border border-red-200 dark:border-red-800/50"
                  : "bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/50"
              )}>
                {(selectedTool === 'public' && scenario.dataSensitivity === 'Haute') ? (
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold mb-1">
                    {(selectedTool === 'public' && scenario.dataSensitivity === 'Haute') ? "Mauvais choix !" : "Analyse :"}
                  </h4>
                  <p className="text-sm opacity-90">{scenario.feedback[selectedTool]}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextScenario}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium transition-colors"
                >
                  Scénario suivant <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
