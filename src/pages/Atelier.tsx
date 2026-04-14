import { useParams, Navigate, useLocation } from "react-router-dom";
import { atelierData } from "@/src/data/atelierData";
import { useProgress } from "@/src/contexts/ProgressContext";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { SEO } from "@/src/components/SEO";

export default function Atelier() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { isCompleted, toggleCompletion } = useProgress();
  
  if (!id || !atelierData[id]) {
    return <Navigate to="/" replace />;
  }

  const completed = isCompleted(location.pathname);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title={`Atelier ${id}`} 
        description={`Atelier pratique ${id} de la formation Conformité IA & RGPD.`}
        path={location.pathname}
      />
      {atelierData[id]}
      
      <div className="mt-12 pt-8 border-t dark:border-slate-800 flex justify-between items-center">
        <button
          onClick={() => toggleCompletion(location.pathname)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
            completed 
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50" 
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          )}
        >
          {completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
          {completed ? "Terminé" : "Marquer comme terminé"}
        </button>
      </div>
    </div>
  );
}
