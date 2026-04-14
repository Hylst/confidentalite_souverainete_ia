import { Download, FileSpreadsheet } from "lucide-react";

export function RegisterDownload() {
  const handleDownload = () => {
    // Contenu CSV du registre IA
    const csvContent = [
      "ID,Nom du Système IA,Fournisseur / Modèle,Finalité du traitement,Données traitées,Niveau de risque (IA Act),Base légale (RGPD),Hébergement des données,Entraînement sur données client (Oui/Non),Responsable interne,Statut de conformité",
      "SYS-001,Chatbot Support Client,OpenAI / GPT-4,Assistance client de niveau 1,Historique des tickets (anonymisé),Risque Limité,Intérêt légitime,UE (Azure),Non,Jean Dupont,Conforme",
      "SYS-002,Outil de tri de CV,Fournisseur RH X,Présélection des candidats,CV et lettres de motivation,Risque Élevé,Consentement,UE,Oui,Marie Martin,En cours d'audit",
      "SYS-003,Générateur de code,GitHub Copilot,Aide au développement,Code source de l'entreprise,Risque Minimal,Exécution du contrat,USA (Clauses Types),Non,Équipe Tech,Conforme",
      "SYS-004,Analyseur de contrats,Anthropic / Claude 3,Synthèse de documents juridiques,Contrats clients (confidentiel),Risque Minimal,Intérêt légitime,UE (AWS),Non,Direction Juridique,Conforme",
      ",,,,,,,,,,",
      ",,,,,,,,,,",
    ].join("\n");

    // Créer un Blob et déclencher le téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Registre_Traitements_IA.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-8 p-6 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg shrink-0">
          <FileSpreadsheet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-1">
            Modèle de Registre IA (CSV)
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Téléchargez ce modèle prêt à l'emploi pour recenser et classifier les systèmes d'IA de votre organisation.
          </p>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        <Download className="h-4 w-4" />
        Télécharger
      </button>
    </div>
  );
}
