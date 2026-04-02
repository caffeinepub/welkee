import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { STATIC_BRANDS } from "../data/staticData";

interface AllBrandsPageProps {
  onBack: () => void;
  onBrandClick: (brandName: string) => void;
}

export function AllBrandsPage({ onBack, onBrandClick }: AllBrandsPageProps) {
  return (
    <div className="min-h-screen bg-welkee-gray">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-welkee-blue font-medium mb-6 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <h1 className="text-3xl font-bold text-welkee-text mb-2">All Brands</h1>
        <p className="text-gray-500 mb-8">
          Explore all two-wheeler brands available in India
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {STATIC_BRANDS.map((brand, i) => (
            <motion.button
              key={brand.name}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => {
                onBrandClick(brand.name);
                onBack();
              }}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-3 hover:shadow-lg hover:border-blue-200 transition-all group"
            >
              <div className="w-full h-20 flex items-center justify-center overflow-hidden">
                <img
                  src={brand.url}
                  alt={brand.name}
                  className="max-h-16 max-w-full object-contain group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-welkee-blue transition-colors">
                {brand.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
