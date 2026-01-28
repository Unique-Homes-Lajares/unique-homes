import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AvailabilityModalProvider } from "@/contexts/AvailabilityModalContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AvailabilityModal from "@/components/AvailabilityModal";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import Villa from "./pages/Villa";
import WellnessPage from "./pages/WellnessPage";
import NuestraFormaDeCuidar from "./pages/NuestraFormaDeCuidar";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Main App component with providers
const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AvailabilityModalProvider>
            <Toaster />
            <Sonner />
            <AvailabilityModal />
            <BrowserRouter>
              <CookieBanner />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/villa/:slug" element={<Villa />} />
                <Route path="/wellness" element={<WellnessPage />} />
                <Route
                  path="/nuestra-forma-de-cuidar"
                  element={<NuestraFormaDeCuidar />}
                />
                <Route
                  path="/politica-privacidad"
                  element={<PrivacyPolicy />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AvailabilityModalProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
