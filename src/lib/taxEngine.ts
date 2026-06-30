import { TaxConfig, TaxInput, TaxCalculationResult, CalculationStep } from "../types";

export function calculateTax(config: TaxConfig, input: TaxInput): TaxCalculationResult {
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
    enfantsExoneres
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
      formuleUtilisee: "Aucun calcul (adultes ou nuits égal à 0)",
      steps: [
        {
          label: "Données insuffisantes",
          formula: "Le nombre d'adultes et de nuits doit être supérieur à 0",
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
    taxeBaseCapped = tauxFixe; // Plafond usually doesn't apply to fixed but we can think of it as equal to tauxFixe
    formuleUtilisee = `Taux fixe par adulte et par nuit (${tauxFixe.toFixed(2)} €) + taxes additionnelles`;

    steps.push({
      label: "Type d'hébergement",
      formula: `${config.hebergementType} - ${config.classement}`,
      result: "Tarification fixe"
    });

    steps.push({
      label: "Voyageurs & Nuits",
      formula: `${nombreAdultes} adulte(s) × ${nombreNuits} nuit(s) (enfants exonérés)`,
      result: `${nombreAdultes} adulte(s) taxable(s), ${nombreEnfants} enfant(s) exonéré(s)`
    });

    steps.push({
      label: "Taxe de base de séjour",
      formula: "Tarif fixe imposé",
      result: `${tauxFixe.toFixed(2)} € par adulte par nuit`
    });

  } else {
    // pourcentage mode
    prixParPersonneParNuit = totalPeople > 0 ? (prixTotalHT / totalPeople / nombreNuits) : 0;
    taxeBase = prixParPersonneParNuit * (pourcentage / 100);
    const isOverPlafond = taxeBase > plafond;
    taxeBaseCapped = isOverPlafond ? plafond : taxeBase;

    formuleUtilisee = `Pourcentage (${pourcentage}%) du prix par personne par nuit (plafonnée à ${plafond.toFixed(2)} €) + taxes additionnelles`;

    steps.push({
      label: "Type d'hébergement",
      formula: `${config.hebergementType} - ${config.classement}`,
      result: "Tarification proportionnelle"
    });

    steps.push({
      label: "Voyageurs & Nuits",
      formula: `${nombreAdultes} adulte(s) + ${nombreEnfants} enfant(s) sur ${nombreNuits} nuit(s)`,
      result: `${totalPeople} voyageur(s) au total`
    });

    steps.push({
      label: "Prix par personne et par nuit",
      formula: `${prixTotalHT.toFixed(2)} € (Prix HT) / ${totalPeople} personne(s) / ${nombreNuits} nuit(s)`,
      result: `${prixParPersonneParNuit.toFixed(2)} €`
    });

    steps.push({
      label: "Taxe de base de séjour (avant plafond)",
      formula: `${prixParPersonneParNuit.toFixed(2)} € × ${pourcentage}%`,
      result: `${taxeBase.toFixed(3)} € par adulte par nuit`
    });

    steps.push({
      label: "Application du plafond",
      formula: `Min(${taxeBase.toFixed(3)} €, ${plafond.toFixed(2)} €)`,
      result: `${taxeBaseCapped.toFixed(3)} € par adulte par nuit`
    });
  }

  // Calculate additional taxes on the base
  const taxeDepartementale = taxeBaseCapped * (taxeAdditionnelleDepartementale / 100);
  const taxeRegionale = taxeBaseCapped * (taxeAdditionnelleRegionale / 100);
  const taxeTransport = taxeBaseCapped * (taxeAdditionnelleTransport / 100);

  if (taxeAdditionnelleDepartementale > 0) {
    steps.push({
      label: `Taxe additionnelle départementale (${taxeAdditionnelleDepartementale}%)`,
      formula: `${taxeBaseCapped.toFixed(3)} € × ${taxeAdditionnelleDepartementale}%`,
      result: `${taxeDepartementale.toFixed(3)} €`
    });
  }

  if (taxeAdditionnelleRegionale > 0) {
    steps.push({
      label: `Taxe additionnelle régionale (${taxeAdditionnelleRegionale}%)`,
      formula: `${taxeBaseCapped.toFixed(3)} € × ${taxeAdditionnelleRegionale}%`,
      result: `${taxeRegionale.toFixed(3)} €`
    });
  }

  if (taxeAdditionnelleTransport > 0) {
    steps.push({
      label: `Taxe additionnelle transport (${taxeAdditionnelleTransport}%)`,
      formula: `${taxeBaseCapped.toFixed(3)} € × ${taxeAdditionnelleTransport}%`,
      result: `${taxeTransport.toFixed(3)} €`
    });
  }

  const taxeParAdulteParNuit = taxeBaseCapped + taxeDepartementale + taxeRegionale + taxeTransport;

  steps.push({
    label: "Taxe finale par adulte et par nuit",
    formula: `${taxeBaseCapped.toFixed(3)} € (Base) + ${taxeDepartementale.toFixed(3)} € (Dép.) + ${taxeRegionale.toFixed(3)} € (Rég.) + ${taxeTransport.toFixed(3)} € (Trans.)`,
    result: `${taxeParAdulteParNuit.toFixed(3)} €`
  });

  const taxeTotale = taxeParAdulteParNuit * nombreAdultes * nombreNuits;

  steps.push({
    label: "Montant total de la taxe de séjour",
    formula: `${taxeParAdulteParNuit.toFixed(3)} € × ${nombreAdultes} adulte(s) × ${nombreNuits} nuit(s)`,
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
