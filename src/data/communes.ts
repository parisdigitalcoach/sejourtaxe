export interface CommunesData {
  name: string;
  department: string;
  region: string;
  taxeAdditionnelleDepartementale: number; // in %
  taxeAdditionnelleRegionale: number; // in %
  taxeAdditionnelleTransport: number; // in %
  defaultTauxFixe: Record<string, number>; // ranking -> rate
  defaultPourcentage: number; // for unclassified
  defaultPlafond: Record<string, number>;
}

export const COMMUNE_PRESETS: Record<string, CommunesData> = {
  "Paris (75)": {
    name: "Paris",
    department: "Paris (75)",
    region: "Île-de-France",
    taxeAdditionnelleDepartementale: 10,
    taxeAdditionnelleRegionale: 15,
    taxeAdditionnelleTransport: 200, // Île-de-France transit additions are very high (SGP + IDFM)
    defaultTauxFixe: {
      "Palace / Exceptionnel": 14.95,
      "5 étoiles": 10.75,
      "4 étoiles": 8.13,
      "3 étoiles": 5.20,
      "2 étoiles": 3.25,
      "1 étoile": 2.60,
      "Chambre d'hôtes": 2.60,
      "Camping (3/4/5 étoiles)": 0.65,
      "Camping (1/2 étoiles)": 0.25,
      "Non classé": 0.00
    },
    defaultPourcentage: 8.0, // Paris has 8.0% for non-classified
    defaultPlafond: {
      "Meublé de tourisme": 10.75,
      "Hôtel": 10.75,
      "Chambre d'hôtes": 2.60,
      "Camping": 0.65,
      "Résidence de tourisme": 10.75
    }
  },
  "Nice (06)": {
    name: "Nice",
    department: "Alpes-Maritimes (06)",
    region: "Provence-Alpes-Côte d'Azur",
    taxeAdditionnelleDepartementale: 10,
    taxeAdditionnelleRegionale: 0,
    taxeAdditionnelleTransport: 0,
    defaultTauxFixe: {
      "Palace / Exceptionnel": 4.00,
      "5 étoiles": 3.00,
      "4 étoiles": 2.20,
      "3 étoiles": 1.50,
      "2 étoiles": 0.90,
      "1 étoile": 0.80,
      "Chambre d'hôtes": 0.80,
      "Camping (3/4/5 étoiles)": 0.60,
      "Camping (1/2 étoiles)": 0.20,
      "Non classé": 0.00
    },
    defaultPourcentage: 5.0,
    defaultPlafond: {
      "Meublé de tourisme": 3.00,
      "Hôtel": 3.00,
      "Chambre d'hôtes": 0.80,
      "Camping": 0.60,
      "Résidence de tourisme": 3.00
    }
  },
  "Marseille (13)": {
    name: "Marseille",
    department: "Bouches-du-Rhône (13)",
    region: "Provence-Alpes-Côte d'Azur",
    taxeAdditionnelleDepartementale: 10,
    taxeAdditionnelleRegionale: 0,
    taxeAdditionnelleTransport: 0,
    defaultTauxFixe: {
      "Palace / Exceptionnel": 4.00,
      "5 étoiles": 3.00,
      "4 étoiles": 2.20,
      "3 étoiles": 1.50,
      "2 étoiles": 0.90,
      "1 étoile": 0.80,
      "Chambre d'hôtes": 0.80,
      "Camping (3/4/5 étoiles)": 0.60,
      "Camping (1/2 étoiles)": 0.20,
      "Non classé": 0.00
    },
    defaultPourcentage: 5.0,
    defaultPlafond: {
      "Meublé de tourisme": 3.00,
      "Hôtel": 3.00,
      "Chambre d'hôtes": 0.80,
      "Camping": 0.60,
      "Résidence de tourisme": 3.00
    }
  },
  "Lyon (69)": {
    name: "Lyon",
    department: "Rhône (69)",
    region: "Auvergne-Rhône-Alpes",
    taxeAdditionnelleDepartementale: 10,
    taxeAdditionnelleRegionale: 0,
    taxeAdditionnelleTransport: 0,
    defaultTauxFixe: {
      "Palace / Exceptionnel": 4.30,
      "5 étoiles": 3.30,
      "4 étoiles": 2.50,
      "3 étoiles": 1.65,
      "2 étoiles": 1.10,
      "1 étoile": 0.83,
      "Chambre d'hôtes": 0.83,
      "Camping (3/4/5 étoiles)": 0.55,
      "Camping (1/2 étoiles)": 0.22,
      "Non classé": 0.00
    },
    defaultPourcentage: 5.5,
    defaultPlafond: {
      "Meublé de tourisme": 3.30,
      "Hôtel": 3.30,
      "Chambre d'hôtes": 0.83,
      "Camping": 0.55,
      "Résidence de tourisme": 3.30
    }
  },
  "Bordeaux (33)": {
    name: "Bordeaux",
    department: "Gironde (33)",
    region: "Nouvelle-Aquitaine",
    taxeAdditionnelleDepartementale: 10,
    taxeAdditionnelleRegionale: 15, // Grand Sud-Ouest regional tax support
    defaultTauxFixe: {
      "Palace / Exceptionnel": 4.60,
      "5 étoiles": 3.45,
      "4 étoiles": 2.50,
      "3 étoiles": 1.50,
      "2 étoiles": 1.00,
      "1 étoile": 0.80,
      "Chambre d'hôtes": 0.80,
      "Camping (3/4/5 étoiles)": 0.60,
      "Camping (1/2 étoiles)": 0.20,
      "Non classé": 0.00
    },
    taxeAdditionnelleTransport: 0,
    defaultPourcentage: 5.0,
    defaultPlafond: {
      "Meublé de tourisme": 3.45,
      "Hôtel": 3.45,
      "Chambre d'hôtes": 0.80,
      "Camping": 0.60,
      "Résidence de tourisme": 3.45
    }
  },
  "Strasbourg (67)": {
    name: "Strasbourg",
    department: "Bas-Rhin (67)",
    region: "Grand Est",
    taxeAdditionnelleDepartementale: 10,
    taxeAdditionnelleRegionale: 0,
    taxeAdditionnelleTransport: 0,
    defaultTauxFixe: {
      "Palace / Exceptionnel": 4.00,
      "5 étoiles": 3.00,
      "4 étoiles": 2.20,
      "3 étoiles": 1.50,
      "2 étoiles": 0.90,
      "1 étoile": 0.80,
      "Chambre d'hôtes": 0.80,
      "Camping (3/4/5 étoiles)": 0.60,
      "Camping (1/2 étoiles)": 0.20,
      "Non classé": 0.00
    },
    defaultPourcentage: 5.0,
    defaultPlafond: {
      "Meublé de tourisme": 3.00,
      "Hôtel": 3.00,
      "Chambre d'hôtes": 0.80,
      "Camping": 0.60,
      "Résidence de tourisme": 3.00
    }
  },
  "Chamonix-Mont-Blanc (74)": {
    name: "Chamonix-Mont-Blanc",
    department: "Haute-Savoie (74)",
    region: "Auvergne-Rhône-Alpes",
    taxeAdditionnelleDepartementale: 10,
    taxeAdditionnelleRegionale: 0,
    taxeAdditionnelleTransport: 0,
    defaultTauxFixe: {
      "Palace / Exceptionnel": 4.00,
      "5 étoiles": 3.00,
      "4 étoiles": 2.30,
      "3 étoiles": 1.50,
      "2 étoiles": 0.90,
      "1 étoile": 0.80,
      "Chambre d'hôtes": 0.80,
      "Camping (3/4/5 étoiles)": 0.60,
      "Camping (1/2 étoiles)": 0.20,
      "Non classé": 0.00
    },
    defaultPourcentage: 5.0,
    defaultPlafond: {
      "Meublé de tourisme": 3.00,
      "Hôtel": 3.00,
      "Chambre d'hôtes": 0.80,
      "Camping": 0.60,
      "Résidence de tourisme": 3.00
    }
  }
};
