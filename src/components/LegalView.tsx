import { FileText, Landmark, ShieldAlert, Scale } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LegalView() {
  const { language } = useLanguage();

  const translations: Record<string, any> = {
    fr: {
      title: "Mentions",
      highlight: "Légales",
      subtitle: "En vigueur à compter de juin 2026",
      intro: "Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), il est précisé aux utilisateurs du site sejourtaxe.com l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.",
      sec1_title: "1. Édition du site",
      sec1_li1: "Propriétaire & Éditeur :",
      sec1_li1_val: "SejourTaxe (Édition de sites web indépendants)",
      sec1_li2: "Responsable de la publication :",
      sec1_li2_val: "Service d'édition SejourTaxe",
      sec1_li3: "E-mail de contact :",
      sec1_li3_val: "contact@sejourtaxe.com",
      sec1_li4: "Statut :",
      sec1_li4_val: "Micro-entreprise enregistrée en France",
      sec2_title: "2. Hébergement du site",
      sec2_li1: "Hébergeur :",
      sec2_li1_val: "Cloudflare, Inc.",
      sec2_li2: "Adresse :",
      sec2_li2_val: "101 Townsend St, San Francisco, CA 94107, États-Unis",
      sec2_li3: "Téléphone :",
      sec2_li3_val: "+1 (888) 993 5273",
      sec2_li4: "Plateforme de déploiement :",
      sec2_li4_val: "Cloudflare Pages (Static Web Hosting)",
      sec3_title: "3. Propriété intellectuelle",
      sec3_p1: "L'ensemble des contenus présents sur ce site (structure, textes, logos, scripts informatiques, base de données locale des communes) est protégé par la législation française et internationale relative au droit d'auteur et à la propriété intellectuelle.",
      sec3_p2: "Toute reproduction, représentation, modification ou publication de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est formellement interdite sans l'autorisation écrite préalable de l'éditeur.",
      sec4_title: "4. Limitation de responsabilité",
      sec4_p1: "Avertissement important : Ce site internet propose un simulateur de calcul à but exclusivement indicatif et éducatif. Nous nous efforçons de maintenir les règles fiscales, taux fixes et pourcentages conformes aux arrêtés légaux des collectivités. Néanmoins, l'éditeur ne saurait être tenu responsable d'éventuels écarts de tarifs, de modifications réglementaires imprévues de dernière minute, ou d'interprétations erronées des formules. Seuls les montants votés officiellement par les communes ou leurs EPCI font foi."
    },
    en: {
      title: "Legal",
      highlight: "Notice",
      subtitle: "Effective as of June 2026",
      intro: "In accordance with article 6 of French Law No. 2004-575 of June 21, 2004 on confidence in the digital economy (LCEN), we provide users of the sejourtaxe.com website with information about the identity of the entities involved in its development and monitoring.",
      sec1_title: "1. Website Edition",
      sec1_li1: "Owner & Publisher:",
      sec1_li1_val: "SejourTaxe (Independent website publishing)",
      sec1_li2: "Publication Manager:",
      sec1_li2_val: "SejourTaxe Publishing Service",
      sec1_li3: "Contact Email:",
      sec1_li3_val: "contact@sejourtaxe.com",
      sec1_li4: "Status:",
      sec1_li4_val: "Sole proprietorship registered in France",
      sec2_title: "2. Website Hosting",
      sec2_li1: "Host:",
      sec2_li1_val: "Cloudflare, Inc.",
      sec2_li2: "Address:",
      sec2_li2_val: "101 Townsend St, San Francisco, CA 94107, USA",
      sec2_li3: "Phone:",
      sec2_li3_val: "+1 (888) 993 5273",
      sec2_li4: "Deployment Platform:",
      sec2_li4_val: "Cloudflare Pages (Static Web Hosting)",
      sec3_title: "3. Intellectual Property",
      sec3_p1: "All content present on this site (structure, texts, logos, software scripts, local municipality database) is protected by French and international legislation relating to copyright and intellectual property.",
      sec3_p2: "Any reproduction, representation, modification, or publication of all or part of the elements of the site, regardless of the means or process used, is strictly prohibited without the prior written consent of the publisher.",
      sec4_title: "4. Limitation of Liability",
      sec4_p1: "Important Warning: This website offers a calculation simulator for strictly indicative and educational purposes. We strive to maintain fiscal rules, fixed rates, and percentages in compliance with local regulations. However, the publisher cannot be held responsible for potential tariff discrepancies, unforeseen regulatory changes, or incorrect formula interpretations. Only the rates officially voted by the municipalities or their EPCIs are legally binding."
    },
    de: {
      title: "Rechtliche",
      highlight: "Hinweise",
      subtitle: "Gültig ab Juni 2026",
      intro: "In Übereinstimmung mit Artikel 6 des französischen Gesetzes Nr. 2004-575 vom 21. Juni 2004 für das Vertrauen in die digitale Wirtschaft (LCEN) wird den Nutzern der Website sejourtaxe.com die Identität der verschiedenen Akteure im Rahmen ihrer Erstellung und Betreuung mitgeteilt.",
      sec1_title: "1. Herausgabe der Website",
      sec1_li1: "Eigentümer & Herausgeber:",
      sec1_li1_val: "SejourTaxe (Unabhängige Website-Herausgabe)",
      sec1_li2: "Verantwortlich für die Veröffentlichung:",
      sec1_li2_val: "SejourTaxe Redaktionsdienst",
      sec1_li3: "Kontakt-E-Mail:",
      sec1_li3_val: "contact@sejourtaxe.com",
      sec1_li4: "Status:",
      sec1_li4_val: "In Frankreich registriertes Einzelunternehmen",
      sec2_title: "2. Website-Hosting",
      sec2_li1: "Host:",
      sec2_li1_val: "Cloudflare, Inc.",
      sec2_li2: "Adresse:",
      sec2_li2_val: "101 Townsend St, San Francisco, CA 94107, USA",
      sec2_li3: "Telefon:",
      sec2_li3_val: "+1 (888) 993 5273",
      sec2_li4: "Bereitstellungsplattform:",
      sec2_li4_val: "Cloudflare Pages (Static Web Hosting)",
      sec3_title: "3. Geistiges Eigentum",
      sec3_p1: "Sämtliche auf dieser Website vorhandenen Inhalte (Struktur, Texte, Logos, Skripte, lokale Datenbank der Gemeinden) sind durch die französische und internationale Gesetzgebung zum Urheberrecht und zum geistigen Eigentum geschützt.",
      sec3_p2: "Jede Vervielfältigung, Darstellung, Änderung oder Veröffentlichung aller oder eines Teils der Elemente der Website, unabhängig von den verwendeten Mitteln oder Verfahren, ist ohne vorherige schriftliche Genehmigung des Herausgebers strengstens untersagt.",
      sec4_title: "4. Haftungsbeschränkung",
      sec4_p1: "Wichtiger Warnhinweis: Diese Website bietet einen Berechnungssimulator zu rein informativen und pädagogischen Zwecken. Wir bemühen uns, die Steuervorschriften, Pauschalsätze und Prozentsätze in Übereinstimmung mit den lokalen Verordnungen zu halten. Der Herausgeber haftet jedoch nicht für eventuelle Tarifabweichungen, unvorhergesehene Gesetzesänderungen oder fehlerhafte Formelinterpretationen. Verbindlich sind ausschließlich die von den Gemeinden oder deren EPCIs offiziell beschlossenen Sätze."
    },
    es: {
      title: "Aviso",
      highlight: "Legal",
      subtitle: "En vigor a partir de junio de 2026",
      intro: "De conformidad con lo dispuesto en el artículo 6 de la Ley francesa n° 2004-575 de 21 de junio de 2004 para la confianza en la economía digital (LCEN), se especifica a los usuarios del sitio sejourtaxe.com la identidad de los distintos agentes que intervienen en su desarrollo y seguimiento.",
      sec1_title: "1. Edición del sitio",
      sec1_li1: "Propietario y editor:",
      sec1_li1_val: "SejourTaxe (Edición de sitios web independientes)",
      sec1_li2: "Responsable de la publicación:",
      sec1_li2_val: "Servicio de publicación SejourTaxe",
      sec1_li3: "Correo electrónico de contacto:",
      sec1_li3_val: "contact@sejourtaxe.com",
      sec1_li4: "Estado:",
      sec1_li4_val: "Microempresa registrada en Francia",
      sec2_title: "2. Alojamiento del sitio",
      sec2_li1: "Proveedor de alojamiento:",
      sec2_li1_val: "Cloudflare, Inc.",
      sec2_li2: "Dirección:",
      sec2_li2_val: "101 Townsend St, San Francisco, CA 94107, Estados Unidos",
      sec2_li3: "Teléfono:",
      sec2_li3_val: "+1 (888) 993 5273",
      sec2_li4: "Plataforma de despliegue:",
      sec2_li4_val: "Cloudflare Pages (Alojamiento web estático)",
      sec3_title: "3. Propiedad intelectual",
      sec3_p1: "Todos los contenidos de este sitio web (estructura, textos, logotipos, códigos informáticos, base de datos local de municipios) están protegidos por la legislación francesa e internacional relativa a los derechos de autor y a la propiedad intelectual.",
      sec3_p2: "Cualquier reproducción, representación, modificación o publicación de la totalidad o parte de los elementos del sitio, independientemente del medio o procedimiento utilizado, está estrictamente prohibida sin el consentimiento previo por escrito del editor.",
      sec4_title: "4. Limitación de responsabilidad",
      sec4_p1: "Advertencia importante: Este sitio web ofrece un simulador de cálculo con fines exclusivamente indicativos y educativos. Nos esforzamos por mantener las normas fiscales, las tarifas fijas y los porcentajes de acuerdo con la normativa local. No obstante, el editor no se hace responsable de posibles diferencias en las tarifas, de cambios normativos imprevistos o de interpretaciones erróneas de las fórmulas. Solo tendrán validez legal las tarifas aprobadas oficialmente por los municipios o sus EPCIs."
    },
    it: {
      title: "Note",
      highlight: "Legali",
      subtitle: "In vigore da giugno 2026",
      intro: "In conformità con quanto disposto dall'articolo 6 della legge francese n° 2004-575 del 21 giugno 2004 sulla fiducia nell'economia digitale (LCEN), si rende nota agli utenti del sito sejourtaxe.com l'identità dei soggetti coinvolti nella sua realizzazione e gestione.",
      sec1_title: "1. Modifica del sito",
      sec1_li1: "Proprietario ed editore:",
      sec1_li1_val: "SejourTaxe (Pubblicazione di siti web indipendenti)",
      sec1_li2: "Responsabile della pubblicazione:",
      sec1_li2_val: "Servizio di pubblicazione SejourTaxe",
      sec1_li3: "E-mail di contatto:",
      sec1_li3_val: "contact@sejourtaxe.com",
      sec1_li4: "Stato giuridico:",
      sec1_li4_val: "Microimpresa registrata in Francia",
      sec2_title: "2. Hosting del sito",
      sec2_li1: "Provider di hosting:",
      sec2_li1_val: "Cloudflare, Inc.",
      sec2_li2: "Indirizzo:",
      sec2_li2_val: "101 Townsend St, San Francisco, CA 94107, USA",
      sec2_li3: "Telefono:",
      sec2_li3_val: "+1 (888) 993 5273",
      sec2_li4: "Piattaforma di distribuzione:",
      sec2_li4_val: "Cloudflare Pages (Static Web Hosting)",
      sec3_title: "3. Proprietà intellettuale",
      sec3_p1: "Tutti i contenuti di questo sito (struttura, testi, loghi, script informatici, database locale dei comuni) sono protetti dalla legislazione francese e internazionale sul diritto d'autore e sulla proprietà intellettuale.",
      sec3_p2: "Qualsiasi riproduzione, rappresentazione, modifica o pubblicazione di tutti o parte degli elementi del sito, con qualsiasi mezzo o procedimento, è severamente vietata senza il previo consenso scritto dell'editore.",
      sec4_title: "4. Limitazione di responsabilità",
      sec4_p1: "Avviso importante: Questo sito web offre un simulatore di calcolo a scopo puramente indicativo e didattico. Ci impegniamo a mantenere le norme fiscali, le tariffe fisse e le percentuali in conformità con i regolamenti locali. Tuttavia, l'editore non può essere ritenuto responsabile per eventuali discrepanze tariffarie, modifiche normative impreviste o errate interpretazioni delle formule. Solo le tariffe ufficialmente deliberate dai comuni o dai loro EPCI hanno valore legale."
    },
    zh: {
      title: "法律声明与",
      highlight: "使用条款",
      subtitle: "本声明自 2026 年 6 月起生效",
      intro: "根据法国第 2004-575 号关于数字经济信任法（LCEN）第 6 条的相关规定，特此向 sejourtaxe.com 的使用者公告本网站的运营及服务提供商信息，以作公示。",
      sec1_title: "1. 网站编辑与运营主体",
      sec1_li1: "所有者及出版商：",
      sec1_li1_val: "SejourTaxe (独立垂直财税类网络站点编辑机构)",
      sec1_li2: "内容责任总监：",
      sec1_li2_val: "SejourTaxe 编审与合规服务中心",
      sec1_li3: "联络电子邮箱：",
      sec1_li3_val: "contact@sejourtaxe.com",
      sec1_li4: "注册资质状态：",
      sec1_li4_val: "依据法国财税法律注册成立的微型独立纳税实体 (Micro-entreprise)",
      sec2_title: "2. 托管服务器与网络服务",
      sec2_li1: "服务器供应商：",
      sec2_li1_val: "Cloudflare, Inc.",
      sec2_li2: "总部注册地址：",
      sec2_li2_val: "101 Townsend St, San Francisco, CA 94107, USA",
      sec2_li3: "供应商客服热线：",
      sec2_li3_val: "+1 (888) 993 5273",
      sec2_li4: "云部署框架：",
      sec2_li4_val: "Cloudflare Pages 全球静态内容高速分发网络",
      sec3_title: "3. 知识产权与版权声明",
      sec3_p1: "本网站中包含的全部专有内容（包括但不限于页面结构、文案表述、特色徽标设计、前/后端计算脚本以及市镇旅游税离线核心数据库）均受到法国及全球多边版权公约与知识产权法的严格保护。",
      sec3_p2: "未经本出版机构明确的书面预先授权，严禁任何单位和个人以任何技术手段对本站内容进行抓取、二次包装、克隆或以营利为目的的复制转载。一经发现，我们将保留向法国及国际版权司法机构提起侵权诉讼的权利。",
      sec4_title: "4. 免责声明与法律风险限制",
      sec4_p1: "重要风险提示：本网站提供的计税模拟器及公式计算结果，纯粹作为用户参考学习、以及协助预估旅游税时使用，不具备法定清税或纳税凭证效力。尽管我们通过各级政务系统紧密追踪、核验和更新全法各地的计算规则、固定税率和比例，但各省市及大区的附加规章瞬息万变。出版商不对由于信息延迟更新、公式理解偏差或当地临时特别税率调整所造成的经济差额承担任何民事赔偿责任。一切税收细则及实缴税额，应以各市镇（Commune）或其代表机构（EPCI）最新公布的官方决议文本为唯一的法律准绳。"
    }
  };

  const curr = translations[language] || translations.fr;

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="py-8 border-b border-black/10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          {curr.title} <span className="text-[#d1121d]">{curr.highlight}</span>
        </h1>
        <p className="text-xs text-[#d1121d] font-mono uppercase tracking-widest mt-2">{curr.subtitle}</p>
      </div>

      <section className="border border-black p-6 sm:p-10 bg-white space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="font-medium text-slate-600">
          {curr.intro}
        </p>

        {/* 1. Éditeur */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black flex items-center gap-2">
            <Scale className="h-5 w-5 text-[#d1121d]" />
            <span>{curr.sec1_title}</span>
          </h2>
          <div className="pl-7 space-y-1 text-slate-600 text-xs sm:text-sm">
            <p className="font-medium"><strong>{curr.sec1_li1}</strong> {curr.sec1_li1_val}</p>
            <p className="font-medium"><strong>{curr.sec1_li2}</strong> {curr.sec1_li2_val}</p>
            <p className="font-medium"><strong>{curr.sec1_li3}</strong> {curr.sec1_li3_val}</p>
            <p className="font-medium"><strong>{curr.sec1_li4}</strong> {curr.sec1_li4_val}</p>
          </div>
        </div>

        {/* 2. Hébergeur */}
        <div className="space-y-3 border-t border-black/10 pt-5">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black flex items-center gap-2">
            <Landmark className="h-5 w-5 text-[#d1121d]" />
            <span>{curr.sec2_title}</span>
          </h2>
          <div className="pl-7 space-y-1 text-slate-600 text-xs sm:text-sm">
            <p className="font-medium"><strong>{curr.sec2_li1}</strong> {curr.sec2_li1_val}</p>
            <p className="font-medium"><strong>{curr.sec2_li2}</strong> {curr.sec2_li2_val}</p>
            <p className="font-medium"><strong>{curr.sec2_li3}</strong> {curr.sec2_li3_val}</p>
            <p className="font-medium"><strong>{curr.sec2_li4}</strong> {curr.sec2_li4_val}</p>
          </div>
        </div>

        {/* 3. Propriété intellectuelle */}
        <div className="space-y-3 border-t border-black/10 pt-5">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-black">{curr.sec3_title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec3_p1}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {curr.sec3_p2}
          </p>
        </div>

        {/* 4. Limitation de responsabilité */}
        <div className="space-y-3 border-t border-black/10 pt-5 bg-[#f6f6f6] p-5 border-l-2 border-[#d1121d]">
          <h2 className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
            <ShieldAlert className="h-5 w-5 text-[#d1121d]" />
            <span>{curr.sec4_title}</span>
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {curr.sec4_p1}
          </p>
        </div>
      </section>
    </div>
  );
}
