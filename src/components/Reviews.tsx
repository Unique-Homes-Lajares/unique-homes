import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";
const reviews = [
  {
    quote: "Amazing stay! Everything is so well arranged! You have everything you need on arrival, quality soaps, heating and airconditioning everywhere. Just perfect to arrive and unwind. Victoria really helps making your stay as comfortable as possible. We're coming back!",
    author: "Maxime",
    location: "Bélgica"
  },
  {
    quote: "We highly recommend this accommodation. The house is tastefully designed and exceptionally well maintained. Privacy is well respected, creating a peaceful atmosphere ideal for relaxation. Will definitely return, sooner rather than later.",
    author: "Adela",
    location: "República Checa"
  },
  {
    quote: "Wonderfully appointed with lovely furnishings and decor and a beautiful private back yard with pretty cactus and plants. Very quiet and relaxing. Would highly recommend and will be back next time we visit Fuerteventura.",
    author: "Sean",
    location: "Irlanda"
  },
  {
    quote: "Nos hemos alojado en la villa Mykonos para celebrar nuestro 25 aniversario de bodas y no podíamos haber elegido mejor opción. Villa muy bien cuidada, con decoración exquisita. La atención y el mimo por los detalles marcan la diferencia.",
    author: "Óscar",
    location: "España"
  },
  {
    quote: "Excelente estancia en la villa Mikonos, mucho mejor de lo que muestran las fotografías de la web, acogedora, silenciosa, con música ambiente que te transporta. Todo un lujo y Veronica siempre atenta. Una experiencia de 10.",
    author: "Fitonia",
    location: "España"
  },
  {
    quote: "Was staying at retreat villa. Everything was perfect, best vacation ever. Beautiful views, really comfortable, the owners were super friendly. Will definitely come back.",
    author: "Liliya",
    location: "Rusia"
  },
  {
    quote: "Disfrutamos mucho de nuestra estancia en la villa: es preciosa, tranquila y está perfectamente situada para explorar Lajares y los alrededores. La casa está bien equipada y tiene un ambiente encantador.",
    author: "Alberto",
    location: "España"
  },
  {
    quote: "Our villa (Mykonos) was spacious and beautifully done out with a very comfortable bed! Easy communication and approachable hosts. We also appreciated the late check out on our final day.",
    author: "Annabel",
    location: "Reino Unido"
  },
  {
    quote: "En la villa Retreat nos encantó todo. Es genial para estar con tu pareja y tener momentos de descanso y relajación. Aparte de su gran servicio y atención excepcional, sus villas son muy bonitas. Volveremos sin dudarlo.",
    author: "David",
    location: "España"
  },
  {
    quote: "UNIQUE Homes Lajares is a perfect place to stay. It's cozy, spotless, and in perfect condition. The terrace is wonderfully sheltered from the wind. We honestly can't recommend it enough!",
    author: "Stefan",
    location: "Alemania"
  },
  {
    quote: "Nos alojamos en Villa Retreat y fue una escapada perfecta. La decoración está cuidada al detalle, con un gusto impecable que combina comodidad y estilo. Sin duda, un lugar al que queremos regresar.",
    author: "Edgar",
    location: "España"
  },
  {
    quote: "We had such an amazing stay! The house was even more beautiful in person. Veronica was such a lovely host. We truly felt looked after. Thank you for your warmth and hospitality.",
    author: "Sofia",
    location: "Suecia"
  },
  {
    quote: "Expectacular experiencia en las villas UNIQUE. La villa es preciosa, muy bien decorada, con música ambiental. La piscina y el jacuzzi invitan a desconectar. La atención fue excelente. Sin duda, repetiremos!",
    author: "Patri",
    location: "España"
  },
  {
    quote: "Hemos tenido la suerte de alojarnos por segunda vez. La comunicación con el equipo es excelente, siempre atentos y cercanos. Nos sorprendieron con un bonito detalle por nuestra boda. Seguiremos eligiendo Villas Unique.",
    author: "Juanmi",
    location: "España"
  },
];

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Unique+Homes+Lajares+-+adults+only/@28.681976,-13.941788,17z/data=!4m11!3m10!1s0xc47b5892cea4667:0x79d5ee6c38aadc9e!5m2!4m1!1i2!8m2!3d28.6819713!4d-13.9392131!9m1!1b1!16s%2Fg%2F11tnhg1jp5";

const Reviews = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false,
    align: 'start',
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="container-custom my-8 md:my-12" id="reviews">
      <div className="bg-secondary/60 rounded-2xl md:rounded-3xl px-5 py-8 md:px-10 md:py-12 lg:px-14 lg:py-14">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
            {t.reviews.kicker}
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground">
            {t.reviews.title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-5 md:-mx-10 lg:-mx-14 px-5 md:px-10 lg:px-14" ref={emblaRef}>
          <div className="flex gap-3 md:gap-4">
            {reviews.map((review, index) => (
              <div 
                key={index}
                className="flex-[0_0_88%] md:flex-[0_0_48%] lg:flex-[0_0_38%] min-w-0"
              >
                <div className="bg-card rounded-xl md:rounded-2xl p-6 md:p-8 h-full border border-border/20 shadow-sm">
                  <p className="font-display text-base md:text-lg leading-relaxed text-foreground mb-4 md:mb-5 italic">
                    "{review.quote}"
                  </p>
                  <div className="text-xs md:text-sm text-muted-foreground tracking-wide">
                    — {review.author}, {review.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6 md:mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'bg-foreground w-4' 
                  : 'bg-foreground/20 hover:bg-foreground/40'
              }`}
              aria-label={`${t.reviews.goToReview} ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-6 md:mt-8">
          <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs md:text-sm tracking-wide text-foreground bg-card hover:bg-card/80 border border-border/30 rounded-full transition-all duration-300"
          >
            {t.reviews.viewAll}
            <span className="text-[10px]">→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Reviews;
