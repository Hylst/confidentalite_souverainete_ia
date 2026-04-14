import { useState } from "react";
import { Stethoscope, Scale, Code, Megaphone, ShoppingCart, Briefcase, CheckCircle2, XCircle, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

const scenarios = [
  {
    id: 1,
    role: "Médecin",
    icon: Stethoscope,
    context: "Vous devez rédiger un compte-rendu médical détaillé à partir de vos notes de consultation concernant un patient.",
    question: "Quel outil IA choisissez-vous d'utiliser ?",
    options: [
      { id: "a", text: "ChatGPT ou Claude (version gratuite)", isCorrect: false, feedback: "Interdit. Les données de santé sont extrêmement sensibles (Niveau Rouge). Les LLM grand public peuvent réutiliser les données pour l'entraînement." },
      { id: "b", text: "Un LLM d'entreprise classique avec DPA", isCorrect: false, feedback: "Insuffisant. En France, le traitement de données de santé nécessite obligatoirement un hébergement certifié HDS (Hébergeur de Données de Santé)." },
      { id: "c", text: "Un LLM déployé sur un environnement certifié HDS", isCorrect: true, feedback: "Parfait ! C'est la seule solution légale et sécurisée pour traiter des données de santé identifiantes." }
    ]
  },
  {
    id: 2,
    role: "Avocat / Juriste",
    icon: Scale,
    context: "Vous souhaitez résumer un contrat client confidentiel (protégé par un NDA) de 50 pages.",
    question: "Quelle est la solution la plus appropriée ?",
    options: [
      { id: "a", text: "ChatGPT Plus (abonnement payant)", isCorrect: false, feedback: "Attention : par défaut, même avec un abonnement Plus, OpenAI peut utiliser les données pour l'entraînement (sauf opt-out explicite). Le risque de violation du NDA est trop grand." },
      { id: "b", text: "Une API LLM d'entreprise (ex: Azure OpenAI) avec DPA et opt-out d'entraînement", isCorrect: true, feedback: "Exactement. Le DPA (Data Processing Agreement) garantit la confidentialité, et l'opt-out assure que le contrat ne servira pas à entraîner le modèle." },
      { id: "c", text: "Un LLM open-source hébergé aux États-Unis sans contrat spécifique", isCorrect: false, feedback: "Interdit. Sans DPA et avec un transfert hors UE non encadré, vous violez à la fois le RGPD et votre secret professionnel." }
    ]
  },
  {
    id: 3,
    role: "Développeur",
    icon: Code,
    context: "Vous voulez générer une fonction de tri générique en Python pour un projet open-source.",
    question: "Quel outil pouvez-vous utiliser ?",
    options: [
      { id: "a", text: "Uniquement un LLM d'entreprise ultra-sécurisé", isCorrect: false, feedback: "C'est possible, mais ce n'est pas obligatoire. Le code générique open-source ne contient aucune donnée sensible." },
      { id: "b", text: "N'importe quel LLM grand public (ChatGPT, Gemini, Claude...)", isCorrect: true, feedback: "Correct ! Puisqu'il n'y a aucune donnée personnelle (RGPD) ni donnée confidentielle (Secret d'affaires), vous pouvez utiliser des outils grand public." },
      { id: "c", text: "Aucun, l'IA est interdite pour le code", isCorrect: false, feedback: "Faux. L'IA est un excellent outil d'assistance au développement, tant qu'on ne lui confie pas de code propriétaire ou de clés API." }
    ]
  },
  {
    id: 4,
    role: "Marketing",
    icon: Megaphone,
    context: "Vous souhaitez utiliser une IA générative (comme Midjourney ou DALL-E) pour créer des visuels publicitaires pour votre prochaine campagne mondiale.",
    question: "Quelle précaution principale devez-vous prendre concernant la propriété intellectuelle ?",
    options: [
      { id: "a", text: "Aucune, les images générées par l'IA sont libres de droits et m'appartiennent.", isCorrect: false, feedback: "Faux. Dans la plupart des juridictions, une œuvre générée uniquement par une IA ne bénéficie pas du droit d'auteur. De plus, les conditions d'utilisation varient selon l'outil." },
      { id: "b", text: "Vérifier les conditions d'utilisation (droits commerciaux) et s'assurer de ne pas générer des images copiant le style d'un artiste vivant ou des marques déposées.", isCorrect: true, feedback: "Exactement. Il faut s'assurer d'avoir les droits commerciaux et éviter la contrefaçon en générant des éléments protégés (personnages, logos, styles spécifiques)." },
      { id: "c", text: "Utiliser uniquement des prompts très courts pour éviter le plagiat.", isCorrect: false, feedback: "La longueur du prompt ne garantit pas l'absence de contrefaçon. L'IA peut générer une image protégée même avec un prompt court." }
    ]
  },
  {
    id: 5,
    role: "Achats",
    icon: ShoppingCart,
    context: "Vous devez évaluer les offres de plusieurs fournisseurs. Vous envisagez de soumettre leurs propositions commerciales et financières détaillées à un LLM pour qu'il génère un tableau comparatif.",
    question: "Est-ce une bonne pratique ?",
    options: [
      { id: "a", text: "Oui, c'est un excellent gain de temps, peu importe l'outil utilisé.", isCorrect: false, feedback: "Dangereux. Les propositions contiennent des secrets d'affaires (prix, stratégies). Les envoyer à un LLM grand public expose ces données confidentielles." },
      { id: "b", text: "Non, c'est strictement interdit dans tous les cas.", isCorrect: false, feedback: "Faux. L'IA peut être utilisée pour cette tâche, à condition de choisir le bon outil et le bon cadre juridique." },
      { id: "c", text: "Oui, mais uniquement avec un LLM d'entreprise sécurisé (avec DPA) garantissant la non-réutilisation des données pour l'entraînement.", isCorrect: true, feedback: "Parfait. Les secrets d'affaires nécessitent un environnement sécurisé et la garantie contractuelle que vos données ne seront pas réutilisées." }
    ]
  },
  {
    id: 6,
    role: "Direction Générale",
    icon: Briefcase,
    context: "Vous envisagez de déployer un système d'IA pour analyser les performances des employés et recommander des promotions ou des licenciements.",
    question: "Selon l'IA Act et le RGPD, quelle est la contrainte majeure ?",
    options: [
      { id: "a", text: "C'est un système à 'Risque Élevé'. Il nécessite une évaluation de conformité stricte et une supervision humaine obligatoire pour toute décision.", isCorrect: true, feedback: "Exact. L'IA Act classe les systèmes RH dans la catégorie 'Risque Élevé'. De plus, le RGPD (Art. 22) interdit les décisions entièrement automatisées produisant des effets juridiques." },
      { id: "b", text: "Il suffit d'informer le CSE (Comité Social et Économique) de la mise en place de l'outil.", isCorrect: false, feedback: "Insuffisant. L'information du CSE est nécessaire, mais ne dispense pas des obligations de l'IA Act (documentation, supervision) ni du RGPD (AIPD)." },
      { id: "c", text: "L'IA Act interdit formellement l'utilisation de l'IA dans les ressources humaines.", isCorrect: false, feedback: "Faux. L'utilisation n'est pas interdite (Risque Inacceptable), mais elle est strictement encadrée (Risque Élevé)." }
    ]
  }
];

export function RolePlayGame() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = scenarios[currentStep];

  const handleSelect = (id: string) => {
    if (showFeedback) return;
    setSelectedOption(id);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentStep(0);
  };

  if (currentStep >= scenarios.length) {
    return (
      <div className="my-8 border rounded-xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 text-center shadow-sm">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-4">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Exercice terminé !</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Vous avez bien compris les nuances de confidentialité selon les métiers et les types de données.
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          Recommencer
        </button>
      </div>
    );
  }

  const Icon = scenario.icon;

  return (
    <div className="my-8 border rounded-xl overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
      <div className="bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 border-b dark:border-slate-800 flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Cas pratique {currentStep + 1} / {scenarios.length}
          </div>
          <h3 className="text-xl font-bold">Vous êtes : {scenario.role}</h3>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-lg mb-2">{scenario.context}</p>
        <p className="font-medium mb-6 text-slate-700 dark:text-slate-300">{scenario.question}</p>

        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.isCorrect;
            
            let buttonClass = "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20";
            
            if (showFeedback) {
              if (isCorrect) {
                buttonClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500";
              } else if (isSelected && !isCorrect) {
                buttonClass = "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500";
              } else {
                buttonClass = "border-slate-200 dark:border-slate-800 opacity-50";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={showFeedback}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                  buttonClass
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={cn("font-medium", showFeedback && isCorrect && "text-emerald-700 dark:text-emerald-400")}>
                    {option.text}
                  </span>
                  {showFeedback && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />}
                  {showFeedback && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
                </div>
                
                {showFeedback && (isSelected || isCorrect) && (
                  <div className={cn(
                    "mt-3 text-sm p-3 rounded-md",
                    isCorrect ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
                  )}>
                    <strong>{isCorrect ? "Explication : " : "Erreur : "}</strong>
                    {option.feedback}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 flex justify-end animate-in fade-in">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              {currentStep < scenarios.length - 1 ? "Cas suivant" : "Terminer"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
