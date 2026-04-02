import { useState } from "react";
import type { Vehicle } from "../data/vehicleData";
import { EMIWidget } from "./EMIWidget";
import { LeadModal } from "./LeadModal";

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export function VehicleDetailModal({
  vehicle,
  onClose,
}: VehicleDetailModalProps) {
  const [leadModal, setLeadModal] = useState<{
    open: boolean;
    type: "Get Offers" | "Check On-Road Price" | "Book a Test Ride";
  }>({ open: false, type: "Get Offers" });
  const [imgError, setImgError] = useState(false);

  if (!vehicle) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
        data-ocid="vehicle_detail.modal"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
            <div>
              <span className="text-xs font-semibold text-[#004085] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                {vehicle.brand}
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {vehicle.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
              data-ocid="vehicle_detail.close_button"
            >
              ✕
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* Image */}
            <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 h-52">
              {imgError ? (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {vehicle.type === "bike" ? "🏍️" : "🛵"}
                </div>
              ) : (
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Price + badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl font-extrabold text-[#FF8225]">
                ₹{vehicle.priceMin.toFixed(2)}L – ₹{vehicle.priceMax.toFixed(2)}
                L
              </span>
              {vehicle.isElectric && (
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ⚡ Electric
                </span>
              )}
            </div>

            {/* Specs table */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Engine", value: vehicle.cc },
                { label: "Mileage", value: vehicle.mileage },
                { label: "Power", value: vehicle.specs.power },
                { label: "Torque", value: vehicle.specs.torque },
                { label: "Weight", value: vehicle.specs.weight },
                { label: "Fuel Tank", value: vehicle.specs.fuelTank },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                    {label}
                  </p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Reviews summary */}
            <div
              className="flex items-center gap-2"
              aria-label={`Rating: ${vehicle.rating} out of 5`}
            >
              <div className="flex" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i <= Math.floor(vehicle.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-sm text-gray-900 dark:text-white">
                {vehicle.rating}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({vehicle.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* EMI Calculator */}
            <EMIWidget
              defaultPrice={(vehicle.priceMin + vehicle.priceMax) / 2}
              compact
            />

            {/* CTA buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setLeadModal({ open: true, type: "Get Offers" })}
                className="bg-[#FF8225] hover:bg-[#e06010] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                data-ocid="vehicle_detail.primary_button"
              >
                Get Offers
              </button>
              <button
                type="button"
                onClick={() =>
                  setLeadModal({ open: true, type: "Check On-Road Price" })
                }
                className="border-2 border-[#FF8225] text-[#FF8225] hover:bg-[#FF8225] hover:text-white font-bold py-3 rounded-xl transition-colors text-sm"
                data-ocid="vehicle_detail.secondary_button"
              >
                On-Road Price
              </button>
              <button
                type="button"
                onClick={() =>
                  setLeadModal({ open: true, type: "Book a Test Ride" })
                }
                className="border-2 border-[#004085] text-[#004085] dark:text-blue-400 hover:bg-[#004085] hover:text-white font-bold py-3 rounded-xl transition-colors text-sm"
                data-ocid="vehicle_detail.button"
              >
                Book Test Ride
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeadModal
        open={leadModal.open}
        onClose={() => setLeadModal((p) => ({ ...p, open: false }))}
        vehicleName={vehicle.name}
        formType={leadModal.type}
      />
    </>
  );
}
