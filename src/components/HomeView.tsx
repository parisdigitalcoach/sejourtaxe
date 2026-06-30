import { ArrowRight } from "lucide-react";
import AdBanner from "./AdBanner";
import FaqSection from "./FaqSection";
import { useLanguage } from "../context/LanguageContext";

interface HomeViewProps {
  navigate: (path: string) => void;
}

export default function HomeView({ navigate }: HomeViewProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-16 border-b border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-black uppercase">
              {t("hero_title_1")} <br />
              <span className="text-[#d1121d]">{t("hero_title_2")}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 max-w-xl font-medium tracking-tight leading-snug">
              {t("hero_subtitle")}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end h-full pt-4 lg:pt-0">
            <button
              onClick={() => navigate("/calculateur-taxe-de-sejour")}
              className="group w-full bg-[#d1121d] hover:bg-black text-white text-xs uppercase tracking-widest font-extrabold py-5 px-8 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>{t("hero_btn_calc")}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate("/comment-calculer-la-taxe-de-sejour")}
              className="w-full bg-transparent hover:bg-black/5 text-black text-left text-xs uppercase tracking-widest font-extrabold py-5 px-8 transition-all border-b border-black/10 cursor-pointer"
            >
              {t("hero_btn_how")}
            </button>
          </div>
        </div>
      </section>

      {/* Ad slot below top content */}
      <AdBanner slotType="top" />

      {/* Red Highlight Callout block like the "What's the advantage?" block */}
      <section className="space-y-8">
        <div className="bg-[#d1121d] text-white p-6 sm:p-10">
          <span className="text-xs uppercase tracking-widest font-extrabold opacity-90">{t("guide_badge")}</span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 leading-tight">
            {t("guide_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              {t("why_subtitle")}
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {t("why_p1")}
            </p>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {t("why_p2")}
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/comment-calculer-la-taxe-de-sejour")}
                className="text-[#d1121d] font-black hover:underline inline-flex items-center gap-1 text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>{t("why_btn")}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-black/10 pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#d1121d]">{t("rules_title")}</h4>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-xs uppercase tracking-widest font-black text-black">{t("rule1_tag")}</div>
                <div className="sm:col-span-9 space-y-1">
                  <h5 className="font-bold text-black text-sm">{t("rule1_title")}</h5>
                  <p className="text-xs text-slate-500">
                    {t("rule1_desc")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-4 border-t border-black/5">
                <div className="sm:col-span-3 text-xs uppercase tracking-widest font-black text-black">{t("rule2_tag")}</div>
                <div className="sm:col-span-9 space-y-1">
                  <h5 className="font-bold text-black text-sm">{t("rule2_title")}</h5>
                  <p className="text-xs text-slate-500">
                    {t("rule2_desc")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-4 border-t border-black/5">
                <div className="sm:col-span-3 text-xs uppercase tracking-widest font-black text-black">{t("rule3_tag")}</div>
                <div className="sm:col-span-9 space-y-1">
                  <h5 className="font-bold text-black text-sm">{t("rule3_title")}</h5>
                  <p className="text-xs text-slate-500">
                    {t("rule3_desc")}
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
            <h3 className="text-lg font-bold text-black uppercase tracking-tight">{t("block_a_title")}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t("block_a_desc")}
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigate("/calculateur-taxe-de-sejour")}
              className="text-[#d1121d] font-black inline-flex items-center gap-1.5 text-xs uppercase tracking-wider hover:underline cursor-pointer"
            >
              <span>{t("block_a_btn")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="border border-black/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="h-8 w-8 bg-black text-white flex items-center justify-center font-bold text-sm">B</div>
            <h3 className="text-lg font-bold text-black uppercase tracking-tight">{t("block_b_title")}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t("block_b_desc")}
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigate("/comment-calculer-la-taxe-de-sejour")}
              className="text-[#d1121d] font-black inline-flex items-center gap-1.5 text-xs uppercase tracking-wider hover:underline cursor-pointer"
            >
              <span>{t("block_b_btn")}</span>
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
