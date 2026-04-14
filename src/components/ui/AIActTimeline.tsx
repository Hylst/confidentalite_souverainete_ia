import { CheckCircle2, AlertTriangle, ShieldAlert, Cpu, Calendar } from "lucide-react";
import { cn } from "@/src/lib/utils";

const timelineEvents = [
  {
    date: "Août 2024",
    title: "Entrée en vigueur",
    description: "L'IA Act entre officiellement en vigueur 20 jours après sa publication au Journal Officiel de l'UE.",
    icon: CheckCircle2,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    date: "Février 2025",
    title: "Interdictions applicables (6 mois)",
    description: "Les systèmes d'IA à risque inacceptable (ex: scoring social, manipulation subliminale) sont formellement interdits.",
    icon: AlertTriangle,
    color: "text-red-500 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    date: "Août 2025",
    title: "Règles pour les GPAI (12 mois)",
    description: "Les obligations pour les modèles d'IA à usage général (GPAI) comme GPT-4, Claude ou Gemini entrent en application (transparence, droits d'auteur).",
    icon: Cpu,
    color: "text-purple-500 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    date: "Août 2026",
    title: "Systèmes à Haut Risque (24 mois)",
    description: "Application des obligations strictes pour les IA à haut risque listées à l'Annexe III (RH, éducation, justice, maintien de l'ordre, etc.).",
    icon: ShieldAlert,
    color: "text-orange-500 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    date: "Août 2027",
    title: "Produits réglementés (36 mois)",
    description: "Application aux systèmes d'IA intégrés dans des produits déjà réglementés (dispositifs médicaux, jouets, véhicules, etc.).",
    icon: Calendar,
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  }
];

export function AIActTimeline() {
  return (
    <div className="my-10">
      <h3 className="text-xl font-bold mb-6">Calendrier d'application de l'IA Act (2024 - 2027)</h3>
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative pl-8 md:pl-10 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 150}ms` }}>
            {/* Timeline dot */}
            <div className={cn(
              "absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white dark:bg-slate-950",
              event.borderColor
            )}>
              <event.icon className={cn("h-4 w-4", event.color)} />
            </div>
            
            {/* Content card */}
            <div className={cn(
              "rounded-xl border p-5 shadow-sm transition-all hover:shadow-md",
              event.bgColor,
              event.borderColor
            )}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                <span className={cn("font-bold text-lg", event.color)}>{event.date}</span>
                <span className="hidden sm:block text-slate-300 dark:text-slate-600">•</span>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{event.title}</h4>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
