import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerModal = ({ isOpen, onClose }: OwnerModalProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.telefono.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ nombre: "", email: "", telefono: "" });
      onClose();
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white border-stone-200 p-8 md:p-10">
        <DialogHeader className="text-left mb-4">
          <DialogTitle className="font-display text-2xl md:text-3xl text-stone-900 font-light tracking-tight">
            ¿Tiene una villa especial en Lajares?
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8">
            <p className="text-stone-600 font-light">
              Gracias por contactarnos. Le responderemos pronto.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 text-sm text-stone-600 font-light leading-relaxed">
              <p>
                Somos el único portal especializado en Lajares. Reunimos casas con personalidad y buena reputación.
              </p>
              <p>
                Sin costes mayores que otras plataformas, pero con un enfoque más cercano y transparente. Si le interesa, déjenos su contacto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                maxLength={100}
                className="bg-transparent border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-500 h-12 rounded-xl"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={255}
                className="bg-transparent border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-500 h-12 rounded-xl"
              />
              <Input
                name="telefono"
                type="tel"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
                maxLength={20}
                className="bg-transparent border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-stone-500 h-12 rounded-xl"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-stone-900 text-white hover:bg-stone-800 font-light h-12 text-sm tracking-wide"
              >
                {isSubmitting ? "Enviando..." : "Quiero saber más →"}
              </Button>
            </form>

            <p className="text-[11px] text-stone-500 text-center mt-6 font-light">
              Sin compromiso. Le explicamos todo con claridad.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OwnerModal;
