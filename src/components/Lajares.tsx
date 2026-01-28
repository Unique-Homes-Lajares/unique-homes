import lajaresPoster from "@/assets/lajares-video-poster.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Lajares = () => {
  const { t } = useLanguage();

  return (
    <section
      className="py-4 md:py-6 lg:py-8 px-4 md:px-8 max-w-[1280px] mx-auto"
      id="lajares"
    >
      <div
        onClick={() =>
          window.open(
            "https://youtube.com/shorts/jfpssKWmqUM?si=Ff_gEuT7DT3Es6x3",
            "_blank",
            "noopener,noreferrer",
          )
        }
        className="relative min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] max-h-[700px] lg:max-h-[800px] overflow-hidden shadow-elegant flex items-end cursor-pointer group rounded-xl md:rounded-2xl"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={lajaresPoster}
            alt="Paisaje de Lajares, Fuerteventura"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover saturate-[0.85] brightness-[0.95] contrast-[0.95] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
        <div className="absolute inset-4 md:inset-6 border border-white/20 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        <div className="relative z-20 p-8 md:p-12 lg:p-16 xl:p-20 w-full pointer-events-none">
          <div className="max-w-xl lg:max-w-2xl">
            <div className="text-[10px] md:text-[11px] lg:text-xs tracking-[0.24em] text-white/70 mb-4 md:mb-5 uppercase">
              {t.lajares.location}
            </div>
            <h2 className="font-display text-[32px] md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-[-0.02em] text-white font-light mb-5 md:mb-6 lg:mb-8">
              {t.lajares.title1}
              <br />
              {t.lajares.title2}
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-[1.7] text-white/80 font-light max-w-md lg:max-w-lg">
              {t.lajares.description}
            </p>
            <p className="text-base md:text-lg lg:text-xl leading-[1.7] text-white tracking-[0.04em] font-light mt-4">
              {t.lajares.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lajares;
