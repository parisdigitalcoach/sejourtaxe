import React from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { Cookie, Settings, Eye, Clock, RotateCcw, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function CookiesPolicyView() {
  const { openPreferences } = useCookieConsent();
  const { language, t } = useLanguage();

  const translations: Record<string, any> = {
    fr: {
      title: "Politique",
      highlight: "des Cookies",
      subtitle: "Retrouvez toutes les informations sur l'utilisation des traceurs, cookies de mesure d'audience et de publicité sur SejourTaxe.com.",
      sec_intro_title: "Introduction & Transparence",
      sec_intro_desc: "SejourTaxe.com s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés. Cette page vous informe en toute transparence sur notre usage des cookies et vous permet de piloter vos choix à tout moment.",
      sec1_title: "01. Qu'est-ce qu'un cookie ?",
      sec1_desc: "Un cookie est un petit fichier texte, image ou traceur, déposé et stocké sur votre terminal (ordinateur, smartphone, tablette) lorsque vous visitez un site internet. Les cookies permettent au site de vous reconnaître, de mémoriser vos choix ou vos données de navigation pour faciliter vos prochaines visites et de réaliser des analyses d'utilisation.",
      sec2_title: "02. Quels cookies sont utilisés sur le site ?",
      sec2_desc: "Nous classons les cookies utilisés sur SejourTaxe.com en trois grandes catégories distinctes :",
      catA_title: "A. Cookies de fonctionnement strictement nécessaires",
      catA_desc: "Ces cookies sont techniquement obligatoires pour vous fournir le service demandé. Ils mémorisent notamment l'état de votre session sur le calculateur de taxe de séjour, conservent l'historique de vos derniers calculs d'une page à l'autre et enregistrent votre choix en matière de consentement aux traceurs. Ils ne nécessitent pas votre accord préalable.",
      catB_title: "B. Cookies de mesure d'audience (Google Analytics)",
      catB_desc: "Notre site utilise Google Analytics (GA) pour suivre les données de navigation de manière agrégée et anonyme (nombre de visites, durée des sessions, pages vues, communes les plus recherchées, type de navigateurs utilisés). Ces données nous permettent de corriger d'éventuels bugs, d'optimiser nos parcours utilisateurs et d'adapter le contenu.",
      catC_title: "C. Cookies de publicité & marketing (Google Adsense & Google Tag Manager)",
      catC_desc: "Nous utilisons Google AdSense pour intégrer des bannières publicitaires ciblées sur notre site. Ces publicités permettent de financer le développement technique continu, l'hébergement serveur et de maintenir le calculateur gratuit pour tous les utilisateurs. Ces cookies aident Google à adapter les publicités affichées en fonction de vos centres d'intérêt.",
      sec3_title: "Durée de conservation des traceurs",
      sec3_desc: "Conformément aux directives de la CNIL et du RGPD, la durée de vie des cookies déposés sur notre site est strictement encadrée :",
      li1: "Les cookies techniques nécessaires sont conservés le temps de votre session de navigation.",
      li2: "Vos choix de consentement (acceptation ou refus des traceurs) sont conservés pendant une durée de 6 mois, après quoi le bandeau de consentement réapparaîtra automatiquement.",
      li3: "Les cookies analytiques Google Analytics ont une durée de vie maximale de 13 mois.",
      sec4_title: "Modifier mon consentement à tout moment",
      sec4_desc: "Vous pouvez à tout moment reconsidérer vos choix, activer ou désactiver les cookies analytiques et marketing directement depuis notre module de gestion des cookies. L'enregistrement s'effectue instantanément.",
      btn_manage: "Gérer mes préférences cookies",
      note_title: "Note technique",
      note_desc: "Si vous refusez les cookies analytiques ou publicitaires, aucun script Google correspondant n'est téléchargé sur votre navigateur. Vos données de visite restent totalement anonymes et ne font l'objet d'aucun profilage marketing."
    },
    en: {
      title: "Cookies",
      highlight: "Policy",
      subtitle: "Find all the information on the use of trackers, audience measurement cookies, and advertising on SejourTaxe.com.",
      sec_intro_title: "Introduction & Transparency",
      sec_intro_desc: "SejourTaxe.com is committed to ensuring that the collection and processing of your data comply with the General Data Protection Regulation (GDPR). This page informs you with complete transparency about our use of cookies and allows you to manage your choices at any time.",
      sec1_title: "01. What is a cookie?",
      sec1_desc: "A cookie is a small text file, image, or tracker, placed and stored on your terminal (computer, smartphone, tablet) when you visit a website. Cookies allow the site to recognize you, remember your choices or navigation data to facilitate your next visits, and carry out usage analyses.",
      sec2_title: "02. Which cookies are used on the site?",
      sec2_desc: "We classify the cookies used on SejourTaxe.com into three distinct categories:",
      catA_title: "A. Strictly necessary functional cookies",
      catA_desc: "These cookies are technically required to provide you with the requested service. They remember the state of your session on the tourist tax calculator, keep the history of your last calculations, and record your choices regarding tracker consent. They do not require your prior agreement.",
      catB_title: "B. Audience measurement cookies (Google Analytics)",
      catB_desc: "Our site uses Google Analytics (GA) to track navigation data in an aggregated and anonymous manner (number of visits, session duration, page views, most searched municipalities, type of browsers used). This data allows us to fix potential bugs, optimize user journeys, and adapt content.",
      catC_title: "C. Advertising & marketing cookies (Google Adsense & Google Tag Manager)",
      catC_desc: "We use Google AdSense to integrate targeted advertising banners on our site. These advertisements help fund continuous technical development, server hosting, and keep the calculator free for all users. These cookies help Google adapt the ads displayed to your areas of interest.",
      sec3_title: "Tracker retention period",
      sec3_desc: "In accordance with European and national regulations, the lifespan of cookies placed on our site is strictly regulated:",
      li1: "Necessary technical cookies are kept for the duration of your browsing session.",
      li2: "Your consent choices (acceptance or refusal of trackers) are kept for a period of 6 months, after which the consent banner will automatically reappear.",
      li3: "Google Analytics analytical cookies have a maximum lifespan of 13 months.",
      sec4_title: "Modify my consent at any time",
      sec4_desc: "You can reconsider your choices at any time, enable or disable analytical and marketing cookies directly from our cookie management module. The changes take effect instantly.",
      btn_manage: "Manage my cookie preferences",
      note_title: "Technical note",
      note_desc: "If you reject analytical or advertising cookies, no corresponding Google script is downloaded to your browser. Your visit data remains completely anonymous and is not subject to any marketing profiling."
    },
    de: {
      title: "Cookie-",
      highlight: "Richtlinie",
      subtitle: "Hier finden Sie alle Informationen über die Verwendung von Trackern, Cookies zur Messung der Besucherzahlen und Werbung auf SejourTaxe.com.",
      sec_intro_title: "Einführung & Transparenz",
      sec_intro_desc: "SejourTaxe.com verpflichtet sich, dass die Erfassung und Verarbeitung Ihrer Daten der Datenschutz-Grundverordnung (DSGVO) entspricht. Diese Seite informiert Sie transparent über unsere Verwendung von Cookies und ermöglicht es Ihnen, Ihre Auswahl jederzeit zu steuern.",
      sec1_title: "01. Was ist ein Cookie?",
      sec1_desc: "Ein Cookie ist eine kleine Textdatei, ein Bild oder ein Tracker, der beim Besuch einer Website auf Ihrem Endgerät (Computer, Smartphone, Tablet) abgelegt und gespeichert wird. Cookies ermöglichen es der Website, Sie wiederzuerkennen, sich an Ihre Entscheidungen oder Navigationsdaten zu erinnern, um Ihre nächsten Besuche zu erleichtern, und Nutzungsanalysen durchzuführen.",
      sec2_title: "02. Welche Cookies werden auf der Website verwendet?",
      sec2_desc: "Wir teilen die auf SejourTaxe.com verwendeten Cookies in drei verschiedene Kategorien ein:",
      catA_title: "A. Unbedingt erforderliche Funktions-Cookies",
      catA_desc: "Diese Cookies sind technisch zwingend erforderlich, um Ihnen den angeforderten Dienst bereitzustellen. Sie merken sich insbesondere den Status Ihrer Sitzung auf dem Kurtaxen-Rechner, bewahren den Verlauf Ihrer letzten Berechnungen auf und speichern Ihre Auswahl bezüglich der Einwilligung in Tracker. Sie erfordern keine vorherige Zustimmung.",
      catB_title: "B. Cookies zur Messung der Besucherzahlen (Google Analytics)",
      catB_desc: "Unsere Website verwendet Google Analytics (GA), um Navigationsdaten aggregiert und anonym zu verfolgen (Anzahl der Besuche, Sitzungsdauer, Seitenaufrufe, meistgesuchte Gemeinden, Art der verwendeten Browser). Diese Daten ermöglichen es uns, eventuelle Fehler zu beheben, Benutzererfahrungen zu optimieren und Inhalte anzupassen.",
      catC_title: "C. Werbe- & Marketing-Cookies (Google Adsense & Google Tag Manager)",
      catC_desc: "Wir nutzen Google AdSense zur Einbindung zielgerichteter Werbebanner auf unserer Website. Diese Werbeanzeigen dienen der Finanzierung der fortlaufenden technischen Entwicklung sowie des Serverhostings und halten den Rechner für alle Nutzer kostenlos. Diese Cookies helfen Google, die angezeigten Anzeigen an Ihre Interessen anzupassen.",
      sec3_title: "Aufbewahrungsfrist von Trackern",
      sec3_desc: "In Übereinstimmung mit den Richtlinien der DSGVO ist die Lebensdauer von auf unserer Website platzierten Cookies streng geregelt:",
      li1: "Notwendige technische Cookies werden für die Dauer Ihrer Browsersitzung gespeichert.",
      li2: "Ihre Einwilligungsauswahl (Annahme oder Ablehnung von Trackern) wird für einen Zeitraum von 6 Monaten aufbewahrt. Danach erscheint das Einwilligungsbanner automatisch wieder.",
      li3: "Analytische Cookies von Google Analytics haben eine maximale Lebensdauer von 13 Monaten.",
      sec4_title: "Meine Einwilligung jederzeit ändern",
      sec4_desc: "Sie können Ihre Entscheidungen jederzeit überdenken, analytische und Marketing-Cookies direkt über unser Cookie-Verwaltungsmodul aktivieren oder deaktivieren. Die Speicherung erfolgt sofort.",
      btn_manage: "Meine Cookie-Einstellungen verwalten",
      note_title: "Technischer Hinweis",
      note_desc: "Wenn Sie analytische oder Werbe-Cookies ablehnen, wird kein entsprechendes Google-Skript in Ihren Browser heruntergeladen. Ihre Besuchsdaten bleiben völlig anonym und unterliegen keinem Marketing-Profiling."
    },
    es: {
      title: "Política",
      highlight: "de Cookies",
      subtitle: "Encuentre toda la información sobre el uso de rastreadores, cookies de medición de audiencia y publicidad en SejourTaxe.com.",
      sec_intro_title: "Introducción y Transparencia",
      sec_intro_desc: "SejourTaxe.com se compromete a garantizar que la recopilación y el procesamiento de sus datos cumplan con el Reglamento General de Protección de Datos (RGPD). Esta página le informa con total transparencia sobre nuestro uso de cookies y le permite gestionar sus opciones en cualquier momento.",
      sec1_title: "01. ¿Qué es una cookie?",
      sec1_desc: "Una cookie es un pequeño archivo de texto, imagen o rastreador, colocado y almacenado en su terminal (ordenador, smartphone, tableta) cuando visita un sitio web. Las cookies permiten al sitio reconocerlo, recordar sus elecciones o datos de navegación para facilitar sus próximas visitas, y realizar análisis de uso.",
      sec2_title: "02. ¿Qué cookies se utilizan en el sitio?",
      sec2_desc: "Clasificamos las cookies utilizadas en SejourTaxe.com en tres categorías distintas:",
      catA_title: "A. Cookies funcionales estrictamente necesarias",
      catA_desc: "Estas cookies son técnicamente necesarias para proporcionarle el servicio solicitado. Recuerdan el estado de su sesión en la calculadora de tasa de estancia, guardan el historial de sus últimos cálculos de una página a otra y registran su elección en cuanto al consentimiento de los rastreadores. No requieren su consentimiento previo.",
      catB_title: "B. Cookies de medición de audiencia (Google Analytics)",
      catB_desc: "Nuestro sitio utiliza Google Analytics (GA) para rastrear los datos de navegación de forma agregada y anónima (número de visitas, duración de las sesiones, páginas vistas, municipios más buscados, tipo de navegadores utilizados). Estos datos nos permiten corregir posibles errores, optimizar los recorridos de los usuarios y adaptar el contenido.",
      catC_title: "C. Cookies de publicidad y marketing (Google Adsense y Google Tag Manager)",
      catC_desc: "Utilizamos Google AdSense para integrar banners publicitarios dirigidos en nuestro sitio. Estos anuncios permiten financiar el desarrollo técnico continuo, el alojamiento del servidor y mantener la calculadora gratuita para todos los usuarios. Estas cookies ayudan a Google a adaptar los anuncios mostrados a sus áreas de interés.",
      sec3_title: "Periodo de conservación de los rastreadores",
      sec3_desc: "De conformidad con las directivas del RGPD, la vida útil de las cookies depositadas en nuestro sitio está estrictamente regulada:",
      li1: "Las cookies técnicas necesarias se conservan durante la sesión de navegación.",
      li2: "Sus elecciones de consentimiento (aceptación o rechazo de rastreadores) se conservan por un periodo de 6 meses, tras el cual el banner de consentimiento volverá a aparecer automáticamente.",
      li3: "Las cookies analíticas de Google Analytics tienen una vida útil máxima de 13 meses.",
      sec4_title: "Modificar mi consentimiento en cualquier momento",
      sec4_desc: "Puede reconsiderar sus elecciones en cualquier momento, activar o desactivar las cookies analíticas y de marketing directamente desde nuestro módulo de gestión de cookies. El registro se realiza de forma instantánea.",
      btn_manage: "Gestionar mis preferencias de cookies",
      note_title: "Nota técnica",
      note_desc: "Si rechaza las cookies analíticas o publicitarias, no se descargará ningún script de Google correspondiente en su navegador. Sus datos de visita siguen siendo totalmente anónimos y no están sujetos a ningún perfil de marketing."
    },
    it: {
      title: "Informativa",
      highlight: "sui Cookie",
      subtitle: "Trova tutte le informazioni sull'uso dei traccianti, dei cookie di misurazione dell'audience e della pubblicità su SejourTaxe.com.",
      sec_intro_title: "Introduzione e Trasparenza",
      sec_intro_desc: "SejourTaxe.com si impegna a garantire che la raccolta e il trattamento dei dati siano conformi al Regolamento Generale sulla Protezione dei Dati (RGPD). Questa pagina ti informa in modo trasparente sul nostro utilizzo dei cookie e ti consente di gestire le tue scelte in qualsiasi momento.",
      sec1_title: "01. Cos'è un cookie?",
      sec1_desc: "Un cookie è un piccolo file di testo, immagine o tracciante, posizionato e memorizzato sul tuo dispositivo (computer, smartphone, tablet) quando visiti un sito web. I cookie consentono al sito di riconoscerti, ricordare le tue scelte o i dati di navigazione per facilitare le visite successive e condurre analisi sull'uso.",
      sec2_title: "02. Quali cookie sono utilizzati sul sito?",
      sec2_desc: "Classifichiamo i cookie utilizzati su SejourTaxe.com in tre categorie distinte:",
      catA_title: "A. Cookie di funzionamento strettamente necessari",
      catA_desc: "Questi cookie sono tecnicamente necessari per fornirti il servizio richiesto. Ricordano lo stato della sessione sul calcolatore della tassa di soggiorno, conservano la cronologia degli ultimi calcoli da una pagina all'altra e registrano la tua scelta in merito al consenso ai traccianti. Non richiedono il tuo consenso preventivo.",
      catB_title: "B. Cookie di misurazione dell'audience (Google Analytics)",
      catB_desc: "Il nostro sito utilizza Google Analytics (GA) per tracciare i dati di navigazione in modo aggregato e anonimo (numero di visite, durata della sessione, pagine visualizzate, comuni più cercati, tipo di browser utilizzati). Questi dati ci consentono di correggere eventuali bug, ottimizzare l'esperienza d'uso e adattare il contenuto.",
      catC_title: "C. Cookie pubblicitari e di marketing (Google Adsense e Google Tag Manager)",
      catC_desc: "Utilizziamo Google AdSense per integrare banner pubblicitari mirati sul nostro sito. Questi annunci aiutano a finanziare lo sviluppo tecnico continuo, l'hosting del server e a mantenere il calcolatore gratuito per tutti gli utenti. Questi cookie aiutano Google ad adattare gli annunci visualizzati ai tuoi interessi.",
      sec3_title: "Periodo di conservazione dei traccianti",
      sec3_desc: "In conformità con le direttive del RGPD, la durata di vita dei cookie posizionati sul nostro sito è strettamente regolamentata:",
      li1: "I cookie tecnici necessari sono conservati per la durata della sessione di navigazione.",
      li2: "Le scelte di consenso (accettazione o rifiuto dei traccianti) sono conservate per un periodo di 6 mesi, dopodiché il banner del consenso riapparirà automaticamente.",
      li3: "I cookie analitici di Google Analytics hanno una durata di vita massima di 13 mesi.",
      sec4_title: "Modificare il mio consenso in qualsiasi momento",
      sec4_desc: "Puoi riconsiderare le tue scelte in qualsiasi momento, attivare o disattivare i cookie analitici e di marketing direttamente dal nostro modulo di gestione dei cookie. La registrazione avviene istantaneamente.",
      btn_manage: "Gestisci le mie preferenze sui cookie",
      note_title: "Nota tecnica",
      note_desc: "Se rifiuti i cookie analitici o pubblicitari, sul tuo browser non verrà scaricato alcun relativo script Google. I dati della tua visita rimangono completamente anonimi e non sono soggetti ad alcun tipo di profilazione marketing."
    },
    zh: {
      title: "Cookie",
      highlight: "政策与使用规范",
      subtitle: "在本页面，您可以完整查阅 SejourTaxe.com 关于 Cookies 追踪器、谷歌流量统计以及个性化广告推荐的使用说明与细则。",
      sec_intro_title: "导言与高透明度信息披露",
      sec_intro_desc: "SejourTaxe.com 严格遵守欧盟通用数据保护条例 (RGPD/GDPR) 以及法国计算机与自由法案，全力保障您作为网络访问者的核心隐私权益。本页面旨在透明地向您介绍我们在何种场景下、以何种目的装载 Cookies，并且赋予您随时自主控制和修改授权的权利。",
      sec1_title: "01. 什么是 Cookies ？",
      sec1_desc: "Cookie 是在您访问因特网网站时，由该站点服务器发送并安全存储在您的终端设备（电脑、智能手机、平板电脑）中的一种微型文本、图片或标识符文件。Cookies 能帮助网站识别您的浏览器、记忆您的语言或计算偏好、免除重复输入的繁杂，并匿名统计页面被访问的次数与健康度。",
      sec2_title: "02. 本网站使用了哪些类别的 Cookies ？",
      sec2_desc: "SejourTaxe.com 上的所有 Cookies 均严格划分为以下三大核心功能类别：",
      catA_title: "A. 核心级功能型必要 Cookies",
      catA_desc: "此类 Cookies 是维持本站最基础计税功能在技术上不可或缺的。例如，它们用于在您从一个页面切换到另一个页面时保持您在计算器里输入的数值和状态，此外它们也会记录您在 Cookie 授权横幅上所作出的自主选择（即记住您的同意或拒绝记录）。根据法律，此类核心 Cookies 默认启用且无需征得您的预先授权。",
      catB_title: "B. 统计与访问量分析 Cookies (基于 Google Analytics)",
      catB_desc: "本站接入了谷歌分析 (Google Analytics)。它以高度脱敏、不可逆且完全去中心化聚类的方式，记录访客的浏览行为（如总访问人数、每次停留时长、受访频次最多的城市等）。这些数据纯粹作为改进系统算法、排查报错故障、以及不断迭代网站计算体验的技术依据。",
      catC_title: "C. 个性化广告与营销 Cookies (基于 Google Adsense 及 Google Tag Manager)",
      catC_desc: "我们集成了谷歌广告 (Google AdSense) 来部署展示横幅广告。广告收益是我们支持本计算器日常托管服务费、技术维护以及维持免费开放的唯一资金来源。谷歌系统将使用此类 Cookies 分析并向您展现符合您潜在兴趣的高质量广告，有效过滤劣质或不相关的推广垃圾信息。",
      sec3_title: "Cookies 追踪器的法定保存有效期",
      sec3_desc: "依据法国 CNIL 以及欧盟 GDPR 指南规定，本站下发的 Cookies 拥有严苛的有效期控制：",
      li1: "核心运行必要的技术类 Cookies 在您关闭浏览器会话时即宣告销毁并自动清除。",
      li2: "您作出的授权决定（同意或拒绝接受 Cookies）将在您的本地保存 6 个月。6个月期满后，系统横幅会自动重新弹出，以保障您随时可更新决定。",
      li3: "Google Analytics 流量统计类 Cookies 在您本地的最长驻留时间不会超过 13 个月。",
      sec4_title: "随时自主修改或撤销我的授权决定",
      sec4_desc: "无论您先前作出了何种决定，您都可以随时通过点击下方的“管理我的 preferences”按钮，调出选择面板，勾选或取消勾选统计、广告类 Cookies。您的新设置会瞬间在浏览器本地保存并立即生效。",
      btn_manage: "个性化管理我的 Cookie 偏好设置",
      note_title: "核心技术申明",
      note_desc: "如果您在横幅或弹窗中点击了“全部拒绝”或关闭了对应选项，本网站绝对不会向您的浏览器下载和加载任何 Google Analytics 或广告推荐代码。您的访问信息将完全不包含任何市场营销痕迹。"
    }
  };

  const curr = translations[language] || translations.fr;

  return (
    <div className="max-w-3xl mx-auto space-y-12" id="cookies-policy-container">
      {/* Page Header */}
      <div className="py-8 border-b border-black/10" id="cookies-policy-header">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          {curr.title} <span className="text-[#d1121d]">{curr.highlight}</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          {curr.subtitle}
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
            <h2 className="text-base font-black text-black uppercase tracking-wider">{curr.sec_intro_title}</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {curr.sec_intro_desc}
          </p>
        </div>

        <hr className="border-black/10" />

        {/* 1. What is a cookie? */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-[#d1121d]">01.</span> {curr.sec1_title.replace("01.", "").trim()}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {curr.sec1_desc}
          </p>
        </div>

        {/* 2. What cookies are used? */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-[#d1121d]">02.</span> {curr.sec2_title.replace("02.", "").trim()}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {curr.sec2_desc}
          </p>

          <div className="space-y-4 mt-4">
            {/* Category A: Necessary */}
            <div className="border-l-2 border-black pl-4 py-1 space-y-1">
              <h4 className="text-xs font-black uppercase text-black">{curr.catA_title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {curr.catA_desc}
              </p>
            </div>

            {/* Category B: Google Analytics */}
            <div className="border-l-2 border-[#d1121d] pl-4 py-1 space-y-1">
              <h4 className="text-xs font-black uppercase text-black">{curr.catB_title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {curr.catB_desc}
              </p>
            </div>

            {/* Category C: Google Adsense & GTM */}
            <div className="border-l-2 border-[#d1121d] pl-4 py-1 space-y-1">
              <h4 className="text-xs font-black uppercase text-black">{curr.catC_title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {curr.catC_desc}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Retention period */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-black uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-[#d1121d]" />
            <span>{curr.sec3_title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {curr.sec3_desc}
          </p>
          <ul className="list-disc pl-5 text-xs text-slate-500 space-y-2 mt-2 leading-relaxed font-medium">
            <li>{curr.li1}</li>
            <li>{curr.li2}</li>
            <li>{curr.li3}</li>
          </ul>
        </div>

        <hr className="border-black/10" />

        {/* 4. How to modify consent */}
        <div className="bg-slate-50 border border-black/15 p-6 space-y-4" id="manage-consent-panel">
          <div className="flex items-center gap-2 text-black">
            <Settings className="h-5 w-5 text-[#d1121d]" />
            <h3 className="text-xs font-black uppercase tracking-widest">{curr.sec4_title}</h3>
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {curr.sec4_desc}
          </p>

          <div className="pt-2">
            <button
              onClick={openPreferences}
              className="bg-black hover:bg-[#d1121d] text-white text-xs uppercase tracking-widest font-extrabold py-3.5 px-6 transition-all cursor-pointer inline-flex items-center gap-2 border border-transparent"
              id="btn-trigger-cookies-modal"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{curr.btn_manage}</span>
            </button>
          </div>
        </div>

        {/* Google Script loading notice */}
        <div className="flex gap-2 text-[11px] text-slate-400 bg-slate-50/50 p-4 border border-dashed border-black/10">
          <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            <strong>{curr.note_title}</strong> : {curr.note_desc}
          </p>
        </div>

      </div>
    </div>
  );
}
