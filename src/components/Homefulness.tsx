import { useState, useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { Volume, VolumeX, Pause, Play } from "lucide-react";
import homefulnessPoster from "@/assets/homefulness-video-poster.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import quoteMarkImage from "@/assets/quote-mark.avif";

const Homefulness = () => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (iframeRef.current) {
      playerRef.current = new Player(iframeRef.current);
      
      playerRef.current.on('playing', () => {
        setIsVideoReady(true);
      });
    }
    return () => {
      playerRef.current = null;
    };
  }, []);

  const toggleMute = async () => {
    if (playerRef.current) {
      const newMutedState = !isMuted;
      await playerRef.current.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  };

  const togglePlay = async () => {
    if (playerRef.current) {
      if (isPlaying) {
        await playerRef.current.pause();
      } else {
        await playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="w-full mt-24 md:mt-32 lg:mt-40" id="homefulness">
      {/* Full width video */}
      <div className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] max-h-[600px] md:max-h-[700px] lg:max-h-[800px] overflow-hidden mb-20 md:mb-28 lg:mb-36">
        {/* Poster image - shows immediately while video loads */}
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ${isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <img 
            src={homefulnessPoster}
            alt=""
            aria-hidden={isVideoReady}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto min-w-full min-h-full object-cover scale-[1.2] md:scale-[1.1] brightness-[0.94] contrast-[0.97] saturate-[0.92]"
          />
        </div>
        
        {/* Video - fades in when ready */}
        <div className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}>
          <iframe 
            ref={iframeRef}
            src="https://player.vimeo.com/video/1150067940?background=1&autoplay=1&loop=1&muted=1&playsinline=1" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto min-w-full min-h-full aspect-video scale-[1.2] md:scale-[1.1] brightness-[0.94] contrast-[0.97] saturate-[0.92]" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen 
            title="Homefulness video" 
          />
        </div>
        
        {/* Video controls */}
        <div className="absolute bottom-6 left-6 z-20 flex gap-2">
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
        
        {/* Thin decorative border inside */}
        <div className="absolute inset-4 md:inset-6 border border-white/20 pointer-events-none z-10" />
      </div>
      
      {/* Editorial quote content */}
      <div className="text-center max-w-2xl lg:max-w-3xl mx-auto px-6 pb-8 md:pb-12 lg:pb-16">
        {/* Kicker */}
        <div className="kicker mb-12 md:mb-16 lg:mb-20">{t.homefulness.kicker}</div>
        
        {/* Quote mark decorative */}
        <div className="flex justify-center mb-8 md:mb-10">
          <img 
            src={quoteMarkImage} 
            alt="" 
            aria-hidden="true"
            className="w-10 h-10 md:w-12 md:h-12 opacity-25"
          />
        </div>
        
        {/* Main quote */}
        <blockquote className="mb-10 md:mb-14 lg:mb-16">
          <p className="font-display text-[32px] md:text-[44px] lg:text-[52px] leading-[1.12] md:leading-[1.08] tracking-[-0.02em] font-light italic text-foreground">
            {t.homefulness.title1}
            <br />
            <span className="not-italic font-medium">{t.homefulness.title2}</span>
          </p>
        </blockquote>
        
        {/* Signature */}
        <div className="text-[10px] md:text-[11px] tracking-[0.22em] text-muted-foreground/60 uppercase">
          — {t.homefulness.signature}
        </div>
      </div>
    </section>
  );
};

export default Homefulness;