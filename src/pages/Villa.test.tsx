import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AvailabilityModalProvider } from "@/contexts/AvailabilityModalContext";
import Villa from "./Villa";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: null, error: null }),
    },
  },
}));

vi.mock("@vimeo/player", () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    play: vi.fn().mockResolvedValue(undefined),
    setCurrentTime: vi.fn(),
    destroy: vi.fn(),
  })),
}));

function renderVilla(initialPath: string) {
  const queryClient = new QueryClient();
  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AvailabilityModalProvider>
            <MemoryRouter initialEntries={[initialPath]}>
              <Routes>
                <Route path="/villa/:slug" element={<Villa />} />
              </Routes>
            </MemoryRouter>
          </AvailabilityModalProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

describe("Villa page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders villa content for valid slug california", async () => {
    renderVilla("/villa/california");

    await expect(
      screen.findByRole("link", { name: /back/i }),
    ).resolves.toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders back-to-villas and link for invalid slug", async () => {
    renderVilla("/villa/invalid-slug-xyz");

    await expect(
      screen.findByRole("heading", {
        name: /back to villas|volver a villas/i,
      }),
    ).resolves.toBeInTheDocument();
    const backLink = screen.getByRole("link", { name: /back|volver/i });
    expect(backLink).toHaveAttribute("href", "/");
  });
});
