import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: "slide-blue",
    overlay:
      "linear-gradient(to right, rgba(10,25,60,0.82) 0%, rgba(10,25,60,0.50) 60%, rgba(10,25,60,0.15) 100%)",
    tagline: "India's #1 Bike Marketplace",
    headline: "Find the Right",
    highlight: "Bike",
    sub: "Compare prices, specs, and reviews across 500+ models.",
  },
  {
    id: "slide-teal",
    overlay:
      "linear-gradient(to right, rgba(10,60,50,0.82) 0%, rgba(10,60,50,0.50) 60%, rgba(10,60,50,0.15) 100%)",
    tagline: "Best Electric Scooters 2024",
    headline: "Go Green,",
    highlight: "Go Electric",
    sub: "Discover the latest electric bikes with unmatched range and performance.",
  },
  {
    id: "slide-maroon",
    overlay:
      "linear-gradient(to right, rgba(60,10,20,0.82) 0%, rgba(60,10,20,0.50) 60%, rgba(60,10,20,0.15) 100%)",
    tagline: "Exclusive Festive Offers",
    headline: "Unbeatable",
    highlight: "Deals Today",
    sub: "Get the best on-road prices, EMI offers, and exchange bonuses.",
  },
];

const BUDGET_OPTIONS = [
  "All Budgets",
  "Under \u20b950K",
  "\u20b950K\u20131L",
  "\u20b91L\u20132L",
  "Above \u20b92L",
];
const CC_OPTIONS = [
  "All Engines",
  "Under 150cc",
  "150\u2013300cc",
  "300\u2013500cc",
  "Above 500cc",
];

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [slide, setSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("All Budgets");
  const [displacement, setDisplacement] = useState("All Engines");

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide((s) => (s + 1) % SLIDES.length);

  const handleSearch = () => {
    onSearch(query || budget);
  };

  const current = SLIDES[slide];

  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: "580px", height: "62vh" }}
      data-ocid="hero.section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-motorcycle.dim_1600x700.jpg')",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{ background: current.overlay }}
        />
      </AnimatePresence>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        data-ocid="hero.button"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        data-ocid="hero.button"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSlide(i)}
            className={`rounded-full transition-all ${
              i === slide
                ? "w-6 h-2 bg-welkee-orange"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            data-ocid="hero.toggle"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55 }}
            className="max-w-lg"
          >
            <p className="text-orange-300 font-semibold text-xs uppercase tracking-widest mb-2">
              {current.tagline}
            </p>
            <h1 className="text-white font-black text-4xl md:text-5xl leading-tight mb-3">
              {current.headline}{" "}
              <span className="text-orange-400">{current.highlight}</span>
            </h1>
            <p className="text-blue-100 text-sm mb-6">{current.sub}</p>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-4">
              <p className="text-welkee-blue font-bold text-sm mb-3">
                Find the Right Bike
              </p>
              <div className="flex gap-2 mb-3">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-welkee-blue bg-gray-50"
                  data-ocid="hero.select"
                >
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <select
                  value={displacement}
                  onChange={(e) => setDisplacement(e.target.value)}
                  className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-welkee-blue bg-gray-50"
                  data-ocid="hero.select"
                >
                  {CC_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search brand, model..."
                  className="flex-1 px-4 py-2.5 text-gray-800 text-sm focus:outline-none"
                  data-ocid="hero.search_input"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-welkee-orange hover:bg-welkee-orange-dark text-white font-bold px-5 text-sm transition-colors flex items-center gap-1.5"
                  data-ocid="hero.button"
                >
                  <Search size={15} />
                  Find Bikes
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {["Royal Enfield", "Honda", "Yamaha", "KTM"].map((brand) => (
                <button
                  key={brand}
                  type="button"
                  className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-full border border-white/30 transition-colors backdrop-blur-sm"
                  onClick={() => {
                    setQuery(brand);
                    onSearch(brand);
                  }}
                  data-ocid="hero.button"
                >
                  {brand}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
