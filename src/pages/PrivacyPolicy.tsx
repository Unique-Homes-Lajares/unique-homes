import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad y Cookies | Unique Homes Lajares</title>
        <meta
          name="description"
          content="Política de privacidad y cookies de Unique Homes Lajares. Información sobre el tratamiento de datos personales y uso de cookies."
        />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20 px-6 md:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-12 text-center">
            Política de privacidad y cookies
          </h1>

          <div className="prose prose-stone max-w-none text-foreground/80 space-y-8">
            <p className="text-lg leading-relaxed">
              En Unique Homes Lajares nos comprometemos a proteger la privacidad de nuestros usuarios. 
              Utilizamos la información personal únicamente para gestionar reservas, responder a consultas 
              y, si lo desea, enviarle comunicaciones sobre nuestras villas y servicios.
            </p>

            <section>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                Responsable del tratamiento
              </h2>
              <p className="leading-relaxed">
                La entidad responsable del tratamiento de sus datos personales es Unique Homes Lajares, 
                con dirección en Lajares, Fuerteventura y correo electrónico de contacto{" "}
                <a 
                  href="mailto:hello@uniquehomeslajares.com" 
                  className="text-foreground underline hover:no-underline"
                >
                  hello@uniquehomeslajares.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                Base legal y fines del tratamiento
              </h2>
              <ul className="space-y-3 list-disc pl-5">
                <li>
                  <strong>Gestión de reservas:</strong> tratar sus datos es necesario para cumplir el 
                  contrato de reserva y la prestación de nuestros servicios.
                </li>
                <li>
                  <strong>Atención al cliente:</strong> responder a sus consultas y proporcionar soporte 
                  personalizado.
                </li>
                <li>
                  <strong>Marketing y comunicaciones:</strong> si marca la casilla de consentimiento, 
                  podremos enviarle noticias y promociones relacionadas con nuestras villas.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                Derechos de los usuarios
              </h2>
              <p className="leading-relaxed">
                Puede acceder, rectificar y suprimir sus datos, así como ejercitar otros derechos 
                (limitación, oposición, portabilidad) enviando un correo electrónico a{" "}
                <a 
                  href="mailto:hello@uniquehomeslajares.com" 
                  className="text-foreground underline hover:no-underline"
                >
                  hello@uniquehomeslajares.com
                </a>{" "}
                o por correo postal a la dirección arriba indicada.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                Conservación de datos
              </h2>
              <p className="leading-relaxed">
                Sus datos se conservarán durante el tiempo necesario para gestionar su reserva y cumplir 
                las obligaciones legales. Los datos utilizados con fines de marketing se conservarán hasta 
                que solicite su supresión.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                Uso de cookies
              </h2>
              <p className="leading-relaxed">
                Utilizamos cookies propias y de terceros para personalizar la experiencia, analizar el 
                tráfico y mostrar publicidad relacionada con sus preferencias. Puede aceptar todas las 
                cookies, configurarlas o rechazarlas a través del aviso emergente que aparece al entrar 
                en la web.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
