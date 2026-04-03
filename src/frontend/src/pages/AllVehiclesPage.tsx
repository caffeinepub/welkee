import { useState } from "react";
import { VehicleCard } from "../components/VehicleCard";
import { VehicleDetailModal } from "../components/VehicleDetailModal";
import { vehicles } from "../data/vehicleData";
import type { Vehicle } from "../data/vehicleData";

export function AllVehiclesPage() {
  const [tab, setTab] = useState<"all" | "bike" | "scooter">("all");
  const [search, setSearch] = useState("");
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);

  const filtered = vehicles.filter((v) => {
    const matchesTab = tab === "all" || v.type === tab;
    const matchesSearch =
      !search.trim() ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <main className="min-h-screen" data-ocid="vehicles.page">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-[#FFD700]">
            All Vehicles
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Discover top bikes and scooters in India
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex rounded-xl overflow-hidden border border-yellow-500/30 bg-black/40 backdrop-blur-sm">
            {(["all", "bike", "scooter"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                  tab === t
                    ? "bg-[#FFD700] text-black"
                    : "text-gray-300 hover:bg-yellow-500/10 hover:text-[#FFD700]"
                }`}
                data-ocid={`vehicles.${t}.tab`}
              >
                {t === "all" ? "All" : t === "bike" ? "Bikes" : "Scooters"}
              </button>
            ))}
          </div>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or brand..."
              className="w-full pl-9 pr-3 py-2.5 border border-yellow-500/30 rounded-xl text-sm bg-black/40 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              data-ocid="vehicles.search_input"
            />
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Showing <strong className="text-[#FFD700]">{filtered.length}</strong>{" "}
          vehicle{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="vehicles.empty_state">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-400">No vehicles match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((v, i) => (
              <div key={v.id} data-ocid={`vehicles.item.${i + 1}`}>
                <VehicleCard vehicle={v} onViewDetail={setDetailVehicle} />
              </div>
            ))}
          </div>
        )}
      </div>

      <VehicleDetailModal
        vehicle={detailVehicle}
        onClose={() => setDetailVehicle(null)}
      />
    </main>
  );
}
