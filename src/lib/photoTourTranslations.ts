// Map Spanish amenity strings to translation keys
export const amenityKeyMap: Record<string, string> = {
  // Climate & comfort
  "Aire acondicionado": "airConditioning",
  Calefacción: "heating",
  "Chimenea interior": "fireplace",
  "Ventilador de techo": "ceilingFan",

  // Entertainment
  "Sistema de sonido": "soundSystem",
  TV: "tv",
  "Libros y material de lectura": "books",
  "Juegos de mesa": "boardGames",

  // Kitchen
  Cafetera: "coffeeMaker",
  Café: "coffee",
  Fogón: "stove",
  "Utensilios básicos de cocina": "basicKitchenUtensils",
  "Platos y cubiertos": "dishesAndCutlery",
  Lavavajillas: "dishwasher",
  Congelador: "freezer",
  Frigorífico: "fridge",
  "Copas de vino": "wineGlasses",
  "Hervidor de agua": "kettle",
  "Bandeja de repostería": "bakingTray",
  Tostadora: "toaster",
  Batidora: "blender",

  // Bedroom
  "Cama king": "kingBed",
  "Cama de matrimonio": "queenBed",
  "Cama de matrimonio XL": "xlQueenBed",
  "Ropa de cama": "bedding",
  "Espacio para guardar la ropa": "closetSpace",
  Perchas: "hangers",
  "Persianas o cortinas opacas": "blackoutCurtains",
  "Almohadas y mantas adicionales": "extraPillowsBlankets",
  Plancha: "iron",
  "Caja fuerte": "safe",
  Armario: "closet",

  // Bathroom
  "Gel de ducha": "showerGel",
  "Secador de pelo": "hairDryer",
  "Agua caliente": "hotWater",
  Champú: "shampoo",
  Acondicionador: "conditioner",
  "Productos de limpieza": "cleaningProducts",
  Lavabo: "sink",
  "Bañera exterior": "exteriorBathtub",
  Ducha: "shower",

  // Work
  Escritorio: "desk",
  "WiFi de alta velocidad": "highSpeedWifi",
  "Enchufes cerca del escritorio": "outletsNearDesk",
  Wifi: "wifi",

  // Outdoor
  "Comedor al aire libre": "outdoorDining",
  "Mobiliario exterior": "outdoorFurniture",
  "Vistas al jardín": "gardenViews",
  "Vistas panorámicas": "panoramicViews",
  Barbacoa: "bbq",
  Jardín: "garden",
  "Patio trasero": "backyard",
  Hamaca: "hammock",
  Jacuzzi: "jacuzzi",
  Pérgola: "pergola",
  "Zona chill": "chillZone",

  // Parking
  "Aparcamiento privado": "privateParking",
  "Bicicletas disponibles": "bikesAvailable",
  "Aparcamiento gratuito en la calle": "freeStreetParking",

  // Pool
  Tumbonas: "sunLoungers",
  "Ducha exterior": "outdoorShower",
  Sombrillas: "umbrellas",

  // Dining
  "Mesa de comedor": "diningTable",
  "Mesa de comedor para 8 personas": "diningTable8",

  // Architecture
  "Entrada privada": "privateEntrance",
  "Arquitectura tradicional": "traditionalArchitecture",

  // Laundry
  Lavadora: "washer",
  Secadora: "dryer",

  // Decor
  "Lámparas artesanales": "artisanLamps",
  "Galería de arte": "artGallery",

  // Garden features
  "Vegetación autóctona": "nativeVegetation",
  Cactus: "cactus",
  Olivos: "olives",
};

// Map section IDs to translation keys
export const sectionIdMap: Record<string, string> = {
  salon: "salon",
  comedor: "comedor",
  cocina: "cocina",
  dormitorio: "dormitorio",
  dormitorio1: "dormitorio1",
  dormitorio2: "dormitorio2",
  dormitorio3: "dormitorio3",
  dormitorio4: "dormitorio4",
  bano: "bano",
  bano1: "bano1",
  bano2: "bano2",
  bano3: "bano3",
  bano4: "bano4",
  aseo: "aseo",
  patio: "patio",
  terraza: "terraza",
  exterior: "exterior",
  piscina: "piscina",
  jacuzzi: "jacuzzi",
  biblioteca: "biblioteca",
  trabajo: "trabajo",
  garaje: "garaje",
  jardin: "jardin",
  "jardin-entrada": "jardin-entrada",
  lavanderia: "lavanderia",
};

// Map for subtitle translation keys (villa-specific subtitles)
export const subtitleKeyMap: Record<string, Record<string, string>> = {
  mykonos: {
    salon: "salonMykonos",
    dormitorio: "dormitorioMykonos",
  },
  california: {
    salon: "salonCalifornia",
    dormitorio1: "dormitorio1California",
    terraza: "terrazaCalifornia",
    piscina: "piscinaCalifornia",
  },
  bali: {
    salon: "salonBali",
    dormitorio1: "dormitorio1Bali",
    bano1: "bano1Bali",
    bano4: "bano4Bali",
    jardin: "jardinBali",
    exterior: "exteriorBali",
    piscina: "piscinaBali",
  },
};
