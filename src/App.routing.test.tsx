import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AvailabilityModalProvider } from "@/contexts/AvailabilityModalContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import WellnessPage from "./pages/WellnessPage";
import NotFound from "./pages/NotFound";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: null, error: null }),
    },
  },
}));

function renderRoute(path: string) {
  const queryClient = new QueryClient();
  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <AvailabilityModalProvider>
              <MemoryRouter initialEntries={[path]}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/wellness" element={<WellnessPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MemoryRouter>
            </AvailabilityModalProvider>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

describe("App routing", () => {
  it("renders Index at /", async () => {
    renderRoute("/");
    await expect(screen.findByRole("main")).resolves.toBeInTheDocument();
  });

  it("renders WellnessPage at /wellness", async () => {
    renderRoute("/wellness");
    await expect(
      screen.findByRole("heading", { level: 1 }),
    ).resolves.toBeInTheDocument();
  });

  it("renders NotFound for unknown path", () => {
    renderRoute("/unknown-path");
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /home|inicio|back/i }),
    ).toBeInTheDocument();
  });
});
