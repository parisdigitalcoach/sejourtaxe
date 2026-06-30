import { Calculator, ArrowRight, Users, HelpCircle, Building2, StarOff } from "lucide-react";
import AdBanner from "./AdBanner";
import FaqSection from "./FaqSection";

interface HomeViewProps {
  navigate: (path: string) => void;
}

export default function HomeView({ navigate }: HomeViewProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-16 border-b border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-black uppercase">
              Advantage <br />
              <span className="text-[#d1121d]">Séjour</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-xl font-medium tracking-tight leading-snug">
              Calculez instantanément la taxe de séjour pour vos locations de vacances, hôtels, gîtes ou chambres d’hôtes en France. Conforme 2026.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end h-full pt-4 lg:pt-0">
            <button
              onClick={() => navigate("/calculateur-taxe-de-sejour")}
              className="group w-full bg-[#d1121d] hover:bg-black text-white text-xs uppercase tracking-widest font-extrabold py-5 px-8 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Calculer ma taxe de séjour</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate("/comment-calculer-la-taxe-de-sejour")}
              className="w-full bg-transparent hover:bg-black/5 text-black text-left text-xs uppercase tracking-widest font-extrabold py-5 px-8 transition-all border-b border-black/10 cursor-pointer"
            >
              Comment ça marche ?
            </button>
          </div>
        </div>
      </section>

      {/* Ad slot below top content */}
      <AdBanner slotType="top" />

      {/* Red Highlight Callout block like the "What's the advantage?" block */}
      <section className="space-y-8">
        <div className="bg-[#d1121d] text-white p-6 sm:p-10">
          <span className="text-xs uppercase tracking-widest font-extrabold opacity-90">Guide de référence</span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 leading-tight">
            Pourquoi calculer et collecter la taxe de séjour ?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              Une obligation légale pour financer l'attractivité de vos communes.
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              La <strong>taxe de séjour</strong> est un impôt obligatoire reversé à la commune ou à l'EPCI. Elle sert au développement touristique, à la préservation des espaces naturels et aux investissements d'infrastructures locales.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Chaque hébergeur (ou plateforme automatique comme Airbnb/Booking) doit la calculer avec rigueur pour éviter tout redressement fiscal local.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/comment-calculer-la-taxe-de-sejour")}
                className="text-[#d1121d] font-black hover:underline inline-flex items-center gap-1 text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>Consulter la notice de calcul complète</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#d1121d]">Les 3 règles indispensables</h4>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-xs uppercase tracking-widest font-black text-black">Règle 01</div>
                <div className="sm:col-span-9 space-y-1">
                  <h5 className="font-bold text-black text-sm">Exonération des mineurs</h5>
                  <p className="text-xs text-slate-500">
                    Seuls les adultes paient. Les mineurs (moins de 18 ans) sont exonérés mais font partie du diviseur pour le calcul des meublés non classés.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-4 border-t border-black/5">
                <div className="sm:col-span-3 text-xs uppercase tracking-widest font-black text-black">Règle 02</div>
                <div className="sm:col-span-9 space-y-1">
                  <h5 className="font-bold text-black text-sm">Tarif fixe pour classés</h5>
                  <p className="text-xs text-slate-500">
                    Les hôtels et gîtes avec étoiles (1 à 5) se voient appliquer un barème fixe voté par la collectivité locale par adulte et par nuit.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-4 border-t border-black/5">
                <div className="sm:col-span-3 text-xs uppercase tracking-widest font-black text-black">Règle 03</div>
                <div className="sm:col-span-9 space-y-1">
                  <h5 className="font-bold text-black text-sm">Proportionnel pour non classés</h5>
                  <p className="text-xs text-slate-500">
                    Les meublés sans étoiles sont taxés à un pourcentage (%) du prix HT de la nuitée par occupant, dans la limite du plafond légal local.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide & Calculator Quick Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="border border-black/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="h-8 w-8 bg-black text-white flex items-center justify-center font-bold text-sm">A</div>
            <h3 className="text-lg font-bold text-black uppercase tracking-tight">Simulateur en ligne</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Effectuez des simulations pour vos hébergements classés ou non classés, incluant les taxes départementales, régionales d'Île-de-France et la re-ventilation par voyageur.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigate("/calculateur-taxe-de-sejour")}
              className="text-[#d1121d] font-black inline-flex items-center gap-1.5 text-xs uppercase tracking-wider hover:underline cursor-pointer"
            >
              <span>Lancer le simulateur</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="border border-black/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="h-8 w-8 bg-black text-white flex items-center justify-center font-bold text-sm">B</div>
            <h3 className="text-lg font-bold text-black uppercase tracking-tight">Formules et Textes Légaux</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Consultez les textes légaux, les décrets du code général des collectivités territoriales, et découvrez comment chaque taxe additionnelle s'ajoute à la formule.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigate("/comment-calculer-la-taxe-de-sejour")}
              className="text-[#d1121d] font-black inline-flex items-center gap-1.5 text-xs uppercase tracking-wider hover:underline cursor-pointer"
            >
              <span>Lire le guide fiscal</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Ad slot at the bottom */}
      <AdBanner slotType="bottom" />
    </div>
  );
}
