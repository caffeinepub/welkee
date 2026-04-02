import { X } from "lucide-react";
import { STATIC_ELECTRIC, STATIC_SCOOTERS } from "../data/staticData";
import type { Bike } from "../hooks/useQueries";
import { BikeCard } from "./BikeCard";

const TAB_LABELS: Record<string, string> = {
  new: "New Bikes",
  scooter: "Scooters",
  electric: "Electric",
};

interface BikesSectionProps {
  bikes: Bike[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onBikeClick: (bike: Bike) => void;
  onLeadOpen: (bike: Bike, type: "offers" | "price") => void;
  activeBrand: string | null;
  onBrandChange: (brand: string | null) => void;
  isLoggedIn?: boolean;
  isWishlisted?: (name: string) => boolean;
  onWishlistToggle?: (name: string) => void;
  selectedCity?: string;
  onViewAllBikes: () => void;
}

export function BikesSection({
  bikes,
  activeCategory,
  onCategoryChange,
  onBikeClick,
  onLeadOpen,
  activeBrand,
  onBrandChange,
  isLoggedIn,
  isWishlisted,
  onWishlistToggle,
  selectedCity,
  onViewAllBikes,
}: BikesSectionProps) {
  let displayBikes = bikes;
  if (activeCategory === "scooter") displayBikes = STATIC_SCOOTERS;
  if (activeCategory === "electric") displayBikes = STATIC_ELECTRIC;

  if (activeBrand) {
    displayBikes = displayBikes.filter(
      (b) => b.brand.toLowerCase() === activeBrand.toLowerCase(),
    );
  }

  // Show only 6 on homepage, user can click View All to see more
  const previewBikes = displayBikes.slice(0, 6);

  return (
    <section className="py-10" data-ocid="bikes.section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold text-welkee-text">
              Explore New Bikes
            </h2>
            {activeBrand && (
              <span
                className="flex items-center gap-1.5 bg-blue-50 text-welkee-blue text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100"
                data-ocid="bikes.panel"
              >
                Showing: {activeBrand} bikes
                <button
                  type="button"
                  onClick={() => onBrandChange(null)}
                  className="hover:text-red-500 transition-colors"
                  aria-label="Clear brand filter"
                  data-ocid="bikes.toggle"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>

          <div
            className="flex bg-gray-100 rounded-full p-1 gap-0"
            data-ocid="bikes.tab"
          >
            {Object.entries(TAB_LABELS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => onCategoryChange(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === key
                    ? "bg-welkee-blue text-white shadow-sm"
                    : "text-gray-600 hover:text-welkee-blue"
                }`}
                data-ocid="bikes.tab"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {previewBikes.length === 0 ? (
          <div
            className="text-center py-16 text-gray-400"
            data-ocid="bikes.empty_state"
          >
            {activeBrand
              ? `No ${activeBrand} bikes in this category.`
              : "No bikes found in this category."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewBikes.map((bike, i) => (
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

        <div className="text-center mt-8">
          <button
            type="button"
            onClick={onViewAllBikes}
            className="border-2 border-welkee-blue text-welkee-blue font-semibold px-8 py-3 rounded-full hover:bg-welkee-blue hover:text-white transition-all"
            data-ocid="bikes.button"
          >
            View All Bikes
          </button>
        </div>
      </div>
    </section>
  );
}
