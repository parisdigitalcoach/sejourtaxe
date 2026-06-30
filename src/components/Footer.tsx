import { Calculator, ExternalLink, Heart } from "lucide-react";

interface FooterProps {
  navigate: (path: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fbfbfb] dark:bg-[#121212] border-t border-black/10 dark:border-white/10 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Info (Col span 5) */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-xl font-black text-black dark:text-white tracking-tighter hover:opacity-90 cursor-pointer uppercase"
            >
              <div className="bg-[#d1121d] text-white p-2 flex items-center justify-center">
                <Calculator className="h-5 w-5" />
              </div>
              <span>
                SEJOUR<span className="text-[#d1121d]">TAXE</span>
              </span>
            </button>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Outil de calcul gratuit, simple et rapide de la taxe de séjour en France pour tous types d'hébergements touristiques. Conforme aux taux officiels 2026.
            </p>
          </div>

          {/* Quick Links (Col span 3) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-black text-black dark:text-white tracking-widest uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button 
                  onClick={() => navigate("/")} 
                  className="font-bold text-slate-500 dark:text-slate-400 hover:text-[#d1121d] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/calculateur-taxe-de-sejour")} 
                  className="font-bold text-slate-500 dark:text-slate-400 hover:text-[#d1121d] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Calculateur de taxe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/comment-calculer-la-taxe-de-sejour")} 
                  className="font-bold text-slate-500 dark:text-slate-400 hover:text-[#d1121d] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Guide d'explication
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/contact")} 
                  className="font-bold text-slate-500 dark:text-slate-400 hover:text-[#d1121d] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links (Col span 4) */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-black text-black dark:text-white tracking-widest uppercase mb-4">
              Informations légales
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button 
                  onClick={() => navigate("/politique-de-confidentialite")} 
                  className="font-bold text-slate-500 dark:text-slate-400 hover:text-[#d1121d] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/mentions-legales")} 
                  className="font-bold text-slate-500 dark:text-slate-400 hover:text-[#d1121d] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mentions légales
                </button>
              </li>
              <li>
                <a
                  href="https://reseaulocal.impots.gouv.fr/vdf-taxe-sejour/recherche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#d1121d] hover:underline transition-colors"
                >
                  <span>Tarifs officiels de l'État</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Warning (Notice styled exactly like other legal panels) */}
        <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5">
          <div className="max-w-3xl mx-auto border-l-2 border-[#d1121d] bg-[#fcfcfc] dark:bg-neutral-900/40 p-5 text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed text-center">
            Avertissement : Ce calculateur fournit une estimation indicative. Le montant officiel dépend des tarifs votés par la commune ou l’EPCI compétent. Bien que nous nous efforcions d'appliquer les règles en vigueur de l'administration fiscale française, vérifiez toujours les tarifs officiels publiés par votre collectivité locale ou sur la plateforme officielle du gouvernement.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <p>© {currentYear} SejourTaxe.com - Tous droits réservés.</p>
          <p className="flex items-center gap-1.5 font-bold">
            <span>Développé avec professionnalisme pour les hébergeurs français</span>
            <Heart className="h-3 w-3 text-[#d1121d] fill-[#d1121d]" />
          </p>
        </div>
      </div>
    </footer>
  );
}

