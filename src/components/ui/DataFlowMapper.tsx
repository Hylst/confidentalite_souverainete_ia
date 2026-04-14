import React, { useState, useRef, useEffect } from "react";
import { Database, Laptop, Users, Cloud, Server, AlertTriangle, CheckCircle2, X, ShieldAlert, ShieldCheck, Info, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

type NodeType = {
  id: string;
  label: string;
  icon: React.ElementType;
  type: 'source' | 'destination';
};

const sources: NodeType[] = [
  { id: 'src-db', label: 'Base de données Clients', icon: Database, type: 'source' },
  { id: 'src-crm', label: 'CRM / RH', icon: Users, type: 'source' },
  { id: 'src-laptop', label: 'Poste Employé', icon: Laptop, type: 'source' },
];

const destinations: NodeType[] = [
  { id: 'dst-public', label: 'LLM Public (ex: ChatGPT gratuit)', icon: Cloud, type: 'destination' },
  { id: 'dst-private', label: 'API Privée (ex: Azure OpenAI)', icon: Server, type: 'destination' },
  { id: 'dst-local', label: 'Modèle Local (ex: Ollama)', icon: Laptop, type: 'destination' },
];

type DataType = 'public' | 'interne' | 'confidentiel' | 'secret';

type Flow = {
  id: string;
  sourceId: string;
  destinationId: string;
  dataType: DataType;
};

export function DataFlowMapper() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const [selectedDataType, setSelectedDataType] = useState<DataType>('interne');
  const [isCreating, setIsCreating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{id: string, x1: number, y1: number, x2: number, y2: number, color: string}[]>([]);

  const updateLines = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const newLines = flows.map(flow => {
      const srcEl = document.getElementById(`node-${flow.sourceId}`);
      const dstEl = document.getElementById(`node-${flow.destinationId}`);
      
      if (!srcEl || !dstEl) return null;
      
      const srcRect = srcEl.getBoundingClientRect();
      const dstRect = dstEl.getBoundingClientRect();
      
      const x1 = srcRect.right - containerRect.left;
      const y1 = srcRect.top + srcRect.height / 2 - containerRect.top;
      const x2 = dstRect.left - containerRect.left;
      const y2 = dstRect.top + dstRect.height / 2 - containerRect.top;
      
      let color = "#94a3b8"; // slate-400
      if (flow.destinationId === 'dst-public' && (flow.dataType === 'confidentiel' || flow.dataType === 'secret')) color = "#ef4444"; // red
      else if (flow.destinationId === 'dst-public' && flow.dataType === 'interne') color = "#f59e0b"; // amber
      else if (flow.destinationId === 'dst-private' && flow.dataType === 'secret') color = "#f59e0b"; // amber
      else color = "#10b981"; // emerald
      
      return { id: flow.id, x1, y1, x2, y2, color };
    }).filter(Boolean) as any;
    
    setLines(newLines);
  };

  useEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    // Add a small delay to ensure DOM is fully rendered before calculating lines
    const timeout = setTimeout(updateLines, 100);
    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timeout);
    };
  }, [flows]);

  const handleNodeClick = (node: NodeType) => {
    if (node.type === 'source') {
      setSelectedSource(node.id === selectedSource ? null : node.id);
    } else {
      setSelectedDest(node.id === selectedDest ? null : node.id);
    }
  };

  useEffect(() => {
    if (selectedSource && selectedDest) {
      setIsCreating(true);
    } else {
      setIsCreating(false);
    }
  }, [selectedSource, selectedDest]);

  const handleAddFlow = () => {
    if (selectedSource && selectedDest) {
      const newFlow: Flow = {
        id: `${selectedSource}-${selectedDest}-${Date.now()}`,
        sourceId: selectedSource,
        destinationId: selectedDest,
        dataType: selectedDataType
      };
      setFlows([...flows, newFlow]);
      setSelectedSource(null);
      setSelectedDest(null);
      setIsCreating(false);
    }
  };

  const removeFlow = (id: string) => {
    setFlows(flows.filter(f => f.id !== id));
  };

  const getRiskLevel = (flow: Flow) => {
    if (flow.destinationId === 'dst-public' && (flow.dataType === 'confidentiel' || flow.dataType === 'secret')) return { level: 'Critique', color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400', icon: ShieldAlert, desc: 'Fuite de données garantie. Les LLM publics réutilisent ces données.' };
    if (flow.destinationId === 'dst-public' && flow.dataType === 'interne') return { level: 'Élevé', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', icon: AlertTriangle, desc: 'Risque de fuite. Évitez de transmettre des données internes non publiques.' };
    if (flow.destinationId === 'dst-private' && flow.dataType === 'secret') return { level: 'Modéré', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400', icon: Info, desc: 'Vérifiez que votre contrat (DPA) couvre bien les données classées "Secret".' };
    return { level: 'Faible', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400', icon: ShieldCheck, desc: 'Flux sécurisé et adapté au type de données.' };
  };

  return (
    <div className="my-8 space-y-8">
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">1. Dessinez vos flux de données</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Sélectionnez une source (à gauche) puis une destination (à droite) pour créer un flux.
        </p>

        <div className="relative" ref={containerRef}>
          {/* SVG Overlay for lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '300px' }}>
            {lines.map((line) => (
              <line 
                key={line.id} 
                x1={line.x1} 
                y1={line.y1} 
                x2={line.x2} 
                y2={line.y2} 
                stroke={line.color} 
                strokeWidth="3" 
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            ))}
          </svg>

          <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-24 relative z-10">
            {/* Sources */}
            <div className="flex-1 space-y-4">
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-center mb-4">Sources Internes</h4>
              {sources.map(node => (
                <button
                  key={node.id}
                  id={`node-${node.id}`}
                  onClick={() => handleNodeClick(node)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all bg-white dark:bg-slate-950",
                    selectedSource === node.id ? "border-blue-500 shadow-md ring-2 ring-blue-200 dark:ring-blue-900" : "border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800"
                  )}
                >
                  <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-400">
                    <node.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm text-left">{node.label}</span>
                </button>
              ))}
            </div>

            {/* Destinations */}
            <div className="flex-1 space-y-4">
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-center mb-4">Services IA</h4>
              {destinations.map(node => (
                <button
                  key={node.id}
                  id={`node-${node.id}`}
                  onClick={() => handleNodeClick(node)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all bg-white dark:bg-slate-950",
                    selectedDest === node.id ? "border-blue-500 shadow-md ring-2 ring-blue-200 dark:ring-blue-900" : "border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800"
                  )}
                >
                  <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-400">
                    <node.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-sm text-left">{node.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Creation Modal/Popover */}
          {isCreating && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 w-full max-w-sm animate-in zoom-in-95">
              <h4 className="font-bold text-lg mb-4">Configurer le flux</h4>
              <p className="text-sm mb-4">Quel type de données va circuler dans ce flux ?</p>
              <select 
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 mb-6"
                value={selectedDataType}
                onChange={(e) => setSelectedDataType(e.target.value as DataType)}
              >
                <option value="public">Données Publiques (site web, plaquettes)</option>
                <option value="interne">Données Internes (procédures, notes)</option>
                <option value="confidentiel">Données Confidentielles (données clients, RH)</option>
                <option value="secret">Secret d'Affaires (code source, stratégie)</option>
              </select>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setSelectedSource(null); setSelectedDest(null); }}
                  className="flex-1 py-2 px-4 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleAddFlow}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Ajouter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {flows.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">2. Analyse des risques</h3>
          <div className="grid gap-4">
            {flows.map(flow => {
              const source = sources.find(s => s.id === flow.sourceId);
              const dest = destinations.find(d => d.id === flow.destinationId);
              const risk = getRiskLevel(flow);
              
              return (
                <div key={flow.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-sm flex items-center gap-1"><source.icon className="h-4 w-4 text-slate-500" /> {source?.label}</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded font-medium uppercase tracking-wider">
                      {flow.dataType}
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="font-medium text-sm flex items-center gap-1"><dest.icon className="h-4 w-4 text-slate-500" /> {dest?.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium", risk.color)}>
                      <risk.icon className="h-4 w-4" />
                      {risk.level}
                    </div>
                    <button 
                      onClick={() => removeFlow(flow.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Supprimer ce flux"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="w-full text-sm text-slate-600 dark:text-slate-400 sm:hidden mt-2 border-t border-slate-100 dark:border-slate-800 pt-2">
                    {risk.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
