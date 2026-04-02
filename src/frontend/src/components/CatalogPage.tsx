import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { STATIC_BIKES, STATIC_SCOOTERS } from "../data/staticData";
import type { Bike } from "../hooks/useQueries";
import { BikeCard } from "./BikeCard";

const TABS = [
  { key: "new", label: "Bikes", count: STATIC_BIKES.length },
  { key: "scooter", label: "Scooters", count: STATIC_SCOOTERS.length },
];

interface CatalogPageProps {
  onBack: () => void;
  onBikeClick: (bike: Bike) => void;
  onLeadOpen: (bike: Bike, type: "offers" | "price") => void;
  isLoggedIn?: boolean;
  isWishlisted?: (name: string) => boolean;
  onWishlistToggle?: (name: string) => void;
  selectedCity?: string;
}

export function CatalogPage({
  onBack,
  onBikeClick,
  onLeadOpen,
  isLoggedIn,
  isWishlisted,
  onWishlistToggle,
  selectedCity,
}: CatalogPageProps) {
  const [activeTab, setActiveTab] = useState<"new" | "scooter">("new");

  const vehicles = activeTab === "new" ? STATIC_BIKES : STATIC_SCOOTERS;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#004085] font-medium mb-6 hover:underline text-sm"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#004085]">
            All Vehicles
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {activeTab === "new"
              ? "Top 20 best-selling bikes in India"
              : "Top 20 best-selling scooters in India"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-200 rounded-full p-1 gap-0 w-fit mb-8">
          {TABS.map(({ key, label, count }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key as "new" | "scooter")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === key
                  ? "bg-[#004085] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#004085]"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {vehicles.map((vehicle, i) => (
            <BikeCard
              key={vehicle.name}
              bike={vehicle}
              index={i}
              onBikeClick={onBikeClick}
              onLeadOpen={onLeadOpen}
              isLoggedIn={isLoggedIn}
              isWishlisted={isWishlisted?.(vehicle.name)}
              onWishlistToggle={onWishlistToggle}
              selectedCity={selectedCity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
