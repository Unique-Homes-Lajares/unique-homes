import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-foreground text-background py-2.5 relative">
      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-light text-center px-10">
        ¡Hola! Pronto tendremos disponible una villa con 3 habitaciones. La
        nueva{" "}
        <Link
          to="/villa/bali"
          className="underline hover:text-background/80 transition-colors duration-300"
        >
          Bali
        </Link>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-background/70 hover:text-background transition-colors duration-300"
        aria-label="Cerrar anuncio"
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
