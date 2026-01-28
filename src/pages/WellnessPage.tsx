import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { X, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import wellnessImage from "@/assets/wellness-villa.jpg";
import { useAvailabilityModal } from "@/contexts/AvailabilityModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";

const WellnessPage = () => {
  const { openModal } = useAvailabilityModal();
  const { t, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const prevLanguageRef = useRef(language);
  useEffect(() => {
    if (prevLanguageRef.current !== language && isMenuOpen) {
      // Language changed while menu was open - close menu and scroll to top
      setIsMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevLanguageRef.current = language;
  }, [language, isMenuOpen]);

  const navLinks = [
    { href: "/", label: t.wellnessPage.home, isRoute: true },
    { href: "/#casas", label: t.nav.villas, isRoute: true },
    { href: "/wellness", label: t.nav.wellnessShort, isRoute: true },
    { href: "/#contacto", label: t.nav.contact, isRoute: true },
  ];

  const massageTypes = [
    { name: t.wellnessPage.massages.relaxing, description: t.wellnessPage.massages.relaxingDesc, price: t.wellnessPage.massages.relaxingPrice },
    { name: t.wellnessPage.massages.sports, description: t.wellnessPage.massages.sportsDesc, price: t.wellnessPage.massages.sportsPrice },
    { name: t.wellnessPage.massages.anticellulite, description: t.wellnessPage.massages.anticelluliteDesc, price: t.wellnessPage.massages.anticellulitePrice },
    { name: t.wellnessPage.massages.kobido, description: t.wellnessPage.massages.kobidoDesc, price: t.wellnessPage.massages.kobidoPrice },
    { name: t.wellnessPage.massages.thai, description: t.wellnessPage.massages.thaiDesc, price: t.wellnessPage.massages.thaiPrice },
    { name: t.wellnessPage.massages.lomiLomi, description: t.wellnessPage.massages.lomiLomiDesc, price: t.wellnessPage.massages.lomiLomiPrice },
  ];

  const experiences = [
    {
      title: t.wellnessPage.experiences.yoga,
      description: t.wellnessPage.experiences.yogaDesc,
      prices: t.wellnessPage.experiences.yogaPrices,
    },
    {
      title: t.wellnessPage.experiences.sound,
      description: t.wellnessPage.experiences.soundDesc,
      prices: t.wellnessPage.experiences.soundPrices,
    },
    {
      title: t.wellnessPage.experiences.osteopathy,
      description: t.wellnessPage.experiences.osteopathyDesc,
      prices: t.wellnessPage.experiences.osteopathyPrices,
    },
  ];

  const benefits = [
    t.wellnessPage.benefits.privacy,
    t.wellnessPage.benefits.nature,
    t.wellnessPage.benefits.outdoor,
    t.wellnessPage.benefits.restore,
  ];

  return (
    <>
      <Helmet>
        <title>{t.wellnessPage.heroTitle} | Unique Homes Lajares</title>
        <meta
          name="description"
          content={t.wellnessPage.heroSubtitle}
        />
      </Helmet>

      {/* Floating hamburger menu */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-background/10 backdrop-blur-md border border-background/20 text-background hover:bg-background/20 transition-all duration-500"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X size={24} strokeWidth={1} />
          ) : (
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className="block w-full h-[1.5px] bg-current"></span>
              <span className="block w-full h-[1.5px] bg-current"></span>
              <span className="block w-full h-[1.5px] bg-current"></span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/98 backdrop-blur-md animate-fade-in">
          <nav className="container-custom pt-24 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-4 text-sm uppercase tracking-[0.20em] text-background hover:text-background/70 transition-colors duration-500"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 mt-4 border-t border-background/20">
              <Button 
                variant="diptyque" 
                size="hero" 
                className="w-full bg-background text-foreground hover:bg-background/90"
                onClick={() => {
                  setIsMenuOpen(false);
                  openModal();
                }}
              >
                {t.nav.viewAvailability}
              </Button>
            </div>
            <div className="pt-6 mt-4 border-t border-background/20">
              <div className="flex items-center gap-2 mb-3">
                <Globe size={16} strokeWidth={1.5} className="text-background/60" />
              </div>
              <LanguageSelector variant="light" inline inlineStyle="buttons" onLanguageChange={() => setIsMenuOpen(false)} />
            </div>
          </nav>
        </div>
      )}

      <main className="bg-foreground text-background min-h-screen">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={wellnessImage}
            alt={t.wellnessPage.heroTitle}
            className="absolute inset-0 w-full h-full object-cover saturate-[0.7] brightness-[0.75] contrast-[0.95]"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-4 md:inset-8 border border-white/15 pointer-events-none" />
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="kicker text-background/60 mb-4">{t.wellnessPage.heroKicker}</div>
            <h1 className="heading-display text-background mb-6">
              {t.wellnessPage.heroTitle}
            </h1>
            <p className="text-body text-background/80 max-w-2xl">
              {t.wellnessPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="container-custom py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-body text-background/70 text-lg md:text-xl leading-relaxed">
              {t.wellnessPage.intro}
            </p>
          </div>
        </section>

        {/* Masajes Section */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="text-center mb-12 md:mb-16">
            <div className="heading-section text-background">{t.wellnessPage.massagesKicker}</div>
            <h2 className="heading-section text-background">{t.wellnessPage.massagesTitle}</h2>
            <p className="text-body text-background/70 mt-4 max-w-xl mx-auto">
              {t.wellnessPage.massagesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10">
            {massageTypes.map((massage) => (
              <div
                key={massage.name}
                className="bg-foreground p-7 md:p-10 transition-all duration-500 hover:bg-background/5"
              >
                <h3 className="text-xl md:text-2xl font-light text-background mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {massage.name}
                </h3>
                <p className="text-[15px] text-background/65 leading-[1.7] mb-6">
                  {massage.description}
                </p>
                <p className="text-xs text-background/45 tracking-wide">
                  {massage.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Experiences */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="bg-foreground p-8 md:p-12 text-center"
              >
                <h3 className="heading-section text-background text-2xl md:text-3xl mb-5">
                  {exp.title}
                </h3>
                <p className="text-[15px] text-background/65 leading-[1.7] mb-6">
                  {exp.description}
                </p>
                <p className="text-xs text-background/40 tracking-wide">
                  {exp.prices}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-custom pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <div className="kicker text-background/60">{t.wellnessPage.benefitsKicker}</div>
              <h2 className="heading-section text-background">{t.wellnessPage.benefitsTitle}</h2>
            </div>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4"
                >
                  <span className="text-background/40 text-sm mt-1">—</span>
                  <span className="text-background/80 text-base md:text-lg leading-relaxed font-light">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="container-custom pb-20 md:pb-28">
          <div className="text-center">
            <p className="text-body text-background/70 italic max-w-lg mx-auto mb-8">
              {t.wellnessPage.ctaText}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pdfs/unique-home-lajares-wellness-menu-en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-background/30 text-[11px] uppercase tracking-[0.18em] text-background transition-all duration-500 hover:bg-background hover:text-foreground"
              >
                {t.wellnessPage.downloadMenu}
              </a>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground text-[11px] uppercase tracking-[0.18em] transition-all duration-500 hover:bg-background/90"
              >
                {t.nav.viewAvailability}
              </button>
            </div>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-10 text-[11px] uppercase tracking-[0.18em] text-background/60 hover:text-background transition-colors duration-500"
            >
              <span>←</span>
              {t.wellnessPage.backToHome}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WellnessPage;
