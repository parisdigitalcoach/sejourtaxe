import { 
  BookOpen, Calculator, ShieldCheck, 
  ArrowRight, Users, Layers, Landmark 
} from "lucide-react";
import AdBanner from "./AdBanner";

interface GuideViewProps {
  navigate: (path: string) => void;
}

export default function GuideView({ navigate }: GuideViewProps) {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="py-8 border-b border-black/10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          Guide de <span className="text-[#d1121d]">Calcul</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          Découvrez en détail les formules officielles, l'intégration des taxes régionales ou départementales, et les conditions légales d'exonération applicables en 2026.
        </p>
      </div>

      <AdBanner slotType="top" />

      {/* Quick Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-black/15 p-5 space-y-3">
          <Users className="h-5 w-5 text-[#d1121d]" />
          <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">01. Moins de 18 ans</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Les enfants de moins de 18 ans sont totalement exonérés de la taxe de séjour en France par décret national.
          </p>
        </div>

        <div className="border border-black/15 p-5 space-y-3">
          <Landmark className="h-5 w-5 text-[#d1121d]" />
          <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">02. Majorations Locales</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Les départements et certaines régions ajoutent des taxes additionnelles de 10%, 15% ou 200% s'appliquant au taux de base.
          </p>
        </div>

        <div className="border border-black/15 p-5 space-y-3">
          <Layers className="h-5 w-5 text-[#d1121d]" />
          <h3 className="font-extrabold text-black uppercase text-xs tracking-wider">03. Plafonnement Proportionnel</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Les formules au pourcentage sont plafonnées au montant maximum voté par la collectivité pour les catégories supérieures.
          </p>
        </div>
      </section>

      {/* Main Guide Content */}
      <section className="space-y-12 text-slate-700 leading-relaxed">
        {/* Case 1: Classified */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <div className="h-6 w-6 bg-black text-white flex items-center justify-center text-xs">A</div>
            <h2>1. Tarifs Fixes (Hébergements Classés)</h2>
          </div>
          <p className="text-sm">
            Les hébergements touristiques officiellement classés en étoiles (Hôtels, Meublés de tourisme, Résidences classées, Villages de vacances) appliquent un <strong>tarif forfaitaire fixe par personne majeure et par nuit</strong>.
          </p>
          <p className="text-sm">
            Ce tarif varie de 0,20 € à plus de 5,00 € selon la catégorie choisie et le barème voté par l'assemblée locale de la commune.
          </p>
          
          <div className="bg-[#f6f6f6] p-4 font-mono text-xs text-black border-l-2 border-[#d1121d] space-y-2">
            <p className="font-extrabold uppercase tracking-wider text-[10px]">Formule générale :</p>
            <p className="font-bold">
              Taxe Globale = (Tarif de base + Majorations additionnelles) × Adultes × Nuits
            </p>
          </div>
        </div>

        {/* Case 2: Unclassified */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <div className="h-6 w-6 bg-black text-white flex items-center justify-center text-xs">B</div>
            <h2>2. Tarifs Proportionnels (Hébergements Non Classés)</h2>
          </div>
          <p className="text-sm">
            Pour tout hébergement saisonnier ne disposant pas d'un classement officiel en étoiles, le calcul se fait obligatoirement <strong>au pourcentage du coût hors taxes de la nuitée par personne</strong>.
          </p>
          
          <div className="bg-[#f6f6f6] p-5 font-mono text-xs text-black border-l-2 border-black space-y-4">
            <p className="font-black uppercase tracking-widest text-[9px] text-[#d1121d]">Étapes de calcul requises :</p>
            
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">Étape 01 : Prix par occupant par nuit</p>
              <p className="bg-white p-2.5 border border-black/10 font-bold">
                Prix par voyageur/nuit = Loyer HT total / (Voyageurs adultes + enfants) / Nuits
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">Étape 02 : Application du pourcentage</p>
              <p className="bg-white p-2.5 border border-black/10 font-bold">
                Taxe de base = Prix par voyageur/nuit × Pourcentage communal (de 1% à 5%)
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">Étape 03 : Écrêtement au plafond</p>
              <p className="bg-white p-2.5 border border-black/10 font-medium text-slate-600">
                La Taxe de base est plafonnée au montant maximal légal configuré par la commune.
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[9px]">Étape 04 : Taxes Additionnelles & Somme</p>
              <p className="bg-white p-2.5 border border-black/10 font-bold">
                Taxe finale = (Taxe de base plafonnée + Majorations additionnelles) × Adultes × Nuits
              </p>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 italic">
            * Important : Bien que les enfants soient exemptés de la taxe de séjour finale, leur nombre figure au dénominateur de l'Étape 01 afin de réduire le coût de la nuitée par personne.
          </p>
        </div>

        {/* Taxes additionnelles */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <Landmark className="h-5 w-5 text-[#d1121d]" />
            <h2>3. Majorations additionnelles courantes</h2>
          </div>
          <p className="text-sm">
            Plusieurs taxes régionales et départementales se greffent au taux de base décidé par la commune :
          </p>
          <div className="space-y-4 pt-2 text-xs">
            <div className="border-b border-black/5 pb-3">
              <h4 className="font-bold text-black text-sm uppercase tracking-wide">Majoration Départementale (+10%)</h4>
              <p className="text-slate-600 mt-1">
                Collectée par la majorité des départements pour l'entretien d'espaces touristiques et naturels sensibles.
              </p>
            </div>
            <div className="border-b border-black/5 pb-3">
              <h4 className="font-bold text-black text-sm uppercase tracking-wide">Majoration Régionale ferroviaire (+15%)</h4>
              <p className="text-slate-600 mt-1">
                Présente notamment en région PACA, Occitanie et Grand Sud-Ouest pour financer les lignes à grande vitesse.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm uppercase tracking-wide">Majoration Transports Île-de-France (+200%)</h4>
              <p className="text-slate-600 mt-1">
                Taxe additionnelle destinée au financement du Grand Paris Express et de l'amélioration des transports parisiens.
              </p>
            </div>
          </div>
        </div>

        {/* Exemptions */}
        <div className="space-y-4 border border-black/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-black font-extrabold text-lg uppercase tracking-tight">
            <ShieldCheck className="h-5 w-5 text-[#d1121d]" />
            <h2>4. Exonérations Légales Obligatoires</h2>
          </div>
          <p className="text-sm">
            L'article L. 2333-31 du CGCT définit les profils de voyageurs formellement exclus du versement de la taxe :
          </p>
          <ul className="list-decimal pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
            <li>Les résidents mineurs (âgés de moins de 18 ans au moment de l'enregistrement).</li>
            <li>Les travailleurs saisonniers disposant d'un contrat de travail local.</li>
            <li>Les personnes bénéficiant de mesures d'hébergement d'urgence sociale.</li>
            <li>Les locataires bénéficiant de loyers inférieurs à un seuil défini par l'administration locale.</li>
          </ul>
        </div>

        {/* CTA to Calculator (Solid black box) */}
        <div className="bg-black text-white p-6 sm:p-10 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Prêt à estimer votre taxe ?</h3>
          <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm font-medium">
            Utilisez notre simulateur en ligne gratuit intégrant tous les barèmes régionaux officiels pour un calcul fiable et 100% anonyme.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/calculateur-taxe-de-sejour")}
              className="bg-[#d1121d] hover:bg-white hover:text-black text-white text-xs uppercase tracking-widest font-extrabold py-4 px-8 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="h-4 w-4" />
              <span>Lancer le simulateur de calcul</span>
            </button>
          </div>
        </div>
      </section>

      <AdBanner slotType="bottom" />
    </div>
  );
}
