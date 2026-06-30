import React from "react";
import { Calculator, ExternalLink, Heart, Cookie, Shield, Info, Twitter, Linkedin, Facebook } from "lucide-react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  navigate: (path: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const siteVersion = (import.meta as any).env.VITE_SITE_VERSION || "1.0.0";
  const { openPreferences } = useCookieConsent();
  const { t } = useLanguage();

  const twitterUrl = (import.meta as any).env.VITE_TWITTER_URL || "";
  const linkedinUrl = (import.meta as any).env.VITE_LINKEDIN_URL || "";
  const facebookUrl = (import.meta as any).env.VITE_FACEBOOK_URL || "";

  const handleFaqClick = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("faq-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <footer className="bg-white border-t-2 border-black mt-auto transition-colors duration-200" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Info (Col span 4) */}
          <div className="md:col-span-4 space-y-4" id="footer-col-brand">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-xl font-black text-black tracking-tighter hover:opacity-90 cursor-pointer uppercase"
              id="footer-brand-logo"
            >
              <div className="bg-[#d1121d] text-white p-2 flex items-center justify-center">
                <Calculator className="h-5 w-5" />
              </div>
              <span>
                SEJOUR<span className="text-[#d1121d]">TAXE</span>
              </span>
            </button>
            <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-sm">
              {t("footer_desc")}
            </p>
            {(twitterUrl || linkedinUrl || facebookUrl) && (
              <div className="flex items-center gap-3 pt-2" id="footer-social-links">
                {twitterUrl && (
                  <a 
                    href={twitterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-[#d1121d] transition-colors"
                    aria-label="Twitter / X"
                    id="social-twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {linkedinUrl && (
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-[#d1121d] transition-colors"
                    aria-label="LinkedIn"
                    id="social-linkedin"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {facebookUrl && (
                  <a 
                    href={facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-[#d1121d] transition-colors"
                    aria-label="Facebook"
                    id="social-facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links (Col span 4) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4" id="footer-col-nav">
            <div>
              <h3 className="text-xs font-black text-black tracking-widest uppercase mb-4">
                {t("footer_nav_title")}
              </h3>
              <ul className="space-y-3 text-xs font-bold">
                <li>
                  <button 
                    onClick={() => navigate("/")} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-home"
                  >
                    {t("nav_home")}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/calculateur-taxe-de-sejour")} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-calc"
                  >
                    {t("nav_calculator")}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleFaqClick} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-faq"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/contact")} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-contact"
                  >
                    {t("nav_contact")}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-black tracking-widest uppercase mb-4">
                {t("footer_legal_title")}
              </h3>
              <ul className="space-y-3 text-xs font-bold">
                <li>
                  <button 
                    onClick={() => navigate("/politique-de-confidentialite")} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-privacy"
                  >
                    {t("nav_privacy")}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/politique-des-cookies")} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-cookies"
                  >
                    {t("nav_cookies")}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/mentions-legales")} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-legal"
                  >
                    {t("nav_legal")}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate("/plan-du-site")} 
                    className="text-slate-500 hover:text-[#d1121d] transition-colors cursor-pointer text-left"
                    id="footer-nav-sitemap"
                  >
                    {t("nav_sitemap")}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Cookie Preferences Column (Col span 4) */}
          <div className="md:col-span-4 space-y-4" id="footer-col-preference">
            <h3 className="text-xs font-black text-black tracking-widest uppercase">
              {t("footer_cookies_choices_title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {t("footer_cookies_choices_desc")}
            </p>
            <div>
              <button
                onClick={openPreferences}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-[#d1121d] hover:text-white text-black border border-black/15 py-2.5 px-4 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                id="btn-footer-cookie-preferences"
              >
                <Cookie className="h-4 w-4" />
                <span>{t("footer_cookies_btn")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Official Rates External Link (Notice styled precisely) */}
        <div className="mt-10 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-5" id="footer-official-banner">
          <div className="flex items-start gap-3">
            <div className="bg-[#d1121d] text-white p-1 shrink-0">
              <Info className="h-4 w-4" />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl font-medium">
              {t("footer_warning")}
            </p>
          </div>
          <a
            href="https://taxesejour.impots.gouv.fr/FR/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 font-bold text-xs bg-black hover:bg-[#d1121d] text-white py-2.5 px-4 border border-transparent transition-colors uppercase tracking-wider"
            id="link-official-government-rates"
          >
            <span>{t("footer_gov_rates_btn")}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4" id="footer-credits">
            <p>© {currentYear} SejourTaxe.com - {t("footer_rights")}</p>
            <span className="hidden sm:inline text-slate-300">|</span>
            <p className="font-bold text-slate-500">Version {siteVersion}</p>
          </div>
          <p className="flex items-center gap-1.5 font-bold">
            <span>{t("footer_developed")}</span>
            <Heart className="h-3 w-3 text-[#d1121d] fill-[#d1121d]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
