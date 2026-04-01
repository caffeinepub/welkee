import { motion } from "motion/react";
import type { Brand } from "../hooks/useQueries";

interface BrandsSectionProps {
  brands: Brand[];
  onBrandClick: (brandName: string) => void;
  activeBrand: string | null;
}

export function BrandsSection({
  brands,
  onBrandClick,
  activeBrand,
}: BrandsSectionProps) {
  return (
    <section className="py-10" data-ocid="brands.section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-welkee-text">
            Popular Brands
          </h2>
          <button
            type="button"
            className="text-welkee-blue text-sm font-medium hover:underline"
            data-ocid="brands.button"
          >
            View All Brands →
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
          {brands.map((brand, i) => {
            const isActive = activeBrand === brand.name;
            return (
              <motion.button
                key={brand.name}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onBrandClick(brand.name)}
                className={`bg-white rounded-xl border p-3 flex flex-col items-center gap-2 hover:shadow-card transition-all group ${
                  isActive
                    ? "border-welkee-blue bg-blue-50 shadow-card"
                    : "border-gray-100 hover:border-blue-100"
                }`}
                data-ocid={`brands.item.${i + 1}`}
              >
                <div className="w-full h-14 flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.url}
                    alt={brand.name}
                    className="max-h-12 max-w-full object-contain group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`text-xs font-medium text-center leading-tight ${
                    isActive
                      ? "text-welkee-blue font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {brand.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
