import React from "react";
import { Map, Landmark, Calculator, Info, Mail, ShieldCheck, Cookie, Scale, Languages } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";

interface SitemapViewProps {
  navigate: (path: string) => void;
}

export default function SitemapView({ navigate }: SitemapViewProps) {
  const { setLanguage, t } = useLanguage();

  const languagesList = [
    { code: "fr", name: "Français 🇫🇷", desc: "Version officielle en français" },
    { code: "en", name: "English 🇬🇧", desc: "Official English version" },
    { code: "de", name: "Deutsch 🇩🇪", desc: "Deutsche Version" },
    { code: "es", name: "Español 🇪🇸", desc: "Versión en español" },
    { code: "it", name: "Italiano 🇮🇹", desc: "Versione in italiano" },
    { code: "zh", name: "中文 🇨🇳", desc: "中文版官方页面" },
  ] as const;

  const coreRoutes = [
    { nameKey: "nav_home", path: "/", defaultName: "Accueil", icon: <Landmark className="h-4 w-4" />, descFr: "Page d'accueil de SejourTaxe, l'outil de référence." },
    { nameKey: "nav_calculator", path: "/calculateur-taxe-de-sejour", defaultName: "Calculateur", icon: <Calculator className="h-4 w-4" />, descFr: "Simulateur gratuit, simple et précis pour estimer votre taxe." },
    { nameKey: "nav_guide", path: "/comment-calculer-la-taxe-de-sejour", defaultName: "Comment calculer ?", icon: <Info className="h-4 w-4" />, descFr: "Guide complet expliquant le fonctionnement de la taxe." },
    { nameKey: "nav_contact", path: "/contact", defaultName: "Contact", icon: <Mail className="h-4 w-4" />, descFr: "Formulaire de contact pour poser vos questions techniques." }
  ];

  const legalRoutes = [
    { name: "Politique de confidentialité", path: "/politique-de-confidentialite", desc: "Nos engagements de protection de vos données personnelles.", icon: <ShieldCheck className="h-4 w-4" /> },
    { name: "Politique des cookies", path: "/politique-des-cookies", desc: "Description de l'usage des traceurs et cookies de mesure d'audience.", icon: <Cookie className="h-4 w-4" /> },
    { name: "Mentions légales", path: "/mentions-legales", desc: "Informations réglementaires concernant l'éditeur et l'hébergement.", icon: <Scale className="h-4 w-4" /> }
  ];

  const handleSitemapClick = (path: string, langCode: Language) => {
    setLanguage(langCode);
    navigate(`${path}?lang=${langCode}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in" id="sitemap-container">
      {/* Page Header */}
      <div className="py-8 border-b border-black/10" id="sitemap-header">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          Plan <span className="text-[#d1121d]">du Site Multilingue</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          Index complet des pages du site optimisées pour le référencement naturel (SEO) dans toutes les langues prises en charge.
        </p>
      </div>

      {/* Language Section Matrix */}
      <div className="space-y-8" id="sitemap-matrix">
        <div className="border border-black p-6 sm:p-8 bg-white space-y-6">
          <div className="flex items-center gap-2 border-b border-black pb-3">
            <Languages className="h-5 w-5 text-[#d1121d]" />
            <h2 className="text-sm font-black uppercase tracking-wider text-black">Matrice des Pages par Langue (SEO Sitemaps)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {languagesList.map((langItem) => (
              <div key={langItem.code} className="space-y-4 border-l-2 border-slate-100 pl-4 py-1 hover:border-[#d1121d] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-black bg-slate-100 px-2 py-0.5 border border-slate-200">
                    {langItem.code.toUpperCase()}
                  </span>
                  <span className="font-bold text-sm text-black">{langItem.name}</span>
                </div>
                <p className="text-xs text-slate-400 font-mono italic">{langItem.desc}</p>

                <div className="flex flex-col gap-2 pt-2">
                  {coreRoutes.map((route) => (
                    <button
                      key={route.path}
                      onClick={() => handleSitemapClick(route.path, langItem.code as Language)}
                      className="text-left text-xs text-slate-700 hover:text-[#d1121d] font-semibold hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="text-slate-400">›</span>
                      <span>{route.defaultName} ({langItem.code.toUpperCase()})</span>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">
                        {route.path}?lang={langItem.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Pages Group */}
        <div className="border border-black p-6 sm:p-8 bg-white space-y-6">
          <div className="flex items-center gap-2 border-b border-black pb-3">
            <ShieldCheck className="h-5 w-5 text-[#d1121d]" />
            <h2 className="text-sm font-black uppercase tracking-wider text-black">Pages Légales & Protection</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {legalRoutes.map((item, itemIdx) => (
              <div 
                key={itemIdx} 
                className="group hover:border-[#d1121d] border border-transparent pl-0 transition-colors flex items-start gap-4"
              >
                <div className="bg-slate-50 border border-black/10 text-slate-700 p-2 mt-0.5 group-hover:bg-[#d1121d] group-hover:text-white group-hover:border-transparent transition-all">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-base font-bold text-black hover:text-[#d1121d] text-left underline decoration-[#d1121d]/30 hover:decoration-[#d1121d] transition-all cursor-pointer"
                  >
                    {item.name}
                  </button>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  <span className="inline-block text-[10px] font-mono text-[#d1121d] bg-red-50 px-2 py-0.5 border border-red-100">
                    sejourtaxe.com{item.path}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
