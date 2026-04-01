import type { Bike, Brand } from "../hooks/useQueries";

export const STATIC_BIKES: Bike[] = [
  {
    name: "Royal Enfield Bullet 350",
    brand: "Royal Enfield",
    category: "new",
    rating: BigInt(42),
    price: { priceMin: BigInt(185000), priceMax: BigInt(210000) },
    photoId: "bike-royal-enfield-bullet",
    mileage: "41 kmpl",
    engineSpecs: {
      displacement: BigInt(349),
      maxPower: "20.2 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Honda CB Shine",
    brand: "Honda",
    category: "new",
    rating: BigInt(44),
    price: { priceMin: BigInt(78000), priceMax: BigInt(88000) },
    photoId: "bike-honda-cb-shine",
    mileage: "65 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "10.6 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "Yamaha YZF R15",
    brand: "Yamaha",
    category: "new",
    rating: BigInt(46),
    price: { priceMin: BigInt(168000), priceMax: BigInt(182000) },
    photoId: "bike-yamaha-r15",
    mileage: "45 kmpl",
    engineSpecs: {
      displacement: BigInt(155),
      maxPower: "18.4 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "Bajaj Pulsar 220F",
    brand: "Bajaj",
    category: "new",
    rating: BigInt(43),
    price: { priceMin: BigInt(137000), priceMax: BigInt(145000) },
    photoId: "bike-bajaj-pulsar",
    mileage: "35 kmpl",
    engineSpecs: {
      displacement: BigInt(220),
      maxPower: "20.93 bhp",
      transmission: "5-speed",
    },
  },
  {
    name: "KTM Duke 390",
    brand: "KTM",
    category: "new",
    rating: BigInt(47),
    price: { priceMin: BigInt(293000), priceMax: BigInt(310000) },
    photoId: "bike-ktm-duke",
    mileage: "30 kmpl",
    engineSpecs: {
      displacement: BigInt(373),
      maxPower: "43.5 bhp",
      transmission: "6-speed",
    },
  },
  {
    name: "TVS Apache RTR 200",
    brand: "TVS",
    category: "new",
    rating: BigInt(44),
    price: { priceMin: BigInt(135000), priceMax: BigInt(145000) },
    photoId: "bike-tvs-apache",
    mileage: "35 kmpl",
    engineSpecs: {
      displacement: BigInt(197),
      maxPower: "20.8 bhp",
      transmission: "5-speed",
    },
  },
];

export const STATIC_SCOOTERS: Bike[] = [
  {
    name: "Honda Activa 6G",
    brand: "Honda",
    category: "scooter",
    rating: BigInt(45),
    price: { priceMin: BigInt(74000), priceMax: BigInt(80000) },
    photoId: "bike-honda-cb-shine",
    mileage: "60 kmpl",
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
    rating: BigInt(43),
    price: { priceMin: BigInt(80000), priceMax: BigInt(88000) },
    photoId: "bike-tvs-apache",
    mileage: "52 kmpl",
    engineSpecs: {
      displacement: BigInt(124),
      maxPower: "8.15 bhp",
      transmission: "CVT",
    },
  },
  {
    name: "Yamaha Fascino 125",
    brand: "Yamaha",
    category: "scooter",
    rating: BigInt(44),
    price: { priceMin: BigInt(77000), priceMax: BigInt(84000) },
    photoId: "bike-yamaha-r15",
    mileage: "55 kmpl",
    engineSpecs: {
      displacement: BigInt(125),
      maxPower: "8.2 bhp",
      transmission: "CVT",
    },
  },
];

export const STATIC_ELECTRIC: Bike[] = [
  {
    name: "Ola S1 Pro",
    brand: "Ola",
    category: "electric",
    rating: BigInt(40),
    price: { priceMin: BigInt(130000), priceMax: BigInt(145000) },
    photoId: "bike-ktm-duke",
    mileage: "181 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "8.5 kW",
      transmission: "Direct",
    },
  },
  {
    name: "Ather 450X",
    brand: "Ather",
    category: "electric",
    rating: BigInt(44),
    price: { priceMin: BigInt(145000), priceMax: BigInt(160000) },
    photoId: "bike-bajaj-pulsar",
    mileage: "146 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "6 kW",
      transmission: "Direct",
    },
  },
  {
    name: "Bajaj Chetak",
    brand: "Bajaj",
    category: "electric",
    rating: BigInt(42),
    price: { priceMin: BigInt(135000), priceMax: BigInt(148000) },
    photoId: "bike-royal-enfield-bullet",
    mileage: "126 km range",
    engineSpecs: {
      displacement: BigInt(0),
      maxPower: "4.08 kW",
      transmission: "Direct",
    },
  },
];

export const STATIC_BRANDS: Brand[] = [
  {
    name: "Royal Enfield",
    url: "/assets/generated/brand-royal-enfield-transparent.dim_200x120.png",
  },
  {
    name: "Honda",
    url: "/assets/generated/brand-honda-transparent.dim_200x120.png",
  },
  {
    name: "Yamaha",
    url: "/assets/generated/brand-yamaha-transparent.dim_200x120.png",
  },
  {
    name: "Bajaj",
    url: "/assets/generated/brand-bajaj-transparent.dim_200x120.png",
  },
  {
    name: "KTM",
    url: "/assets/generated/brand-ktm-transparent.dim_200x120.png",
  },
  {
    name: "TVS",
    url: "/assets/generated/brand-tvs-transparent.dim_200x120.png",
  },
  {
    name: "Hero",
    url: "/assets/generated/brand-hero-transparent.dim_200x120.png",
  },
];

export function getBikeImage(name: string): string {
  const map: Record<string, string> = {
    "Royal Enfield Bullet 350":
      "/assets/generated/bike-royal-enfield-bullet.dim_400x280.jpg",
    "Honda CB Shine": "/assets/generated/bike-honda-cb-shine.dim_400x280.jpg",
    "Yamaha YZF R15": "/assets/generated/bike-yamaha-r15.dim_400x280.jpg",
    "Bajaj Pulsar 220F": "/assets/generated/bike-bajaj-pulsar.dim_400x280.jpg",
    "KTM Duke 390": "/assets/generated/bike-ktm-duke.dim_400x280.jpg",
    "TVS Apache RTR 200": "/assets/generated/bike-tvs-apache.dim_400x280.jpg",
    "Honda Activa 6G": "/assets/generated/bike-honda-cb-shine.dim_400x280.jpg",
    "TVS Jupiter 125": "/assets/generated/bike-tvs-apache.dim_400x280.jpg",
    "Yamaha Fascino 125": "/assets/generated/bike-yamaha-r15.dim_400x280.jpg",
    "Ola S1 Pro": "/assets/generated/bike-ktm-duke.dim_400x280.jpg",
    "Ather 450X": "/assets/generated/bike-bajaj-pulsar.dim_400x280.jpg",
    "Bajaj Chetak":
      "/assets/generated/bike-royal-enfield-bullet.dim_400x280.jpg",
  };
  return (
    map[name] ?? "/assets/generated/bike-royal-enfield-bullet.dim_400x280.jpg"
  );
}

export function formatPrice(min: bigint, max: bigint): string {
  const minL = (Number(min) / 100000).toFixed(2);
  const maxL = (Number(max) / 100000).toFixed(2);
  return `₹${minL} L - ₹${maxL} L`;
}

export function formatRating(rating: bigint): string {
  return (Number(rating) / 10).toFixed(1);
}
