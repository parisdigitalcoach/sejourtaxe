import React, { useState, useEffect } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { X, Shield, BarChart3, Target, Check } from "lucide-react";

export default function CookiePreferencesModal() {
  const { consent, showModal, closePreferences, saveCustomPreferences } = useCookieConsent();
  
  const [prefs, setPrefs] = useState({
    analytics: true,
    marketing: true
  });

  // Sync state when modal opens or consent loads
  useEffect(() => {
    if (consent) {
      setPrefs({
        analytics: consent.analytics,
        marketing: consent.marketing
      });
    }
  }, [consent, showModal]);

  if (!showModal) return null;

  const handleSave = () => {
    saveCustomPreferences(prefs);
    closePreferences();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="cookie-pref-modal">
      <div 
        className="bg-white border-2 border-black w-full max-w-lg p-6 sm:p-8 space-y-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        id="cookie-pref-modal-content"
      >
        {/* Close button */}
        <button 
          onClick={closePreferences}
          className="absolute top-4 right-4 text-slate-400 hover:text-black transition-colors p-1"
          aria-label="Fermer"
          id="btn-close-cookie-pref"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <span>Personnaliser</span>
            <span className="text-[#d1121d]">mes préférences</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Nous respectons votre vie privée. Ajustez ci-dessous vos consentements concernant les cookies utilisés sur notre plateforme SejourTaxe.com.
          </p>
        </div>

        <hr className="border-black/10" />

        {/* Categories List */}
        <div className="space-y-5 max-h-[350px] overflow-y-auto pr-1" id="cookie-categories-container">
          
          {/* 1. Necessary */}
          <div className="border border-black/10 p-4 space-y-2 bg-slate-50 flex items-start gap-3" id="cookie-cat-necessary">
            <div className="bg-black text-white p-2 mt-1">
              <Shield className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-wider text-black">Cookies strictement nécessaires</h3>
                <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 border border-green-200">Toujours activés</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Ces cookies sont indispensables au bon fonctionnement du site, comme la persistance de votre session de calcul et l'enregistrement de vos préférences de consentement. Ils ne stockent aucune donnée personnelle.
              </p>
            </div>
          </div>

          {/* 2. Analytics */}
          <div className="border border-black/10 p-4 space-y-2 flex items-start gap-3" id="cookie-cat-analytics">
            <div className="bg-black text-white p-2 mt-1">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-wider text-black">Cookies analytiques</h3>
                
                {/* Switch toggle */}
                <button
                  onClick={() => setPrefs({ ...prefs, analytics: !prefs.analytics })}
                  className={`w-12 h-6 flex items-center rounded-none p-1 transition-all border border-black ${
                    prefs.analytics ? "bg-[#d1121d]" : "bg-slate-200"
                  }`}
                  aria-label="Activer les cookies analytiques"
                  id="toggle-analytics-cookies"
                >
                  <div 
                    className={`bg-white h-4 w-4 border border-black transition-all ${
                      prefs.analytics ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Utilisé par <strong>Google Analytics</strong>. Ces cookies nous permettent de mesurer l'audience de notre site, d'analyser l'utilisation générale et d'améliorer continuellement l'expérience d'utilisation de nos outils de calcul.
              </p>
            </div>
          </div>

          {/* 3. Marketing / Ads */}
          <div className="border border-black/10 p-4 space-y-2 flex items-start gap-3" id="cookie-cat-marketing">
            <div className="bg-black text-white p-2 mt-1">
              <Target className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-wider text-black">Cookies marketing & ciblage</h3>
                
                {/* Switch toggle */}
                <button
                  onClick={() => setPrefs({ ...prefs, marketing: !prefs.marketing })}
                  className={`w-12 h-6 flex items-center rounded-none p-1 transition-all border border-black ${
                    prefs.marketing ? "bg-[#d1121d]" : "bg-slate-200"
                  }`}
                  aria-label="Activer les cookies de marketing"
                  id="toggle-marketing-cookies"
                >
                  <div 
                    className={`bg-white h-4 w-4 border border-black transition-all ${
                      prefs.marketing ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Utilisé par <strong>Google Ads (AdSense)</strong> et <strong>Google Tag Manager</strong>. Ces cookies permettent d'afficher des annonces publicitaires personnalisées de qualité qui soutiennent le financement et la gratuité de notre site.
              </p>
            </div>
          </div>

        </div>

        <hr className="border-black/10" />

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleSave}
            className="w-full bg-[#d1121d] hover:bg-black text-white text-xs uppercase tracking-widest font-black py-4 px-6 transition-all cursor-pointer flex items-center justify-center gap-2 border border-transparent"
            id="btn-save-cookie-prefs"
          >
            <Check className="h-4 w-4" />
            <span>Enregistrer mes choix</span>
          </button>
          
          <button
            onClick={() => {
              saveCustomPreferences({ analytics: true, marketing: true });
              closePreferences();
            }}
            className="w-full bg-black hover:bg-[#d1121d] text-white text-xs uppercase tracking-widest font-black py-4 px-6 transition-all cursor-pointer flex items-center justify-center border border-transparent"
            id="btn-accept-all-from-pref"
          >
            Accepter tout
          </button>
        </div>
      </div>
    </div>
  );
}
