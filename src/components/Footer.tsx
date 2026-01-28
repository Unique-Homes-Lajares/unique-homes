import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Globe } from "lucide-react";
import HandwrittenLogo from "./HandwrittenLogo";
import OwnerModal from "./OwnerModal";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const { t } = useLanguage();
  
  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/uniquehomeslajares/", icon: Instagram },
    { label: "YouTube", href: "https://m.youtube.com/@uniquehomeslajares/", icon: Youtube },
    { label: "Pinterest", href: "https://www.pinterest.com/uniquehomeslajares/", icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M8 12a4 4 0 1 0 8 0c0-2.21-1.79-4-4-4s-4 1.79-4 4z"/>
        <path d="M9.5 15.5L8 22"/>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.3-.09-.77-.17-1.96.04-2.8l1.14-4.86s-.29-.58-.29-1.44c0-1.35.78-2.36 1.75-2.36.83 0 1.23.62 1.23 1.36 0 .83-.53 2.07-.8 3.22-.23.96.48 1.74 1.42 1.74 1.71 0 3.02-1.8 3.02-4.4 0-2.3-1.65-3.9-4.01-3.9-2.73 0-4.33 2.05-4.33 4.17 0 .83.32 1.71.72 2.19.08.1.09.18.07.28l-.27 1.1c-.04.18-.15.22-.34.13-1.26-.59-2.05-2.42-2.05-3.9 0-3.17 2.3-6.08 6.64-6.08 3.49 0 6.2 2.49 6.2 5.81 0 3.47-2.19 6.26-5.22 6.26-1.02 0-1.98-.53-2.31-1.16l-.63 2.4c-.23.88-.85 1.98-1.27 2.65.96.3 1.97.46 3.02.46 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    )},
  ];

  const sitemapLinks = [
    { label: t.footer.home, href: "/", isRoute: true },
    { label: t.footer.villas, href: "#casas", isRoute: false },
    { label: t.footer.wellness, href: "/wellness", isRoute: true },
    { label: t.footer.contact_link, href: "#contacto", isRoute: false },
    { label: t.footer.ourWayOfCaring, mobileLabel: t.footer.ourWayOfCaringMobile, href: "/nuestra-forma-de-cuidar", isRoute: true },
  ];

  const casasLinks = [
    { label: "Mykonos", href: "/villa/mykonos" },
    { label: "Santorini", href: "/villa/santorini" },
    { label: "The Retreat", href: "/villa/retreat" },
    { label: "California", href: "/villa/california" },
    { label: "Bali", href: "/villa/bali" },
  ];

  return (
    <footer className="py-16 md:py-20 px-6 md:px-8 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        {/* Sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Navegación */}
          <div>
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-stone-500 mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {sitemapLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link 
                      to={link.href}
                      className="text-sm text-stone-300 hover:text-white transition-colors font-light"
                    >
                      <span className="md:hidden">{link.mobileLabel || link.label}</span>
                      <span className="hidden md:inline">{link.label}</span>
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-sm text-stone-300 hover:text-white transition-colors font-light"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

        {/* Casas */}
          <div>
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-stone-500 mb-4">
              {t.footer.ourHomes}
            </h4>
            <ul className="space-y-2">
              {casasLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-stone-300 hover:text-white transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ¿Eres propietario? */}
          <div>
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-stone-500 mb-4">
              {t.footer.areYouOwner}
            </h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed mb-3">
              {t.footer.ownerDescription}
            </p>
            <button 
              onClick={() => setIsOwnerModalOpen(true)}
              className="text-sm text-stone-300 hover:text-white transition-colors font-light text-left"
            >
              {t.footer.joinFamily}
            </button>
          </div>

          <OwnerModal 
            isOpen={isOwnerModalOpen} 
            onClose={() => setIsOwnerModalOpen(false)} 
          />

          {/* Contacto */}
          <div>
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-stone-500 mb-4">
              {t.footer.contact}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:hello@uniquehomeslajares.com"
                  className="text-sm text-stone-300 hover:text-white transition-colors font-light"
                >
                  {t.footer.writeUs}
                </a>
              </li>
              <li>
                <a 
                  href="tel:+34638082540"
                  className="text-sm text-stone-300 hover:text-white transition-colors font-light"
                >
                  {t.footer.callUs}
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/34638082540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-300 hover:text-white transition-colors font-light"
                >
                  WhatsApp →
                </a>
              </li>
            </ul>
          </div>

          {/* Idioma - visible solo en tablet/desktop */}
          <div className="hidden md:block">
            <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-stone-500 mb-4">
              {t.nav.language}
            </h4>
            <ul className="space-y-2">
              <LanguageSelector variant="light" inline inlineStyle="list" />
            </ul>
          </div>
        </div>

        {/* Brand */}
        <div className="text-center pt-8 border-t border-stone-700/50">
          <Link to="/" className="inline-block mb-4">
            <HandwrittenLogo className="h-10 md:h-12 w-auto mx-auto" color="#F5F0E8" animate={false} />
          </Link>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-stone-500 mb-6">
            {t.footer.tagline}
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-5 mb-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-stone-500 hover:text-stone-300 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          
          {/* Language selector */}
          <div className="mb-6">
            {/* Mobile: icon + horizontal buttons */}
            <div className="md:hidden flex items-center justify-center gap-4">
              <Globe size={16} strokeWidth={1.5} className="text-stone-400" />
              <LanguageSelector variant="light" inline inlineStyle="buttons" />
            </div>
            {/* Desktop: dropdown */}
            <div className="hidden md:block">
              <LanguageSelector variant="dark" className="text-stone-400 hover:text-stone-200" />
            </div>
          </div>
          
          {/* Legal & Copyright */}
          <div className="mt-8 space-y-2">
            <Link 
              to="/politica-privacidad" 
              className="text-[9px] md:text-[10px] text-stone-500 hover:text-stone-300 transition-colors"
            >
              {t.footer.privacyPolicy}
            </Link>
            <p className="text-[9px] md:text-[10px] text-stone-600">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;