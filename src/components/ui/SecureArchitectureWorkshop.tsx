import React, { useState } from "react";
import { Database, Globe, Lock, Server, Cloud, ShieldAlert, ShieldCheck, CheckCircle2, RefreshCw, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";

type ComponentType = 'data' | 'network' | 'llm';

interface ArchComponent {
  id: string;
  type: ComponentType;
  label: string;
  icon: React.ElementType;
  isSecure: boolean;
  description: string;
}

const availableComponents: ArchComponent[] = [
  // Data
  { id: 'data-public', type: 'data', label: 'Base de données standard', icon: Database, isSecure: false, description: 'Base de données sans chiffrement spécifique ni isolation réseau.' },
  { id: 'data-vpc', type: 'data', label: 'Base de données sur VPC', icon: Lock, isSecure: true, description: 'Base de données isolée dans un Virtual Private Cloud avec chiffrement au repos.' },
  
  // Network
  { id: 'net-public', type: 'network', label: 'Internet Public', icon: Globe, isSecure: false, description: 'Les requêtes transitent par le réseau internet public standard.' },
  { id: 'net-private', type: 'network', label: 'Private Link / VPN', icon: ShieldCheck, isSecure: true, description: 'Connexion réseau privée et chiffrée de bout en bout.' },
  
  // LLM
  { id: 'llm-public', type: 'llm', label: 'API LLM Publique', icon: Cloud, isSecure: false, description: 'API grand public (ex: ChatGPT standard). Les données peuvent entraîner le modèle.' },
  { id: 'llm-private', type: 'llm', label: 'API LLM Privée (DPA)', icon: Server, isSecure: true, description: 'API d\'entreprise (ex: Azure OpenAI) avec contrat interdisant l\'entraînement.' },
  { id: 'llm-local', type: 'llm', label: 'LLM Local (On-Premise)', icon: Server, isSecure: true, description: 'Modèle open-source déployé sur vos propres serveurs.' },
];

export function SecureArchitectureWorkshop() {
  const [slots, setSlots] = useState<{ data: string | null; network: string | null; llm: string | null }>({
    data: null,
    network: null,
    llm: null
  });
  const [selectedForMobile, setSelectedForMobile] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('componentId', id);
  };

  const handleDrop = (e: React.DragEvent, type: ComponentType) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('componentId');
    const component = availableComponents.find(c => c.id === id);
    
    if (component && component.type === type) {
      setSlots(prev => ({ ...prev, [type]: id }));
      setShowResult(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMobileSelect = (id: string) => {
    const component = availableComponents.find(c => c.id === id);
    if (!component) return;

    if (selectedForMobile === id) {
      setSelectedForMobile(null);
    } else {
      setSelectedForMobile(id);
      // Auto-place if it's obvious
      setSlots(prev => ({ ...prev, [component.type]: id }));
      setSelectedForMobile(null);
      setShowResult(false);
    }
  };

  const checkArchitecture = () => {
    setShowResult(true);
  };

  const reset = () => {
    setSlots({ data: null, network: null, llm: null });
    setShowResult(false);
  };

  const isComplete = slots.data && slots.network && slots.llm;
  
  const dataComp = availableComponents.find(c => c.id === slots.data);
  const netComp = availableComponents.find(c => c.id === slots.network);
  const llmComp = availableComponents.find(c => c.id === slots.llm);

  const isSecure = dataComp?.isSecure && netComp?.isSecure && llmComp?.isSecure;

  return (
    <div className="my-8 border rounded-xl overflow-hidden bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
      <div className="bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 border-b dark:border-slate-800">
        <h3 className="text-xl font-bold mb-2">Atelier : Architecture Sécurisée</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong>Mission :</strong> Vous devez déployer une IA pour analyser des dossiers médicaux (données de santé hautement confidentielles). 
          Glissez-déposez (ou cliquez sur) les composants pour construire une architecture conforme.
        </p>
      </div>

      <div className="p-4 sm:p-6 grid lg:grid-cols-3 gap-8">
        {/* Components Palette */}
        <div className="lg:col-span-1 space-y-6">
          <h4 className="font-semibold text-slate-700 dark:text-slate-300 border-b dark:border-slate-800 pb-2">Composants disponibles</h4>
          
          {(['data', 'network', 'llm'] as ComponentType[]).map(type => (
            <div key={type} className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {type === 'data' ? '1. Stockage des données' : type === 'network' ? '2. Réseau & Transit' : '3. Modèle IA'}
              </div>
              {availableComponents.filter(c => c.type === type).map(comp => (
                <div
                  key={comp.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, comp.id)}
                  onClick={() => handleMobileSelect(comp.id)}
                  className={cn(
                    "p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all flex items-center gap-3 bg-white dark:bg-slate-900",
                    slots[type] === comp.id ? "opacity-50 border-slate-200 dark:border-slate-800" : "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md"
                  )}
                >
                  <comp.icon className="h-5 w-5 text-slate-500" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{comp.label}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Architecture Canvas */}
        <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 flex flex-col items-center justify-center min-h-[400px]">
          
          <div className="w-full max-w-md space-y-8 relative">
            {/* Data Slot */}
            <div 
              onDrop={(e) => handleDrop(e, 'data')}
              onDragOver={handleDragOver}
              className={cn(
                "relative p-6 rounded-xl border-2 transition-all text-center",
                slots.data ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md" : "border-dashed border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-950"
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-slate-500">
                SOURCE DE DONNÉES
              </div>
              {dataComp ? (
                <div className="flex flex-col items-center gap-2 animate-in zoom-in-95">
                  <dataComp.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold">{dataComp.label}</span>
                  {showResult && (
                    <span className={cn("text-xs font-medium px-2 py-1 rounded", dataComp.isSecure ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                      {dataComp.isSecure ? "Sécurisé" : "Vulnérable"}
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-slate-400 text-sm py-4">Glissez un composant de stockage ici</div>
              )}
            </div>

            {/* Connection Line */}
            <div className="absolute left-1/2 top-[80px] bottom-[80px] w-1 bg-slate-300 dark:bg-slate-700 -translate-x-1/2 -z-10"></div>

            {/* Network Slot */}
            <div 
              onDrop={(e) => handleDrop(e, 'network')}
              onDragOver={handleDragOver}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all text-center w-3/4 mx-auto",
                slots.network ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md" : "border-dashed border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-950"
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-slate-500">
                RÉSEAU
              </div>
              {netComp ? (
                <div className="flex flex-col items-center gap-1 animate-in zoom-in-95">
                  <netComp.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold text-sm">{netComp.label}</span>
                  {showResult && (
                    <span className={cn("text-xs font-medium px-2 py-1 rounded", netComp.isSecure ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                      {netComp.isSecure ? "Chiffré" : "Exposé"}
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-slate-400 text-sm py-2">Glissez un réseau ici</div>
              )}
            </div>

            {/* LLM Slot */}
            <div 
              onDrop={(e) => handleDrop(e, 'llm')}
              onDragOver={handleDragOver}
              className={cn(
                "relative p-6 rounded-xl border-2 transition-all text-center",
                slots.llm ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md" : "border-dashed border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-950"
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-slate-500">
                MOTEUR IA
              </div>
              {llmComp ? (
                <div className="flex flex-col items-center gap-2 animate-in zoom-in-95">
                  <llmComp.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold">{llmComp.label}</span>
                  {showResult && (
                    <span className={cn("text-xs font-medium px-2 py-1 rounded", llmComp.isSecure ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                      {llmComp.isSecure ? "Privé" : "Fuite possible"}
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-slate-400 text-sm py-4">Glissez un modèle IA ici</div>
              )}
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-8 w-full max-w-md">
            {!showResult ? (
              <button
                onClick={checkArchitecture}
                disabled={!isComplete}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
              >
                Vérifier l'architecture
              </button>
            ) : (
              <div className={cn(
                "p-6 rounded-xl border-2 animate-in slide-in-from-bottom-4",
                isSecure ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
              )}>
                <div className="flex items-center gap-3 mb-4">
                  {isSecure ? <CheckCircle2 className="h-8 w-8 text-emerald-600" /> : <ShieldAlert className="h-8 w-8 text-red-600" />}
                  <h4 className={cn("text-xl font-bold", isSecure ? "text-emerald-800 dark:text-emerald-400" : "text-red-800 dark:text-red-400")}>
                    {isSecure ? "Architecture Validée !" : "Faille de Sécurité Détectée"}
                  </h4>
                </div>
                
                <div className="space-y-3 mb-6 text-sm">
                  {!dataComp?.isSecure && <p className="flex items-start gap-2 text-red-700 dark:text-red-300"><AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> La base de données standard expose les données de santé. Utilisez un VPC.</p>}
                  {!netComp?.isSecure && <p className="flex items-start gap-2 text-red-700 dark:text-red-300"><AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> Le transit par internet public permet l'interception. Utilisez un Private Link.</p>}
                  {!llmComp?.isSecure && <p className="flex items-start gap-2 text-red-700 dark:text-red-300"><AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> L'API publique va réutiliser les dossiers médicaux pour s'entraîner. C'est une violation majeure du RGPD.</p>}
                  
                  {isSecure && <p className="text-emerald-700 dark:text-emerald-300">Parfait ! Les données sont isolées (VPC), transitent de manière chiffrée (Private Link), et le modèle IA garantit la non-réutilisation des données. Le secret médical est préservé.</p>}
                </div>

                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 font-medium rounded-lg transition-colors"
                >
                  <RefreshCw className="h-4 w-4" /> Recommencer
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
