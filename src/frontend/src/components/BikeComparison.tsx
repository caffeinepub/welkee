import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  STATIC_BIKES,
  formatPrice,
  formatRating,
  getBikeImage,
} from "../data/staticData";
import type { Bike } from "../hooks/useQueries";

function SpecRow({
  label,
  val1,
  val2,
  alt,
}: {
  label: string;
  val1: string;
  val2: string;
  alt: boolean;
}) {
  return (
    <tr className={alt ? "bg-gray-50" : "bg-white"}>
      <td className="px-4 py-3 text-sm font-medium text-gray-600 w-1/3">
        {label}
      </td>
      <td className="px-4 py-3 text-sm text-gray-800 font-semibold w-1/3 text-center">
        {val1}
      </td>
      <td className="px-4 py-3 text-sm text-gray-800 font-semibold w-1/3 text-center">
        {val2}
      </td>
    </tr>
  );
}

function BikeSelector({
  label,
  selected,
  onChange,
}: {
  label: string;
  selected: Bike | null;
  onChange: (b: Bike | null) => void;
}) {
  return (
    <div className="flex-1 bg-gray-50 rounded-2xl p-5 flex flex-col gap-4 border border-gray-100">
      <p className="text-xs font-bold uppercase tracking-widest text-welkee-blue">
        {label}
      </p>
      <select
        value={selected?.name ?? ""}
        onChange={(e) => {
          const found = STATIC_BIKES.find((b) => b.name === e.target.value);
          onChange(found ?? null);
        }}
        className="w-full h-10 rounded-lg border border-gray-200 text-gray-700 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-welkee-blue bg-white"
        data-ocid="compare.select"
      >
        <option value="">Select a bike...</option>
        {STATIC_BIKES.map((b) => (
          <option key={b.name} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      {selected ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={getBikeImage(selected.name)}
            alt={selected.name}
            className="w-full h-36 object-cover rounded-xl"
          />
          <div className="text-center">
            <span className="inline-block bg-welkee-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-1">
              {selected.brand}
            </span>
            <p className="font-bold text-gray-900 text-sm">{selected.name}</p>
          </div>
        </div>
      ) : (
        <div
          className="flex-1 flex items-center justify-center h-36 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm"
          data-ocid="compare.empty_state"
        >
          No bike selected
        </div>
      )}
    </div>
  );
}

export function BikeComparison() {
  const [bike1, setBike1] = useState<Bike | null>(null);
  const [bike2, setBike2] = useState<Bike | null>(null);
  const [compared, setCompared] = useState<[Bike, Bike] | null>(null);

  const canCompare = bike1 !== null && bike2 !== null;

  const handleCompare = () => {
    if (bike1 && bike2) setCompared([bike1, bike2]);
  };

  return (
    <section className="py-12 px-4" data-ocid="compare.section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-welkee-text mb-1">
          Compare Bikes Side by Side
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Select two bikes and compare specs, price, and performance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <BikeSelector label="Bike 1" selected={bike1} onChange={setBike1} />
          <div className="hidden sm:flex items-center justify-center">
            <span className="w-10 h-10 bg-welkee-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
              VS
            </span>
          </div>
          <BikeSelector label="Bike 2" selected={bike2} onChange={setBike2} />
        </div>

        {canCompare && (
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={handleCompare}
              className="bg-welkee-blue hover:bg-welkee-blue-dark text-white font-bold px-10 py-3 rounded-full transition-colors shadow-md"
              data-ocid="compare.primary_button"
            >
              Compare Now
            </button>
          </div>
        )}

        {compared && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-card"
            data-ocid="compare.table"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-welkee-blue text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Spec
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    {compared[0].name}
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    {compared[1].name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <SpecRow
                  label="Price Range"
                  val1={formatPrice(
                    compared[0].price.priceMin,
                    compared[0].price.priceMax,
                  )}
                  val2={formatPrice(
                    compared[1].price.priceMin,
                    compared[1].price.priceMax,
                  )}
                  alt={false}
                />
                <SpecRow
                  label="Engine"
                  val1={
                    Number(compared[0].engineSpecs.displacement) > 0
                      ? `${compared[0].engineSpecs.displacement}cc`
                      : "Electric"
                  }
                  val2={
                    Number(compared[1].engineSpecs.displacement) > 0
                      ? `${compared[1].engineSpecs.displacement}cc`
                      : "Electric"
                  }
                  alt={true}
                />
                <SpecRow
                  label="Max Power"
                  val1={compared[0].engineSpecs.maxPower}
                  val2={compared[1].engineSpecs.maxPower}
                  alt={false}
                />
                <SpecRow
                  label="Transmission"
                  val1={compared[0].engineSpecs.transmission}
                  val2={compared[1].engineSpecs.transmission}
                  alt={true}
                />
                <tr className="bg-white">
                  <td className="px-4 py-3 text-sm font-medium text-gray-600">
                    Rating
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-800">
                      <Star
                        size={13}
                        className="fill-[#FFC107] text-[#FFC107]"
                      />
                      {formatRating(compared[0].rating)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-800">
                      <Star
                        size={13}
                        className="fill-[#FFC107] text-[#FFC107]"
                      />
                      {formatRating(compared[1].rating)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
