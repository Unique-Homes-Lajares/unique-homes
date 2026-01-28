import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAvailabilityModal } from "@/contexts/AvailabilityModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
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

const Contact = () => {
  const { openModal } = useAvailabilityModal();
  const { t } = useLanguage();
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);

  const handleWhatsAppClick = () => {
    setIsWhatsAppDialogOpen(true);
  };

  return (
    <section className="py-28 md:py-40 px-6 md:px-8 bg-background" id="contacto">
      <div className="max-w-xl mx-auto text-center">
        
        {/* Title */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-light tracking-[-0.02em]">
          {t.contact.title}
        </h2>

        {/* Intro text */}
        <p className="text-base md:text-lg text-muted-foreground leading-[1.8] mb-14 font-light">
          {t.contact.intro1}
          <br />
          {t.contact.intro2}
        </p>

        {/* Main CTAs */}
        <div className="mb-10 flex flex-col gap-4">
          <Button
            variant="diptyque"
            size="hero"
            className="gap-3"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-4 h-4" />
            {t.contact.openChat}
          </Button>
          <Button
            variant="hero"
            size="hero"
            onClick={openModal}
          >
            {t.contact.viewAvailability}
          </Button>
        </div>

        {/* Support text */}
        <div className="space-y-1.5 mb-16">
          <p className="text-muted-foreground font-light">
            {t.contact.support1}
          </p>
          <p className="text-muted-foreground font-light">
            {t.contact.support2}
          </p>
        </div>

        {/* Note */}
        <p className="text-sm text-muted-foreground/60 mb-14 font-light">
          {t.contact.note}
        </p>

        {/* Secondary options */}
        <div className="flex items-center justify-center gap-10 text-[11px] uppercase tracking-[0.20em]">
          <button
            onClick={handleWhatsAppClick}
            className="text-muted-foreground hover:text-foreground transition-colors duration-500 underline underline-offset-4"
          >
            {t.contact.whatsapp}
          </button>
          <span className="text-muted-foreground/30">·</span>
          <a
            href="mailto:hello@uniquehomeslajares.com?subject=Unique%20Homes%20Lajares"
            className="text-muted-foreground hover:text-foreground transition-colors duration-500 underline underline-offset-4"
          >
            {t.contact.email}
          </a>
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

export default Contact;