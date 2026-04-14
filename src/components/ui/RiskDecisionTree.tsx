import React, { useState } from "react";
import { Card, CardContent } from "./Card";
import { ArrowRight, RotateCcw, AlertTriangle, ShieldAlert, Info, CheckCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

type NodeId = 'start' | 'q1' | 'q2' | 'q3' | 'unacceptable' | 'high' | 'limited' | 'minimal';

interface DecisionNode {
  id: NodeId;
  question?: string;
  options?: { label: string; next: NodeId }[];
  result?: {
    level: string;
    description: string;
    color: string;
    icon: React.ElementType;
  };
}

const tree: Record<NodeId, DecisionNode> = {
  start: {
    id: 'start',
    question: "Commencez l'évaluation pour déterminer le niveau de risque de votre système d'IA selon l'IA Act.",
    options: [{ label: "Démarrer l'évaluation", next: 'q1' }]
  },
  q1: {
    id: 'q1',
    question: "Le système utilise-t-il des techniques subliminales, exploite-t-il des vulnérabilités, fait-il du scoring social ou de la reconnaissance faciale en temps réel dans l'espace public ?",
    options: [
      { label: "Oui", next: 'unacceptable' },
      { label: "Non", next: 'q2' }
    ]
  },
  q2: {
    id: 'q2',
    question: "Le système est-il utilisé dans des domaines critiques (RH, éducation, justice, santé, infrastructures critiques, maintien de l'ordre) ou est-il un composant de sécurité d'un produit réglementé ?",
    options: [
      { label: "Oui", next: 'high' },
      { label: "Non", next: 'q3' }
    ]
  },
  q3: {
    id: 'q3',
    question: "Le système interagit-il avec des humains (chatbot), génère-t-il des contenus (deepfakes, textes, images) ou catégorise-t-il des émotions ?",
    options: [
      { label: "Oui", next: 'limited' },
      { label: "Non", next: 'minimal' }
    ]
  },
  unacceptable: {
    id: 'unacceptable',
    result: {
      level: "Risque Inacceptable",
      description: "Ce système est INTERDIT dans l'Union Européenne.",
      color: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
      icon: AlertTriangle
    }
  },
  high: {
    id: 'high',
    result: {
      level: "Risque Élevé",
      description: "Obligations strictes : évaluation de conformité, gestion des risques, qualité des données, documentation, transparence, supervision humaine, robustesse et cybersécurité.",
      color: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
      icon: ShieldAlert
    }
  },
  limited: {
    id: 'limited',
    result: {
      level: "Risque Limité",
      description: "Obligations de transparence : les utilisateurs doivent être informés qu'ils interagissent avec une IA ou que le contenu a été généré par une IA.",
      color: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
      icon: Info
    }
  },
  minimal: {
    id: 'minimal',
    result: {
      level: "Risque Minimal",
      description: "Pas d'obligations spécifiques au titre de l'IA Act (mais le RGPD et autres lois s'appliquent toujours). Codes de conduite volontaires encouragés.",
      color: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
      icon: CheckCircle
    }
  }
};

export function RiskDecisionTree() {
  const [currentNode, setCurrentNode] = useState<NodeId>('start');
  const [history, setHistory] = useState<NodeId[]>([]);

  const node = tree[currentNode];

  const handleOptionClick = (next: NodeId) => {
    setHistory([...history, currentNode]);
    setCurrentNode(next);
  };

  const handleReset = () => {
    setCurrentNode('start');
    setHistory([]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const prev = newHistory.pop()!;
      setHistory(newHistory);
      setCurrentNode(prev);
    }
  };

  return (
    <Card className="my-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Logigramme IA Act</h3>
          {currentNode !== 'start' && (
            <button 
              onClick={handleReset}
              className="text-sm flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Recommencer
            </button>
          )}
        </div>

        <div className="min-h-[200px] flex flex-col justify-center" aria-live="polite">
          {node.question && (
            <div className="space-y-6">
              <p className="text-lg font-medium text-center">{node.question}</p>
              <div className="flex flex-wrap justify-center gap-4">
                {node.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt.next)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {opt.label} <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {node.result && (
            <div className={cn("p-6 rounded-xl border-2 text-center space-y-4 animate-in zoom-in-95 duration-300", node.result.color)}>
              <div className="flex justify-center">
                <node.result.icon className="h-12 w-12" />
              </div>
              <h4 className="text-2xl font-bold">{node.result.level}</h4>
              <p className="text-lg">{node.result.description}</p>
            </div>
          )}
        </div>

        {history.length > 0 && !node.result && (
          <div className="mt-8 pt-4 border-t dark:border-slate-800">
            <button 
              onClick={handleBack}
              className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              &larr; Retour à la question précédente
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
