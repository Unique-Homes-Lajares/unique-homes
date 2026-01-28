import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import BetterThanHotel from "@/components/BetterThanHotel";
import Declaration from "@/components/Declaration";
import ScrollReveal from "@/components/ScrollReveal";

import Casas from "@/components/Casas";
import Homefulness from "@/components/Homefulness";

import Reviews from "@/components/Reviews";
import Wellness from "@/components/Wellness";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Unique Homes Lajares | Luxury Homes in Fuerteventura</title>
        <meta
          name="description"
          content="Homes designed to stay. Unique and exclusive home rentals in Lajares, Fuerteventura. Live slowly."
        />
        <meta
          name="keywords"
          content="Lajares, Fuerteventura, luxury homes, holiday rentals, Canary Islands"
        />
        <link rel="canonical" href="https://uniquehomeslajares.com" />
      </Helmet>

      <AnnouncementBar />

      <main>
        <Hero />
        <BetterThanHotel />
        <ScrollReveal>
          <Declaration />
        </ScrollReveal>
        <ScrollReveal>
          <Casas />
        </ScrollReveal>
        <ScrollReveal>
          <Homefulness />
        </ScrollReveal>
        <ScrollReveal>
          <Reviews />
        </ScrollReveal>
        <ScrollReveal>
          <Wellness />
        </ScrollReveal>
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>

      <Footer />
    </>
  );
};

export default Index;
