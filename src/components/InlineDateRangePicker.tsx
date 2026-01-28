import { useState, useMemo, useEffect, useCallback } from "react";
import { DayPicker, DateRange, DayContentProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, differenceInDays, isBefore, startOfDay, Locale, endOfMonth, isAfter, startOfMonth } from "date-fns";
import { es, enUS, de, fr, it } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export type SelectionMode = 'check-in' | 'check-out' | 'complete';

const PRICE_PER_NIGHT = 490;

interface InlineDateRangePickerProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  onSelect: (range: { checkIn: Date | undefined; checkOut: Date | undefined }) => void;
  minimumNights?: number;
  selectionMode: SelectionMode;
  onSelectionModeChange: (mode: SelectionMode) => void;
  isDateBlocked?: (date: Date) => boolean;
  isRangeBlocked?: (start: Date, end: Date) => boolean;
  blockedRanges?: DateRange[];
  isExactThreeNightGap?: (checkIn: Date, checkOut: Date) => boolean;
  getMinimumNightsForDate?: (checkIn: Date) => number;
}

const localeMap: Record<string, Locale> = {
  es,
  en: enUS,
  de,
  fr,
  it,
};

const InlineDateRangePicker = ({
  checkIn,
  checkOut,
  onSelect,
  minimumNights = 4,
  selectionMode,
  onSelectionModeChange,
  isDateBlocked,
  isRangeBlocked,
  blockedRanges,
  isExactThreeNightGap,
  getMinimumNightsForDate,
}: InlineDateRangePickerProps) => {
  const { language } = useLanguage();
  const [month, setMonth] = useState<Date>(checkIn || new Date());

  const locale = localeMap[language] || es;
  const today = startOfDay(new Date());

  // Get effective minimum nights for current check-in
  const effectiveMinNights = checkIn && getMinimumNightsForDate 
    ? getMinimumNightsForDate(checkIn) 
    : minimumNights;

  // Auto-advance month when entering check-out mode if minimum checkout date is not visible
  useEffect(() => {
    if (selectionMode === 'check-out' && checkIn) {
      const minCheckOut = addDays(checkIn, effectiveMinNights);
      const currentMonthEnd = endOfMonth(month);
      
      // If the minimum checkout date is after the current month's end, advance to that month
      if (isAfter(minCheckOut, currentMonthEnd)) {
        setMonth(startOfMonth(minCheckOut));
      }
    }
  }, [selectionMode, checkIn, effectiveMinNights, month]);

  // Navigate to check-in month when it changes (only when selecting check-in)
  useEffect(() => {
    if (checkIn && selectionMode === 'check-in') {
      setMonth(checkIn);
    }
  }, [checkIn, selectionMode]);

  // Calculate disabled dates based on selection mode (minimum nights rule)
  const minimumNightsDays = useMemo(() => {
    const disabled: Date[] = [];
    
    // In check-out mode, disable dates that don't meet minimum nights
    if (selectionMode === 'check-out' && checkIn) {
      const minCheckOut = addDays(checkIn, effectiveMinNights);
      // Disable check-in date and all dates before minimum checkout
      let current = addDays(checkIn, 1); // Start from day after check-in
      while (isBefore(current, minCheckOut)) {
        disabled.push(current);
        current = addDays(current, 1);
      }
    }
    
    return disabled;
  }, [checkIn, selectionMode, effectiveMinNights]);

  // Build the range for visual highlighting
  const selectedRange: DateRange | undefined = useMemo(() => {
    if (checkIn && checkOut) {
      return { from: checkIn, to: checkOut };
    }
    if (checkIn) {
      return { from: checkIn, to: undefined };
    }
    return undefined;
  }, [checkIn, checkOut]);

  const handleDayClick = (day: Date) => {
    const selectedDay = startOfDay(day);
    
    // Don't allow past dates
    if (isBefore(selectedDay, today)) {
      return;
    }

    // Don't allow blocked dates for check-in
    if (isDateBlocked && isDateBlocked(selectedDay)) {
      return;
    }

    // Handle based on current selection mode
    if (selectionMode === 'check-in') {
      // Set new check-in
      // If there's an existing check-out that would be invalid, clear it
      let newCheckOut = checkOut;
      if (checkOut) {
        const newEffectiveMin = getMinimumNightsForDate ? getMinimumNightsForDate(selectedDay) : minimumNights;
        const nights = differenceInDays(checkOut, selectedDay);
        
        // Check if nights meet minimum (either 4+ or exactly 3 for a gap)
        const isValidNights = nights >= 4 || 
          (nights === 3 && isExactThreeNightGap && isExactThreeNightGap(selectedDay, checkOut));
        
        if (!isValidNights || isBefore(checkOut, selectedDay)) {
          newCheckOut = undefined;
        }
        // Also clear if the new range would be blocked
        if (newCheckOut && isRangeBlocked && isRangeBlocked(selectedDay, newCheckOut)) {
          newCheckOut = undefined;
        }
      }
      onSelect({ checkIn: selectedDay, checkOut: newCheckOut });
      // Auto-transition to check-out mode
      onSelectionModeChange('check-out');
      return;
    }

    if (selectionMode === 'check-out') {
      // Must have check-in first
      if (!checkIn) {
        onSelect({ checkIn: selectedDay, checkOut: undefined });
        return;
      }

      // If clicked before or on check-in, treat as new check-in
      if (isBefore(selectedDay, checkIn) || differenceInDays(selectedDay, checkIn) === 0) {
        // Check if this new check-in date is blocked
        if (isDateBlocked && isDateBlocked(selectedDay)) {
          return;
        }
        onSelect({ checkIn: selectedDay, checkOut: undefined });
        return;
      }

      // Check nights count
      const nights = differenceInDays(selectedDay, checkIn);
      
      // Validate nights: must be 4+ OR exactly 3 if it's an exact gap
      const isValidNights = nights >= 4 || 
        (nights === 3 && isExactThreeNightGap && isExactThreeNightGap(checkIn, selectedDay));
      
      if (!isValidNights) {
        return;
      }

      // Check if the range is blocked
      if (isRangeBlocked && isRangeBlocked(checkIn, selectedDay)) {
        return;
      }

      // Set check-out and complete
      onSelect({ checkIn, checkOut: selectedDay });
      onSelectionModeChange('complete');
      return;
    }

    // In complete mode, clicking any date starts new check-in selection
    if (selectionMode === 'complete') {
      // Check if this new check-in date is blocked
      if (isDateBlocked && isDateBlocked(selectedDay)) {
        return;
      }
      onSelect({ checkIn: selectedDay, checkOut: undefined });
      onSelectionModeChange('check-out');
    }
  };

  const disabledMatchers = useMemo(() => {
    // react-day-picker works best with matchers/DateRanges here.
    return [{ before: today }, ...minimumNightsDays, ...(blockedRanges ?? [])];
  }, [today, minimumNightsDays, blockedRanges]);

  // Custom modifiers for styling - differentiate between blocked (iCal) and minimum nights
  const modifiers = useMemo(() => ({
    selected: checkIn ? [checkIn, ...(checkOut ? [checkOut] : [])] : [],
    range_middle: checkIn && checkOut ? {
      after: checkIn,
      before: checkOut,
    } : undefined,
    // iCal blocked dates - very light gray + strikethrough
    blocked: blockedRanges ?? [],
    // Minimum nights rule - light gray, no strikethrough
    minimum_nights: minimumNightsDays,
  }), [checkIn, checkOut, blockedRanges, minimumNightsDays]);

  // Check if a date should show price (available and not in selection range)
  const shouldShowPrice = useCallback((date: Date): boolean => {
    const day = startOfDay(date);
    
    // Don't show for past dates
    if (isBefore(day, today)) return false;
    
    // Don't show for blocked dates
    if (isDateBlocked && isDateBlocked(day)) return false;
    
    // Don't show for minimum nights disabled dates
    if (minimumNightsDays.some(d => d.getTime() === day.getTime())) return false;
    
    // Don't show for selected dates (check-in, check-out)
    if (checkIn && day.getTime() === checkIn.getTime()) return false;
    if (checkOut && day.getTime() === checkOut.getTime()) return false;
    
    // Dim for dates in range middle
    if (checkIn && checkOut && day > checkIn && day < checkOut) return false;
    
    return true;
  }, [today, isDateBlocked, minimumNightsDays, checkIn, checkOut]);

  // Custom day content component to show price
  const DayContent = useCallback(({ date, activeModifiers }: DayContentProps) => {
    const showPrice = shouldShowPrice(date);
    const isSelected = activeModifiers.selected;
    const isRangeMiddle = activeModifiers.range_middle;
    
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-0.5">
        <span className={cn(
          "text-sm sm:text-[15px] leading-none",
          isSelected && "font-medium"
        )}>
          {date.getDate()}
        </span>
        {showPrice && !isSelected && !isRangeMiddle && (
          <span className="text-[9px] sm:text-[10px] text-foreground/50 font-normal leading-none mt-0.5">
            {PRICE_PER_NIGHT}€
          </span>
        )}
      </div>
    );
  }, [shouldShowPrice]);

  return (
    <div className="w-full pointer-events-auto">
      <DayPicker
        mode="range"
        selected={selectedRange}
        onDayClick={handleDayClick}
        month={month}
        onMonthChange={setMonth}
        locale={locale}
        showOutsideDays={false}
        disabled={disabledMatchers}
        modifiers={modifiers}
        modifiersClassNames={{
          // iCal occupied: very light, thin strikethrough, clearly unavailable
          blocked: "!text-foreground/20 line-through decoration-foreground/30 decoration-1 !cursor-not-allowed hover:!bg-transparent",
          // Minimum nights rule: lighter but no strikethrough
          minimum_nights: "!text-foreground/30 !cursor-not-allowed hover:!bg-transparent",
        }}
        className="w-full !p-0 pointer-events-auto"
        classNames={{
          months: "w-full",
          month: "w-full space-y-4",
          caption: "flex justify-center items-center relative mb-5",
          caption_label: "font-display text-lg sm:text-xl text-foreground capitalize",
          nav: "absolute inset-x-0 flex justify-between items-center pointer-events-none",
          nav_button: cn(
            "pointer-events-auto",
            "h-10 w-10 sm:h-11 sm:w-11",
            "flex items-center justify-center",
            "text-foreground/40 hover:text-foreground",
            "transition-colors duration-200",
            "rounded-full",
            "active:scale-95",
            "-mx-1"
          ),
          nav_button_previous: "",
          nav_button_next: "",
          table: "w-full border-collapse",
          head_row: "flex w-full mb-2",
          head_cell: "flex-1 text-center text-[10px] sm:text-xs uppercase tracking-[0.1em] text-muted-foreground/60 font-normal py-2",
          row: "flex w-full",
          cell: cn(
            "flex-1 aspect-square p-0.5 sm:p-1 relative",
            "[&:has([aria-selected].day-range-start)]:rounded-l-lg",
            "[&:has([aria-selected].day-range-end)]:rounded-r-lg",
            "[&:has([aria-selected].day-range-middle)]:bg-secondary/50"
          ),
          day: cn(
            "w-full h-full flex items-center justify-center",
            "text-xs sm:text-sm font-normal text-foreground",
            "rounded-lg transition-colors duration-150",
            "hover:bg-secondary hover:text-foreground",
            "focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20"
          ),
          day_selected: cn(
            "!bg-foreground !text-background font-medium",
            "hover:!bg-foreground hover:!text-background"
          ),
          day_today: "text-foreground font-semibold",
          day_outside: "invisible",
          // Past dates - subtle gray
          day_disabled: "!text-foreground/25 !cursor-not-allowed hover:!bg-transparent",
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_range_middle: "day-range-middle !bg-secondary/60 !text-foreground/80 !rounded-none",
          day_hidden: "invisible",
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />,
          IconRight: () => <ChevronRight className="h-5 w-5" strokeWidth={1.5} />,
          DayContent: DayContent,
        }}
      />
    </div>
  );
};

export default InlineDateRangePicker;
