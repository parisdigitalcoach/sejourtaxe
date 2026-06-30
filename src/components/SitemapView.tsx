import React from "react";
import { Map, Landmark, Calculator, Info, Mail, ShieldCheck, Cookie, Scale } from "lucide-react";

interface SitemapViewProps {
  navigate: (path: string) => void;
}

export default function SitemapView({ navigate }: SitemapViewProps) {
  const pages = [
    {
      title: "Pages Principales",
      icon: <Map className="h-5 w-5 text-[#d1121d]" />,
      items: [
        { name: "Accueil", path: "/", description: "Page d'accueil de SejourTaxe.com, l'outil de référence pour le calcul de la taxe de séjour.", icon: <Landmark className="h-4 w-4" /> },
        { name: "Calculateur de taxe", path: "/calculateur-taxe-de-sejour", description: "Simulateur gratuit, simple et précis pour estimer votre taxe de séjour dans n'importe quelle commune française.", icon: <Calculator className="h-4 w-4" /> },
        { name: "Guide d'explication", path: "/comment-calculer-la-taxe-de-sejour", description: "Guide complet expliquant le fonctionnement, le calcul et les règles de la taxe de séjour pour meublés et hôtels.", icon: <Info className="h-4 w-4" /> },
        { name: "Contact", path: "/contact", description: "Formulaire de contact pour poser vos questions techniques, signaler un bug ou nous suggérer des améliorations.", icon: <Mail className="h-4 w-4" /> }
      ]
    },
    {
      title: "Pages Légales & Protection",
      icon: <ShieldCheck className="h-5 w-5 text-[#d1121d]" />,
      items: [
        { name: "Politique de confidentialité", path: "/politique-de-confidentialite", description: "Nos engagements de protection de vos données personnelles et conformité RGPD.", icon: <ShieldCheck className="h-4 w-4" /> },
        { name: "Politique des cookies", path: "/politique-des-cookies", description: "Description de l'usage des traceurs et cookies de mesure d'audience et gestion de vos préférences.", icon: <Cookie className="h-4 w-4" /> },
        { name: "Mentions légales", path: "/mentions-legales", description: "Informations réglementaires concernant l'éditeur, l'hébergement et la propriété intellectuelle.", icon: <Scale className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12" id="sitemap-container">
      {/* Page Header */}
      <div className="py-8 border-b border-black/10" id="sitemap-header">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          Plan <span className="text-[#d1121d]">du Site</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          Retrouvez la structure complète des pages disponibles sur SejourTaxe.com pour naviguer facilement.
        </p>
      </div>

      {/* Main Sitemap Grid */}
      <div className="space-y-8" id="sitemap-grid">
        {pages.map((group, idx) => (
          <div key={idx} className="border border-black p-6 sm:p-8 bg-white space-y-6">
            <div className="flex items-center gap-2 border-b border-black pb-3">
              {group.icon}
              <h2 className="text-sm font-black uppercase tracking-wider text-black">{group.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {group.items.map((item, itemIdx) => (
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
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.description}</p>
                    <span className="inline-block text-[10px] font-mono text-[#d1121d] bg-red-50 px-2 py-0.5 border border-red-100">
                      sejourtaxe.com{item.path}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
