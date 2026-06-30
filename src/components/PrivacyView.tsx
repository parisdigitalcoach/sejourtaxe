import { ShieldCheck, EyeOff } from "lucide-react";

export default function PrivacyView() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="py-8 border-b border-black/10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          Confidentialité
        </h1>
        <p className="text-xs text-[#d1121d] font-mono uppercase tracking-widest mt-2">Dernière mise à jour : 30 juin 2026</p>
      </div>

      <section className="border border-black p-6 sm:p-10 bg-white space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="font-medium">
          Chez <strong>SejourTaxe.com</strong>, la protection de vos données personnelles est notre priorité absolue. En accord avec le Règlement Général sur la Protection des Données (RGPD), cette page vous présente de façon claire notre politique de gestion des données.
        </p>

        {/* Local Processing */}
        <div className="bg-[#f6f6f6] p-5 border-l-2 border-[#d1121d] flex gap-4 items-start">
          <EyeOff className="h-6 w-6 text-black shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">Calculs 100% anonymes et en local</h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Toutes les opérations mathématiques effectuées sur notre calculateur de taxe de séjour sont réalisées directement dans votre navigateur web. Aucune coordonnée financière, montant de loyer, nombre de voyageurs ou nom de ville n'est transmis à nos serveurs ou enregistré dans une base de données.
            </p>
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">1. Collecte des données</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Notre site web est conçu pour fonctionner sans inscription, sans compte utilisateur et sans formulaire d'identification. Nous ne collectons aucune information nominative (telle que votre nom, adresse e-mail ou numéro de téléphone) lors de votre utilisation du calculateur.
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            Si vous utilisez notre formulaire de contact, votre adresse e-mail et votre message seront uniquement exploités pour vous répondre et ne seront jamais partagés à des tiers à des fins publicitaires.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">2. Cookies et Google AdSense</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Nous utilisons la solution publicitaire <strong>Google AdSense</strong> pour financer le maintien et l'accessibilité gratuite de notre outil en ligne. À ce titre, Google et ses partenaires utilisent des cookies tiers pour diffuser des annonces publicitaires ciblées basées sur vos visites antérieures sur notre site ou sur d'autres sites internet.
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            Vous pouvez à tout moment choisir de désactiver la publicité personnalisée dans les paramètres de votre compte Google, ou configurer votre navigateur internet pour rejeter l'installation des cookies tiers.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">3. Liens externes</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Notre site propose des liens d'informations redirigeant vers les portails officiels de l'administration publique française (impots.gouv.fr). Nous ne sommes pas responsables du contenu ou des règles de confidentialité pratiquées par ces sites tiers officiels.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">4. Contact et réclamation</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Pour toute question relative à l'utilisation du site SejourTaxe.com ou pour exercer vos droits sur les informations envoyées par e-mail, vous pouvez contacter notre responsable de publication à l'adresse fournie sur notre page de contact.
          </p>
        </div>
      </section>
    </div>
  );
}
