import React from "react";
import { Map, Landmark, Calculator, Info, Mail, ShieldCheck, Cookie, Scale, Languages } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";

interface SitemapViewProps {
  navigate: (path: string) => void;
}

export default function SitemapView({ navigate }: SitemapViewProps) {
  const { setLanguage, language } = useLanguage();

  const translations: Record<string, any> = {
    fr: {
      title: "Plan ",
      highlight: "du Site Multilingue",
      subtitle: "Index complet des pages du site optimisées pour le référencement naturel (SEO) dans toutes les langues prises en charge.",
      sec1_title: "Matrice des Pages par Langue (SEO Sitemaps)",
      sec2_title: "Pages Légales & Protection",
      nav_home: "Accueil",
      nav_calculator: "Calculateur",
      nav_guide: "Comment calculer ?",
      nav_contact: "Contact",
      leg_privacy: "Politique de confidentialité",
      leg_privacy_desc: "Nos engagements de protection de vos données personnelles.",
      leg_cookies: "Politique des cookies",
      leg_cookies_desc: "Description de l'usage des traceurs et cookies de mesure d'audience.",
      leg_legal: "Mentions légales",
      leg_legal_desc: "Informations réglementaires concernant l'éditeur et l'hébergement."
    },
    en: {
      title: "Multilingual ",
      highlight: "Sitemap",
      subtitle: "Full index of website pages optimized for search engine optimization (SEO) in all supported languages.",
      sec1_title: "Page Matrix by Language (SEO Sitemaps)",
      sec2_title: "Legal & Protection Pages",
      nav_home: "Home",
      nav_calculator: "Calculator",
      nav_guide: "How to calculate?",
      nav_contact: "Contact",
      leg_privacy: "Privacy Policy",
      leg_privacy_desc: "Our commitments to protecting your personal data.",
      leg_cookies: "Cookies Policy",
      leg_cookies_desc: "Description of the use of trackers and audience measurement cookies.",
      leg_legal: "Legal Notice",
      leg_legal_desc: "Regulatory information regarding publisher and hosting."
    },
    de: {
      title: "Mehrsprachige ",
      highlight: "Sitemap",
      subtitle: "Vollständiger Index der Website-Seiten, optimiert für die Suchmaschinenoptimierung (SEO) in allen unterstützten Sprachen.",
      sec1_title: "Seitenmatrix nach Sprache (SEO-Sitemaps)",
      sec2_title: "Rechtliche & Schutzseiten",
      nav_home: "Startseite",
      nav_calculator: "Rechner",
      nav_guide: "Wie berechnen?",
      nav_contact: "Kontakt",
      leg_privacy: "Datenschutzerklärung",
      leg_privacy_desc: "Unsere Verpflichtungen zum Schutz Ihrer persönlichen Daten.",
      leg_cookies: "Cookie-Richtlinie",
      leg_cookies_desc: "Beschreibung der Verwendung von Trackern und Cookies zur Messung der Besucherzahlen.",
      leg_legal: "Rechtliche Hinweise",
      leg_legal_desc: "Regulatorische Informationen bezüglich Herausgeber und Hosting."
    },
    es: {
      title: "Mapa del Sitio ",
      highlight: "Multilingüe",
      subtitle: "Índice completo de las páginas del sitio web optimizado para el posicionamiento en buscadores (SEO) en todos los idiomas admitidos.",
      sec1_title: "Matriz de páginas por idioma (SEO Sitemaps)",
      sec2_title: "Páginas legales y de protección",
      nav_home: "Inicio",
      nav_calculator: "Calculadora",
      nav_guide: "¿Cómo calcular?",
      nav_contact: "Contacto",
      leg_privacy: "Política de privacidad",
      leg_privacy_desc: "Nuestros compromisos para proteger sus datos personales.",
      leg_cookies: "Política de cookies",
      leg_cookies_desc: "Descripción del uso de rastreadores y cookies de medición de audiencia.",
      leg_legal: "Aviso legal",
      leg_legal_desc: "Información reglamentaria sobre editor y hosting."
    },
    it: {
      title: "Mappa del Sito ",
      highlight: "Multilingue",
      subtitle: "Indice completo delle pagine del sito ottimizzato per l'ottimizzazione dei motori di ricerca (SEO) in tutte le lingue supportate.",
      sec1_title: "Matrice delle pagine per lingua (SEO Sitemaps)",
      sec2_title: "Pagine legali e di protezione",
      nav_home: "Home",
      nav_calculator: "Calcolatore",
      nav_guide: "Come calcolare?",
      nav_contact: "Contatti",
      leg_privacy: "Privacy Policy",
      leg_privacy_desc: "I nostri impegni per la protezione dei vostri dati personali.",
      leg_cookies: "Informativa sui Cookie",
      leg_cookies_desc: "Descrizione dell'uso di traccianti e cookie di misurazione dell'audience.",
      leg_legal: "Note Legali",
      leg_legal_desc: "Informazioni normative relative all'editore e all'hosting."
    },
    zh: {
      title: "多语言 ",
      highlight: "网站地图 (Sitemap)",
      subtitle: "全站网页完整索引，面向搜索引擎优化 (SEO) 设计，支持所有语种的快速切换检索。",
      sec1_title: "语种页面矩阵 (SEO Sitemaps 国际路由)",
      sec2_title: "法律、合规与数据安全页面",
      nav_home: "首页",
      nav_calculator: "旅游税计算器",
      nav_guide: "官方计税指南",
      nav_contact: "联系我们 (纠错)",
      leg_privacy: "隐私政策条款",
      leg_privacy_desc: "本站对保护您在计算过程中的绝对数据隐私的承诺。",
      leg_cookies: "Cookie 使用政策",
      leg_cookies_desc: "关于谷歌分析流量追踪器和个性化广告 Cookies 的使用说明。",
      leg_legal: "法律声明与版权条款",
      leg_legal_desc: "关于本站微型出版商实体、全球 CDN 节点服务器托管的合规信息。"
    }
  };

  const curr = translations[language] || translations.fr;

  const languagesList = [
    { code: "fr", name: "Français 🇫🇷", desc: "Version officielle en français" },
    { code: "en", name: "English 🇬🇧", desc: "Official English version" },
    { code: "de", name: "Deutsch 🇩🇪", desc: "Deutsche Version" },
    { code: "es", name: "Español 🇪🇸", desc: "Versión en español" },
    { code: "it", name: "Italiano 🇮🇹", desc: "Versione in italiano" },
    { code: "zh", name: "中文 🇨🇳", desc: "中文版官方页面" },
  ] as const;

  const getCoreRouteName = (key: string) => {
    switch (key) {
      case "nav_home": return curr.nav_home;
      case "nav_calculator": return curr.nav_calculator;
      case "nav_guide": return curr.nav_guide;
      case "nav_contact": return curr.nav_contact;
      default: return "";
    }
  };

  const getTargetRouteName = (key: string, targetLang: string) => {
    const targetDict = translations[targetLang] || translations.fr;
    switch (key) {
      case "nav_home": return targetDict.nav_home;
      case "nav_calculator": return targetDict.nav_calculator;
      case "nav_guide": return targetDict.nav_guide;
      case "nav_contact": return targetDict.nav_contact;
      default: return "";
    }
  };

  const coreRoutes = [
    { nameKey: "nav_home", path: "/" },
    { nameKey: "nav_calculator", path: "/calculateur-taxe-de-sejour" },
    { nameKey: "nav_guide", path: "/comment-calculer-la-taxe-de-sejour" },
    { nameKey: "nav_contact", path: "/contact" }
  ];

  const legalRoutes = [
    { name: curr.leg_privacy, path: "/politique-de-confidentialite", desc: curr.leg_privacy_desc, icon: <ShieldCheck className="h-4 w-4" /> },
    { name: curr.leg_cookies, path: "/politique-des-cookies", desc: curr.leg_cookies_desc, icon: <Cookie className="h-4 w-4" /> },
    { name: curr.leg_legal, path: "/mentions-legales", desc: curr.leg_legal_desc, icon: <Scale className="h-4 w-4" /> }
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
          {curr.title}<span className="text-[#d1121d]">{curr.highlight}</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          {curr.subtitle}
        </p>
      </div>

      {/* Language Section Matrix */}
      <div className="space-y-8" id="sitemap-matrix">
        <div className="border border-black p-6 sm:p-8 bg-white space-y-6">
          <div className="flex items-center gap-2 border-b border-black pb-3">
            <Languages className="h-5 w-5 text-[#d1121d]" />
            <h2 className="text-sm font-black uppercase tracking-wider text-black">{curr.sec1_title}</h2>
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
                <p className="text-xs text-slate-400 font-mono italic font-medium">{langItem.desc}</p>

                <div className="flex flex-col gap-2 pt-2">
                  {coreRoutes.map((route) => (
                    <button
                      key={route.path}
                      onClick={() => handleSitemapClick(route.path, langItem.code as Language)}
                      className="text-left text-xs text-slate-700 hover:text-[#d1121d] font-semibold hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="text-slate-400">›</span>
                      <span>{getTargetRouteName(route.nameKey, langItem.code)}</span>
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
            <h2 className="text-sm font-black uppercase tracking-wider text-black">{curr.sec2_title}</h2>
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
