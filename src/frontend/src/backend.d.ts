import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PriceRange {
    priceMax: bigint;
    priceMin: bigint;
}
export interface EngineSpecs {
    displacement: bigint;
    emissionType: string;
    maxPower: string;
    coolingSystem: string;
    transmission: string;
    fuelSupplyType: string;
    engineType: string;
}
export interface Brand {
    url: string;
    name: string;
}
export interface Bike {
    engineSpecs: EngineSpecs;
    name: string;
    category: string;
    brand: string;
    rating: bigint;
    price: PriceRange;
    photoId: string;
}
export interface Lead {
    id: bigint;
    name: string;
    phone: string;
    city: string;
    bikeName: string;
    formType: string;
    timestamp: bigint;
}
export type RegisterResult = { ok: bigint } | { err: string };
export type LoginResult = { ok: bigint } | { err: string };
export interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    addBike(bike: Bike): Promise<bigint>;
    addBrand(brand: Brand): Promise<bigint>;
    getAllBikes(): Promise<Array<Bike>>;
    getAllBrands(): Promise<Array<Brand>>;
    getBike(bikeId: bigint): Promise<Bike | null>;
    getBikesByBrand(brandName: string): Promise<Array<Bike>>;
    getBikesByCategory(category: string): Promise<Array<Bike>>;
    getBikesByPriceRange(minPrice: bigint, maxPrice: bigint): Promise<Array<Bike>>;
    getBrand(brandId: bigint): Promise<Brand | null>;
    getCategories(): Promise<Array<string>>;
    getFeaturedBikes(): Promise<Array<Bike>>;
    submitLead(name: string, phone: string, city: string, bikeName: string, formType: string): Promise<bigint>;
    getLeads(): Promise<Array<Lead>>;
    registerUser(email: string, password: string): Promise<RegisterResult>;
    loginUser(email: string, password: string): Promise<LoginResult>;
}
