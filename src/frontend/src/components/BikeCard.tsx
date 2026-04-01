import { Heart, Star } from "lucide-react";
import { motion } from "motion/react";
import { formatPrice, getBikeImage } from "../data/staticData";
import type { Bike } from "../hooks/useQueries";

const STAR_POSITIONS = ["first", "second", "third", "fourth", "fifth"];

interface BikeCardProps {
  bike: Bike;
  index: number;
  onBikeClick: (bike: Bike) => void;
  onLeadOpen: (bike: Bike, type: "offers" | "price") => void;
  isWishlisted?: boolean;
  onWishlistToggle?: (bikeName: string) => void;
  isLoggedIn?: boolean;
  selectedCity?: string;
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.floor(rating);
  const hasHalf = rating - filled >= 0.4;
  return (
    <div className="flex items-center gap-0.5">
      {STAR_POSITIONS.map((pos, i) => {
        const isFilled = i < filled;
        const isHalf = !isFilled && i === filled && hasHalf;
        return (
          <Star
            key={pos}
            size={12}
            style={{ color: isFilled || isHalf ? "#FFC107" : "#D1D5DB" }}
            className={
              isFilled
                ? "fill-[#FFC107]"
                : isHalf
                  ? "fill-[#FFC107] opacity-50"
                  : "fill-gray-200"
            }
          />
        );
      })}
    </div>
  );
}

export function BikeCard({
  bike,
  index,
  onBikeClick,
  onLeadOpen,
  isWishlisted,
  onWishlistToggle,
  selectedCity,
}: BikeCardProps) {
  const image = getBikeImage(bike.name);
  const priceStr = formatPrice(bike.price.priceMin, bike.price.priceMax);
  const ratingNum = Number(bike.rating) / 10;
  const ratingStr = (Number(bike.rating) / 10).toFixed(1);
  const reviewCount = 100 + index * 37;
  const hasCity = selectedCity && selectedCity !== "Select City";

  const onRoadMin = ((Number(bike.price.priceMin) * 1.1) / 100000).toFixed(2);
  const onRoadMax = ((Number(bike.price.priceMax) * 1.1) / 100000).toFixed(2);
  const onRoadStr = `₹${onRoadMin} L - ₹${onRoadMax} L`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
      data-ocid={`bikes.item.${index + 1}`}
    >
      <button
        type="button"
        className="relative bg-gray-50 h-48 overflow-hidden cursor-pointer w-full"
        onClick={() => onBikeClick(bike)}
        aria-label={`View details for ${bike.name}`}
      >
        <img
          src={image}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star size={10} className="fill-white" />
            {ratingStr}
          </span>
        </div>

        {/* Wishlist heart - always visible */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle?.(bike.name);
          }}
          className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/80 backdrop-blur-sm text-gray-500 hover:text-red-500"
          }`}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Save to wishlist"
          }
          data-ocid={`bikes.toggle.${index + 1}`}
        >
          <Heart size={14} className={isWishlisted ? "fill-white" : ""} />
        </button>
      </button>

      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs text-welkee-blue font-semibold uppercase tracking-wide">
            {bike.brand}
          </span>
        </div>
        <button
          type="button"
          className="font-bold text-gray-900 text-base leading-tight mb-1.5 truncate cursor-pointer hover:text-welkee-blue transition-colors text-left w-full"
          onClick={() => onBikeClick(bike)}
        >
          {bike.name}
        </button>

        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={ratingNum} />
          <span className="text-xs text-gray-400">({reviewCount} reviews)</span>
        </div>

        <p className="text-xs text-gray-500 mb-3">
          {Number(bike.engineSpecs.displacement) > 0
            ? `${bike.engineSpecs.displacement}cc · ${bike.engineSpecs.maxPower}${bike.mileage ? ` · ${bike.mileage}` : ""}`
            : `${bike.engineSpecs.maxPower} · Electric${bike.mileage ? ` · ${bike.mileage}` : ""}`}
        </p>

        <div className="mb-4">
          <p className="font-bold text-gray-900 text-sm">{priceStr}</p>
          <p className="text-xs text-gray-400">Ex-showroom price</p>
          {hasCity && (
            <>
              <p className="font-semibold text-green-700 text-sm mt-1">
                {onRoadStr}
              </p>
              <p className="text-xs text-green-600">
                On-road in {selectedCity}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="w-full bg-welkee-orange hover:bg-welkee-orange-dark text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
            data-ocid={`bikes.button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onLeadOpen(bike, "offers");
            }}
          >
            Get Offers
          </button>
          <button
            type="button"
            className="w-full border-2 border-welkee-blue text-welkee-blue font-semibold text-sm py-2 rounded-xl hover:bg-welkee-blue hover:text-white transition-all"
            data-ocid={`bikes.secondary_button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onLeadOpen(bike, "price");
            }}
          >
            Check On-Road Price
          </button>
        </div>
      </div>
    </motion.div>
  );
}
