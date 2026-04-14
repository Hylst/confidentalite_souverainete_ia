import React, { useState } from "react";
import { CheckSquare, Copy, Printer, Download, CheckCircle2, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function BestPracticesGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [tools, setTools] = useState({
    chatgpt: false,
    copilot: false,
    midjourney: false,
    internal: false,
  });
  const [dataTypes, setDataTypes] = useState({
    client: false,
    code: false,
    financial: false,
  });
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleToolChange = (tool: keyof typeof tools) => {
    setTools(prev => ({ ...prev, [tool]: !prev[tool] }));
  };

  const handleDataChange = (data: keyof typeof dataTypes) => {
    setDataTypes(prev => ({ ...prev, [data]: !prev[data] }));
  };

  const generateMarkdown = () => {
    const date = new Date().toLocaleDateString('fr-FR');
    let md = `# Fiche de Bonnes Pratiques IA - ${companyName || "[Nom de l'entreprise]"}\n`;
    md += `*Mise à jour le : ${date}*\n\n`;
    md += `Cette fiche résume les règles d'or pour l'utilisation de l'Intelligence Artificielle au sein de notre organisation, afin de garantir la sécurité de nos données et le respect du RGPD.\n\n`;

    md += `## 🛡️ Règles Générales (Applicables à tous)\n`;
    md += `- **Ne jamais saisir de données personnelles** (noms, emails, numéros de téléphone) dans un outil IA non validé par la DSI.\n`;
    md += `- **Ne jamais partager de secrets d'affaires** (stratégie, données financières non publiées) avec des outils grand public.\n`;
    md += `- **Toujours vérifier les résultats** générés par l'IA (risque d'hallucination) avant de les utiliser ou de les transférer à un client.\n`;
    md += `- **Transparence** : Si vous utilisez l'IA pour générer un document important, mentionnez-le à votre responsable ou au destinataire.\n\n`;

    md += `## 🛠️ Outils Autorisés et Leurs Usages\n\n`;

    if (tools.chatgpt) {
      md += `### ChatGPT / Claude / Gemini (Versions Gratuites ou Grand Public)\n`;
      md += `- ✅ **AUTORISÉ POUR** : Reformulation de textes génériques, idéation, traduction de textes non confidentiels.\n`;
      md += `- ❌ **INTERDIT POUR** : Analyser des données clients, résumer des contrats, corriger du code propriétaire.\n`;
      md += `- ⚠️ **Attention** : Vos conversations peuvent être utilisées pour entraîner les modèles. Ne donnez aucun contexte sensible.\n\n`;
    }

    if (tools.copilot) {
      md += `### Microsoft Copilot / Outils intégrés (avec licence Entreprise)\n`;
      md += `- ✅ **AUTORISÉ POUR** : Résumer vos propres emails, générer des brouillons de documents internes, analyser des données Excel non sensibles.\n`;
      md += `- 🔒 **Sécurité** : Les données restent dans notre environnement sécurisé (vérifiez que vous êtes bien connecté avec votre compte professionnel).\n\n`;
    }

    if (tools.midjourney) {
      md += `### Générateurs d'images (Midjourney, DALL-E)\n`;
      md += `- ✅ **AUTORISÉ POUR** : Création d'illustrations pour des présentations internes ou des maquettes.\n`;
      md += `- ❌ **INTERDIT POUR** : Créer des visuels imitant des marques déposées ou des artistes vivants.\n`;
      md += `- ⚠️ **Attention** : Les images générées ne sont généralement pas protégées par le droit d'auteur. Ne basez pas l'identité visuelle de l'entreprise dessus.\n\n`;
    }

    if (tools.internal) {
      md += `### Outil IA Interne (LLM Privé / RAG)\n`;
      md += `- ✅ **AUTORISÉ POUR** : Interroger la base de connaissances de l'entreprise, analyser des documents internes confidentiels.\n`;
      md += `- 🔒 **Sécurité** : Cet outil est sécurisé et vos requêtes ne sortent pas de notre infrastructure.\n\n`;
    }

    if (!tools.chatgpt && !tools.copilot && !tools.midjourney && !tools.internal) {
      md += `*Aucun outil spécifique n'a été sélectionné. Veuillez vous référer à la DSI pour connaître la liste des outils approuvés.*\n\n`;
    }

    if (dataTypes.client || dataTypes.code || dataTypes.financial) {
      md += `## ⚠️ Précautions Spécifiques par Type de Données\n\n`;
      if (dataTypes.client) {
        md += `- **Données Clients (RGPD)** : Pseudonymisez systématiquement les données (remplacez "Jean Dupont" par "Client A") avant toute analyse par IA.\n`;
      }
      if (dataTypes.code) {
        md += `- **Code Source** : N'utilisez que des assistants de code approuvés par l'entreprise (ex: GitHub Copilot for Business). Ne collez jamais de code propriétaire dans des LLM publics.\n`;
      }
      if (dataTypes.financial) {
        md += `- **Données Financières** : Les bilans non publiés et les prévisions budgétaires sont strictement interdits sur tout outil IA cloud non souverain.\n`;
      }
    }

    return md;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const html = `
        <html>
          <head>
            <title>Fiche Bonnes Pratiques IA</title>
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; }
              h1 { color: #1e40af; border-bottom: 2px solid #bfdbfe; padding-bottom: 0.5rem; }
              h2 { color: #1e3a8a; margin-top: 2rem; }
              h3 { color: #3b82f6; }
              ul { padding-left: 1.5rem; }
              li { margin-bottom: 0.5rem; }
            </style>
          </head>
          <body>
            ${generateMarkdown().replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>').replace(/# (.*)/g, '<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
            <script>window.print(); window.onafterprint = function(){ window.close(); }</script>
          </body>
        </html>
      `;
      printWindow.document.write(html);
      printWindow.document.close();
    }
  };

  return (
    <div className="my-8 space-y-8">
      {!generated ? (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-6">Générateur de Fiche Pratique</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom de votre entreprise</label>
              <input 
                type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Ex: Acme Corp"
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Quels outils IA vos employés utilisent-ils ?</label>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                  <input type="checkbox" checked={tools.chatgpt} onChange={() => handleToolChange('chatgpt')} className="w-4 h-4 text-blue-600" />
                  <span>LLM Publics (ChatGPT, Claude...)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                  <input type="checkbox" checked={tools.copilot} onChange={() => handleToolChange('copilot')} className="w-4 h-4 text-blue-600" />
                  <span>Assistants intégrés (Copilot, Gemini Workspace)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                  <input type="checkbox" checked={tools.midjourney} onChange={() => handleToolChange('midjourney')} className="w-4 h-4 text-blue-600" />
                  <span>Générateurs d'images (Midjourney, DALL-E)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                  <input type="checkbox" checked={tools.internal} onChange={() => handleToolChange('internal')} className="w-4 h-4 text-blue-600" />
                  <span>Outil IA interne sécurisé</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Quels types de données manipulez-vous ?</label>
              <div className="grid sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                  <input type="checkbox" checked={dataTypes.client} onChange={() => handleDataChange('client')} className="w-4 h-4 text-blue-600" />
                  <span>Données Clients (RGPD)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                  <input type="checkbox" checked={dataTypes.code} onChange={() => handleDataChange('code')} className="w-4 h-4 text-blue-600" />
                  <span>Code Source</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                  <input type="checkbox" checked={dataTypes.financial} onChange={() => handleDataChange('financial')} className="w-4 h-4 text-blue-600" />
                  <span>Données Financières</span>
                </label>
              </div>
            </div>

            <button 
              onClick={() => setGenerated(true)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
            >
              Générer la Fiche Pratique
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-5 w-5" /> Fiche générée avec succès
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setGenerated(false)}
                className="px-3 py-1.5 text-sm font-medium border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Modifier
              </button>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copié !" : "Copier (Markdown)"}
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Printer className="h-4 w-4" /> Imprimer / PDF
              </button>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/30 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
            {generateMarkdown()}
          </div>
        </div>
      )}
    </div>
  );
}
