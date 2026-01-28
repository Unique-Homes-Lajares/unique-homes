import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import InlineDateRangePicker from "./InlineDateRangePicker";

function renderPicker(
  props: Partial<React.ComponentProps<typeof InlineDateRangePicker>> = {},
) {
  const defaultProps = {
    checkIn: undefined,
    checkOut: undefined,
    onSelect: vi.fn(),
    selectionMode: "check-in" as const,
    onSelectionModeChange: vi.fn(),
  };
  return render(
    <LanguageProvider>
      <InlineDateRangePicker {...defaultProps} {...props} />
    </LanguageProvider>,
  );
}

describe("InlineDateRangePicker", () => {
  it("renders without error with check-in mode", () => {
    const { container } = renderPicker();
    expect(
      container.querySelector("[data-daypicker-root]") ?? container.firstChild,
    ).toBeTruthy();
  });

  it("uses getMinimumNightsForDate when provided and check-in is set", () => {
    const getMinimumNightsForDate = vi.fn().mockReturnValue(3);
    renderPicker({
      checkIn: new Date(2025, 5, 1),
      selectionMode: "check-out",
      getMinimumNightsForDate,
    });
    expect(getMinimumNightsForDate).toHaveBeenCalledWith(expect.any(Date));
  });

  it("renders with isDateBlocked and getMinimumNightsForDate props", () => {
    const isDateBlocked = vi.fn().mockReturnValue(false);
    const getMinimumNightsForDate = vi.fn().mockReturnValue(4);
    const { container } = renderPicker({
      isDateBlocked,
      getMinimumNightsForDate,
      checkIn: new Date(2025, 5, 1),
    });
    expect(container.firstChild).toBeTruthy();
    expect(getMinimumNightsForDate).toHaveBeenCalled();
  });
});
