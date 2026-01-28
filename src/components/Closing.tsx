import { Button } from "@/components/ui/button";
import { useAvailabilityModal } from "@/contexts/AvailabilityModalContext";

const Closing = () => {
  const { openModal } = useAvailabilityModal();
  return (
    <section className="container-custom my-8 md:my-12" id="disponibilidad">
      <div className="section-card">
        <div className="section-card-inner text-center max-w-3xl mx-auto py-12 md:py-16">
          <div className="separator-elegant mb-8 md:mb-10" />
          
          <div className="kicker">Reservar</div>
          <h2 className="heading-section mb-5 md:mb-6">
            Si buscas un hotel, quizá este no sea el lugar.
          </h2>
          <p className="text-body mb-8 md:mb-10">
            Si buscas una casa para quedarte un poco más, bienvenido.
          </p>
          
          <Button variant="hero" size="hero" onClick={openModal}>
            Ver disponibilidad
          </Button>
          
          <div className="separator-elegant mt-10 md:mt-12" />
        </div>
      </div>
    </section>
  );
};

export default Closing;
