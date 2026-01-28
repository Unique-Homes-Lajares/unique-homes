import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useBaliAvailability } from "./useBaliAvailability";

const mockInvoke = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: (...args: unknown[]) => mockInvoke(...args),
    },
  },
}));

describe("useBaliAvailability", () => {
  beforeEach(() => {
    mockInvoke.mockReset();
  });

  it("starts with isLoading true then resolves with data", async () => {
    const data = {
      blockedPeriods: [{ start: "2025-02-01", end: "2025-02-05" }],
      threeNightGaps: [{ checkIn: "2025-02-10", checkOut: "2025-02-13" }],
      lastUpdated: "2025-01-01T00:00:00Z",
    };
    mockInvoke.mockResolvedValueOnce({ data, error: null });

    const { result } = renderHook(() => useBaliAvailability());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.blockedPeriods).toEqual(data.blockedPeriods);
    expect(result.current.threeNightGaps).toEqual(data.threeNightGaps);
    expect(result.current.error).toBeNull();
  });

  it("isDateBlocked returns true for date inside blocked period", async () => {
    const data = {
      blockedPeriods: [{ start: "2025-02-01", end: "2025-02-05" }],
      threeNightGaps: [] as { checkIn: string; checkOut: string }[],
      lastUpdated: "2025-01-01T00:00:00Z",
    };
    mockInvoke.mockResolvedValueOnce({ data, error: null });

    const { result } = renderHook(() => useBaliAvailability());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isDateBlocked(new Date("2025-02-02"))).toBe(true);
    expect(result.current.isDateBlocked(new Date("2025-02-10"))).toBe(false);
  });

  it("isRangeBlocked returns true when range overlaps blocked period", async () => {
    const data = {
      blockedPeriods: [{ start: "2025-02-05", end: "2025-02-10" }],
      threeNightGaps: [] as { checkIn: string; checkOut: string }[],
      lastUpdated: "2025-01-01T00:00:00Z",
    };
    mockInvoke.mockResolvedValueOnce({ data, error: null });

    const { result } = renderHook(() => useBaliAvailability());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(
      result.current.isRangeBlocked(
        new Date("2025-02-03"),
        new Date("2025-02-07"),
      ),
    ).toBe(true);
    expect(
      result.current.isRangeBlocked(
        new Date("2025-02-01"),
        new Date("2025-02-04"),
      ),
    ).toBe(false);
  });

  it("isExactThreeNightGap returns true for matching gap", async () => {
    const data = {
      blockedPeriods: [] as { start: string; end: string }[],
      threeNightGaps: [{ checkIn: "2025-02-10", checkOut: "2025-02-13" }],
      lastUpdated: "2025-01-01T00:00:00Z",
    };
    mockInvoke.mockResolvedValueOnce({ data, error: null });

    const { result } = renderHook(() => useBaliAvailability());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const checkIn = new Date(2025, 1, 10);
    const checkOut = new Date(2025, 1, 13);
    const checkOutWrong = new Date(2025, 1, 14);
    expect(result.current.isExactThreeNightGap(checkIn, checkOut)).toBe(true);
    expect(result.current.isExactThreeNightGap(checkIn, checkOutWrong)).toBe(
      false,
    );
  });

  it("getMinimumNightsForDate returns 3 when check-in is start of 3-night gap", async () => {
    const data = {
      blockedPeriods: [] as { start: string; end: string }[],
      threeNightGaps: [{ checkIn: "2025-02-10", checkOut: "2025-02-13" }],
      lastUpdated: "2025-01-01T00:00:00Z",
    };
    mockInvoke.mockResolvedValueOnce({ data, error: null });

    const { result } = renderHook(() => useBaliAvailability());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.getMinimumNightsForDate(new Date(2025, 1, 10))).toBe(
      3,
    );
    expect(result.current.getMinimumNightsForDate(new Date(2025, 1, 15))).toBe(
      4,
    );
  });

  it("sets error on invoke failure and does not throw", async () => {
    mockInvoke.mockResolvedValueOnce({
      data: null,
      error: new Error("Network error"),
    });

    const { result } = renderHook(() => useBaliAvailability());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to load availability");
    expect(result.current.blockedPeriods).toEqual([]);
  });

  it("refetch calls invoke again", async () => {
    const data = {
      blockedPeriods: [] as { start: string; end: string }[],
      threeNightGaps: [] as { checkIn: string; checkOut: string }[],
      lastUpdated: "2025-01-01T00:00:00Z",
    };
    mockInvoke
      .mockResolvedValueOnce({ data, error: null })
      .mockResolvedValueOnce({ data, error: null });

    const { result } = renderHook(() => useBaliAvailability());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockInvoke).toHaveBeenCalledTimes(1);

    await result.current.refetch();

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledTimes(2);
    });
  });
});
