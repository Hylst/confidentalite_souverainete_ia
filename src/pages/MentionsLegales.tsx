import { SEO } from "@/src/components/SEO";

export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <SEO 
        title="Mentions Légales" 
        description="Mentions légales de l'application Conformité IA & RGPD."
        path="/mentions-legales"
      />
      
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">Mentions Légales</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          En vigueur au {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">1. Éditeur du site</h2>
          <p>
            L'application "Conformité IA, RGPD & Souveraineté" est éditée à des fins éducatives et de démonstration.
            <br />
            <strong>Éditeur et Créateur :</strong> Geoffroy Streit, alias Hylst
            <br />
            <strong>Email de contact :</strong> geoffroy.streit@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">2. Hébergement</h2>
          <p>
            Ce site est hébergé par :
            <br />
            <strong>Serveur VPS Hylst</strong>
            <br />
            (Gestion Technique via Coolify - Architecture Souveraine)
            <br />
            France, UE
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">3. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          <p>
            La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse de l'éditeur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold border-b pb-2 dark:border-slate-800">4. Responsabilité</h2>
          <p>
            Les informations fournies sur cette application (cours, générateurs, logigrammes) le sont à titre purement informatif et éducatif. Elles ne constituent en aucun cas un conseil juridique professionnel. L'éditeur ne saurait être tenu responsable des conséquences de l'utilisation des informations et modèles fournis. Pour toute mise en conformité réelle, il est recommandé de consulter un avocat spécialisé ou un Délégué à la Protection des Données (DPO).
          </p>
        </section>
      </div>
    </div>
  );
}
