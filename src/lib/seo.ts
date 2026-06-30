// Premium dynamic SEO management system for SejourTaxe
// Dynamically builds and injects OpenGraph, Twitter Cards, and JSON-LD Structured Data

export function updateSEO(currentPath: string) {
  const metaEnv = (import.meta as any).env || {};
  const siteName = metaEnv.VITE_SITE_NAME || "SejourTaxe";
  const siteUrl = metaEnv.VITE_SITE_URL || "https://sejourtaxe.com";
  
  const fullUrl = `${siteUrl}${currentPath}`;
  
  let title = "Calculateur taxe de séjour France | SejourTaxe";
  let description = "Calculez rapidement et simplement la taxe de séjour en France pour les locations de vacances, hôtels, gîtes ou chambres d'hôtes. Conforme 2026.";
  let pageName = "Accueil";

  switch (currentPath) {
    case "/":
      title = "Calculateur taxe de séjour France | SejourTaxe";
      description = "Calculez rapidement et simplement la taxe de séjour pour vos locations de vacances, hôtels, gîtes ou chambres d'hôtes. Conforme 2026.";
      pageName = "Accueil";
      break;
    case "/calculateur-taxe-de-sejour":
      title = "Calculateur taxe de séjour en ligne gratuit | SejourTaxe";
      description = "Simulateur gratuit de la taxe de séjour française. Gère les catégories classées (étoiles), non classées (proportionnel), les plafonds et taxes additionnelles.";
      pageName = "Simulateur de calcul";
      break;
    case "/comment-calculer-la-taxe-de-sejour":
      title = "Comment calculer la taxe de séjour en France | SejourTaxe";
      description = "Guide officiel d'explication des formules de la taxe de séjour : tarif fixe, pourcentage proportionnel, taxe départementale de 10% et Île-de-France.";
      pageName = "Guide fiscal";
      break;
    case "/politique-de-confidentialite":
      title = "Politique de confidentialité | SejourTaxe";
      description = "Découvrez notre politique de confidentialité. Toutes les estimations sont réalisées localement dans le navigateur pour garantir l'anonymat absolu.";
      pageName = "Confidentialité";
      break;
    case "/mentions-legales":
      title = "Mentions légales | SejourTaxe";
      description = "Consultez les mentions légales du site SejourTaxe, l'éditeur de l'outil et les détails de l'hébergement du calculateur.";
      pageName = "Mentions légales";
      break;
    case "/contact":
      title = "Contactez-nous | SejourTaxe";
      description = "Une question sur le calcul ou un nouveau tarif à nous signaler ? Contactez notre équipe d'édition SejourTaxe.";
      pageName = "Contact";
      break;
  }

  // 1. Update document Title and Description meta tags
  document.title = title;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

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
