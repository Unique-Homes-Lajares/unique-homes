import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CasaCardProps {
  image: string;
  images?: string[];
  title: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  slug: string;
  comingSoon?: boolean;
  price?: string;
  badges?: string[];
  onComingSoonClick?: () => void;
}

const CasaCard = ({ image, images, title, bedrooms, bathrooms, guests, slug, comingSoon, price, badges, onComingSoonClick }: CasaCardProps) => {
  const { t } = useLanguage();
  const priceNumber = price?.match(/\d+/)?.[0];
  const formattedPrice = priceNumber ? `${priceNumber}€ ${t.common.perNight}` : null;
  const allImages = images && images.length > 0 ? images : [image];

  const defaultBadges = [t.casaCard.adults14, t.casaCard.petFriendly];
  const displayBadges = badges || defaultBadges;

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false,
    align: 'start',
    containScroll: false,
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  
  useState(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
      onSelect();
    }
  });
  
  return (
    <article className="group cursor-pointer">
      {/* Image Carousel */}
      <div className="relative overflow-hidden mb-5 md:mb-6 lg:w-screen lg:left-1/2 lg:-translate-x-1/2 lg:px-8">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full gap-2 md:gap-3 lg:gap-3">
            {allImages.map((img, index) => (
              <Link 
                to={`/villa/${slug}`} 
                key={index}
                className="flex-[0_0_75%] md:flex-[0_0_42%] lg:flex-[0_0_38%] min-w-0 relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10]"
              >
                <div 
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-4 md:inset-6 border border-white/40 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
        
        {/* Navigation arrows */}
        <>
          <button 
            onClick={scrollPrev}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all z-10"
            aria-label={t.common.previousPhoto}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all z-10"
            aria-label={t.common.nextPhoto}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
          </button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {Array.from({ length: 5 }).map((_, index) => {
              const totalImages = allImages.length;
              const progress = totalImages > 1 ? currentIndex / (totalImages - 1) : 0;
              const activeIndex = Math.round(progress * 4);
              return (
                <div 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === activeIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              );
            })}
          </div>
        </>
        
        {comingSoon && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onComingSoonClick?.();
            }}
            className="absolute top-4 right-4 md:top-5 md:right-5 bg-amber-100 text-amber-900 text-[9px] md:text-[10px] uppercase tracking-[0.16em] font-medium px-3 py-2.5 md:py-3 rounded-2xl z-10 shadow-md text-center leading-tight hover:bg-amber-200 transition-colors cursor-pointer"
          >
            <span className="block">{t.casaCard.onRequest}</span>
            <span className="block text-[8px] md:text-[9px] font-normal opacity-80 mt-0.5 normal-case tracking-normal">{t.casaCard.onRequestDesc}</span>
          </button>
        )}
      </div>
      
      {/* Content below image */}
      <Link to={`/villa/${slug}`} className="block">
        <div className="space-y-2 text-center">
          {/* Badges */}
          <div className="flex gap-2 mb-1 justify-center">
            {displayBadges.map((badge) => (
              <span 
                key={badge} 
                className={`text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${
                  badge === t.casaCard.adults14 || badge === "Solo +14"
                    ? "bg-foreground text-background" 
                    : "bg-white text-foreground/70 border border-foreground/30"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3 
            className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[0.01em] font-light"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          
          {/* Specs */}
          <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide">
            {bedrooms} {bedrooms === 1 ? t.casaCard.bedroom : t.casaCard.bedrooms} · {bathrooms} {bathrooms === 1 ? t.casaCard.bathroom : t.casaCard.bathrooms} · {guests} {t.casaCard.guests}
          </p>
          
          {/* Price */}
          {formattedPrice && (
            <p className="text-base md:text-lg text-foreground/80 font-light">
              {t.common.from} {formattedPrice}
            </p>
          )}
          
          {/* Micro CTA */}
          <p className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 pt-1">
            {t.common.viewHouse} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CasaCard;
