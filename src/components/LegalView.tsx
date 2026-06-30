import { FileText, Landmark, ShieldAlert, Scale } from "lucide-react";

export default function LegalView() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="py-8 border-b border-black/10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          Mentions <span className="text-[#d1121d]">Légales</span>
        </h1>
        <p className="text-xs text-[#d1121d] font-mono uppercase tracking-widest mt-2">En vigueur à compter de juin 2026</p>
      </div>

      <section className="border border-black p-6 sm:p-10 bg-white space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="font-medium">
          Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), il est précisé aux utilisateurs du site <strong>sejourtaxe.com</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
        </p>

        {/* 1. Éditeur */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black flex items-center gap-2">
            <Scale className="h-5 w-5 text-[#d1121d]" />
            <span>1. Édition du site</span>
          </h2>
          <div className="pl-7 space-y-1 text-slate-600 text-xs sm:text-sm">
            <p><strong>Propriétaire & Éditeur :</strong> SejourTaxe (Édition de sites web indépendants)</p>
            <p><strong>Responsable de la publication :</strong> Service d'édition SejourTaxe</p>
            <p><strong>E-mail de contact :</strong> contact@sejourtaxe.com</p>
            <p><strong>Statut :</strong> Micro-entreprise enregistrée en France</p>
          </div>
        </div>

        {/* 2. Hébergeur */}
        <div className="space-y-3 border-t border-black/10 pt-5">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black flex items-center gap-2">
            <Landmark className="h-5 w-5 text-[#d1121d]" />
            <span>2. Hébergement du site</span>
          </h2>
          <div className="pl-7 space-y-1 text-slate-600 text-xs sm:text-sm">
            <p><strong>Hébergeur :</strong> Cloudflare, Inc.</p>
            <p><strong>Adresse :</strong> 101 Townsend St, San Francisco, CA 94107, États-Unis</p>
            <p><strong>Téléphone :</strong> +1 (888) 993 5273</p>
            <p><strong>Plateforme de déploiement :</strong> Cloudflare Pages (Static Web Hosting)</p>
          </div>
        </div>

        {/* 3. Propriété intellectuelle */}
        <div className="space-y-3 border-t border-black/10 pt-5">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">3. Propriété intellectuelle</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            L'ensemble des contenus présents sur ce site (structure, textes, logos, scripts informatiques, base de données locale des communes) est protégé par la législation française et internationale relative au droit d'auteur et à la propriété intellectuelle.
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            Toute reproduction, représentation, modification ou publication de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est formellement interdite sans l'autorisation écrite préalable de l'éditeur.
          </p>
        </div>

        {/* 4. Limitation de responsabilité */}
        <div className="space-y-3 border-t border-black/10 pt-5 bg-[#f6f6f6] p-5 border-l-2 border-[#d1121d]">
          <h2 className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
            <ShieldAlert className="h-5 w-5 text-[#d1121d]" />
            <span>4. Limitation de responsabilité</span>
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            <strong>Avertissement important :</strong> Ce site internet propose un simulateur de calcul à but exclusivement indicatif et éducatif. Nous nous efforçons de maintenir les règles fiscales, taux fixes et pourcentages conformes aux arrêtés légaux des collectivités. Néanmoins, l'éditeur ne saurait être tenu responsable d'éventuels écarts de tarifs, de modifications réglementaires imprévues de dernière minute, ou d'interprétations erronées des formules. Seuls les montants votés officiellement par les communes ou leurs EPCI font foi.
          </p>
        </div>
      </section>
    </div>
  );
}
