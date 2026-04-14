import { Link } from "react-router-dom";
import { ArrowRight, Shield, BookOpen, Code, AlertTriangle, TrendingUp, Scale, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { SEO } from "@/src/components/SEO";
import { useProgress } from "@/src/contexts/ProgressContext";

export default function Home() {
  const { progressPercentage, userProfile, setIsOnboardingOpen, getNextModule } = useProgress();

  return (
    <div className="space-y-12">
      <SEO 
        title="Accueil" 
        description="Déployez l'IA en toute sécurité légale et éthique. Guide pratique pour les professionnels : RGPD, IA Act, propriété intellectuelle et confidentialité."
        path="/"
      />
      
      {/* Hero Section */}
      <div className="space-y-6 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[1.1]">
          Souveraineté, RGPD & IA Act : <br className="hidden sm:block" />
          <span className="text-blue-600 dark:text-blue-400">Déployez l'IA avec Sécurité et Honnêteté Intellectuelle</span>
        </h1>
        <p className="max-w-3xl text-xl text-slate-600 dark:text-slate-400">
          Au-delà de la simple conformité légale, ce guide vous accompagne pour garantir la confidentialité de vos données, maîtriser les risques sécuritaires et adopter une démarche éthique transparente face aux défis de l'Intelligence Artificielle.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          {!userProfile ? (
            <button 
              onClick={() => setIsOnboardingOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <PlayCircle className="h-5 w-5" />
              Commencer par mon profil
            </button>
          ) : (
            <div className="w-full sm:w-auto bg-slate-100 dark:bg-slate-900 px-6 py-3 rounded-lg flex items-center gap-4 border dark:border-slate-800">
              <div className="flex-1">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Votre progression</span>
                  <span className="text-blue-600 dark:text-blue-400">{progressPercentage}%</span>
                </div>
                <div className="w-48 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <Link 
                to={getNextModule()} 
                className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Continuer &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Pourquoi c'est important ? */}
      <div className="rounded-2xl bg-slate-950 text-white p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Shield className="w-64 h-64" />
        </div>
        <h2 className="text-2xl font-bold mb-8 text-center relative z-10">Pourquoi c'est important ?</h2>
        <div className="grid sm:grid-cols-3 gap-8 relative z-10">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-xl font-bold text-white">Souveraineté & Sécurité</div>
            <p className="text-sm text-slate-400">
              Protégez vos secrets industriels et évitez les fuites de données liées au "Shadow IT" et à l'utilisation d'IA non maîtrisées.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="text-xl font-bold text-white">Cadre Légal (RGPD & IA Act)</div>
            <p className="text-sm text-slate-400">
              Anticipez les réglementations européennes. L'IA Act prévoit des amendes pouvant atteindre 35M€ ou 7% du CA mondial.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
              <Scale className="h-6 w-6" />
            </div>
            <div className="text-xl font-bold text-white">Honnêteté Intellectuelle</div>
            <p className="text-sm text-slate-400">
              Garantissez la transparence, le respect du droit d'auteur et l'absence de biais discriminatoires envers vos utilisateurs.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col border-slate-200 dark:border-slate-800">
          <CardHeader>
            <Shield className="mb-2 h-8 w-8 text-blue-600" />
            <CardTitle>Section 1 : RGPD & IA Act</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Comprendre les lois, identifier les risques, cartographier vos usages et adopter les bons réflexes.
            </p>
            <Link to="/module/1" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Commencer <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col border-slate-200 dark:border-slate-800">
          <CardHeader>
            <BookOpen className="mb-2 h-8 w-8 text-emerald-600" />
            <CardTitle>Section 2 : Éthique & PI</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Formation approfondie sur l'éthique de l'IA, la propriété intellectuelle et les obligations de confidentialité.
            </p>
            <Link to="/module/6" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Découvrir <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col border-slate-200 dark:border-slate-800">
          <CardHeader>
            <Code className="mb-2 h-8 w-8 text-amber-600" />
            <CardTitle>Section 3 : Ateliers</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Ateliers pratiques interactifs : classification IA Act, sécurité des prompts, nettoyage de données, etc.
            </p>
            <Link to="/atelier/1" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Pratiquer <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
