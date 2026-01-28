import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Unique+Homes+Lajares+-+adults+only/@28.681976,-13.941788,17z/data=!4m11!3m10!1s0xc47b5892cea4667:0x79d5ee6c38aadc9e!5m2!4m1!1i2!8m2!3d28.6819713!4d-13.9392131!9m1!1b1!16s%2Fg%2F11tnhg1jp5";

const ReputationContent = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  
  const scrollToReviews = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="px-6 pb-10 pt-1 text-center relative">

      {/* Title */}
      <h3 className="font-display text-xl text-foreground mb-3">
        {t.reputation.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-1">
        {t.reputation.average} <span className="font-medium text-foreground">4,9/5</span> · {t.reputation.reviews}.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">
        {t.reputation.highlight}
      </p>

      {/* Micro-detail */}
      <p className="text-[10px] tracking-[0.08em] text-muted-foreground/70 mb-5">
        {t.reputation.googleReviews}
      </p>

      {/* Primary CTA */}
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-2 rounded-full text-sm tracking-wide hover:bg-foreground/90 transition-colors"
      >
        {t.reputation.seeGoogleReviews}
        <span className="text-xs">→</span>
      </a>

      {/* Secondary action */}
      <div className="mt-5">
        <button
          onClick={scrollToReviews}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 decoration-muted-foreground/30"
        >
          {t.reputation.seeTestimonials}
        </button>
      </div>
    </div>
  );
};

const ReputationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Trigger pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-transparent border border-foreground/20 text-foreground text-[11px] tracking-[0.1em] px-4 py-2 rounded-full cursor-pointer hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300"
        aria-label={t.reputation.ariaLabel}
      >
        ★ {t.reputation.pill}
      </button>

      {/* Mobile: Bottom Sheet */}
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="bg-card border-t border-border/20 rounded-t-2xl min-h-[42vh]">
            <div className="flex flex-col justify-center flex-1">
              <ReputationContent onClose={handleClose} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        /* Desktop: Centered Modal */
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-card border-none rounded-2xl max-w-xs p-0 pt-5 overflow-hidden shadow-xl">
            <ReputationContent onClose={handleClose} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ReputationModal;
