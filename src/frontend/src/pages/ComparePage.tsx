import { useCompare } from "../context/CompareContext";
import type { Vehicle } from "../data/vehicleData";

interface ComparePageProps {
  onNavigate: (page: string) => void;
}

const compareRows: { label: string; key: keyof Vehicle | string }[] = [
  { label: "Brand", key: "brand" },
  { label: "Type", key: "type" },
  { label: "Engine / Battery", key: "cc" },
  { label: "Mileage / Range", key: "mileage" },
  { label: "Price Range", key: "_price" },
  { label: "Power", key: "_power" },
  { label: "Torque", key: "_torque" },
  { label: "Weight", key: "_weight" },
  { label: "Fuel Tank", key: "_fuelTank" },
  { label: "Rating", key: "_rating" },
];

function getRowValue(v: Vehicle, key: string): string {
  switch (key) {
    case "_price":
      return `\u20b9${v.priceMin.toFixed(2)}L \u2013 \u20b9${v.priceMax.toFixed(2)}L`;
    case "_power":
      return v.specs.power;
    case "_torque":
      return v.specs.torque;
    case "_weight":
      return v.specs.weight;
    case "_fuelTank":
      return v.specs.fuelTank;
    case "_rating":
      return `${v.rating} \u2605 (${v.reviews.toLocaleString()} reviews)`;
    case "type":
      return v.type.charAt(0).toUpperCase() + v.type.slice(1);
    default:
      return String(v[key as keyof Vehicle] ?? "-");
  }
}

export function ComparePage({ onNavigate }: ComparePageProps) {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <main
        className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center"
        data-ocid="compare.empty_state"
      >
        <div className="text-center px-4">
          <p className="text-6xl mb-4">⚖️</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No Vehicles to Compare
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Add up to 3 vehicles from the catalog to compare them side by side.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("all-vehicles")}
            className="bg-[#004085] hover:bg-[#002d5e] text-white font-bold px-8 py-3 rounded-xl transition-colors"
            data-ocid="compare.primary_button"
          >
            Browse Vehicles
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      data-ocid="compare.page"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Compare Bikes
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Side-by-side comparison
            </p>
          </div>
          <button
            type="button"
            onClick={clearCompare}
            className="text-sm font-semibold text-red-500 hover:text-red-700 border border-red-300 hover:border-red-500 px-4 py-2 rounded-lg transition-colors"
            data-ocid="compare.delete_button"
          >
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" data-ocid="compare.table">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-tl-xl w-36">
                  Feature
                </th>
                {compareList.map((v) => (
                  <th
                    key={v.id}
                    className="py-3 px-4 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-sm text-gray-900 dark:text-white text-center">
                        {v.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(v.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                        data-ocid="compare.delete_button"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, rowIdx) => (
                <tr
                  key={row.key}
                  className={
                    rowIdx % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  }
                  data-ocid="compare.row"
                >
                  <td className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {row.label}
                  </td>
                  {compareList.map((v) => (
                    <td
                      key={v.id}
                      className="py-3 px-4 text-sm text-gray-900 dark:text-white border-l border-gray-200 dark:border-gray-700 text-center"
                    >
                      {getRowValue(v, row.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => onNavigate("all-vehicles")}
            className="text-sm font-semibold text-[#004085] dark:text-blue-400 hover:underline"
            data-ocid="compare.link"
          >
            + Add more vehicles
          </button>
        </div>
      </div>
    </main>
  );
}
