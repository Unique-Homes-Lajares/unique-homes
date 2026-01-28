import { useRef, ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacidadIcon = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 70 L60 35 L100 70"/>
      <path d="M30 68 V95 H90 V68"/>
      <path d="M45 95 V75 H75 V95"/>
      <path d="M25 55 Q60 20 95 55" strokeDasharray="2 3"/>
    </g>
  </svg>
);

const AtencionIcon = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M30 70 Q60 50 90 70"/>
      <path d="M45 70 V90"/>
      <path d="M75 70 V90"/>
      <path d="M55 45 Q60 40 65 45"/>
      <path d="M60 45 V60"/>
    </g>
  </svg>
);

const ATuManeraIcon = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M35 70 Q40 55 48 55 Q52 55 54 60"/>
      <path d="M48 55 V75"/>
      <path d="M54 60 V78"/>
      <path d="M60 62 V80"/>
      <path d="M66 64 V78"/>
      <path d="M35 70 Q45 85 65 85 Q80 85 85 75"/>
      <path d="M78 38 L80 44 L86 45 L80 48 L78 54 L76 48 L70 45 L76 44 Z"/>
      <path d="M70 90 Q80 92 90 90" strokeDasharray="2 3"/>
    </g>
  </svg>
);

const CasaIcon = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="35" y="55" width="50" height="35" rx="4"/>
      <path d="M30 55 L60 30 L90 55"/>
      <path d="M45 70 H75"/>
      <path d="M40 95 Q60 85 80 95" strokeDasharray="2 3"/>
    </g>
  </svg>
);

const LajaresIcon = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 85 Q50 55 60 55 Q70 55 100 85"/>
      <path d="M40 75 Q60 65 80 75"/>
      <path d="M60 40 V55"/>
      <path d="M55 45 H65"/>
    </g>
  </svg>
);

const TiempoIcon = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Reloj minimalista sin números */}
      <circle cx="60" cy="60" r="30" strokeDasharray="170 20" strokeDashoffset="-10"/>
      {/* Agujas sencillas, ligeramente desplazadas hacia la derecha */}
      <path d="M60 60 L60 42"/>
      <path d="M60 60 L74 60"/>
      {/* Pequeño arco abierto - sensación de "más margen" */}
      <path d="M85 45 Q95 60 85 75" strokeDasharray="3 3"/>
    </g>
  </svg>
);

interface Reason {
  title: string;
  description: string;
  icon: ReactNode;
}

const BetterThanHotel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const reasons: Reason[] = [
    { title: t.betterThanHotel.privacy, description: t.betterThanHotel.privacyDesc, icon: <PrivacidadIcon /> },
    { title: t.betterThanHotel.realHome, description: t.betterThanHotel.realHomeDesc, icon: <CasaIcon /> },
    { title: t.betterThanHotel.cleaning, description: t.betterThanHotel.cleaningDesc, icon: <ATuManeraIcon /> },
    { title: t.betterThanHotel.attention, description: t.betterThanHotel.attentionDesc, icon: <AtencionIcon /> },
    { title: t.betterThanHotel.lajares, description: t.betterThanHotel.lajaresDesc, icon: <LajaresIcon /> },
    { title: t.betterThanHotel.lateCheckout, description: t.betterThanHotel.lateCheckoutDesc, icon: <TiempoIcon /> },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="font-display text-[1.625rem] md:text-4xl lg:text-5xl text-foreground mb-4 md:mb-5">
            {t.betterThanHotel.title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl font-light max-w-xl lg:max-w-2xl mx-auto">
            {t.betterThanHotel.subtitle}
          </p>
        </div>

        {/* Cards grid - carousel on mobile, grid on tablet/desktop */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-5 lg:gap-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-auto snap-center"
            >
              <div className="bg-card border border-border/40 rounded-2xl p-6 md:p-6 lg:p-7 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 mb-5 flex items-center justify-center text-foreground/70">
                  {reason.icon || (
                    <div className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center">
                      <span className="text-lg font-light text-foreground/60">
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-display text-lg md:text-xl lg:text-[22px] text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-[15px] font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BetterThanHotel;
