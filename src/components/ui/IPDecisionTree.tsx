import React, { useState } from "react";
import { Scale, Globe, User, RefreshCw, CheckCircle2, XCircle, AlertCircle, ArrowRight, ShieldQuestion } from "lucide-react";
import { cn } from "@/src/lib/utils";

type NodeId = 'start' | 'simple_prompt' | 'complex_prompt' | 'human_edit' | 'us_simple' | 'eu_simple' | 'us_complex' | 'eu_complex';

interface TreeNode {
  question?: string;
  icon?: React.ElementType;
  options?: { label: string; next: NodeId }[];
  isResult?: boolean;
  title?: string;
  type?: 'success' | 'warning' | 'danger';
  content?: string;
}

const treeData: Record<NodeId, TreeNode> = {
  start: {
    question: "Quel a été votre niveau d'intervention dans la création du contenu ?",
    icon: User,
    options: [
      { label: "Génération brute avec un prompt simple (ex: 'Un chat sur un canapé')", next: "simple_prompt" },
      { label: "Ingénierie de prompt très complexe et itérative (des dizaines de paramètres)", next: "complex_prompt" },
      { label: "Génération par IA suivie de retouches humaines substantielles (réécriture, montage, Photoshop)", next: "human_edit" }
    ]
  },
  simple_prompt: {
    question: "Dans quelle juridiction souhaitez-vous faire valoir vos droits ?",
    icon: Globe,
    options: [
      { label: "États-Unis (US Copyright Office)", next: "us_simple" },
      { label: "Union Européenne / France", next: "eu_simple" }
    ]
  },
  complex_prompt: {
    question: "Dans quelle juridiction souhaitez-vous faire valoir vos droits ?",
    icon: Globe,
    options: [
      { label: "États-Unis (US Copyright Office)", next: "us_complex" },
      { label: "Union Européenne / France", next: "eu_complex" }
    ]
  },
  us_simple: {
    isResult: true,
    title: "Aucun droit d'auteur (Domaine Public)",
    type: "danger",
    content: "Aux États-Unis, le US Copyright Office exige une 'paternité humaine' (human authorship). Une image ou un texte généré par une IA avec un prompt simple ne bénéficie d'aucune protection et appartient au domaine public."
  },
  eu_simple: {
    isResult: true,
    title: "Aucun droit d'auteur",
    type: "danger",
    content: "En Europe, pour qu'une œuvre soit protégée, elle doit être 'originale' et porter 'l'empreinte de la personnalité de son auteur'. Un prompt simple ne permet pas de caractériser cette empreinte."
  },
  us_complex: {
    isResult: true,
    title: "Droit d'auteur refusé (en général)",
    type: "warning",
    content: "Le US Copyright Office considère qu'un prompt, même très complexe, s'apparente à des 'instructions données à un exécutant' (la machine). L'IA détermine l'expression finale, donc l'humain n'est pas l'auteur de l'image générée (ex: affaire Zarya of the Dawn)."
  },
  eu_complex: {
    isResult: true,
    title: "Zone grise juridique (Très incertain)",
    type: "warning",
    content: "En théorie, si vous prouvez que vos choix dans le prompt sont libres, créatifs et reflètent votre personnalité, un juge pourrait l'admettre. En pratique, c'est extrêmement difficile à prouver et la jurisprudence actuelle tend vers le refus."
  },
  human_edit: {
    isResult: true,
    title: "Droit d'auteur partiel (sur l'apport humain)",
    type: "success",
    content: "Si vous modifiez substantiellement le contenu généré par l'IA (ex: repeindre des parties, réécrire des paragraphes entiers, faire un montage créatif), vous obtenez un droit d'auteur UNIQUEMENT sur les modifications humaines que vous avez apportées, pas sur la base générée par l'IA."
  }
};

export function IPDecisionTree() {
  const [history, setHistory] = useState<NodeId[]>(['start']);
  
  const currentNodeId = history[history.length - 1];
  const currentNode = treeData[currentNodeId];

  const handleOptionClick = (nextId: NodeId) => {
    setHistory([...history, nextId]);
  };

  const handleReset = () => {
    setHistory(['start']);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const Icon = currentNode.icon || ShieldQuestion;

  return (
    <div className="my-8 border rounded-xl overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
      <div className="bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 border-b dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Arbre de décision : Propriété Intellectuelle</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Déterminez si votre contenu généré par IA est protégé par le droit d'auteur.
            </p>
          </div>
        </div>
        {history.length > 1 && (
          <button 
            onClick={handleReset}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Recommencer
          </button>
        )}
      </div>

      <div className="p-6 sm:p-8 min-h-[300px] flex flex-col justify-center">
        {!currentNode.isResult ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-6 justify-center text-center">
              <Icon className="h-8 w-8 text-blue-500" />
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">{currentNode.question}</h4>
            </div>
            
            <div className="space-y-3">
              {currentNode.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.next)}
                  className="w-full text-left p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    {option.label}
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-300 max-w-2xl mx-auto w-full text-center">
            <div className={cn(
              "inline-flex items-center justify-center p-5 rounded-full mb-6",
              currentNode.type === 'success' ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" :
              currentNode.type === 'warning' ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" :
              "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
            )}>
              {currentNode.type === 'success' ? <CheckCircle2 className="h-12 w-12" /> :
               currentNode.type === 'warning' ? <AlertCircle className="h-12 w-12" /> :
               <XCircle className="h-12 w-12" />}
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{currentNode.title}</h3>
            
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left mb-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentNode.content}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              Faire une autre simulation
            </button>
          </div>
        )}

        {history.length > 1 && !currentNode.isResult && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleBack}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              ← Retour à l'étape précédente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
