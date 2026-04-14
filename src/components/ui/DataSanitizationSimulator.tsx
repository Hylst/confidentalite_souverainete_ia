import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Shield, CheckCircle2, XCircle, AlertTriangle, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type Token = {
  id: number;
  text: string;
  isSensitive: boolean;
  type?: string;
};

const initialTokens: Token[] = [
  { id: 1, text: "Bonjour, je dois résumer l'entretien annuel de ", isSensitive: false },
  { id: 2, text: "Thomas Dubois", isSensitive: true, type: "NOM" },
  { id: 3, text: ", qui travaille comme ingénieur chez ", isSensitive: false },
  { id: 4, text: "TechCorp", isSensitive: true, type: "ENTREPRISE" },
  { id: 5, text: " depuis 3 ans. Vous pouvez le joindre au ", isSensitive: false },
  { id: 6, text: "06 12 34 56 78", isSensitive: true, type: "TÉLÉPHONE" },
  { id: 7, text: " ou sur ", isSensitive: false },
  { id: 8, text: "t.dubois@techcorp.fr", isSensitive: true, type: "EMAIL" },
  { id: 9, text: ". Il a récemment eu des problèmes de santé (", isSensitive: false },
  { id: 10, text: "diabète de type 2", isSensitive: true, type: "SANTÉ" },
  { id: 11, text: ") qui ont impacté ses performances sur le ", isSensitive: false },
  { id: 12, text: "Projet Alpha", isSensitive: true, type: "SECRET" },
  { id: 13, text: ", notre futur produit phare.", isSensitive: false }
];

export function DataSanitizationSimulator() {
  const [redactedIds, setRedactedIds] = useState<Set<number>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleRedact = (id: number) => {
    if (isSubmitted) return;
    const newRedacted = new Set(redactedIds);
    if (newRedacted.has(id)) {
      newRedacted.delete(id);
    } else {
      newRedacted.add(id);
    }
    setRedactedIds(newRedacted);
  };

  const checkResults = () => {
    setIsSubmitted(true);
  };

  const reset = () => {
    setRedactedIds(new Set());
    setIsSubmitted(false);
  };

  const sensitiveTokens = initialTokens.filter(t => t.isSensitive);
  const correctlyRedacted = sensitiveTokens.filter(t => redactedIds.has(t.id));
  const missedTokens = sensitiveTokens.filter(t => !redactedIds.has(t.id));
  const falsePositives = initialTokens.filter(t => !t.isSensitive && redactedIds.has(t.id));

  const score = correctlyRedacted.length;
  const total = sensitiveTokens.length;
  const isPerfect = score === total && falsePositives.length === 0;

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Nettoyeur de Prompt (Anonymisation)</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Cliquez sur les éléments sensibles du texte ci-dessous pour les masquer avant de l'envoyer à l'IA.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="p-6 bg-white dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-lg leading-loose shadow-inner">
            {initialTokens.map((token) => {
              const isRedacted = redactedIds.has(token.id);
              
              let tokenClass = "transition-all duration-200 cursor-pointer rounded px-1 mx-[2px] border-b-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800";
              
              if (isRedacted) {
                tokenClass = "bg-slate-900 text-transparent select-none cursor-pointer rounded px-2 mx-[2px] relative group dark:bg-slate-100";
              }

              // Highlight errors after submission
              if (isSubmitted) {
                if (token.isSensitive && !isRedacted) {
                  tokenClass += " bg-red-100 text-red-900 border-red-500 dark:bg-red-900/40 dark:text-red-200"; // Missed
                } else if (!token.isSensitive && isRedacted) {
                  tokenClass += " ring-2 ring-amber-500"; // False positive
                } else if (token.isSensitive && isRedacted) {
                  tokenClass += " ring-2 ring-emerald-500"; // Correct
                }
              }

              return (
                <span
                  key={token.id}
                  onClick={() => toggleRedact(token.id)}
                  className={tokenClass}
                  title={isRedacted ? "Cliquer pour annuler" : "Cliquer pour masquer"}
                >
                  {isRedacted ? (
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white dark:text-slate-900">
                      [{token.type || 'CACHÉ'}]
                    </span>
                  ) : null}
                  {token.text}
                </span>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-slate-500 flex items-center gap-2">
              <EyeOff className="h-4 w-4" /> {redactedIds.size} élément(s) masqué(s)
            </div>
            {!isSubmitted ? (
              <button
                onClick={checkResults}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Vérifier l'anonymisation
              </button>
            ) : (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="h-4 w-4" /> Recommencer
              </button>
            )}
          </div>

          {isSubmitted && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
              <div className={cn(
                "p-6 rounded-xl border",
                isPerfect 
                  ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50" 
                  : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/50"
              )}>
                <div className="flex items-start gap-4">
                  {isPerfect ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
                      {isPerfect ? "Parfait ! Le prompt est sécurisé." : "Attention, des données ont fuité !"}
                    </h4>
                    
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li>
                        <strong>Score :</strong> {score} / {total} données sensibles masquées.
                      </li>
                      {missedTokens.length > 0 && (
                        <li className="text-red-600 dark:text-red-400">
                          <strong>Oublis critiques :</strong> Vous avez laissé passer des informations sensibles (surlignées en rouge).
                        </li>
                      )}
                      {falsePositives.length > 0 && (
                        <li className="text-amber-600 dark:text-amber-400">
                          <strong>Excès de zèle :</strong> Vous avez masqué des mots non sensibles. Cela peut dégrader la qualité de la réponse de l'IA.
                        </li>
                      )}
                    </ul>

                    <div className="mt-4 p-4 bg-white/60 dark:bg-slate-950/50 rounded-lg text-sm">
                      <strong>Rappel RGPD :</strong> L'anonymisation doit être irréversible. Remplacer un nom par "[NOM]" est une bonne pratique avant d'utiliser un LLM public. N'oubliez pas les données de santé (très sensibles) et les secrets industriels !
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
