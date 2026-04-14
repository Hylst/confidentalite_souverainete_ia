import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { FileText, Download, Copy, Check, ChevronRight, ChevronLeft, Shield, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { SEO } from "@/src/components/SEO";
import { useProgress } from "@/src/contexts/ProgressContext";
import { useLocation } from "react-router-dom";

interface FormData {
  companyName: string;
  aiManager: string;
  contactEmail: string;
  aiTypes: string[];
  principles: string[];
  reviewFrequency: string;
}

const AI_TYPES = [
  { id: "genai", label: "IA Générative (ex: ChatGPT, Midjourney, Copilot)" },
  { id: "predictive", label: "IA Prédictive (ex: prévisions de ventes, maintenance)" },
  { id: "automation", label: "Automatisation intelligente (ex: tri de documents, RPA)" },
  { id: "hr", label: "IA RH (ex: tri de CV, évaluation des performances)" }
];

const PRINCIPLES = [
  { id: "transparency", label: "Transparence et Explicabilité", desc: "Les utilisateurs doivent savoir quand ils interagissent avec une IA. Les décisions de l'IA doivent pouvoir être expliquées." },
  { id: "human_oversight", label: "Supervision Humaine", desc: "L'IA est un outil d'aide à la décision. La décision finale et la responsabilité incombent toujours à un humain." },
  { id: "fairness", label: "Équité et Non-discrimination", desc: "Les systèmes d'IA doivent être testés pour éviter de reproduire ou d'amplifier des biais discriminatoires." },
  { id: "privacy", label: "Confidentialité et Protection des Données", desc: "Aucune donnée personnelle sensible ou donnée confidentielle de l'entreprise ne doit être saisie dans des IA publiques non sécurisées." },
  { id: "security", label: "Sécurité et Robustesse", desc: "Les systèmes d'IA doivent être sécurisés contre les attaques (ex: prompt injection) et testés régulièrement." }
];

export default function Generator() {
  const { isCompleted, toggleCompletion } = useProgress();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    aiManager: "",
    contactEmail: "",
    aiTypes: ["genai"],
    principles: ["transparency", "human_oversight", "privacy"],
    reviewFrequency: "1 an"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'aiTypes' | 'principles', id: string) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id];
      return { ...prev, [field]: updated };
    });
  };

  const generateMarkdown = () => {
    const date = new Date().toLocaleDateString('fr-FR');
    
    const selectedAiTypes = AI_TYPES.filter(t => formData.aiTypes.includes(t.id));
    const selectedPrinciples = PRINCIPLES.filter(p => formData.principles.includes(p.id));

    return `# Charte Éthique d'Utilisation de l'Intelligence Artificielle

**Entreprise :** ${formData.companyName || "[Nom de l'entreprise]"}
**Date de mise à jour :** ${date}
**Responsable IA / Référent :** ${formData.aiManager || "[Nom du responsable]"} (${formData.contactEmail || "[Email]"})

## 1. Préambule
La présente charte définit le cadre éthique, légal et opérationnel de l'utilisation des systèmes d'Intelligence Artificielle (IA) au sein de **${formData.companyName || "[Nom de l'entreprise]"}**. Elle vise à garantir que l'innovation technologique s'accompagne d'un respect strict des droits fondamentaux, du RGPD et du futur IA Act européen.

## 2. Périmètre d'Application
Cette charte s'applique à l'ensemble des collaborateurs, prestataires et partenaires utilisant des systèmes d'IA dans le cadre de leurs missions pour l'entreprise.

Les types d'IA actuellement encadrés par cette charte incluent :
${selectedAiTypes.length > 0 ? selectedAiTypes.map(t => `- **${t.label}**`).join('\n') : "- [À définir]"}

## 3. Principes Fondamentaux
Dans le cadre de nos activités, nous nous engageons à respecter les principes suivants :

${selectedPrinciples.length > 0 ? selectedPrinciples.map(p => `### 3.${selectedPrinciples.indexOf(p) + 1}. ${p.label}\n${p.desc}`).join('\n\n') : "[Sélectionnez des principes]"}

## 4. Signalement et Sanctions
Tout collaborateur constatant une utilisation de l'IA contraire à cette charte (ex: fuite de données, biais discriminatoire avéré) doit le signaler immédiatement au Responsable IA. Le non-respect de cette charte peut entraîner des sanctions disciplinaires.

## 5. Gouvernance et Révision
L'écosystème de l'IA évoluant rapidement, cette charte sera révisée au minimum tous les **${formData.reviewFrequency}** par le comité de direction et le Responsable IA.

---
*Document généré via l'outil Conformité IA & RGPD.*
`;
  };

  const markdownContent = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Charte_Ethique_IA_${formData.companyName.replace(/\s+/g, '_') || 'Entreprise'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Générateur de Charte IA" 
        description="Créez une charte éthique d'utilisation de l'IA personnalisée pour votre entreprise en quelques clics."
        path="/generator"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-600" />
          Générateur de Charte Éthique IA
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Créez une ébauche personnalisée de charte éthique pour encadrer l'usage de l'IA dans votre organisation.
        </p>
      </div>

      <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 text-sm text-blue-800 dark:text-blue-300">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <strong>Transparence IA (Conformité IA Act) :</strong> Ce document est généré de manière automatisée. Si vous utilisez un modèle d'Intelligence Artificielle pour le modifier ou l'améliorer par la suite, vous avez l'obligation d'en informer les utilisateurs finaux.
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative" aria-label="Progression du formulaire">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            aria-current={step === s ? "step" : undefined}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors",
              step >= s 
                ? "bg-blue-600 border-white dark:border-slate-950 text-white" 
                : "bg-slate-200 border-white dark:border-slate-950 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            )}
          >
            {step > s ? <Check className="h-5 w-5" /> : s}
          </div>
        ))}
      </div>

      <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <CardContent className="p-6 sm:p-8" aria-live="polite">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">1. Informations Générales</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium mb-1">Nom de l'entreprise / organisation</label>
                  <input 
                    type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange}
                    placeholder="Ex: Acme Corp"
                    className="w-full px-4 py-2 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="aiManager" className="block text-sm font-medium mb-1">Responsable IA / Référent (Nom ou Fonction)</label>
                  <input 
                    type="text" id="aiManager" name="aiManager" value={formData.aiManager} onChange={handleInputChange}
                    placeholder="Ex: DSI, DPO, ou Jeanne Doe"
                    className="w-full px-4 py-2 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Email de contact du référent</label>
                  <input 
                    type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange}
                    placeholder="Ex: ia-ethique@acme.com"
                    className="w-full px-4 py-2 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">2. Périmètre d'Utilisation</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sélectionnez les types d'IA utilisés ou envisagés dans votre organisation :</p>
              
              <div className="space-y-3">
                {AI_TYPES.map(type => (
                  <label key={type.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.aiTypes.includes(type.id)}
                      onChange={() => handleCheckboxChange('aiTypes', type.id)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="font-medium">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">3. Principes Éthiques</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sélectionnez les principes fondamentaux à inclure dans votre charte :</p>
              
              <div className="space-y-3">
                {PRINCIPLES.map(principle => (
                  <label key={principle.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.principles.includes(principle.id)}
                      onChange={() => handleCheckboxChange('principles', principle.id)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-bold block">{principle.label}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{principle.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4">
                <label className="block text-sm font-medium mb-1">Fréquence de révision de la charte</label>
                <select 
                  name="reviewFrequency" 
                  value={formData.reviewFrequency} 
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="6 mois">Tous les 6 mois</option>
                  <option value="1 an">Tous les ans</option>
                  <option value="2 ans">Tous les 2 ans</option>
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  Votre Charte est prête
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
                    title="Copier le texte"
                  >
                    {copied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors dark:text-blue-400 dark:hover:bg-blue-900/30"
                    title="Télécharger en Markdown (.md)"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border dark:border-slate-800 overflow-x-auto">
                <pre className="text-sm whitespace-pre-wrap font-mono text-slate-800 dark:text-slate-300">
                  {markdownContent}
                </pre>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t dark:border-slate-800">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="px-4 py-2 flex items-center gap-2 font-medium text-slate-600 hover:text-slate-900 disabled:opacity-0 transition-colors dark:text-slate-400 dark:hover:text-slate-100"
            >
              <ChevronLeft className="h-4 w-4" /> Précédent
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => setStep(s => Math.min(4, s + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => toggleCompletion(location.pathname)}
                  className={cn(
                    "px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
                    isCompleted(location.pathname)
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  )}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isCompleted(location.pathname) ? "Terminé" : "Marquer comme terminé"}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Télécharger (.md)
                </button>
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
