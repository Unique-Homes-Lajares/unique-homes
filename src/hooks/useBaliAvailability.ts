import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isWithinInterval, parseISO, startOfDay, differenceInDays } from "date-fns";

interface BlockedPeriod {
  start: string;
  end: string;
  summary?: string;
}

interface ThreeNightGap {
  checkIn: string;
  checkOut: string;
}

interface AvailabilityData {
  blockedPeriods: BlockedPeriod[];
  threeNightGaps: ThreeNightGap[];
  lastUpdated: string;
}

interface UseBaliAvailabilityReturn {
  blockedPeriods: BlockedPeriod[];
  threeNightGaps: ThreeNightGap[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isDateBlocked: (date: Date) => boolean;
  isRangeBlocked: (start: Date, end: Date) => boolean;
  isExactThreeNightGap: (checkIn: Date, checkOut: Date) => boolean;
  getMinimumNightsForDate: (checkIn: Date) => number;
}

export const useBaliAvailability = (): UseBaliAvailabilityReturn => {
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>([]);
  const [threeNightGaps, setThreeNightGaps] = useState<ThreeNightGap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke<AvailabilityData>(
        "get-bali-availability"
      );

      if (fnError) {
        console.error("Error fetching availability:", fnError);
        setError("Failed to load availability");
        return;
      }

      if (data?.blockedPeriods) {
        setBlockedPeriods(data.blockedPeriods);
      }
      if (data?.threeNightGaps) {
        setThreeNightGaps(data.threeNightGaps);
      }
    } catch (err) {
      console.error("Error fetching availability:", err);
      setError("Failed to load availability");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Check if a specific date falls within any blocked period
  const isDateBlocked = useCallback(
    (date: Date): boolean => {
      const checkDate = startOfDay(date);
      
      return blockedPeriods.some((period) => {
        const start = parseISO(period.start);
        const end = parseISO(period.end);
        
        // Check if date is within the blocked period (inclusive start, exclusive end for iCal)
        return checkDate >= start && checkDate < end;
      });
    },
    [blockedPeriods]
  );

  // Check if a date range overlaps with any blocked period
  const isRangeBlocked = useCallback(
    (rangeStart: Date, rangeEnd: Date): boolean => {
      const start = startOfDay(rangeStart);
      const end = startOfDay(rangeEnd);
      
      return blockedPeriods.some((period) => {
        const periodStart = parseISO(period.start);
        const periodEnd = parseISO(period.end);
        
        // Check for any overlap between the ranges
        // Overlap exists if: rangeStart < periodEnd AND rangeEnd > periodStart
        return start < periodEnd && end > periodStart;
      });
    },
    [blockedPeriods]
  );

  // Check if a selection exactly matches a 3-night gap
  const isExactThreeNightGap = useCallback(
    (checkIn: Date, checkOut: Date): boolean => {
      const checkInStr = startOfDay(checkIn).toISOString().split('T')[0];
      const checkOutStr = startOfDay(checkOut).toISOString().split('T')[0];
      
      return threeNightGaps.some(
        (gap) => gap.checkIn === checkInStr && gap.checkOut === checkOutStr
      );
    },
    [threeNightGaps]
  );

  // Get the effective minimum nights for a given check-in date
  // Returns 3 if the date is the start of an exact 3-night gap, otherwise 4
  const getMinimumNightsForDate = useCallback(
    (checkIn: Date): number => {
      const checkInStr = startOfDay(checkIn).toISOString().split('T')[0];
      
      const matchingGap = threeNightGaps.find((gap) => gap.checkIn === checkInStr);
      if (matchingGap) {
        return 3;
      }
      return 4;
    },
    [threeNightGaps]
  );

  return {
    blockedPeriods,
    threeNightGaps,
    isLoading,
    error,
    refetch: fetchAvailability,
    isDateBlocked,
    isRangeBlocked,
    isExactThreeNightGap,
    getMinimumNightsForDate,
  };
};