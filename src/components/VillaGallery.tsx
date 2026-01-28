import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface GalleryScene {
  src: string;
  caption?: string;
}

interface VillaGalleryProps {
  images?: {
    full1?: string;
    col1?: string;
    col2?: string;
    col3?: string;
    col4?: string;
    full2?: string;
  };
  allImages?: string[];
  scenes?: GalleryScene[];
}

// Individual scene component with scroll reveal
const PhotoScene = ({ 
  src, 
  caption, 
  index, 
  onClick,
  variant = "full"
}: { 
  src: string; 
  caption?: string; 
  index: number; 
  onClick: () => void;
  variant?: "full" | "left" | "right";
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  const alignmentClass = variant === "left" 
    ? "md:mr-auto md:ml-0" 
    : variant === "right" 
      ? "md:ml-auto md:mr-0" 
      : "md:mx-auto";

  const widthClass = variant === "full" 
    ? "w-full md:w-[85%]" 
    : "w-full md:w-[70%]";

  return (
    <div 
      ref={ref}
      className={`
        ${widthClass} ${alignmentClass}
        transition-all duration-1000 ease-out
        ${isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
        }
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Caption above image */}
      {caption && (
        <div 
          className={`
            mb-4 md:mb-5
            transition-all duration-700 ease-out delay-200
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <p className="text-[11px] md:text-xs text-muted-foreground/80 tracking-[0.08em] leading-relaxed max-w-md italic">
            {caption}
          </p>
        </div>
      )}

      {/* Image */}
      <div 
        className="relative overflow-hidden rounded border border-border/30 cursor-pointer group"
        onClick={onClick}
      >
        <div className="aspect-[4/3] md:aspect-[16/10]">
          <img 
            src={src} 
            alt="" 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
    </div>
  );
};

const VillaGallery = ({ images = {}, allImages, scenes }: VillaGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Build scenes from images if not provided
  const galleryScenes: GalleryScene[] = scenes || [
    images.full1 ? { src: images.full1, caption: "La vista desde aquí" } : null,
    images.col1 ? { src: images.col1, caption: "Donde empieza el día" } : null,
    images.col2 ? { src: images.col2, caption: "Espacio para estar" } : null,
    images.col3 ? { src: images.col3, caption: "Luz natural" } : null,
    images.col4 ? { src: images.col4, caption: "Los pequeños detalles" } : null,
    images.full2 ? { src: images.full2, caption: "Y así termina" } : null,
  ].filter(Boolean) as GalleryScene[];

  // All images for lightbox
  const lightboxImages = allImages || galleryScenes.map(s => s.src);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  // Lightbox Component
  const Lightbox = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: lightboxIndex });
    const [currentSlide, setCurrentSlide] = useState(lightboxIndex);

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    if (!lightboxOpen) return null;

    // Update current slide on navigation
    emblaApi?.on("select", () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    });

    return (
      <div 
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        onClick={closeLightbox}
      >
        {/* Close button - absolute positioned */}
        <button 
          onClick={closeLightbox}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Counter - absolute positioned */}
        <div className="absolute top-4 left-4 z-10 text-[11px] uppercase tracking-[0.2em] text-white/60">
          {currentSlide + 1} / {lightboxImages.length}
        </div>

        {/* Carousel - full screen */}
        <div className="w-full h-full flex items-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-full h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {lightboxImages.map((src, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center p-2">
                  <img 
                    src={src} 
                    alt="" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button 
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>

        {/* Dots - minimal at bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {lightboxImages.map((_, index) => (
            <div 
              key={index} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  if (galleryScenes.length === 0) return null;

  // Assign layout variants for visual rhythm
  const getVariant = (index: number): "full" | "left" | "right" => {
    const patterns: ("full" | "left" | "right")[] = ["full", "right", "left", "full", "left", "right"];
    return patterns[index % patterns.length];
  };

  return (
    <>
      {/* Photo Tour - Continuous scroll narrative */}
      <div className="space-y-16 md:space-y-24 py-8 md:py-12">
        {galleryScenes.map((scene, index) => (
          <PhotoScene
            key={index}
            src={scene.src}
            caption={scene.caption}
            index={index}
            onClick={() => openLightbox(index)}
            variant={getVariant(index)}
          />
        ))}
      </div>

      {/* View all prompt */}
      {lightboxImages.length > galleryScenes.length && (
        <div className="text-center pt-8">
          <button 
            onClick={() => openLightbox(0)}
            className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Ver todas las fotos
          </button>
        </div>
      )}

      <Lightbox />
    </>
  );
};

export default VillaGallery;