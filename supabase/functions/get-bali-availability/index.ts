/// <reference types="deno" />
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BlockedPeriod {
  start: string;
  end: string;
  summary?: string;
}

interface ThreeNightGap {
  checkIn: string;
  checkOut: string;
}

function parseICalDate(dateStr: string): string {
  // iCal dates can be in format: YYYYMMDD or YYYYMMDDTHHmmssZ
  if (dateStr.length === 8) {
    // YYYYMMDD format
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  }
  // YYYYMMDDTHHmmssZ format - extract just the date
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

function parseICalData(icalData: string): BlockedPeriod[] {
  const blockedPeriods: BlockedPeriod[] = [];
  const lines = icalData.split(/\r?\n/);

  let inEvent = false;
  let currentEvent: { dtstart?: string; dtend?: string; summary?: string } = {};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Handle line continuation (lines starting with space or tab)
    while (
      i + 1 < lines.length &&
      (lines[i + 1].startsWith(" ") || lines[i + 1].startsWith("\t"))
    ) {
      i++;
      line += lines[i].slice(1);
    }

    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      currentEvent = {};
    } else if (line === "END:VEVENT") {
      if (currentEvent.dtstart && currentEvent.dtend) {
        blockedPeriods.push({
          start: parseICalDate(currentEvent.dtstart),
          end: parseICalDate(currentEvent.dtend),
          summary: currentEvent.summary,
        });
      }
      inEvent = false;
    } else if (inEvent) {
      // Parse DTSTART
      if (line.startsWith("DTSTART")) {
        const match = line.match(/DTSTART[^:]*:(.+)/);
        if (match) {
          currentEvent.dtstart = match[1];
        }
      }
      // Parse DTEND
      else if (line.startsWith("DTEND")) {
        const match = line.match(/DTEND[^:]*:(.+)/);
        if (match) {
          currentEvent.dtend = match[1];
        }
      }
      // Parse SUMMARY
      else if (line.startsWith("SUMMARY")) {
        const match = line.match(/SUMMARY[^:]*:(.+)/);
        if (match) {
          currentEvent.summary = match[1];
        }
      }
    }
  }

  console.log(`Parsed ${blockedPeriods.length} blocked periods from iCal`);
  return blockedPeriods;
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().split("T")[0];
}

function diffDays(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + "T00:00:00Z");
  const d2 = new Date(dateStr2 + "T00:00:00Z");
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

function calculateThreeNightGaps(
  blockedPeriods: BlockedPeriod[],
): ThreeNightGap[] {
  const gaps: ThreeNightGap[] = [];
  const today = new Date().toISOString().split("T")[0];

  if (blockedPeriods.length === 0) {
    return gaps;
  }

  // Sort blocked periods by start date
  const sorted = [...blockedPeriods].sort((a, b) =>
    a.start.localeCompare(b.start),
  );

  // Merge overlapping/adjacent blocked periods to get continuous blocked ranges
  const mergedPeriods: BlockedPeriod[] = [];
  let currentPeriod = { ...sorted[0] };

  for (let i = 1; i < sorted.length; i++) {
    const nextPeriod = sorted[i];

    // Check if periods overlap or are adjacent (end >= next start)
    // iCal DTEND is exclusive, so if currentEnd >= nextStart, they touch/overlap
    if (currentPeriod.end >= nextPeriod.start) {
      // Merge: extend current period's end if needed
      if (nextPeriod.end > currentPeriod.end) {
        currentPeriod.end = nextPeriod.end;
      }
    } else {
      // No overlap, save current and start new
      mergedPeriods.push(currentPeriod);
      currentPeriod = { ...nextPeriod };
    }
  }
  mergedPeriods.push(currentPeriod);

  console.log(
    `Merged ${sorted.length} blocked periods into ${mergedPeriods.length} continuous ranges`,
  );

  // Check gap between today and first blocked period
  const firstStart = mergedPeriods[0].start;
  if (firstStart > today) {
    const gapNights = diffDays(today, firstStart);
    if (gapNights === 3) {
      gaps.push({
        checkIn: today,
        checkOut: firstStart,
      });
      console.log(
        `Found 3-night gap: ${today} to ${firstStart} (before first booking)`,
      );
    }
  }

  // Check gaps between consecutive merged blocked periods
  for (let i = 0; i < mergedPeriods.length - 1; i++) {
    const currentEnd = mergedPeriods[i].end; // iCal DTEND is exclusive (checkout date = first available)
    const nextStart = mergedPeriods[i + 1].start;

    // Gap is from currentEnd (available) to nextStart (blocked)
    const gapNights = diffDays(currentEnd, nextStart);

    if (gapNights === 3 && currentEnd >= today) {
      gaps.push({
        checkIn: currentEnd,
        checkOut: nextStart,
      });
      console.log(`Found 3-night gap: ${currentEnd} to ${nextStart}`);
    }
  }

  console.log(`Total 3-night gaps found: ${gaps.length}`);
  return gaps;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const icalUrl = Deno.env.get("BALI_ICAL_URL");

    if (!icalUrl) {
      console.error("BALI_ICAL_URL environment variable not set");
      return new Response(
        JSON.stringify({ error: "Calendar URL not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("Fetching iCal data from Airbnb...");

    const response = await fetch(icalUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VillaCalendar/1.0)",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch iCal: ${response.status} ${response.statusText}`,
      );
      return new Response(
        JSON.stringify({ error: "Failed to fetch calendar data" }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const icalData = await response.text();
    console.log(`Received ${icalData.length} bytes of iCal data`);

    const blockedPeriods = parseICalData(icalData);
    const threeNightGaps = calculateThreeNightGaps(blockedPeriods);

    return new Response(
      JSON.stringify({
        blockedPeriods,
        threeNightGaps,
        lastUpdated: new Date().toISOString(),
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300", // Cache for 5 minutes
        },
      },
    );
  } catch (error) {
    console.error("Error processing iCal data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
