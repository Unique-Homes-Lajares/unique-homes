import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { amenityKeyMap, sectionIdMap, subtitleKeyMap } from "@/lib/photoTourTranslations";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface PhotoImage {
  src: string;
  caption?: string;
}

interface PhotoSection {
  id: string;
  title: string;
  subtitle?: string;
  amenities: string[];
  images: (string | PhotoImage)[];
}

interface VillaPhotoTourProps {
  sections: PhotoSection[];
  villaSlug?: string;
}

// Helper to normalize image data
const normalizeImage = (img: string | PhotoImage): PhotoImage => {
  if (typeof img === "string") {
    return { src: img };
  }
  return img;
};

// Extended image with section info for navigation
interface ExtendedPhotoImage extends PhotoImage {
  sectionTitle: string;
  sectionId: string;
}

// Lightbox component for viewing photos in full size - now supports all sections
const PhotoLightbox = ({
  images,
  initialIndex,
  open,
  onOpenChange,
}: {
  images: ExtendedPhotoImage[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (!api) return;
    
    api.scrollTo(initialIndex, true);
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, initialIndex]);

  const currentImage = images[current];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="inset-0 left-0 top-0 translate-x-0 translate-y-0 w-screen h-[100dvh] max-w-none max-h-none p-0 gap-0 border-0 bg-black/95 flex items-center justify-center rounded-none sm:rounded-none">
        <DialogClose className="absolute right-3 top-3 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>
        
        <div className="relative w-full h-full flex flex-col items-center justify-center px-0">
          <Carousel
            setApi={setApi}
            opts={{
              startIndex: initialIndex,
              loop: true,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="h-[100dvh] items-center !-ml-0">
              {images.map((img, idx) => (
                <CarouselItem key={idx} className="h-[100dvh] !pl-0 flex items-center justify-center">
                  <img
                    src={img.src}
                    alt={img.caption || ""}
                    className="w-full h-full object-contain object-center"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="left-2 md:left-4 h-10 w-10 bg-white/10 border-0 text-white hover:bg-white/20" />
            <CarouselNext className="right-2 md:right-4 h-10 w-10 bg-white/10 border-0 text-white hover:bg-white/20" />
          </Carousel>
          
          {/* Section title, caption and counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center max-w-xl px-4">
            {currentImage?.sectionTitle && (
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
                {currentImage.sectionTitle}
              </p>
            )}
            {currentImage?.caption && (
              <p className="text-white/90 text-sm md:text-base mb-2 font-light leading-relaxed">
                {currentImage.caption}
              </p>
            )}
            <span className="text-white/50 text-xs">
              {current + 1} / {images.length}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Individual photo with reveal animation
const Photo = ({ 
  src, 
  index, 
  layoutType = "normal",
  onClick,
}: { 
  src: string; 
  index: number; 
  layoutType?: "full" | "normal" | "tall";
  onClick?: () => void;
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  const aspectClass = layoutType === "full" 
    ? "aspect-[16/10] col-span-2" 
    : layoutType === "tall"
      ? "aspect-[3/4] row-span-2"
      : "aspect-square";

  const colSpanClass = layoutType === "full" ? "col-span-2" : "col-span-1";

  return (
    <div 
      ref={ref}
      className={`
        ${colSpanClass}
        ${layoutType === "tall" ? "row-span-2" : ""}
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div 
        className={`relative overflow-hidden rounded border border-border/15 h-full cursor-pointer group`}
        onClick={onClick}
      >
        <div className={`${aspectClass} h-full`}>
          <img 
            src={src} 
            alt="" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

// Desktop Section with side-by-side layout
const DesktopSection = ({ 
  section, 
  onVisible,
  onPhotoClick,
}: { 
  section: PhotoSection; 
  onVisible: (id: string) => void;
  onPhotoClick: (sectionId: string, index: number) => void;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(section.id);
        }
      },
      { threshold: 0.2, rootMargin: "-80px 0px -30% 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [section.id, onVisible]);

  // Determine layout pattern based on number of images
  const getLayoutType = (idx: number, total: number): "full" | "normal" | "tall" => {
    if (total === 1) return "full";
    
    // If odd number of photos, make the last one full width
    const isOdd = total % 2 !== 0;
    if (isOdd && idx === total - 1) {
      return "full";
    }
    
    // All other photos are normal width
    return "normal";
  };

  return (
    <div ref={sectionRef} id={section.id} className="scroll-mt-28">
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        {/* Left column - Title and amenities (sticky) */}
        <div className="col-span-4 lg:col-span-3">
          <div className="sticky top-32">
            <h3 className="text-2xl lg:text-[26px] font-medium tracking-tight mb-2 text-neutral-900">
              {section.title}
            </h3>
            {section.subtitle && (
              <p className="text-base text-neutral-600 mb-4 leading-relaxed font-light">
                {section.subtitle}
              </p>
            )}
            <p className="text-sm text-neutral-500 leading-relaxed">
              {section.amenities.join(" · ")}
            </p>
          </div>
        </div>

        {/* Right column - Photos grid */}
        <div className="col-span-8 lg:col-span-9">
          <div className={`grid ${section.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 auto-rows-auto`}>
            {section.images.map((img, idx) => {
              const normalizedImg = normalizeImage(img);
              return (
                <Photo 
                  key={idx} 
                  src={normalizedImg.src} 
                  index={idx} 
                  layoutType={getLayoutType(idx, section.images.length)}
                  onClick={() => onPhotoClick(section.id, idx)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileSection = ({ 
  section, 
  onVisible,
  onPhotoClick,
}: { 
  section: PhotoSection; 
  onVisible: (id: string) => void;
  onPhotoClick: (sectionId: string, index: number) => void;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(section.id);
        }
      },
      { threshold: 0.2, rootMargin: "-60px 0px -40% 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [section.id, onVisible]);

  return (
    <div ref={sectionRef} id={section.id} className="scroll-mt-24">
      {/* Section header */}
      <div className="mb-4">
        <h3 className="text-xl font-medium tracking-tight mb-1 text-neutral-900">
          {section.title}
        </h3>
        {section.subtitle && (
          <p className="text-sm text-neutral-600 mb-2 leading-relaxed font-light">
            {section.subtitle}
          </p>
        )}
        <p className="text-sm text-neutral-500 leading-relaxed">
          {section.amenities.join(" · ")}
        </p>
      </div>

      {/* Photos grid */}
      <div className={`grid ${section.images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
        {section.images.map((img, idx) => {
          const normalizedImg = normalizeImage(img);
          const total = section.images.length;

          // Mobile layout rule:
          // - First image is full width (if there is more than one)
          // - If that creates an orphan last tile in the 2-col grid, expand the last image to full width
          const isFirstFull = idx === 0 && total > 1;
          const shouldMakeLastFull = total > 1 && (total - 1) % 2 !== 0; // total even
          const isLastFull = shouldMakeLastFull && idx === total - 1;
          const isFullWidth = total === 1 || isFirstFull || isLastFull;

          return (
            <div
              key={idx}
              className={`${isFullWidth ? "col-span-full" : "col-span-1"} cursor-pointer group`}
              onClick={() => onPhotoClick(section.id, idx)}
            >
              <div className="relative overflow-hidden rounded border border-border/15">
                <div className={isFullWidth ? "aspect-[16/10]" : "aspect-square"}>
                  <img
                    src={normalizedImg.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type TranslationWithPhotoTour = {
  photoTour?: {
    sections?: Record<string, string>;
    amenities?: Record<string, string>;
    subtitles?: Record<string, string>;
  };
};

const VillaPhotoTour = ({ sections, villaSlug = "" }: VillaPhotoTourProps) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const tt = t as TranslationWithPhotoTour;

  // Helper to translate section title
  const translateSectionTitle = (sectionId: string): string => {
    const key = sectionIdMap[sectionId];
    return key && tt.photoTour?.sections?.[key] || sectionId;
  };

  // Helper to translate amenity
  const translateAmenity = (amenity: string): string => {
    const key = amenityKeyMap[amenity];
    return key && tt.photoTour?.amenities?.[key] || amenity;
  };

  // Helper to translate subtitle
  const translateSubtitle = (sectionId: string, originalSubtitle?: string): string | undefined => {
    const villaSubtitles = subtitleKeyMap[villaSlug];
    const subtitleKey = villaSubtitles?.[sectionId];
    if (subtitleKey) {
      return tt.photoTour?.subtitles?.[subtitleKey] || originalSubtitle;
    }
    return originalSubtitle;
  };

  // Build a flat array of all images from all sections with section info
  const allImages: ExtendedPhotoImage[] = sections.flatMap((section) =>
    section.images.map((img) => {
      const normalized = normalizeImage(img);
      return {
        ...normalized,
        sectionTitle: translateSectionTitle(section.id),
        sectionId: section.id,
      };
    })
  );

  const handleSectionVisible = (id: string) => {
    setActiveSection(id);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // When a photo is clicked, find its global index in allImages
  const handlePhotoClick = (sectionId: string, localIndex: number) => {
    // Calculate global index
    let globalIndex = 0;
    for (const section of sections) {
      if (section.id === sectionId) {
        globalIndex += localIndex;
        break;
      }
      globalIndex += section.images.length;
    }
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  };

  if (sections.length === 0) return null;

  return (
    <div ref={containerRef} className="relative bg-white w-screen left-1/2 -translate-x-1/2 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 md:py-16">

      {/* Sticky navigation bar */}
      <div className="sticky top-16 md:top-[78px] z-40 bg-white/98 backdrop-blur-sm -mx-4 md:-mx-0 px-4 md:px-0 py-3 mb-6 md:mb-10">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] md:text-xs transition-all duration-300 whitespace-nowrap
                ${activeSection === section.id 
                  ? "bg-neutral-900 text-white font-medium" 
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-300"
                }
              `}
            >
              {translateSectionTitle(section.id)}
            </button>
          ))}
        </div>
      </div>

      {/* Photo sections */}
      <div className="space-y-16 md:space-y-24">
        {sections.map((section) => {
          const translatedSection = {
            ...section,
            title: translateSectionTitle(section.id),
            subtitle: translateSubtitle(section.id, section.subtitle),
            amenities: section.amenities.map(translateAmenity),
          };
          return isMobile ? (
            <MobileSection
              key={section.id}
              section={translatedSection}
              onVisible={handleSectionVisible}
              onPhotoClick={handlePhotoClick}
            />
          ) : (
            <DesktopSection
              key={section.id}
              section={translatedSection}
              onVisible={handleSectionVisible}
              onPhotoClick={handlePhotoClick}
            />
          );
        })}
      </div>

      {/* End indicator */}
      <div className="mt-16 md:mt-24 flex justify-center">
        <div className="w-12 h-px bg-border/40" />
      </div>

      {/* Photo Lightbox - now with ALL images from all sections */}
      <PhotoLightbox
        images={allImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
};

export default VillaPhotoTour;