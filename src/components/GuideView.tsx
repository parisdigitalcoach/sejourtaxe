import { 
  BookOpen, Calculator, ShieldCheck, 
  ArrowRight, Users, Layers, Landmark 
} from "lucide-react";
import AdBanner from "./AdBanner";
import { useLanguage } from "../context/LanguageContext";

interface GuideViewProps {
  navigate: (path: string) => void;
}

export default function GuideView({ navigate }: GuideViewProps) {
  const { language } = useLanguage();

  const translations: Record<string, any> = {
    fr: {
      title: "Guide de Calcul",
      highlight: "Calcul",
      subtitle: "Découvrez en détail les formules officielles, l'intégration des taxes régionales ou départementales, et les conditions légales d'exonération applicables en 2026.",
      q1_title: "01. Moins de 18 ans",
      q1_desc: "Les enfants de moins de 18 ans sont totalement exonérés de la taxe de séjour en France par décret national.",
      q2_title: "02. Majorations Locales",
      q2_desc: "Les départements et certaines régions ajoutent des taxes additionnelles de 10%, 15% ou 200% s'appliquant au taux de base.",
      q3_title: "03. Plafonnement Proportionnel",
      q3_desc: "Les formules au pourcentage sont plafonnées au montant maximum voté par la collectivité pour les catégories supérieures.",
      sec1_title: "1. Tarifs Fixes (Hébergements Classés)",
      sec1_p1: "Les hébergements touristiques officiellement classés en étoiles (Hôtels, Meublés de tourisme, Résidences classées, Villages de vacances) appliquent un tarif forfaitaire fixe par personne majeure et par nuit.",
      sec1_p2: "Ce tarif varie de 0,20 € à plus de 5,00 € selon la catégorie choisie et le barème voté par l'assemblée locale de la commune.",
      formula_title: "Formule générale :",
      formula_text: "Taxe Globale = (Tarif de base + Majorations additionnelles) × Adultes × Nuits",
      sec2_title: "2. Tarifs Proportionnels (Hébergements Non Classés)",
      sec2_p1: "Pour tout hébergement saisonnier ne disposant pas d'un classement officiel en étoiles, le calcul se fait obligatoirement au pourcentage du coût hors taxes de la nuitée par personne.",
      sec2_steps_title: "Étapes de calcul requises :",
      step1_title: "Étape 01 : Prix par occupant par nuit",
      step1_formula: "Prix par voyageur/nuit = Loyer HT total / (Voyageurs adultes + enfants) / Nuits",
      step2_title: "Étape 02 : Application du pourcentage",
      step2_formula: "Taxe de base = Prix par voyageur/nuit × Pourcentage communal (de 1% à 5%)",
      step3_title: "Étape 03 : Écrêtement au plafond",
      step3_desc: "La Taxe de base est plafonnée au montant maximal légal configuré par la commune.",
      step4_title: "Étape 04 : Taxes Additionnelles & Somme",
      step4_formula: "Taxe finale = (Taxe de base plafonnée + Majorations additionnelles) × Adultes × Nuits",
      sec2_note: "* Important : Bien que les enfants soient exemptés de la taxe de séjour finale, leur nombre figure au dénominateur de l'Étape 01 afin de réduire le coût de la nuitée par personne.",
      sec3_title: "3. Majorations additionnelles courantes",
      sec3_p1: "Plusieurs taxes régionales et départementales se greffent au taux de base décidé par la commune :",
      maj1_title: "Majoration Départementale (+10%)",
      maj1_desc: "Collectée par la majorité des départements pour l'entretien d'espaces touristiques et naturels sensibles.",
      maj2_title: "Majoration Régionale ferroviaire (+15%)",
      maj2_desc: "Présente notamment en région PACA, Occitanie et Grand Sud-Ouest pour financer les lignes à grande vitesse.",
      maj3_title: "Majoration Transports Île-de-France (+200%)",
      maj3_desc: "Taxe additionnelle destinée au financement du Grand Paris Express et de l'amélioration des transports parisiens.",
      sec4_title: "4. Exonérations Légales Obligatoires",
      sec4_p1: "L'article L. 2333-31 du CGCT définit les profils de voyageurs formellement exclus du versement de la taxe :",
      ex_1: "Les résidents mineurs (âgés de moins de 18 ans au moment de l'enregistrement).",
      ex_2: "Les travailleurs saisonniers disposant d'un contrat de travail local.",
      ex_3: "Les personnes bénéficiant de mesures d'hébergement d'urgence sociale.",
      ex_4: "Les locataires bénéficiant de loyers inférieurs à un seuil défini par l'administration locale.",
      cta_title: "Prêt à estimer votre taxe ?",
      cta_desc: "Utilisez notre simulateur en ligne gratuit intégrant tous les barèmes régionaux officiels pour un calcul fiable et 100% anonyme.",
      cta_btn: "Lancer le simulateur de calcul"
    },
    en: {
      title: "Calculation Guide",
      highlight: "Calculation",
      subtitle: "Discover in detail the official formulas, integration of regional or departmental taxes, and legal conditions of exemption applicable in 2026.",
      q1_title: "01. Under 18 years old",
      q1_desc: "Minors under 18 years old are completely exempt from the tourist tax in France by national decree.",
      q2_title: "02. Local Surcharges",
      q2_desc: "Departments and certain regions add additional taxes of 10%, 15%, or 200% on top of the base municipal rate.",
      q3_title: "03. Proportional Cap",
      q3_desc: "Percentage-based formulas are capped at the maximum rate voted by the local authority for upper categories.",
      sec1_title: "1. Fixed Rates (Classified Accommodations)",
      sec1_p1: "Touristic accommodations officially classified in stars (Hotels, Holiday Rentals, Classified Residences, Holiday Villages) apply a fixed flat rate per adult per night.",
      sec1_p2: "This rate varies from €0.20 to over €5.00 depending on the selected category and the scale voted by the local assembly of the municipality.",
      formula_title: "General Formula:",
      formula_text: "Global Tax = (Base Rate + Additional Surcharges) × Adults × Nights",
      sec2_title: "2. Proportional Rates (Unclassified Accommodations)",
      sec2_p1: "For any seasonal accommodation without an official star rating, the calculation is proportional to the pre-tax cost of the night per person.",
      sec2_steps_title: "Required Calculation Steps:",
      step1_title: "Step 01: Price per occupant per night",
      step1_formula: "Price per guest/night = Total Rent excl. tax / (Adult + Child guests) / Nights",
      step2_title: "Step 02: Application of percentage",
      step2_formula: "Base tax = Price per guest/night × Municipal percentage (1% to 5%)",
      step3_title: "Step 03: Capping to limit",
      step3_desc: "The base tax is capped at the maximum legal rate set by the municipality.",
      step4_title: "Step 04: Additional Taxes & Sum",
      step4_formula: "Final Tax = (Capped base tax + Additional surcharges) × Adults × Nights",
      sec2_note: "* Important: Although children are exempt from the final tourist tax, their count is included in Step 01 to lower the night's cost per person.",
      sec3_title: "3. Common Additional Surcharges",
      sec3_p1: "Several regional and departmental taxes are added to the base rate decided by the municipality:",
      maj1_title: "Departmental Surcharge (+10%)",
      maj1_desc: "Collected by most departments to fund tourist facilities and sensitive natural areas.",
      maj2_title: "Regional Railway Surcharge (+15%)",
      maj2_desc: "Applied in PACA, Occitanie, and Grand Sud-Ouest to fund high-speed rail lines.",
      maj3_title: "Île-de-France Transport Surcharge (+200%)",
      maj3_desc: "Additional tax for funding the Grand Paris Express and parisians public transport improvements.",
      sec4_title: "4. Mandatory Legal Exemptions",
      sec4_p1: "Article L. 2333-31 of the CGCT defines traveler profiles formally excluded from paying the tax:",
      ex_1: "Minor residents (under 18 years old at check-in time).",
      ex_2: "Seasonal workers with a local work contract.",
      ex_3: "Individuals receiving social emergency shelter accommodation.",
      ex_4: "Tenants of rentals with rates below a threshold set by the local administration.",
      cta_title: "Ready to estimate your tax?",
      cta_desc: "Use our free online simulator integrating all official regional scales for a reliable and 100% anonymous calculation.",
      cta_btn: "Launch the calculation simulator"
    },
    de: {
      title: "Berechnungs-Leitfaden",
      highlight: "Leitfaden",
      subtitle: "Entdecken Sie im Detail die offiziellen Formeln, die Integration von Regional- oder Departementssteuern sowie die im Jahr 2026 geltenden gesetzlichen Befreiungsbedingungen.",
      q1_title: "01. Unter 18 Jahren",
      q1_desc: "Minderjährige unter 18 Jahren sind in Frankreich per nationalem Dekret vollständig von der Kurtaxe befreit.",
      q2_title: "02. Lokale Zuschläge",
      q2_desc: "Departements und bestimmte Regionen erheben zusätzliche Steuern von 10 %, 15 % oder 200 % auf den kommunalen Basissatz.",
      q3_title: "03. Proportionale Deckelung",
      q3_desc: "Prozentsatzbasierte Formeln sind auf den von der lokalen Behörde für die höheren Kategorien beschlossenen Maximalsatz begrenzt.",
      sec1_title: "1. Pauschaltarife (Klassifizierte Unterkünfte)",
      sec1_p1: "Offiziell mit Sternen klassifizierte Touristenunterkünfte (Hotels, Ferienwohnungen, klassifizierte Residenzen, Feriendörfer) wenden einen festen Pauschaltarif pro Erwachsenem und Nacht an.",
      sec1_p2: "Dieser Tarif variiert je nach gewählter Kategorie und dem von der lokalen Versammlung der Gemeinde beschlossenen Satz zwischen 0,20 € und über 5,00 €.",
      formula_title: "Allgemeine Formel:",
      formula_text: "Gesamtsteuer = (Basistarif + zusätzliche Zuschläge) × Erwachsene × Nächte",
      sec2_title: "2. Proportionale Tarife (Nicht klassifizierte Unterkünfte)",
      sec2_p1: "Bei allen saisonalen Unterkünften ohne offizielle Sterneklassifizierung erfolgt die Berechnung proportional zu den Übernachtungskosten pro Person (ohne Steuern).",
      sec2_steps_title: "Erforderliche Berechnungsschritte:",
      step1_title: "Schritt 01: Preis pro Gast pro Nacht",
      step1_formula: "Preis pro Gast/Nacht = Gesamtmiete ohne MwSt. / (Erwachsene + Kinder) / Nächte",
      step2_title: "Schritt 02: Anwendung des Prozentsatzes",
      step2_formula: "Basissteuer = Preis pro Gast/Nacht × Kommunaler Prozentsatz (1 % bis 5 %)",
      step3_title: "Schritt 03: Deckelung",
      step3_desc: "Die Basissteuer wird auf den von der Gemeinde festgelegten gesetzlichen Höchstbetrag begrenzt.",
      step4_title: "Schritt 04: Zusätzliche Steuern & Summe",
      step4_formula: "Endgültige Steuer = (Gedeckelte Basissteuer + zusätzliche Zuschläge) × Erwachsene × Nächte",
      sec2_note: "* Wichtig: Obwohl Kinder von der endgültigen Kurtaxe befreit sind, wird ihre Anzahl in Schritt 01 mitgezählt, um die Übernachtungskosten pro Person zu senken.",
      sec3_title: "3. Häufige zusätzliche Zuschläge",
      sec3_p1: "Mehrere regionale und Departementssteuern werden auf den von der Gemeinde beschlossenen Basissatz aufgeschlagen:",
      maj1_title: "Departementszuschlag (+10 %)",
      maj1_desc: "Wird von den meisten Departements für die Pflege von touristischen und sensiblen Naturgebieten erhoben.",
      maj2_title: "Regionaler Bahnzuschlag (+15 %)",
      maj2_desc: "Wird in den Regionen PACA, Okzitanien und Grand Sud-Ouest zur Finanzierung von Hochgeschwindigkeitsstrecken erhoben.",
      maj3_title: "Île-de-France Transportzuschlag (+200 %)",
      maj3_desc: "Zusätzliche Steuer zur Finanzierung des Grand Paris Express und zur Verbesserung des Pariser Nahverkehrs.",
      sec4_title: "4. Gesetzliche Pflichtbefreiungen",
      sec4_p1: "Artikel L. 2333-31 des CGCT definiert die Profile von Reisenden, die formell von der Zahlung der Steuer befreit sind:",
      ex_1: "Minderjährige Gäste (unter 18 Jahren zum Zeitpunkt des Check-ins).",
      ex_2: "Saisonarbeiter mit einem lokalen Arbeitsvertrag.",
      ex_3: "Personen, die in sozialen Notunterkünften untergebracht sind.",
      ex_4: "Mieter von Unterkünften, deren Miete unter einem von der lokalen Verwaltung festgelegten Schwellenwert liegt.",
      cta_title: "Bereit, Ihre Steuer zu schätzen?",
      cta_desc: "Nutzen Sie unseren kostenlosen Online-Simulator, der alle offiziellen regionalen Tarife für eine zuverlässige und 100 % anonyme Berechnung enthält.",
      cta_btn: "Berechnungssimulator starten"
    },
    es: {
      title: "Guía de Cálculo",
      highlight: "Cálculo",
      subtitle: "Descubra detalladamente las fórmulas oficiales, la integración de impuestos regionales o departamentales, y las condiciones legales de exención aplicables en 2026.",
      q1_title: "01. Menores de 18 años",
      q1_desc: "Los menores de 18 años están totalmente exentos de la tasa de estancia en Francia por decreto nacional.",
      q2_title: "02. Recargos Locales",
      q2_desc: "Los departamentos y ciertas regiones añaden tasas adicionales del 10%, 15% o 200% sobre la tarifa base municipal.",
      q3_title: "03. Límite Proporcional",
      q3_desc: "Las fórmulas basadas en porcentajes están limitadas a la tarifa máxima votada por la administración local para las categorías superiores.",
      sec1_title: "1. Tarifas Fijas (Alojamientos Clasificados)",
      sec1_p1: "Los alojamientos turísticos oficialmente clasificados con estrellas (Hoteles, Alquileres vacacionales, Residencias clasificadas, Villas de vacaciones) aplican una tarifa fija por adulto y noche.",
      sec1_p2: "Esta tarifa varía de 0,20 € a más de 5,00 € según la categoría elegida y la escala aprobada por la asamblea local del municipio.",
      formula_title: "Fórmula General:",
      formula_text: "Impuesto Global = (Tarifa base + Recargos adicionales) × Adultos × Noches",
      sec2_title: "2. Tarifas Proporcionales (Alojamientos No Clasificados)",
      sec2_p1: "Para cualquier alojamiento de temporada sin clasificación oficial por estrellas, el cálculo es proporcional al coste sin IVA de la noche por persona.",
      sec2_steps_title: "Pasos de cálculo obligatorios:",
      step1_title: "Paso 01: Precio por ocupante por noche",
      step1_formula: "Precio por huésped/noche = Alquiler total sin IVA / (Huéspedes adultos + niños) / Noches",
      step2_title: "Paso 02: Aplicación del porcentaje",
      step2_formula: "Impuesto base = Precio por huésped/noche × Porcentaje municipal (del 1% al 5%)",
      step3_title: "Paso 03: Limitación al tope",
      step3_desc: "El impuesto base está limitado al importe máximo legal establecido por el municipio.",
      step4_title: "Paso 04: Impuestos Adicionales y Suma",
      step4_formula: "Impuesto final = (Impuesto base limitado + Recargos adicionales) × Adultos × Noches",
      sec2_note: "* Importante: Aunque los niños están exentos del impuesto de estancia final, su número se incluye en el Paso 01 para reducir el coste de la noche por persona.",
      sec3_title: "3. Recargos adicionales comunes",
      sec3_p1: "Varios impuestos regionales y departamentales se añaden a la tarifa base decidida por el municipio:",
      maj1_title: "Recargo Departamental (+10%)",
      maj1_desc: "Recaudado por la mayoría de los departamentos para el mantenimiento de espacios turísticos y naturales protegidos.",
      maj2_title: "Recargo Regional Ferroviario (+15%)",
      maj2_desc: "Aplicado en PACA, Occitania y Grand Sud-Ouest para financiar las líneas de alta velocidad.",
      maj3_title: "Recargo de Transporte Île-de-France (+200%)",
      maj3_desc: "Impuesto adicional destinado a la financiación del Grand Paris Express y a la mejora del transporte parisino.",
      sec4_title: "4. Exenciones Legales Obligatorias",
      sec4_p1: "El artículo L. 2333-31 del CGCT define los perfiles de viajeros formalmente excluidos del pago del impuesto:",
      ex_1: "Los menores de edad (menos de 18 años al momento del check-in).",
      ex_2: "Los trabajadores temporales con un contrato de trabajo local.",
      ex_3: "Las personas alojadas en establecimientos de acogida de emergencia social.",
      ex_4: "Los inquilinos con tarifas de alquiler inferiores al umbral definido por la administración local.",
      cta_title: "¿Listo para estimar su impuesto?",
      cta_desc: "Utilice nuestro simulador gratuito en línea que incluye todas las tarifas oficiales de las administraciones locales para un cálculo fiable y 100% anónimo.",
      cta_btn: "Iniciar el simulador de cálculo"
    },
    it: {
      title: "Guida al Calcolo",
      highlight: "Calcolo",
      subtitle: "Scopri nel dettaglio le formule ufficiali, l'integrazione delle tasse regionali o provinciali, e le condizioni legali di esenzione applicabili nel 2026.",
      q1_title: "01. Minori di 18 anni",
      q1_desc: "I minori di 18 anni sono totalmente esenti dalla tassa di soggiorno in Francia per decreto nazionale.",
      q2_title: "02. Maggiorazioni Locali",
      q2_desc: "I dipartimenti e alcune regioni aggiungono tasse addizionali del 10%, 15% o 200% s'applicando alla tariffa comunale di base.",
      q3_title: "03. Limite Proporzionale",
      q3_desc: "Le formule basate su percentuali sono limitate alla tariffa massima deliberata dall'ente locale per le categorie superiori.",
      sec1_title: "1. Tariffe Fisse (Strutture Classificate)",
      sec1_p1: "Le strutture ricettive ufficialmente classificate in stelle (Hotel, Affitti turistici, Residence classificati, Villaggi vacanze) applicano una tariffa forfettaria fissa per adulto a notte.",
      sec1_p2: "Questa tariffa varia da 0,20 € a oltre 5,00 € a seconda della categoria scelta e della tariffa deliberata dall'assemblea locale del comune.",
      formula_title: "Formula Generale:",
      formula_text: "Tassa Globale = (Tariffa di base + Maggiorazioni addizionali) × Adulti × Notti",
      sec2_title: "2. Tariffe Proporzionali (Strutture Non Classificate)",
      sec2_p1: "Per tutte le sistemazioni stagionali prive di classificazione ufficiale in stelle, il calcolo è proporzionale al costo esente da IVA del pernottamento per persona.",
      sec2_steps_title: "Passaggi per il calcolo richiesti:",
      step1_title: "Fase 01: Prezzo per occupante per notte",
      step1_formula: "Prezzo per ospite/notte = Affitto totale esente IVA / (Ospiti adulti + bambini) / Notti",
      step2_title: "Fase 02: Applicazione della percentuale",
      step2_formula: "Tassa di base = Prezzo per ospite/notte × Percentuale comunale (dall'1% al 5%)",
      step3_title: "Fase 03: Limitazione al tetto (cap)",
      step3_desc: "La tassa di base è limitata all'importo massimo legale stabilito dal comune.",
      step4_title: "Fase 04: Tasse Addizionali e Somma",
      step4_formula: "Tassa finale = (Tassa di base limitata + Maggiorazioni addizionali) × Adulti × Notti",
      sec2_note: "* Importante: Sebbene i bambini siano esenti dalla tassa finale, il loro numero viene inserito al denominatore della Fase 01 per ridurre il costo del pernottamento per persona.",
      sec3_title: "3. Maggiorazioni addizionali comuni",
      sec3_p1: "Diverse tasse regionali e provinciali si aggiungono alla tariffa di base stabilita dal comune:",
      maj1_title: "Maggiorazione Provinciale (+10%)",
      maj1_desc: "Riscossa dalla maggior parte delle province per la manutenzione delle aree turistiche e naturali protette.",
      maj2_title: "Maggiorazione Regionale Ferroviaria (+15%)",
      maj2_desc: "Applicata in PACA, Occitania e Grand Sud-Ouest per il finanziamento delle linee ad alta velocità.",
      maj3_title: "Maggiorazione Trasporti Île-de-France (+200%)",
      maj3_desc: "Tassa addizionale destinata al finanziamento del Grand Paris Express e al miglioramento dei trasporti parigini.",
      sec4_title: "4. Esenzioni Legali Obbligatorie",
      sec4_p1: "L'articolo L. 2333-31 del CGCT definisce i profili di viaggiatori formalmente esclusi dal pagamento dell'imposta:",
      ex_1: "I minori di età (meno di 18 anni al momento del check-in).",
      ex_2: "I lavoratori stagionali con un contratto di lavoro locale.",
      ex_3: "Le persone inserite in alloggi di emergenza sociale.",
      ex_4: "Gli inquilini con tariffe inferiori a una soglia definita dall'amministrazione locale.",
      cta_title: "Pronto per stimare la tua tassa?",
      cta_desc: "Utilizza il nostro simulatore online gratuito che include tutte le tariffe regionali ufficiali per un calcolo affidabile e 100% anonimo.",
      cta_btn: "Avvia il simulatore di calcolo"
    },
    zh: {
      title: "官方旅游税计算指南",
      highlight: "指南",
      subtitle: "深度解读法国官方计税公式、各省市及大区附加税率的叠加方法，以及2026年最新法定的免征与优待退减免政策条件。",
      q1_title: "01. 未满18周岁",
      q1_desc: "根据法国国家法令规定，18岁以下的未成年人在全法境内均完全免于征收旅游税。",
      q2_title: "02. 地方叠加附加税",
      q2_desc: "法国各省（Département）或特定大区通常会在地方政府确定的基础税率之上，加征 10%、15% 或 200% 的附加税。",
      q3_title: "03. 比例税上限约束",
      q3_desc: "对于按房价百分比征税的非评级宿处，其最终单人单夜税额不得超过该市镇设定的对应类别最高法定上限。",
      sec1_title: "1. 固定额税制 (已评级星级住宿)",
      sec1_p1: "凡是获得官方星级分类评级（如一至五星级酒店、星级民宿、星级度假村等）的房源，均采用固定的标准计税。即每位成年旅客每晚需支付特定金额的税款。",
      sec1_p2: "具体的固定税率通常在每人每夜 0.20 欧元至 5.00 欧元不等，具体额度由当地市镇议会投票并颁布实施。",
      formula_title: "通用公式：",
      formula_text: "旅游税总额 = (基础固定税额 + 叠加附加税额) × 计税成年人数 × 入住天数",
      sec2_title: "2. 比例百分比税制 (未评级房源)",
      sec2_p1: "若宿处无星级分类评级（如未申报评级的普通民宿、短租公寓、没有星级的宿处），则其计税方式必须严格按照单人单夜净房费的特定百分比计算。",
      sec2_steps_title: "标准计算步骤：",
      step1_title: "步骤 01：计算每人每晚分摊净房费",
      step1_formula: "单人单夜房费 = 不含税租金总价 / 入住总人数（包括成人和儿童） / 入住天数",
      step2_title: "步骤 02：应用市镇比例税率",
      step2_formula: "基础税额 = 单人单夜房费 × 市镇百分比税率 (1% 至 5% 之间)",
      step3_title: "步骤 03：上限校验（封顶控制）",
      step3_desc: "算出的单人单夜税额如果高于该城市对该宿处设定的封顶值，则强行缩减至该上限金额。",
      step4_title: "步骤 04：加征附加税并汇总",
      step4_formula: "最终税额 = (上限校验后的基础税额 + 叠加各级附加税额) × 计税成年人数 × 入住天数",
      sec2_note: "* 重要提示：尽管儿童（未成年人）是免税的，但他们的数量会作为步骤 01 中分母的一部分，起到平摊降低单人单夜房费、从而帮您合法减免税负的作用。",
      sec3_title: "3. 常见的地方叠加附加税率",
      sec3_p1: "除了市镇本身的基础税率，各省市和大区通常会叠征以下几种典型附加税：",
      maj1_title: "省附加税 (+10%)",
      maj1_desc: "全法绝大多数省份均强制加征基础税率的10%，用于支持省内旅游风景区及敏感自然生态资源的开发和养护。",
      maj2_title: "大区铁路建设附加税 (+15%)",
      maj2_desc: "在普罗旺斯-阿尔卑斯-蓝色海岸大区 (PACA)、奥克西坦尼大区 (Occitanie) 等南部和西南部分省市加征，用于筹建高速铁路 (LGV)。",
      maj3_title: "法兰西岛大区交通附加税 (+200%)",
      maj3_desc: "仅限巴黎及大巴黎地区（Île-de-France）省市，用于支持大巴黎快线 (Grand Paris Express) 建设与公共交通改造。",
      sec4_title: "4. 法定强制免征对象",
      sec4_p1: "根据法国地方行政合作税法典第 L. 2333-31 条规定，以下人群一律免予缴纳旅游税：",
      ex_1: "入住时未满 18 周岁的未成年人。",
      ex_2: "持有当地劳工合同的季节性就业劳工。",
      ex_3: "属于社会救助性质的紧急安置避难避险人员。",
      ex_4: "租金水平低于当地市政府确定的特定社会性廉租租金线的租客。",
      cta_title: "已经准备好计算您的旅游税了吗？",
      cta_desc: "立即使用我们完全免费且100%匿名的在线模拟器。系统已完整集成法国各省市官方数据库和最新加征税法细则，结果真实可靠。",
      cta_btn: "立即启动旅游税模拟计算器"
    }
  };

  const curr = translations[language] || translations.fr;

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="py-8 border-b border-black/10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          {curr.title.split(curr.highlight)[0]}<span className="text-[#d1121d]">{curr.highlight}</span>{curr.title.split(curr.highlight)[1]}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          {curr.subtitle}
        </p>
      </div>

      <AdBanner slotType="top" />

      {/* Quick Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-black/15 p-5 space-y-3">
          <Users className="h-5 w-5 text-[#d1121d]" />
          <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">{curr.q1_title}</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            {curr.q1_desc}
          </p>
        </div>

        <div className="border border-black/15 p-5 space-y-3">
          <Landmark className="h-5 w-5 text-[#d1121d]" />
          <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">{curr.q2_title}</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            {curr.q2_desc}
          </p>
        </div>

        <div className="border border-black/15 p-5 space-y-3">
          <Layers className="h-5 w-5 text-[#d1121d]" />
          <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">{curr.q3_title}</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            {curr.q3_desc}
          </p>
        </div>
      </section>

      {/* Main Guide Content */}
      <section className="space-y-12 text-slate-700 leading-relaxed">
        {/* Case 1: Classified */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <div className="h-6 w-6 bg-black text-white flex items-center justify-center text-xs">A</div>
            <h2>{curr.sec1_title}</h2>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {curr.sec1_p1}
          </p>
          <p className="text-sm font-medium text-slate-600">
            {curr.sec1_p2}
          </p>
          
          <div className="bg-[#f6f6f6] p-4 font-mono text-xs text-black border-l-2 border-[#d1121d] space-y-2">
            <p className="font-extrabold uppercase tracking-wider text-[10px]">{curr.formula_title}</p>
            <p className="font-bold">
              {curr.formula_text}
            </p>
          </div>
        </div>

        {/* Case 2: Unclassified */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <div className="h-6 w-6 bg-black text-white flex items-center justify-center text-xs">B</div>
            <h2>{curr.sec2_title}</h2>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {curr.sec2_p1}
          </p>
          
          <div className="bg-[#f6f6f6] p-5 font-mono text-xs text-black border-l-2 border-black space-y-4">
            <p className="font-black uppercase tracking-widest text-[9px] text-[#d1121d]">{curr.sec2_steps_title}</p>
            
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">{curr.step1_title}</p>
              <p className="bg-white p-2.5 border border-black/10 font-bold">
                {curr.step1_formula}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">{curr.step2_title}</p>
              <p className="bg-white p-2.5 border border-black/10 font-bold">
                {curr.step2_formula}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">{curr.step3_title}</p>
              <p className="bg-white p-2.5 border border-black/10 font-medium text-slate-600">
                {curr.step3_desc}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">{curr.step4_title}</p>
              <p className="bg-white p-2.5 border border-black/10 font-bold">
                {curr.step4_formula}
              </p>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 italic font-medium">
            {curr.sec2_note}
          </p>
        </div>

        {/* Taxes additionnelles */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <Landmark className="h-5 w-5 text-[#d1121d]" />
            <h2>{curr.sec3_title}</h2>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {curr.sec3_p1}
          </p>
          <div className="space-y-4 pt-2 text-xs font-medium text-slate-600">
            <div className="border-b border-black/5 pb-3">
              <h4 className="font-bold text-black text-sm uppercase tracking-wide">{curr.maj1_title}</h4>
              <p className="text-slate-500 mt-1 font-medium">
                {curr.maj1_desc}
              </p>
            </div>
            <div className="border-b border-black/5 pb-3">
              <h4 className="font-bold text-black text-sm uppercase tracking-wide">{curr.maj2_title}</h4>
              <p className="text-slate-500 mt-1 font-medium">
                {curr.maj2_desc}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm uppercase tracking-wide">{curr.maj3_title}</h4>
              <p className="text-slate-500 mt-1 font-medium">
                {curr.maj3_desc}
              </p>
            </div>
          </div>
        </div>

        {/* Exemptions */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <ShieldCheck className="h-5 w-5 text-[#d1121d]" />
            <h2>{curr.sec4_title}</h2>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {curr.sec4_p1}
          </p>
          <ul className="list-decimal pl-5 space-y-2 text-slate-600 text-xs sm:text-sm font-medium">
            <li>{curr.ex_1}</li>
            <li>{curr.ex_2}</li>
            <li>{curr.ex_3}</li>
            <li>{curr.ex_4}</li>
          </ul>
        </div>

        {/* CTA to Calculator (Solid black box) */}
        <div className="bg-black text-white p-6 sm:p-10 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">{curr.cta_title}</h3>
          <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm font-medium">
            {curr.cta_desc}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/calculateur-taxe-de-sejour")}
              className="bg-[#d1121d] hover:bg-white hover:text-black text-white text-xs uppercase tracking-widest font-extrabold py-4 px-8 transition-all inline-flex items-center gap-2 cursor-pointer border border-transparent"
              id="guide-cta-btn"
            >
              <Calculator className="h-4 w-4" />
              <span>{curr.cta_btn}</span>
            </button>
          </div>
        </div>
      </section>

      <AdBanner slotType="bottom" />
    </div>
  );
}
