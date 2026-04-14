import React, { useState } from "react";
import { CheckCircle2, AlertCircle, GripVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";

type RiskLevel = "red" | "orange" | "yellow" | "green" | "unassigned";

interface DataItem {
  id: string;
  text: string;
  correctLevel: RiskLevel;
}

const initialItems: DataItem[] = [
  { id: "1", text: "Numéro de sécurité sociale (NIR)", correctLevel: "red" },
  { id: "2", text: "Dossier médical d'un patient", correctLevel: "red" },
  { id: "3", text: "Base de données clients avec adresses personnelles", correctLevel: "orange" },
  { id: "4", text: "Fichier de paie des employés", correctLevel: "orange" },
  { id: "5", text: "Adresses e-mail professionnelles (B2B)", correctLevel: "yellow" },
  { id: "6", text: "Logs de connexion pseudonymisés", correctLevel: "yellow" },
  { id: "7", text: "Article de blog public de l'entreprise", correctLevel: "green" },
  { id: "8", text: "Jeu de données synthétiques (fictif)", correctLevel: "green" },
];

const levels: { id: RiskLevel; title: string; color: string; bgColor: string; borderColor: string }[] = [
  { id: "red", title: "Niveau Rouge (Ne jamais envoyer)", color: "text-red-700 dark:text-red-400", bgColor: "bg-red-50 dark:bg-red-950/20", borderColor: "border-red-200 dark:border-red-900" },
  { id: "orange", title: "Niveau Orange (Anonymiser)", color: "text-orange-700 dark:text-orange-400", bgColor: "bg-orange-50 dark:bg-orange-950/20", borderColor: "border-orange-200 dark:border-orange-900" },
  { id: "yellow", title: "Niveau Jaune (Évaluer)", color: "text-yellow-700 dark:text-yellow-400", bgColor: "bg-yellow-50 dark:bg-yellow-950/20", borderColor: "border-yellow-200 dark:border-yellow-900" },
  { id: "green", title: "Niveau Vert (Sans risque)", color: "text-green-700 dark:text-green-400", bgColor: "bg-green-50 dark:bg-green-950/20", borderColor: "border-green-200 dark:border-green-900" },
];

export function DataRiskDragDrop() {
  const [items, setItems] = useState<{ [key: string]: RiskLevel }>(
    initialItems.reduce((acc, item) => ({ ...acc, [item.id]: "unassigned" }), {})
  );
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
    // For Firefox compatibility
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, level: RiskLevel) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggedItemId;
    if (id) {
      setItems((prev) => ({ ...prev, [id]: level }));
      setDraggedItemId(null);
      setShowResults(false);
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const reset = () => {
    setItems(initialItems.reduce((acc, item) => ({ ...acc, [item.id]: "unassigned" }), {}));
    setShowResults(false);
  };

  const unassignedItems = initialItems.filter((item) => items[item.id] === "unassigned");
  const allAssigned = Object.values(items).every((level) => level !== "unassigned");
  const score = initialItems.filter((item) => items[item.id] === item.correctLevel).length;

  return (
    <div className="my-8 border rounded-xl p-4 sm:p-6 bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Exercice : Classification des données</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Glissez-déposez chaque type de donnée dans la catégorie de risque correspondante avant de l'envoyer à un LLM.
      </p>

      {/* Zone des éléments non assignés */}
      <div 
        className="mb-8 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 min-h-[100px]"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "unassigned")}
      >
        <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Données à classer</h4>
        <div className="flex flex-wrap gap-2">
          {unassignedItems.length === 0 && (
            <p className="text-sm text-slate-400 italic w-full text-center py-4">Toutes les données ont été classées.</p>
          )}
          {unassignedItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-md text-sm cursor-grab active:cursor-grabbing shadow-sm hover:border-blue-400 transition-colors"
            >
              <GripVertical className="h-4 w-4 text-slate-400" />
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Zones de dépôt */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {levels.map((level) => {
          const levelItems = initialItems.filter((item) => items[item.id] === level.id);
          return (
            <div
              key={level.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, level.id)}
              className={cn(
                "rounded-lg border-2 p-4 min-h-[150px] transition-colors",
                level.bgColor,
                level.borderColor
              )}
            >
              <h4 className={cn("font-bold mb-3", level.color)}>{level.title}</h4>
              <div className="space-y-2">
                {levelItems.map((item) => {
                  const isCorrect = item.correctLevel === level.id;
                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      className={cn(
                        "flex items-center justify-between gap-2 bg-white dark:bg-slate-900 border px-3 py-2 rounded-md text-sm cursor-grab active:cursor-grabbing shadow-sm",
                        showResults 
                          ? isCorrect 
                            ? "border-emerald-500 dark:border-emerald-500" 
                            : "border-red-500 dark:border-red-500"
                          : "border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{item.text}</span>
                      </div>
                      {showResults && (
                        isCorrect 
                          ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          : <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t dark:border-slate-800">
        <div className="text-sm font-medium">
          {showResults && (
            <span className={score === initialItems.length ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
              Score : {score} / {initialItems.length}
              {score === initialItems.length ? " Parfait !" : " Il y a quelques erreurs, essayez encore."}
            </span>
          )}
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={reset}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors"
          >
            Réinitialiser
          </button>
          <button
            onClick={checkAnswers}
            disabled={!allAssigned}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            Vérifier
          </button>
        </div>
      </div>
    </div>
  );
}
