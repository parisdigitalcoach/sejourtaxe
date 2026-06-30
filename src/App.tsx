import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import CalculatorView from "./components/CalculatorView";
import GuideView from "./components/GuideView";
import PrivacyView from "./components/PrivacyView";
import LegalView from "./components/LegalView";
import ContactView from "./components/ContactView";
import { initIntegrations, trackPageView } from "./lib/integrations";
import { updateSEO } from "./lib/seo";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>("/");

  // Initialize popstate and routing
  useEffect(() => {
    const initialPath = window.location.pathname;
    setCurrentPath(initialPath || "/");

    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Initialize analytics, tag manager, adsense, GSC
  useEffect(() => {
    initIntegrations();
  }, []);

  // Handle path transitions (tracking, SEO)
  useEffect(() => {
    trackPageView(currentPath);
    updateSEO(currentPath);
  }, [currentPath]);

  // Force light mode
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    try {
      localStorage.setItem("theme", "light");
    } catch (e) {
      // Ignore storage errors in sandbox/iframe
    }
  }, []);

  // Navigate helper
  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render core views
  const renderView = () => {
    switch (currentPath) {
      case "/":
        return <HomeView navigate={navigate} />;
      case "/calculateur-taxe-de-sejour":
        return <CalculatorView />;
      case "/comment-calculer-la-taxe-de-sejour":
        return <GuideView navigate={navigate} />;
      case "/politique-de-confidentialite":
        return <PrivacyView />;
      case "/mentions-legales":
        return <LegalView />;
      case "/contact":
        return <ContactView />;
      default:
        return <HomeView navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-black selection:bg-[#d1121d]/10 selection:text-[#d1121d] transition-colors duration-200">
      {/* Dynamic GTM noscript is handled in integrations.ts */}
      
      {/* Header with Nav */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Layout Stage */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-fade-in">
          {renderView()}
        </div>
      </main>

      {/* Footer Block */}
      <Footer navigate={navigate} />
    </div>
  );
}
