import type { Bike, Brand } from "../hooks/useQueries";

// 20 real best-selling Bikes in India
export const STATIC_BIKES: Bike[] = [
  {
    name: "Hero Splendor Plus",
    brand: "Hero",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(74000), priceMax: BigInt(80000) },
    photoId: "bike-hero-splendor-plus",
    mileage: "80 kmpl",
    engineSpecs: {
      displacement: BigInt(97),
      maxPower: "8.02 bhp",
      transmission: "4-speed",
    },
  },
  {
    name: "Hero HF Deluxe",
    brand: "Hero",
    category: "new",
    rating: BigInt(43),
    price: { priceMin: BigInt(58000), priceMax: BigInt(65000) },
    photoId: "bike-hero-splendor-plus",
    mileage: "83 kmpl",
    engineSpecs: {
      displacement: BigInt(97),
      maxPower: "8.36 bhp",
      transmission: "4-speed",
    },
  },
  {
    name: "Hero Passion Pro",
    brand: "Hero",
    category: "new",
    rating: BigInt(44),
    price: { priceMin: BigInt(77000), priceMax: BigInt(83000) },
    photoId: "bike-hero-passion-pro",
    mileage: "70 kmpl",
    engineSpecs: {
      displacement: BigInt(113),
      maxPower: "9.15 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Hero Xpulse 200",
    brand: "Hero",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(138000), priceMax: BigInt(145000) },
    photoId: "bike-hero-xpulse-200",
    mileage: "45 kmpl",
    engineSpecs: {
      displacement: BigInt(199),
      maxPower: "18.9 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Bajaj Pulsar 150",
    brand: "Bajaj",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(110000), priceMax: BigInt(118000) },
    photoId: "bike-bajaj-pulsar-150",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(149),
      maxPower: "14 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Bajaj Pulsar 220F",
    brand: "Bajaj",
    category: "new",
    rating: BigInt(46),
    price: { priceMin: BigInt(137000), priceMax: BigInt(145000) },
    photoId: "bike-bajaj-pulsar",
    mileage: "40 kmpl",
    engineSpecs: {
      displacement: BigInt(220),
      maxPower: "20.93 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Bajaj Dominar 400",
    brand: "Bajaj",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(217000), priceMax: BigInt(228000) },
    photoId: "bike-bajaj-pulsar",
    mileage: "30 kmpl",
    engineSpecs: {
      displacement: BigInt(373),
      maxPower: "40 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    category: "new",
    rating: BigInt(46),
    price: { priceMin: BigInt(193000), priceMax: BigInt(227000) },
    photoId: "bike-royal-enfield-classic-350",
    mileage: "35 kmpl",
    engineSpecs: {
      displacement: BigInt(349),
      maxPower: "20.2 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Royal Enfield Meteor 350",
    brand: "Royal Enfield",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(201000), priceMax: BigInt(218000) },
    photoId: "bike-royal-enfield-bullet",
    mileage: "36 kmpl",
    engineSpecs: {
      displacement: BigInt(349),
      maxPower: "20.4 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Yamaha MT-15 V2",
    brand: "Yamaha",
    category: "new",
    rating: BigInt(46),
    price: { priceMin: BigInt(166000), priceMax: BigInt(173000) },
    photoId: "bike-yamaha-mt15",
    mileage: "45 kmpl",
    engineSpecs: {
      displacement: BigInt(155),
      maxPower: "18.4 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "Yamaha FZ-S V3",
    brand: "Yamaha",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(116000), priceMax: BigInt(122000) },
    photoId: "bike-yamaha-mt15",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(149),
      maxPower: "12.2 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Yamaha YZF R15 V4",
    brand: "Yamaha",
    category: "new",
    rating: BigInt(47),
    price: { priceMin: BigInt(177000), priceMax: BigInt(184000) },
    photoId: "bike-yamaha-r15",
    mileage: "45 kmpl",
    engineSpecs: {
      displacement: BigInt(155),
      maxPower: "18.4 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "Honda CB Shine",
    brand: "Honda",
    category: "new",
    rating: BigInt(44),
    price: { priceMin: BigInt(82000), priceMax: BigInt(90000) },
    photoId: "bike-honda-cb-shine",
    mileage: "65 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "10.6 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Honda Hornet 2.0",
    brand: "Honda",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(134000), priceMax: BigInt(141000) },
    photoId: "bike-honda-cb-shine",
    mileage: "48 kmpl",
    engineSpecs: {
      displacement: BigInt(184),
      maxPower: "17.03 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Honda CB300R",
    brand: "Honda",
    category: "new",
    rating: BigInt(46),
    price: { priceMin: BigInt(254000), priceMax: BigInt(262000) },
    photoId: "bike-honda-cb-shine",
    mileage: "35 kmpl",
    engineSpecs: {
      displacement: BigInt(293),
      maxPower: "30.9 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "TVS Apache RTR 160 4V",
    brand: "TVS",
    category: "new",
    rating: BigInt(45),
    price: { priceMin: BigInt(115000), priceMax: BigInt(124000) },
    photoId: "bike-tvs-apache",
    mileage: "52 kmpl",
    engineSpecs: {
      displacement: BigInt(159),
      maxPower: "17.55 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "TVS Apache RTR 200 4V",
    brand: "TVS",
    category: "new",
    rating: BigInt(46),
    price: { priceMin: BigInt(140000), priceMax: BigInt(152000) },
    photoId: "bike-tvs-apache",
    mileage: "40 kmpl",
    engineSpecs: {
      displacement: BigInt(197),
      maxPower: "20.8 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "KTM Duke 200",
    brand: "KTM",
    category: "new",
    rating: BigInt(46),
    price: { priceMin: BigInt(196000), priceMax: BigInt(205000) },
    photoId: "bike-ktm-duke",
    mileage: "35 kmpl",
    engineSpecs: {
      displacement: BigInt(199),
      maxPower: "25 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "KTM Duke 390",
    brand: "KTM",
    category: "new",
    rating: BigInt(47),
    price: { priceMin: BigInt(311000), priceMax: BigInt(322000) },
    photoId: "bike-ktm-duke",
    mileage: "30 kmpl",
    engineSpecs: {
      displacement: BigInt(373),
      maxPower: "43.5 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "Suzuki Gixxer 150",
    brand: "Suzuki",
    category: "new",
    rating: BigInt(44),
    price: { priceMin: BigInt(104000), priceMax: BigInt(111000) },
    photoId: "bike-suzuki-access-125",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(155),
      maxPower: "13.5 bhp",
      transmission: "5-speed",
    },
  },
];

// 20 real best-selling Scooters in India (petrol + electric mixed)
export const STATIC_SCOOTERS: Bike[] = [
  {
    name: "Honda Activa 6G",
    brand: "Honda",
    category: "scooter",
    rating: BigInt(45),
    price: { priceMin: BigInt(75000), priceMax: BigInt(82000) },
    photoId: "bike-honda-activa-6g",
    mileage: "60 kmpl",
    engineSpecs: {
      displacement: BigInt(110),
      maxPower: "7.68 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Honda Dio",
    brand: "Honda",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(74000), priceMax: BigInt(80000) },
    photoId: "bike-honda-activa-6g",
    mileage: "58 kmpl",
    engineSpecs: {
      displacement: BigInt(110),
      maxPower: "7.68 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "TVS Jupiter 125",
    brand: "TVS",
    category: "scooter",
    rating: BigInt(45),
    price: { priceMin: BigInt(82000), priceMax: BigInt(90000) },
    photoId: "bike-tvs-jupiter-125",
    mileage: "52 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "8.15 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "TVS Ntorq 125",
    brand: "TVS",
    category: "scooter",
    rating: BigInt(45),
    price: { priceMin: BigInt(87000), priceMax: BigInt(95000) },
    photoId: "bike-tvs-jupiter-125",
    mileage: "50 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "9.38 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Yamaha Fascino 125",
    brand: "Yamaha",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(81000), priceMax: BigInt(89000) },
    photoId: "bike-yamaha-r15",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(125),
      maxPower: "8.2 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Yamaha RayZR 125",
    brand: "Yamaha",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(82000), priceMax: BigInt(90000) },
    photoId: "bike-yamaha-mt15",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(125),
      maxPower: "8.2 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Suzuki Access 125",
    brand: "Suzuki",
    category: "scooter",
    rating: BigInt(45),
    price: { priceMin: BigInt(84000), priceMax: BigInt(92000) },
    photoId: "bike-suzuki-access-125",
    mileage: "60 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "8.7 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Suzuki Burgman Street 125",
    brand: "Suzuki",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(99000), priceMax: BigInt(107000) },
    photoId: "bike-suzuki-access-125",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "8.7 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Hero Destini 125",
    brand: "Hero",
    category: "scooter",
    rating: BigInt(43),
    price: { priceMin: BigInt(77000), priceMax: BigInt(84000) },
    photoId: "bike-hero-splendor-plus",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "8.7 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Hero Maestro Edge 125",
    brand: "Hero",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(82000), priceMax: BigInt(90000) },
    photoId: "bike-hero-passion-pro",
    mileage: "52 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "9 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Bajaj Chetak Electric",
    brand: "Bajaj",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(115000), priceMax: BigInt(125000) },
    photoId: "bike-bajaj-pulsar",
    mileage: "95 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "4.08 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "Ola S1 Pro",
    brand: "Ola",
    category: "scooter",
    rating: BigInt(43),
    price: { priceMin: BigInt(130000), priceMax: BigInt(147000) },
    photoId: "bike-ola-s1-pro",
    mileage: "195 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "8.5 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "Ola S1 Air",
    brand: "Ola",
    category: "scooter",
    rating: BigInt(43),
    price: { priceMin: BigInt(110000), priceMax: BigInt(120000) },
    photoId: "bike-ola-s1-pro",
    mileage: "151 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "6 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "Ather 450X",
    brand: "Ather",
    category: "scooter",
    rating: BigInt(45),
    price: { priceMin: BigInt(140000), priceMax: BigInt(160000) },
    photoId: "bike-ather-450x",
    mileage: "146 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "6 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "Ather 450 Apex",
    brand: "Ather",
    category: "scooter",
    rating: BigInt(46),
    price: { priceMin: BigInt(180000), priceMax: BigInt(190000) },
    photoId: "bike-ather-450x",
    mileage: "157 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "7 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "TVS iQube Electric",
    brand: "TVS",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(116000), priceMax: BigInt(125000) },
    photoId: "bike-tvs-jupiter-125",
    mileage: "145 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "4.4 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "TVS iQube S",
    brand: "TVS",
    category: "scooter",
    rating: BigInt(43),
    price: { priceMin: BigInt(99000), priceMax: BigInt(110000) },
    photoId: "bike-tvs-jupiter-125",
    mileage: "100 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "3 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "Hero Vida V2",
    brand: "Hero",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(111000), priceMax: BigInt(120000) },
    photoId: "bike-hero-xpulse-200",
    mileage: "165 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "6 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "Simple One",
    brand: "Simple Energy",
    category: "scooter",
    rating: BigInt(45),
    price: { priceMin: BigInt(145000), priceMax: BigInt(155000) },
    photoId: "bike-ather-450x",
    mileage: "212 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "8.5 kW",
      transmission: "Direct Drive",
    },
  },
  {
    name: "Revolt RV400",
    brand: "Revolt",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(139000), priceMax: BigInt(149000) },
    photoId: "bike-ola-s1-pro",
    mileage: "150 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "3 kW",
      transmission: "Direct Drive",
    },
  },
];

// Keep for backward compat (some components still import this)
export const STATIC_ELECTRIC: Bike[] = [];

export const STATIC_BRANDS: Brand[] = [
  {
    name: "Hero",
    url: "/assets/generated/brand-hero-transparent.dim_200x120.png",
  },
  {
    name: "Honda",
    url: "/assets/generated/brand-honda-transparent.dim_200x120.png",
  },
  {
    name: "TVS",
    url: "/assets/generated/brand-tvs-transparent.dim_200x120.png",
  },
  {
    name: "Bajaj",
    url: "/assets/generated/brand-bajaj-transparent.dim_200x120.png",
  },
  {
    name: "Yamaha",
    url: "/assets/generated/brand-yamaha-transparent.dim_200x120.png",
  },
  {
    name: "Royal Enfield",
    url: "/assets/generated/brand-royal-enfield-transparent.dim_200x120.png",
  },
  {
    name: "Suzuki",
    url: "/assets/generated/brand-suzuki-transparent.dim_200x120.png",
  },
  {
    name: "KTM",
    url: "/assets/generated/brand-ktm-transparent.dim_200x120.png",
  },
  {
    name: "Ola",
    url: "/assets/generated/brand-ola-transparent.dim_200x120.png",
  },
  {
    name: "Ather",
    url: "/assets/generated/brand-ather-transparent.dim_200x120.png",
  },
];

export const ALL_BRANDS_EXTENDED: Brand[] = [...STATIC_BRANDS];

export function getBikeImage(name: string): string {
  const map: Record<string, string> = {
    "Hero Splendor Plus":
      "/assets/generated/bike-hero-splendor-plus.dim_400x280.jpg",
    "Hero HF Deluxe":
      "/assets/generated/bike-hero-splendor-plus.dim_400x280.jpg",
    "Hero Passion Pro":
      "/assets/generated/bike-hero-passion-pro.dim_400x280.jpg",
    "Hero Xpulse 200": "/assets/generated/bike-hero-xpulse-200.dim_400x280.jpg",
    "Bajaj Pulsar 150":
      "/assets/generated/bike-bajaj-pulsar-150.dim_400x280.jpg",
    "Bajaj Pulsar 220F": "/assets/generated/bike-bajaj-pulsar.dim_400x280.jpg",
    "Bajaj Dominar 400": "/assets/generated/bike-bajaj-pulsar.dim_400x280.jpg",
    "Royal Enfield Classic 350":
      "/assets/generated/bike-royal-enfield-classic-350.dim_400x280.jpg",
    "Royal Enfield Meteor 350":
      "/assets/generated/bike-royal-enfield-bullet.dim_400x280.jpg",
    "Yamaha MT-15 V2": "/assets/generated/bike-yamaha-mt15.dim_400x280.jpg",
    "Yamaha FZ-S V3": "/assets/generated/bike-yamaha-mt15.dim_400x280.jpg",
    "Yamaha YZF R15 V4": "/assets/generated/bike-yamaha-r15.dim_400x280.jpg",
    "Honda CB Shine": "/assets/generated/bike-honda-cb-shine.dim_400x280.jpg",
    "Honda Hornet 2.0": "/assets/generated/bike-honda-cb-shine.dim_400x280.jpg",
    "Honda CB300R": "/assets/generated/bike-honda-cb-shine.dim_400x280.jpg",
    "TVS Apache RTR 160 4V":
      "/assets/generated/bike-tvs-apache.dim_400x280.jpg",
    "TVS Apache RTR 200 4V":
      "/assets/generated/bike-tvs-apache.dim_400x280.jpg",
    "KTM Duke 200": "/assets/generated/bike-ktm-duke.dim_400x280.jpg",
    "KTM Duke 390": "/assets/generated/bike-ktm-duke.dim_400x280.jpg",
    "Suzuki Gixxer 150":
      "/assets/generated/bike-suzuki-access-125.dim_400x280.jpg",
    "Honda Activa 6G": "/assets/generated/bike-honda-activa-6g.dim_400x280.jpg",
    "Honda Dio": "/assets/generated/bike-honda-activa-6g.dim_400x280.jpg",
    "TVS Jupiter 125": "/assets/generated/bike-tvs-jupiter-125.dim_400x280.jpg",
    "TVS Ntorq 125": "/assets/generated/bike-tvs-jupiter-125.dim_400x280.jpg",
    "Yamaha Fascino 125": "/assets/generated/bike-yamaha-r15.dim_400x280.jpg",
    "Yamaha RayZR 125": "/assets/generated/bike-yamaha-mt15.dim_400x280.jpg",
    "Suzuki Access 125":
      "/assets/generated/bike-suzuki-access-125.dim_400x280.jpg",
    "Suzuki Burgman Street 125":
      "/assets/generated/bike-suzuki-access-125.dim_400x280.jpg",
    "Hero Destini 125":
      "/assets/generated/bike-hero-splendor-plus.dim_400x280.jpg",
    "Hero Maestro Edge 125":
      "/assets/generated/bike-hero-passion-pro.dim_400x280.jpg",
    "Bajaj Chetak Electric":
      "/assets/generated/bike-bajaj-pulsar.dim_400x280.jpg",
    "Ola S1 Pro": "/assets/generated/bike-ola-s1-pro.dim_400x280.jpg",
    "Ola S1 Air": "/assets/generated/bike-ola-s1-pro.dim_400x280.jpg",
    "Ather 450X": "/assets/generated/bike-ather-450x.dim_400x280.jpg",
    "Ather 450 Apex": "/assets/generated/bike-ather-450x.dim_400x280.jpg",
    "TVS iQube Electric":
      "/assets/generated/bike-tvs-jupiter-125.dim_400x280.jpg",
    "TVS iQube S": "/assets/generated/bike-tvs-jupiter-125.dim_400x280.jpg",
    "Hero Vida V2": "/assets/generated/bike-hero-xpulse-200.dim_400x280.jpg",
    "Simple One": "/assets/generated/bike-ather-450x.dim_400x280.jpg",
    "Revolt RV400": "/assets/generated/bike-ola-s1-pro.dim_400x280.jpg",
  };
  return (
    map[name] ??
    "/assets/generated/bike-royal-enfield-classic-350.dim_400x280.jpg"
  );
}

export function formatPrice(min: bigint, max: bigint): string {
  const minL = (Number(min) / 100000).toFixed(2);
  const maxL = (Number(max) / 100000).toFixed(2);
  return `Rs. ${minL}L – Rs. ${maxL}L`;
}

export function formatRating(rating: bigint): string {
  return (Number(rating) / 10).toFixed(1);
}
