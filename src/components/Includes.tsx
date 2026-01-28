import { useLanguage } from "@/contexts/LanguageContext";

const Includes = () => {
  const { t } = useLanguage();
  
  const amenities = [
    t.includes.amenities.kitchen,
    t.includes.amenities.sound,
    t.includes.amenities.textiles,
    t.includes.amenities.pool,
  ];

  return (
    <section className="container-custom my-8 md:my-12" id="incluye">
      <div className="section-card">
        <div className="section-card-inner text-center py-10 md:py-14">
          <div className="kicker">{t.includes.kicker}</div>
          <h2 className="heading-section mb-3 md:mb-4">
            {t.includes.title}
          </h2>
          <p className="text-sm md:text-base leading-[1.7] text-muted-foreground font-light tracking-normal mb-6 md:mb-8 max-w-sm mx-auto">
            {t.includes.description}<br />
            {t.includes.description2}
          </p>
          
          <p className="text-[10px] md:text-[11px] text-foreground/50 font-light tracking-wide mb-3 md:mb-4">
            {t.includes.label}
          </p>
          
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-2 md:gap-3 max-w-md mx-auto">
            {amenities.map((amenity) => (
              <span key={amenity} className="chip">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Includes;
