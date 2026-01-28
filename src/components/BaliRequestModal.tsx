import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Check, Minus, Plus } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { format, differenceInDays, Locale, parseISO, startOfDay, subDays } from "date-fns";
import { es, enUS, de, fr, it } from "date-fns/locale";
import InlineDateRangePicker from "@/components/InlineDateRangePicker";
import { cn } from "@/lib/utils";
import { useBaliAvailability } from "@/hooks/useBaliAvailability";

interface BaliRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: string;
  name: string;
  email: string;
  message: string;
};

const localeMap: Record<string, Locale> = {
  es,
  en: enUS,
  de,
  fr,
  it,
};

const MINIMUM_NIGHTS = 4;
const PRICE_PER_NIGHT = 490;

const BaliRequestModal = ({ isOpen, onClose }: BaliRequestModalProps) => {
  const { t, language } = useLanguage();
  const locale = localeMap[language] || es;
  const { blockedPeriods, isDateBlocked, isRangeBlocked, isExactThreeNightGap, getMinimumNightsForDate, isLoading: isLoadingAvailability } = useBaliAvailability();
  
  const requestSchema = z.object({
    guests: z.string().min(1, t.baliRequest.errors.guestsRequired),
    name: z.string().trim().min(1, t.baliRequest.errors.nameRequired).max(100, t.baliRequest.errors.nameMax),
    email: z.string().trim().email(t.baliRequest.errors.emailInvalid).max(255, t.baliRequest.errors.emailMax),
    message: z.string().max(1000, t.baliRequest.errors.messageMax).optional(),
  });

  const [formData, setFormData] = useState<FormData>({
    checkIn: undefined,
    checkOut: undefined,
    guests: "",
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'check-in' | 'check-out' | 'complete'>('check-in');

  const blockedRanges = useMemo(() => {
    // iCal uses exclusive DTEND, so we convert to an inclusive range for the calendar.
    return blockedPeriods
      .map((p) => {
        const from = startOfDay(parseISO(p.start));
        const endExclusive = startOfDay(parseISO(p.end));
        const to = subDays(endExclusive, 1);
        if (to.getTime() < from.getTime()) return null;
        return { from, to };
      })
      .filter(Boolean) as Array<{ from: Date; to: Date }>;
  }, [blockedPeriods]);

  // Calculate nights and validate dates
  const nightsCount = useMemo(() => {
    if (formData.checkIn && formData.checkOut) {
      return differenceInDays(formData.checkOut, formData.checkIn);
    }
    return 0;
  }, [formData.checkIn, formData.checkOut]);

  const areDatesValid = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut || nightsCount < 3) {
      return false;
    }
    // Valid if 4+ nights OR exactly 3 nights in an exact gap
    if (nightsCount >= 4) {
      return true;
    }
    if (nightsCount === 3 && isExactThreeNightGap(formData.checkIn, formData.checkOut)) {
      return true;
    }
    return false;
  }, [formData.checkIn, formData.checkOut, nightsCount, isExactThreeNightGap]);

  const handleDateSelect = (range: { checkIn: Date | undefined; checkOut: Date | undefined }) => {
    setFormData((prev) => ({ 
      ...prev, 
      checkIn: range.checkIn, 
      checkOut: range.checkOut 
    }));
  };

  // Handle clicking on ENTRADA field
  const handleCheckInClick = () => {
    setSelectionMode('check-in');
  };

  // Handle clicking on SALIDA field
  const handleCheckOutClick = () => {
    // Only allow if there's already a check-in date
    if (formData.checkIn) {
      setSelectionMode('check-out');
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't submit if dates are invalid
    if (!areDatesValid) {
      return;
    }

    setIsSubmitting(true);

    const result = requestSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate sending (in production, this would send to an API/email)
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setFormData({
      checkIn: undefined,
      checkOut: undefined,
      guests: "",
      name: "",
      email: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "d MMM yyyy", { locale });
  };

  // Check if form is complete and valid
  const isFormValid = areDatesValid && formData.guests && formData.name && formData.email;

  // Determine if sticky should be visible (mobile only, valid dates, not editing calendar)
  const showMobileSticky = areDatesValid && 
    nightsCount > 0 && 
    selectionMode === 'complete' && 
    !isSubmitted;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 border-0 w-[92%] max-w-[420px] sm:max-w-xl md:max-w-2xl bg-transparent shadow-none [&>button]:hidden mx-auto max-h-[90vh] overflow-hidden">
        <div className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto pb-[140px] sm:pb-0">
          {/* Close button */}
          <DialogClose asChild>
            <button
              className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 p-1.5 text-foreground/40 hover:text-foreground transition-colors"
              aria-label={t.baliRequest.close}
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </DialogClose>

          {/* Content */}
          <div className="px-5 py-6 sm:p-8 md:p-10">
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-5 sm:mb-8">
                  <h2 className="font-display text-base sm:text-2xl md:text-3xl text-foreground mb-3 leading-[1.3]">
                    {t.baliRequest.title}
                  </h2>
                  <p className="text-[11px] sm:text-sm text-muted-foreground/85 font-light leading-snug">
                    {t.baliRequest.subtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Date selection display */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Check-in field - clickable */}
                      <button
                        type="button"
                        onClick={handleCheckInClick}
                        className="space-y-1.5 sm:space-y-2 text-left"
                      >
                        <Label className={cn(
                          "text-[9px] sm:text-xs uppercase tracking-[0.1em] transition-colors duration-200 pointer-events-none",
                          selectionMode === 'check-in' ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {t.baliRequest.checkIn}
                        </Label>
                        <div className={cn(
                          "h-12 sm:h-10 px-3 rounded-lg flex items-center transition-all duration-200",
                          selectionMode === 'check-in' 
                            ? "bg-foreground/5 border-2 border-foreground/30" 
                            : "bg-muted/30 border border-foreground/10 hover:border-foreground/20",
                          formData.checkIn ? 'text-foreground' : 'text-muted-foreground/50'
                        )}>
                          <span className="text-xs sm:text-sm">
                            {formData.checkIn ? formatDate(formData.checkIn) : "—"}
                          </span>
                        </div>
                      </button>

                      {/* Check-out field - clickable */}
                      <button
                        type="button"
                        onClick={handleCheckOutClick}
                        className={cn(
                          "space-y-1.5 sm:space-y-2 text-left",
                          !formData.checkIn && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!formData.checkIn}
                      >
                        <Label className={cn(
                          "text-[9px] sm:text-xs uppercase tracking-[0.1em] transition-colors duration-200 pointer-events-none",
                          selectionMode === 'check-out' ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {t.baliRequest.checkOut}
                        </Label>
                        <div className={cn(
                          "h-12 sm:h-10 px-3 rounded-lg flex items-center transition-all duration-200",
                          selectionMode === 'check-out' 
                            ? "bg-foreground/5 border-2 border-foreground/30" 
                            : "bg-muted/30 border border-foreground/10 hover:border-foreground/20",
                          formData.checkOut ? 'text-foreground' : 'text-muted-foreground/50'
                        )}>
                          <span className="text-xs sm:text-sm">
                            {formData.checkOut ? formatDate(formData.checkOut) : "—"}
                          </span>
                        </div>
                      </button>
                    </div>
                    
                    {/* Selection hint or total price block */}
                    <div className="flex flex-col items-center justify-center min-h-[72px]">
                      {selectionMode === 'check-in' && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground/70 font-light animate-fade-in">
                          {t.baliRequest.selectCheckIn}
                        </p>
                      )}
                      {selectionMode === 'check-out' && (
                        <p className="text-[10px] sm:text-xs text-foreground/70 font-light animate-fade-in">
                          {t.baliRequest.selectCheckOut}
                        </p>
                      )}
                      {selectionMode === 'complete' && areDatesValid && nightsCount > 0 && (
                        <div className="text-center animate-fade-in">
                          {/* Main price block */}
                          <div className="mb-2">
                            <p className="text-lg sm:text-xl text-foreground font-medium tracking-tight">
                              {nightsCount} {nightsCount === 1 ? t.baliRequest.night : t.baliRequest.nights} · {(nightsCount * PRICE_PER_NIGHT).toLocaleString()} €
                            </p>
                          </div>
                          
                          {/* Secondary label */}
                          <p className="text-[10px] sm:text-xs text-muted-foreground/70 font-normal mb-3">
                            {t.baliRequest.estimatedPrice}
                          </p>
                          
                          {/* Legal note - separated */}
                          <p className="text-[8px] sm:text-[9px] text-muted-foreground/50 font-light max-w-[260px] mx-auto leading-relaxed">
                            {t.baliRequest.priceDisclaimer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inline Calendar - with extra spacing when price block is visible */}
                  <div className={cn(
                    "border-t border-b border-foreground/5 py-4 sm:py-5 -mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-10 md:px-10",
                    selectionMode === 'complete' && areDatesValid && "mt-2"
                  )}>
                    {isLoadingAvailability ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-xs text-muted-foreground/60 animate-pulse">
                          ...
                        </div>
                      </div>
                    ) : (
                      <InlineDateRangePicker
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onSelect={handleDateSelect}
                        minimumNights={MINIMUM_NIGHTS}
                        selectionMode={selectionMode}
                        onSelectionModeChange={setSelectionMode}
                        isDateBlocked={isDateBlocked}
                        isRangeBlocked={isRangeBlocked}
                        blockedRanges={blockedRanges}
                        isExactThreeNightGap={isExactThreeNightGap}
                        getMinimumNightsForDate={getMinimumNightsForDate}
                      />
                    )}
                    
                    {/* Price and minimum stay notes */}
                    <div className="text-center mt-4 space-y-1">
                      <p className="text-[10px] sm:text-xs text-muted-foreground/80 font-light">
                        {t.baliRequest.fixedPrice}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground/50 font-light">
                        {t.baliRequest.minimumStayNote}
                      </p>
                    </div>
                  </div>

                  {/* Guests Stepper */}
                  <div className="space-y-2">
                    <Label className="text-[9px] sm:text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      {t.baliRequest.guests}
                    </Label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-muted/30 border border-foreground/10 rounded-lg h-12 sm:h-10">
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(formData.guests) || 1;
                            if (current > 1) {
                              handleChange("guests", String(current - 1));
                            }
                          }}
                          disabled={!formData.guests || parseInt(formData.guests) <= 1}
                          className={cn(
                            "h-full px-3 sm:px-4 flex items-center justify-center transition-colors",
                            "text-foreground/50 hover:text-foreground",
                            "disabled:opacity-30 disabled:cursor-not-allowed"
                          )}
                          aria-label="Reducir huéspedes"
                        >
                          <Minus className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                        
                        <div className="w-12 sm:w-14 text-center">
                          <span className="text-sm sm:text-base font-medium text-foreground">
                            {formData.guests || "1"}
                          </span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            const current = parseInt(formData.guests) || 0;
                            if (current < 8) {
                              handleChange("guests", String(current + 1));
                            }
                          }}
                          disabled={parseInt(formData.guests) >= 8}
                          className={cn(
                            "h-full px-3 sm:px-4 flex items-center justify-center transition-colors",
                            "text-foreground/50 hover:text-foreground",
                            "disabled:opacity-30 disabled:cursor-not-allowed"
                          )}
                          aria-label="Aumentar huéspedes"
                        >
                          <Plus className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      
                      <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-light">
                        {t.baliRequest.maxCapacity}
                      </p>
                    </div>
                  </div>

                  {/* Name and Email row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="name" className="text-[9px] sm:text-xs uppercase tracking-[0.1em] text-muted-foreground">
                        {t.baliRequest.name} *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t.baliRequest.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={`bg-muted/30 border-foreground/10 focus:border-foreground/30 h-12 sm:h-10 px-3 text-xs sm:text-sm rounded-lg ${errors.name ? "border-red-400" : ""}`}
                      />
                      {errors.name && <p className="text-[9px] text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="email" className="text-[9px] sm:text-xs uppercase tracking-[0.1em] text-muted-foreground">
                        {t.baliRequest.email} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.baliRequest.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`bg-muted/30 border-foreground/10 focus:border-foreground/30 h-12 sm:h-10 px-3 text-xs sm:text-sm rounded-lg ${errors.email ? "border-red-400" : ""}`}
                      />
                      {errors.email && <p className="text-[9px] text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="message" className="text-[9px] sm:text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      {t.baliRequest.message} <span className="normal-case opacity-60">({t.baliRequest.optional})</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t.baliRequest.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-muted/30 border-foreground/10 focus:border-foreground/30 min-h-24 sm:min-h-[80px] resize-none text-xs sm:text-sm rounded-lg p-3"
                      rows={3}
                    />
                  </div>

                  {/* Submit button - hidden on mobile when sticky is visible */}
                  <div className={cn(
                    "sm:block",
                    showMobileSticky ? "hidden" : "block"
                  )}>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="w-full h-[52px] mt-6 bg-foreground text-background text-[10px] sm:text-[11px] uppercase tracking-[0.18em] rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t.baliRequest.submitting : t.baliRequest.submit}
                    </Button>

                    {/* Legal microcopy */}
                    <p className="text-xs text-center text-muted-foreground/70 mt-3">
                      {t.baliRequest.privacy}
                    </p>
                  </div>
                </form>

                {/* Mobile Sticky Bottom Bar - Solid background, structural feel */}
                {showMobileSticky && (
                  <div className="fixed bottom-0 left-0 right-0 sm:hidden z-50 animate-fade-in">
                    {/* Subtle top border separator */}
                    <div className="h-px bg-foreground/8" />
                    
                    {/* Sticky content - solid background, no transparency */}
                    <div className="bg-secondary shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.08)]">
                      <div className="px-5 py-5">
                        {/* Price summary */}
                        <div className="mb-4">
                          <p className="text-lg font-medium text-foreground tracking-tight">
                            {t.baliRequest.totalStay} · {(nightsCount * PRICE_PER_NIGHT).toLocaleString()} €
                          </p>
                          <p className="text-[10px] text-muted-foreground/60 font-light mt-0.5">
                            {nightsCount} {nightsCount === 1 ? t.baliRequest.night : t.baliRequest.nights} · {PRICE_PER_NIGHT} € / {t.baliRequest.night}
                          </p>
                        </div>
                        
                        {/* CTA Button - clear contrast on solid background */}
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting || !isFormValid}
                          className={cn(
                            "w-full h-12 text-[10px] uppercase tracking-[0.18em] rounded-xl transition-colors",
                            isFormValid 
                              ? "bg-foreground text-background hover:bg-foreground/90" 
                              : "bg-foreground/50 text-background/80",
                            "disabled:opacity-40 disabled:cursor-not-allowed"
                          )}
                        >
                          {isSubmitting ? t.baliRequest.submitting : t.baliRequest.submit}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Success state */
              <div className="text-center py-8 sm:py-12">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground mb-3">
                  {t.baliRequest.successTitle}
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed max-w-sm mx-auto">
                  {t.baliRequest.successMessage}
                </p>
                <Button
                  onClick={handleClose}
                  variant="diptyque"
                  className="mt-8"
                >
                  {t.baliRequest.close}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BaliRequestModal;
