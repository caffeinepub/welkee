import { ArrowLeft, Search, X } from "lucide-react";
import { useState } from "react";
import {
  STATIC_BIKES,
  STATIC_ELECTRIC,
  STATIC_SCOOTERS,
} from "../data/staticData";
import type { Bike } from "../hooks/useQueries";
import { BikeCard } from "./BikeCard";

const ALL_BIKES = [...STATIC_BIKES, ...STATIC_SCOOTERS, ...STATIC_ELECTRIC];

const CATEGORY_TABS = [
  { key: "all", label: "All" },
  { key: "new", label: "Bikes" },
  { key: "scooter", label: "Scooters" },
  { key: "electric", label: "Electric" },
];

interface AllBikesPageProps {
  onBack: () => void;
  onBikeClick: (bike: Bike) => void;
  onLeadOpen: (bike: Bike, type: "offers" | "price") => void;
  isLoggedIn?: boolean;
  isWishlisted?: (name: string) => boolean;
  onWishlistToggle?: (name: string) => void;
  selectedCity?: string;
}

export function AllBikesPage({
  onBack,
  onBikeClick,
  onLeadOpen,
  isLoggedIn,
  isWishlisted,
  onWishlistToggle,
  selectedCity,
}: AllBikesPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  const allBrands = Array.from(new Set(ALL_BIKES.map((b) => b.brand))).sort();

  const filtered = ALL_BIKES.filter((b) => {
    const catMatch = activeCategory === "all" || b.category === activeCategory;
    const brandMatch = !activeBrand || b.brand === activeBrand;
    const searchMatch =
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && brandMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#FFD700] font-medium mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#FFD700]">
              All Bikes & Scooters
            </h1>
            <p className="text-[#FFD700] mt-1">
              {filtered.length} vehicles found
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search bikes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-yellow-500/30 rounded-full text-sm focus:outline-none focus:border-[#FFD700] bg-black/40 text-white placeholder:text-gray-400 w-56"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-black/40 rounded-full p-1 gap-0 w-fit mb-4">
          {CATEGORY_TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === key
                  ? "bg-[#FFD700] text-black shadow-sm"
                  : "text-[#FFD700]/70 hover:text-[#FFD700]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Brand Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allBrands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() =>
                setActiveBrand((prev) => (prev === brand ? null : brand))
              }
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeBrand === brand
                  ? "bg-[#FFD700] text-black border-[#FFD700]"
                  : "bg-transparent text-[#FFD700]/70 border-yellow-500/40 hover:border-[#FFD700] hover:text-[#FFD700]"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No bikes found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((bike, i) => (
              <BikeCard
                key={bike.name}
                bike={bike}
                index={i}
                onBikeClick={onBikeClick}
                onLeadOpen={onLeadOpen}
                isLoggedIn={isLoggedIn}
                isWishlisted={isWishlisted?.(bike.name)}
                onWishlistToggle={onWishlistToggle}
                selectedCity={selectedCity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
