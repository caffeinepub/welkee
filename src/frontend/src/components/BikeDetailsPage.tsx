import { ArrowLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { formatPrice, getBikeImage } from "../data/staticData";
import type { Bike } from "../hooks/useQueries";
import { LeadPopup } from "./LeadPopup";

const ALL_GALLERY_IMAGES = [
  "/assets/generated/bike-royal-enfield-bullet.dim_400x280.jpg",
  "/assets/generated/bike-honda-cb-shine.dim_400x280.jpg",
  "/assets/generated/bike-yamaha-r15.dim_400x280.jpg",
  "/assets/generated/bike-bajaj-pulsar.dim_400x280.jpg",
  "/assets/generated/bike-ktm-duke.dim_400x280.jpg",
  "/assets/generated/bike-tvs-apache.dim_400x280.jpg",
];

function getMileage(displacement: bigint): string {
  const d = Number(displacement);
  if (d === 0) return "80-100 km/charge";
  if (d <= 125) return "50-60 kmpl";
  if (d <= 200) return "35-45 kmpl";
  return "25-35 kmpl";
}

function getWeight(displacement: bigint): string {
  const d = Number(displacement);
  if (d === 0) return "118 kg";
  if (d <= 125) return "112 kg";
  if (d <= 200) return "148 kg";
  if (d <= 350) return "165 kg";
  return "174 kg";
}

function getTopSpeed(displacement: bigint): string {
  const d = Number(displacement);
  if (d === 0) return "90 kmph";
  if (d <= 125) return "95 kmph";
  if (d <= 200) return "120 kmph";
  if (d <= 350) return "130 kmph";
  return "167 kmph";
}

function getTorque(displacement: bigint): string {
  const d = Number(displacement);
  if (d === 0) return "N/A (Electric)";
  if (d <= 125) return "10.3 Nm @ 5000 rpm";
  if (d <= 200) return "17.25 Nm @ 7500 rpm";
  if (d <= 350) return "28 Nm @ 4000 rpm";
  return "37 Nm @ 7000 rpm";
}

function formatIndianNumber(num: number): string {
  return num.toLocaleString("en-IN");
}

const SAMPLE_REVIEWS = [
  {
    reviewer: "Rahul S.",
    date: "2 months ago",
    stars: 5,
    text: "Best in mileage! Very fuel efficient for daily commutes. Highly satisfied with the purchase.",
  },
  {
    reviewer: "Priya M.",
    date: "3 months ago",
    stars: 4,
    text: "Great performance and smooth handling. The ride quality is excellent on city roads. Highly recommended.",
  },
  {
    reviewer: "Amit K.",
    date: "1 month ago",
    stars: 5,
    text: "Excellent build quality. The bike looks premium and the engine is very refined. Worth every rupee.",
  },
];

interface BikeDetailsPageProps {
  bike: Bike;
  onBack: () => void;
  selectedCity?: string;
  allBikes: Bike[];
  onBikeSelect: (bike: Bike) => void;
}

export function BikeDetailsPage({
  bike,
  onBack,
  selectedCity,
  allBikes,
  onBikeSelect,
}: BikeDetailsPageProps) {
  const [leadPopup, setLeadPopup] = useState<{
    open: boolean;
    type: "offers" | "price" | "test-ride";
  }>({
    open: false,
    type: "offers",
  });
  const [activeImage, setActiveImage] = useState(0);

  // EMI Calculator state
  const bikePrice = Number(bike.price.priceMin);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(36);

  const emiCalc = useMemo(() => {
    const P = Math.max(0, bikePrice - downPayment);
    const r = 0.09 / 12;
    const n = tenure;
    if (P <= 0) return { emi: 0, loanAmount: 0, totalPayable: 0 };
    const emi = (P * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    return {
      emi: Math.round(emi),
      loanAmount: P,
      totalPayable: Math.round(emi * n),
    };
  }, [bikePrice, downPayment, tenure]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const heroImage = getBikeImage(bike.name);
  const priceStr = formatPrice(bike.price.priceMin, bike.price.priceMax);
  const isElectric = Number(bike.engineSpecs.displacement) === 0;
  const hasCity = selectedCity && selectedCity !== "Select City";
  const onRoadMin = ((Number(bike.price.priceMin) * 1.1) / 100000).toFixed(2);
  const onRoadMax = ((Number(bike.price.priceMax) * 1.1) / 100000).toFixed(2);

  const galleryImages = [
    heroImage,
    ...ALL_GALLERY_IMAGES.filter((img) => img !== heroImage).slice(0, 3),
  ];

  const specs = [
    {
      label: "Engine",
      value: isElectric
        ? "Electric Motor"
        : `${bike.engineSpecs.displacement} cc`,
    },
    { label: "Max Power", value: bike.engineSpecs.maxPower },
    { label: "Torque", value: getTorque(bike.engineSpecs.displacement) },
    { label: "Transmission", value: bike.engineSpecs.transmission },
    { label: "Fuel Type", value: isElectric ? "Electric" : "Petrol" },
    {
      label: "Mileage",
      value: bike.mileage ?? getMileage(bike.engineSpecs.displacement),
    },
    { label: "Kerb Weight", value: getWeight(bike.engineSpecs.displacement) },
    { label: "Top Speed", value: getTopSpeed(bike.engineSpecs.displacement) },
  ];

  // Similar bikes: same category first, else any 3
  const similarBikes = useMemo(() => {
    const sameCat = allBikes.filter(
      (b) => b.name !== bike.name && b.category === bike.category,
    );
    const others = allBikes.filter(
      (b) => b.name !== bike.name && b.category !== bike.category,
    );
    return [...sameCat, ...others].slice(0, 3);
  }, [allBikes, bike]);

  const overallRating = (Number(bike.rating) / 10).toFixed(1);

  return (
    <div className="min-h-screen bg-welkee-gray" data-ocid="bikedetail.page">
      {/* Breadcrumb / Back */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-welkee-blue hover:underline font-medium"
            data-ocid="bikedetail.button"
          >
            <ArrowLeft size={16} />
            Back to Bikes
          </button>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-400">{bike.brand}</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-700 font-medium truncate">
            {bike.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-8"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-gray-50 flex items-center justify-center p-8 min-h-[300px]">
              <img
                src={galleryImages[activeImage]}
                alt={bike.name}
                className="max-h-72 w-full object-contain transition-all duration-300"
              />
            </div>
            {/* Info */}
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block bg-blue-50 text-welkee-blue text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                {bike.brand}
              </span>
              <h1 className="text-3xl font-black text-gray-900 mb-3">
                {bike.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= Math.round(Number(bike.rating) / 10)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  {(Number(bike.rating) / 10).toFixed(1)} / 5.0
                </span>
              </div>

              {/* Pricing */}
              <div className="mb-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">
                      Ex-showroom price
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {priceStr}
                    </p>
                  </div>
                  {hasCity && (
                    <div className="text-right">
                      <p className="text-xs text-green-600 mb-0.5">
                        On-road in {selectedCity}
                      </p>
                      <p className="text-xl font-bold text-green-700">
                        ₹{onRoadMin} L - ₹{onRoadMax} L
                      </p>
                      <p className="text-xs text-gray-400">
                        incl. taxes &amp; registration
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setLeadPopup({ open: true, type: "test-ride" })
                  }
                  className="flex-1 bg-welkee-blue hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors"
                  data-ocid="bikedetail.test_ride_button"
                >
                  Book a Test Ride
                </button>
                <button
                  type="button"
                  onClick={() => setLeadPopup({ open: true, type: "offers" })}
                  className="flex-1 bg-welkee-orange hover:bg-welkee-orange-dark text-white font-semibold py-3 rounded-xl transition-colors"
                  data-ocid="bikedetail.primary_button"
                >
                  Get Offers
                </button>
              </div>
              <button
                type="button"
                onClick={() => setLeadPopup({ open: true, type: "price" })}
                className="mt-3 border-2 border-welkee-blue text-welkee-blue font-semibold py-3 rounded-xl hover:bg-welkee-blue hover:text-white transition-all"
                data-ocid="bikedetail.secondary_button"
              >
                Check On-Road Price
              </button>
            </div>
          </div>
        </motion.div>

        {/* Specs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-8"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Specifications</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {specs.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-semibold text-gray-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* EMI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-8"
          data-ocid="bikedetail.panel"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">EMI Calculator</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              @ 9% per annum interest rate
            </p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="space-y-5">
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-1">
                    Bike Price
                  </p>
                  <div className="h-11 px-4 flex items-center bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700">
                    ₹{formatIndianNumber(bikePrice)}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="emi-down"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Down Payment (₹)
                  </label>
                  <input
                    id="emi-down"
                    type="number"
                    min={0}
                    max={bikePrice}
                    step={1000}
                    value={downPayment}
                    onChange={(e) =>
                      setDownPayment(
                        Math.min(
                          bikePrice,
                          Math.max(0, Number(e.target.value)),
                        ),
                      )
                    }
                    className="w-full h-11 px-4 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-welkee-blue"
                    data-ocid="bikedetail.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emi-tenure"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tenure (Months)
                  </label>
                  <select
                    id="emi-tenure"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-11 px-4 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-welkee-blue bg-white"
                    data-ocid="bikedetail.select"
                  >
                    {[12, 24, 36, 48, 60].map((m) => (
                      <option key={m} value={m}>
                        {m} Months ({m / 12} {m / 12 === 1 ? "Year" : "Years"})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col justify-center">
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
                  <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                  <p className="text-4xl font-black text-welkee-orange mb-4">
                    ₹{formatIndianNumber(emiCalc.emi)}
                    <span className="text-base font-medium text-gray-400">
                      /mo
                    </span>
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">
                        Loan Amount
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        ₹{(emiCalc.loanAmount / 100000).toFixed(2)} L
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">
                        Total Payable
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        ₹{(emiCalc.totalPayable / 100000).toFixed(2)} L
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-8"
          data-ocid="bikedetail.panel"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                User Reviews &amp; Ratings
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i <= Math.round(Number(bike.rating) / 10)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
                <span className="text-sm font-bold text-gray-700">
                  {overallRating}
                </span>
                <span className="text-xs text-gray-400">
                  / 5.0 overall rating
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-welkee-blue">
                {overallRating}
              </p>
              <p className="text-xs text-gray-400">Based on reviews</p>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {SAMPLE_REVIEWS.map((review, idx) => (
              <div
                key={review.reviewer}
                className="px-6 py-5"
                data-ocid={`bikedetail.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-welkee-blue/10 flex items-center justify-center text-welkee-blue font-bold text-sm">
                      {review.reviewer[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {review.reviewer}
                      </p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i <= review.stars
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-8"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Gallery</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`rounded-xl overflow-hidden bg-gray-50 transition-all border-2 ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  } ${
                    activeImage === i
                      ? "border-welkee-orange"
                      : "border-transparent hover:border-gray-200"
                  }`}
                  data-ocid={`bikedetail.item.${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${bike.name} gallery ${i + 1}`}
                    className="w-full h-full object-cover aspect-video"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* People Also Viewed */}
        {similarBikes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              People Also Viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarBikes.map((sb, idx) => (
                <button
                  key={sb.name}
                  type="button"
                  onClick={() => {
                    onBikeSelect(sb);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 hover:shadow-lg hover:border-welkee-blue border-2 border-transparent transition-all text-left group"
                  data-ocid={`bikedetail.item.${idx + 1}`}
                >
                  <img
                    src={getBikeImage(sb.name)}
                    alt={sb.name}
                    className="w-20 h-16 object-contain rounded-xl bg-gray-50 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-welkee-blue transition-colors">
                      {sb.name}
                    </p>
                    <p className="text-xs text-welkee-orange font-semibold mt-0.5">
                      {formatPrice(sb.price.priceMin, sb.price.priceMax)}
                    </p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={10}
                          className={
                            i <= Math.round(Number(sb.rating) / 10)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">
                        {(Number(sb.rating) / 10).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <LeadPopup
        open={leadPopup.open}
        onClose={() => setLeadPopup((prev) => ({ ...prev, open: false }))}
        bikeName={bike.name}
        type={leadPopup.type}
      />
    </div>
  );
}
