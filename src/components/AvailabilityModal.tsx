import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useAvailabilityModal } from "@/contexts/AvailabilityModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";

const AvailabilityModal = () => {
  const { isOpen, closeModal } = useAvailabilityModal();
  const { t, language } = useLanguage();

  const handleReserve = () => {
    window.open(
      `https://uniquehomeslajares.reserve-online.net/?voucher=UNIQUE&checkin=2025-12-30&lang=${language}&rooms=1&nights=2&adults=2`,
      "_blank"
    );
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="p-0 border-0 w-[calc(100%-2rem)] max-w-md sm:max-w-xl md:max-w-2xl bg-transparent shadow-none [&>button]:hidden">
        <div className="relative bg-background rounded overflow-hidden shadow-2xl">
          <DialogClose asChild>
            <button
              className="absolute top-5 right-5 sm:top-7 sm:right-7 md:top-9 md:right-9 z-10 p-1.5 text-foreground/40 hover:text-foreground transition-colors"
              aria-label={t.common.close}
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </DialogClose>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="border border-foreground/10 py-12 px-8 sm:py-16 sm:px-12 md:py-20 md:px-16 text-center">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3 sm:mb-4">
                {t.availabilityModal.title}
              </h2>
              <p className="text-foreground font-medium mb-1">
                {t.availabilityModal.savings}
              </p>
              <p className="text-foreground/80 text-xs mb-8 sm:mb-10">
                {t.availabilityModal.bonus}
              </p>
              
              <button
                onClick={handleReserve}
                className="px-16 py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.18em] rounded hover:bg-foreground/90 transition-colors"
              >
                {t.availabilityModal.continue}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityModal;
