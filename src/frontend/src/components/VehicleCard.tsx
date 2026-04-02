import { useState } from "react";
import { useCityContext } from "../context/CityContext";
import type { Vehicle } from "../data/vehicleData";
import { recordClick } from "../utils/clickStats";
import { MobileLeadPopup } from "./MobileLeadPopup";

interface VehicleCardProps {
  vehicle: Vehicle;
  onGetOffers?: (v: Vehicle) => void;
  onBookRide?: (v: Vehicle) => void;
  onViewDetail: (v: Vehicle) => void;
}

export function VehicleCard({ vehicle, onViewDetail }: VehicleCardProps) {
  const { selectedCity } = useCityContext();
  const [imgError, setImgError] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  const onRoadPrice = (vehicle.priceMin * 1.1).toFixed(2);

  const whatsappText = encodeURIComponent(
    `Check out ${vehicle.brand} ${vehicle.name} at ₹${vehicle.priceMin.toFixed(2)}L - ₹${vehicle.priceMax.toFixed(2)}L on WELKEE! https://welkee.icp0.io`,
  );

  const handleBuyNow = () => {
    recordClick(vehicle.id, "buyNow");
    setShowLeadPopup(true);
  };

  const handleWhatsAppClick = () => {
    recordClick(vehicle.id, "whatsapp");
    setShowWhatsAppPopup(true);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <button
          type="button"
          onClick={() => onViewDetail(vehicle)}
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 w-full text-left"
          style={{ height: 200 }}
          aria-label={`View details for ${vehicle.name}`}
        >
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600">
              {vehicle.type === "bike" ? "🏙️" : "🛵"}
            </div>
          ) : (
            <img
              src={vehicle.image}
              alt={vehicle.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className="bg-[#004085] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {vehicle.brand}
            </span>
            {vehicle.isElectric && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                ⚡ Electric
              </span>
            )}
          </div>
          <div className="absolute top-2 right-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                vehicle.type === "bike"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
              }`}
            >
              {vehicle.type === "bike" ? "Bike" : "Scooter"}
            </span>
          </div>
        </button>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <button
            type="button"
            onClick={() => onViewDetail(vehicle)}
            className="text-left font-bold text-gray-900 dark:text-white text-base hover:text-[#004085] dark:hover:text-blue-400 transition-colors mb-2"
          >
            {vehicle.name}
          </button>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3 text-xs">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <span aria-hidden="true">⚙️</span>
              <span>{vehicle.cc}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <span aria-hidden="true">{vehicle.isElectric ? "🔋" : "⛽"}</span>
              <span>{vehicle.mileage}</span>
            </div>
          </div>

          <div
            className="flex items-center gap-1 mb-2"
            aria-label={`Rating: ${vehicle.rating} out of 5`}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i <= Math.floor(vehicle.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              {vehicle.rating} ({vehicle.reviews.toLocaleString()})
            </span>
          </div>

          <div className="text-[#FF8225] font-extrabold text-base mb-1">
            ₹{vehicle.priceMin.toFixed(2)}L &ndash; ₹
            {vehicle.priceMax.toFixed(2)}L
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            On-road {selectedCity}:{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              ₹{onRoadPrice}L
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-auto space-y-2">
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center text-sm font-semibold py-2.5 px-3 rounded-lg bg-[#FF8225] hover:bg-[#e06010] text-white transition-colors"
              data-ocid="vehicle.primary_button"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
              data-ocid="vehicle.whatsapp_button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Share
            </button>
          </div>
        </div>
      </div>

      {showLeadPopup && (
        <MobileLeadPopup
          vehicleName={vehicle.name}
          vehicleId={vehicle.id}
          brandUrl={vehicle.buyUrl}
          onClose={() => setShowLeadPopup(false)}
        />
      )}

      {showWhatsAppPopup && (
        <MobileLeadPopup
          vehicleName={vehicle.name}
          vehicleId={vehicle.id}
          brandUrl=""
          whatsappUrl={`https://wa.me/?text=${whatsappText}`}
          onClose={() => setShowWhatsAppPopup(false)}
        />
      )}
    </>
  );
}
