import quoteMark from "@/assets/quote-mark-declaration.avif";
import { useLanguage } from "@/contexts/LanguageContext";

const Declaration = () => {
  const { t } = useLanguage();
  
  return (
    <section className="container-custom mt-8 mb-16 md:mt-16 md:mb-28 lg:mt-20 lg:mb-36" id="declaracion">
      <div className="text-center max-w-3xl lg:max-w-4xl mx-auto py-12 md:py-16 lg:py-20 pb-3 md:pb-4">
          <img 
            src={quoteMark} 
            alt="" 
            className="w-8 md:w-10 lg:w-12 mx-auto mb-6 md:mb-8 opacity-60"
          />
          
          <h2 className="font-display text-[2.4rem] md:text-[3.4rem] lg:text-[4.25rem] xl:text-[5.1rem] leading-[1.1] tracking-[-0.02em] font-light text-foreground mb-6 md:mb-8 lg:mb-10">
            {t.declaration.title1}
          </h2>
          
          <p className="text-body max-w-xl lg:max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed whitespace-pre-line">
            {t.declaration.subtitle}
          </p>
        </div>
    </section>
  );
};

export default Declaration;