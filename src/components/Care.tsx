import careBackground from "@/assets/care-background.jpg";

const Care = () => {
  return (
    <section className="my-8 md:my-12" id="cuidado">
      <div className="container-custom">
        <div className="section-card relative overflow-hidden">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${careBackground})` }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
          
          {/* Content */}
          <div className="section-card-inner text-center max-w-3xl mx-auto py-10 md:py-14 relative z-10">
            <div className="kicker">Cuidado</div>
            <h2 className="heading-section mb-5 md:mb-6">
              Antes de que llegues.
              <br />
              Mientras estás. Cuando te vas.
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Llegas y todo está listo. Si necesitas algo, aquí estamos.
              <br />
              Si no, no molestamos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Care;
