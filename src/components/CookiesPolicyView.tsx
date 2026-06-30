import React from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { Cookie, Settings, Eye, Clock, RotateCcw, AlertCircle } from "lucide-react";

export default function CookiesPolicyView() {
  const { openPreferences } = useCookieConsent();

  return (
    <div className="max-w-3xl mx-auto space-y-12" id="cookies-policy-container">
      {/* Page Header */}
      <div className="py-8 border-b border-black/10" id="cookies-policy-header">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          Politique <span className="text-[#d1121d]">des Cookies</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          Retrouvez toutes les informations sur l'utilisation des traceurs, cookies de mesure d'audience et de publicité sur SejourTaxe.com.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="border border-black p-6 sm:p-10 bg-white space-y-8" id="cookies-policy-card">
        
        {/* Intro */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#d1121d] text-white p-1.5">
              <Cookie className="h-5 w-5" />
            </div>
            <h2 className="text-base font-black text-black uppercase tracking-wider">Introduction & Transparence</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            SejourTaxe.com s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés. Cette page vous informe en toute transparence sur notre usage des cookies et vous permet de piloter vos choix à tout moment.
          </p>
        </div>

        <hr className="border-black/10" />

        {/* 1. What is a cookie? */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-[#d1121d]">01.</span> Qu'est-ce qu'un cookie ?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Un cookie est un petit fichier texte, image ou traceur, déposé et stocké sur votre terminal (ordinateur, smartphone, tablette) lorsque vous visitez un site internet. Les cookies permettent au site de vous reconnaître, de mémoriser vos choix ou vos données de navigation pour faciliter vos prochaines visites et de réaliser des analyses d'utilisation.
          </p>
        </div>

        {/* 2. What cookies are used? */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-[#d1121d]">02.</span> Quels cookies sont utilisés sur le site ?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Nous classons les cookies utilisés sur SejourTaxe.com en trois grandes catégories distinctes :
          </p>

          <div className="space-y-4 mt-4">
            {/* Category A: Necessary */}
            <div className="border-l-2 border-black pl-4 py-1 space-y-1">
              <h4 className="text-xs font-black uppercase text-black">A. Cookies de fonctionnement strictement nécessaires</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ces cookies sont techniquement obligatoires pour vous fournir le service demandé. Ils mémorisent notamment l'état de votre session sur le calculateur de taxe de séjour, conservent l'historique de vos derniers calculs d'une page à l'autre et enregistrent votre choix en matière de consentement aux traceurs. Ils ne nécessitent pas votre accord préalable.
              </p>
            </div>

            {/* Category B: Google Analytics */}
            <div className="border-l-2 border-[#d1121d] pl-4 py-1 space-y-1">
              <h4 className="text-xs font-black uppercase text-black">B. Cookies de mesure d'audience (Google Analytics)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Notre site utilise <strong>Google Analytics (GA)</strong> pour suivre les données de navigation de manière agrégée et anonyme (nombre de visites, durée des sessions, pages vues, communes les plus recherchées, type de navigateurs utilisés). Ces données nous permettent de corriger d'éventuels bugs, d'optimiser nos parcours utilisateurs et d'adapter le contenu.
              </p>
            </div>

            {/* Category C: Google Adsense & GTM */}
            <div className="border-l-2 border-[#d1121d] pl-4 py-1 space-y-1">
              <h4 className="text-xs font-black uppercase text-black">C. Cookies de publicité & marketing (Google Adsense & Google Tag Manager)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nous utilisons <strong>Google AdSense</strong> pour intégrer des bannières publicitaires ciblées sur notre site. Ces publicités permettent de financer le développement technique continu, l'hébergement serveur et de maintenir le calculateur gratuit pour tous les utilisateurs. Ces cookies aident Google à adapter les publicités affichées en fonction de vos centres d'intérêt.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Retention period */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-[#d1121d]" />
            <span>Durée de conservation des traceurs</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Conformément aux directives de la CNIL et du RGPD, la durée de vie des cookies déposés sur notre site est strictement encadrée :
          </p>
          <ul className="list-disc pl-5 text-xs text-slate-500 space-y-2 mt-2 leading-relaxed">
            <li>Les cookies techniques nécessaires sont conservés le temps de votre session de navigation.</li>
            <li>Vos choix de consentement (acceptation ou refus des traceurs) sont conservés pendant une durée de <strong>6 mois</strong>, après quoi le bandeau de consentement réapparaîtra automatiquement.</li>
            <li>Les cookies analytiques Google Analytics ont une durée de vie maximale de <strong>13 mois</strong>.</li>
          </ul>
        </div>

        <hr className="border-black/10" />

        {/* 4. How to modify consent */}
        <div className="bg-slate-50 border border-black/15 p-6 space-y-4" id="manage-consent-panel">
          <div className="flex items-center gap-2 text-black">
            <Settings className="h-5 w-5 text-[#d1121d]" />
            <h3 className="text-xs font-black uppercase tracking-widest">Modifier mon consentement à tout moment</h3>
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Vous pouvez à tout moment reconsidérer vos choix, activer ou désactiver les cookies analytiques et marketing directement depuis notre module de gestion des cookies. L'enregistrement s'effectue instantanément.
          </p>

          <div className="pt-2">
            <button
              onClick={openPreferences}
              className="bg-black hover:bg-[#d1121d] text-white text-xs uppercase tracking-widest font-extrabold py-3.5 px-6 transition-all cursor-pointer inline-flex items-center gap-2"
              id="btn-trigger-cookies-modal"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Gérer mes préférences cookies</span>
            </button>
          </div>
        </div>

        {/* Google Script loading notice */}
        <div className="flex gap-2 text-[11px] text-slate-400 bg-slate-50/50 p-4 border border-dashed border-black/10">
          <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Note technique : Si vous refusez les cookies analytiques ou publicitaires, aucun script Google correspondant n'est téléchargé sur votre navigateur. Vos données de visite restent totalement anonymes et ne font l'objet d'aucun profilage marketing.
          </p>
        </div>

      </div>
    </div>
  );
}
