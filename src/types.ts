export type ModeCalcul = "fixe" | "pourcentage";

export interface TaxConfig {
  commune: string;
  departement: string;
  region: string;
  hebergementType: string;
  classement: string;
  modeCalcul: ModeCalcul;
  tauxFixe: number;
  pourcentage: number; // e.g., 5 for 5%
  plafond: number;
  taxeAdditionnelleDepartementale: number; // e.g., 10 for 10%
  taxeAdditionnelleRegionale: number; // e.g., 15 for 15%
  taxeAdditionnelleTransport: number; // e.g., 0 for 0%
  enfantsExoneres: boolean;
  ageExoneration: number;
}

export interface TaxInput {
  prixTotalHT: number;
  nombreAdultes: number;
  nombreEnfants: number;
  nombreNuits: number;
}

export interface CalculationStep {
  label: string;
  formula: string;
  result: string;
}

export interface TaxCalculationResult {
  taxeTotale: number;
  taxeParAdulteParNuit: number;
  nombreAdultesTaxables: number;
  nombreEnfantsExoneres: number;
  nombreNuits: number;
  prixParPersonneParNuit: number; // 0 if not applicable (e.g., in fixed mode)
  taxeBaseCapped: number;
  taxeDepartementale: number;
  taxeRegionale: number;
  taxeTransport: number;
  formuleUtilisee: string;
  steps: CalculationStep[];
  config: TaxConfig;
  input: TaxInput;
}
