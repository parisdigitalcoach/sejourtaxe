import React from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { Cookie, Settings, Check, Ban } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CookieConsentProps {
  navigate: (path: string) => void;
}

export default function CookieConsent({ navigate }: CookieConsentProps) {
  const { showBanner, acceptAll, denyAll, openPreferences } = useCookieConsent();
  const { t } = useLanguage();

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-black p-4 sm:p-6 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] animate-fade-in"
      id="cookie-consent-banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Info text & Links */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#d1121d] text-white p-1">
              <Cookie className="h-4 w-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-black">{t("cookie_banner_title")}</span>
          </div>
          
          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-4xl">
            {t("cookie_banner_desc")}
          </p>
          
          {/* Policy Links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold">
            <button 
              onClick={() => navigate("/politique-de-confidentialite")}
              className="text-slate-500 hover:text-[#d1121d] hover:underline cursor-pointer text-left"
              id="link-privacy-policy-cookies"
            >
              {t("nav_privacy")}
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => navigate("/politique-des-cookies")}
              className="text-slate-500 hover:text-[#d1121d] hover:underline cursor-pointer text-left"
              id="link-cookies-policy-cookies"
            >
              {t("nav_cookies")}
            </button>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto shrink-0">
          {/* ⚙ Personnaliser */}
          <button
            onClick={openPreferences}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-black text-[11px] uppercase tracking-wider font-extrabold py-3 px-4 transition-all flex items-center justify-center gap-1.5 border border-black/15 cursor-pointer"
            id="btn-customize-cookies"
          >
            <Settings className="h-3.5 w-3.5 text-slate-500" />
            <span>{t("cookie_btn_customize")}</span>
          </button>

          {/* ❌ Refuser */}
          <button
            onClick={denyAll}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-black text-[11px] uppercase tracking-wider font-extrabold py-3 px-4 transition-all flex items-center justify-center gap-1.5 border border-black/15 cursor-pointer"
            id="btn-refuse-cookies"
          >
            <Ban className="h-3.5 w-3.5 text-slate-500" />
            <span>{t("cookie_btn_refuse")}</span>
          </button>

          {/* ✅ Accepter tout */}
          <button
            onClick={acceptAll}
            className="w-full sm:w-auto bg-[#d1121d] hover:bg-black text-white text-[11px] uppercase tracking-wider font-black py-3 px-6 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            id="btn-accept-all-cookies"
          >
            <Check className="h-3.5 w-3.5" />
            <span>{t("cookie_btn_accept")}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
