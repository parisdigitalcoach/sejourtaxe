// Premium dynamic SEO management system for SejourTaxe
// Dynamically builds and injects OpenGraph, Twitter Cards, and JSON-LD Structured Data

export function updateSEO(currentPath: string) {
  const metaEnv = (import.meta as any).env || {};
  const siteName = metaEnv.VITE_SITE_NAME || "SejourTaxe";
  const siteUrl = metaEnv.VITE_SITE_URL || "https://sejourtaxe.com";
  
  const fullUrl = `${siteUrl}${currentPath}`;
  
  // Extract language from URL query or localStorage
  const params = new URLSearchParams(window.location.search);
  const langInput = params.get("lang") || "";
  let lang: "fr" | "en" | "de" | "es" | "it" | "zh" = "fr";
  if (["fr", "en", "de", "es", "it", "zh"].includes(langInput)) {
    lang = langInput as any;
  } else {
    try {
      const stored = localStorage.getItem("app_lang") || "fr";
      if (["fr", "en", "de", "es", "it", "zh"].includes(stored)) {
        lang = stored as any;
      }
    } catch (e) {}
  }

  // Set default fallback values
  let title = "SejourTaxe Professional French Tourist Tax Calculator | Immobilier & Tourisme";
  let description = "Calculez et simulez la taxe de séjour en France (2026) pour vos projets d'investissement immobilier, achat de maison, gestion locative, meublés et gîtes de vacances.";
  let keywords = "taxe de sejour, calculateur taxe de sejour, simulation taxe de sejour, taxe sejour france, meuble de tourisme, investissement immobilier, achat maison, gestion locative, estimation immobiliere";
  let pageName = "Accueil";

  const seoData: Record<string, Record<"fr" | "en" | "de" | "es" | "it" | "zh", { title: string; description: string; keywords: string; pageName: string }>> = {
    "/": {
      fr: {
        title: "Calculateur taxe de séjour France 2026 | Immobilier, Achat Maison & Tourisme",
        description: "Simulateur professionnel gratuit de taxe de séjour en France. Idéal pour investisseur locatif, achat de maison, gestion locative et estimation immobilière de gîtes ou meublés.",
        keywords: "taxe de sejour, simulateur taxe de sejour, investissement immobilier locatif, achat maison, vente immobiliere, estimation immobiliere, gestion locative, rendement locatif, location saisonniere",
        pageName: "Accueil"
      },
      en: {
        title: "French Tourist Tax Calculator 2026 | Real Estate Investment & Property Sales",
        description: "Free online French tourist tax simulator. Calculate rates for holiday rentals and optimize your real estate investment, rental yield, and property management performance.",
        keywords: "french tourist tax, tourist tax calculator, real estate investment France, buy house France, property sales, rental yield, property valuation, seasonal rentals",
        pageName: "Home"
      },
      de: {
        title: "Touristensteuer Frankreich Rechner 2026 | Ortstaxe Simulator",
        description: "Berechnen Sie die französische Ortstaxe (taxe de séjour) für Ferienwohnungen, Hotels und Gästezimmer. Kostenloser Online-Rechner für 2026.",
        keywords: "Touristensteuer Frankreich, Ortstaxe Rechner, Taxe de sejour Frankreich, Ferienhaus Steuer Frankreich, Hotelsteuer Frankreich, Kurtaxe berechnen",
        pageName: "Startseite"
      },
      es: {
        title: "Calculadora de Tasa de Estancia Francia 2026 | Simulador Gratis",
        description: "Calcule la tasa de estancia (taxe de séjour) en Francia para alquileres vacacionales, hoteles y casas rurales. Simulador online gratuito para 2026.",
        keywords: "tasa de estancia Francia, calculadora tasa de estancia, impuesto turistico Francia, taxe de sejour simulador, tasa turistica hoteles, tasa alquiler vacacional",
        pageName: "Inicio"
      },
      it: {
        title: "Calcolatore Tassa di Soggiorno Francia 2026 | Simulatore Gratis",
        description: "Calcola la tassa di soggiorno francese (taxe de séjour) per affitti turistici, hotel e alloggi vacanze. Simulatore online gratuito aggiornato al 2026.",
        keywords: "tassa di soggiorno Francia, calcolo tassa soggiorno, imposta di soggiorno Francia, simulatore tassa soggiorno, tassa turistica alloggi, tassa soggiorno gite",
        pageName: "Home"
      },
      zh: {
        title: "2026法国旅游税计算器 | 在线免费智能模拟器 SejourTaxe",
        description: "免费在线计算法国旅游税（Taxe de séjour）。支持度假屋（meublé de tourisme）、酒店、别墅及民宿，完全符合法国2026年最新官方财税标准。",
        keywords: "法国旅游税, 旅游税计算器, 法国民宿税费, 巴黎旅游税计算, 酒店附加税, 旅游税在线计算, Taxe de séjour, 房东代收旅游税",
        pageName: "首页"
      }
    },
    "/calculateur-taxe-de-sejour": {
      fr: {
        title: "Simulateur taxe de séjour en ligne gratuit | Barèmes 2026",
        description: "Simulateur interactif pour calculer la taxe de séjour de votre commune. Gère les catégories classées, non classées, les plafonds légaux et taxes additionnelles.",
        keywords: "simulateur taxe de sejour, calcul taxe de sejour commune, taxe de sejour paris, taxe de sejour marseille, taxe de sejour proportionnelle, taux taxe sejour",
        pageName: "Simulateur de calcul"
      },
      en: {
        title: "Free France Tourist Tax Simulator | 2026 Rates",
        description: "Interactive simulator to calculate French tourist tax for any municipality. Handles star ratings, unclassified percentage rates, caps, and regional transit taxes.",
        keywords: "france tourist tax simulator, calculate tourist tax, city tax calculator france, tourist tax paris, proportional tourist tax, hotel tax rates, stay tax calculator",
        pageName: "Tax Simulator"
      },
      de: {
        title: "Kostenloser Ortstaxe Simulator Frankreich | Tarife 2026",
        description: "Interaktiver Simulator zur Berechnung der französischen Ortstaxe für alle Gemeinden. Berücksichtigt Sterneklassifizierungen, prozentuale Sätze und Obergrenzen.",
        keywords: "Ortstaxe Simulator, Kurtaxe berechnen Frankreich, Steuerrechner Ferienunterkunft, Taxe de sejour berechnen, Gemeindesteuer Frankreich, Kurtaxe Tarife 2026",
        pageName: "Rechner"
      },
      es: {
        title: "Simulador de Tasa de Estancia en Francia | Tarifas 2026",
        description: "Simulador interactivo para calcular la tasa turística de cualquier municipio francés. Admite clasificaciones de estrellas, porcentajes proporcionales y topes legales.",
        keywords: "simulador tasa de estancia, calcular tasa turistica Francia, impuesto de estancia paris, simulador impuesto turistico, tasa turistica de alojamiento",
        pageName: "Calculadora"
      },
      it: {
        title: "Simulatore Tassa di Soggiorno Francia | Tariffe 2026",
        description: "Simulatore interattivo per calcolare l'imposta di soggiorno in qualsiasi comune francese. Gestisce classificazione a stelle, percentuali proporzionali e tetti massimi.",
        keywords: "simulatore tassa soggiorno, calcolo imposta soggiorno Francia, tassa di soggiorno parigi, calcolatore tassa turistica, tassa soggiorno appartamenti",
        pageName: "Calcolatore"
      },
      zh: {
        title: "法国旅游税智能在线模拟器 | 35000+城市标准 2026",
        description: "支持法国35,000多个城市与邮编。智能识别已评星级、未评星级比例税率，自动计算省、大区及交通附加税，支持PDF导出证明。",
        keywords: "法国旅游税模拟器, 旅游税计算公式, 巴黎旅游税标准, 法国民宿税率计算, 旅游税最高限额, 在线房租算税, 法国35000城市算税",
        pageName: "模拟计算器"
      }
    },
    "/comment-calculer-la-taxe-de-sejour": {
      fr: {
        title: "Comment calculer la taxe de séjour en France | SejourTaxe",
        description: "Guide officiel d'explication des formules de la taxe de séjour : tarif fixe, pourcentage proportionnel, taxe départementale de 10% et Île-de-France.",
        keywords: "comment calculer taxe sejour, formule de calcul taxe de sejour, exoneration mineurs taxe sejour, taxe additionnelle departementale, calcul meuble non classe",
        pageName: "Guide fiscal"
      },
      en: {
        title: "How to Calculate French Tourist Tax | 2026 Formula Guide",
        description: "Official guide explaining tourist tax formulas: fixed rate, proportional percentage, 10% departmental tax, and 200% Greater Paris public transit tax.",
        keywords: "how to calculate french tourist tax, tourist tax formula, minor exemption stay tax, additional departmental tax, unclassified calculation method",
        pageName: "Tax Guide"
      },
      de: {
        title: "Berechnung der Ortstaxe in Frankreich | Formelanleitung 2026",
        description: "Offizieller Leitfaden zur Erläuterung der Ortstaxe-Formeln: Festtarif, prozentualer Satz, 10% Departements-Zusatzsteuer und 200% Transportsteuer.",
        keywords: "Ortstaxe berechnen Frankreich, Kurtaxe Berechnungsformel, Befreiung Kinder Kurtaxe, Departement Steuer Frankreich, Berechnung unklassifizierte",
        pageName: "Steuer-Leitfaden"
      },
      es: {
        title: "Cómo calcular la Tasa de Estancia en Francia | Fórmulas 2026",
        description: "Guía oficial que explica las fórmulas de cálculo: tarifa fija, porcentaje proporcional, 10% de impuesto departamental y tasa de transporte de París.",
        keywords: "como calcular tasa de estancia, formula impuesto turistico, exencion menores tasa estancia, impuesto departamental Francia, calculo proporcional alojamiento",
        pageName: "Guía de cálculo"
      },
      it: {
        title: "Come Calcolare la Tassa di Soggiorno in Francia | Formule 2026",
        description: "Guida ufficiale che spiega le formule della tassa di soggiorno: tariffa fissa, percentuale proporzionale, tassa provinciale del 10% e trasporti Parigi.",
        keywords: "come si calcola tassa soggiorno, formula tassa soggiorno Francia, esenzione minori tassa soggiorno, imposta provinciale addizionale",
        pageName: "Guida fiscale"
      },
      zh: {
        title: "法国旅游税如何计算 | 2026官方财税公式说明与解析",
        description: "官方级计税指南：详解固定税率、比例百分比、10%省附加税、15%大区附加税以及200%大巴黎公共交通附加税的层级相加逻辑与计算公式。",
        keywords: "法国旅游税怎么算, 旅游税计算公式, 10%省附加税, 大巴黎交通税200%, 比例税计算方法, 未评星级税费公式",
        pageName: "算税指南"
      }
    },
    "/politique-de-confidentialite": {
      fr: {
        title: "Politique de confidentialité | SejourTaxe",
        description: "Découvrez notre politique de confidentialité. Toutes les estimations sont réalisées localement dans le navigateur pour garantir l'anonymat absolu.",
        keywords: "politique de confidentialite, sejourtaxe confidentialite, securite donnees, calculateur RGPD",
        pageName: "Confidentialité"
      },
      en: {
        title: "Privacy Policy | SejourTaxe",
        description: "Discover our privacy policy. All estimates are done locally in the browser to guarantee absolute anonymity and GDPR compliance.",
        keywords: "privacy policy, sejourtaxe privacy, data security, gdpr compliant calculator",
        pageName: "Privacy"
      },
      de: {
        title: "Datenschutzerklärung | SejourTaxe",
        description: "Datenschutzerklärung für SejourTaxe. Alle Berechnungen werden lokal im Browser durchgeführt, um absolute Anonymität zu gewährleisten.",
        keywords: "datenschutzerklaerung, sejourtaxe datenschutz, dsgvo steuerrechner, datensicherheit",
        pageName: "Datenschutz"
      },
      es: {
        title: "Política de privacidad | SejourTaxe",
        description: "Consulte nuestra política de privacidad. Todas las simulaciones se realizan localmente para garantizar el absoluto anonimato.",
        keywords: "politica de privacidad, proteccion de datos, sejourtaxe privacidad, simulador RGPD",
        pageName: "Privacidad"
      },
      it: {
        title: "Informativa sulla Privacy | SejourTaxe",
        description: "Informativa sulla privacy di SejourTaxe. Tutte le stime sono eseguite localmente nel browser per garantire l'assoluto anonimato.",
        keywords: "privacy policy, informativa privacy, sicurezza dati, calcolatore gdpr",
        pageName: "Privacy"
      },
      zh: {
        title: "隐私政策与数据安全合规声明 | SejourTaxe",
        description: "我们高度重视您的隐私。所有的旅游税模拟计算均完全在您的本地浏览器中运行，绝对不收集、不上报任何房租或出行人数数据。",
        keywords: "隐私政策, 数据安全, 隐私保护合规, 本地计算无缓存",
        pageName: "隐私政策"
      }
    },
    "/mentions-legales": {
      fr: {
        title: "Mentions légales | SejourTaxe",
        description: "Consultez les mentions légales du site SejourTaxe, l'éditeur de l'outil et les détails de l'hébergement du calculateur.",
        keywords: "mentions legales, editeur sejourtaxe, hebergement sejourtaxe, propriete intellectuelle",
        pageName: "Mentions légales"
      },
      en: {
        title: "Legal Notice | SejourTaxe",
        description: "Read the legal notice of SejourTaxe, publisher info, and hosting details of the tourist tax calculator.",
        keywords: "legal notice, publisher details, hosting sejourtaxe, intellectual property",
        pageName: "Legal Notice"
      },
      de: {
        title: "Impressum | SejourTaxe",
        description: "Konsultieren Sie das Impressum der SejourTaxe-Website, Angaben zum Herausgeber und Details zum Hosting des Rechners.",
        keywords: "impressum, herausgeber details, hosting sejourtaxe, urheberrecht",
        pageName: "Impressum"
      },
      es: {
        title: "Aviso legal | SejourTaxe",
        description: "Consulte el aviso legal de la web SejourTaxe, el editor de la herramienta y los detalles del alojamiento del simulador.",
        keywords: "aviso legal, editor sejourtaxe, alojamiento web, propiedad intelectual",
        pageName: "Aviso legal"
      },
      it: {
        title: "Note Legali | SejourTaxe",
        description: "Consulta le note legali del sito SejourTaxe, l'editore dello strumento e i dettagli sull'hosting del calcolatore.",
        keywords: "note legali, editore sejourtaxe, hosting calcolatore, proprieta intellettuale",
        pageName: "Note legali"
      },
      zh: {
        title: "法律条款与版权声明 | SejourTaxe",
        description: "查看SejourTaxe网站的法律声明、出版商信息、托管服务商详情以及智慧财产权和知识产权使用规范。",
        keywords: "法律声明, 版权声明, 网站运营细节, 法律免责",
        pageName: "法律条款"
      }
    },
    "/contact": {
      fr: {
        title: "Contactez-nous | SejourTaxe",
        description: "Une question sur le calcul ou un nouveau tarif à nous signaler ? Contactez notre équipe d'édition SejourTaxe.",
        keywords: "contact sejourtaxe, signaler tarif taxe sejour, question taxe de sejour, support calculateur",
        pageName: "Contact"
      },
      en: {
        title: "Contact Us | SejourTaxe Team",
        description: "Any questions about calculations or a new rate to report? Get in touch with our SejourTaxe editing team.",
        keywords: "contact team, report tax rate france, support calculator, tourist tax assistance",
        pageName: "Contact"
      },
      de: {
        title: "Kontaktieren Sie uns | SejourTaxe",
        description: "Haben Sie Fragen zur Berechnung oder möchten Sie einen neuen Tarif melden? Kontaktieren Sie unser SejourTaxe-Redaktionsteam.",
        keywords: "kontakt sejourtaxe, feedback rechner, neuen tarif melden, support kurtaxe",
        pageName: "Kontakt"
      },
      es: {
        title: "Contacto | SejourTaxe",
        description: "¿Tiene alguna duda sobre el cálculo o quiere informar de una nueva tarifa? Contacte con nuestro equipo.",
        keywords: "contacto sejourtaxe, reportar tarifas locales, ayuda calculadora, soporte tecnico",
        pageName: "Contacto"
      },
      it: {
        title: "Contattaci | Team SejourTaxe",
        description: "Hai domande sui calcoli o vuoi segnalare una nuova tariffa comunale? Contatta il team di SejourTaxe.",
        keywords: "contatti sejourtaxe, segnala tariffa comune, assistenza calcolatore, supporto imposte",
        pageName: "Contatti"
      },
      zh: {
        title: "联系我们 | 旅游税计算器反馈通道",
        description: "对计税结果有任何疑问，或发现您所在城市的某项税率变动需要我们更新？欢迎随时与我们团队联系。",
        keywords: "联系我们, 反馈机制, 报告税率更新, 旅游税计算器支持",
        pageName: "联系我们"
      }
    }
  };

  // Find SEO config for current route
  const resolvedRoute = seoData[currentPath] || seoData["/"];
  const currentSeo = resolvedRoute[lang] || resolvedRoute["fr"];

  title = currentSeo.title;
  description = currentSeo.description;
  keywords = currentSeo.keywords;
  pageName = currentSeo.pageName;

  // 1. Update document Title, Description and Keywords
  document.title = title;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', keywords);

  // 2. OpenGraph Meta Tags
  const ogTags = {
    'og:title': title,
    'og:description': description,
    'og:url': fullUrl,
    'og:type': 'website',
    'og:site_name': siteName,
    'og:image': `${siteUrl}/icons/icon.svg`
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // 3. Twitter Card Meta Tags
  const twitterTags = {
    'twitter:card': 'summary',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': `${siteUrl}/icons/icon.svg`
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });

  // 4. Canonical Link Tag
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // 5. Inject/Update JSON-LD Schemas in <head>
  const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
  existingSchemas.forEach(el => el.remove());

  const schemas: any[] = [];

  // Schema A: WebSite Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": siteUrl,
    "description": "Calculateur universel de la taxe de séjour en France"
  });

  // Schema B: SoftwareApplication Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${siteName} Tax Calculator`,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  });

  // Schema C: BreadcrumbList Schema
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": siteUrl
      }
    ]
  };

  if (currentPath !== "/") {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageName,
      "item": fullUrl
    });
  }
  schemas.push(breadcrumbList);

  // Schema D: FAQ Schema (Only on relevant views)
  if (currentPath === "/" || currentPath === "/comment-calculer-la-taxe-de-sejour" || currentPath === "/calculateur-taxe-de-sejour") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qui est exonéré de la taxe de séjour en France ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Conformément à la législation française, les personnes mineures (moins de 18 ans), les saisonniers employés dans la commune, les bénéficiaires d'hébergement d'urgence et les locataires de loyers inférieurs à un seuil défini sont totalement exonérés de la taxe de séjour."
          }
        },
        {
          "@type": "Question",
          "name": "Comment se calcule la taxe de séjour pour un meublé non classé ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le calcul s'effectue en appliquant un pourcentage (de 1% à 5% voté par la commune) au coût HT par nuit de la nuitée de séjour par personne, dans la limite du plafond légal de la collectivité."
          }
        },
        {
          "@type": "Question",
          "name": "Qu'est-ce que la taxe additionnelle de 200% en Île-de-France ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il s'agit d'une taxe additionnelle régionale et transport instituée pour financer le réseau de transports en commun du Grand Paris (IDFM) qui s'ajoute à hauteur de 200% au tarif de base communal."
          }
        },
        {
          "@type": "Question",
          "name": "Quel est l'impact de la taxe de séjour sur l'investissement immobilier locatif ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pour un investisseur locatif, l'achat d'une maison ou d'un appartement destiné au tourisme et à la location saisonnière exige d'anticiper la taxe de séjour. Elle influe directement sur le rendement locatif net et la gestion locative globale du bien. Lors d'une estimation immobilière d'un projet d'achat ou d'une vente immobilière, il faut intégrer ces taux communaux pour optimiser la rentabilité."
          }
        },
        {
          "@type": "Question",
          "name": "Comment la taxe de séjour est-elle gérée dans l'estimation immobilière ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La gestion locative professionnelle de meublés de tourisme inclut la déclaration des taxes locales. En cas de vente immobilière d'un bien de rendement, l'historique de la taxe de séjour sert de justificatif de performance touristique, ce qui valorise l'estimation immobilière auprès d'une agence."
          }
        }
      ]
    });
  }

  // Inject Schemas into Head
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
