import iconAtencion from "@/assets/icon-atencion-personal.png";

const servicio = { 
  image: iconAtencion, 
  alt: "No podría pasar en otro lugar.",
  title: "No podría pasar en otro lugar.",
  description: "Conocemos bien la isla y le ayudamos a descubrir sus rincones más especiales."
};

const ASuServicio = () => {
  return (
    <section className="-mt-24 md:-mt-32 pb-4 md:pb-6 bg-background">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="mb-0">
            <img
              src={servicio.image}
              alt={servicio.alt}
              className="w-[175px] md:w-[225px] h-auto"
            />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl tracking-tight mb-3 -mt-12">
            {servicio.title}
          </h3>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
            {servicio.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ASuServicio;
