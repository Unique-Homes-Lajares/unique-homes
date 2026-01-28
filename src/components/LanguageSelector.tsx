import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGES, Language } from '@/i18n';

interface LanguageSelectorProps {
  variant?: 'light' | 'dark';
  className?: string;
  onLanguageChange?: () => void;
  /** Show all languages inline (for menus/footer) */
  inline?: boolean;
  /** Style for inline mode: 'buttons' for mobile menu, 'list' for footer sitemap */
  inlineStyle?: 'buttons' | 'list';
}

const LanguageSelector = ({ variant = 'dark', className = '', onLanguageChange, inline = false, inlineStyle = 'buttons' }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current && 
        triggerRef.current && 
        !panelRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Inline mode with buttons (for mobile header menu) - "ES / EN" style
  if (inline && inlineStyle === 'buttons') {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {LANGUAGES.map((lang, index) => (
          <span key={lang.code} className="flex items-center">
            <button
              onClick={() => handleLanguageChange(lang.code as Language)}
              className={`text-xs uppercase tracking-[0.08em] transition-colors duration-300 ${
                language === lang.code
                  ? variant === 'light'
                    ? 'text-white font-medium'
                    : 'text-foreground font-medium'
                  : variant === 'light'
                    ? 'text-stone-500 hover:text-stone-300'
                    : 'text-muted-foreground/60 hover:text-muted-foreground'
              }`}
            >
              {lang.code.toUpperCase()}
            </button>
            {index < LANGUAGES.length - 1 && (
              <span className={variant === 'light' ? 'text-stone-600 mx-2' : 'text-muted-foreground/40 mx-2'}>/</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  // Inline mode with list items (for footer sitemap)
  if (inline && inlineStyle === 'list') {
    return (
      <>
        {LANGUAGES.map((lang) => (
          <li key={lang.code}>
            <button
              onClick={() => handleLanguageChange(lang.code as Language)}
              className={`text-sm font-light transition-colors duration-300 text-left ${
                language === lang.code
                  ? variant === 'light'
                    ? 'text-white'
                    : 'text-foreground font-medium'
                  : variant === 'light'
                    ? 'text-stone-400 hover:text-white'
                    : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {lang.nativeLabel}
            </button>
          </li>
        ))}
      </>
    );
  }

  // Editorial micro panel mode (default)
  return (
    <div className={`relative ${className}`}>
      {/* Trigger: plain text, no box, no icon */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 transition-colors duration-500 ${
          variant === 'light'
            ? 'text-white/80 hover:text-white'
            : 'text-ink hover:text-ink/80'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} strokeWidth={1.2} />
        <span className="text-xs uppercase tracking-[0.16em] font-light">{language.toUpperCase()}</span>
      </button>

      {/* Subtle overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/5 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Editorial micro panel - opens downward */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute top-full right-1/2 translate-x-1/2 mt-3 origin-top z-50"
          role="listbox"
          aria-label="Select language"
        >
          <div className="bg-card backdrop-blur-sm border border-border/30 rounded-2xl shadow-[0_8px_30px_rgba(45,35,25,0.08)] py-3 px-4 min-w-[180px] animate-fade-in">
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code as Language)}
                  role="option"
                  aria-selected={language === lang.code}
                  className={`text-left px-4 min-h-[46px] flex items-center rounded-xl transition-all duration-300 ${
                    language === lang.code
                      ? 'bg-muted/50 text-foreground'
                      : 'text-foreground/60 hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <span className="text-xs tracking-[0.12em] font-light">{lang.nativeLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
