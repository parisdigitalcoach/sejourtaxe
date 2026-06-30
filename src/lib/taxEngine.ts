import { TaxConfig, TaxInput, TaxCalculationResult, CalculationStep } from "../types";

const stepLocales: Record<string, Record<string, string>> = {
  insufficient_data: {
    fr: "Données insuffisantes",
    en: "Insufficient data",
    de: "Unzureichende Daten",
    es: "Datos insuficientes",
    it: "Dati insufficienti",
    zh: "数据不足",
  },
  insufficient_data_formula: {
    fr: "Le nombre d'adultes et de nuits doit être supérieur à 0",
    en: "The number of adults and nights must be greater than 0",
    de: "Die Anzahl der Erwachsenen und Nächte muss größer als 0 sein",
    es: "El número de adultos y noches debe ser mayor que 0",
    it: "Il numero di adulti e notti deve essere superiore a 0",
    zh: "成人人数和入住晚数必须大于0",
  },
  accommodation_type: {
    fr: "Type d'hébergement",
    en: "Accommodation Type",
    de: "Unterkunftsart",
    es: "Tipo de alojamiento",
    it: "Tipo di alloggio",
    zh: "住所类型",
  },
  fixed_pricing: {
    fr: "Tarification fixe",
    en: "Fixed pricing",
    de: "Feste Tarifierung",
    es: "Tarificación fija",
    it: "Tariffazione fissa",
    zh: "固定税率",
  },
  proportional_pricing: {
    fr: "Tarification proportionnelle",
    en: "Proportional pricing",
    de: "Proportionale Tarifierung",
    es: "Tarificación proporcional",
    it: "Tariffazione proporzionale",
    zh: "按比例税率",
  },
  travelers_nights_label: {
    fr: "Voyageurs & Nuits",
    en: "Travelers & Nights",
    de: "Gäste & Nächte",
    es: "Viajeros y Noches",
    it: "Viaggiatori & Notti",
    zh: "旅客与入住晚数",
  },
  travelers_nights_formula_fixed: {
    fr: "adulte(s) × nuit(s) (enfants exonérés)",
    en: "adult(s) × night(s) (minors exempt)",
    de: "Erwachsene(r) × Nacht/Nächte (Kinder befreit)",
    es: "adulto(s) × noche(s) (menores exentos)",
    it: "adulto/i × notte/i (minori esenti)",
    zh: "位成人 × 晚 (未成年人免税)",
  },
  travelers_nights_result_fixed: {
    fr: "adulte(s) taxable(s), enfant(s) exonéré(s)",
    en: "taxable adult(s), exempt minor(s)",
    de: "steuerpflichtige(r) Erwachsene(r), befreite(s) Kind(er)",
    es: "adulto(s) sujeto(s) a tasa, menor(es) exento(s)",
    it: "adulto/i imponibile/i, minore/i esente/i",
    zh: "位需缴税成人，位免税未成年人",
  },
  travelers_nights_formula_pct: {
    fr: "adulte(s) + enfant(s) sur nuit(s)",
    en: "adult(s) + minor(s) over night(s)",
    de: "Erwachsene(r) + Kind(er) über Nacht/Nächte",
    es: "adulto(s) + menor(es) en noche(s)",
    it: "adulto/i + minore/i su notte/i",
    zh: "位成人 + 位未成年人，共 晚",
  },
  travelers_nights_result_pct: {
    fr: "voyageur(s) au total",
    en: "total traveler(s)",
    de: "Reisende insgesamt",
    es: "viajero(s) en total",
    it: "viaggiatore/i in totale",
    zh: "位总旅客人数",
  },
  base_tax_label: {
    fr: "Taxe de séjour de base",
    en: "Base tourist tax",
    de: "Basis-Kurtaxe",
    es: "Tasa de estancia base",
    it: "Tassa di soggiorno base",
    zh: "基础旅游税",
  },
  enforced_fixed_rate: {
    fr: "Tarif fixe imposé",
    en: "Enforced fixed rate",
    de: "Festgesetzter Festtarif",
    es: "Tarifa fija impuesta",
    it: "Tariffa fissa imposta",
    zh: "强制固定税率",
  },
  per_adult_per_night: {
    fr: "par adulte par nuit",
    en: "per adult per night",
    de: "pro Erwachsenem pro Nacht",
    es: "por adulto por noche",
    it: "per diurno per notte",
    zh: "每人每晚",
  },
  price_per_person_night_label: {
    fr: "Prix par personne et par nuit",
    en: "Price per person per night",
    de: "Preis pro Person und Nacht",
    es: "Precio por persona y noche",
    it: "Prezzo per persona e per notte",
    zh: "每人每晚平均租金",
  },
  excl_tax: {
    fr: "Prix HT",
    en: "Rent excl. tax",
    de: "Miete ohne Steuer",
    es: "Alquiler sin IVA",
    it: "Affitto escl. tasse",
    zh: "不含税租金",
  },
  person: {
    fr: "personne(s)",
    en: "person(s)",
    de: "Person(en)",
    es: "persona(s)",
    it: "persona/e",
    zh: "人",
  },
  base_tax_before_cap_label: {
    fr: "Taxe de séjour de base (avant plafond)",
    en: "Base tourist tax (before cap)",
    de: "Basis-Kurtaxe (vor Obergrenze)",
    es: "Tasa de estancia base (antes del tope)",
    it: "Tassa di soggiorno base (prima del limite)",
    zh: "基础旅游税 (封顶前)",
  },
  cap_limit_label: {
    fr: "Application du plafond",
    en: "Cap limit application",
    de: "Anwendung der Obergrenze",
    es: "Aplicación del tope",
    it: "Applicazione del limite",
    zh: "最高税率封顶应用",
  },
  additional_dept_tax: {
    fr: "Taxe additionnelle départementale",
    en: "Additional departmental tax",
    de: "Zusätzliche Departement-Steuer",
    es: "Tasa adicional departamental",
    it: "Tassa addizionale provinciale",
    zh: "省级附加税",
  },
  additional_reg_tax: {
    fr: "Taxe additionnelle régionale",
    en: "Additional regional tax",
    de: "Zusätzliche Regionalsteuer",
    es: "Tasa adicional regional",
    it: "Tassa addizionale regionale",
    zh: "大区附加税",
  },
  additional_transit_tax: {
    fr: "Taxe additionnelle transport",
    en: "Additional transit tax",
    de: "Zusätzliche Nahverkehrssteuer",
    es: "Tasa de transporte adicional",
    it: "Tassa trasporti addizionale",
    zh: "交通附加税",
  },
  final_tax_per_adult_night_label: {
    fr: "Taxe finale par adulte et par nuit",
    en: "Final tax per adult per night",
    de: "Endgültige Steuer pro Erwachsenem und Nacht",
    es: "Tasa final por adulto y noche",
    it: "Tassa finale per adulto e per notte",
    zh: "每位成年人每晚的最终税额",
  },
  base: {
    fr: "Base",
    en: "Base",
    de: "Basis",
    es: "Base",
    it: "Base",
    zh: "基础",
  },
  dept: {
    fr: "Dép.",
    en: "Dept.",
    de: "Dep.",
    es: "Dep.",
    it: "Prov.",
    zh: "省附加",
  },
  reg: {
    fr: "Rég.",
    en: "Reg.",
    de: "Reg.",
    es: "Reg.",
    it: "Reg.",
    zh: "大区",
  },
  transit: {
    fr: "Trans.",
    en: "Transit",
    de: "Verkehr",
    es: "Transp.",
    it: "Trasp.",
    zh: "交通",
  },
  total_tax_amount_label: {
    fr: "Montant total de la taxe de séjour",
    en: "Total amount of tourist tax",
    de: "Gesamtbetrag der Kurtaxe",
    es: "Importe total de la tasa de estancia",
    it: "Importo totale della tassa di soggiorno",
    zh: "应缴旅游税总金额",
  },
  fixed_rate_formula_label: {
    fr: "Taux fixe par adulte et par nuit",
    en: "Fixed rate per adult per night",
    de: "Festtarif pro Erwachsenem pro Nacht",
    es: "Tarifa fija por adulto y noche",
    it: "Tariffa fissa per adulto e per notte",
    zh: "每位成年人每晚固定税率",
  },
  additional_taxes: {
    fr: "taxes additionnelles",
    en: "additional taxes",
    de: "Zusatzabgaben",
    es: "tasas adicionales",
    it: "tasse addizionali",
    zh: "附加税",
  },
  percentage: {
    fr: "Pourcentage",
    en: "Percentage",
    de: "Prozentsatz",
    es: "Porcentaje",
    it: "Percentuale",
    zh: "比例百分数",
  },
  pct_of_price_per_person_night: {
    fr: "du prix par personne par nuit",
    en: "of price per person per night",
    de: "des Preises pro Person pro Nacht",
    es: "del precio por persona por noche",
    it: "del prezzo per persona per notte",
    zh: "每人每晚房价折合数",
  },
  capped_at: {
    fr: "plafonnée à",
    en: "capped at",
    de: "begrenzt auf",
    es: "limitado a",
    it: "limitato a",
    zh: "上限为",
  },
  no_calculation: {
    fr: "Aucun calcul (adultes ou nuits égal à 0)",
    en: "No calculation (adults or nights equal 0)",
    de: "Keine Berechnung (Erwachsene oder Nächte gleich 0)",
    es: "Sin cálculo (adultos o noches igual a 0)",
    it: "Nessun calcolo (adulti o notti pari a 0)",
    zh: "无计算 (成人或晚数为0)",
  }
};

function getLocalText(key: string, lang: string): string {
  const translations = stepLocales[key];
  if (!translations) return key;
  return translations[lang] || translations["fr"] || key;
}

export function calculateTax(config: TaxConfig, input: TaxInput, lang: string = "fr"): TaxCalculationResult {
  const {
    prixTotalHT,
    nombreAdultes,
    nombreEnfants,
    nombreNuits
  } = input;

  const {
    modeCalcul,
    tauxFixe,
    pourcentage,
    plafond,
    taxeAdditionnelleDepartementale,
    taxeAdditionnelleRegionale,
    taxeAdditionnelleTransport,
  } = config;

  const steps: CalculationStep[] = [];
  const totalPeople = nombreAdultes + nombreEnfants;
  
  // Basic validation safety
  if (nombreAdultes <= 0 || nombreNuits <= 0) {
    return {
      taxeTotale: 0,
      taxeParAdulteParNuit: 0,
      nombreAdultesTaxables: nombreAdultes,
      nombreEnfantsExoneres: nombreEnfants,
      nombreNuits: nombreNuits,
      prixParPersonneParNuit: 0,
      taxeBaseCapped: 0,
      taxeDepartementale: 0,
      taxeRegionale: 0,
      taxeTransport: 0,
      formuleUtilisee: getLocalText("no_calculation", lang),
      steps: [
        {
          label: getLocalText("insufficient_data", lang),
          formula: getLocalText("insufficient_data_formula", lang),
          result: "0.00 €"
        }
      ],
      config,
      input
    };
  }

  let prixParPersonneParNuit = 0;
  let taxeBase = 0;
  let taxeBaseCapped = 0;
  let formuleUtilisee = "";

  if (modeCalcul === "fixe") {
    taxeBase = tauxFixe;
    taxeBaseCapped = tauxFixe;
    formuleUtilisee = `${getLocalText("fixed_rate_formula_label", lang)} (${tauxFixe.toFixed(2)} €) + ${getLocalText("additional_taxes", lang)}`;

    steps.push({
      label: getLocalText("accommodation_type", lang),
      formula: `${config.hebergementType} - ${config.classement}`,
      result: getLocalText("fixed_pricing", lang)
    });

    steps.push({
      label: getLocalText("travelers_nights_label", lang),
      formula: `${nombreAdultes} ${getLocalText("travelers_nights_formula_fixed", lang).replace("adulte(s)", "").replace("nuit(s)", "").trim()}`,
      result: `${nombreAdultes} ${getLocalText("travelers_nights_result_fixed", lang).replace("adulte(s) taxable(s)", "").replace("enfant(s) exonéré(s)", "").trim().split(",")[0].trim()}, ${nombreEnfants} ${getLocalText("travelers_nights_result_fixed", lang).split(",")[1]?.trim() || "exonéré(s)"}`
    });

    steps.push({
      label: getLocalText("base_tax_label", lang),
      formula: getLocalText("enforced_fixed_rate", lang),
      result: `${tauxFixe.toFixed(2)} € ${getLocalText("per_adult_per_night", lang)}`
    });

  } else {
    // pourcentage mode
    prixParPersonneParNuit = totalPeople > 0 ? (prixTotalHT / totalPeople / nombreNuits) : 0;
    taxeBase = prixParPersonneParNuit * (pourcentage / 100);
    const isOverPlafond = taxeBase > plafond;
    taxeBaseCapped = isOverPlafond ? plafond : taxeBase;

    formuleUtilisee = `${getLocalText("percentage", lang)} (${pourcentage}%) ${getLocalText("pct_of_price_per_person_night", lang)} (${getLocalText("capped_at", lang)} ${plafond.toFixed(2)} €) + ${getLocalText("additional_taxes", lang)}`;

    steps.push({
      label: getLocalText("accommodation_type", lang),
      formula: `${config.hebergementType} - ${config.classement}`,
      result: getLocalText("proportional_pricing", lang)
    });

    steps.push({
      label: getLocalText("travelers_nights_label", lang),
      formula: `${nombreAdultes} ${getLocalText("base", lang).toLowerCase() === "base" ? "adult(s)" : "成人"} + ${nombreEnfants} ${getLocalText("base", lang).toLowerCase() === "base" ? "children" : "免税未成年"} / ${nombreNuits} ${getLocalText("base", lang).toLowerCase() === "base" ? "nights" : "晚"}`,
      result: `${totalPeople} ${getLocalText("travelers_nights_result_pct", lang)}`
    });

    steps.push({
      label: getLocalText("price_per_person_night_label", lang),
      formula: `${prixTotalHT.toFixed(2)} € (${getLocalText("excl_tax", lang)}) / ${totalPeople} ${getLocalText("person", lang)} / ${nombreNuits} ${getLocalText("base", lang).toLowerCase() === "base" ? "nights" : "晚"}`,
      result: `${prixParPersonneParNuit.toFixed(2)} €`
    });

    steps.push({
      label: getLocalText("base_tax_before_cap_label", lang),
      formula: `${prixParPersonneParNuit.toFixed(2)} € × ${pourcentage}%`,
      result: `${taxeBase.toFixed(3)} € ${getLocalText("per_adult_per_night", lang)}`
    });

    steps.push({
      label: getLocalText("cap_limit_label", lang),
      formula: `Min(${taxeBase.toFixed(3)} €, ${plafond.toFixed(2)} €)`,
      result: `${taxeBaseCapped.toFixed(3)} € ${getLocalText("per_adult_per_night", lang)}`
    });
  }

  // Calculate additional taxes on the base
  const taxeDepartementale = taxeBaseCapped * (taxeAdditionnelleDepartementale / 100);
  const taxeRegionale = taxeBaseCapped * (taxeAdditionnelleRegionale / 100);
  const taxeTransport = taxeBaseCapped * (taxeAdditionnelleTransport / 100);

  if (taxeAdditionnelleDepartementale > 0) {
    steps.push({
      label: `${getLocalText("additional_dept_tax", lang)} (${taxeAdditionnelleDepartementale}%)`,
      formula: `${taxeBaseCapped.toFixed(3)} € × ${taxeAdditionnelleDepartementale}%`,
      result: `${taxeDepartementale.toFixed(3)} €`
    });
  }

  if (taxeAdditionnelleRegionale > 0) {
    steps.push({
      label: `${getLocalText("additional_reg_tax", lang)} (${taxeAdditionnelleRegionale}%)`,
      formula: `${taxeBaseCapped.toFixed(3)} € × ${taxeAdditionnelleRegionale}%`,
      result: `${taxeRegionale.toFixed(3)} €`
    });
  }

  if (taxeAdditionnelleTransport > 0) {
    steps.push({
      label: `${getLocalText("additional_transit_tax", lang)} (${taxeAdditionnelleTransport}%)`,
      formula: `${taxeBaseCapped.toFixed(3)} € × ${taxeAdditionnelleTransport}%`,
      result: `${taxeTransport.toFixed(3)} €`
    });
  }

  const taxeParAdulteParNuit = taxeBaseCapped + taxeDepartementale + taxeRegionale + taxeTransport;

  steps.push({
    label: getLocalText("final_tax_per_adult_night_label", lang),
    formula: `${taxeBaseCapped.toFixed(3)} € (${getLocalText("base", lang)}) + ${taxeDepartementale.toFixed(3)} € (${getLocalText("dept", lang)}) + ${taxeRegionale.toFixed(3)} € (${getLocalText("reg", lang)}) + ${taxeTransport.toFixed(3)} € (${getLocalText("transit", lang)})`,
    result: `${taxeParAdulteParNuit.toFixed(3)} €`
  });

  const taxeTotale = taxeParAdulteParNuit * nombreAdultes * nombreNuits;

  steps.push({
    label: getLocalText("total_tax_amount_label", lang),
    formula: `${taxeParAdulteParNuit.toFixed(3)} € × ${nombreAdultes} ${getLocalText("base", lang).toLowerCase() === "base" ? "adult(s)" : "成人"} × ${nombreNuits} ${getLocalText("base", lang).toLowerCase() === "base" ? "night(s)" : "晚"}`,
    result: `${taxeTotale.toFixed(2)} €`
  });

  return {
    taxeTotale: parseFloat(taxeTotale.toFixed(2)),
    taxeParAdulteParNuit: parseFloat(taxeParAdulteParNuit.toFixed(3)),
    nombreAdultesTaxables: nombreAdultes,
    nombreEnfantsExoneres: nombreEnfants,
    nombreNuits: nombreNuits,
    prixParPersonneParNuit: parseFloat(prixParPersonneParNuit.toFixed(2)),
    taxeBaseCapped: parseFloat(taxeBaseCapped.toFixed(3)),
    taxeDepartementale: parseFloat(taxeDepartementale.toFixed(3)),
    taxeRegionale: parseFloat(taxeRegionale.toFixed(3)),
    taxeTransport: parseFloat(taxeTransport.toFixed(3)),
    formuleUtilisee,
    steps,
    config,
    input
  };
}
