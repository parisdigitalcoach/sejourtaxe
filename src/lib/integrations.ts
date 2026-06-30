// Dynamic integration loader for Google Analytics, Google Tag Manager, and Google AdSense
// Reads from Vite environment variables dynamically without hardcoded IDs.

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    adsbygoogle?: any[];
  }
}

export function initIntegrations() {
  const metaEnv = (import.meta as any).env || {};
  const isProd = metaEnv.PROD;
  
  // 1. Google Search Console Verification
  const gscId = metaEnv.VITE_GOOGLE_SITE_VERIFICATION;
  if (gscId) {
    let meta = document.querySelector('meta[name="google-site-verification"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'google-site-verification');
      meta.setAttribute('content', gscId);
      document.head.appendChild(meta);
    }
  }

  // 2. Google Tag Manager (GTM)
  const gtmId = metaEnv.VITE_GTM_ID;
  if (gtmId) {
    // Check if GTM script is already added
    const existingScript = document.querySelector(`script[src*="gtm.js?id=${gtmId}"]`);
    if (!existingScript) {
      // Head script
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script);

      // Body noscript iframe
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }

  // 3. Google Analytics (gtag.js)
  const gaId = metaEnv.VITE_GA_MEASUREMENT_ID;
  if (gaId) {
    const existingScript = document.querySelector(`script[src*="id=${gaId}"]`);
    if (!existingScript) {
      // Create global variables
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        page_path: window.location.pathname + window.location.search,
        send_page_view: true
      });

      // Inject script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
    }
  }

  // 4. Google AdSense
  const adsClient = metaEnv.VITE_GOOGLE_ADS_CLIENT;
  if (adsClient) {
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }
}

// Track SPA Page Views for Google Analytics
export function trackPageView(path: string) {
  const metaEnv = (import.meta as any).env || {};
  const gaId = metaEnv.VITE_GA_MEASUREMENT_ID;
  if (gaId && window.gtag) {
    window.gtag('config', gaId, {
      page_path: path
    });
  }
}

// Safely push an AdSense ad unit initialization if AdSense is active
export function pushAdUnit() {
  try {
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  } catch (e) {
    // Silence errors to comply with "not outputting any JS error if disabled or ad block is present"
  }
}
