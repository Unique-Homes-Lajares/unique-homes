import { useState } from "react";
import CasaCard from "./CasaCard";
import BaliRequestModal from "./BaliRequestModal";
import casaCalifornia from "@/assets/casa-california.jpg";
import casaMykonos from "@/assets/casa-mykonos.jpg";
import casaSantorini from "@/assets/casa-santorini.jpg";
import casaRetreat from "@/assets/casa-retreat.jpg";
import casaBali from "@/assets/casa-bali.jpg";
import baliMainHome from "@/assets/bali/main-home.avif";

// Mykonos - all photos
import mykonosSalon01 from "@/assets/mykonos/salon-01.jpg";
import mykonosSalon02 from "@/assets/mykonos/salon-02.jpg";
import mykonosSalon03 from "@/assets/mykonos/salon-03.jpg";
import mykonosSalon04 from "@/assets/mykonos/salon-04.jpg";
import mykonosSalon05 from "@/assets/mykonos/salon-05.jpg";
import mykonosSalon06 from "@/assets/mykonos/salon-06.jpg";
import mykonosSalon07 from "@/assets/mykonos/salon-07.jpg";
import mykonosCocina01 from "@/assets/mykonos/cocina-01.avif";
import mykonosCocina02 from "@/assets/mykonos/cocina-02.avif";
import mykonosCocina03 from "@/assets/mykonos/cocina-03.avif";
import mykonosDormitorio01 from "@/assets/mykonos/dormitorio-01.jpg";
import mykonosDormitorio02 from "@/assets/mykonos/dormitorio-02.jpg";
import mykonosDormitorio03 from "@/assets/mykonos/dormitorio-03.jpg";
import mykonosDormitorio04 from "@/assets/mykonos/dormitorio-04.jpg";
import mykonosDormitorio05 from "@/assets/mykonos/dormitorio-05.jpg";
import mykonosDormitorio06 from "@/assets/mykonos/dormitorio-06.jpg";
import mykonosDormitorio07 from "@/assets/mykonos/dormitorio-07.jpg";
import mykonosBano01 from "@/assets/mykonos/bano-01.avif";
import mykonosBano02 from "@/assets/mykonos/bano-02.jpg";
import mykonosBano03 from "@/assets/mykonos/bano-03.jpg";
import mykonosPatio01 from "@/assets/mykonos/patio-01.jpg";
import mykonosPatio02 from "@/assets/mykonos/patio-02.jpg";
import mykonosPatio03 from "@/assets/mykonos/patio-03.avif";
import mykonosPatio04 from "@/assets/mykonos/patio-04.jpg";
import mykonosTerraza01 from "@/assets/mykonos/terraza-01.jpg";
import mykonosTerraza02 from "@/assets/mykonos/terraza-02.jpg";
import mykonosTerraza03 from "@/assets/mykonos/terraza-03.jpg";
import mykonosComedor01 from "@/assets/mykonos/comedor-01.avif";
import mykonosExterior01 from "@/assets/mykonos/exterior-01.jpg";
import mykonosPiscina01 from "@/assets/mykonos/piscina-01.jpg";
import mykonosPiscina02 from "@/assets/mykonos/piscina-02.avif";
import mykonosPiscina03 from "@/assets/mykonos/piscina-03.jpg";
import mykonosPiscina04 from "@/assets/mykonos/piscina-04.jpg";
import mykonosPiscina05 from "@/assets/mykonos/piscina-05.jpg";
import mykonosPiscina06 from "@/assets/mykonos/piscina-06.avif";
import mykonosPiscina07 from "@/assets/mykonos/piscina-07.jpg";
import mykonosMainHome from "@/assets/mykonos/main-home.jpg";

// Santorini - all photos
import santSalon01 from "@/assets/santorini/salon-01.avif";
import santSalon02 from "@/assets/santorini/salon-02.avif";
import santSalon03 from "@/assets/santorini/salon-03.avif";
import santSalon04 from "@/assets/santorini/salon-04.avif";
import santSalon05 from "@/assets/santorini/salon-05.avif";
import santSalon06 from "@/assets/santorini/salon-06.avif";
import santCocina01 from "@/assets/santorini/cocina-01.avif";
import santCocina02 from "@/assets/santorini/cocina-02.avif";
import santCocina03 from "@/assets/santorini/cocina-03.avif";
import santCocina04 from "@/assets/santorini/cocina-04.avif";
import santCocina05 from "@/assets/santorini/cocina-05.avif";
import santComedor01 from "@/assets/santorini/comedor-01.avif";
import santComedor02 from "@/assets/santorini/comedor-02.avif";
import santComedor03 from "@/assets/santorini/comedor-03.avif";
import santDormitorio01 from "@/assets/santorini/dormitorio-01.avif";
import santDormitorio02 from "@/assets/santorini/dormitorio-02.avif";
import santDormitorio03 from "@/assets/santorini/dormitorio-03.avif";
import santDormitorio04 from "@/assets/santorini/dormitorio-04.avif";
import santBano01 from "@/assets/santorini/bano-01.avif";
import santBano02 from "@/assets/santorini/bano-02.avif";
import santPatio01 from "@/assets/santorini/patio-01.avif";
import santPatio02 from "@/assets/santorini/patio-02.avif";
import santPatio03 from "@/assets/santorini/patio-03.avif";
import santTerraza01 from "@/assets/santorini/terraza-01.avif";
import santTerraza02 from "@/assets/santorini/terraza-02.avif";
import santTerraza03 from "@/assets/santorini/terraza-03.avif";
import santTerraza04 from "@/assets/santorini/terraza-04.avif";
import santExterior01 from "@/assets/santorini/exterior-01.avif";
import santPiscina01 from "@/assets/santorini/piscina-01.avif";
import santPiscina02 from "@/assets/santorini/piscina-02.avif";
import santPiscina03 from "@/assets/santorini/piscina-03.avif";
import santPiscina04 from "@/assets/santorini/piscina-04.avif";
import santPiscina05 from "@/assets/santorini/piscina-05.avif";
import santPiscina06 from "@/assets/santorini/piscina-06.avif";
import santPiscina07 from "@/assets/santorini/piscina-07.avif";
import santPiscina08 from "@/assets/santorini/piscina-08.avif";
import santPiscina09 from "@/assets/santorini/piscina-09.avif";
import santJacuzzi01 from "@/assets/santorini/jacuzzi-01.avif";
import santJacuzzi02 from "@/assets/santorini/jacuzzi-02.avif";
import santBiblioteca01 from "@/assets/santorini/biblioteca-01.avif";
import santMainHome from "@/assets/santorini/main-home.jpg";
// The Retreat - all photos
import retreatSalon01 from "@/assets/retreat/salon-01.jpg";
import retreatSalon02 from "@/assets/retreat/salon-02.jpg";
import retreatSalon03 from "@/assets/retreat/salon-03.jpg";
import retreatSalon04 from "@/assets/retreat/salon-04.jpg";
import retreatSalon05 from "@/assets/retreat/salon-05.jpg";
import retreatCocina01 from "@/assets/retreat/cocina-01.jpg";
import retreatCocina02 from "@/assets/retreat/cocina-02.jpg";
import retreatComedor01 from "@/assets/retreat/comedor-01.jpg";
import retreatDormitorio1_01 from "@/assets/retreat/dormitorio1-01.jpg";
import retreatDormitorio1_02 from "@/assets/retreat/dormitorio1-02.jpg";
import retreatDormitorio1_03 from "@/assets/retreat/dormitorio1-03.jpg";
import retreatDormitorio1_04 from "@/assets/retreat/dormitorio1-04.jpg";
import retreatDormitorio1_05 from "@/assets/retreat/dormitorio1-05.jpg";
import retreatDormitorio1_06 from "@/assets/retreat/dormitorio1-06.jpg";
import retreatDormitorio2_01 from "@/assets/retreat/dormitorio2-01.avif";
import retreatDormitorio2_02 from "@/assets/retreat/dormitorio2-02.jpg";
import retreatDormitorio2_03 from "@/assets/retreat/dormitorio2-03.jpg";
import retreatBano1_01 from "@/assets/retreat/bano1-01.avif";
import retreatBano1_02 from "@/assets/retreat/bano1-02.jpg";
import retreatBano2_01 from "@/assets/retreat/bano2-01.avif";
import retreatBano2_02 from "@/assets/retreat/bano2-02.jpg";
import retreatJardinEntrada01 from "@/assets/retreat/jardin-entrada-01.avif";
import retreatJardinEntrada02 from "@/assets/retreat/jardin-entrada-02.jpg";
import retreatJardin01 from "@/assets/retreat/jardin-01.avif";
import retreatJardin02 from "@/assets/retreat/jardin-02.jpg";
import retreatJardin03 from "@/assets/retreat/jardin-03.jpg";
import retreatJardin04 from "@/assets/retreat/jardin-04.jpg";
import retreatJardin05 from "@/assets/retreat/jardin-05.jpg";
import retreatJardin06 from "@/assets/retreat/jardin-06.jpg";
import retreatTerraza01 from "@/assets/retreat/terraza-01.avif";
import retreatTerraza02 from "@/assets/retreat/terraza-02.jpg";
import retreatTerraza03 from "@/assets/retreat/terraza-03.jpg";
import retreatTerraza04 from "@/assets/retreat/terraza-04.jpg";
import retreatExterior01 from "@/assets/retreat/exterior-01.jpg";
import retreatPiscina01 from "@/assets/retreat/piscina-01.avif";
import retreatPiscina02 from "@/assets/retreat/piscina-02.avif";
import retreatPiscina03 from "@/assets/retreat/piscina-03.jpg";
import retreatPiscina04 from "@/assets/retreat/piscina-04.jpg";
import retreatPiscina05 from "@/assets/retreat/piscina-05.jpg";
import retreatPiscina06 from "@/assets/retreat/piscina-06.jpg";
import retreatPiscina07 from "@/assets/retreat/piscina-07.jpg";
import retreatMainHome from "@/assets/retreat/main-home.jpg";

// California - all photos
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
import calDormitorio1_01 from "@/assets/california/dormitorio1-01.jpg";
import calDormitorio1_02 from "@/assets/california/dormitorio1-02.jpg";
import calDormitorio1_03 from "@/assets/california/dormitorio1-03.jpg";
import calDormitorio1_04 from "@/assets/california/dormitorio1-04.jpg";
import calDormitorio1_05 from "@/assets/california/dormitorio1-05.jpg";
import calDormitorio1_06 from "@/assets/california/dormitorio1-06.jpg";
import calDormitorio1_07 from "@/assets/california/dormitorio1-07.jpg";
import calDormitorio1_08 from "@/assets/california/dormitorio1-08.jpg";
import calDormitorio1_09 from "@/assets/california/dormitorio1-09.jpg";
import calDormitorio2_01 from "@/assets/california/dormitorio2-01.jpg";
import calDormitorio2_02 from "@/assets/california/dormitorio2-02.jpg";
import calBano01 from "@/assets/california/bano-01.jpg";
import calBano02 from "@/assets/california/bano-02.jpg";
import calBano03 from "@/assets/california/bano-03.jpg";
import calTrabajo01 from "@/assets/california/trabajo-01.jpg";
import calTrabajo02 from "@/assets/california/trabajo-02.jpg";
import calTrabajo03 from "@/assets/california/trabajo-03.jpg";
import calTrabajo04 from "@/assets/california/trabajo-04.jpg";
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
import calPatio01 from "@/assets/california/patio-01.jpg";
import calPatio02 from "@/assets/california/patio-02.jpg";
import calPatio03 from "@/assets/california/patio-03.jpg";
import calPatio04 from "@/assets/california/patio-04.jpg";
import calGaraje01 from "@/assets/california/garaje-01.jpg";
import calGaraje02 from "@/assets/california/garaje-02.jpg";
import calPiscina01 from "@/assets/california/piscina-01.jpg";
import calPiscina02 from "@/assets/california/piscina-02.jpg";
import calPiscina03 from "@/assets/california/piscina-03.jpg";
import calPiscina04 from "@/assets/california/piscina-04.jpg";
import calPiscina05 from "@/assets/california/piscina-05.jpg";
import calPiscina06 from "@/assets/california/piscina-06.jpg";

// Bali - all photos
import baliSalon01 from "@/assets/bali/salon-01.avif";
import baliSalon02 from "@/assets/bali/salon-02.webp";
import baliSalon03 from "@/assets/bali/salon-03.avif";
import baliSalon04 from "@/assets/bali/salon-04.avif";
import baliSalon05 from "@/assets/bali/salon-05.avif";
import baliSalon06 from "@/assets/bali/salon-06.avif";
import baliSalon07 from "@/assets/bali/salon-07.avif";
import baliSalon08 from "@/assets/bali/salon-08.avif";

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
import baliComedor01 from "@/assets/bali/comedor-01.avif";
import baliComedor02 from "@/assets/bali/comedor-02.avif";
import baliComedor03 from "@/assets/bali/comedor-03.avif";
import baliComedor04 from "@/assets/bali/comedor-04.avif";
import baliComedor05 from "@/assets/bali/comedor-05.avif";
import baliDormitorio1_01 from "@/assets/bali/dormitorio1-01.avif";
import baliDormitorio1_02 from "@/assets/bali/dormitorio1-02.avif";
import baliDormitorio1_03 from "@/assets/bali/dormitorio1-03.avif";
import baliDormitorio1_04 from "@/assets/bali/dormitorio1-04.avif";
import baliDormitorio1_05 from "@/assets/bali/dormitorio1-05.avif";
import baliDormitorio2_01 from "@/assets/bali/dormitorio2-01.avif";
import baliDormitorio2_02 from "@/assets/bali/dormitorio2-02.avif";
import baliDormitorio3_01 from "@/assets/bali/dormitorio3-01.avif";
import baliDormitorio4_01 from "@/assets/bali/dormitorio4-01.avif";
import baliDormitorio4_02 from "@/assets/bali/dormitorio4-02.avif";
import baliBano1_01 from "@/assets/bali/bano1-01.avif";
import baliBano1_02 from "@/assets/bali/bano1-02.avif";
import baliBano1_03 from "@/assets/bali/bano1-03.avif";
import baliBano1_04 from "@/assets/bali/bano1-04.avif";
import baliBano1_05 from "@/assets/bali/bano1-05.avif";
import baliBano1_06 from "@/assets/bali/bano1-06.avif";
import baliBano1_07 from "@/assets/bali/bano1-07.avif";
import baliBano1_08 from "@/assets/bali/bano1-08.avif";
import baliBano2_01 from "@/assets/bali/bano2-01.avif";
import baliBano3_01 from "@/assets/bali/bano3-01.avif";
import baliBano3_02 from "@/assets/bali/bano3-02.avif";
import baliBano4_01 from "@/assets/bali/bano4-01.avif";
import baliBano4_02 from "@/assets/bali/bano4-02.avif";
import baliAseo01 from "@/assets/bali/aseo-01.avif";
import baliPatio01 from "@/assets/bali/patio-01.avif";
import baliJardin01 from "@/assets/bali/jardin-01.avif";
import baliJardin02 from "@/assets/bali/jardin-02.avif";
import baliJardin03 from "@/assets/bali/jardin-03.avif";
import baliJardin04 from "@/assets/bali/jardin-04.avif";
import baliJardin05 from "@/assets/bali/jardin-05.avif";
import baliLavanderia01 from "@/assets/bali/lavanderia-01.avif";
import baliLavanderia02 from "@/assets/bali/lavanderia-02.avif";
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
import baliPiscina01 from "@/assets/bali/piscina-01.avif";
import baliPiscina02 from "@/assets/bali/piscina-02.avif";
import baliPiscina03 from "@/assets/bali/piscina-03.avif";
import baliPiscina04 from "@/assets/bali/piscina-04.avif";
import baliPiscina05 from "@/assets/bali/piscina-05.avif";
import baliPiscina06 from "@/assets/bali/piscina-06.avif";
import baliPiscina07 from "@/assets/bali/piscina-07.avif";

const allCasas = [
  {
    image: mykonosMainHome,
    images: [
      mykonosMainHome,
      casaMykonos,
      mykonosSalon02, mykonosSalon03, mykonosSalon04, mykonosSalon05, mykonosSalon06, mykonosSalon07,
      mykonosCocina01, mykonosCocina02, mykonosCocina03,
      mykonosDormitorio01, mykonosDormitorio02, mykonosDormitorio03, mykonosDormitorio04, mykonosDormitorio05, mykonosDormitorio06, mykonosDormitorio07,
      mykonosBano01, mykonosBano02, mykonosBano03,
      mykonosPatio01, mykonosPatio02, mykonosPatio03, mykonosPatio04,
      mykonosTerraza01, mykonosTerraza02, mykonosTerraza03,
      mykonosComedor01,
      mykonosExterior01,
      mykonosPiscina01, mykonosPiscina02, mykonosPiscina03, mykonosPiscina04, mykonosPiscina05, mykonosPiscina06, mykonosPiscina07
    ],
    title: "<b>Villa Mykonos</b> · <i>Tardes Suaves</i>",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    slug: "mykonos",
    price: "Desde 300€ noche"
  },
  {
    image: santMainHome,
    images: [
      santMainHome,
      casaSantorini,
      santSalon02, santSalon03, santSalon04, santSalon05, santSalon06,
      santCocina01, santCocina02, santCocina03, santCocina04, santCocina05,
      santComedor01, santComedor02, santComedor03,
      santDormitorio01, santDormitorio02, santDormitorio03, santDormitorio04,
      santBano01, santBano02,
      santPatio01, santPatio02, santPatio03,
      santTerraza01, santTerraza02, santTerraza03, santTerraza04,
      santExterior01,
      santPiscina01, santPiscina02, santPiscina03, santPiscina04, santPiscina05, santPiscina06, santPiscina07, santPiscina08, santPiscina09,
      santJacuzzi01, santJacuzzi02,
      santBiblioteca01
    ],
    title: "<b>Villa Santorini</b> · <i>Mañanas Blancas</i>",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    slug: "santorini",
    price: "Desde 320€ noche"
  },
  {
    image: retreatMainHome,
    images: [
      retreatMainHome,
      casaRetreat,
      retreatSalon01, retreatSalon02, retreatSalon03, retreatSalon04, retreatSalon05,
      retreatCocina01, retreatCocina02,
      retreatComedor01,
      retreatDormitorio1_01, retreatDormitorio1_02, retreatDormitorio1_03, retreatDormitorio1_04, retreatDormitorio1_05, retreatDormitorio1_06,
      retreatDormitorio2_01, retreatDormitorio2_02, retreatDormitorio2_03,
      retreatBano1_01, retreatBano1_02,
      retreatBano2_01, retreatBano2_02,
      retreatJardinEntrada01, retreatJardinEntrada02,
      retreatJardin01, retreatJardin02, retreatJardin03, retreatJardin04, retreatJardin05, retreatJardin06,
      retreatTerraza02, retreatTerraza03, retreatTerraza04,
      retreatExterior01,
      retreatPiscina01, retreatPiscina02, retreatPiscina03, retreatPiscina04, retreatPiscina05, retreatPiscina06, retreatPiscina07
    ],
    title: "<b>Villa Retreat</b> · <i>Días en Calma</i>",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    slug: "the-retreat",
    price: "Desde 345€ noche"
  },
  {
    image: calSalon05,
    images: [
      calSalon05,
      casaCalifornia,
      calSalon01, calSalon02, calSalon03, calSalon04, calSalon06, calSalon07, calSalon08, calSalon09, calSalon10, calSalon11, calSalon12, calSalon13, calSalon14,
      calCocina01, calCocina02, calCocina03, calCocina04, calCocina05, calCocina06, calCocina07, calCocina08, calCocina09, calCocina10, calCocina11,
      calDormitorio1_01, calDormitorio1_02, calDormitorio1_03, calDormitorio1_04, calDormitorio1_05, calDormitorio1_06, calDormitorio1_07, calDormitorio1_08, calDormitorio1_09,
      calDormitorio2_01, calDormitorio2_02,
      calBano01, calBano02, calBano03,
      calTrabajo01, calTrabajo02, calTrabajo03, calTrabajo04,
      calTerraza01, calTerraza02, calTerraza03, calTerraza04, calTerraza05, calTerraza06, calTerraza07, calTerraza08, calTerraza09, calTerraza10, calTerraza11, calTerraza12, calTerraza13,
      calPatio01, calPatio02, calPatio03, calPatio04,
      calGaraje01, calGaraje02,
      calPiscina01, calPiscina02, calPiscina03, calPiscina04, calPiscina05, calPiscina06
    ],
    title: "<b>Villa California</b> · <i>Vida Fácil</i>",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    slug: "california",
    price: "Desde 385€ noche"
  },
  {
    image: baliMainHome,
    images: [
      baliMainHome,
      casaBali,
      baliSalon01, baliSalon03, baliSalon04, baliSalon05, baliSalon06, baliSalon07, baliSalon08,
      baliCocina01, baliCocina02, baliCocina03, baliCocina04, baliCocina05, baliCocina06, baliCocina07, baliCocina08, baliCocina09, baliCocina10, baliCocina11, baliCocina12, baliCocina13, baliCocina14, baliCocina15, baliCocina16, baliCocina17, baliCocina18,
      baliComedor01, baliComedor02, baliComedor03, baliComedor04, baliComedor05,
      baliDormitorio1_01, baliDormitorio1_02, baliDormitorio1_03, baliDormitorio1_04, baliDormitorio1_05,
      baliDormitorio2_01, baliDormitorio2_02,
      baliDormitorio3_01,
      baliDormitorio4_01, baliDormitorio4_02,
      baliBano1_01, baliBano1_02, baliBano1_03, baliBano1_04, baliBano1_05, baliBano1_06, baliBano1_07, baliBano1_08,
      baliBano2_01,
      baliBano3_01, baliBano3_02,
      baliBano4_01, baliBano4_02,
      baliAseo01,
      baliPatio01,
      baliJardin01, baliJardin02, baliJardin03, baliJardin04, baliJardin05,
      baliLavanderia01, baliLavanderia02,
      baliExterior01, baliExterior02, baliExterior03, baliExterior04, baliExterior05, baliExterior06, baliExterior07, baliExterior08, baliExterior09, baliExterior10, baliExterior11, baliExterior12, baliExterior13, baliExterior14, baliExterior15, baliExterior16, baliExterior17, baliExterior18,
      baliPiscina02, baliPiscina03, baliPiscina04, baliPiscina05, baliPiscina06, baliPiscina07
    ],
    title: "<b>Villa Bali</b> · <i>Naturaleza Serena</i>",
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    slug: "bali",
    comingSoon: true,
    price: "Desde 490€ noche",
    badges: ["Niños bienvenidos"]
  }
];

const Casas = () => {
  const [isBaliModalOpen, setIsBaliModalOpen] = useState(false);

  return (
    <>
      <section className="container-custom my-8 md:my-12" id="casas">
        <div className="relative">
          {/* Cards */}
          <div className="flex flex-col gap-12 md:gap-16">
            {allCasas.map((casa, index) => (
              <div key={casa.title}>
                <CasaCard 
                  {...casa} 
                  onComingSoonClick={casa.slug === "bali" ? () => setIsBaliModalOpen(true) : undefined}
                />
                {index < allCasas.length - 1 && (
                  <div className="mt-12 md:mt-16 border-b border-border/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bali Request Modal */}
      <BaliRequestModal 
        isOpen={isBaliModalOpen} 
        onClose={() => setIsBaliModalOpen(false)} 
      />
    </>
  );
};

export default Casas;