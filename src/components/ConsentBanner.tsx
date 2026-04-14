import { useState, useEffect } from "react";
import { X, Info } from "lucide-react";
import { Link } from "react-router-dom";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("privacy_consent_accepted");
    if (!hasConsented) {
      // Small delay to let the initial animations finish
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacy_consent_accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-full duration-500"
      role="alertdialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
    >
      <div className="max-w-7xl mx-auto bg-slate-900 text-slate-50 dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-700">
        <div className="flex items-start gap-3">
          <Info className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm">
            <p id="consent-title" className="font-bold mb-1">Respect de votre vie privée (RGPD)</p>
            <p id="consent-desc" className="text-slate-300">
              Cette application utilise le stockage local de votre navigateur uniquement pour sauvegarder votre progression. 
              Aucune donnée personnelle n'est envoyée sur nos serveurs et nous n'utilisons aucun traceur publicitaire.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <Link 
            to="/politique-confidentialite" 
            className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
            aria-label="Lire la politique de confidentialité"
          >
            En savoir plus
          </Link>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            aria-label="Accepter et fermer le bandeau"
          >
            Compris <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
