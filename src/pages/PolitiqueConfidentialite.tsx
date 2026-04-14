import { SEO } from "@/src/components/SEO";

export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <SEO 
        title="Politique de Confidentialité" 
        description="Politique de confidentialité et gestion des données de l'application Conformité IA & RGPD."
        path="/politique-confidentialite"
      />
      
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">Politique de Confidentialité</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">1. Collecte des données personnelles</h2>
          <p>
            L'application "Conformité IA & RGPD" a été conçue selon le principe de <strong>Privacy by Design</strong> (protection de la vie privée dès la conception).
          </p>
          <p>
            <strong>Nous ne collectons, ne transmettons et ne revendons aucune donnée personnelle sur nos serveurs.</strong> Toutes les informations que vous saisissez (nom, informations d'entreprise dans le générateur) restent strictement locales à votre appareil.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">2. Utilisation du stockage local (localStorage)</h2>
          <p>
            Pour vous offrir une expérience d'apprentissage fluide, nous utilisons la technologie de stockage local de votre navigateur (<code>localStorage</code>). Cela nous permet de mémoriser :
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Votre progression dans les modules (marqués comme "terminés").</li>
            <li>Votre profil utilisateur (ex: RH, Développeur) pour personnaliser les recommandations.</li>
            <li>Votre préférence pour le mode clair/sombre.</li>
          </ul>
          <p className="mt-2">
            Ces données ne quittent jamais votre navigateur. Vous pouvez les effacer à tout moment en vidant le cache et les données de site de votre navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">3. Cookies et traceurs</h2>
          <p>
            Cette application <strong>n'utilise aucun cookie de traçage publicitaire ou analytique intrusif</strong>. Nous respectons la directive ePrivacy en nous limitant au stockage technique strictement nécessaire au fonctionnement du service (sauvegarde de progression).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">4. Vos droits (RGPD)</h2>
          <p>
            Puisque nous ne stockons aucune donnée personnelle sur nos serveurs, les droits d'accès, de rectification, d'effacement et de portabilité s'exercent directement par vous-même, en effaçant les données locales de votre navigateur.
          </p>
          <p>
            Pour toute question relative à cette politique, vous pouvez nous contacter à : geoffroy.streit@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
}
