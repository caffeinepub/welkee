import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: "slide-blue",
    overlay:
      "linear-gradient(to right, rgba(10,25,60,0.88) 0%, rgba(10,25,60,0.55) 60%, rgba(10,25,60,0.20) 100%)",
    tagline: "India's #1 Bike Marketplace",
    headline: "Find the Right",
    highlight: "Ride",
    sub: "Compare prices, specs, and reviews across 40+ models.",
  },
  {
    id: "slide-teal",
    overlay:
      "linear-gradient(to right, rgba(10,60,50,0.88) 0%, rgba(10,60,50,0.55) 60%, rgba(10,60,50,0.20) 100%)",
    tagline: "Best Electric Scooters 2026",
    headline: "Go Green,",
    highlight: "Go Electric",
    sub: "Discover top electric scooters with unmatched range and performance.",
  },
  {
    id: "slide-maroon",
    overlay:
      "linear-gradient(to right, rgba(60,10,20,0.88) 0%, rgba(60,10,20,0.55) 60%, rgba(60,10,20,0.20) 100%)",
    tagline: "Exclusive Offers 2026",
    headline: "Unbeatable",
    highlight: "Deals Today",
    sub: "Get the best on-road prices, EMI offers, and exchange bonuses.",
  },
];

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onViewAllVehicles: () => void;
}

export function HeroSection({ onViewAllVehicles }: HeroSectionProps) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide((s) => (s + 1) % SLIDES.length);
  const current = SLIDES[slide];

  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: "580px", height: "62vh" }}
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
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSlide(i)}
            className={`rounded-full transition-all ${i === slide ? "w-6 h-2 bg-[#FF8225]" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
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
            className="max-w-xl"
          >
            <p className="text-orange-300 font-semibold text-xs uppercase tracking-widest mb-2">
              {current.tagline}
            </p>
            <h1 className="text-white font-black text-4xl md:text-5xl leading-tight mb-3">
              {current.headline}{" "}
              <span className="text-orange-400">{current.highlight}</span>
            </h1>
            <p className="text-blue-100 text-sm mb-8">{current.sub}</p>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={onViewAllVehicles}
              className="bg-[#FF8225] hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <span>All Vehicles</span>
              <span className="bg-white/20 rounded-full px-2 py-0.5 text-sm font-semibold">
                40+
              </span>
            </button>

            <p className="text-blue-200 text-xs mt-4">
              20 Bikes &bull; 20 Scooters &bull; Real Prices &bull; Get Best
              Offers
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
