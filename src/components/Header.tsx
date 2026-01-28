import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Globe } from "lucide-react";
import { useAvailabilityModal } from "@/contexts/AvailabilityModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ReputationModal from "@/components/ReputationModal";
import LanguageSelector from "@/components/LanguageSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useAvailabilityModal();
  const { t, language } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home, labelMenu: t.nav.home, isRoute: true, hideOnDesktop: true },
    { href: "#casas", label: t.nav.villas, labelMenu: t.nav.villasMenu || t.nav.villas, isRoute: false },
    { href: "/wellness", label: t.nav.wellness, labelShort: t.nav.wellnessShort, labelMenu: t.nav.wellnessMenu || t.nav.wellness, isRoute: true },
    { href: "#contacto", label: t.nav.contact, labelMenu: t.nav.contactMenu || t.nav.contact, isRoute: false },
  ];

  const prevLanguageRef = useRef(language);
  useEffect(() => {
    if (prevLanguageRef.current !== language && isMenuOpen) {
      // Language changed while menu was open - close menu and scroll to top
      setIsMenuOpen(false);

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevLanguageRef.current = language;
  }, [language, isMenuOpen]);

  return (
    <>
      {/* Gradient overlay for header readability */}
      <div className="fixed top-0 left-0 right-0 h-28 md:h-36 bg-gradient-to-b from-black/50 via-black/28 to-transparent z-40 pointer-events-none" />
      
      <header className="sticky top-0 z-50 text-sand">
        <div className="container-custom h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Empty spacer for layout balance */}
          <div className="flex-shrink-0" />
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.filter(link => !link.hideOnDesktop).map((link) => (
            link.isRoute ? (
              <Link key={link.href} to={link.href} className="nav-link">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            )
          ))}
          <LanguageSelector variant="dark" />
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ReputationModal />
          </div>
          <Button variant="diptyque" size="nav" onClick={openModal} className="hidden sm:inline-flex">
            {t.nav.viewAvailability}
          </Button>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 text-ink hover:text-ink/70 transition-colors duration-500"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={28} strokeWidth={1} />
            ) : (
              <div className="w-12 h-5 flex flex-col justify-between">
                <span className="block w-full h-[1.5px] bg-current"></span>
                <span className="block w-full h-[1.5px] bg-current"></span>
                <span className="block w-full h-[1.5px] bg-current"></span>
              </div>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in flex flex-col">
          <nav className="flex-1 flex flex-col items-center justify-start px-8 pt-16 pb-8">
            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              {navLinks.filter(link => !link.hideOnDesktop).map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-2xl text-foreground hover:text-muted-foreground transition-colors duration-500 leading-relaxed"
                  >
                    {link.labelMenu}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-2xl text-foreground hover:text-muted-foreground transition-colors duration-500 leading-relaxed"
                  >
                    {link.labelMenu}
                  </a>
                )
              ))}
              
              <div className="flex flex-col gap-4 w-full mt-8">
                <Button 
                  variant="diptyque" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal();
                  }}
                >
                  {t.nav.viewAvailability}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full font-light"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '#contacto';
                  }}
                >
                  {t.nav.writeUs || 'Escríbenos'}
                </Button>
              </div>
              
              <div className="mt-8">
                <LanguageSelector variant="dark" inline onLanguageChange={() => setIsMenuOpen(false)} />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
