import React from "react";
import { Callout } from "@/src/components/ui/Callout";
import { Quiz } from "@/src/components/ui/Quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { RiskDecisionTree } from "@/src/components/ui/RiskDecisionTree";
import { AIActTimeline } from "@/src/components/ui/AIActTimeline";
import { DataRiskDragDrop } from "@/src/components/ui/DataRiskDragDrop";
import { RegisterDownload } from "@/src/components/ui/RegisterDownload";
import { RolePlayGame } from "@/src/components/ui/RolePlayGame";
import { AIDashboard } from "@/src/components/ui/AIDashboard";
import { LegalBasisExercise } from "@/src/components/ui/LegalBasisExercise";
import { DataLeakCaseStudy } from "@/src/components/ui/DataLeakCaseStudy";
import { DataFlowMapper } from "@/src/components/ui/DataFlowMapper";
import { BestPracticesGenerator } from "@/src/components/ui/BestPracticesGenerator";
import { BiasDetectionSimulator } from "@/src/components/ui/BiasDetectionSimulator";
import { IPDecisionTree } from "@/src/components/ui/IPDecisionTree";
import { SecureArchitectureWorkshop } from "@/src/components/ui/SecureArchitectureWorkshop";

export const courseModules: Record<string, React.ReactNode> = {
  "1": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 1 — Objectifs & Présentation</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Pourquoi ce sujet change la donne pour votre activité</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>
          Depuis le déploiement massif des modèles de langage (LLM) dans les entreprises, la question de la conformité est devenue un enjeu stratégique incontournable. En avril 2026, plus de 65 % des entreprises européennes ont intégré au moins un outil basé sur l'IA dans leurs processus métiers — et pourtant, moins de 20 % d'entre elles ont formalisé une politique de gouvernance des données liée à ces usages.
        </p>
        <p>
          Ce décalage crée une exposition juridique et réputationnelle considérable. Le RGPD existe depuis 2018, mais l'IA Act est entré pleinement en application en 2025-2026, ajoutant de nouvelles obligations spécifiques aux systèmes d'intelligence artificielle. Comprendre ces deux cadres et leur articulation, c'est protéger votre activité, vos clients et vos partenaires.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-6 rounded-r-lg">
          <h4 className="text-blue-800 dark:text-blue-300 font-bold mt-0 mb-2">Cas Pratique : Le coût de l'impréparation</h4>
          <p className="text-sm text-blue-900 dark:text-blue-200 mb-0">
            Une agence marketing a récemment perdu un appel d'offres majeur (contrat de 500k€) face à un grand compte bancaire. La raison ? L'agence utilisait ChatGPT (version grand public) pour résumer les briefs clients, sans aucune clause de confidentialité spécifique ni garantie de non-réutilisation des données pour l'entraînement du modèle. Le client, soumis à des règles strictes, a exigé un audit de la chaîne de traitement IA. L'incapacité de l'agence à prouver la souveraineté et la sécurité des données a entraîné la rupture immédiate des négociations. <strong>La conformité n'est plus seulement une obligation légale, c'est un avantage concurrentiel décisif.</strong>
          </p>
        </div>
      </div>

      <AIDashboard />

      <Callout type="warning" title="CHIFFRES CLÉS — 2026">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>4,5 Md€</strong> d'amendes RGPD infligées en Europe depuis 2018</li>
          <li>Première amende IA Act prononcée en 2025 : <strong>23 M€</strong> contre un prestataire RH</li>
          <li><strong>78 %</strong> des DPO européens considèrent les LLM comme leur principal risque 2026</li>
          <li>Délai moyen de notification CNIL après une fuite : <strong>38 heures</strong> (obligation : 72h)</li>
          <li><strong>1 entreprise sur 3</strong> a déjà exposé accidentellement des données clients via un LLM (Gartner, 2025)</li>
          <li><strong>92 %</strong> des incidents IA impliquent un manque de formation ou de politique interne</li>
        </ul>
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>Ce que vous allez apprendre dans cette formation</h3>
        <ul>
          <li><strong>La Section 1</strong> vous donne les fondations théoriques et méthodologiques : comprendre les lois, identifier les risques, cartographier vos usages et adopter les bons réflexes.</li>
          <li><strong>La Section 2 (NOUVELLE)</strong> vous apporte une formation approfondie sur l'éthique de l'IA, la propriété intellectuelle liée aux contenus générés, et les obligations renforcées de confidentialité.</li>
          <li><strong>La Section 3</strong> vous propose des ateliers pratiques directement applicables : classification IA Act, classification des données, sécurité & shadow IT, sécurité des prompts, nettoyage & anonymisation, et déploiement éthique.</li>
        </ul>
      </div>

      <Callout type="tip" title="CONSEIL D'UTILISATION">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Prenez des notes sur vos usages actuels au fur et à mesure.</li>
          <li>Les ateliers sont conçus pour être réalisés avec vos propres données de test.</li>
          <li>Partagez les quiz avec votre équipe pour diffuser la culture conformité et éthique.</li>
          <li>La Section 2 (Éthique & PI) est recommandée en priorité pour les équipes créatives et RH.</li>
        </ul>
      </Callout>

      <Quiz 
        question="Quel pourcentage d'entreprises européennes utilisant l'IA en 2026 ont formalisé une politique de gouvernance des données IA ?"
        options={[
          { id: "A", text: "Plus de 60 %", isCorrect: false },
          { id: "B", text: "Environ 35 %", isCorrect: false },
          { id: "C", text: "Moins de 20 %", isCorrect: true },
          { id: "D", text: "Exactement 50 %", isCorrect: false }
        ]}
      />

      <Quiz 
        question="L'IA Act européen est entré pleinement en application en :"
        options={[
          { id: "A", text: "2022", isCorrect: false },
          { id: "B", text: "2024", isCorrect: false },
          { id: "C", text: "2025-2026", isCorrect: true },
          { id: "D", text: "2027", isCorrect: false }
        ]}
      />

      <Quiz 
        question="Quel est le délai réglementaire pour notifier une violation de données à la CNIL ?"
        options={[
          { id: "A", text: "24 heures", isCorrect: false },
          { id: "B", text: "48 heures", isCorrect: false },
          { id: "C", text: "72 heures", isCorrect: true },
          { id: "D", text: "7 jours", isCorrect: false }
        ]}
      />
    </div>
  ),
  "2": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 2 — Rappels RGPD & IA Act</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Le RGPD en 10 points essentiels pour l'IA</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Le Règlement Général sur la Protection des Données (RGPD) s'applique à toute organisation traitant des données personnelles de résidents européens, quelle que soit la localisation du prestataire.</p>
        
        <h4>Point 1 — La définition de la donnée personnelle</h4>
        <p>Une donnée personnelle est toute information se rapportant à une personne physique identifiée ou identifiable. Dans un contexte LLM, cela inclut les noms, e-mails, numéros de téléphone, mais aussi les données indirectes : un poste + une entreprise peuvent suffire à identifier quelqu'un.</p>

        <h4>Point 2 — Les bases légales du traitement</h4>
        <p>Tout traitement de données personnelles doit reposer sur une base légale. Les six bases sont : le consentement, l'exécution d'un contrat, l'obligation légale, la sauvegarde des intérêts vitaux, la mission d'intérêt public, et l'intérêt légitime. Pour les usages LLM en entreprise, l'intérêt légitime et le contrat sont les plus fréquemment invoqués.</p>
      </div>

      <LegalBasisExercise />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h4>Point 3 — Le principe de minimisation</h4>
        <p>Ne collecter et traiter que les données strictement nécessaires à la finalité déclarée. En pratique : ne jamais envoyer un fichier complet à un LLM quand une version anonymisée suffit.</p>

        <h4>Point 4 — Le principe de finalité</h4>
        <p>Les données collectées pour un usage précis ne peuvent pas être réutilisées pour un autre usage incompatible. Si vous avez collecté des CV pour un recrutement, vous ne pouvez pas les utiliser pour entraîner un modèle sans base légale supplémentaire.</p>

        <h4>Point 5 — Les droits des personnes concernées</h4>
        <ul>
          <li><strong>Droit d'accès</strong> : toute personne peut demander quelles données vous détenez sur elle</li>
          <li><strong>Droit de rectification</strong> : corriger les données inexactes</li>
          <li><strong>Droit à l'effacement</strong> ('droit à l'oubli') : supprimer les données</li>
          <li><strong>Droit à la portabilité</strong> : recevoir ses données dans un format structuré</li>
          <li><strong>Droit d'opposition</strong> : s'opposer à certains traitements, notamment automatisés</li>
          <li><strong>Droit de ne pas faire l'objet d'une décision automatisée</strong> : crucial pour les usages IA</li>
        </ul>

        <h4>Point 6 — Sécurité et confidentialité (Art. 32)</h4>
        <p>Le responsable de traitement doit garantir un niveau de sécurité adapté au risque. Dans le cadre de l'IA, cela implique le chiffrement des données en transit vers l'API du LLM, la gestion stricte des accès (IAM), et la prévention des fuites de données (Data Loss Prevention).</p>

        <h4>Point 7 — Privacy by Design & by Default</h4>
        <p>La protection des données doit être intégrée dès la conception du système d'IA. Par défaut, les paramètres les plus protecteurs de la vie privée doivent s'appliquer (par exemple, la non-conservation de l'historique des prompts par défaut).</p>

        <h4>Point 8 — Accountability (Responsabilité)</h4>
        <p>Vous devez être en mesure de <strong>prouver</strong> votre conformité à tout moment. Cela passe par la tenue d'un registre des traitements (Art. 30), la documentation des choix techniques, et la signature d'accords de sous-traitance (DPA) avec vos fournisseurs d'IA.</p>

        <h4>Point 9 — L'AIPD (Analyse d'Impact sur la Protection des Données)</h4>
        <p>Obligatoire lorsque le traitement est susceptible d'engendrer un risque élevé pour les droits et libertés (ex: profilage, traitement à grande échelle de données sensibles). L'utilisation d'une IA pour évaluer des employés ou des clients requiert presque systématiquement une AIPD.</p>

        <h4>Point 10 — Les transferts hors UE</h4>
        <p>Si vous utilisez un LLM hébergé aux États-Unis (ex: OpenAI, Anthropic), vous effectuez un transfert de données hors UE. Vous devez vous assurer que le fournisseur adhère au <em>Data Privacy Framework</em> (DPF) ou signer des Clauses Contractuelles Types (CCT) avec des mesures supplémentaires de sécurité.</p>
      </div>

      <div className="space-y-4 my-8">
        <h3 className="text-xl font-bold tracking-tight">Les 4 niveaux de risque de l'IA Act</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">Risque Inacceptable</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-red-900 dark:text-red-200">
              <strong>Interdit :</strong> scoring social, manipulation subliminale, reconnaissance faciale en temps réel dans les espaces publics (sauf exceptions).
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-orange-700 dark:text-orange-400">Risque Élevé</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-orange-900 dark:text-orange-200">
              <strong>Obligations strictes :</strong> RH, crédit, justice, éducation, infrastructures critiques. Nécessite une évaluation de conformité et une supervision humaine.
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20">
            <CardHeader>
              <CardTitle className="text-yellow-700 dark:text-yellow-400">Risque Limité</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-yellow-900 dark:text-yellow-200">
              <strong>Obligations de transparence :</strong> chatbots, IA générative de contenus. L'utilisateur doit savoir qu'il interagit avec une IA.
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">Risque Minimal</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-green-900 dark:text-green-200">
              <strong>Pas d'obligation spécifique :</strong> filtres anti-spam, jeux vidéo, etc. La majorité des systèmes d'IA actuels entrent dans cette catégorie.
            </CardContent>
          </Card>
        </div>
      </div>

      <RiskDecisionTree />

      <AIActTimeline />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>Articulation RGPD / IA Act</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b dark:border-slate-800">
                <th className="pb-2 font-semibold">Critère</th>
                <th className="pb-2 font-semibold">RGPD</th>
                <th className="pb-2 font-semibold">IA Act</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              <tr>
                <td className="py-2">Objet</td>
                <td className="py-2">Données personnelles</td>
                <td className="py-2">Systèmes d'intelligence artificielle</td>
              </tr>
              <tr>
                <td className="py-2">Date d'application</td>
                <td className="py-2">Mai 2018</td>
                <td className="py-2">2024-2026 (progressif)</td>
              </tr>
              <tr>
                <td className="py-2">Autorité principale</td>
                <td className="py-2">CNIL (France), EDPB (EU)</td>
                <td className="py-2">Autorité nationale IA + Commission EU</td>
              </tr>
              <tr>
                <td className="py-2">Amendes max</td>
                <td className="py-2">4 % CA mondial ou 20 M€</td>
                <td className="py-2">7 % CA mondial ou 35 M€</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Quiz 
        question="Combien de bases légales permet le RGPD pour justifier un traitement de données personnelles ?"
        options={[
          { id: "A", text: "3 bases légales", isCorrect: false },
          { id: "B", text: "4 bases légales", isCorrect: false },
          { id: "C", text: "6 bases légales", isCorrect: true },
          { id: "D", text: "8 bases légales", isCorrect: false }
        ]}
      />

      <Quiz 
        question="Un chatbot d'assistance client utilisant un LLM se situe dans quel niveau de risque de l'IA Act ?"
        options={[
          { id: "A", text: "Risque inacceptable", isCorrect: false },
          { id: "B", text: "Risque élevé", isCorrect: false },
          { id: "C", text: "Risque limité (obligations de transparence)", isCorrect: true },
          { id: "D", text: "Risque minimal", isCorrect: false }
        ]}
      />

      <Quiz 
        question="Quelle est l'amende maximale prévue par l'IA Act pour un usage non conforme ?"
        options={[
          { id: "A", text: "4 % du CA mondial ou 20 M€", isCorrect: false },
          { id: "B", text: "7 % du CA mondial ou 35 M€", isCorrect: true },
          { id: "C", text: "10 % du CA mondial ou 50 M€", isCorrect: false },
          { id: "D", text: "2 % du CA mondial ou 10 M€", isCorrect: false }
        ]}
      />
    </div>
  ),
  "3": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 3 — Identifier les données à risques</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Comprendre la notion de donnée sensible dans un contexte LLM</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>Toutes les données ne présentent pas le même niveau de risque lorsqu'elles sont transmises à un LLM. Il convient de distinguer plusieurs catégories, chacune soumise à des régimes de protection différents.</p>
      </div>

      <DataLeakCaseStudy />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">NIVEAU ROUGE — NE JAMAIS ENVOYER</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-900 dark:text-red-200 space-y-2">
            <p>• Numéros de sécurité sociale (NIR)</p>
            <p>• Données de santé (diagnostics, ordonnances)</p>
            <p>• Données biométriques (empreintes, reconnaissance faciale)</p>
            <p>• Données financières (RIB, numéro carte bancaire, revenus détaillés)</p>
            <p>• Données judiciaires (casier, condamnations)</p>
            <p>• Mots de passe, clés API</p>
            <p>• Données de mineurs identifiables</p>
            <p>• Données d'origine raciale/ethnique, religion</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="text-orange-700 dark:text-orange-400">NIVEAU ORANGE — ANONYMISER AVANT ENVOI</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-orange-900 dark:text-orange-200 space-y-2">
            <p>• Noms et prénoms associés à un contexte sensible</p>
            <p>• Adresses personnelles complètes</p>
            <p>• Données RH (salaires, évaluations, absences)</p>
            <p>• Contrats et accords confidentiels</p>
            <p>• Données clients avec numéros de compte</p>
            <p>• Photos et vidéos de personnes identifiables</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="text-yellow-700 dark:text-yellow-400">NIVEAU JAUNE — ÉVALUER SELON LE CONTEXTE</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-900 dark:text-yellow-200 space-y-2">
            <p>• Noms et prénoms dans un contexte professionnel public</p>
            <p>• Adresses e-mail professionnelles</p>
            <p>• Données d'usage (logs, analytics anonymisés)</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400">NIVEAU VERT — PEUT ÊTRE ENVOYÉ</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-900 dark:text-green-200 space-y-2">
            <p>• Données déjà publiquement disponibles</p>
            <p>• Textes entièrement anonymisés et validés</p>
            <p>• Données synthétiques / fictives</p>
            <p>• Requêtes sans donnée personnelle</p>
          </CardContent>
        </Card>
      </div>

      <DataRiskDragDrop />

      <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
        <h3>Anonymisation vs Pseudonymisation : Ne confondez pas les deux !</h3>
        <p>
          C'est l'erreur la plus fréquente lors de la préparation de données pour un LLM.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="text-blue-600 dark:text-blue-400 mt-0">Pseudonymisation (Réversible)</h4>
            <p className="text-sm mb-0">
              Remplacer les identifiants directs par un code (ex: "Jean Dupont" devient "Client_A12"). <strong>Attention :</strong> Le RGPD s'applique toujours ! Si le LLM a accès au contexte, il peut ré-identifier la personne par croisement d'informations (inférence).
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <h4 className="text-emerald-600 dark:text-emerald-400 mt-0">Anonymisation (Irréversible)</h4>
            <p className="text-sm mb-0">
              Modifier les données de telle sorte qu'il soit <strong>impossible</strong> de ré-identifier la personne, même en croisant les données. Le RGPD ne s'applique plus aux données véritablement anonymisées. C'est le standard visé pour l'entraînement de modèles.
            </p>
          </div>
        </div>

        <h3>Les risques spécifiques liés aux LLM</h3>
        
        <h4>La mémorisation des données</h4>
        <p>Les LLM peuvent, dans certains contextes, mémoriser des données d'entrée et les restituer lors de futures requêtes. Ce phénomène est particulièrement préoccupant pour les données sensibles. Les fournisseurs de LLM en API désactivent généralement cette mémorisation, mais elle reste possible dans des configurations fine-tuning ou RAG mal paramétrées.</p>

        <h4>L'inférence indirecte</h4>
        <p>Même sans donnée directement identifiante, un LLM peut déduire des informations sensibles. Exemple : un texte mentionnant "notre employé en arrêt depuis 3 mois pour une pathologie lourde" permet d'inférer des données de santé sans jamais les nommer explicitement.</p>

        <h4>Le prompt injection</h4>
        <p>Un attaquant peut insérer des instructions malveillantes dans les données transmises au LLM pour lui faire révéler d'autres informations présentes dans le contexte. Cette attaque est particulièrement dangereuse dans les architectures RAG ou multi-agents.</p>
      </div>

      <Quiz 
        question="Vous devez analyser un document RH contenant les salaires. Quelle est la bonne approche ?"
        options={[
          { id: "A", text: "L'envoyer directement au LLM car c'est un usage professionnel légitime", isCorrect: false },
          { id: "B", text: "Anonymiser les noms et supprimer les montants exacts avant envoi", isCorrect: true },
          { id: "C", text: "Refuser systématiquement tout traitement RH par IA", isCorrect: false },
          { id: "D", text: "Demander le consentement de chaque employé par e-mail", isCorrect: false }
        ]}
      />
    </div>
  ),
  "4": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 4 — Cartographier et classifier les usages IA</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">La méthode CARTO-IA en 6 étapes</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>La cartographie des usages IA est à la fois une bonne pratique de gouvernance et une exigence progressive de l'IA Act. Elle vous permet de savoir précisément quels modèles vous utilisez, pour quelles finalités, sur quelles données, et avec quels prestataires.</p>
        
        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
          <h4 className="text-amber-800 dark:text-amber-400 font-bold mt-0 mb-2">Le fléau du "Shadow AI"</h4>
          <p className="text-sm text-amber-900 dark:text-amber-200 mb-0">
            Le <em>Shadow AI</em> désigne l'utilisation par les collaborateurs d'outils d'IA non approuvés par la DSI (ex: utiliser son compte ChatGPT personnel pour résumer un document confidentiel de l'entreprise). <strong>C'est aujourd'hui la première source de fuite de données liées à l'IA.</strong> La cartographie doit impérativement inclure des entretiens avec les métiers pour débusquer ces usages cachés et proposer des alternatives sécurisées (ex: déploiement d'un ChatGPT Enterprise ou d'un modèle open-source en local).
          </p>
        </div>
      </div>

      <DataFlowMapper />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ol>
          <li><strong>Recensement</strong> : listez tous les outils et systèmes IA, y compris le shadow IT</li>
          <li><strong>Description</strong> : finalité, données traitées, modèle, prestataire, fréquence</li>
          <li><strong>Classification IA Act</strong> : risque inacceptable, élevé, limité, ou minimal</li>
          <li><strong>Vérification RGPD</strong> : base légale, nécessité AIPD, clauses de sous-traitance</li>
          <li><strong>Plan d'action</strong> : actions correctives, owner, échéance pour chaque usage non conforme</li>
          <li><strong>Maintien</strong> : révision trimestrielle, mise à jour à chaque nouveau projet ou fournisseur</li>
        </ol>

        <RegisterDownload />

        <h3>Les contrats avec les fournisseurs LLM (DPA — Art. 28)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b dark:border-slate-800">
                <th className="pb-2 font-semibold">Point à vérifier</th>
                <th className="pb-2 font-semibold">Ce qu'il faut savoir</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              <tr>
                <td className="py-2 font-medium">Lieu d'hébergement</td>
                <td className="py-2">UE ou pays adéquat (UK, Suisse, Japon...) ou clauses contractuelles types pour USA</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Durée de conservation</td>
                <td className="py-2">Les données ne doivent pas être conservées au-delà du nécessaire</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Utilisation pour l'entraînement</td>
                <td className="py-2">Vérifier si vos données peuvent servir à améliorer le modèle</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Droit d'audit</td>
                <td className="py-2">Possibilité d'auditer ou de demander des certifications (SOC2, ISO 27001)</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Droits sur les outputs</td>
                <td className="py-2">Qui détient les droits sur les contenus générés ?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Quiz 
        question="Vous déployez un outil d'analyse automatique de CV qui note et classe les candidats. Quelle qualification IA Act ?"
        options={[
          { id: "A", text: "Risque minimal", isCorrect: false },
          { id: "B", text: "Risque limité — simple transparence", isCorrect: false },
          { id: "C", text: "Risque élevé — documentation et supervision humaine", isCorrect: true },
          { id: "D", text: "Risque inacceptable — usage interdit", isCorrect: false }
        ]}
      />
    </div>
  ),
  "5": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 5 — Bonnes pratiques par mission client</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Les 7 réflexes fondamentaux</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ol>
          <li>Ne jamais uploader un fichier sans l'avoir au préalable vérifié (scan rapide des données sensibles)</li>
          <li>Paramétrer vos outils LLM pour désactiver la mémorisation et le partage des données</li>
          <li>Utiliser des données synthétiques ou anonymisées pour les tests et les démos</li>
          <li>Documenter chaque usage IA client dans votre registre de traitements</li>
          <li>Vérifier les CGU et la politique de PI de chaque outil avant utilisation sur des données clients</li>
          <li>Former les membres de votre équipe aux règles minimales de conformité et d'éthique</li>
          <li>Maintenir une veille réglementaire : CNIL, EDPB et EUIPO publient régulièrement des lignes directrices</li>
        </ol>
      </div>

      <BestPracticesGenerator />

      <Callout type="warning" title="OBLIGATIONS SPÉCIFIQUES — RH & RECRUTEMENT IA">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>TRANSPARENCE</strong> : Les candidats doivent être informés qu'une IA analyse leurs dossiers</li>
          <li><strong>SUPERVISION</strong> : Un humain doit valider toute décision de sélection ou d'élimination</li>
          <li><strong>NON-DISCRIMINATION</strong> : Le modèle doit être audité pour les biais avant déploiement</li>
          <li><strong>DROIT D'EXPLICATION</strong> : Tout candidat peut demander une explication (art. 22 RGPD)</li>
          <li><strong>LIMITATION</strong> : Ne pas collecter plus de données que nécessaire à l'évaluation</li>
        </ul>
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
        <h3>Security & Privacy by Design</h3>
        <p>
          L'intégration de l'IA dans vos produits ne doit pas se faire au détriment de la sécurité. Appliquez ces principes d'architecture dès la phase de conception :
        </p>
        <ul>
          <li><strong>Zero Trust Architecture</strong> : Ne faites jamais confiance aux entrées (prompts) des utilisateurs. Mettez en place des filtres de validation stricts avant l'envoi au LLM.</li>
          <li><strong>Data Minimization</strong> : N'envoyez au LLM que le contexte strictement nécessaire pour répondre à la requête. Ne lui donnez pas accès à toute la base de données.</li>
          <li><strong>Isolation des tenants</strong> : Si vous construisez une application SaaS B2B avec du RAG (Retrieval-Augmented Generation), assurez-vous que la recherche vectorielle est strictement cloisonnée par client pour éviter qu'un utilisateur n'accède aux documents d'une autre entreprise via le LLM.</li>
          <li><strong>Output Filtering</strong> : Analysez les réponses du LLM avant de les afficher à l'utilisateur pour bloquer les fuites d'informations ou les contenus inappropriés.</li>
        </ul>

        <h3>Check-list de conformité pré-projet</h3>
        <ul className="list-none pl-0 space-y-2">
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Base légale RGPD identifiée et documentée</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Données classifiées selon le niveau de risque (rouge/orange/jaune/vert)</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Fournisseur LLM évalué : DPA signé, localisation des données vérifiée</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Niveau de risque IA Act déterminé</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> AIPD réalisée si nécessaire</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Clause IA et clause PI intégrées au contrat client</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Mécanisme de supervision humaine prévu</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Procédure de purge des données en fin de mission documentée</li>
          <li className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Évaluation éthique du projet réalisée</li>
        </ul>
      </div>

      <Quiz 
        question="Quelle est la première action à réaliser AVANT de démarrer un projet IA impliquant des données client ?"
        options={[
          { id: "A", text: "Choisir le meilleur modèle LLM disponible", isCorrect: false },
          { id: "B", text: "Identifier et documenter la base légale RGPD", isCorrect: true },
          { id: "C", text: "Obtenir un devis du fournisseur cloud", isCorrect: false },
          { id: "D", text: "Former l'équipe technique à l'utilisation du modèle", isCorrect: false }
        ]}
      />
    </div>
  ),
  "6": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 6 — Éthique de l'IA</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Principes, biais & responsabilité</p>
      </div>

      <Callout type="info" title="POURQUOI L'ÉTHIQUE IA DEVIENT UNE OBLIGATION">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>L'IA Act impose explicitement des exigences éthiques pour les systèmes à haut risque.</li>
          <li>La CNIL, l'EDPB et la Commission Européenne ont publié des lignes directrices sur l'éthique IA.</li>
          <li>Les clients et partenaires exigent de plus en plus des garanties éthiques formalisées.</li>
          <li>Les scandales liés aux biais algorithmiques (recrutement, crédit, justice) ont multiplié les contentieux.</li>
          <li>L'UNESCO a adopté en 2021 une Recommandation sur l'éthique de l'IA, ratifiée par 193 pays.</li>
        </ul>
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>Les 7 principes éthiques fondamentaux de l'IA</h3>
        
        <h4>Principe 1 — Transparence et Explicabilité (XAI)</h4>
        <p>Les systèmes d'IA doivent être intelligibles et explicables. Les utilisateurs ont le droit de savoir qu'ils interagissent avec une IA, et de comprendre les grandes lignes de son fonctionnement. Ce principe est désormais une obligation légale pour les chatbots (IA Act, art. 50) et les décisions automatisées (RGPD, art. 22). L'explicabilité (XAI - eXplainable AI) consiste à pouvoir justifier <em>pourquoi</em> un modèle a pris une décision spécifique, ce qui est souvent complexe avec les réseaux de neurones profonds ("boîtes noires").</p>

        <h4>Principe 2 — Équité et non-discrimination</h4>
        <p>Les systèmes d'IA ne doivent pas perpétuer ou amplifier des discriminations fondées sur des caractéristiques protégées : origine, sexe, âge, religion, handicap, orientation sexuelle... Ce principe est au carrefour du droit du travail, du RGPD (art. 9 sur les données sensibles) et de l'IA Act.</p>
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4 my-4 rounded-r-lg">
          <h5 className="text-red-800 dark:text-red-300 font-bold mt-0 mb-2">Exemples réels de biais algorithmiques</h5>
          <ul className="text-sm text-red-900 dark:text-red-200 mb-0 pl-4">
            <li><strong>Amazon (2018) :</strong> Leur outil expérimental de recrutement par IA pénalisait systématiquement les CV contenant le mot "femme" (ex: "capitaine de l'équipe féminine d'échecs") car il avait été entraîné sur 10 ans de CV majoritairement masculins.</li>
            <li><strong>Santé (États-Unis, 2019) :</strong> Un algorithme utilisé sur 200 millions de patients pour identifier ceux nécessitant des soins supplémentaires privilégiait les patients blancs au détriment des patients noirs, car il utilisait les "dépenses de santé passées" comme indicateur de besoin (les patients noirs ayant historiquement eu moins accès aux soins coûteux).</li>
          </ul>
        </div>

        <h4>Principe 3 — Responsabilité (Accountability) et "Human in the Loop"</h4>
        <p>Il doit toujours être possible d'identifier qui est responsable des décisions prises par ou avec l'aide d'un système d'IA. Ce principe implique une chaîne de responsabilité claire entre le fournisseur du modèle (provider), le déployeur (votre organisation) et l'utilisateur final.</p>
        <p>Pour garantir cette responsabilité, le concept de <strong>HITL (Human In The Loop - Humain dans la boucle)</strong> est essentiel : l'IA propose, mais l'humain dispose. L'humain doit toujours avoir le dernier mot, particulièrement pour les décisions à haut risque (RH, crédit, santé).</p>

        <h4>Principe 4 — Sûreté et robustesse</h4>
        <p>Un système d'IA doit fonctionner de manière fiable, même dans des conditions inattendues, et résister aux tentatives de manipulation (adversarial attacks, prompt injection...).</p>

        <h4>Principe 5 — Respect de la vie privée (Privacy by Design)</h4>
        <p>La protection de la vie privée doit être intégrée dès la conception du système, et non ajoutée a posteriori.</p>

        <h4>Principe 6 — Bien-être humain et inclusion</h4>
        <p>Les systèmes d'IA doivent être conçus pour améliorer le bien-être humain et être accessibles à toutes les populations.</p>

        <h4>Principe 7 — Développement durable</h4>
        <p>L'empreinte environnementale de l'IA est un enjeu éthique émergent. L'entraînement d'un grand modèle de langage consomme autant d'énergie que plusieurs centaines de vols transatlantiques.</p>
      </div>

      <BiasDetectionSimulator />

      <Quiz 
        question="Qu'est-ce que le 'biais de données historiques' dans un LLM ?"
        options={[
          { id: "A", text: "Une erreur technique dans le code du modèle", isCorrect: false },
          { id: "B", text: "La tendance du modèle à reproduire des inégalités présentes dans ses données d'entraînement", isCorrect: true },
          { id: "C", text: "Un problème de mémoire qui corrompt les données d'entrée", isCorrect: false },
          { id: "D", text: "Un biais introduit volontairement par le concepteur", isCorrect: false }
        ]}
      />

      <Quiz 
        question="Selon l'IA Act, qu'exige le principe de supervision humaine pour les systèmes à haut risque ?"
        options={[
          { id: "A", text: "Qu'un humain valide 100 % des décisions", isCorrect: false },
          { id: "B", text: "Que le système puisse fonctionner sans humain dans un délai de 24h", isCorrect: false },
          { id: "C", text: "Que le système soit conçu pour permettre à un humain d'intervenir, modifier ou arrêter les décisions", isCorrect: true },
          { id: "D", text: "Que le développeur signe une déclaration éthique annuelle", isCorrect: false }
        ]}
      />
    </div>
  ),
  "7": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 7 — Propriété intellectuelle & IA</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Les droits d'auteur sur les outputs générés par IA</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>La question de la propriété intellectuelle (PI) dans l'IA se divise en deux problématiques distinctes : les données d'entrée (Input) et les données générées (Output).</p>
        
        <h3>1. Les données générées (Output) : Qui possède quoi ?</h3>
        <p>La règle générale : pas d'auteur = pas de protection.</p>
        <p>En droit français et européen, une œuvre n'est protégeable par le droit d'auteur que si elle reflète la 'personnalité de son auteur', c'est-à-dire si elle résulte d'un acte de création humain original. Un contenu généré intégralement par une IA (un texte ChatGPT, une image Midjourney) sans intervention créative humaine significative ne peut pas, en principe, être protégé par le droit d'auteur. Vous pouvez l'utiliser, mais vos concurrents aussi.</p>
        <p><em>Note : Le simple fait d'écrire un prompt détaillé ("prompt engineering") n'est généralement pas considéré par les tribunaux comme un acte créatif suffisant pour revendiquer un droit d'auteur sur le résultat.</em></p>
      </div>

      <IPDecisionTree />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>2. Les données d'entraînement (Input) : Le droit de fouille</h3>
        <p>La directive européenne sur le droit d'auteur (2019/790) encadre le Text and Data Mining (TDM). Elle prévoit une exception légale pour la recherche scientifique et une exception commerciale limitée — mais uniquement si les ayants droit n'ont pas exercé leur droit d'opposition (opt-out).</p>
        
        <div className="bg-slate-100 dark:bg-slate-800/50 p-4 my-4 rounded-lg border-l-4 border-slate-400">
          <h4 className="mt-0 mb-2">Les batailles juridiques en cours</h4>
          <p className="text-sm mb-0">
            La légalité de l'entraînement des modèles sur des œuvres protégées est actuellement contestée devant les tribunaux du monde entier :
            <br/>• <strong>New York Times vs OpenAI & Microsoft :</strong> Le NYT accuse OpenAI d'avoir entraîné ses modèles sur des millions de ses articles sans licence, créant un produit concurrent.
            <br/>• <strong>Getty Images vs Stability AI :</strong> Getty poursuit les créateurs de Stable Diffusion pour avoir utilisé 12 millions d'images protégées (le filigrane Getty apparaissant parfois dans les images générées).
          </p>
        </div>
      </div>

      <Callout type="tip" title="L'OPT-OUT : UN DROIT QUE VOUS POUVEZ EXERCER">
        <p>Si vous êtes éditeur, auteur ou détenteur de droits, vous pouvez demander que vos contenus ne soient pas utilisés pour l'entraînement de modèles IA commerciaux.</p>
        <p>Mécanismes : clause dans vos CGU, fichier ai.txt (standard émergent), demande directe aux fournisseurs de modèles.</p>
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
        <h3>Le risque de contrefaçon involontaire</h3>
        <p>Un LLM peut générer du contenu qui ressemble fortement à des œuvres protégées — textes, mélodies, images, code — sans que l'utilisateur en soit conscient. Ce phénomène, appelé 'mémorisation' ou 'régurgitation', est documenté scientifiquement et crée un risque de contrefaçon involontaire.</p>
      </div>

      <Quiz 
        question="En droit français, un texte entièrement généré par une IA sans apport créatif humain est-il protégé par le droit d'auteur ?"
        options={[
          { id: "A", text: "Oui, comme toute œuvre originale", isCorrect: false },
          { id: "B", text: "Oui, mais pendant seulement 10 ans", isCorrect: false },
          { id: "C", text: "Non — le droit d'auteur requiert un auteur humain", isCorrect: true },
          { id: "D", text: "Oui si le modèle est considéré comme une personne morale", isCorrect: false }
        ]}
      />

      <Quiz 
        question="Qu'est-ce que le 'droit d'opt-out' pour le Text and Data Mining prévu par la directive européenne 2019/790 ?"
        options={[
          { id: "A", text: "Le droit de demander l'effacement de ses données personnelles", isCorrect: false },
          { id: "B", text: "Le droit d'un ayant droit de s'opposer à l'utilisation de ses œuvres pour entraîner des modèles IA commerciaux", isCorrect: true },
          { id: "C", text: "Le droit d'exclure ses produits de la vente sur les marketplaces IA", isCorrect: false },
          { id: "D", text: "Une procédure pour récupérer la rémunération des usages IA", isCorrect: false }
        ]}
      />
    </div>
  ),
  "8": (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Module 8 — Confidentialité, secret professionnel & IA</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Les obligations de confidentialité dans un contexte IA</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>La confidentialité professionnelle prend une nouvelle dimension à l'ère des LLM. Des informations qui auraient été partagées oralement ou par e-mail sont désormais copiées-collées dans des interfaces IA, créant des risques d'exposition inédits.</p>

        <h3>Le risque de violation de secret professionnel par IA</h3>
        <p>Un avocat qui copie un acte confidentiel dans ChatGPT pour en obtenir une synthèse, un médecin qui soumet un dossier patient pour rédiger une lettre, un expert-comptable qui partage un bilan client avec un LLM : tous ces usages peuvent constituer une violation du secret professionnel, indépendamment du cadre RGPD.</p>
      </div>

      <Callout type="danger" title="CAS RÉELS — SANCTIONS 2023-2025">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Barreau de New York (2023)</strong> : Deux avocats suspendus pour avoir soumis des mémoires juridiques falsifiés générés par ChatGPT sans vérification.</li>
          <li><strong>Ordre des experts-comptables (France, 2024)</strong> : Première mise en demeure d'un cabinet pour utilisation de données clients non anonymisées dans un LLM grand public.</li>
          <li><strong>CNIL (2024)</strong> : Mise en demeure d'une clinique pour utilisation de ChatGPT pour la rédaction de comptes-rendus médicaux avec données patients identifiées.</li>
          <li><strong>Samsung (2023)</strong> : Fuite interne de code source propriétaire via ChatGPT. Décision de bannir tous les LLM externes pour les 20 000 ingénieurs.</li>
        </ul>
      </Callout>

      <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
        <h3>Les outils IA approuvés vs. non approuvés : Public vs Enterprise</h3>
        <p>Il est crucial de comprendre la différence entre les interfaces grand public et les offres d'entreprise (API) :</p>
        <ul>
          <li><strong>Interfaces grand public (ChatGPT, Claude.ai, Gemini) :</strong> Par défaut, les données saisies peuvent être utilisées pour entraîner les futurs modèles. Ces outils ne doivent <strong>jamais</strong> recevoir de données confidentielles.</li>
          <li><strong>Offres Enterprise et API (ChatGPT Enterprise, Azure OpenAI, Anthropic API) :</strong> Ces offres incluent contractuellement une politique de <em>Zero Data Retention</em> (ou rétention très courte, ex: 30 jours pour abus) et garantissent que vos données <strong>ne seront pas</strong> utilisées pour l'entraînement. C'est le standard requis pour un usage professionnel.</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 p-4 my-6 rounded-r-lg">
          <h4 className="text-emerald-800 dark:text-emerald-300 font-bold mt-0 mb-2">La solution RAG (Retrieval-Augmented Generation)</h4>
          <p className="text-sm text-emerald-900 dark:text-emerald-200 mb-0">
            Pour interroger vos documents internes de manière sécurisée, l'architecture RAG est la norme. Au lieu d'envoyer tous vos documents au LLM (ou pire, de "fine-tuner" le modèle avec vos données), le RAG fonctionne comme un moteur de recherche : il trouve les paragraphes pertinents dans votre base de données sécurisée, et n'envoie <strong>que ces paragraphes</strong> au LLM (via une API sécurisée) pour formuler la réponse. Vos documents restent stockés chez vous.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b dark:border-slate-800">
                <th className="pb-2 font-semibold">Catégorie de données</th>
                <th className="pb-2 font-semibold">Outils LLM autorisés</th>
                <th className="pb-2 font-semibold">Outils LLM interdits</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              <tr>
                <td className="py-2">Données publiques / non sensibles</td>
                <td className="py-2 text-green-600">Tous outils (ChatGPT, Claude, Gemini...)</td>
                <td className="py-2">Aucune restriction spécifique</td>
              </tr>
              <tr>
                <td className="py-2">Données internes non confidentielles</td>
                <td className="py-2 text-green-600">Outils avec DPA signé et opt-out entraînement</td>
                <td className="py-2 text-red-600">ChatGPT gratuit, Gemini gratuit</td>
              </tr>
              <tr>
                <td className="py-2">Données clients confidentielles (NDA)</td>
                <td className="py-2 text-green-600">Azure OpenAI (EU), Ollama local, Claude API avec DPA</td>
                <td className="py-2 text-red-600">Tout outil sans DPA ou avec entraînement</td>
              </tr>
              <tr>
                <td className="py-2">Données de santé</td>
                <td className="py-2 text-green-600">LLM certifiés HDS uniquement</td>
                <td className="py-2 text-red-600">TOUS les LLM grand public sans exception</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <SecureArchitectureWorkshop />

      <RolePlayGame />

      <Quiz 
        question="Un médecin utilise Claude.ai (version grand public) pour rédiger un compte-rendu médical avec les données d'un patient. Cette pratique est :"
        options={[
          { id: "A", text: "Autorisée si le médecin désactive l'historique des conversations", isCorrect: false },
          { id: "B", text: "Une violation du secret médical et potentiellement du RGPD", isCorrect: true },
          { id: "C", text: "Autorisée car les LLM sont des outils professionnels comme les autres", isCorrect: false },
          { id: "D", text: "Autorisée si le patient a donné son consentement verbal", isCorrect: false }
        ]}
      />
    </div>
  ),
};
