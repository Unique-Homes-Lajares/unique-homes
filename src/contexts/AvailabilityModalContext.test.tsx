import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AvailabilityModalProvider,
  useAvailabilityModal,
} from "./AvailabilityModalContext";

function TestConsumer() {
  const { isOpen, openModal, closeModal } = useAvailabilityModal();
  return (
    <div>
      <span data-testid="is-open">{String(isOpen)}</span>
      <button onClick={openModal}>Open</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}

describe("AvailabilityModalContext", () => {
  it("openModal sets isOpen true, closeModal sets false", async () => {
    const user = userEvent.setup();
    render(
      <AvailabilityModalProvider>
        <TestConsumer />
      </AvailabilityModalProvider>,
    );

    expect(screen.getByTestId("is-open")).toHaveTextContent("false");

    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByTestId("is-open")).toHaveTextContent("true");

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.getByTestId("is-open")).toHaveTextContent("false");
  });

  it("useAvailabilityModal throws outside provider", () => {
    function BadConsumer() {
      useAvailabilityModal();
      return null;
    }
    expect(() => render(<BadConsumer />)).toThrow(
      /useAvailabilityModal must be used within an AvailabilityModalProvider/,
    );
  });
});
