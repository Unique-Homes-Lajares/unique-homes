import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Volume, VolumeX, Pause, Play } from "lucide-react";
import Player from "@vimeo/player";
import useEmblaCarousel from "embla-carousel-react";
import heroPoster from "@/assets/hero-video-poster.jpg";
import { useAvailabilityModal } from "@/contexts/AvailabilityModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ReputationModal from "@/components/ReputationModal";
import LanguageSelector from "@/components/LanguageSelector";
import HandwrittenLogo from "@/components/HandwrittenLogo";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const HERO_VIDEOS = [
  "1151319168",
  "1148107901",
  "1151321798"
];

// Generate random initial index on component mount (once per page load)
const getRandomIndex = () => Math.floor(Math.random() * HERO_VIDEOS.length);

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [initialIndex] = useState(() => getRandomIndex());
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [videosReady, setVideosReady] = useState<boolean[]>(HERO_VIDEOS.map(() => false));
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const { openModal } = useAvailabilityModal();
  const { t, language } = useLanguage();
  const playersRef = useRef<(Player | null)[]>([]);
  const menuSwipeStartY = useRef<number>(0);

  const heroTitle = t.hero.title2;

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false,
    startIndex: initialIndex,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    console.log("[Hero] Embla initialized", { slides: emblaApi.slideNodes().length });
  }, [emblaApi]);

  useEffect(() => {
    HERO_VIDEOS.forEach((_, index) => {
      const iframe = iframeRefs.current[index];
      if (iframe && !playersRef.current[index]) {
        const player = new Player(iframe);
        playersRef.current[index] = player;
        
        player.on('playing', () => {
          setVideosReady(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        });
      }
    });

    return () => {
      playersRef.current = [];
    };
  }, []);

  const toggleMute = async () => {
    const player = playersRef.current[currentIndex];
    if (player) {
      const newMutedState = !isMuted;
      await player.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  };

  const togglePlay = async () => {
    const player = playersRef.current[currentIndex];
    if (player) {
      if (isPlaying) {
        await player.pause();
      } else {
        await player.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const navLinks = [
    { href: "#casas", label: t.nav.villas, labelMenu: t.nav.villasMenu || t.nav.villas, isRoute: false },
    { href: "/wellness", label: t.nav.wellnessShort, labelMenu: t.nav.wellnessMenu || t.nav.wellnessShort, isRoute: true },
    { href: "#contacto", label: t.nav.contact, labelMenu: t.nav.contactMenu || t.nav.contact, isRoute: false },
  ];

  const prevLanguageRef = useRef(language);
  useEffect(() => {
    if (prevLanguageRef.current !== language && isMenuOpen) {
      // Language changed while menu was open - close menu and scroll to top
      setIsMenuOpen(false);

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevLanguageRef.current = language;
  }, [language, isMenuOpen]);

  return (
    <section className="w-full lg:px-[calc((100vw-1200px)/2)]" aria-label="Hero">
      <div className="relative h-[calc(100svh-60px)] md:h-[calc(100vh-40px)] lg:h-[calc(100vh-48px)] min-h-[520px] max-h-[900px] md:max-h-[850px] lg:max-h-[920px] overflow-hidden touch-pan-y select-none lg:rounded-2xl">
        {/* Embla viewport (must wrap overlays too so swipe works everywhere) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" ref={emblaRef}>
          {/* Slides */}
          <div className="flex h-full">
            {HERO_VIDEOS.map((videoId, index) => (
              <div key={videoId} className="flex-[0_0_100%] min-w-0 relative h-full">
                {/* Poster image - shows while video loads */}
                <div
                  className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ${
                    videosReady[index] ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <img
                    src={heroPoster}
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto min-w-full min-h-full object-cover scale-[1.2] md:scale-[1.1]"
                  />
                </div>

                {/* Video */}
                <div
                  className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ${
                    videosReady[index] ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <iframe
                    ref={(el) => (iframeRefs.current[index] = el)}
                    src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&quality=1080p&playsinline=1`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto min-w-full min-h-full aspect-video scale-[1.2] md:scale-[1.1] pointer-events-none"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`Hero video ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Thin decorative border inside */}
          <div className="absolute inset-4 md:inset-6 border border-white/20 pointer-events-none z-10" />

          {/* Video controls */}
          <div className="absolute bottom-6 left-6 z-20 flex gap-2 items-center pointer-events-auto">
            <button
              onClick={toggleMute}
              className="p-2.5 bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-all duration-500 rounded-full"
              aria-label={isMuted ? t.hero.unmute : t.hero.mute}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume size={14} />}
            </button>
            <button
              onClick={togglePlay}
              className="p-2.5 bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-all duration-500 rounded-full"
              aria-label={isPlaying ? t.hero.pause : t.hero.play}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>

          {/* Slide indicators - centered */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-auto">
            {HERO_VIDEOS.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Header overlay inside video */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-auto pt-[env(safe-area-inset-top)] isolate">
            <div className="absolute inset-x-0 top-0 h-24 md:h-28 bg-gradient-to-b from-black/40 via-black/30 to-transparent pointer-events-none z-0" />
            <div className="relative z-10 pl-0 pr-2 md:px-4 h-16 md:h-20 flex items-center justify-between gap-4">
              <div className="flex-shrink-0" />

              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
                {navLinks.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-[10px] uppercase tracking-[0.24em] text-white/80 hover:text-white transition-colors duration-500 drop-shadow-md"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-[10px] uppercase tracking-[0.24em] text-white/80 hover:text-white transition-colors duration-500 drop-shadow-md"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <LanguageSelector variant="light" />
              </nav>

              <div className="flex items-center gap-4">
                <Button
                  variant="availability"
                  size="nav"
                  onClick={openModal}
                  className="hidden sm:inline-flex bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-foreground"
                >
                  {t.nav.viewAvailability}
                </Button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 mr-2 text-white hover:text-white/80 transition-colors duration-500 drop-shadow-md"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <div className="w-[38px] h-4 flex flex-col justify-between">
                      <span className="block w-full h-[1.5px] bg-current" />
                      <span className="block w-full h-[1.5px] bg-current" />
                      <span className="block w-full h-[1.5px] bg-current" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
              <>
                {/* Backdrop - closes menu on tap */}
                <div 
                  className="md:hidden fixed inset-0 top-16 bg-black/10 z-30"
                  onClick={() => setIsMenuOpen(false)}
                  aria-hidden="true"
                />
                
                {/* Menu panel */}
                <div 
                  className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in flex flex-col"
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    menuSwipeStartY.current = touch.clientY;
                  }}
                  onTouchEnd={(e) => {
                    const touch = e.changedTouches[0];
                    const startY = menuSwipeStartY.current;
                    const deltaY = touch.clientY - startY;
                    // Swipe down to close (threshold: 80px)
                    if (deltaY > 80) {
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  {/* Close button - discrete X in top right */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 p-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
                    aria-label="Cerrar menú"
                  >
                    <X size={20} strokeWidth={1.2} />
                  </button>
                  
                  <nav className="flex-1 flex flex-col items-center justify-center px-8 py-8">
                    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                      {navLinks.map((link) =>
                        link.isRoute ? (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-display text-2xl text-foreground hover:text-muted-foreground transition-colors duration-500 leading-relaxed"
                          >
                            {link.labelMenu}
                          </Link>
                        ) : (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-display text-2xl text-foreground hover:text-muted-foreground transition-colors duration-500 leading-relaxed"
                          >
                            {link.labelMenu}
                          </a>
                        )
                      )}
                      
                      <div className="flex flex-col gap-4 w-full mt-8">
                        <Button 
                          variant="diptyque" 
                          size="lg" 
                          className="w-full"
                          onClick={() => {
                            setIsMenuOpen(false);
                            openModal();
                          }}
                        >
                          {t.nav.viewAvailability}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full font-light"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsWhatsAppDialogOpen(true);
                          }}
                        >
                          {t.nav.writeUs || 'Escríbenos'}
                        </Button>
                      </div>
                      
                      <div className="mt-8">
                        <LanguageSelector variant="dark" inline onLanguageChange={() => setIsMenuOpen(false)} />
                      </div>
                    </div>
                  </nav>
                </div>
              </>
            )}
          </div>

          {/* Content overlay - centered */}
          <div className="absolute inset-0 z-10 flex items-center justify-center -mt-4 md:-mt-6">
            <div className="relative mx-4 md:mx-0 md:w-[520px] lg:w-[560px] p-8 md:p-12 lg:p-14 bg-white/65 backdrop-blur-sm border border-foreground/10 text-center animate-fade-up rounded-xl">
              {/* Decorative inner border */}
              <div className="absolute inset-3 border border-foreground/5 pointer-events-none" />

              {/* Logo as editorial signature - small, discrete, before claim */}
              <div className="flex justify-center mb-7 md:mb-8 -mt-4">
                <div className="w-[60px] md:w-[75px]">
                  <HandwrittenLogo color="hsl(var(--foreground))" animate={false} />
                </div>
              </div>

              {/* Eyebrow / kicker */}
              <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80 mb-4 md:mb-5 font-light">
                {t.hero.eyebrow}
              </span>

              <h1 
                className="font-display text-[38px] leading-[1.08] md:text-5xl lg:text-[56px] xl:text-6xl md:leading-[1.05] tracking-[-0.02em] mb-4 md:mb-6 font-light"
                dangerouslySetInnerHTML={{ __html: heroTitle }}
              />
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 leading-[1.7] font-light max-w-[360px] lg:max-w-[400px] mx-auto">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col gap-3">
                <Button variant="hero" size="hero" asChild className="w-full">
                  <a href="#casas">{t.hero.cta}</a>
                </Button>
                <Button variant="linkArrow" className="py-2" onClick={openModal}>
                  {t.hero.viewAvailability}
                </Button>
              </div>

              <div className="mt-6 md:mt-8">
                <ReputationModal />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp confirmation dialog */}
      <AlertDialog open={isWhatsAppDialogOpen} onOpenChange={setIsWhatsAppDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">{t.whatsappDialog.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {t.whatsappDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">{t.whatsappDialog.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              className="w-full sm:w-auto"
              onClick={() => {
                window.open("https://wa.me/34638082540", "_blank");
              }}
            >
              {t.whatsappDialog.open}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};
export default Hero;