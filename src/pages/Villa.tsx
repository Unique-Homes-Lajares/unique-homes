import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import VillaPhotoTour from "@/components/VillaPhotoTour";
import { useAvailabilityModal } from "@/contexts/AvailabilityModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import BaliRequestModal from "@/components/BaliRequestModal";
import Player from "@vimeo/player";
import casaCalifornia from "@/assets/casa-california.jpg";
import casaMykonos from "@/assets/casa-mykonos.jpg";
import casaSantorini from "@/assets/casa-santorini.jpg";
import casaRetreat from "@/assets/casa-retreat.jpg";
import casaBali from "@/assets/casa-bali.jpg";
import lajaresMap from "@/assets/lajares-map.jpg";
// California - Salón
import calSalon01 from "@/assets/california/salon-01.jpg";
import calSalon02 from "@/assets/california/salon-02.jpg";
import calSalon03 from "@/assets/california/salon-03.jpg";
import calSalon04 from "@/assets/california/salon-04.jpg";
import calSalon05 from "@/assets/california/salon-05.jpg";
import calSalon06 from "@/assets/california/salon-06.jpg";
import calSalon07 from "@/assets/california/salon-07.jpg";
import calSalon08 from "@/assets/california/salon-08.jpg";
import calSalon09 from "@/assets/california/salon-09.jpg";
import calSalon10 from "@/assets/california/salon-10.jpg";
import calSalon11 from "@/assets/california/salon-11.jpg";
import calSalon12 from "@/assets/california/salon-12.jpg";
import calSalon13 from "@/assets/california/salon-13.jpg";
import calSalon14 from "@/assets/california/salon-14.jpg";
// California - Cocina
import calCocina01 from "@/assets/california/cocina-01.jpg";
import calCocina02 from "@/assets/california/cocina-02.jpg";
import calCocina03 from "@/assets/california/cocina-03.jpg";
import calCocina04 from "@/assets/california/cocina-04.jpg";
import calCocina05 from "@/assets/california/cocina-05.jpg";
import calCocina06 from "@/assets/california/cocina-06.jpg";
import calCocina07 from "@/assets/california/cocina-07.jpg";
import calCocina08 from "@/assets/california/cocina-08.jpg";
import calCocina09 from "@/assets/california/cocina-09.jpg";
import calCocina10 from "@/assets/california/cocina-10.jpg";
import calCocina11 from "@/assets/california/cocina-11.jpg";
// California - Dormitorio 1
import calDormitorio1_01 from "@/assets/california/dormitorio1-01.jpg";
import calDormitorio1_02 from "@/assets/california/dormitorio1-02.jpg";
import calDormitorio1_03 from "@/assets/california/dormitorio1-03.jpg";
import calDormitorio1_04 from "@/assets/california/dormitorio1-04.jpg";
import calDormitorio1_05 from "@/assets/california/dormitorio1-05.jpg";
import calDormitorio1_06 from "@/assets/california/dormitorio1-06.jpg";
import calDormitorio1_07 from "@/assets/california/dormitorio1-07.jpg";
import calDormitorio1_08 from "@/assets/california/dormitorio1-08.jpg";
import calDormitorio1_09 from "@/assets/california/dormitorio1-09.jpg";
// California - Dormitorio 2
import calDormitorio2_01 from "@/assets/california/dormitorio2-01.jpg";
import calDormitorio2_02 from "@/assets/california/dormitorio2-02.jpg";
// California - Baño
import calBano01 from "@/assets/california/bano-01.jpg";
import calBano02 from "@/assets/california/bano-02.jpg";
import calBano03 from "@/assets/california/bano-03.jpg";
// California - Zona trabajo
import calTrabajo01 from "@/assets/california/trabajo-01.jpg";
import calTrabajo02 from "@/assets/california/trabajo-02.jpg";
import calTrabajo03 from "@/assets/california/trabajo-03.jpg";
import calTrabajo04 from "@/assets/california/trabajo-04.jpg";
// California - Terraza
import calTerraza01 from "@/assets/california/terraza-01.jpg";
import calTerraza02 from "@/assets/california/terraza-02.jpg";
import calTerraza03 from "@/assets/california/terraza-03.jpg";
import calTerraza04 from "@/assets/california/terraza-04.jpg";
import calTerraza05 from "@/assets/california/terraza-05.jpg";
import calTerraza06 from "@/assets/california/terraza-06.jpg";
import calTerraza07 from "@/assets/california/terraza-07.jpg";
import calTerraza08 from "@/assets/california/terraza-08.jpg";
import calTerraza09 from "@/assets/california/terraza-09.jpg";
import calTerraza10 from "@/assets/california/terraza-10.jpg";
import calTerraza11 from "@/assets/california/terraza-11.jpg";
import calTerraza12 from "@/assets/california/terraza-12.jpg";
import calTerraza13 from "@/assets/california/terraza-13.jpg";
// California - Patio trasero
import calPatio01 from "@/assets/california/patio-01.jpg";
import calPatio02 from "@/assets/california/patio-02.jpg";
import calPatio03 from "@/assets/california/patio-03.jpg";
import calPatio04 from "@/assets/california/patio-04.jpg";
// California - Garaje
import calGaraje01 from "@/assets/california/garaje-01.jpg";
import calGaraje02 from "@/assets/california/garaje-02.jpg";
// California - Piscina
import calPiscina01 from "@/assets/california/piscina-01.jpg";
import calPiscina02 from "@/assets/california/piscina-02.jpg";
import calPiscina03 from "@/assets/california/piscina-03.jpg";
import calPiscina04 from "@/assets/california/piscina-04.jpg";
import calPiscina05 from "@/assets/california/piscina-05.jpg";
import calPiscina06 from "@/assets/california/piscina-06.jpg";

// Mykonos - Salón
import salonImg1 from "@/assets/mykonos/salon-01.jpg";
import salonImg2 from "@/assets/mykonos/salon-02.jpg";
import salonImg3 from "@/assets/mykonos/salon-03.jpg";
import salonImg4 from "@/assets/mykonos/salon-04.jpg";
import salonImg5 from "@/assets/mykonos/salon-05.jpg";
import salonImg6 from "@/assets/mykonos/salon-06.jpg";
import salonImg7 from "@/assets/mykonos/salon-07.jpg";
// Mykonos - Cocina
import cocinaImg1 from "@/assets/mykonos/cocina-01.avif";
import cocinaImg2 from "@/assets/mykonos/cocina-02.avif";
import cocinaImg3 from "@/assets/mykonos/cocina-03.avif";
// Mykonos - Dormitorio
import dormitorioImg1 from "@/assets/mykonos/dormitorio-01.jpg";
import dormitorioImg2 from "@/assets/mykonos/dormitorio-02.jpg";
import dormitorioImg3 from "@/assets/mykonos/dormitorio-03.jpg";
import dormitorioImg4 from "@/assets/mykonos/dormitorio-04.jpg";
import dormitorioImg5 from "@/assets/mykonos/dormitorio-05.jpg";
import dormitorioImg6 from "@/assets/mykonos/dormitorio-06.jpg";
import dormitorioImg7 from "@/assets/mykonos/dormitorio-07.jpg";
// Mykonos - Baño
import banoImg1 from "@/assets/mykonos/bano-01.avif";
import banoImg2 from "@/assets/mykonos/bano-02.jpg";
import banoImg3 from "@/assets/mykonos/bano-03.jpg";
// Mykonos - Patio trasero
import patioImg1 from "@/assets/mykonos/patio-01.jpg";
import patioImg2 from "@/assets/mykonos/patio-02.jpg";
import patioImg3 from "@/assets/mykonos/patio-03.avif";
import patioImg4 from "@/assets/mykonos/patio-04.jpg";
// Mykonos - Terraza
import terrazaImg1 from "@/assets/mykonos/terraza-01.jpg";
import terrazaImg2 from "@/assets/mykonos/terraza-02.jpg";
import terrazaImg3 from "@/assets/mykonos/terraza-03.jpg";
// Mykonos - Comedor
import comedorImg1 from "@/assets/mykonos/comedor-01.avif";
// Mykonos - Exterior
import exteriorImg1 from "@/assets/mykonos/exterior-01.jpg";
// Mykonos - Piscina
import piscinaImg1 from "@/assets/mykonos/piscina-01.jpg";
import piscinaImg2 from "@/assets/mykonos/piscina-02.avif";
import piscinaImg3 from "@/assets/mykonos/piscina-03.jpg";
import piscinaImg4 from "@/assets/mykonos/piscina-04.jpg";
import piscinaImg5 from "@/assets/mykonos/piscina-05.jpg";
import piscinaImg6 from "@/assets/mykonos/piscina-06.avif";
import piscinaImg7 from "@/assets/mykonos/piscina-07.jpg";

// Santorini - Salón
import santSalon01 from "@/assets/santorini/salon-01.avif";
import santSalon02 from "@/assets/santorini/salon-02.avif";
import santSalon03 from "@/assets/santorini/salon-03.avif";
import santSalon04 from "@/assets/santorini/salon-04.avif";
import santSalon05 from "@/assets/santorini/salon-05.avif";
import santSalon06 from "@/assets/santorini/salon-06.avif";
// Santorini - Cocina
import santCocina01 from "@/assets/santorini/cocina-01.avif";
import santCocina02 from "@/assets/santorini/cocina-02.avif";
import santCocina03 from "@/assets/santorini/cocina-03.avif";
import santCocina04 from "@/assets/santorini/cocina-04.avif";
import santCocina05 from "@/assets/santorini/cocina-05.avif";
// Santorini - Comedor
import santComedor01 from "@/assets/santorini/comedor-01.avif";
import santComedor02 from "@/assets/santorini/comedor-02.avif";
import santComedor03 from "@/assets/santorini/comedor-03.avif";
// Santorini - Dormitorio
import santDormitorio01 from "@/assets/santorini/dormitorio-01.avif";
import santDormitorio02 from "@/assets/santorini/dormitorio-02.avif";
import santDormitorio03 from "@/assets/santorini/dormitorio-03.avif";
import santDormitorio04 from "@/assets/santorini/dormitorio-04.avif";
// Santorini - Baño
import santBano01 from "@/assets/santorini/bano-01.avif";
import santBano02 from "@/assets/santorini/bano-02.avif";
// Santorini - Patio
import santPatio01 from "@/assets/santorini/patio-01.avif";
import santPatio02 from "@/assets/santorini/patio-02.avif";
import santPatio03 from "@/assets/santorini/patio-03.avif";
// Santorini - Terraza
import santTerraza01 from "@/assets/santorini/terraza-01.avif";
import santTerraza02 from "@/assets/santorini/terraza-02.avif";
import santTerraza03 from "@/assets/santorini/terraza-03.avif";
import santTerraza04 from "@/assets/santorini/terraza-04.avif";
// Santorini - Exterior
import santExterior01 from "@/assets/santorini/exterior-01.avif";
// Santorini - Piscina
import santPiscina01 from "@/assets/santorini/piscina-01.avif";
import santPiscina02 from "@/assets/santorini/piscina-02.avif";
import santPiscina03 from "@/assets/santorini/piscina-03.avif";
import santPiscina04 from "@/assets/santorini/piscina-04.avif";
import santPiscina05 from "@/assets/santorini/piscina-05.avif";
import santPiscina06 from "@/assets/santorini/piscina-06.avif";
import santPiscina07 from "@/assets/santorini/piscina-07.avif";
import santPiscina08 from "@/assets/santorini/piscina-08.avif";
import santPiscina09 from "@/assets/santorini/piscina-09.avif";
// Santorini - Jacuzzi
import santJacuzzi01 from "@/assets/santorini/jacuzzi-01.avif";
import santJacuzzi02 from "@/assets/santorini/jacuzzi-02.avif";
// Santorini - Biblioteca
import santBiblioteca01 from "@/assets/santorini/biblioteca-01.avif";

// The Retreat - Salón
import retreatSalon01 from "@/assets/retreat/salon-01.jpg";
import retreatSalon02 from "@/assets/retreat/salon-02.jpg";
import retreatSalon03 from "@/assets/retreat/salon-03.jpg";
import retreatSalon04 from "@/assets/retreat/salon-04.jpg";
import retreatSalon05 from "@/assets/retreat/salon-05.jpg";
// The Retreat - Cocina
import retreatCocina01 from "@/assets/retreat/cocina-01.jpg";
import retreatCocina02 from "@/assets/retreat/cocina-02.jpg";
// The Retreat - Comedor
import retreatComedor01 from "@/assets/retreat/comedor-01.jpg";
// The Retreat - Dormitorio 1
import retreatDormitorio1_01 from "@/assets/retreat/dormitorio1-01.jpg";
import retreatDormitorio1_02 from "@/assets/retreat/dormitorio1-02.jpg";
import retreatDormitorio1_03 from "@/assets/retreat/dormitorio1-03.jpg";
import retreatDormitorio1_04 from "@/assets/retreat/dormitorio1-04.jpg";
import retreatDormitorio1_05 from "@/assets/retreat/dormitorio1-05.jpg";
import retreatDormitorio1_06 from "@/assets/retreat/dormitorio1-06.jpg";
// The Retreat - Dormitorio 2
import retreatDormitorio2_01 from "@/assets/retreat/dormitorio2-01.avif";
import retreatDormitorio2_02 from "@/assets/retreat/dormitorio2-02.jpg";
import retreatDormitorio2_03 from "@/assets/retreat/dormitorio2-03.jpg";
// The Retreat - Baño 1
import retreatBano1_01 from "@/assets/retreat/bano1-01.avif";
import retreatBano1_02 from "@/assets/retreat/bano1-02.jpg";
// The Retreat - Baño 2
import retreatBano2_01 from "@/assets/retreat/bano2-01.avif";
import retreatBano2_02 from "@/assets/retreat/bano2-02.jpg";
// The Retreat - Jardín de entrada
import retreatJardinEntrada01 from "@/assets/retreat/jardin-entrada-01.avif";
import retreatJardinEntrada02 from "@/assets/retreat/jardin-entrada-02.jpg";
// The Retreat - Jardín
import retreatJardin01 from "@/assets/retreat/jardin-01.avif";
import retreatJardin02 from "@/assets/retreat/jardin-02.jpg";
import retreatJardin03 from "@/assets/retreat/jardin-03.jpg";
import retreatJardin04 from "@/assets/retreat/jardin-04.jpg";
import retreatJardin05 from "@/assets/retreat/jardin-05.jpg";
import retreatJardin06 from "@/assets/retreat/jardin-06.jpg";
// The Retreat - Terraza
import retreatTerraza01 from "@/assets/retreat/terraza-01.avif";
import retreatTerraza02 from "@/assets/retreat/terraza-02.jpg";
import retreatTerraza03 from "@/assets/retreat/terraza-03.jpg";
import retreatTerraza04 from "@/assets/retreat/terraza-04.jpg";
// The Retreat - Exterior
import retreatExterior01 from "@/assets/retreat/exterior-01.jpg";
// The Retreat - Piscina
import retreatPiscina01 from "@/assets/retreat/piscina-01.avif";
import retreatPiscina02 from "@/assets/retreat/piscina-02.avif";
import retreatPiscina03 from "@/assets/retreat/piscina-03.jpg";
import retreatPiscina04 from "@/assets/retreat/piscina-04.jpg";
import retreatPiscina05 from "@/assets/retreat/piscina-05.jpg";
import retreatPiscina06 from "@/assets/retreat/piscina-06.jpg";
import retreatPiscina07 from "@/assets/retreat/piscina-07.jpg";

// Bali - Salón
import baliSalon01 from "@/assets/bali/salon-01.avif";
import baliSalon02 from "@/assets/bali/salon-02.webp";
import baliSalon03 from "@/assets/bali/salon-03.avif";
import baliSalon04 from "@/assets/bali/salon-04.avif";
import baliSalon05 from "@/assets/bali/salon-05.avif";
import baliSalon06 from "@/assets/bali/salon-06.avif";
import baliSalon07 from "@/assets/bali/salon-07.avif";
import baliSalon08 from "@/assets/bali/salon-08.avif";

// Bali - Cocina
import baliCocina01 from "@/assets/bali/cocina-01.avif";
import baliCocina02 from "@/assets/bali/cocina-02.avif";
import baliCocina03 from "@/assets/bali/cocina-03.avif";
import baliCocina04 from "@/assets/bali/cocina-04.avif";
import baliCocina05 from "@/assets/bali/cocina-05.avif";
import baliCocina06 from "@/assets/bali/cocina-06.avif";
import baliCocina07 from "@/assets/bali/cocina-07.avif";
import baliCocina08 from "@/assets/bali/cocina-08.avif";
import baliCocina09 from "@/assets/bali/cocina-09.avif";
import baliCocina10 from "@/assets/bali/cocina-10.avif";
import baliCocina11 from "@/assets/bali/cocina-11.avif";
import baliCocina12 from "@/assets/bali/cocina-12.avif";
import baliCocina13 from "@/assets/bali/cocina-13.avif";
import baliCocina14 from "@/assets/bali/cocina-14.avif";
import baliCocina15 from "@/assets/bali/cocina-15.avif";
import baliCocina16 from "@/assets/bali/cocina-16.avif";
import baliCocina17 from "@/assets/bali/cocina-17.avif";
import baliCocina18 from "@/assets/bali/cocina-18.avif";
// Bali - Comedor
import baliComedor01 from "@/assets/bali/comedor-01.avif";
import baliComedor02 from "@/assets/bali/comedor-02.avif";
import baliComedor03 from "@/assets/bali/comedor-03.avif";
import baliComedor04 from "@/assets/bali/comedor-04.avif";
import baliComedor05 from "@/assets/bali/comedor-05.avif";
// Bali - Dormitorio 1
import baliDormitorio1_01 from "@/assets/bali/dormitorio1-01.avif";
import baliDormitorio1_02 from "@/assets/bali/dormitorio1-02.avif";
import baliDormitorio1_03 from "@/assets/bali/dormitorio1-03.avif";
import baliDormitorio1_04 from "@/assets/bali/dormitorio1-04.avif";
import baliDormitorio1_05 from "@/assets/bali/dormitorio1-05.avif";
// Bali - Dormitorio 2
import baliDormitorio2_01 from "@/assets/bali/dormitorio2-01.avif";
import baliDormitorio2_02 from "@/assets/bali/dormitorio2-02.avif";
// Bali - Dormitorio 3
import baliDormitorio3_01 from "@/assets/bali/dormitorio3-01.avif";
// Bali - Dormitorio 4
import baliDormitorio4_01 from "@/assets/bali/dormitorio4-01.avif";
import baliDormitorio4_02 from "@/assets/bali/dormitorio4-02.avif";
// Bali - Baño 1
import baliBano1_01 from "@/assets/bali/bano1-01.avif";
import baliBano1_02 from "@/assets/bali/bano1-02.avif";
import baliBano1_03 from "@/assets/bali/bano1-03.avif";
import baliBano1_04 from "@/assets/bali/bano1-04.avif";
import baliBano1_05 from "@/assets/bali/bano1-05.avif";
import baliBano1_06 from "@/assets/bali/bano1-06.avif";
import baliBano1_07 from "@/assets/bali/bano1-07.avif";
import baliBano1_08 from "@/assets/bali/bano1-08.avif";
// Bali - Baño 2
import baliBano2_01 from "@/assets/bali/bano2-01.avif";
// Bali - Baño 3
import baliBano3_01 from "@/assets/bali/bano3-01.avif";
import baliBano3_02 from "@/assets/bali/bano3-02.avif";
// Bali - Baño 4
import baliBano4_01 from "@/assets/bali/bano4-01.avif";
import baliBano4_02 from "@/assets/bali/bano4-02.avif";
// Bali - Aseo
import baliAseo01 from "@/assets/bali/aseo-01.avif";
// Bali - Patio
import baliPatio01 from "@/assets/bali/patio-01.avif";
// Bali - Jardín
import baliJardin01 from "@/assets/bali/jardin-01.avif";
import baliJardin02 from "@/assets/bali/jardin-02.avif";
import baliJardin03 from "@/assets/bali/jardin-03.avif";
import baliJardin04 from "@/assets/bali/jardin-04.avif";
import baliJardin05 from "@/assets/bali/jardin-05.avif";
// Bali - Lavandería
import baliLavanderia01 from "@/assets/bali/lavanderia-01.avif";
import baliLavanderia02 from "@/assets/bali/lavanderia-02.avif";
// Bali - Exterior
import baliExterior01 from "@/assets/bali/exterior-01.avif";
import baliExterior02 from "@/assets/bali/exterior-02.avif";
import baliExterior03 from "@/assets/bali/exterior-03.avif";
import baliExterior04 from "@/assets/bali/exterior-04.avif";
import baliExterior05 from "@/assets/bali/exterior-05.avif";
import baliExterior06 from "@/assets/bali/exterior-06.avif";
import baliExterior07 from "@/assets/bali/exterior-07.avif";
import baliExterior08 from "@/assets/bali/exterior-08.avif";
import baliExterior09 from "@/assets/bali/exterior-09.avif";
import baliExterior10 from "@/assets/bali/exterior-10.avif";
import baliExterior11 from "@/assets/bali/exterior-11.avif";
import baliExterior12 from "@/assets/bali/exterior-12.avif";
import baliExterior13 from "@/assets/bali/exterior-13.avif";
import baliExterior14 from "@/assets/bali/exterior-14.avif";
import baliExterior15 from "@/assets/bali/exterior-15.avif";
import baliExterior16 from "@/assets/bali/exterior-16.avif";
import baliExterior17 from "@/assets/bali/exterior-17.avif";
import baliExterior18 from "@/assets/bali/exterior-18.avif";
// Bali - Piscina
import baliPiscina01 from "@/assets/bali/piscina-01.avif";
import baliPiscina02 from "@/assets/bali/piscina-02.avif";
import baliPiscina03 from "@/assets/bali/piscina-03.avif";
import baliPiscina04 from "@/assets/bali/piscina-04.avif";
import baliPiscina05 from "@/assets/bali/piscina-05.avif";
import baliPiscina06 from "@/assets/bali/piscina-06.avif";
import baliPiscina07 from "@/assets/bali/piscina-07.avif";

interface PhotoImage {
  src: string;
  caption?: string;
}

interface PhotoSection {
  id: string;
  title: string;
  subtitle?: string;
  amenities: string[];
  images: (string | PhotoImage)[];
}

interface VillaData {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  features: string[];
  capacity: string;
  bedrooms: string;
  bathrooms: string;
  comingSoon?: boolean;
  photoTour?: PhotoSection[];
}

const villasData: Record<string, VillaData> = {
  california: {
    title: "Villa California",
    subtitle: "Luz abierta. Mañanas largas.",
    image: casaCalifornia,
    description: "Una casa pensada para despertar despacio. Grandes ventanales que invitan a la luz del amanecer, espacios abiertos que fluyen naturalmente y una terraza donde el tiempo parece detenerse. California es para quienes buscan claridad, amplitud y esa sensación de libertad que solo da el horizonte abierto.",
    features: ["Piscina privada", "Cocina profesional", "Terraza panorámica", "Sistema de sonido", "WiFi de alta velocidad", "Aire acondicionado"],
    capacity: "4-6 personas",
    bedrooms: "3 habitaciones",
    bathrooms: "2 baños",
    photoTour: [
      {
        id: "salon",
        title: "Salón",
        subtitle: "Luz natural, espacio abierto, donde todo fluye.",
        amenities: ["Aire acondicionado", "Calefacción", "Sistema de sonido", "TV", "Libros y material de lectura"],
        images: [calSalon01, calSalon02, calSalon03, calSalon04, calSalon05, calSalon06, calSalon07, calSalon08, calSalon09, calSalon10, calSalon11, calSalon12, calSalon13, calSalon14],
      },
      {
        id: "cocina",
        title: "Cocina completa",
        amenities: ["Cafetera", "Fogón", "Utensilios básicos de cocina", "Platos y cubiertos", "Lavavajillas", "Congelador", "Frigorífico"],
        images: [calCocina01, calCocina02, calCocina03, calCocina04, calCocina05, calCocina06, calCocina07, calCocina08, calCocina09, calCocina10, calCocina11],
      },
      {
        id: "dormitorio1",
        title: "Dormitorio 1",
        subtitle: "El dormitorio principal, con vistas al jardín.",
        amenities: ["Cama king", "Aire acondicionado", "Ropa de cama", "Espacio para guardar la ropa", "Perchas", "Calefacción"],
        images: [calDormitorio1_01, calDormitorio1_02, calDormitorio1_03, calDormitorio1_04, calDormitorio1_05, calDormitorio1_06, calDormitorio1_07, calDormitorio1_08, calDormitorio1_09],
      },
      {
        id: "dormitorio2",
        title: "Dormitorio 2",
        amenities: ["Cama de matrimonio", "Ropa de cama", "Espacio para guardar la ropa", "Perchas"],
        images: [calDormitorio2_01, calDormitorio2_02],
      },
      {
        id: "bano",
        title: "Baño completo",
        amenities: ["Gel de ducha", "Secador de pelo", "Agua caliente", "Champú"],
        images: [calBano01, calBano02, calBano03],
      },
      {
        id: "trabajo",
        title: "Zona de trabajo",
        amenities: ["Escritorio", "WiFi de alta velocidad", "Enchufes cerca del escritorio"],
        images: [calTrabajo01, calTrabajo02, calTrabajo03, calTrabajo04],
      },
      {
        id: "terraza",
        title: "Terraza",
        subtitle: "Donde el tiempo parece detenerse.",
        amenities: ["Comedor al aire libre", "Mobiliario exterior", "Sistema de sonido", "Vistas al jardín"],
        images: [calTerraza01, calTerraza02, calTerraza03, calTerraza04, calTerraza05, calTerraza06, calTerraza07, calTerraza08, calTerraza09, calTerraza10, calTerraza11, calTerraza12, calTerraza13],
      },
      {
        id: "patio",
        title: "Patio trasero",
        amenities: ["Barbacoa", "Mobiliario exterior", "Jardín"],
        images: [calPatio01, calPatio02, calPatio03, calPatio04],
      },
      {
        id: "garaje",
        title: "Garaje",
        amenities: ["Aparcamiento privado", "Bicicletas disponibles"],
        images: [calGaraje01, calGaraje02],
      },
      {
        id: "piscina",
        title: "Piscina",
        subtitle: "Tu oasis privado.",
        amenities: ["Tumbonas", "Ducha exterior", "Sombrillas"],
        images: [calPiscina01, calPiscina02, calPiscina03, calPiscina04, calPiscina05, calPiscina06],
      },
    ],
  },
  mykonos: {
    title: "Villa Mykonos",
    subtitle: "Blanco. Aire. Claridad.",
    image: casaMykonos,
    description: "Mykonos es una casa ideal para parejas que buscan una villa íntima y luminosa, donde la calidez, el cuidado y la serenidad se sienten desde el primer momento.\n\nLa piscina, de formas orgánicas y naturales, invita a bajar el ritmo.\n\nLa chimenea acompaña las tardes más tranquilas.",
    features: ["Piscina orgánica · Climatizable", "Terraza con vistas", "Cocina completa", "Sonido envolvente · Sonos", "WiFi estable y rápido", "Aire acondicionado", "Chimenea"],
    capacity: "2 personas",
    bedrooms: "1 habitación",
    bathrooms: "1 baño",
    photoTour: [
      {
        id: "salon",
        title: "Salón",
        subtitle: "Para leer, conversar o simplemente no hacer nada.",
        amenities: ["Aire acondicionado", "Calefacción", "Chimenea interior", "Sistema de sonido", "TV", "Libros y material de lectura"],
        images: [
          { src: salonImg1, caption: "El salón es muy cómodo." },
          { src: salonImg2, caption: "En este caso hemos vestido el salón con Acqua di Parma, La Casa Sul lago." },
          salonImg3,
          salonImg4,
          salonImg5,
          salonImg6,
          salonImg7,
        ],
      },
      {
        id: "comedor",
        title: "Comedor",
        amenities: ["Mesa de comedor"],
        images: [comedorImg1],
      },
      {
        id: "cocina",
        title: "Cocina completa",
        amenities: ["Cafetera", "Fogón", "Utensilios básicos de cocina", "Platos y cubiertos", "Lavavajillas", "Congelador"],
        images: [cocinaImg1, cocinaImg2, cocinaImg3],
      },
      {
        id: "dormitorio",
        title: "Dormitorio",
        subtitle: "Un dormitorio hecho para dormir profundamente.",
        amenities: ["Cama king", "Aire acondicionado", "Ropa de cama", "Espacio para guardar la ropa", "Perchas", "Calefacción"],
        images: [dormitorioImg1, dormitorioImg3, dormitorioImg4, dormitorioImg2, dormitorioImg7, dormitorioImg6, dormitorioImg5],
      },
      {
        id: "bano",
        title: "Baño completo",
        amenities: ["Gel de ducha", "Secador de pelo", "Agua caliente", "Champú"],
        images: [banoImg2, banoImg3, banoImg1],
      },
      {
        id: "patio",
        title: "Patio trasero",
        amenities: ["Barbacoa", "Mobiliario exterior", "Patio trasero"],
        images: [patioImg2, patioImg1, patioImg3, patioImg4],
      },
      {
        id: "terraza",
        title: "Terraza",
        amenities: ["Comedor al aire libre", "Mobiliario exterior", "Sistema de sonido"],
        images: [terrazaImg1, terrazaImg2, terrazaImg3],
      },
      {
        id: "exterior",
        title: "Exterior",
        amenities: ["Entrada privada", "Arquitectura tradicional"],
        images: [exteriorImg1],
      },
      {
        id: "piscina",
        title: "Piscina",
        amenities: ["Tumbonas", "Ducha exterior"],
        images: [piscinaImg2, piscinaImg4, piscinaImg1, piscinaImg5, piscinaImg7, piscinaImg3],
      },
    ],
  },
  santorini: {
    title: "Villa Santorini",
    subtitle: "Horizonte. Refugio. Calma.",
    image: casaSantorini,
    description: "Un refugio con vistas al infinito. Santorini combina la intimidad de un espacio recogido con la apertura del horizonte. Aquí los atardeceres son un ritual, y las noches tienen esa calma profunda que solo encuentras cuando estás exactamente donde quieres estar.",
    features: ["Terraza con vistas al mar", "Jacuzzi privado", "Cocina gourmet", "Bodega climatizada", "WiFi de alta velocidad", "Aire acondicionado"],
    capacity: "2-4 personas",
    bedrooms: "2 habitaciones",
    bathrooms: "2 baños",
    photoTour: [
      {
        id: "salon",
        title: "Salón",
        amenities: ["Aire acondicionado", "Ventilador de techo", "Libros y material de lectura", "Chimenea interior", "Sistema de sonido", "TV", "Calefacción"],
        images: [santSalon01, santSalon02, santSalon03, santSalon04, santSalon05, santSalon06],
      },
      {
        id: "cocina",
        title: "Cocina completa",
        amenities: ["Bandeja de repostería", "Café", "Cafetera", "Fogón", "Utensilios básicos de cocina", "Platos y cubiertos"],
        images: [santCocina01, santCocina02, santCocina03, santCocina04, santCocina05],
      },
      {
        id: "comedor",
        title: "Comedor",
        amenities: ["Mesa de comedor"],
        images: [santComedor01, santComedor02, santComedor03],
      },
      {
        id: "dormitorio",
        title: "Dormitorio",
        amenities: ["Aire acondicionado", "Ropa de cama", "Ventilador de techo", "Espacio para guardar la ropa", "Perchas", "Calefacción"],
        images: [santDormitorio01, santDormitorio02, santDormitorio03, santDormitorio04],
      },
      {
        id: "bano",
        title: "Baño completo",
        amenities: ["Gel de ducha", "Secador de pelo", "Agua caliente", "Champú"],
        images: [santBano01, santBano02],
      },
      {
        id: "patio",
        title: "Patio trasero",
        amenities: ["Barbacoa", "Jacuzzi", "Comedor al aire libre", "Mobiliario exterior", "Ducha exterior", "Tumbonas"],
        images: [santPatio01, santPatio02, santPatio03],
      },
      {
        id: "terraza",
        title: "Terraza",
        amenities: ["Comedor al aire libre", "Mobiliario exterior"],
        images: [santTerraza01, santTerraza02, santTerraza03, santTerraza04],
      },
      {
        id: "exterior",
        title: "Exterior",
        amenities: ["Entrada privada"],
        images: [santExterior01],
      },
      {
        id: "piscina",
        title: "Piscina",
        amenities: ["Tumbonas"],
        images: [santPiscina01, santPiscina02, santPiscina03, santPiscina04, santPiscina05, santPiscina06, santPiscina07, santPiscina08, santPiscina09],
      },
      {
        id: "jacuzzi",
        title: "Jacuzzi",
        amenities: ["Jacuzzi"],
        images: [santJacuzzi01, santJacuzzi02],
      },
      {
        id: "biblioteca",
        title: "Biblioteca",
        amenities: ["Libros y material de lectura"],
        images: [santBiblioteca01],
      },
    ],
  },
  "the-retreat": {
    title: "Villa The Retreat",
    subtitle: "Hacia adentro y hacia dentro.",
    image: casaRetreat,
    description: "Un espacio para volver a ti. The Retreat está diseñada para la introspección, con rincones de lectura, espacios de meditación y esa quietud que solo existe cuando todo está pensado para el silencio. Aquí el lujo es el tiempo contigo mismo.",
    features: ["Sala de yoga", "Jardín zen", "Biblioteca", "Piscina natural", "WiFi de alta velocidad", "Cocina orgánica"],
    capacity: "4 personas",
    bedrooms: "2 habitaciones",
    bathrooms: "2 baños",
    photoTour: [
      {
        id: "salon",
        title: "Salón",
        amenities: ["Aire acondicionado", "Libros y material de lectura", "Calefacción", "Chimenea interior", "Sistema de sonido", "TV"],
        images: [retreatSalon01, retreatSalon02, retreatSalon03, retreatSalon04, retreatSalon05],
      },
      {
        id: "cocina",
        title: "Cocina completa",
        amenities: ["Cafetera", "Congelador", "Copas de vino", "Fogón", "Frigorífico", "Hervidor de agua"],
        images: [retreatCocina01, retreatCocina02],
      },
      {
        id: "comedor",
        title: "Comedor",
        amenities: ["Calefacción", "Mesa de comedor", "Aire acondicionado", "Copas de vino"],
        images: [retreatComedor01],
      },
      {
        id: "dormitorio1",
        title: "Dormitorio 1",
        amenities: ["Cama king", "Calefacción", "Persianas o cortinas opacas", "TV", "Ropa de cama", "Perchas"],
        images: [retreatDormitorio1_01, retreatDormitorio1_02, retreatDormitorio1_03, retreatDormitorio1_04, retreatDormitorio1_05, retreatDormitorio1_06],
      },
      {
        id: "dormitorio2",
        title: "Dormitorio 2",
        amenities: ["Cama de matrimonio XL", "Ropa de cama", "Espacio para guardar la ropa", "Almohadas y mantas adicionales", "Plancha", "Persianas o cortinas opacas", "Wifi"],
        images: [retreatDormitorio2_01, retreatDormitorio2_02, retreatDormitorio2_03],
      },
      {
        id: "bano1",
        title: "Baño completo 1",
        amenities: ["Acondicionador", "Agua caliente", "Champú", "Gel de ducha", "Productos de limpieza", "Secador de pelo"],
        images: [retreatBano1_01, retreatBano1_02],
      },
      {
        id: "bano2",
        title: "Baño completo 2",
        amenities: ["Agua caliente", "Champú", "Gel de ducha", "Secador de pelo"],
        images: [retreatBano2_01, retreatBano2_02],
      },
      {
        id: "jardin-entrada",
        title: "Jardín de entrada",
        amenities: ["Aparcamiento gratuito en la calle"],
        images: [retreatJardinEntrada01, retreatJardinEntrada02],
      },
      {
        id: "jardin",
        title: "Jardín",
        amenities: ["Barbacoa", "Patio trasero", "Hamaca", "Comedor al aire libre", "Mobiliario exterior"],
        images: [retreatJardin01, retreatJardin02, retreatJardin03, retreatJardin04, retreatJardin05, retreatJardin06],
      },
      {
        id: "terraza",
        title: "Terraza",
        amenities: ["Mesa de comedor", "Comedor al aire libre", "Mobiliario exterior"],
        images: [retreatTerraza01, retreatTerraza02, retreatTerraza03, retreatTerraza04],
      },
      {
        id: "exterior",
        title: "Exterior",
        amenities: ["Entrada privada"],
        images: [retreatExterior01],
      },
      {
        id: "piscina",
        title: "Piscina",
        amenities: ["Tumbonas", "Wifi", "Ducha exterior"],
        images: [retreatPiscina01, retreatPiscina02, retreatPiscina03, retreatPiscina04, retreatPiscina05, retreatPiscina06, retreatPiscina07],
      },
    ],
  },
  bali: {
    title: "Villa Bali",
    subtitle: "Selva. Agua. Despertar.",
    image: casaBali,
    comingSoon: true,
    description: "La naturaleza como protagonista. Bali es una inmersión en lo verde, con el sonido del agua como banda sonora constante. Espacios abiertos que se funden con el jardín tropical, materiales naturales y esa energía vital que solo existe donde la naturaleza manda.",
    features: ["Piscina entre palmeras", "Ducha exterior", "Cocina balinesa", "Terraza elevada", "WiFi de alta velocidad", "Ventiladores de techo"],
    capacity: "8 personas",
    bedrooms: "4 habitaciones",
    bathrooms: "4 baños + aseo",
    photoTour: [
      {
        id: "salon",
        title: "Salón",
        subtitle: "Espacios abiertos con luz natural y decoración de inspiración balinesa.",
        amenities: ["Sistema de sonido", "TV", "Libros y material de lectura", "Juegos de mesa"],
        images: [baliSalon01, baliSalon03, baliSalon04, baliSalon05, baliSalon06, baliSalon07, baliSalon08],
      },
      {
        id: "cocina",
        title: "Cocina completa",
        amenities: ["Bandeja de repostería", "Batidora", "Platos y cubiertos", "Tostadora", "Congelador", "Fogón", "Cafetera"],
        images: [baliCocina01, baliCocina02, baliCocina03, baliCocina04, baliCocina05, baliCocina06, baliCocina07, baliCocina08, baliCocina09, baliCocina10, baliCocina11, baliCocina12, baliCocina13, baliCocina14, baliCocina15, baliCocina16, baliCocina17, baliCocina18],
      },
      {
        id: "comedor",
        title: "Comedor",
        amenities: ["Mesa de comedor para 8 personas", "Lámparas artesanales"],
        images: [baliComedor01, baliComedor02, baliComedor03, baliComedor04, baliComedor05],
      },
      {
        id: "dormitorio1",
        title: "Dormitorio 1",
        subtitle: "Suite principal con cama king y caja fuerte.",
        amenities: ["Cama king", "Ropa de cama", "Almohadas y mantas adicionales", "Perchas", "Caja fuerte"],
        images: [baliDormitorio1_01, baliDormitorio1_02, baliDormitorio1_03, baliDormitorio1_04, baliDormitorio1_05],
      },
      {
        id: "dormitorio2",
        title: "Dormitorio 2",
        amenities: ["Cama king", "Ropa de cama", "Almohadas y mantas adicionales", "Perchas", "Armario"],
        images: [baliDormitorio2_01, baliDormitorio2_02],
      },
      {
        id: "dormitorio3",
        title: "Dormitorio 3",
        amenities: ["Cama king", "Ropa de cama", "Almohadas y mantas adicionales", "Perchas"],
        images: [baliDormitorio3_01],
      },
      {
        id: "dormitorio4",
        title: "Dormitorio 4",
        amenities: ["Cama king", "Ropa de cama"],
        images: [baliDormitorio4_01, baliDormitorio4_02],
      },
      {
        id: "bano1",
        title: "Baño completo 1",
        subtitle: "Baño principal con bañera exterior.",
        amenities: ["Bañera exterior", "Ducha", "Secador de pelo", "Champú", "Gel de ducha", "Acondicionador"],
        images: [baliBano1_01, baliBano1_02, baliBano1_03, baliBano1_04, baliBano1_05, baliBano1_06, baliBano1_07, baliBano1_08],
      },
      {
        id: "bano2",
        title: "Baño completo 2",
        amenities: ["Ducha", "Secador de pelo", "Champú", "Gel de ducha", "Acondicionador"],
        images: [baliBano2_01],
      },
      {
        id: "bano3",
        title: "Baño completo 3",
        amenities: ["Ducha", "Secador de pelo", "Champú", "Gel de ducha", "Acondicionador"],
        images: [baliBano3_01, baliBano3_02],
      },
      {
        id: "bano4",
        title: "Baño completo 4",
        subtitle: "Con bañera exterior.",
        amenities: ["Bañera exterior", "Ducha", "Secador de pelo", "Champú", "Gel de ducha"],
        images: [baliBano4_01, baliBano4_02],
      },
      {
        id: "aseo",
        title: "Aseo",
        amenities: ["Lavabo", "Agua caliente"],
        images: [baliAseo01],
      },
      {
        id: "patio",
        title: "Patio",
        amenities: ["Galería de arte"],
        images: [baliPatio01],
      },
      {
        id: "jardin",
        title: "Jardín",
        subtitle: "Jardín tropical con cactus y olivos.",
        amenities: ["Vegetación autóctona", "Cactus", "Olivos"],
        images: [baliJardin01, baliJardin02, baliJardin03, baliJardin04, baliJardin05],
      },
      {
        id: "lavanderia",
        title: "Zona de lavandería",
        amenities: ["Lavadora", "Secadora", "Productos de limpieza"],
        images: [baliLavanderia01, baliLavanderia02],
      },
      {
        id: "exterior",
        title: "Exterior",
        subtitle: "Terrazas cubiertas con pérgola y zona chill.",
        amenities: ["Comedor al aire libre", "Pérgola", "Zona chill", "Mobiliario exterior", "Lámparas artesanales"],
        images: [baliExterior01, baliExterior02, baliExterior03, baliExterior04, baliExterior05, baliExterior06, baliExterior07, baliExterior08, baliExterior09, baliExterior10, baliExterior11, baliExterior12, baliExterior13, baliExterior14, baliExterior15, baliExterior16, baliExterior17, baliExterior18],
      },
      {
        id: "piscina",
        title: "Piscina",
        subtitle: "Piscina con tumbonas y vistas a las montañas.",
        amenities: ["Tumbonas", "Vistas panorámicas"],
        images: [baliPiscina01, baliPiscina02, baliPiscina03, baliPiscina04, baliPiscina05, baliPiscina06, baliPiscina07],
      },
    ],
  },
};

const Villa = () => {
  const { slug } = useParams<{ slug: string }>();
  const villaBase = slug ? villasData[slug] : null;
  const { openModal } = useAvailabilityModal();
  const { t, language } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);
  const [isBaliModalOpen, setIsBaliModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);

  // Get translated villa content (villas keyed by slug in i18n)
  type VillasTranslations = {
    villas?: Record<
      string,
      {
        title?: string;
        subtitle?: string;
        description?: string;
        features?: string[];
        capacity?: string;
        bedrooms?: string;
        bathrooms?: string;
        editorialIntro?: string;
        triptych?: {
          title1?: string;
          desc1?: string;
          title2?: string;
          desc2?: string;
          title3?: string;
          desc3?: string;
        };
      }
    >;
  };
  const villaTranslations = slug && (t as VillasTranslations).villas?.[slug];
  const villa = villaBase ? {
    ...villaBase,
    title: villaTranslations?.title || villaBase.title,
    subtitle: villaTranslations?.subtitle || villaBase.subtitle,
    description: villaTranslations?.description || villaBase.description,
    features: villaTranslations?.features || villaBase.features,
    capacity: villaTranslations?.capacity || villaBase.capacity,
    bedrooms: villaTranslations?.bedrooms || villaBase.bedrooms,
    bathrooms: villaTranslations?.bathrooms || villaBase.bathrooms,
  } : null;

  // Scroll to top when navigating to a villa
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  // Initialize Vimeo player for Santorini, California, and Mykonos
  useEffect(() => {
    const villasWithVideo = ['santorini', 'california', 'mykonos', 'bali'];
    if (villasWithVideo.includes(slug || '') && iframeRef.current && !playerRef.current) {
      const player = new Player(iframeRef.current);
      playerRef.current = player;
      
      player.on('playing', () => {
        setVideoReady(true);
      });

      // Custom loop point for Mykonos - restart at 7.5 seconds
      if (slug === 'mykonos') {
        const MYKONOS_LOOP_POINT = 7.5; // seconds
        player.on('timeupdate', (data: { seconds: number }) => {
          if (data.seconds >= MYKONOS_LOOP_POINT) {
            player.setCurrentTime(0);
          }
        });
      }

      player.play().catch(() => {
        // Autoplay might be blocked, still show video
        setVideoReady(true);
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setVideoReady(false);
    };
  }, [slug]);

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-section mb-4">{t.villa.backToVillas}</h1>
          <Link to="/" className="link-arrow">{t.common.back}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{villa.title} | Unique Homes Lajares</title>
        <meta name="description" content={villa.description.slice(0, 160)} />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/92 border-b border-border/85">
          <div className="container-custom h-16 md:h-[78px] flex items-center justify-between">
            <Link to="/#casas" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} />
              <span className="text-xs uppercase tracking-[0.18em]">{t.common.back}</span>
            </Link>
            <div className="flex-shrink-0" />
          </div>
        </header>

        {/* Hero Image/Video */}
        <section className="container-custom py-5 md:py-7">
          <div 
            className="relative h-[50vh] md:h-[65vh] rounded overflow-hidden border border-border/95"
          >
            {/* Background image - always present, fades out when video is ready */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 ${(slug === 'santorini' || slug === 'california' || slug === 'mykonos' || slug === 'bali') && videoReady ? 'opacity-0' : 'opacity-100'}`}
              style={{
                backgroundImage: `url(${villa.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Vimeo video for Santorini */}
            {slug === 'santorini' && (
              <div 
                className={`absolute inset-[-50%] w-[200%] h-[200%] transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <iframe
                  ref={iframeRef}
                  src="https://player.vimeo.com/video/1151530165?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                  allow="autoplay; fullscreen"
                  title="Santorini Villa Video"
                />
              </div>
            )}

            {/* Vimeo video for California */}
            {slug === 'california' && (
              <div 
                className={`absolute inset-[-50%] w-[200%] h-[200%] transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <iframe
                  ref={iframeRef}
                  src="https://player.vimeo.com/video/1107682654?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                  allow="autoplay; fullscreen"
                  title="California Villa Video"
                />
              </div>
            )}

            {/* Vimeo video for Mykonos */}
            {slug === 'mykonos' && (
              <div 
                className={`absolute inset-[-50%] w-[200%] h-[200%] transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <iframe
                  ref={iframeRef}
                  src="https://player.vimeo.com/video/1156832054?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
                  className="absolute inset-0 w-full h-full brightness-[0.94] contrast-[0.97] saturate-[0.92]"
                  style={{ 
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                  allow="autoplay; fullscreen"
                  title="Mykonos Villa Video"
                />
              </div>
            )}

            {/* Vimeo video for Bali */}
            {slug === 'bali' && (
              <div 
                className={`absolute inset-[-50%] w-[200%] h-[200%] transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <iframe
                  ref={iframeRef}
                  src="https://player.vimeo.com/video/1156913651?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                  allow="autoplay; fullscreen"
                  title="Bali Villa Video"
                />
              </div>
            )}

            {villa.comingSoon && (
              <div className="absolute top-4 right-4 bg-amber-100 text-amber-900 text-[9px] md:text-[10px] uppercase tracking-[0.16em] font-medium px-3 py-2.5 md:py-3 rounded-2xl z-10 shadow-md text-center leading-tight">
                <span className="block">{t.casaCard.onRequest}</span>
                <span className="block text-[8px] md:text-[9px] font-normal opacity-80 mt-0.5 normal-case tracking-normal">{t.casaCard.onRequestDesc}</span>
              </div>
            )}
            
            {/* Mobile scroll indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden animate-bounce">
              <div className="flex flex-col items-center gap-1 text-white/80">
                <ChevronDown size={24} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container-custom pb-10 md:pb-16">
          <div className="max-w-3xl mx-auto">
            {/* Title */}
            <div className="text-center mb-8 md:mb-12">
              <div className="kicker">{villa.subtitle}</div>
              <h1 className="heading-display">{villa.title}</h1>
            </div>

            {/* Editorial Description - Only for Mykonos */}
            {slug === 'mykonos' && villaTranslations?.editorialIntro && (
              <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
                <p className="text-base md:text-lg leading-[1.9] md:leading-[2] font-light text-foreground/90">
                  {villaTranslations.editorialIntro}
                </p>
              </div>
            )}

            {/* Description - Triptych editorial */}
            {villaTranslations?.triptych && (
              <div className="max-w-[900px] mx-auto mb-8 md:mb-12 py-12 md:py-16 px-6 md:px-10 border border-border/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-center">
                  <div className="space-y-3">
                    <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">{villaTranslations.triptych.title1}</div>
                    <p className="text-sm md:text-base leading-[1.8] font-light text-foreground">{villaTranslations.triptych.desc1}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">{villaTranslations.triptych.title2}</div>
                    <p className="text-sm md:text-base leading-[1.8] font-light text-foreground">{villaTranslations.triptych.desc2}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">{villaTranslations.triptych.title3}</div>
                    <p className="text-sm md:text-base leading-[1.8] font-light text-foreground">{villaTranslations.triptych.desc3}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8 md:mb-12">
              <div className="section-card">
                <div className="p-4 md:p-6 text-center">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">{t.villa.capacity}</div>
                  <div className="text-sm md:text-base font-medium">{villa.capacity}</div>
                </div>
              </div>
              <div className="section-card">
                <div className="p-4 md:p-6 text-center">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">{t.villa.bedrooms}</div>
                  <div className="text-sm md:text-base font-medium">{villa.bedrooms}</div>
                </div>
              </div>
              <div className="section-card">
                <div className="p-4 md:p-6 text-center">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">{t.villa.bathrooms}</div>
                  <div className="text-sm md:text-base font-medium">{villa.bathrooms}</div>
                </div>
              </div>
            </div>

            {/* Photo Tour */}
            {villa.photoTour && villa.photoTour.length > 0 && (
              <VillaPhotoTour sections={villa.photoTour} villaSlug={slug || ""} />
            )}

            {/* Features */}
            <div className="relative w-screen left-1/2 -translate-x-1/2">
              <div className="bg-card border-y border-border">
                <div className="py-10 md:py-14 px-6 md:px-8">
                  <h2 className="text-xl md:text-2xl font-light text-center mb-6 md:mb-8">{t.villa.inTheHouse}</h2>
                  <ul className="flex flex-col items-center gap-3 md:gap-4 max-w-md mx-auto">
                    {villa.features.map((feature) => (
                      <li key={feature} className="text-sm md:text-base font-light text-foreground/80 leading-relaxed">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Video section for Santorini */}
            {slug === 'santorini' && (
              <div className="relative w-screen left-1/2 -translate-x-1/2 my-12 md:my-16">
              <div className="container-custom">
                  <h2 className="text-xl md:text-2xl font-light text-center mb-4">{t.villa.featuredExperience}</h2>
                  <div className="relative h-[50vh] md:h-[65vh] rounded overflow-hidden border border-border/95">
                    <div 
                      className="absolute inset-[-50%] w-[200%] h-[200%]"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <iframe
                        src="https://player.vimeo.com/video/1148107932?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
                        className="absolute inset-0 w-full h-full"
                        style={{ 
                          border: 'none',
                          pointerEvents: 'none',
                          filter: 'brightness(0.9) contrast(0.95)',
                        }}
                        allow="autoplay; fullscreen"
                        title="Santorini Villa Video"
                      />
                    </div>
                    {/* Overlay mate */}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>
                  <p className="mt-6 text-center text-lg italic font-light text-[#7c7364]">
                    {t.villa.jacuzziNote}
                  </p>
                </div>
              </div>
            )}

            {/* Ubicación */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-xl md:text-2xl font-light text-center mb-4">{t.villa.location}</h2>
              <p className="text-sm md:text-base text-muted-foreground text-center max-w-2xl mx-auto mb-6 leading-relaxed">
                {t.villa.locationDesc}
              </p>
              <div className="flex flex-col items-center">
                <a 
                  href="https://www.google.com/maps/search/Unique+Homes+Lajares" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative w-full max-w-[700px] rounded-xl overflow-hidden border border-border/50 block group cursor-pointer"
                >
                  <img 
                    src={lajaresMap} 
                    alt="Ubicación de Unique Homes en Lajares, Fuerteventura" 
                    className="w-full h-auto transition-opacity group-hover:opacity-95"
                  />
                  {/* Indicador de clic */}
                  <div className="absolute top-3 right-3 bg-foreground/80 text-background rounded-full w-7 h-7 flex items-center justify-center text-sm font-light shadow-md group-hover:bg-foreground transition-colors">
                    +
                  </div>
                </a>
              </div>
            </div>

            {/* Bloque informativo para villa bajo solicitud */}
            {villa.comingSoon && (
              <div className="mt-10 md:mt-14 p-6 md:p-8 bg-amber-50/50 border border-amber-200/50 rounded-xl text-center max-w-xl mx-auto">
                <h3 className="text-sm md:text-base uppercase tracking-[0.14em] font-medium text-amber-900 mb-3">
                  {t.villa.onRequestTitle}
                </h3>
                <p className="text-sm md:text-base leading-relaxed font-light text-foreground/80">
                  {t.villa.onRequestDesc1}
                </p>
                <p className="text-sm md:text-base leading-relaxed font-light text-foreground/80 mt-2">
                  {t.villa.onRequestDesc2}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="text-center mt-8 md:mt-10">
              {villa.comingSoon ? (
                <>
                  <Button 
                    variant="diptyque" 
                    size="hero" 
                    onClick={() => setIsBaliModalOpen(true)} 
                    className="w-full sm:w-auto text-[11px] md:text-xs uppercase tracking-[0.16em] bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200"
                  >
                    {t.villa.requestAvailability}
                  </Button>
                  <p className="text-muted-foreground text-[11px] md:text-xs mt-3 font-light">
                    {t.villa.onRequestNote}
                  </p>
                </>
              ) : (
                <Button variant="diptyque" size="hero" onClick={openModal} className="w-full sm:w-auto text-[11px] md:text-xs uppercase tracking-[0.16em] bg-background border-foreground/25 hover:bg-muted">
                  {t.villa.reserve}
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 md:py-10 text-center text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.14em] px-4">
          {t.footer.tagline}
        </footer>
      </main>

      {/* Bali Request Modal */}
      <BaliRequestModal 
        isOpen={isBaliModalOpen} 
        onClose={() => setIsBaliModalOpen(false)} 
      />
    </>
  );
};

export default Villa;