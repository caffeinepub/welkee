import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface EngineSpecs {
  displacement: bigint;
  maxPower: string;
  transmission: string;
}

export interface PriceRange {
  priceMin: bigint;
  priceMax: bigint;
}

export interface Bike {
  engineSpecs: EngineSpecs;
  name: string;
  category: string;
  brand: string;
  rating: bigint;
  price: PriceRange;
  photoId: string;
  mileage?: string;
  buyUrl?: string;
}

export interface Brand {
  url: string;
  name: string;
}

export function useGetFeaturedBikes() {
  const { actor, isFetching } = useActor();
  return useQuery<Bike[]>({
    queryKey: ["featuredBikes"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getFeaturedBikes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllBrands() {
  const { actor, isFetching } = useActor();
  return useQuery<Brand[]>({
    queryKey: ["allBrands"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllBrands();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBikesByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Bike[]>({
    queryKey: ["bikesByCategory", category],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getBikesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}
