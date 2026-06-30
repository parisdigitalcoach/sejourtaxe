import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "en" | "de" | "es" | "it" | "zh";

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  nav_home: {
    fr: "Accueil",
    en: "Home",
    de: "Startseite",
    es: "Inicio",
    it: "Home",
    zh: "首页",
  },
  nav_calculator: {
    fr: "Calculateur",
    en: "Calculator",
    de: "Rechner",
    es: "Calculadora",
    it: "Calcolatore",
    zh: "计算器",
  },
  nav_guide: {
    fr: "Comment calculer ?",
    en: "How to calculate?",
    de: "Wie berechnen?",
    es: "How to calculate?",
    it: "Come calcolare?",
    zh: "如何计算？",
  },
  nav_contact: {
    fr: "Contact",
    en: "Contact",
    de: "Kontakt",
    es: "Contacto",
    it: "Contatti",
    zh: "联系我们",
  },
  nav_calculate_btn: {
    fr: "Calculer ma taxe",
    en: "Calculate my tax",
    de: "Steuer berechnen",
    es: "Calcular tasa",
    it: "Calcola tassa",
    zh: "计算我的税费",
  },

  // Hero Section
  hero_title_1: {
    fr: "Avantage",
    en: "Tourist Tax",
    de: "Touristensteuer",
    es: "Tasa de Estancia",
    it: "Tassa di Soggiorno",
    zh: "法国旅游税",
  },
  hero_title_2: {
    fr: "Séjour",
    en: "Calculator France",
    de: "Rechner Frankreich",
    es: "Calculadora Francia",
    it: "Calcolo Francia",
    zh: "智能在线计算器",
  },
  hero_subtitle: {
    fr: "Calculez instantanément la taxe de séjour pour vos locations de vacances, hôtels, gîtes ou chambres d’hôtes en France. Conforme 2026.",
    en: "Instantly calculate the tourist tax for your holiday rentals, hotels, guesthouses or B&Bs in France. Fully compliant with 2026 official regulations.",
    de: "Berechnen Sie sofort die Ortstaxe für Ihre Ferienunterkünfte, Hotels, Gästezimmer oder Pensionen in Frankreich. Konform mit den offiziellen Richtlinien für 2026.",
    es: "Calcule instantáneamente la tasa de estancia para sus alquileres de vacaciones, hoteles, casas rurales o habitaciones de huéspedes en Francia. Conforme a las normativas de 2026.",
    it: "Calcola istantaneamente la tassa di soggiorno per i tuoi affitti turistici, hotel, alloggi vacanze o B&B in Francia. Conforme alle normative ufficiali del 2026.",
    zh: "立即计算您在法国的度假屋、酒店、民宿或客房的旅游税（Taxe de séjour）。完全符合2026年最新官方财税标准。",
  },
  hero_btn_calc: {
    fr: "Calculer ma taxe de séjour",
    en: "Calculate my tourist tax",
    de: "Ortstaxe jetzt berechnen",
    es: "Calcular mi tasa de estancia",
    it: "Calcola la mia tassa di soggiorno",
    zh: "立即开始计算旅游税",
  },
  hero_btn_how: {
    fr: "Comment ça marche ?",
    en: "How does it work?",
    de: "Wie funktioniert es?",
    es: "¿Cómo funciona?",
    it: "Come funziona?",
    zh: "计算原理与规则",
  },

  // Home Page Content
  guide_badge: {
    fr: "Guide de référence",
    en: "Reference Guide",
    de: "Referenzhandbuch",
    es: "Guía de Referencia",
    it: "Guida di Riferimento",
    zh: "官方参考指南",
  },
  guide_title: {
    fr: "Pourquoi calculer et collecter la taxe de séjour ?",
    en: "Why calculate and collect the tourist tax?",
    de: "Warum die Ortstaxe berechnen und erheben?",
    es: "¿Por qué calcular y recaudar la tasa de estancia?",
    it: "Perché calcolare e riscuotere la tassa di soggiorno?",
    zh: "为什么要计算和收取旅游税？",
  },
  why_subtitle: {
    fr: "Une obligation légale pour financer l'attractivité de vos communes.",
    en: "A legal obligation to finance the attractiveness of local municipalities.",
    de: "Eine gesetzliche Verpflichtung zur Finanzierung der touristischen Attraktivität Ihrer Gemeinden.",
    es: "Una obligación legal para financiar el atractivo turístico de sus municipios.",
    it: "Un obbligo di legge per finanziare l'attrattiva turistica dei vostri comuni.",
    zh: "用于资助您所在市镇旅游建设的法定法定义务。",
  },
  why_p1: {
    fr: "La taxe de séjour est un impôt obligatoire reversé à la commune ou à l'EPCI. Elle sert au développement touristique, à la préservation des espaces naturels et aux investissements d'infrastructures locales.",
    en: "The tourist tax is a mandatory local tax paid to the municipality or community. It is dedicated to tourism development, local nature preservation, and regional infrastructure investments.",
    de: "Die Ortstaxe ist eine obligatorische Abgabe, die an die Gemeinde abgeführt wird. Sie dient der Tourismusförderung, dem Schutz von Naturgebieten und Investitionen in die lokale Infrastruktur.",
    es: "La tasa de estancia es un impuesto obligatorio que se abona al municipio. Se destina al desarrollo turístico, la conservación de espacios naturales y las inversiones en infraestructuras locales.",
    it: "La tassa di soggiorno è un'imposta obbligatoria versata al comune. Serve allo sviluppo turistico, alla salvaguardia delle aree naturali e agli investimenti in infrastrutture locali.",
    zh: "旅游税（Taxe de séjour）是向市镇或市镇公共合作组织（EPCI）缴纳的法定税款。它专门用于当地的旅游业发展、自然环境保护以及地方基础设施投资。",
  },
  why_p2: {
    fr: "Chaque hébergeur (ou plateforme automatique comme Airbnb/Booking) doit la calculer avec rigueur pour éviter tout redressement fiscal local.",
    en: "Each host (or automatic booking platform like Airbnb or Booking.com) must calculate it rigorously to avoid any local tax reassessment or audit.",
    de: "Jeder Gastgeber (oder automatische Buchungsplattformen wie Airbnb/Booking) muss diese genau berechnen, um lokale Steuernachzahlungen zu vermeiden.",
    es: "Cada anfitrión (o plataforma de reservas automática como Airbnb/Booking) debe calcularla rigurosamente para evitar inspecciones fiscales locales.",
    it: "Ogni host (o piattaforma di prenotazione automatica come Airbnb/Booking) deve calcolarla con rigore per evitare accertamenti fiscali locali.",
    zh: "每位房东（或像 Airbnb/Booking 等自动代扣代缴平台）都必须精确计算该税费，以避免引起地方税务部门的审计或补税罚款。",
  },
  why_btn: {
    fr: "Consulter la notice de calcul complète",
    en: "Read full calculation notice",
    de: "Vollständige Berechnungsmethode lesen",
    es: "Consultar la guía de cálculo completa",
    it: "Consultare la guida al calcolo completa",
    zh: "查看完整的计算公式说明",
  },

  // 3 Rules
  rules_title: {
    fr: "Les 3 règles indispensables",
    en: "The 3 essential rules",
    de: "Die 3 wichtigsten Regeln",
    es: "Las 3 reglas fundamentales",
    it: "Le 3 regole fondamentali",
    zh: "三大核心征税规则",
  },
  rule1_tag: {
    fr: "Règle 01",
    en: "Rule 01",
    de: "Regel 01",
    es: "Regla 01",
    it: "Regola 01",
    zh: "规则 01",
  },
  rule1_title: {
    fr: "Exonération des mineurs",
    en: "Exemption for minors",
    de: "Befreiung für Minderjährige",
    es: "Exención para menores",
    it: "Esenzione per i minori",
    zh: "未成年人免税",
  },
  rule1_desc: {
    fr: "Seuls les adultes paient. Les mineurs (moins de 18 ans) sont exonérés mais font partie du diviseur pour le calcul des meublés non classés.",
    en: "Only adults pay. Minors (under 18) are fully exempt but are included in the denominator for calculating unclassified rentals.",
    de: "Nur Erwachsene zahlen. Minderjährige (unter 18 Jahren) sind befreit, zählen jedoch als Teiler bei der Berechnung unklassifizierter Unterkünfte.",
    es: "Solo pagan los adultos. Los menores (menos de 18 años) están exentos pero forman parte del divisor para el cálculo de alojamientos no clasificados.",
    it: "Solo gli adulti pagano. I minori (sotto i 18 anni) sono esenti ma sono inclusi nel divisore per il calcolo degli alloggi non classificati.",
    zh: "仅限成年人（18岁及以上）缴税。未成年人免税，但在计算未评星级度假屋（按比例计算）时，他们需要作为分母人数来分摊每晚房费成本。",
  },
  rule2_tag: {
    fr: "Règle 02",
    en: "Rule 02",
    de: "Regel 02",
    es: "Regla 02",
    it: "Regola 02",
    zh: "规则 02",
  },
  rule2_title: {
    fr: "Tarif fixe pour classés",
    en: "Fixed rate for classified",
    de: "Festtarif für klassifizierte",
    es: "Tarifa fija para clasificados",
    it: "Tariffa fissa per classificati",
    zh: "评星级住所固定税率",
  },
  rule2_desc: {
    fr: "Les hôtels et gîtes avec étoiles (1 à 5) se voient appliquer un barème fixe voté par la collectivité locale par adulte et par nuit.",
    en: "Hotels and guesthouses with star ratings (1 to 5 stars) are subject to a fixed rate voted by the local municipality per adult per night.",
    de: "Für Hotels und Unterkünfte mit Sternen (1 bis 5) gilt ein fester Tarif, der von der örtlichen Gemeinde pro Erwachsenem und Nacht beschlossen wird.",
    es: "Los hoteles y alojamientos con estrellas (1 a 5) tienen una tarifa fija aprobada por el municipio por adulto y noche.",
    it: "Gli hotel e gli alloggi con stelle (da 1 a 5) sono soggetti a una tariffa fissa stabilita dal comune per adulto e per notte.",
    zh: "已获得官方评星级（1星级至5星级）的酒店、民宿或别墅，适用由当地市镇议会投票决定的固定每人每晚税费标准。",
  },
  rule3_tag: {
    fr: "Règle 03",
    en: "Rule 03",
    de: "Regel 03",
    es: "Regla 03",
    it: "Regola 03",
    zh: "规则 03",
  },
  rule3_title: {
    fr: "Proportionnel pour non classés",
    en: "Proportional for unclassified",
    de: "Prozentual für unklassifizierte",
    es: "Proporcional para no clasificados",
    it: "Proporzionale per non classificati",
    zh: "未评星级住所比例税率",
  },
  rule3_desc: {
    fr: "Les meublés sans étoiles sont taxés à un pourcentage (%) du prix HT de la nuitée par occupant, dans la limite du plafond légal local.",
    en: "Unclassified holiday rentals are taxed at a percentage (%) of the price per night per occupant (excluding tax), capped at the local legal limit.",
    de: "Unterkünfte ohne Sterne werden mit einem Prozentsatz (%) des Netto-Übernachtungspreises pro Gast besteuert, begrenzt auf die lokale gesetzliche Obergrenze.",
    es: "Los alojamientos sin estrellas pagan un porcentaje (%) sobre el precio neto de la noche por ocupante, con el límite del tope legal local.",
    it: "Gli alloggi senza stelle sono tassati con una percentuale (%) sul prezzo notte a persona (escluse le tasse), entro il limite massimo locale.",
    zh: "未评定星级的房屋按照每晚不含税房费除以总人数，再乘以市镇比例（通常为 1% 至 5%）进行计算，且不超过法定的最高上限。",
  },

  // Grid Info Blocks
  block_a_title: {
    fr: "Simulateur en ligne",
    en: "Online Simulator",
    de: "Online-Simulator",
    es: "Simulador en línea",
    it: "Simulatore online",
    zh: "在线模拟器",
  },
  block_a_desc: {
    fr: "Effectuez des simulations pour vos hébergements classés ou non classés, incluant les taxes départementales, régionales d'Île-de-France et la re-ventilation par voyageur.",
    en: "Perform simulations for your classified or unclassified accommodations, including departmental taxes, Île-de-France regional taxes, and breakdown per traveler.",
    de: "Führen Sie Simulationen für Ihre klassifizierten oder unklassifizierten Unterkünfte durch, einschließlich Departement-Abgaben, Regionalsteuern in Île-de-France und detaillierter Aufschlüsselung.",
    es: "Realice simulaciones para sus alojamientos clasificados o no clasificados, incluyendo las tasas departamentales, regionales de Isla de Francia y el desglose por viajero.",
    it: "Effettua simulazioni per i tuoi alloggi classificati o non classificati, incluse le tasse provinciali, regionali dell'Île-de-France e la ripartizione per viaggiatore.",
    zh: "针对您已评星级或未评星级的住所进行快捷模拟，涵盖省附加税、巴黎大区（Île-de-France）公共交通附加税及按每位游客的分摊明细。",
  },
  block_a_btn: {
    fr: "Lancer le simulateur",
    en: "Launch simulator",
    de: "Simulator starten",
    es: "Iniciar simulador",
    it: "Avvia il simulatore",
    zh: "立即运行模拟",
  },
  block_b_title: {
    fr: "Formules et Textes Légaux",
    en: "Formulas and Legal Texts",
    de: "Formeln und Gesetzestexte",
    es: "Fórmulas y Textos Legales",
    it: "Formule e Testi di Legge",
    zh: "税费计算公式与法规",
  },
  block_b_desc: {
    fr: "Consultez les textes légaux, les décrets du code général des collectivités territoriales, et découvrez comment chaque taxe additionnelle s'ajoute à la formule.",
    en: "Consult the legal texts, decrees of the general code of local authorities, and discover how each additional tax is added to the formula.",
    de: "Konsultieren Sie die Gesetze und Dekrete der Kommunalbehörden und erfahren Sie, wie die einzelnen Zusatzabgaben zur Formel hinzugerechnet werden.",
    es: "Consulte los textos legales, los decretos de las entidades locales y descubra cómo se añade cada tasa adicional a la fórmula de cálculo.",
    it: "Consulta i testi di legge, i decreti degli enti locali e scopri come ogni tassa aggiuntiva viene calcolata nella formula.",
    zh: "查阅法国地方行政法典中的法定条文及政令，详细了解各种省、大区级附加税是如何加入最终税费公式的。",
  },
  block_b_btn: {
    fr: "Lire le guide fiscal",
    en: "Read tax guide",
    de: "Steuerberater-Leitfaden",
    es: "Leer guía fiscal",
    it: "Leggi guida fiscale",
    zh: "阅读财税政策指南",
  },

  // Calculator Form
  form_title: {
    fr: "Paramètres du Séjour",
    en: "Stay Parameters",
    de: "Aufenthaltsparameter",
    es: "Parámetros de la Estancia",
    it: "Parametri del Soggiorno",
    zh: "税费计算参数设置",
  },
  form_reset: {
    fr: "Réinitialiser",
    en: "Reset",
    de: "Zurücksetzen",
    es: "Restablecer",
    it: "Reimposta",
    zh: "重置输入",
  },
  field_commune: {
    fr: "Commune ou Code Postal",
    en: "Municipality or Postal Code",
    de: "Gemeinde oder Postleitzahl",
    es: "Municipio o Código Postal",
    it: "Comune o Codice Postale",
    zh: "输入市镇名称或邮编",
  },
  field_commune_placeholder: {
    fr: "Ex: Paris, Strasbourg, Nice...",
    en: "E.g., Paris, Strasbourg, Nice...",
    de: "Z.B. Paris, Straßburg, Nizza...",
    es: "Ej: París, Estrasburgo, Niza...",
    it: "Es: Parigi, Strasburgo, Nizza...",
    zh: "例如：Paris, Nice, 75001...",
  },
  field_type: {
    fr: "Type d'établissement",
    en: "Type of establishment",
    de: "Unterkunftsart",
    es: "Tipo de establecimiento",
    it: "Tipo di struttura",
    zh: "房源或宿处类型",
  },
  field_rating: {
    fr: "Classement officiel",
    en: "Official rating",
    de: "Offizielle Klassifizierung",
    es: "Clasificación oficial",
    it: "Classificazione ufficiale",
    zh: "官方评星等级",
  },
  field_non_classe: {
    fr: "Non classé (Proportionnel)",
    en: "Unclassified (Proportional)",
    de: "Nicht klassifiziert (Prozentual)",
    es: "No clasificado (Proporcional)",
    it: "Non classificato (Proporzionale)",
    zh: "未评星级（按比例计算）",
  },
  card_occupants_title: {
    fr: "Hébergement & Occupants",
    en: "Accommodation & Occupants",
    de: "Unterkunft & Gäste",
    es: "Alojamiento y Ocupantes",
    it: "Alloggio e Ospiti",
    zh: "住宿与旅客详情",
  },
  field_rent_ht: {
    fr: "Loyer total HT (€)",
    en: "Total Rent excl. tax (€)",
    de: "Gesamtmiete ohne Steuer (€)",
    es: "Alquiler total sin IVA (€)",
    it: "Affitto totale escluse tasse (€)",
    zh: "每晚总租金不含税价 (€)",
  },
  field_rent_ht_desc: {
    fr: "Nécessaire pour le calcul proportionnel de taxe meublés non classés de la commune.",
    en: "Necessary for the proportional calculation of unclassified holiday rental taxes of the municipality.",
    de: "Erforderlich für die prozentuale Steuerberechnung nicht klassifizierter Ferienunterkünfte der Gemeinde.",
    es: "Necesario para el cálculo proporcional de la tasa de alojamientos no clasificados del municipio.",
    it: "Necessario per il calcolo proporzionale delle tasse sugli affitti turistici non classificati del comune.",
    zh: "用于计算该市镇未评星级住处的比例税率时必填的基础房费价格。",
  },
  field_adults: {
    fr: "Adultes (18 ans et plus)",
    en: "Adults (18 years and older)",
    de: "Erwachsene (ab 18 Jahren)",
    es: "Adultos (18 años o más)",
    it: "Adulti (18 anni o più)",
    zh: "成年人数（18岁及以上）",
  },
  field_children: {
    fr: "Enfants (Moins de 18 ans)",
    en: "Children (Under 18 years)",
    de: "Kinder (unter 18 Jahren)",
    es: "Niños (Menores de 18 años)",
    it: "Bambini (Minori di 18 anni)",
    zh: "未成年人数（18岁以下，完全免税）",
  },
  field_nights: {
    fr: "Nombre de nuits du séjour",
    en: "Number of nights of the stay",
    de: "Anzahl der Übernachtungen",
    es: "Número de noches de estancia",
    it: "Numero di notti del soggiorno",
    zh: "入住晚数",
  },
  card_tax_details_title: {
    fr: "Détail des barèmes fiscaux applicables",
    en: "Details of applicable tax rates",
    de: "Details zu den anwendbaren Steuertarifen",
    es: "Detalle de los tipos impositivos aplicables",
    it: "Dettaglio delle aliquote fiscali applicabili",
    zh: "适用法定征税细则详情",
  },
  field_fixed_rate_label: {
    fr: "Taux fixe (€ / nuit)",
    en: "Fixed rate (€ / night)",
    de: "Festtarif (€ / Nacht)",
    es: "Tarifa fija (€ / noche)",
    it: "Tariffa fissa (€ / notte)",
    zh: "每晚固定税率 (€ / 人 / 晚)",
  },
  field_pct_rate_label: {
    fr: "Taux pourcentage",
    en: "Percentage rate",
    de: "Prozentsatz",
    es: "Porcentaje de tasa",
    it: "Aliquota percentuale",
    zh: "折算比例百分数 (%)",
  },
  field_ceiling_label: {
    fr: "Plafond légal (€)",
    en: "Legal ceiling (€)",
    de: "Gesetzliche Höchstgrenze (€)",
    es: "Tope máximo legal (€)",
    it: "Massimo di legge (€)",
    zh: "法定最高封顶价 (€)",
  },
  field_dep_tax_label: {
    fr: "Taxe dép. (CD)",
    en: "Dept. Tax (CD)",
    de: "Departement-Steuer",
    es: "Tasa departamental",
    it: "Tassa provinciale",
    zh: "省附加税率",
  },
  field_reg_tax_label: {
    fr: "Taxe rég.",
    en: "Reg. Tax",
    de: "Regionalsteuer",
    es: "Tasa regional",
    it: "Tassa regionale",
    zh: "大区附加税率",
  },
  field_trans_tax_label: {
    fr: "Taxe transport",
    en: "Transit Tax",
    de: "Nahverkehrssteuer",
    es: "Tasa de transporte",
    it: "Tassa trasporti",
    zh: "巴黎大区交通附加税",
  },
  tax_autofill_notice: {
    fr: "Les taux réglementaires locaux ont été automatiquement pré-remplis pour la commune de",
    en: "Local regulatory tax rates have been automatically pre-filled for the municipality of",
    de: "Die lokalen Steuertarife wurden automatisch ausgefüllt für die Gemeinde",
    es: "Los tipos impositivos locales han sido rellenados automáticamente para el municipio de",
    it: "Le aliquote fiscali locali sono state precompilate automaticamente per il comune di",
    zh: "上述税费标准已根据您选择的以下城市自动读取并预填：",
  },

  // Calculator Result
  result_card_title: {
    fr: "ESTIMATION DE LA TAXE DE SÉJOUR",
    en: "TOURIST TAX ESTIMATION",
    de: "BERECHNUNG DER ORTSTAXE",
    es: "ESTIMACIÓN DE LA TASA DE ESTANCIA",
    it: "STIMA DELLA TASSA DI SOGGIORNO",
    zh: "旅游税模拟计算结果明细",
  },
  result_total: {
    fr: "TAXE DE SÉJOUR TOTALE À COLLECTER",
    en: "TOTAL TOURIST TAX TO BE COLLECTED",
    de: "GESAMT ZU ERHEBENDE ORTSTAXE",
    es: "TASA DE ESTANCIA TOTAL A RECAUDAR",
    it: "TASSA DI SOGGIORNO TOTALE DA RISCUOTERE",
    zh: "应代扣代缴的旅游税总计",
  },
  result_per_adult: {
    fr: "Soit un tarif final par adulte et par nuitée de",
    en: "Equivalent to a final rate per adult per night of",
    de: "Dies entspricht einem Endtarif pro Erwachsenem und Nacht von",
    es: "Equivalente a una tarifa final por adulto y noche de",
    it: "Equivalente a una tariffa finale per adulto per notte di",
    zh: "相当于折合每位成年人每晚的净税额为：",
  },
  result_details: {
    fr: "Détail de la ventilation des taxes",
    en: "Breakdown of individual taxes",
    de: "Aufschlüsselung der einzelnen Abgaben",
    es: "Desglose de las tasas individuales",
    it: "Ripartizione delle singole tasse",
    zh: "各项税款分摊占比明细",
  },
  res_base: {
    fr: "Taxe de séjour de base (Part Communale)",
    en: "Base tourist tax (Municipal Share)",
    de: "Basis-Ortstaxe (Gemeindeanteil)",
    es: "Tasa de estancia base (Parte Municipal)",
    it: "Tassa di soggiorno base (Quota Comunale)",
    zh: "基础旅游税 (市镇所得部分)",
  },
  res_dep: {
    fr: "Taxe additionnelle Départementale",
    en: "Additional Departmental Tax",
    de: "Zusätzliche Departement-Steuer",
    es: "Tasa adicional departamental",
    it: "Tassa addizionale provinciale",
    zh: "省级附加税 (10% Département)",
  },
  res_reg: {
    fr: "Taxe additionnelle Régionale",
    en: "Additional Regional Tax",
    de: "Zusätzliche Regionalsteuer",
    es: "Tasa adicional regional",
    it: "Tassa addizionale regionale",
    zh: "大区附加税 (15% Région)",
  },
  res_trans: {
    fr: "Taxe additionnelle Transport (Île-de-France)",
    en: "Additional Transit Tax (Grand Paris / Île-de-France)",
    de: "Zusätzliche Nahverkehrssteuer (Paris / Île-de-France)",
    es: "Tasa de transporte adicional (París / Isla de Francia)",
    it: "Tassa trasporti addizionale (Parigi / Île-de-France)",
    zh: "交通附加税 (200% 巴黎大区公交专款)",
  },
  summary_title: {
    fr: "Récapitulatif de la simulation",
    en: "Simulation Summary",
    de: "Zusammenfassung der Berechnung",
    es: "Resumen de la simulación",
    it: "Riepilogo della simulazione",
    zh: "模拟条件概览",
  },
  summary_nights: {
    fr: "nuits",
    en: "nights",
    de: "Nächte",
    es: "noches",
    it: "notti",
    zh: "晚",
  },
  btn_pdf: {
    fr: "Exporter le justificatif PDF",
    en: "Export PDF Certificate",
    de: "PDF-Nachweis exportieren",
    es: "Exportar justificante PDF",
    it: "Esporta certificato PDF",
    zh: "导出 PDF 官方计算证明",
  },
  btn_share: {
    fr: "Partager l'estimation",
    en: "Share Estimation",
    de: "Berechnung teilen",
    es: "Compartir estimación",
    it: "Condividi preventivo",
    zh: "分享当前计算参数",
  },

  // Formulation Title
  formulation_title: {
    fr: "Formulation Étape par Étape",
    en: "Step-by-Step Formula Breakdown",
    de: "Schritt-für-Schritt-Formelaufschlüsselung",
    es: "Fórmulas desglosadas paso a paso",
    it: "Formula Dettagliata Passo dopo Passo",
    zh: "官方财税公式逐步分解说明",
  },
  legal_notice_title: {
    fr: "Notice d'usage légal",
    en: "Legal Usage Notice",
    de: "Rechtshinweis",
    es: "Aviso de uso legal",
    it: "Avviso di utilizzo legale",
    zh: "法定免责及使用须知",
  },
  legal_notice_text: {
    fr: "Cette estimation est fournie à titre indicatif selon les barèmes 2026 officiels transmis par la DGFIP. Seule la délibération de votre collectivité locale fait foi en cas de litige fiscal.",
    en: "This estimation is provided for informational purposes based on the official 2026 tax tables released by the French Ministry of Public Finances (DGFIP). Only the official decrees of your local municipality are legally binding in case of tax disputes.",
    de: "Diese Berechnung dient nur als Richtwert auf der Grundlage der offiziellen Steuertabellen für 2026 des französischen Finanzministeriums (DGFIP). Im Falle von Steuerstreitigkeiten sind allein die Beschlüsse Ihrer örtlichen Gemeinde rechtsverbindlich.",
    es: "Esta estimación se proporciona a título informativo sobre la base de las tablas fiscales oficiales de 2026 publicadas por la Hacienda francesa (DGFIP). En caso de litigio, solo tendrán validez legal los decretos del municipio.",
    it: "Questa stima è fornita a scopo puramente informativo sulla base delle tabelle fiscali ufficiali del 2026 rilasciate dal ministero delle finanze francese (DGFIP). Solo le delibere del comune di appartenenza hanno valore legale in caso di controversie.",
    zh: "本模拟计算器提供的数据是根据法国财政部 (DGFIP) 发布的2026年最新官方税率表进行估算，仅供参考。如有税务纠纷，应以当地市镇议会颁布的官方决议文件为准。",
  },
  footer_desc: {
    fr: "Outil indépendant et gratuit de calcul de la taxe de séjour en France pour tous types d'hébergements (gîtes, meublés de tourisme, hôtels, campings). Conforme aux barèmes officiels de l'État en vigueur en 2026.",
    en: "Independent and free tool to calculate the tourist tax in France for all types of accommodation (cottages, holiday rentals, hotels, campsites). Fully compliant with official 2026 regulations.",
    de: "Unabhängiges und kostenloses Tool zur Berechnung der Kurtaxe in Frankreich für alle Unterkunftsarten (Ferienhäuser, Ferienwohnungen, Hotels, Campingplätze). Konform mit den offiziellen Richtlinien für 2026.",
    es: "Herramienta independiente y gratuita para calcular la tasa de estancia en Francia para todo tipo de alojamientos (casas rurales, alquileres vacacionales, hoteles, campings). Conforme a las normativas oficiales de 2026.",
    it: "Strumento indipendente e gratuito per il calcolo della tassa di soggiorno in Francia per tutte le tipologie di alloggio (case vacanze, affitti turistici, hotel, campeggi). Conforme alle tariffe ufficiali del 2026.",
    zh: "法国旅游税（Taxe de séjour）独立免费在线计算工具，适用于各类房源及宿处（如度假屋、民宿、酒店、露营地）。完全符合2026年最新官方财税标准。",
  },
  footer_nav_title: {
    fr: "Navigation",
    en: "Navigation",
    de: "Navigation",
    es: "Navegación",
    it: "Navigazione",
    zh: "网站导航",
  },
  footer_legal_title: {
    fr: "Légal & RGPD",
    en: "Legal & GDPR",
    de: "Rechtliches & DSGVO",
    es: "Aviso Legal y RGPD",
    it: "Legale & RGPD",
    zh: "法律条款与RGPD隐私规制",
  },
  footer_cookies_choices_title: {
    fr: "Vos choix de traceurs",
    en: "Your Tracker Choices",
    de: "Ihre Tracker-Auswahl",
    es: "Sus elecciones de rastreadores",
    it: "Le tue scelte sui traccianti",
    zh: "Cookie及追踪器管理选择",
  },
  footer_cookies_choices_desc: {
    fr: "Conformément à la réglementation RGPD, vous disposez d'un droit complet de contrôle et de modification des traceurs que nous utilisons pour le bon fonctionnement et le financement du site.",
    en: "In accordance with GDPR regulations, you have a complete right to control and modify the trackers we use for the proper functioning and financing of the site.",
    de: "Gemäß den DSGVO-Richtlinien haben Sie das volle Recht, die von uns verwendeten Tracker für das ordnungsgemäße Funktionieren und die Finanzierung der Website zu kontrollieren und zu ändern.",
    es: "De conformidad con el reglamento RGPD, tiene pleno derecho a controlar y modificar los rastreadores que utilizamos para el correcto funcionamiento y financiación del sitio web.",
    it: "In conformità con il regolamento RGPD, hai il pieno diritto di controllare e modificare i traccianti che utilizziamo per il corretto funzionamento et le financement du site.",
    zh: "根据欧盟通用数据保护条例 (RGPD/GDPR)，您对本网站用于维持运行和资金支持的追踪器 (Cookies) 拥有完全的知情、选择、拒绝及随时修改的权利。",
  },
  footer_cookies_btn: {
    fr: "Gérer mes cookies",
    en: "Manage my cookies",
    de: "Meine Cookies verwalten",
    es: "Gestionar mis cookies",
    it: "Gestisci i miei cookie",
    zh: "管理我的个性化Cookie设置",
  },
  footer_warning: {
    fr: "Avertissement : Ce simulateur fournit des estimations indicatives. Bien que nous appliquions rigoureusement les barèmes légaux, vérifiez toujours les tarifs officiels applicables dans votre commune directement sur le portail de l'État français.",
    en: "Warning: This simulator provides indicative estimates. Although we rigorously apply the legal rates, always check the official rates applicable in your municipality directly on the official French state portal.",
    de: "Warnung: Dieser Simulator liefert Richtwerte. Obwohl wir die gesetzlichen Tarife streng anwenden, überprüfen Sie bitte die für Ihre Gemeinde geltenden offiziellen Sätze direkt auf dem Portal des französischen Staates.",
    es: "Advertencia: Este simulador proporciona estimaciones indicativas. Aunque aplicamos rigoureusement les barèmes légaux, vérifiez toujours les tarifs officiels applicables dans votre commune directement sur le portail de l'État français.",
    it: "Avvertenza: Questo simulatore fornisce stime indicative. Sebbene applichiamo rigorosamente le tariffe legali, verifica sempre le tariffe ufficiali applicabili nel tuo comune direttamente sul portale ufficiale dello Stato francese.",
    zh: "重要声明：本模拟器提供的数据仅供参考。尽管เรา严格依照官方财税标准进行算法升级，但各省市细则更新频繁，请务必直接在法国政府官方网站上核实您所在城市的最新法定税率。",
  },
  footer_gov_rates_btn: {
    fr: "Tarifs officiels de l'État",
    en: "Official State Rates",
    de: "Offizielle staatliche Tarife",
    es: "Tarifas oficiales del Estado",
    it: "Tariffe ufficiali dello Stato",
    zh: "法国政府官方税率查询 ↗",
  },
  footer_rights: {
    fr: "Tous droits réservés.",
    en: "All rights reserved.",
    de: "Alle Rechte vorbehalten.",
    es: "Todos los derechos reservados.",
    it: "Tutti i diritti riservati.",
    zh: "保留所有权利。",
  },
  footer_developed: {
    fr: "Développé avec professionnalisme pour les hébergeurs français",
    en: "Developed with professionalism for French hosts",
    de: "Mit Professionalität für französische Gastgeber entwickelt",
    es: "Desarrollado con profesionalismo para los anfitriones franceses",
    it: "Sviluppato con professionalità per gli host francesi",
    zh: "匠心打造，为法国广大房东和旅宿业经营者提供最优质的计税服务",
  },
  nav_privacy: {
    fr: "Confidentialité",
    en: "Privacy Policy",
    de: "Datenschutz",
    es: "Privacidad",
    it: "Privacy",
    zh: "隐私政策",
  },
  nav_cookies: {
    fr: "Cookies (RGPD)",
    en: "Cookies (GDPR)",
    de: "Cookies (DSGVO)",
    es: "Cookies (RGPD)",
    it: "Cookies (RGPD)",
    zh: "Cookie设置与政策",
  },
  nav_legal: {
    fr: "Mentions légales",
    en: "Legal Notice",
    de: "Impressum",
    es: "Aviso Legal",
    it: "Note Legali",
    zh: "法律声明",
  },
  nav_sitemap: {
    fr: "Plan du site",
    en: "Sitemap",
    de: "Sitemap",
    es: "Mapa del sitio",
    it: "Mappa del sito",
    zh: "网站地图",
  },
  cookie_banner_title: {
    fr: "Gestion des Cookies (RGPD)",
    en: "Cookie Management (GDPR)",
    de: "Cookie-Verwaltung (DSGVO)",
    es: "Gestión de Cookies (RGPD)",
    it: "Gestione dei Cookie (RGPD)",
    zh: "Cookie个性化选择 (RGPD/GDPR)",
  },
  cookie_banner_desc: {
    fr: "Nous utilisons des cookies pour améliorer votre expérience, mesurer l'audience et afficher des publicités personnalisées. Vous pouvez accepter, refuser ou personnaliser vos préférences à tout moment.",
    en: "We use cookies to improve your experience, measure audience size, and display personalized advertisements. You can accept, reject, or customize your preferences at any time.",
    de: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, die Besucherzahlen zu messen und personalisierte Werbung anzuzeigen. Sie können Ihre Einstellungen jederzeit akzeptieren, ablehnen oder anpassen.",
    es: "Utilizamos cookies para mejorar su experiencia, medir la audiencia y mostrar anuncios personalizados. Puede aceptar, rechazar o personalizar sus preferencias en cualquier momento.",
    it: "Utilizziamo i cookie per migliorare la tua esperienza, misurare l'audience e mostrare pubblicità personalizzate. Puoi accettare, rifiutare o personalizzare le tue preferenze in qualsiasi momento.",
    zh: "为了提升您的体验并支撑免费计算器的运行，我们使用Cookies收集访问量并展示高相关的精准广告。您可以同意、拒绝，或自定义您的偏好设置。",
  },
  cookie_btn_customize: {
    fr: "Personnaliser",
    en: "Customize",
    de: "Anpassen",
    es: "Personalizar",
    it: "Personalizza",
    zh: "⚙ 自定义设置",
  },
  cookie_btn_refuse: {
    fr: "Refuser",
    en: "Reject All",
    de: "Ablehnen",
    es: "Rechazar todo",
    it: "Rifiuta tutto",
    zh: "❌ 全部拒绝",
  },
  cookie_btn_accept: {
    fr: "Accepter tout",
    en: "Accept All",
    de: "Alle akzeptieren",
    es: "Aceptar todo",
    it: "Accetta tout",
    zh: "✅ 同意并接受",
  },
  cookie_modal_title: {
    fr: "Personnaliser mes préférences",
    en: "Customize my preferences",
    de: "Meine Präferenzen anpassen",
    es: "Personalizar mis préférences",
    it: "Personalizza le mie preferenze",
    zh: "自定义您的Cookies使用偏好",
  },
  cookie_modal_desc: {
    fr: "Nous respectons votre vie privée. Ajustez ci-dessous vos consentements concernant les cookies utilisés sur notre plateforme SejourTaxe.com.",
    en: "We respect your privacy. Adjust your consent below regarding the cookies used on our SejourTaxe.com platform.",
    de: "Wir respektieren Ihre Privatsphäre. Passen Sie unten Ihre Einwilligung bezüglich der auf unserer Plattform SejourTaxe.com verwendeten Cookies an.",
    es: "Respetamos su privacidad. Ajuste a continuación sus consentimientos sobre las cookies utilizadas en nuestra plataforma SejourTaxe.com.",
    it: "Rispettiamo la tua privacy. Regola qui sotto il tuo consenso in merito ai cookie utilizzati sulla nostra piattaforma SejourTaxe.com.",
    zh: "我们非常尊重并保护您的隐私。您可以在下方自主勾选并确认是否启用各类Cookies追踪。",
  },
  cookie_cat_necessary_title: {
    fr: "Cookies strictly necessary",
    en: "Strictly necessary cookies",
    de: "Unbedingt erforderliche Cookies",
    es: "Cookies strictly necessary",
    it: "Cookie strettamente necessari",
    zh: "核心必要运行类 Cookies",
  },
  cookie_cat_necessary_status: {
    fr: "Toujours activés",
    en: "Always active",
    de: "Immer aktiv",
    es: "Siempre activadas",
    it: "Sempre attivi",
    zh: "系统必选 (默认开启)",
  },
  cookie_cat_necessary_desc: {
    fr: "Ces cookies sont indispensables au bon fonctionnement du site, comme la persistance de votre session de calcul et l'enregistrement de vos préférences de consentement. Ils ne stockent aucune donnée personnelle.",
    en: "These cookies are essential for the proper functioning of the site, such as persisting your calculation session and saving your consent preferences. They do not store any personal data.",
    de: "Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich, z. B. für die Aufrechterhaltung Ihrer Berechnungssitzung und das Speichern Ihrer Einwilligungseinstellungen. Sie speichern keine personenbezogenen Daten.",
    es: "Estas cookies son esenciales para el correcto funcionamiento del sitio web, como mantener su sesión de cálculo y guardar sus preferencias de consentimiento. No almacenan ningún dato personal.",
    it: "Questi cookie sono essenziali per il corretto funzionamento del sito, come il mantenimento della sessione di calcolo e il salvataggio delle tue preferenze di consenso. Non memorizzano alcun dato personale.",
    zh: "此类Cookies对计算器的数学运算、会话状态保持以及保存您的Cookie偏好记录至关重要。其不收集且不存储任何个人标识信息。",
  },
  cookie_cat_analytics_title: {
    fr: "Cookies analytiques",
    en: "Analytical cookies",
    de: "Analytische Cookies",
    es: "Cookies analíticas",
    it: "Cookie analitici",
    zh: "统计与访问量分析 Cookies",
  },
  cookie_cat_analytics_desc: {
    fr: "Utilisé par Google Analytics. Ces cookies nous permettent de mesurer l'audience de notre site, d'analyser l'utilisation générale et d'améliorer continuellement l'expérience d'utilisation de nos outils de calcul.",
    en: "Used by Google Analytics. These cookies allow us to measure our site's audience, analyze general usage, and continuously improve the user experience of our calculation tools.",
    de: "Verwendet von Google Analytics. Diese Cookies ermöglichen es uns, die Besucherzahlen unserer Website zu messen, die allgemeine Nutzung zu analysieren und die Benutzererfahrung unserer Berechnungstools kontinuierlich zu verbessern.",
    es: "Utilizado por Google Analytics. Estas cookies nos permiten medir la audiencia de nuestro sitio, analizar el uso general y mejorar continuamente la experiencia de usuario de nuestras herramientas de cálculo.",
    it: "Utilizzato da Google Analytics. Questi cookie ci consentono di misurare l'audience del nostro site, analizzare l'uso générale et d'améliorer continuellement l'expérience d'utilisation de nos outils de calcul.",
    zh: "基于谷歌统计 (Google Analytics)。通过匿名且脱敏的聚合统计（如访问量、平均停留时长等），帮助我们发现系统Bug并改进计算页面体验。",
  },
  cookie_cat_marketing_title: {
    fr: "Cookies marketing & ciblage",
    en: "Marketing & targeting cookies",
    de: "Marketing- und Targeting-Cookies",
    es: "Cookies de marketing y publicidad",
    it: "Cookie di marketing e targeting",
    zh: "个性化广告与营销 Cookies",
  },
  cookie_cat_marketing_desc: {
    fr: "Utilisé par Google Ads (AdSense) et Google Tag Manager. Ces cookies permettent d'afficher des annonces publicitaires personnalisées de qualité qui soutiennent le financement et la gratuité de notre site.",
    en: "Used by Google Ads (AdSense) and Google Tag Manager. These cookies allow us to display high-quality personalized advertisements that support the funding and free access of our site.",
    de: "Verwendet von Google Ads (AdSense) und Google Tag Manager. Diese Cookies ermöglichen die Anzeige hochwertiger, personalisierter Werbung, die die Finanzierung und den kostenlosen Zugang unserer Website unterstützt.",
    es: "Utilizado por Google Ads (AdSense) and Google Tag Manager. Estas cookies permiten mostrar anuncios publicitarios personalizados que ayudan a financiar y mantener gratis el sitio web.",
    it: "Utilizzato da Google Ads (AdSense) e Google Tag Manager. Questi cookie consentono di visualizzare annunci pubblicitari personalizzati que soutiennent le financement et la gratuité de notre site.",
    zh: "基于谷歌广告 (Google AdSense & GTM)。通过向您推荐安全有保障且符合您潜在兴趣的优质广告，来支持本计算器的持续开发与免费运营。",
  },
  cookie_save_btn: {
    fr: "Enregistrer mes choix",
    en: "Save my choices",
    de: "Meine Auswahl speichern",
    es: "Guardar mis opciones",
    it: "Salva le mie scelte",
    zh: "保存偏好并确认",
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("fr");

  // Read language from URL on initialization or LocalStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang") as Language;
    
    if (urlLang && ["fr", "en", "de", "es", "it", "zh"].includes(urlLang)) {
      setLanguageState(urlLang);
    } else {
      try {
        const storedLang = localStorage.getItem("app_lang") as Language;
        if (storedLang && ["fr", "en", "de", "es", "it", "zh"].includes(storedLang)) {
          setLanguageState(storedLang);
        }
      } catch (e) {
        // Safe fallback in sandbox
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("app_lang", lang);
    } catch (e) {
      // Safe fallback
    }

    // Dynamic url update without reloading
    const params = new URLSearchParams(window.location.search);
    params.set("lang", lang);
    const newRelativePathQuery = window.location.pathname + "?" + params.toString();
    window.history.pushState(null, "", newRelativePathQuery);

    // Refresh SEO headers for appropriate language
    window.dispatchEvent(new Event("languagechange"));
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      return key;
    }
    return translations[key][language] || translations[key]["fr"];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageConsentProvider");
  }
  return context;
};
