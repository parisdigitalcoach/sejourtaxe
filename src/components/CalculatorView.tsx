import React, { useState, useEffect, useRef } from "react";
import { 
  Calculator, Info, AlertTriangle, RefreshCw, MapPin, 
  Euro, Users, Moon, Percent, ShieldCheck, CornerDownRight,
  Printer, Download, Copy, Share2, Check, Search
} from "lucide-react";
import { COMMUNE_PRESETS } from "../data/communes";
import { calculateTax } from "../lib/taxEngine";
import { TaxConfig, TaxInput, ModeCalcul } from "../types";
import AdBanner from "./AdBanner";
import { jsPDF } from "jspdf";
import { useLanguage } from "../context/LanguageContext";

// Type for searched communes in the compact list
interface CompactCommune {
  id: string;
  code: string;
  postalCode: string;
  name: string;
  department: string;
  region: string;
}

export default function CalculatorView() {
  const { t, language } = useLanguage();

  const getHebergementTypeLabel = (type: string) => {
    switch (type) {
      case "Meublé de tourisme": return t("type_meuble");
      case "Hôtel": return t("type_hotel");
      case "Chambre d'hôtes": return t("type_chambre");
      case "Camping": return t("type_camping");
      case "Résidence de tourisme": return t("type_residence");
      default: return type;
    }
  };

  const getClassementLabel = (rating: string) => {
    switch (rating) {
      case "Non classé": return t("rating_non_classe");
      case "1 étoile": return t("rating_1_star");
      case "2 étoiles": return t("rating_2_stars");
      case "3 étoiles": return t("rating_3_stars");
      case "4 étoiles": return t("rating_4_stars");
      case "5 étoiles": return t("rating_5_stars");
      case "Palace / Exceptionnel": return t("rating_palace");
      default: return rating;
    }
  };

  // Autocomplete & Commune states
  const [communesList, setCommunesList] = useState<CompactCommune[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("Paris (75)");
  const [filteredSuggestions, setFilteredSuggestions] = useState<CompactCommune[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [isLoadingCommunes, setIsLoadingCommunes] = useState<boolean>(false);
  
  // Ref for clicking outside autocomplete
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Core configuration states
  const [selectedCommuneName, setSelectedCommuneName] = useState<string>("Paris");
  const [selectedPostalCode, setSelectedPostalCode] = useState<string>("75000");
  const [departement, setDepartement] = useState<string>("Paris (75)");
  const [region, setRegion] = useState<string>("Île-de-France");
  const [selectedPreset, setSelectedPreset] = useState<string>("Paris (75)"); // Handles preset details if found

  // Accommodation Parameters
  const [hebergementType, setHebergementType] = useState<string>("Meublé de tourisme");
  const [classement, setClassement] = useState<string>("3 étoiles");
  const [modeCalcul, setModeCalcul] = useState<ModeCalcul>("fixe");

  // Rates and Factors (User editable)
  const [tauxFixe, setTauxFixe] = useState<number>(5.20);
  const [pourcentage, setPourcentage] = useState<number>(5.0);
  const [plafond, setPlafond] = useState<number>(10.75);

  // Additional Taxes (Automatically calculated based on department/region, but editable)
  const [taxeAdditionnelleDepartementale, setTaxeAdditionnelleDepartementale] = useState<number>(10);
  const [taxeAdditionnelleRegionale, setTaxeAdditionnelleRegionale] = useState<number>(15);
  const [taxeAdditionnelleTransport, setTaxeAdditionnelleTransport] = useState<number>(200);

  // Input quantities
  const [prixTotalHT, setPrixTotalHT] = useState<number>(800);
  const [nombreAdultes, setNombreAdultes] = useState<number>(2);
  const [nombreEnfants, setNombreEnfants] = useState<number>(0);
  const [nombreNuits, setNombreNuits] = useState<number>(4);

  // UX states
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // 1. Load persisted states from localStorage on initialization
  useEffect(() => {
    try {
      const persisted = localStorage.getItem("sejourtaxe_calc_state");
      if (persisted) {
        const state = JSON.parse(persisted);
        if (state.searchQuery) setSearchQuery(state.searchQuery);
        if (state.selectedCommuneName) setSelectedCommuneName(state.selectedCommuneName);
        if (state.selectedPostalCode) setSelectedPostalCode(state.selectedPostalCode);
        if (state.departement) setDepartement(state.departement);
        if (state.region) setRegion(state.region);
        if (state.selectedPreset) setSelectedPreset(state.selectedPreset);
        
        if (state.hebergementType) setHebergementType(state.hebergementType);
        if (state.classement) setClassement(state.classement);
        if (state.modeCalcul) setModeCalcul(state.modeCalcul);
        
        if (typeof state.tauxFixe === "number") setTauxFixe(state.tauxFixe);
        if (typeof state.pourcentage === "number") setPourcentage(state.pourcentage);
        if (typeof state.plafond === "number") setPlafond(state.plafond);
        
        if (typeof state.taxeAdditionnelleDepartementale === "number") setTaxeAdditionnelleDepartementale(state.taxeAdditionnelleDepartementale);
        if (typeof state.taxeAdditionnelleRegionale === "number") setTaxeAdditionnelleRegionale(state.taxeAdditionnelleRegionale);
        if (typeof state.taxeAdditionnelleTransport === "number") setTaxeAdditionnelleTransport(state.taxeAdditionnelleTransport);
        
        if (typeof state.prixTotalHT === "number") setPrixTotalHT(state.prixTotalHT);
        if (typeof state.nombreAdultes === "number") setNombreAdultes(state.nombreAdultes);
        if (typeof state.nombreEnfants === "number") setNombreEnfants(state.nombreEnfants);
        if (typeof state.nombreNuits === "number") setNombreNuits(state.nombreNuits);
      }
    } catch (e) {
      console.warn("Could not load persisted calculator state:", e);
    }
  }, []);

  // 2. Load URL Parameters on initialization to recover calculation state
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlVille = params.get("ville");
      const urlPostal = params.get("postalCode");
      const urlAdultes = params.get("adultes");
      const urlEnfants = params.get("enfants");
      const urlNuits = params.get("nuits");
      const urlPrix = params.get("prix");
      const urlHebergement = params.get("hebergementType");
      const urlClassement = params.get("classement");

      if (urlVille) {
        setSelectedCommuneName(urlVille);
        setSearchQuery(urlPostal ? `${urlVille} (${urlPostal})` : urlVille);
      }
      if (urlPostal) setSelectedPostalCode(urlPostal);
      if (urlAdultes) setNombreAdultes(Math.max(1, parseInt(urlAdultes) || 1));
      if (urlEnfants) setNombreEnfants(Math.max(0, parseInt(urlEnfants) || 0));
      if (urlNuits) setNombreNuits(Math.max(1, parseInt(urlNuits) || 1));
      if (urlPrix) setPrixTotalHT(Math.max(0, parseFloat(urlPrix) || 0));
      if (urlHebergement) setHebergementType(urlHebergement);
      if (urlClassement) setClassement(urlClassement);
    } catch (e) {
      console.warn("Could not parse URL query parameters:", e);
    }
  }, []);

  // 3. Persist state to localStorage on any input changes
  useEffect(() => {
    try {
      const stateToSave = {
        searchQuery,
        selectedCommuneName,
        selectedPostalCode,
        departement,
        region,
        selectedPreset,
        hebergementType,
        classement,
        modeCalcul,
        tauxFixe,
        pourcentage,
        plafond,
        taxeAdditionnelleDepartementale,
        taxeAdditionnelleRegionale,
        taxeAdditionnelleTransport,
        prixTotalHT,
        nombreAdultes,
        nombreEnfants,
        nombreNuits
      };
      localStorage.setItem("sejourtaxe_calc_state", JSON.stringify(stateToSave));
    } catch (e) {
      // Ignore storage limit / sandbox errors
    }
  }, [
    searchQuery, selectedCommuneName, selectedPostalCode, departement, region, selectedPreset,
    hebergementType, classement, modeCalcul, tauxFixe, pourcentage, plafond,
    taxeAdditionnelleDepartementale, taxeAdditionnelleRegionale, taxeAdditionnelleTransport,
    prixTotalHT, nombreAdultes, nombreEnfants, nombreNuits
  ]);

  // 4. Lazy-load the 35,000 communes list on first focus / interaction
  const ensureCommunesLoaded = async () => {
    if (communesList.length > 0 || isLoadingCommunes) return;
    setIsLoadingCommunes(true);
    try {
      const response = await fetch("/data/communes_compact.json");
      const data = await response.json();
      setCommunesList(data);
    } catch (err) {
      console.error("Failed to lazy-load communes compact database:", err);
    } finally {
      setIsLoadingCommunes(false);
    }
  };

  // 5. Handle autocomplete search filtering
  useEffect(() => {
    if (searchQuery.trim() === "" || communesList.length === 0) {
      setFilteredSuggestions([]);
      return;
    }

    const queryNormalized = searchQuery
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

    // Check if query is postal code (digits)
    const isDigits = /^\d+$/.test(queryNormalized);

    const matches = communesList.filter((c) => {
      if (isDigits) {
        return c.postalCode.startsWith(queryNormalized) || c.code.startsWith(queryNormalized);
      } else {
        const nameNormalized = c.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        
        const deptNormalized = c.department
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        return nameNormalized.includes(queryNormalized) || 
               c.postalCode.includes(queryNormalized) ||
               deptNormalized.includes(queryNormalized);
      }
    });

    // Limit suggestions to top 15 for optimal UI speed
    setFilteredSuggestions(matches.slice(0, 15));
    setActiveSuggestionIndex(0);
  }, [searchQuery, communesList]);

  // 6. Click outside handler to dismiss autocomplete suggestion box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 7. Auto-fill legal rates when Commune / Classification / Type changes
  useEffect(() => {
    const normalizedCity = selectedCommuneName.trim();
    // Check if the city matches one of our detailed presets (Paris, Marseille, Lyon, etc.)
    const matchedPresetKey = Object.keys(COMMUNE_PRESETS).find(
      (key) => COMMUNE_PRESETS[key].name.toLowerCase() === normalizedCity.toLowerCase()
    );

    if (matchedPresetKey) {
      const preset = COMMUNE_PRESETS[matchedPresetKey];
      setSelectedPreset(matchedPresetKey);
      setDepartement(preset.department);
      setRegion(preset.region);
      setTaxeAdditionnelleDepartementale(preset.taxeAdditionnelleDepartementale);
      setTaxeAdditionnelleRegionale(preset.taxeAdditionnelleRegionale);
      setTaxeAdditionnelleTransport(preset.taxeAdditionnelleTransport);

      const rate = preset.defaultTauxFixe[classement] ?? 0;
      setTauxFixe(rate);
      setPourcentage(preset.defaultPourcentage);

      const catPlafond = preset.defaultPlafond[hebergementType] ?? 3.0;
      setPlafond(catPlafond);
    } else {
      // General non-preset commune calculation rules
      setSelectedPreset("autre");
      
      // Auto-configure default French department rates (10% applies to almost all departements)
      setTaxeAdditionnelleDepartementale(10);

      // Auto-configure dynamic regional taxes based on French region laws
      const rLower = region.toLowerCase();
      if (rLower.includes("ile-de-france") || rLower.includes("île-de-france")) {
        setTaxeAdditionnelleRegionale(15);
        setTaxeAdditionnelleTransport(200); // Grand Paris transport addition
      } else if (
        rLower.includes("provence-alpes-cote") || 
        rLower.includes("provence-alpes-côte") || 
        rLower.includes("occitanie") || 
        rLower.includes("nouvelle-aquitaine")
      ) {
        // Grand Sud-Ouest PACA / Occitanie LGV regional additions (15%)
        setTaxeAdditionnelleRegionale(15);
        setTaxeAdditionnelleTransport(0);
      } else {
        setTaxeAdditionnelleRegionale(0);
        setTaxeAdditionnelleTransport(0);
      }

      // Default standards for general communes in France if not customized
      if (classement === "Non classé") {
        setPourcentage(5.0); // Communes usually vote 1% to 5%
        setPlafond(3.0);
      } else {
        // Average standard rates for fixed star ranks in French communes
        const standardFixedRates: Record<string, number> = {
          "Palace / Exceptionnel": 4.00,
          "5 étoiles": 3.00,
          "4 étoiles": 2.20,
          "3 étoiles": 1.50,
          "2 étoiles": 0.90,
          "1 étoile": 0.80,
          "Chambre d'hôtes": 0.80,
          "Camping (3/4/5 étoiles)": 0.60,
          "Camping (1/2 étoiles)": 0.20
        };
        setTauxFixe(standardFixedRates[classement] ?? 1.00);
      }
    }
  }, [selectedCommuneName, region, hebergementType, classement]);

  // 8. Auto sync calculation mode based on star ranking
  useEffect(() => {
    if (classement === "Non classé") {
      setModeCalcul("pourcentage");
    } else {
      setModeCalcul("fixe");
    }
  }, [classement]);

  // Gather current config and input
  const currentConfig: TaxConfig = {
    commune: selectedCommuneName,
    departement,
    region,
    hebergementType,
    classement,
    modeCalcul,
    tauxFixe,
    pourcentage,
    plafond,
    taxeAdditionnelleDepartementale,
    taxeAdditionnelleRegionale,
    taxeAdditionnelleTransport,
    enfantsExoneres: true,
    ageExoneration: 18
  };

  const currentInput: TaxInput = {
    prixTotalHT,
    nombreAdultes,
    nombreEnfants,
    nombreNuits
  };

  const result = calculateTax(currentConfig, currentInput, language);

  // Keyboard navigation inside autocomplete suggestion list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSuggestionsOpen || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % filteredSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectCommune(filteredSuggestions[activeSuggestionIndex]);
    } else if (e.key === "Escape") {
      setIsSuggestionsOpen(false);
    }
  };

  // Select autocomplete suggestion and fill details
  const selectCommune = (commune: CompactCommune) => {
    setSelectedCommuneName(commune.name);
    setSelectedPostalCode(commune.postalCode);
    setDepartement(commune.department);
    setRegion(commune.region);
    setSearchQuery(`${commune.name} (${commune.postalCode})`);
    setIsSuggestionsOpen(false);
  };

  // Actions: Print
  const triggerPrint = () => {
    window.print();
  };

  // Actions: Export high-fashion minimal PDF
  const triggerExportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Color theme
    const primaryColor = [209, 18, 29]; // #d1121d
    const darkColor = [0, 0, 0];
    const lightGray = [246, 246, 246];

    // Header title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("SEJOURTAXE", 20, 25);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(t("pdf_official_report"), 20, 31);
    const dateLocale = language === "zh" ? "zh-CN" : language === "en" ? "en-US" : language === "de" ? "de-DE" : language === "es" ? "es-ES" : language === "it" ? "it-IT" : "fr-FR";
    doc.text(`${t("pdf_generated_on")} ${new Date().toLocaleDateString(dateLocale)}`, 20, 36);

    // Swiss accent line
    doc.setLineWidth(1);
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.line(20, 42, 190, 42);

    // Section 1: Parameters of Stay
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(t("pdf_stay_parameters"), 20, 52);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Left Grid
    doc.text(t("pdf_commune"), 20, 62);
    doc.text(t("pdf_dept"), 20, 68);
    doc.text(t("pdf_region"), 20, 74);
    doc.text(t("pdf_type"), 20, 80);
    doc.text(t("pdf_rating"), 20, 86);

    doc.setFont("Helvetica", "normal");
    doc.text(selectedCommuneName, 65, 62);
    doc.text(departement, 65, 68);
    doc.text(region, 65, 74);
    doc.text(getHebergementTypeLabel(hebergementType), 65, 80);
    doc.text(getClassementLabel(classement), 65, 86);

    // Right Grid
    doc.setFont("Helvetica", "bold");
    doc.text(t("pdf_adults"), 120, 62);
    doc.text(t("pdf_children"), 120, 68);
    doc.text(t("pdf_nights"), 120, 74);
    doc.text(t("pdf_rent_ht"), 120, 80);

    doc.setFont("Helvetica", "normal");
    doc.text(String(nombreAdultes), 165, 62);
    doc.text(`${nombreEnfants} (${t("pdf_exempt")})`, 165, 68);
    doc.text(String(nombreNuits), 165, 74);
    doc.text(modeCalcul === "pourcentage" ? `${prixTotalHT.toFixed(2)} €` : t("pdf_not_applicable"), 165, 80);

    // Result Highlight section
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(20, 94, 170, 24, "F");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(t("pdf_estimation_title"), 25, 102);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`${result.taxeTotale.toFixed(2)} €`, 25, 112);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`(soit ${result.taxeParAdulteParNuit.toFixed(3)} € ${t("pdf_per_adult_night")})`, 115, 110);

    // Section 2: Calculation Breakdown
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(t("pdf_breakdown_title"), 20, 130);

    let y = 138;
    result.steps.forEach((step, index) => {
      if (y > 265) {
        doc.addPage();
        y = 25;
      }
      doc.setFillColor(250, 250, 250);
      doc.rect(20, y, 170, 18, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(`${t("pdf_step")} 0${index + 1} : ${step.label}`, 23, y + 5);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`${t("pdf_formula")} : ${step.formula}`, 23, y + 10);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`= ${step.result}`, 23, y + 14);

      y += 22;
    });

    // Legal disclaimer
    doc.setLineWidth(0.2);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 274, 190, 274);

    doc.setFont("Helvetica", "italic");
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    
    const disclaimerText = t("pdf_legal_disclaimer");
    if (disclaimerText.length > 120) {
      doc.text(disclaimerText.substring(0, 120), 20, 280);
      doc.text(disclaimerText.substring(120), 20, 284);
    } else {
      doc.text(disclaimerText, 20, 280);
    }

    doc.save(`sejourtaxe_${selectedCommuneName.toLowerCase().replace(/\s+/g, "_")}.pdf`);
  };

  // Actions: Copy Result Text
  const triggerCopy = () => {
    const text = `${t("copy_title")}
--------------------------------------
${t("calc_print_city")}: ${selectedCommuneName} (${departement})
${t("copy_rent_ht")}: ${modeCalcul === "pourcentage" ? `${prixTotalHT.toFixed(2)} €` : t("pdf_not_applicable")}
${t("copy_adults")}: ${nombreAdultes}
${t("copy_children")}: ${nombreEnfants}
${t("copy_nights")}: ${nombreNuits}
${t("copy_establishment")}: ${getHebergementTypeLabel(hebergementType)} (${getClassementLabel(classement)})
--------------------------------------
${t("copy_total_due")}: ${result.taxeTotale.toFixed(2)} €
Soit ${result.taxeParAdulteParNuit.toFixed(3)} € ${t("pdf_per_adult_night")}
--------------------------------------
${t("copy_site_footer")} https://sejourtaxe.com`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Actions: Share URL with state
  const triggerShare = () => {
    const shareUrl = `${window.location.origin}/calculateur-taxe-de-sejour?ville=${encodeURIComponent(selectedCommuneName)}&postalCode=${encodeURIComponent(selectedPostalCode)}&adultes=${nombreAdultes}&enfants=${nombreEnfants}&nuits=${nombreNuits}&prix=${prixTotalHT}&hebergementType=${encodeURIComponent(hebergementType)}&classement=${encodeURIComponent(classement)}&lang=${language}`;
    
    const desc = t("share_desc")
      .replace("{total}", result.taxeTotale.toFixed(2))
      .replace("{ville}", selectedCommuneName);

    if (navigator.share) {
      navigator.share({
        title: t("share_text"),
        text: desc,
        url: shareUrl
      }).catch(() => {
        // Fallback to clipboard if rejected
        navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const resetForm = () => {
    setSearchQuery("Paris (75)");
    setSelectedCommuneName("Paris");
    setSelectedPostalCode("75000");
    setDepartement("Paris (75)");
    setRegion("Île-de-France");
    setSelectedPreset("Paris (75)");
    
    setHebergementType("Meublé de tourisme");
    setClassement("3 étoiles");
    setPrixTotalHT(800);
    setNombreAdultes(2);
    setNombreEnfants(0);
    setNombreNuits(4);
  };

  return (
    <div className="space-y-12 print:space-y-6">
      {/* Page Header (Hidden on print) */}
      <div className="py-8 border-b border-black/10 print:hidden transition-colors">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          {t("calc_main_title").includes(" ") ? (
            <>
              {t("calc_main_title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#d1121d]">{t("calc_main_title").split(" ").slice(-1).join(" ")}</span>
            </>
          ) : (
            <>
              {t("calc_main_title").substring(0, 4)}
              <span className="text-[#d1121d]">{t("calc_main_title").substring(4)}</span>
            </>
          )}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          {t("calc_main_subtitle")}
        </p>
      </div>

      <AdBanner slotType="top" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls (Hidden on Print) */}
        <div className="lg:col-span-7 border border-black p-6 sm:p-8 space-y-8 bg-white print:hidden transition-colors">
          <div className="flex items-center justify-between border-b border-black pb-4">
            <h2 className="text-base font-black text-black uppercase tracking-wider flex items-center gap-2">
              <Calculator className="h-4 w-4 text-[#d1121d]" />
              <span>{t("form_title")}</span>
            </h2>
            <button
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-[#d1121d] font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>{t("form_reset")}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* 35,000+ Communes Autocomplete Input */}
            <div className="sm:col-span-2 relative" ref={autocompleteRef}>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#d1121d]" />
                <span>{t("field_commune")}</span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => {
                    ensureCommunesLoaded();
                    setIsSuggestionsOpen(true);
                  }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSuggestionsOpen(true);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={t("field_commune_placeholder")}
                  className="w-full bg-[#fcfcfc] border border-black/30 rounded-none px-4 py-3 pl-10 text-sm text-black focus:outline-none focus:border-[#d1121d] transition-all font-bold"
                />
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                {isLoadingCommunes && (
                  <RefreshCw className="absolute right-3.5 top-3.5 h-4 w-4 text-[#d1121d] animate-spin" />
                )}
              </div>

              {/* Suggestions dropdown list */}
              {isSuggestionsOpen && (searchQuery.trim() !== "" || communesList.length > 0) && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-black shadow-xl max-h-60 overflow-y-auto rounded-none transition-all">
                  {isLoadingCommunes ? (
                    <div className="p-4 text-xs font-bold text-slate-400 text-center uppercase tracking-wider">{t("calc_loading_communes")}</div>
                  ) : filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={suggestion.id}
                        onClick={() => selectCommune(suggestion)}
                        className={`w-full text-left px-4 py-3 text-xs flex justify-between items-center transition-all cursor-pointer border-b border-black/5 ${
                          index === activeSuggestionIndex
                            ? "bg-[#d1121d] text-white"
                            : "text-black hover:bg-black/5"
                        }`}
                      >
                        <span className="font-bold">{suggestion.name}</span>
                        <span className={`text-[10px] uppercase font-mono tracking-wider ${index === activeSuggestionIndex ? "text-white" : "text-[#d1121d]"}`}>
                          {suggestion.postalCode} ({suggestion.department.split('(')[1]?.replace(')', '') || suggestion.code.substring(0, 2)})
                        </span>
                      </button>
                    ))
                  ) : searchQuery.trim() !== "" ? (
                    <div className="p-4 text-xs font-bold text-slate-400 text-center uppercase tracking-wider">{t("calc_no_commune")}</div>
                  ) : (
                    // Default recommendations if search is empty but focused
                    <div className="p-2 space-y-1">
                      <div className="p-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-black/5">{t("calc_popular_destinations")}</div>
                      {Object.keys(COMMUNE_PRESETS).map((key) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedCommuneName(COMMUNE_PRESETS[key].name);
                            setDepartement(COMMUNE_PRESETS[key].department);
                            setRegion(COMMUNE_PRESETS[key].region);
                            setSearchQuery(key);
                            setIsSuggestionsOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-black hover:bg-[#d1121d] hover:text-white transition-all flex justify-between"
                        >
                          <span>{COMMUNE_PRESETS[key].name}</span>
                          <span className="text-[10px] text-slate-400 font-mono font-normal">{COMMUNE_PRESETS[key].region}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Type d'hébergement */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                {t("field_type")}
              </label>
              <select
                value={hebergementType}
                onChange={(e) => setHebergementType(e.target.value)}
                className="w-full bg-[#fcfcfc] border border-black/30 rounded-none px-4 py-3 text-sm text-black focus:outline-none focus:border-[#d1121d] transition-all font-bold"
              >
                <option value="Meublé de tourisme">{t("type_meuble")}</option>
                <option value="Hôtel">{t("type_hotel")}</option>
                <option value="Chambre d'hôtes">{t("type_chambre")}</option>
                <option value="Camping">{t("type_camping")}</option>
                <option value="Résidence de tourisme">{t("type_residence")}</option>
              </select>
            </div>

            {/* Classement */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                {t("field_rating")}
              </label>
              <select
                value={classement}
                onChange={(e) => setClassement(e.target.value)}
                className="w-full bg-[#fcfcfc] border border-black/30 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#d1121d] transition-all font-black text-[#d1121d]"
              >
                <option value="Non classé">{t("rating_non_classe")}</option>
                <option value="1 étoile">{t("rating_1_star")}</option>
                <option value="2 étoiles">{t("rating_2_stars")}</option>
                <option value="3 étoiles">{t("rating_3_stars")}</option>
                <option value="4 étoiles">{t("rating_4_stars")}</option>
                <option value="5 étoiles">{t("rating_5_stars")}</option>
                <option value="Palace / Exceptionnel">{t("rating_palace")}</option>
              </select>
            </div>
          </div>

          {/* Occupants card */}
          <div className="bg-white p-6 space-y-6 border border-black/30">
            <h3 className="text-xs font-black text-black uppercase tracking-widest border-b border-black/10 pb-2">{t("card_occupants_title")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Prix Total HT */}
              {modeCalcul === "pourcentage" && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1">
                    <Euro className="h-4 w-4 text-[#d1121d]" />
                    <span>{t("field_rent_ht")}</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={prixTotalHT}
                    onChange={(e) => setPrixTotalHT(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-black/30 rounded-none px-4 py-3 text-sm text-black font-extrabold focus:outline-none focus:border-[#d1121d] transition-all"
                  />
                  <p className="text-[11px] text-slate-500 mt-2 font-medium">
                    {t("field_rent_ht_desc")}
                  </p>
                </div>
              )}

              {/* Adultes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span>{t("field_adults")}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={nombreAdultes}
                  onChange={(e) => setNombreAdultes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white border border-black/30 rounded-none px-4 py-3 text-sm text-black font-extrabold focus:outline-none focus:border-[#d1121d] transition-all"
                />
              </div>

              {/* Enfants */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span>{t("field_children")}</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={nombreEnfants}
                  onChange={(e) => setNombreEnfants(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-black/30 rounded-none px-4 py-3 text-sm text-black font-extrabold focus:outline-none focus:border-[#d1121d] transition-all"
                />
              </div>

              {/* Nuits */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1">
                  <Moon className="h-4 w-4 text-slate-500" />
                  <span>{t("field_nights")}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={nombreNuits}
                  onChange={(e) => setNombreNuits(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white border border-black/30 rounded-none px-4 py-3 text-sm text-black font-extrabold focus:outline-none focus:border-[#d1121d] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Advanced rates (Editable details) */}
          <div className="border-t border-black/10 pt-6 space-y-6">
            <h3 className="text-xs font-black text-black uppercase tracking-widest flex items-center gap-1.5">
              <Info className="h-4 w-4 text-[#d1121d]" />
              <span>{t("card_tax_details_title")}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Taux fixe ou Pourcentage */}
              {modeCalcul === "fixe" ? (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                    {t("field_fixed_rate_label")}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tauxFixe}
                    onChange={(e) => setTauxFixe(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#fbfbfb] border border-black/20 rounded-none px-3 py-2 text-xs text-black font-bold focus:outline-none"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 flex items-center gap-0.5">
                      <Percent className="h-3 w-3 text-slate-400" />
                      <span>{t("field_pct_rate_label")}</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={pourcentage}
                      onChange={(e) => setPourcentage(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-[#fbfbfb] border border-black/20 rounded-none px-3 py-2 text-xs text-black font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                      {t("field_ceiling_label")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={plafond}
                      onChange={(e) => setPlafond(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-[#fbfbfb] border border-black/20 rounded-none px-3 py-2 text-xs text-black font-bold focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Taxe additionnelle Départementale */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  {t("field_dep_tax_label")}
                </label>
                <div className="flex items-center bg-[#fbfbfb] border border-black/20 rounded-none px-2.5">
                  <input
                    type="number"
                    min="0"
                    value={taxeAdditionnelleDepartementale}
                    onChange={(e) => setTaxeAdditionnelleDepartementale(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-transparent border-0 py-2 text-xs text-black font-bold focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">%</span>
                </div>
              </div>

              {/* Taxe additionnelle Régionale */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  {t("field_reg_tax_label")}
                </label>
                <div className="flex items-center bg-[#fbfbfb] border border-black/20 rounded-none px-2.5">
                  <input
                    type="number"
                    min="0"
                    value={taxeAdditionnelleRegionale}
                    onChange={(e) => setTaxeAdditionnelleRegionale(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-transparent border-0 py-2 text-xs text-black font-bold focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">%</span>
                </div>
              </div>

              {/* Taxe additionnelle Transport */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  {t("field_trans_tax_label")}
                </label>
                <div className="flex items-center bg-[#fbfbfb] border border-black/20 rounded-none px-2.5">
                  <input
                    type="number"
                    min="0"
                    value={taxeAdditionnelleTransport}
                    onChange={(e) => setTaxeAdditionnelleTransport(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-transparent border-0 py-2 text-xs text-black font-bold focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">%</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 italic">
              {t("calc_manual_override_notice").includes("{city}") ? (
                <>
                  {t("calc_manual_override_notice").split("{city}")[0]}
                  <strong className="text-[#d1121d]">{selectedCommuneName}</strong>
                  {t("calc_manual_override_notice").split("{city}")[1]}
                </>
              ) : (
                t("calc_manual_override_notice")
              )}
            </p>
          </div>
        </div>

        {/* Right Column: Calculation Results (Black card with clean white layouts & Red Title) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Main estimation receipt (Clean and white) */}
          <div className="bg-white text-black border border-black p-6 sm:p-8 space-y-6 transition-colors" id="calc-result-card">
            <span className="text-[10px] uppercase tracking-widest font-black text-[#d1121d] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>{t("calc_estimation_report")}</span>
            </span>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">{t("calc_total_estimation_label")}</p>
              <h3 className="text-5xl font-black tracking-tight mt-2 text-black">
                {result.taxeTotale.toFixed(2)} <span className="text-[#d1121d] font-bold">€</span>
              </h3>
            </div>

            {/* Print metadata header */}
            <div className="hidden print:block border-b border-black/25 pb-4 space-y-1">
              <p className="text-xs"><strong>{t("calc_print_doc_title")}</strong></p>
              <p className="text-[10px] text-slate-500">
                {t("calc_print_city")}: {selectedCommuneName} | {t("calc_print_category")}: {getHebergementTypeLabel(hebergementType)} ({getClassementLabel(classement)})
              </p>
            </div>

            <div className="border-t border-black/10 pt-6 grid grid-cols-2 gap-y-6 gap-x-4 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-1">{t("calc_per_adult_night_label")}</span>
                <span className="font-extrabold text-black text-sm">{result.taxeParAdulteParNuit.toFixed(3)} €</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-1">{t("calc_taxed_adults")}</span>
                <span className="font-extrabold text-black text-sm">{result.nombreAdultesTaxables}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-1">{t("calc_stay_nights")}</span>
                <span className="font-extrabold text-black text-sm">{result.nombreNuits}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-1">{t("calc_exempt_children")}</span>
                <span className="font-extrabold text-green-600 text-sm">{result.nombreEnfantsExoneres} ({t("calc_free")})</span>
              </div>
            </div>

            {result.prixParPersonneParNuit > 0 && (
              <div className="bg-white p-4 border border-black/30 text-xs">
                <span className="text-slate-500 block uppercase tracking-wider text-[9px] mb-1">{t("calc_rent_per_traveler_night")}</span>
                <span className="font-mono text-black text-sm font-bold">{result.prixParPersonneParNuit.toFixed(2)} €</span>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-black/10 print:hidden">
              <button
                id="btn-copy-result"
                onClick={triggerCopy}
                className="flex items-center justify-center gap-1.5 bg-black hover:bg-[#d1121d] text-white py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? t("calc_copied") : t("calc_copy")}</span>
              </button>
              
              <button
                id="btn-share-result"
                onClick={triggerShare}
                className="flex items-center justify-center gap-1.5 bg-black hover:bg-[#d1121d] text-white py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all"
              >
                {shared ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{shared ? t("calc_shared") : t("calc_share")}</span>
              </button>

              <button
                id="btn-pdf-result"
                onClick={triggerExportPDF}
                className="col-span-1 flex items-center justify-center gap-1.5 bg-black hover:bg-[#d1121d] text-white py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all"
              >
                <Download className="h-3.5 w-3.5 text-[#d1121d]" />
                <span>PDF</span>
              </button>

              <button
                id="btn-print-result"
                onClick={triggerPrint}
                className="col-span-1 flex items-center justify-center gap-1.5 bg-black hover:bg-[#d1121d] text-white py-2.5 px-3 text-xs uppercase tracking-wider font-extrabold cursor-pointer transition-all"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>{t("calc_print")}</span>
              </button>
            </div>
          </div>

          {/* Formulation steps */}
          <div className="border border-black p-6 space-y-6 bg-white transition-colors print:border-black print:p-6 print:text-black">
            <h3 className="text-xs font-black text-black uppercase tracking-wider border-b border-black pb-3">
              {t("formulation_title")}
            </h3>

            <div className="space-y-6">
              {result.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 text-sm">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-none bg-black text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    {idx < result.steps.length - 1 && (
                      <div className="w-[1px] bg-black/15 print:bg-black/10 grow my-2" />
                    )}
                  </div>
                  <div className="space-y-1 grow">
                    <h4 className="font-bold text-black text-xs uppercase tracking-wider">{step.label}</h4>
                    <p className="text-[11px] text-slate-500 font-mono leading-relaxed">{step.formula}</p>
                    <p className="text-xs font-black text-[#d1121d] flex items-center gap-1">
                      <CornerDownRight className="h-3.5 w-3.5 text-[#d1121d] print:text-black shrink-0" />
                      <span>{step.result}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border-l-2 border-[#d1121d] p-4 text-xs text-slate-500 space-y-2 print:border-black print:bg-slate-50 border border-black/15">
              <div className="flex gap-1.5 text-[#d1121d] font-bold uppercase tracking-wider text-[10px]">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{t("legal_notice_title")}</span>
              </div>
              <p className="leading-relaxed">
                {t("legal_notice_text_short")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slotType="bottom" />
    </div>
  );
}
