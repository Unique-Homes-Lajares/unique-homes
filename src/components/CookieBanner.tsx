import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleConfigure = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "configured");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-stone-700/50 rounded-lg shadow-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-stone-800 flex-shrink-0">
            <Cookie className="w-5 h-5 text-stone-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-display text-lg text-white mb-2">
              Usamos cookies para mejorar su experiencia
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              Utilizamos cookies propias y de terceros para analizar la navegación y ofrecer 
              contenido personalizado. Puede aceptar todas las cookies o seleccionar cuáles desea permitir.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAcceptAll}
                className="bg-white text-[#1a1a1a] hover:bg-stone-200 text-xs uppercase tracking-widest font-light px-6 py-2.5 h-auto"
              >
                Aceptar todas
              </Button>
              <Button
                asChild
                variant="outline"
                onClick={handleConfigure}
                className="border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white text-xs uppercase tracking-widest font-light px-6 py-2.5 h-auto"
              >
                <Link to="/politica-privacidad">
                  Configurar cookies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
