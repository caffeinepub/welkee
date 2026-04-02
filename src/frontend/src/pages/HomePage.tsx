import { useState } from "react";
import { EMIWidget } from "../components/EMIWidget";
import { LeadModal } from "../components/LeadModal";
import { VehicleCard } from "../components/VehicleCard";
import { VehicleDetailModal } from "../components/VehicleDetailModal";
import { bikes, scooters, vehicles } from "../data/vehicleData";
import type { Vehicle } from "../data/vehicleData";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [search, setSearch] = useState("");
  const [leadModal, setLeadModal] = useState<{
    open: boolean;
    vehicle: Vehicle | null;
    type: "Get Offers" | "Check On-Road Price" | "Book a Test Ride";
  }>({ open: false, vehicle: null, type: "Get Offers" });
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);
  const [emiOpen, setEmiOpen] = useState(false);

  const searchResults =
    search.trim().length >= 2
      ? vehicles.filter(
          (v) =>
            v.name.toLowerCase().includes(search.toLowerCase()) ||
            v.brand.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  const featuredBikes = bikes.slice(0, 3);
  const featuredScooters = scooters.slice(0, 3);

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Page Header */}
      <section className="bg-[#004085] py-10 px-4" data-ocid="home.section">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
            Welkee: Drive Your Dreams.{" "}
            <span className="text-[#FF8225]">
              India&apos;s Most Trusted Hub for Real Bikes &amp; Scooters.
            </span>
          </h1>
          <p className="text-blue-200 text-base mb-6">
            Transparent Pricing. Verified Specifications. Your Journey Starts
            Here.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <span className="pl-4 text-gray-400 text-xl">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bikes, scooters, brands..."
                className="flex-1 px-3 py-3.5 text-gray-900 dark:text-white bg-transparent text-sm focus:outline-none"
                data-ocid="home.search_input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="pr-4 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            {/* Search dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-30 max-h-64 overflow-y-auto">
                {searchResults.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setDetailVehicle(v);
                      setSearch("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 text-left border-b border-gray-50 dark:border-gray-700 last:border-0"
                    data-ocid="home.link"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 flex-shrink-0">
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {v.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {v.brand} • ₹{v.priceMin.toFixed(2)}L
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {search.trim().length >= 2 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-30 p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                No vehicles found for &quot;{search}&quot;
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EMI Calculator button */}
      <section className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <button
          type="button"
          onClick={() => setEmiOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-100 dark:border-gray-700 hover:border-[#FF8225] transition-colors group"
          data-ocid="emi.toggle"
        >
          <span className="flex items-center gap-3 font-bold text-gray-900 dark:text-white">
            <span className="text-2xl">🧮</span>
            <span>EMI Calculator</span>
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              — Calculate your monthly payment
            </span>
          </span>
          <span className="text-[#FF8225] text-lg font-bold">
            {emiOpen ? "▲" : "▼"}
          </span>
        </button>
        {emiOpen && (
          <div className="mt-2">
            <EMIWidget />
          </div>
        )}
      </section>

      {/* Featured Grid: 3 Bikes Left | 3 Scooters Right */}
      <section className="max-w-5xl mx-auto px-4 py-6" data-ocid="home.section">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
          Featured Vehicles
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bikes — Left */}
          <div>
            <h3 className="text-base font-bold text-[#004085] dark:text-blue-400 mb-4 flex items-center gap-2">
              🏍️ Bikes
            </h3>
            <div className="space-y-4">
              {featuredBikes.map((v, i) => (
                <div key={v.id} data-ocid={`home.item.${i + 1}`}>
                  <VehicleCard
                    vehicle={v}
                    onGetOffers={(vehicle) =>
                      setLeadModal({ open: true, vehicle, type: "Get Offers" })
                    }
                    onBookRide={(vehicle) =>
                      setLeadModal({
                        open: true,
                        vehicle,
                        type: "Book a Test Ride",
                      })
                    }
                    onViewDetail={setDetailVehicle}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Scooters — Right */}
          <div>
            <h3 className="text-base font-bold text-[#004085] dark:text-blue-400 mb-4 flex items-center gap-2">
              🛵 Scooters
            </h3>
            <div className="space-y-4">
              {featuredScooters.map((v, i) => (
                <div key={v.id} data-ocid={`home.item.${i + 4}`}>
                  <VehicleCard
                    vehicle={v}
                    onGetOffers={(vehicle) =>
                      setLeadModal({ open: true, vehicle, type: "Get Offers" })
                    }
                    onBookRide={(vehicle) =>
                      setLeadModal({
                        open: true,
                        vehicle,
                        type: "Book a Test Ride",
                      })
                    }
                    onViewDetail={setDetailVehicle}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Vehicles CTA */}
      <div className="pb-10 text-center">
        <button
          type="button"
          onClick={() => onNavigate("all-vehicles")}
          className="inline-flex items-center gap-3 bg-[#FF8225] hover:bg-[#e06010] text-white font-extrabold text-lg px-12 py-4 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          data-ocid="home.primary_button"
        >
          Browse All Vehicles →
        </button>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-3">
          10 real vehicles — Bikes &amp; Scooters
        </p>
      </div>

      {/* Lead modal */}
      <LeadModal
        open={leadModal.open}
        onClose={() => setLeadModal((p) => ({ ...p, open: false }))}
        vehicleName={leadModal.vehicle?.name ?? ""}
        formType={leadModal.type}
      />

      {/* Detail modal */}
      <VehicleDetailModal
        vehicle={detailVehicle}
        onClose={() => setDetailVehicle(null)}
      />
    </main>
  );
}
