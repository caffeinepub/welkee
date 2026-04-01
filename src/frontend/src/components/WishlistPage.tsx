import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "motion/react";
import {
  STATIC_BIKES,
  STATIC_ELECTRIC,
  STATIC_SCOOTERS,
  formatPrice,
  getBikeImage,
} from "../data/staticData";
import type { Bike } from "../hooks/useQueries";

const ALL_BIKES = [...STATIC_BIKES, ...STATIC_SCOOTERS, ...STATIC_ELECTRIC];

interface WishlistPageProps {
  wishlist: string[];
  onBack: () => void;
  onBikeClick: (bike: Bike) => void;
  onWishlistToggle: (name: string) => void;
  selectedCity?: string;
}

export function WishlistPage({
  wishlist,
  onBack,
  onBikeClick,
  onWishlistToggle,
  selectedCity,
}: WishlistPageProps) {
  const wishlisted = ALL_BIKES.filter((b) => wishlist.includes(b.name));
  const hasCity = selectedCity && selectedCity !== "Select City";

  function onRoadPrice(min: bigint, max: bigint) {
    const minOnRoad = ((Number(min) * 1.1) / 100000).toFixed(2);
    const maxOnRoad = ((Number(max) * 1.1) / 100000).toFixed(2);
    return `₹${minOnRoad} L - ₹${maxOnRoad} L`;
  }

  return (
    <div className="min-h-screen bg-welkee-gray" data-ocid="wishlist.page">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-welkee-blue hover:underline font-medium"
            data-ocid="wishlist.button"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Heart size={24} className="text-red-500 fill-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          {wishlisted.length > 0 && (
            <span className="bg-red-50 text-red-500 text-sm font-semibold px-3 py-1 rounded-full border border-red-100">
              {wishlisted.length} bike{wishlisted.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {wishlisted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-card p-16 text-center"
            data-ocid="wishlist.empty_state"
          >
            <Heart size={56} className="text-gray-200 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-400 mb-2">
              Your wishlist is empty
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Browse bikes and tap the heart icon to save your favorites.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="bg-welkee-orange text-white font-semibold px-8 py-3 rounded-xl hover:bg-welkee-orange-dark transition-colors"
              data-ocid="wishlist.cta_button"
            >
              Explore Bikes
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlisted.map((bike, i) => {
              const image = getBikeImage(bike.name);
              const exPrice = formatPrice(
                bike.price.priceMin,
                bike.price.priceMax,
              );
              const onRoad = onRoadPrice(
                bike.price.priceMin,
                bike.price.priceMax,
              );
              return (
                <motion.div
                  key={bike.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
                  data-ocid={`wishlist.item.${i + 1}`}
                >
                  <button
                    type="button"
                    className="relative bg-gray-50 h-48 overflow-hidden cursor-pointer w-full"
                    onClick={() => onBikeClick(bike)}
                  >
                    <img
                      src={image}
                      alt={bike.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onWishlistToggle(bike.name);
                      }}
                      className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-red-500 text-white shadow-sm"
                      aria-label="Remove from wishlist"
                      data-ocid={`wishlist.toggle.${i + 1}`}
                    >
                      <Heart size={14} className="fill-white" />
                    </button>
                  </button>
                  <div className="p-4">
                    <span className="text-xs text-welkee-blue font-semibold uppercase tracking-wide">
                      {bike.brand}
                    </span>
                    <button
                      type="button"
                      className="font-bold text-gray-900 text-base leading-tight mb-2 mt-1 truncate cursor-pointer hover:text-welkee-blue transition-colors text-left w-full block"
                      onClick={() => onBikeClick(bike)}
                    >
                      {bike.name}
                    </button>
                    <p className="text-xs text-gray-500 mb-3">
                      {Number(bike.engineSpecs.displacement) > 0
                        ? `${bike.engineSpecs.displacement}cc · ${bike.engineSpecs.maxPower}`
                        : `${bike.engineSpecs.maxPower} · Electric`}
                    </p>
                    <div className="mb-3">
                      <p className="font-bold text-gray-900 text-sm">
                        {exPrice}
                      </p>
                      <p className="text-xs text-gray-400">Ex-showroom price</p>
                      {hasCity && (
                        <>
                          <p className="font-semibold text-green-700 text-sm mt-1">
                            {onRoad}
                          </p>
                          <p className="text-xs text-green-600">
                            On-road price in {selectedCity}
                          </p>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onBikeClick(bike)}
                      className="w-full bg-welkee-orange hover:bg-welkee-orange-dark text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                      data-ocid={`wishlist.button.${i + 1}`}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
