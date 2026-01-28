import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Wellness = () => {
  const { t } = useLanguage();
  const pills = t.wellness.pills;

  return (
    <section className="w-full py-16 md:py-24 bg-foreground text-background rounded-2xl md:rounded-3xl overflow-hidden" id="wellness">
      <div className="container-custom text-center mb-10 md:mb-14">
        <div className="kicker text-background/60">{t.wellness.kicker}</div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-[80px] leading-[1.1] tracking-[-0.02em] font-light mb-5 md:mb-6 max-w-3xl mx-auto text-background">
          {t.wellness.title}
        </h2>
        <p className="text-body max-w-xl mx-auto text-background/70">
          {t.wellness.subtitle}
        </p>
      </div>

      <div className="relative h-[50vh] min-h-[350px] max-h-[550px] overflow-hidden mb-10 md:mb-14">
        <iframe
          src="https://www.youtube.com/embed/6NjH8pT-798?autoplay=1&mute=1&loop=1&playlist=6NjH8pT-798&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&end=19"
          className="absolute inset-0 w-full h-full object-cover scale-[1.5] saturate-[0.7] brightness-[0.9] contrast-[0.95] blur-[1px]"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Wellness video"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-4 md:inset-6 border border-white/15 pointer-events-none z-10" />
      </div>

      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mb-10 md:mb-14">
          {pills.map(pill => (
            <span key={pill} className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 bg-background/10 text-[11px] md:text-[12px] tracking-[0.04em] font-light rounded-full text-background/75">
              {pill}
            </span>
          ))}
        </div>

        <p className="text-center text-body max-w-lg mx-auto italic text-background/70 mb-10 md:mb-12">
          {t.wellness.closingText}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/wellness" className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground text-[11px] uppercase tracking-[0.18em] transition-all duration-500 hover:bg-background/90">
            {t.wellness.cta}
          </Link>
          <a href="/pdfs/unique-home-lajares-wellness-menu-en.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 border border-background/30 text-[11px] uppercase tracking-[0.18em] text-background transition-all duration-500 hover:bg-background hover:text-foreground">
            {t.wellness.menuCta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Wellness;