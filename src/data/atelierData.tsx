import React, { useState } from "react";
import { Callout } from "@/src/components/ui/Callout";
import { Quiz } from "@/src/components/ui/Quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { RiskClassificationGame } from "@/src/components/ui/RiskClassificationGame";
import { InteractiveEvaluationTable } from "@/src/components/ui/InteractiveEvaluationTable";
import { ShadowITSimulator } from "@/src/components/ui/ShadowITSimulator";
import { DataClassificationGame } from "@/src/components/ui/DataClassificationGame";
import { PromptInjectionSimulator } from "@/src/components/ui/PromptInjectionSimulator";
import { DataSanitizationSimulator } from "@/src/components/ui/DataSanitizationSimulator";
import { Search, ExternalLink, Book, Shield, Scale, Cpu, Globe, FileText, GraduationCap, Star, Tag, Trash2, CheckCircle2 } from "lucide-react";

const GlossaireContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    const saved = localStorage.getItem('ia-glossary-favs');
    if (saved) setFavorites(new Set(JSON.parse(saved)));
  }, []);

  const toggleFav = (title: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(title)) newFavs.delete(title);
    else newFavs.add(title);
    setFavorites(newFavs);
    localStorage.setItem('ia-glossary-favs', JSON.stringify(Array.from(newFavs)));
  };

  const terms = [
    { title: "AIPD / DPIA", desc: "Analyse d'Impact sur la Protection des Données. Démarche obligatoire (RGPD) pour les traitements à risque élevé afin d'évaluer et d'atténuer les risques pour les personnes.", tags: ["RGPD", "Conformité"] },
    { title: "Anonymisation", desc: "Processus irréversible de suppression de toute donnée identifiante. Une donnée véritablement anonymisée sort du champ d'application du RGPD.", tags: ["RGPD", "Technique"] },
    { title: "API", desc: "Interface de Programmation d'Application. Moyen technique permettant à deux logiciels de communiquer. L'utilisation d'API d'IA tierces implique souvent des transferts de données.", tags: ["Technique"] },
    { title: "Biais algorithmique", desc: "Déviation systématique et injuste des résultats d'une IA, souvent due à des données d'entraînement non représentatives ou à des préjugés humains reproduits par la machine.", tags: ["Éthique", "IA"] },
    { title: "Cloud Act", desc: "Loi fédérale américaine permettant aux autorités américaines de contraindre les fournisseurs de services cloud américains à fournir les données stockées sur leurs serveurs, même s'ils sont situés en Europe.", tags: ["Droit", "International"] },
    { title: "Data Act", desc: "Règlement européen visant à faciliter le partage des données générées par les objets connectés et les services industriels.", tags: ["Droit", "Europe"] },
    { title: "Deep Learning", desc: "Apprentissage Profond. Sous-domaine du Machine Learning basé sur des réseaux de neurones artificiels complexes, particulièrement efficace pour la reconnaissance d'images et le traitement du langage naturel.", tags: ["IA", "Technique"] },
    { title: "DPA", desc: "Data Processing Agreement. Contrat de sous-traitance de données (art. 28 RGPD) obligatoire lorsqu'une entreprise confie des données personnelles à un tiers (ex: fournisseur cloud ou IA).", tags: ["RGPD", "Droit"] },
    { title: "DPO", desc: "Délégué à la Protection des Données. Personne chargée de veiller au respect du RGPD au sein d'un organisme. Son implication est cruciale lors du déploiement de projets IA.", tags: ["RGPD", "Métier"] },
    { title: "Fine-tuning", desc: "Affinage ou spécialisation d'un modèle d'IA pré-entraîné en utilisant un jeu de données spécifique. Présente des risques RGPD élevés si les données d'entraînement contiennent des informations personnelles.", tags: ["IA", "Technique"] },
    { title: "GPAI", desc: "General Purpose AI (IA à usage général). Modèles capables d'accomplir une grande variété de tâches (ex: GPT-4, Claude, Llama). L'IA Act prévoit des règles spécifiques pour ces modèles.", tags: ["IA", "Réglementation"] },
    { title: "Hallucination", desc: "Phénomène où une IA générative produit une réponse factuellement fausse, absurde ou déconnectée de la réalité, tout en la présentant avec un haut niveau de certitude.", tags: ["IA", "Risque"] },
    { title: "HDS", desc: "Hébergeur de Données de Santé. Certification française obligatoire pour toute entité hébergeant des données de santé à caractère personnel.", tags: ["Sécurité", "Santé"] },
    { title: "IA Act", desc: "Règlement européen sur l'Intelligence Artificielle. Première législation mondiale complète sur l'IA, basée sur une approche par les risques (inacceptable, élevé, limité, minimal).", tags: ["Réglementation", "Europe"] },
    { title: "Jailbreak", desc: "Technique visant à contourner les filtres de sécurité et les restrictions éthiques d'une IA pour lui faire générer du contenu interdit ou malveillant.", tags: ["Sécurité", "Risque"] },
    { title: "LLM", desc: "Large Language Model (Grand Modèle de Langage). Type d'IA générative entraînée sur de vastes corpus de textes pour comprendre et générer du langage humain.", tags: ["IA", "Technique"] },
    { title: "Machine Learning", desc: "Apprentissage Automatique. Technologie d'IA permettant à un système d'apprendre et de s'améliorer à partir de données sans être explicitement programmé pour chaque tâche.", tags: ["IA", "Technique"] },
    { title: "Modèle de Fondation", desc: "Modèle d'IA de très grande taille, entraîné sur de vastes quantités de données non étiquetées, pouvant être adapté (fine-tuné) pour de nombreuses tâches spécifiques.", tags: ["IA", "Technique"] },
    { title: "On-premise", desc: "Déploiement sur site. Modèle où les logiciels et les données sont hébergés sur les propres serveurs de l'entreprise, offrant un contrôle total et une sécurité maximale.", tags: ["Sécurité", "Infrastructure"] },
    { title: "Privacy by Design", desc: "Protection des données dès la conception. Principe imposé par le RGPD exigeant que la protection des données personnelles soit intégrée dès la conception d'un projet ou d'un système d'IA.", tags: ["RGPD", "Conception"] },
    { title: "Prompt injection", desc: "Cyberattaque visant à manipuler un LLM en insérant des instructions malveillantes dans les requêtes ou les données transmises, afin de contourner ses filtres de sécurité.", tags: ["Sécurité", "Risque"] },
    { title: "Pseudonymisation", desc: "Technique remplaçant les identifiants directs par des pseudonymes. Contrairement à l'anonymisation, c'est réversible. Les données restent soumises au RGPD.", tags: ["RGPD", "Technique"] },
    { title: "RAG", desc: "Retrieval-Augmented Generation. Technique permettant de connecter un LLM à une base de données externe (documents d'entreprise) pour générer des réponses basées sur des informations fiables et à jour.", tags: ["IA", "Technique"] },
    { title: "RGPD", desc: "Règlement Général sur la Protection des Données. Cadre européen régissant le traitement et la circulation des données à caractère personnel.", tags: ["Réglementation", "Europe"] },
    { title: "SecNumCloud", desc: "Visa de sécurité délivré par l'ANSSI (France) garantissant un très haut niveau d'exigence technique, opérationnelle et juridique (protection contre les lois extraterritoriales comme le Cloud Act).", tags: ["Sécurité", "Souveraineté"] },
    { title: "Shadow IT", desc: "Utilisation d'applications, de services cloud ou d'outils informatiques (comme ChatGPT) par les employés sans l'approbation ou le contrôle de la DSI, créant des failles de sécurité.", tags: ["Sécurité", "Risque"] },
    { title: "Souveraineté Numérique", desc: "Capacité d'un État ou d'une entreprise à conserver le contrôle sur ses données, ses infrastructures et ses technologies, indépendamment des puissances étrangères.", tags: ["Souveraineté", "Politique"] },
    { title: "TDM", desc: "Text and Data Mining (Fouille de textes et de données). Technique d'analyse automatisée de grands volumes de données. Soumise à des exceptions spécifiques au droit d'auteur en Europe.", tags: ["Droit", "IA"] },
    { title: "Token", desc: "Unité de base (souvent un mot ou une partie de mot) traitée par un LLM. La tarification et les limites de traitement des IA génératives sont généralement calculées en tokens.", tags: ["IA", "Technique"] },
    { title: "Watermarking", desc: "Tatouage numérique. Technique consistant à insérer un marqueur invisible dans un contenu généré par l'IA (texte, image, audio) pour pouvoir identifier son origine artificielle, une exigence de l'IA Act.", tags: ["IA", "Transparence"] }
  ];

  const allTags = Array.from(new Set(terms.flatMap(t => t.tags))).sort();

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.title.toLowerCase().includes(searchTerm.toLowerCase()) || term.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag === "Favoris" ? favorites.has(term.title) : (activeTag ? term.tags.includes(activeTag) : true);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Annexe A — Glossaire interactif</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Définitions des termes clés de l'IA, du RGPD et de la cybersécurité. Ajoutez vos favoris pour les retrouver facilement.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher un terme (ex: RAG, RGPD, Biais...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTag === null ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}`}
        >
          Tous
        </button>
        <button
          onClick={() => setActiveTag("Favoris")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${activeTag === "Favoris" ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}`}
        >
          <Star className="h-3.5 w-3.5" fill={activeTag === "Favoris" ? "currentColor" : "none"} /> Favoris ({favorites.size})
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTag === tag ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredTerms.length === 0 ? (
        <div className="text-center py-12 text-slate-500">Aucun terme trouvé pour "{searchTerm}" {activeTag ? `dans la catégorie "${activeTag}"` : ''}</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredTerms.map((term, idx) => {
            const isFav = favorites.has(term.title);
            return (
              <Card key={idx} className="border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors flex flex-col">
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <CardTitle className="text-blue-700 dark:text-blue-400 text-lg">{term.title}</CardTitle>
                  <button 
                    onClick={() => toggleFav(term.title)}
                    className="text-slate-400 hover:text-amber-500 transition-colors focus:outline-none"
                    title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Star className="h-5 w-5" fill={isFav ? "currentColor" : "none"} color={isFav ? "#f59e0b" : "currentColor"} />
                  </button>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">{term.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {term.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        <Tag className="h-3 w-3" /> {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

const RessourcesContent = () => {
  const resourceCategories = [
    {
      title: "Textes de Loi & Réglementations",
      icon: Scale,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      links: [
        { name: "Règlement Général sur la Protection des Données (RGPD)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", desc: "Texte officiel européen consolidé." },
        { name: "Législation sur l'Intelligence Artificielle (IA Act)", url: "https://artificialintelligenceact.eu/", desc: "Portail complet sur l'IA Act européen." },
        { name: "Data Act (Règlement sur les données)", url: "https://digital-strategy.ec.europa.eu/fr/policies/data-act", desc: "Règlement européen sur le partage et l'utilisation des données." },
        { name: "Directive Droit d'Auteur & TDM (2019/790)", url: "https://eur-lex.europa.eu/eli/dir/2019/790/oj", desc: "Cadre européen sur la fouille de textes et de données." }
      ]
    },
    {
      title: "Guides & Recommandations",
      icon: Book,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      links: [
        { name: "Dossier IA de la CNIL", url: "https://www.cnil.fr/fr/intelligence-artificielle", desc: "Fiches pratiques, recommandations et plan d'action de la CNIL." },
        { name: "Guide de la sécurité des données personnelles (CNIL)", url: "https://www.cnil.fr/fr/guide-securite-des-donnees-personnelles", desc: "Les précautions de base pour sécuriser les données." },
        { name: "Recommandation UNESCO sur l'éthique de l'IA", url: "https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics", desc: "Premier instrument normatif mondial sur l'éthique de l'IA." },
        { name: "Guide ANSSI : Sécurité des systèmes d'IA", url: "https://cyber.gouv.fr/publications/recommandations-de-securite-pour-les-systemes-dia", desc: "Recommandations de sécurité pour les systèmes d'IA." },
        { name: "OWASP Top 10 for LLMs", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", desc: "Les 10 vulnérabilités de sécurité les plus critiques pour les applications LLM." }
      ]
    },
    {
      title: "Outils Techniques & Open Source",
      icon: Cpu,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      links: [
        { name: "Microsoft Presidio", url: "https://microsoft.github.io/presidio/", desc: "Outil open source d'anonymisation et de pseudonymisation de données." },
        { name: "Ollama", url: "https://ollama.com/", desc: "Faire tourner des LLM open source localement pour garantir la confidentialité." },
        { name: "Giskard", url: "https://github.com/Giskard-AI/giskard", desc: "Plateforme open source (française) pour tester et évaluer les modèles d'IA." },
        { name: "Hugging Face", url: "https://huggingface.co/", desc: "Plateforme de référence pour les modèles d'IA open source." },
        { name: "Outil AIPD (CNIL)", url: "https://www.cnil.fr/fr/outil-pia-telechargez-et-installez-le-logiciel-de-la-cnil", desc: "Logiciel gratuit pour mener des analyses d'impact." }
      ]
    },
    {
      title: "Institutions & Acteurs",
      icon: Shield,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      links: [
        { name: "CNIL (France)", url: "https://www.cnil.fr/", desc: "Commission Nationale de l'Informatique et des Libertés." },
        { name: "LINC (Laboratoire d'Innovation Numérique de la CNIL)", url: "https://linc.cnil.fr/", desc: "Éclairages sur les tendances technologiques et leurs impacts sur la vie privée." },
        { name: "EDPB (Europe)", url: "https://edpb.europa.eu/", desc: "Comité Européen de la Protection des Données." },
        { name: "ENISA", url: "https://www.enisa.europa.eu/", desc: "Agence de l'Union européenne pour la cybersécurité." },
        { name: "SecNumCloud (ANSSI)", url: "https://cyber.gouv.fr/le-visa-de-securite-secnumcloud", desc: "Liste des prestataires cloud qualifiés SecNumCloud." }
      ]
    },
    {
      title: "Formations & Sensibilisation",
      icon: GraduationCap,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/30",
      links: [
        { name: "L'Atelier RGPD (CNIL)", url: "https://atelier-rgpd.cnil.fr/", desc: "Formation en ligne gratuite de la CNIL pour comprendre le RGPD." },
        { name: "SecNumacadémie (ANSSI)", url: "https://secnumacademie.gouv.fr/", desc: "MOOC gratuit d'initiation à la cybersécurité par l'ANSSI." },
        { name: "Objectif IA", url: "https://openclassrooms.com/fr/courses/6417031-objectif-ia-initiez-vous-a-lintelligence-artificielle", desc: "Cours gratuit d'initiation à l'IA par l'Institut Montaigne et OpenClassrooms." }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Annexe B — Ressources utiles & références</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Une sélection de liens incontournables pour approfondir vos connaissances et outiller votre démarche.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resourceCategories.map((category, idx) => (
          <Card key={idx} className="border-slate-200 dark:border-slate-800 flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.bg} ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="group">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                          {link.name}
                        </span>
                        <ExternalLink className="h-4 w-4 text-slate-400 shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {link.desc}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ChecklistContent = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const saved = localStorage.getItem('ia-checklist');
    if (saved) setCheckedItems(JSON.parse(saved));
  }, []);

  const toggleItem = (id: string) => {
    const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newChecked);
    localStorage.setItem('ia-checklist', JSON.stringify(newChecked));
  };

  const reset = () => {
    setCheckedItems({});
    localStorage.removeItem('ia-checklist');
  };

  const categories = [
    {
      id: "gouvernance",
      title: "Gouvernance & Stratégie",
      items: [
        { id: "gov-1", text: "Désigner un référent IA ou un comité d'éthique pluridisciplinaire." },
        { id: "gov-2", text: "Cartographier tous les systèmes d'IA utilisés dans l'organisation (Registre IA)." },
        { id: "gov-3", text: "Rédiger et diffuser une Charte d'utilisation de l'IA aux collaborateurs." },
        { id: "gov-4", text: "Former les équipes aux risques de l'IA (Shadow IT, biais, prompt injection)." }
      ]
    },
    {
      id: "rgpd",
      title: "Conformité RGPD",
      items: [
        { id: "rgpd-1", text: "Vérifier la base légale du traitement (Consentement, Intérêt légitime...)." },
        { id: "rgpd-2", text: "Minimiser les données : ne transmettre au modèle que le strict nécessaire." },
        { id: "rgpd-3", text: "Anonymiser ou pseudonymiser les données personnelles avant traitement." },
        { id: "rgpd-4", text: "Réaliser une AIPD (Analyse d'Impact) si le traitement est à risque élevé." },
        { id: "rgpd-5", text: "Signer un DPA (Data Processing Agreement) avec le fournisseur de l'IA." }
      ]
    },
    {
      id: "ia-act",
      title: "Conformité IA Act",
      items: [
        { id: "ia-1", text: "Classifier le système d'IA selon les 4 niveaux de risque de l'IA Act." },
        { id: "ia-2", text: "Pour les systèmes à haut risque : rédiger la documentation technique complète." },
        { id: "ia-3", text: "Mettre en place une supervision humaine (Human-in-the-loop)." },
        { id: "ia-4", text: "Garantir la transparence : informer l'utilisateur qu'il interagit avec une IA." }
      ]
    },
    {
      id: "secu",
      title: "Sécurité & Souveraineté",
      items: [
        { id: "sec-1", text: "Vérifier la localisation de l'hébergement des données (privilégier l'UE)." },
        { id: "sec-2", text: "S'assurer que le fournisseur n'utilise pas vos données pour entraîner ses modèles." },
        { id: "sec-3", text: "Mettre en place des filtres contre les attaques par Prompt Injection." },
        { id: "sec-4", text: "Privilégier des solutions On-premise ou SecNumCloud pour les données critiques." }
      ]
    }
  ];

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100) || 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div className="print:hidden">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Annexe C — Checklist de conformité</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Votre feuille de route interactive pour déployer un projet IA en toute légalité et sécurité.</p>
      </div>

      <div className="hidden print:block mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Checklist de conformité IA & RGPD</h1>
        <p className="text-lg text-slate-600">Généré le {new Date().toLocaleDateString('fr-FR')} - Score : {checkedCount}/{totalItems} ({progress}%)</p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 print:hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold">Progression globale</h3>
              <p className="text-sm text-slate-500">{checkedCount} sur {totalItems} critères validés</p>
            </div>
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{progress}%</div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-end gap-4">
            <button 
              onClick={handlePrint}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-printer"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              Exporter en PDF
            </button>
            <button 
              onClick={reset}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-4 w-4" /> Réinitialiser
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8">
        {categories.map((category) => {
          const catCheckedCount = category.items.filter(item => checkedItems[item.id]).length;
          const isAllChecked = catCheckedCount === category.items.length;

          return (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {isAllChecked && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                  {category.title}
                </h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                  {catCheckedCount} / {category.items.length}
                </span>
              </div>
              <div className="space-y-2">
                {category.items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <label 
                      key={item.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer print:border-none print:p-1 print:gap-2 ${isChecked ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-900/30 print:bg-transparent' : 'bg-white border-slate-200 hover:border-blue-300 dark:bg-slate-950 dark:border-slate-800 dark:hover:border-blue-800 print:bg-transparent'}`}
                    >
                      <div className="mt-0.5 shrink-0 print:hidden">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={isChecked}
                          onChange={() => toggleItem(item.id)}
                        />
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          {isChecked && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      </div>
                      <div className="hidden print:block mt-0.5 shrink-0 font-mono font-bold">
                        {isChecked ? "[X]" : "[ ]"}
                      </div>
                      <span className={`text-sm leading-snug ${isChecked ? 'text-slate-600 dark:text-slate-400 line-through print:no-underline print:text-black' : 'text-slate-700 dark:text-slate-300 print:text-black'}`}>
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const atelierData: Record<string, React.ReactNode> = {
  "1": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Atelier 1 — Classification des Systèmes d'IA</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Mettez en pratique vos connaissances sur l'IA Act.</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Dans cet atelier interactif, vous allez devoir classifier différents cas d'usage d'Intelligence Artificielle selon les 4 niveaux de risque définis par l'IA Act européen.</p>
        <p>Lisez attentivement chaque scénario et sélectionnez la catégorie correspondante.</p>
      </div>

      <RiskClassificationGame />
    </div>
  ),
  "2": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Atelier 2 — Classification des Données</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Apprenez à évaluer la sensibilité des données traitées par l'IA.</p>
      </div>

      <Callout type="info" title="POURQUOI CLASSIFIER ?">
        Avant de confier une donnée à un système d'IA, il est primordial de connaître son niveau de confidentialité. Une donnée "Rouge" ne doit jamais être envoyée sur un outil grand public.
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Testez vos réflexes : pour chaque donnée présentée, déterminez son niveau de sensibilité (de Vert à Rouge).</p>
      </div>

      <DataClassificationGame />
    </div>
  ),
  "3": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Atelier 3 — Sécurité & Shadow IT</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Apprenez à choisir le bon outil IA en fonction de la sensibilité de vos données.</p>
      </div>

      <Callout type="warning" title="LE RISQUE DU SHADOW IT">
        L'utilisation d'outils IA grand public (comme ChatGPT gratuit) pour traiter des données d'entreprise expose l'organisation à des fuites de données majeures. Ces outils peuvent réutiliser vos prompts pour entraîner leurs futurs modèles.
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Dans cette simulation, vous allez faire face à 3 scénarios de la vie courante en entreprise. Pour chaque situation, vous devrez choisir l'outil d'Intelligence Artificielle le plus approprié afin de garantir la <strong>souveraineté</strong> et la <strong>sécurité</strong> de vos données.</p>
      </div>

      <ShadowITSimulator />
    </div>
  ),
  "4": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Atelier 4 — Sécurité des Prompts</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Comprendre et prévenir les attaques par "Prompt Injection".</p>
      </div>

      <Callout type="danger" title="LA MENACE DE L'INJECTION">
        Le "Prompt Injection" consiste à manipuler un modèle de langage en lui fournissant des instructions malveillantes qui écrasent ses directives initiales. C'est l'une des vulnérabilités les plus critiques des LLM aujourd'hui.
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Dans ce simulateur, vous interagissez avec un Chatbot RH qui possède un secret (le salaire du PDG). Essayez les différentes attaques pour voir comment l'IA réagit lorsqu'elle est <strong>Vulnérable</strong>, puis activez la <strong>Protection</strong> pour voir comment un système sécurisé doit se comporter.</p>
      </div>

      <PromptInjectionSimulator />
    </div>
  ),
  "5": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Atelier 5 — Nettoyage & Anonymisation</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Pratiquez la pseudonymisation des données avant de les confier à une IA.</p>
      </div>

      <Callout type="info" title="LE PRINCIPE DE MINIMISATION">
        Selon le RGPD, vous ne devez traiter que les données strictement nécessaires. Avant de copier/coller un texte dans un LLM, il est impératif d'en retirer ou d'en masquer les informations personnelles et confidentielles.
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Vous êtes RH et vous souhaitez utiliser une IA pour résumer le compte-rendu d'un entretien annuel. <strong>Cliquez sur les mots ou groupes de mots</strong> dans le texte ci-dessous pour les masquer (pseudonymiser) avant de valider votre prompt.</p>
      </div>

      <DataSanitizationSimulator />
    </div>
  ),
  "6": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Atelier 6 — Déploiement éthique d'un système IA</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Mettre en place une démarche structurée d'évaluation éthique avant tout déploiement.</p>
      </div>

      <Callout type="info" title="OBJECTIF DE L'ATELIER">
        Mettre en place une démarche structurée d'évaluation éthique avant tout déploiement d'un système IA, en combinant les obligations légales (RGPD, IA Act) et les principes éthiques développés dans le Module 6. À l'issue de cet atelier, vous disposerez d'une méthode reproductible et d'outils concrets pour tout nouveau projet IA.
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>La méthode ÉTHI-IA en 5 phases</h3>
        
        <h4>Phase 1 — Cartographie des parties prenantes et des impacts</h4>
        <p>Avant tout déploiement, identifiez qui est affecté par le système et comment : utilisateurs directs, personnes sur lesquelles le système prend des décisions, collaborateurs, partenaires, etc.</p>

        <h4>Phase 2 — Évaluation des risques éthiques</h4>
        <p>Pour chaque risque éthique identifié, évaluez la probabilité et la gravité (Score = Probabilité x Gravité). Exemples de risques : biais discriminatoire, opacité, surveillance excessive, fuite de données.</p>

        <h4>Phase 3 — Conception éthique by design</h4>
        <p>À partir des risques identifiés, définissez les mesures architecturales et organisationnelles à intégrer dès la conception : Transparence, Équité, Explicabilité, Supervision, Minimisation, Sécurité, Durabilité.</p>

        <h4>Phase 4 — Tests et audit pré-déploiement</h4>
        <ul>
          <li><strong>Test de biais</strong> : CV fictifs identiques avec variations démographiques</li>
          <li><strong>Test de robustesse</strong> : Entrées atypiques, cas limites</li>
          <li><strong>Test de prompt injection</strong> : Tentatives d'insertion d'instructions malveillantes</li>
          <li><strong>Test d'explicabilité</strong> : Demander une explication pour des décisions aléatoires</li>
        </ul>

        <h4>Phase 5 — Gouvernance en production</h4>
        <p>Le déploiement éthique ne s'arrête pas au lancement. Une gouvernance continue est nécessaire : monitoring mensuel, revue trimestrielle, canal de signalement.</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
        <h3>Cas pratique — Évaluation éthique d'un chatbot RH</h3>
        <p>Une entreprise souhaite déployer un chatbot LLM pour répondre aux questions de ses 5 000 salariés sur la paie, les congés et les avantages sociaux.</p>
        
        <InteractiveEvaluationTable />
      </div>

      <Quiz 
        question="Lors de l'évaluation éthique d'un système IA de scoring de crédit, vous constatez que le modèle est 8 % moins précis pour les femmes que pour les hommes à profil équivalent. Quelle est la bonne réaction ?"
        options={[
          { id: "A", text: "Accepter cet écart car il est inférieur à 10 %", isCorrect: false },
          { id: "B", text: "Suspendre le déploiement, analyser les causes, corriger le modèle et retester", isCorrect: true },
          { id: "C", text: "Déployer le système en informant les utilisateurs de cette limitation", isCorrect: false },
          { id: "D", text: "Compenser manuellement en ajoutant 8 points aux scores féminins", isCorrect: false }
        ]}
      />
    </div>
  )
};

export const annexeData: Record<string, React.ReactNode> = {
  "glossaire": <GlossaireContent />,
  "ressources": <RessourcesContent />,
  "checklist": <ChecklistContent />
};
