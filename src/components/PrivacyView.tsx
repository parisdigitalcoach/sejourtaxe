import { ShieldCheck, EyeOff } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function PrivacyView() {
  const { language } = useLanguage();

  const translations: Record<string, any> = {
    fr: {
      title: "Confidentialité",
      updated: "Dernière mise à jour : 30 juin 2026",
      p1: "Chez SejourTaxe.com, la protection de vos données personnelles est notre priorité absolue. En accord avec le Règlement Général sur la Protection des Données (RGPD), cette page vous présente de façon claire notre politique de gestion des données.",
      box_title: "Calculs 100% anonymes et en local",
      box_desc: "Toutes les opérations mathématiques effectuées sur notre calculateur de taxe de séjour sont réalisées directement dans votre navigateur web. Aucune coordonnée financière, montant de loyer, nombre de voyageurs ou nom de ville n'est transmis à nos serveurs ou enregistré dans une base de données.",
      sec1_title: "1. Collecte des données",
      sec1_desc1: "Notre site web est conçu pour fonctionner sans inscription, sans compte utilisateur et sans formulaire d'identification. Nous ne collectons aucune information nominative (telle que votre nom, adresse e-mail ou numéro de téléphone) lors de votre utilisation du calculateur.",
      sec1_desc2: "Si vous utilisez notre formulaire de contact, votre adresse e-mail et votre message seront uniquement exploités pour vous répondre et ne seront jamais partagés à des tiers à des fins publicitaires.",
      sec2_title: "2. Cookies et Google AdSense",
      sec2_desc1: "Nous utilisons la solution publicitaire Google AdSense pour financer le maintien et l'accessibilité gratuite de notre outil en ligne. À ce titre, Google et ses partenaires utilisent des cookies tiers pour diffuser des annonces publicitaires ciblées basées sur vos visites antérieures sur notre site ou sur d'autres sites internet.",
      sec2_desc2: "Vous pouvez à tout moment choisir de désactiver la publicité personnalisée dans les paramètres de votre compte Google, ou configurer votre navigateur internet pour rejeter l'installation des cookies tiers.",
      sec3_title: "3. Liens externes",
      sec3_desc: "Notre site propose des liens d'informations redirigeant vers les portails officiels de l'administration publique française (impots.gouv.fr). Nous ne sommes pas responsables du contenu ou des règles de confidentialité pratiquées par ces sites tiers officiels.",
      sec4_title: "4. Contact et réclamation",
      sec4_desc: "Pour toute question relative à l'utilisation du site SejourTaxe.com ou pour exercer vos droits sur les informations envoyées par e-mail, vous pouvez contacter notre responsable de publication à l'adresse fournie sur notre page de contact."
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: June 30, 2026",
      p1: "At SejourTaxe.com, protecting your personal data is our absolute priority. In accordance with the General Data Protection Regulation (GDPR), this page explains our data management policy in a clear and simple manner.",
      box_title: "100% anonymous and local calculations",
      box_desc: "All mathematical operations on our tourist tax calculator are performed directly within your web browser. No financial details, rent amounts, guest counts, or municipality names are transmitted to our servers or stored in any database.",
      sec1_title: "1. Data Collection",
      sec1_desc1: "Our website is designed to operate without registration, user accounts, or login forms. We do not collect any personally identifiable information (such as your name, email, or phone number) during your use of the calculator.",
      sec1_desc2: "If you use our contact form, your email address and message will only be used to reply to your inquiry and will never be shared with third parties for marketing purposes.",
      sec2_title: "2. Cookies and Google AdSense",
      sec2_desc1: "We use Google AdSense advertising to fund the hosting and free public availability of our online tools. In this context, Google and its partners use third-party cookies to serve targeted advertisements based on your previous visits to this or other websites.",
      sec2_desc2: "You can choose to disable personalized advertising at any time through your Google Account settings, or configure your web browser to block the installation of third-party cookies.",
      sec3_title: "3. External Links",
      sec3_desc: "Our website provides informational links to official French public administration portals (impots.gouv.fr). We are not responsible for the content or privacy policies of those official third-party sites.",
      sec4_title: "4. Contact and Inquiries",
      sec4_desc: "For any questions regarding the use of SejourTaxe.com, or to exercise your rights concerning messages sent via email, you may contact our publisher using the details provided on our Contact page."
    },
    de: {
      title: "Datenschutz",
      updated: "Zuletzt aktualisiert: 30. Juni 2026",
      p1: "Bei SejourTaxe.com hat der Schutz Ihrer persönlichen Daten oberste Priorität. In Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO) stellt Ihnen diese Seite unsere Richtlinien zur Datenverwaltung klar dar.",
      box_title: "100% anonyme und lokale Berechnungen",
      box_desc: "Alle Berechnungen auf unserem Kurtaxen-Rechner werden direkt in Ihrem Webbrowser durchgeführt. Es werden keine Finanzdaten, Mietbeträge, Gästezahlen oder Gemeindenamen an unsere Server übermittelt oder in einer Datenbank gespeichert.",
      sec1_title: "1. Datenerhebung",
      sec1_desc1: "Unsere Website ist so konzipiert, dass sie ohne Registrierung, Benutzerkonto oder Identifikationsformular funktioniert. Wir erfassen bei der Nutzung des Rechners keine personenbezogenen Daten (wie Name, E-Mail-Adresse oder Telefonnummer).",
      sec1_desc2: "Wenn Sie unser Kontaktformular nutzen, werden Ihre E-Mail-Adresse und Ihre Nachricht ausschließlich zur Beantwortung Ihrer Anfrage verwendet und niemals zu Werbezwecken an Dritte weitergegeben.",
      sec2_title: "2. Cookies und Google AdSense",
      sec2_desc1: "Wir nutzen die Werbelösung Google AdSense, um den Betrieb und die kostenlose Bereitstellung unseres Online-Tools zu finanzieren. Google und seine Partner verwenden hierbei Drittanbieter-Cookies, um zielgerichtete Werbung anzuzeigen, die auf Ihren vorherigen Besuchen auf unserer oder anderen Websites basiert.",
      sec2_desc2: "Sie können die personalisierte Werbung jederzeit in den Einstellungen Ihres Google-Kontos deaktivieren oder Ihren Browser so konfigurieren, dass Drittanbieter-Cookies blockiert werden.",
      sec3_title: "3. Externe Links",
      sec3_desc: "Unsere Website bietet Informationslinks zu den offiziellen Portalen der französischen Behörden (impots.gouv.fr). Wir sind nicht verantwortlich für den Inhalt oder die Datenschutzbestimmungen dieser offiziellen Drittanbieter-Seiten.",
      sec4_title: "4. Kontakt und Reklamationen",
      sec4_desc: "Bei Fragen zur Nutzung der Website SejourTaxe.com oder zur Ausübung Ihrer Rechte bezüglich der per E-Mail gesendeten Informationen können Sie sich an den auf unserer Kontaktseite angegebenen Verantwortlichen wenden."
    },
    es: {
      title: "Política de Privacidad",
      updated: "Última actualización: 30 de junio de 2026",
      p1: "En SejourTaxe.com, la protección de sus datos personales es nuestra máxima prioridad. De conformidad con el Reglamento General de Protección de Datos (RGPD), esta página le presenta de forma clara nuestra política de gestión de datos.",
      box_title: "Cálculos 100% anónimos y locales",
      box_desc: "Todas las operaciones matemáticas de nuestra calculadora de tasa de estancia se realizan directamente en su navegador web. No se transmite ningún dato financiero, importe de alquiler, número de viajeros o nombre de municipio a nuestros servidores ni se almacena en ninguna base de datos.",
      sec1_title: "1. Recopilación de datos",
      sec1_desc1: "Nuestro sitio web está diseñado para funcionar sin registro, sin cuentas de usuario y sin formularios de identificación. No recopilamos ninguna información de identificación personal (como su nombre, correo electrónico o número de teléfono) durante el uso de la calculadora.",
      sec1_desc2: "Si utiliza nuestro formulario de contacto, su dirección de correo electrónico y su mensaje se utilizarán únicamente para responder a su consulta y nunca se compartirán con terceros para fines publicitarios.",
      sec2_title: "2. Cookies y Google AdSense",
      sec2_desc1: "Utilizamos la solución publicitaria Google AdSense para financiar el mantenimiento y la disponibilidad gratuita de nuestra herramienta en línea. Google y sus socios utilizan cookies de terceros para mostrar anuncios publicitarios basados en sus visitas anteriores a este u otros sitios web.",
      sec2_desc2: "Puede desactivar la publicidad personalizada en cualquier momento a través de la configuración de su cuenta de Google, o configurar su navegador web para bloquear la instalación de cookies de terceros.",
      sec3_title: "3. Enlaces externos",
      sec3_desc: "Nuestro sitio web ofrece enlaces informativos que redirigen a los portales oficiales de la administración pública francesa (impots.gouv.fr). No somos responsables del contenido ni de las políticas de privacidad de estos sitios oficiales de terceros.",
      sec4_title: "4. Contacto y reclamaciones",
      sec4_desc: "Para cualquier pregunta relacionada con el uso del sitio SejourTaxe.com o para ejercer sus derechos sobre la información enviada por correo electrónico, puede ponerse en contacto con nuestro responsable de publicación a través de la dirección facilitada en nuestra página de contacto."
    },
    it: {
      title: "Privacy Policy",
      updated: "Ultimo aggiornamento: 30 giugno 2026",
      p1: "Su SejourTaxe.com, la tutela dei tuoi dati personali è la nostra massima priorità. In conformità con il Regolamento Generale sulla Protezione dei Dati (RGPD), questa pagina descrive in modo chiaro la nostra politica di gestione dei dati.",
      box_title: "Calcoli al 100% anonimi e in locale",
      box_desc: "Tutte le operazioni matematiche sul nostro calcolatore della tassa di soggiorno sono eseguite direttamente sul tuo browser web. Nessun dato finanziario, importo dell'affitto, numero di viaggiatori o nome del comune viene trasmesso ai nostri server o memorizzato in un database.",
      sec1_title: "1. Raccolta dei dati",
      sec1_desc1: "Il nostro sito web è progettato per funzionare senza registrazione, senza account utente e senza moduli di identificazione. Non raccogliamo informazioni personali (come nome, indirizzo e-mail o numero di telefono) durante l'utilizzo del calcolatore.",
      sec1_desc2: "Se utilizzi il modulo di contatto, il tuo indirizzo e-mail e il messaggio saranno utilizzati esclusivamente per risponderti e non verranno mai ceduti a terzi per scopi di marketing.",
      sec2_title: "2. Cookie e Google AdSense",
      sec2_desc1: "Utilizziamo la soluzione pubblicitaria Google AdSense per finanziare lo sviluppo e l'accessibilità gratuita del nostro calcolatore online. Google e i suoi partner utilizzano cookie di terze parti per mostrare annunci personalizzati basati sulle visite precedenti su questo o altri siti web.",
      sec2_desc2: "Puoi disattivare gli annunci personalizzati in qualsiasi momento tramite le impostazioni del tuo account Google o configurare il browser in modo da rifiutare l'installazione di cookie di terze parti.",
      sec3_title: "3. Link esterni",
      sec3_desc: "Il nostro sito include collegamenti informativi che reindirizzano ai portali ufficiali della pubblica amministrazione francese (impots.gouv.fr). Non siamo responsabili del contenuto o delle politiche sulla privacy di tali siti esterni.",
      sec4_title: "4. Contatti e richieste",
      sec4_desc: "Per qualsiasi domanda relativa all'utilizzo del sito SejourTaxe.com o per esercitare i tuoi diritti sulle informazioni inviate via e-mail, puoi contattare il responsabile della pubblicazione all'indirizzo indicato nella pagina dei contatti."
    },
    zh: {
      title: "隐私政策",
      updated: "最后更新时间：2026年6月30日",
      p1: "在 SejourTaxe.com，保护您的个人数据隐私是我们的重中之重。根据欧盟《通用数据保护条例》（RGPD/GDPR）的相关法规，本页面清晰为您呈明我们的数据处理及隐私防护规则。",
      box_title: "计算器运行机制：100% 浏览器本地匿名处理",
      box_desc: "本旅游税计算器里的所有算术指令及数据计算，均在您使用的浏览器本地进行。您的任何财务金额、房租单价、房客人数、旅游目的地名称等计算过程中的具体数值，均绝对不会传输到我们的服务器，也不会存储在任何云端数据库中。",
      sec1_title: "1. 数据收集",
      sec1_desc1: "我们的网站专为无门槛免密使用而设计。您无需注册、无需创建个人账号，也不用填写任何识别身份的信息。在使用本税额模拟工具时，我们绝不主动收集任何形式的个人可识别信息（如姓名、邮箱、手机号等）。",
      sec1_desc2: "如果您使用我们的联系表单发送邮件，您的电子邮箱和留言内容仅会作为答复咨询时的依据，绝不用于商业推广或未经同意转交给任何第三方机构。",
      sec2_title: "2. Cookies 追踪器与谷歌广告 (Google AdSense)",
      sec2_desc1: "我们接入了 Google AdSense 谷歌广告系统，以此获得的资金用于维持本站的日常技术维护和无偿向公众开放。Google 及其关联合作伙伴将使用第三方 Cookies，以便根据您先前在本站或其他站点的浏览记录向您推送高相关的优质广告。",
      sec2_desc2: "您可以随时在自己的 Google 个人账户管理中心关闭“个性化广告投放”，或者通过浏览器控制面板一键阻止、清除第三方 Cookies 追踪器的装载。",
      sec3_title: "3. 外部官方链接申明",
      sec3_desc: "本站提供的多国语言指南或计算结果中，包含了指向法国政府官方财税门户（impots.gouv.fr）的友情链接。我们无法为这些法定的政府链接在您离开本站后的隐私惯例和外部内容承担法律责任。",
      sec4_title: "4. 联系我们与权利保障",
      sec4_desc: "如果您对 SejourTaxe.com 的数据使用机制有任何疑问，或者希望主张/撤销发送给我们的电子邮件信息，欢迎随时通过本站联系页面展示的负责人邮箱与我们取得联系。"
    }
  };

  const curr = translations[language] || translations.fr;

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="py-8 border-b border-black/10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          {curr.title}
        </h1>
        <p className="text-xs text-[#d1121d] font-mono uppercase tracking-widest mt-2">{curr.updated}</p>
      </div>

      <section className="border border-black p-6 sm:p-10 bg-white space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="font-medium text-slate-600">
          {curr.p1}
        </p>

        {/* Local Processing */}
        <div className="bg-[#f6f6f6] p-5 border-l-2 border-[#d1121d] flex gap-4 items-start">
          <EyeOff className="h-6 w-6 text-black shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">{curr.box_title}</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              {curr.box_desc}
            </p>
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">{curr.sec1_title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec1_desc1}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec1_desc2}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">{curr.sec2_title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec2_desc1}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec2_desc2}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">{curr.sec3_title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec3_desc}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">{curr.sec4_title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec4_desc}
          </p>
        </div>
      </section>
    </div>
  );
}
