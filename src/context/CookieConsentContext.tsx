import React, { createContext, useState, useEffect, useContext } from "react";
import { initIntegrations } from "../lib/integrations";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  consent: CookiePreferences | null;
  showBanner: boolean;
  showModal: boolean;
  acceptAll: () => void;
  denyAll: () => void;
  saveCustomPreferences: (preferences: Omit<CookiePreferences, "necessary">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "sejourtaxe_cookie_consent";
const ENABLE_BANNER_VAR = (import.meta as any).env.VITE_ENABLE_COOKIE_BANNER !== "false";

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // 1. Initial Load of Preferences from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setConsent(parsed);
        setShowBanner(false);
      } else if (ENABLE_BANNER_VAR) {
        // Only show banner if explicitly enabled or not disabled in env
        setShowBanner(true);
      }
    } catch (e) {
      console.warn("Could not read cookie consent from localStorage:", e);
      if (ENABLE_BANNER_VAR) {
        setShowBanner(true);
      }
    }
  }, []);

  // 2. Load allowed integrations whenever consent changes
  useEffect(() => {
    if (consent) {
      initIntegrations();
    }
  }, [consent]);

  const acceptAll = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allPreferences));
    } catch (e) {
      console.warn("Failed to write cookie consent to localStorage:", e);
    }
    setConsent(allPreferences);
    setShowBanner(false);
    setShowModal(false);
  };

  const denyAll = () => {
    const zeroPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(zeroPreferences));
    } catch (e) {
      console.warn("Failed to write cookie consent to localStorage:", e);
    }
    setConsent(zeroPreferences);
    setShowBanner(false);
    setShowModal(false);
  };

  const saveCustomPreferences = (customPrefs: Omit<CookiePreferences, "necessary">) => {
    const preferences: CookiePreferences = {
      necessary: true,
      ...customPrefs
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.warn("Failed to write cookie consent to localStorage:", e);
    }
    setConsent(preferences);
    setShowBanner(false);
    setShowModal(false);
  };

  const openPreferences = () => {
    setShowModal(true);
  };

  const closePreferences = () => {
    setShowModal(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        showBanner,
        showBannerState: showBanner, // safe fallback
        showModal,
        acceptAll,
        denyAll,
        saveCustomPreferences,
        openPreferences,
        closePreferences
      } as any}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
};
