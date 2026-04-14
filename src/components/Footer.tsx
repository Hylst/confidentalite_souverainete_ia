import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer role="contentinfo" aria-label="Pied de page" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
          Créé par <a href="mailto:geoffroy.streit@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Envoyer un email à Geoffroy Streit">Geoffroy Streit</a> (alias Hylst). © {new Date().getFullYear()} Conformité IA, RGPD & Souveraineté.
        </div>
        <nav aria-label="Liens légaux" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link 
            to="/mentions-legales" 
            className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
          >
            Mentions Légales
          </Link>
          <Link 
            to="/politique-confidentialite" 
            className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
          >
            Politique de Confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  );
}
