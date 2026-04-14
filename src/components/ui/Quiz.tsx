import * as React from "react"
import { useState } from "react"
import { cn } from "@/src/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"

interface QuizProps {
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation?: string;
}

export function Quiz({ question, options, explanation }: QuizProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (selectedId) setIsSubmitted(true);
  };

  const selectedOption = options.find(o => o.id === selectedId);
  const isCorrect = selectedOption?.isCorrect;

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h4 id="quiz-question" className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Quiz : {question}</h4>
      <div className="space-y-3" role="group" aria-labelledby="quiz-question">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const showCorrect = isSubmitted && option.isCorrect;
          const showWrong = isSubmitted && isSelected && !option.isCorrect;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isSubmitted}
              aria-pressed={isSelected}
              className={cn(
                "w-full flex items-center justify-between rounded-lg border p-4 text-left transition-all",
                !isSubmitted && isSelected && "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
                !isSubmitted && !isSelected && "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900",
                showCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                showWrong && "border-red-500 bg-red-50 dark:bg-red-950/30",
                isSubmitted && !showCorrect && !showWrong && "border-slate-200 opacity-50 dark:border-slate-800"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  isSelected && !isSubmitted ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300 text-slate-500 dark:border-slate-700",
                  showCorrect && "border-emerald-500 bg-emerald-500 text-white",
                  showWrong && "border-red-500 bg-red-500 text-white"
                )}>
                  {option.id}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  showCorrect ? "text-emerald-900 dark:text-emerald-100" : showWrong ? "text-red-900 dark:text-red-100" : "text-slate-700 dark:text-slate-300"
                )}>
                  {option.text}
                </span>
              </div>
              {showCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              {showWrong && <XCircle className="h-5 w-5 text-red-500" />}
            </button>
          );
        })}
      </div>
      
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="mt-6 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Valider la réponse
        </button>
      ) : (
        <div 
          aria-live="polite"
          className={cn(
          "mt-6 rounded-lg p-4 text-sm",
          isCorrect ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" : "bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200"
        )}>
          <p className="font-semibold mb-1">
            {isCorrect ? "Bonne réponse !" : "Mauvaise réponse."}
          </p>
          {explanation && <p className="opacity-90">{explanation}</p>}
        </div>
      )}
    </div>
  );
}
