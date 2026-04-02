import { useState } from "react";

const NEWS = [
  {
    id: 1,
    headline: "Royal Enfield Launches Classic 350 Hallowed Highways Edition",
    date: "Mar 28, 2026",
    category: "New Launch",
    categoryColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    summary:
      "Royal Enfield has unveiled a stunning new Hallowed Highways edition of the Classic 350 with special paint finishes and chrome accents.",
    full: "Royal Enfield has unveiled its much-awaited Hallowed Highways edition of the iconic Classic 350. This special edition features three exclusive paint options including Signals Desert Storm, Signals Marsh Grey, and Chrome Black. The motorcycle gets premium chrome accents on the exhaust, fuel tank cap, and engine components. Priced at ₹2.12 lakh (ex-showroom Delhi), this edition celebrates the spirit of long-distance touring that the Classic 350 is beloved for. Bookings are now open at all Royal Enfield dealerships across India.",
  },
  {
    id: 2,
    headline:
      "Ola Electric Cuts S1 Pro Price by ₹20,000 — Now Starts at ₹1.27L",
    date: "Mar 20, 2026",
    category: "Price Update",
    categoryColor:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    summary:
      "Ola Electric has announced a significant price reduction on the S1 Pro, making it one of the most affordable premium electric scooters in India.",
    full: "In a surprise announcement, Ola Electric has slashed the price of the S1 Pro by ₹20,000, now offering it from ₹1.27 lakh (ex-showroom). The company cited improved manufacturing efficiency and economies of scale for the price cut. The S1 Pro continues to offer a 181 km certified range on a single charge, OTA updates, and a top speed of 116 km/h. This move is expected to significantly boost Ola's market share in the premium electric scooter segment.",
  },
  {
    id: 3,
    headline: "Ather 450X Gen 4 Review: The Best Electric Scooter Gets Better",
    date: "Mar 15, 2026",
    category: "Review",
    categoryColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    summary:
      "Ather Energy's latest 450X iteration improves on an already excellent formula with better range, faster charging, and new smart features.",
    full: "The Ather 450X Gen 4 continues to be our pick for the best premium electric scooter in India. The new generation adds a larger 3.7 kWh battery pack offering up to 146 km range in Eco mode, up from the previous 108 km. The new ProFast charger delivers 80% charge in under 30 minutes. New features include Google Maps integration, a 7-inch HD display, and an updated Warp mode that pushes performance to new limits. At ₹1.58 lakh ex-showroom, it commands a premium but fully justifies it.",
  },
  {
    id: 4,
    headline:
      "Hero Splendor Plus Celebrates 25 Years as India's Best-Selling Bike",
    date: "Mar 10, 2026",
    category: "Milestone",
    categoryColor:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    summary:
      "Hero MotoCorp commemorates 25 years of the Splendor Plus with a special anniversary edition and a record-breaking sales milestone.",
    full: "Hero MotoCorp has celebrated a remarkable milestone as the Hero Splendor Plus crosses 25 years in production and clocks over 3 crore cumulative sales — making it not just India's but the world's best-selling motorcycle. To commemorate this achievement, Hero has launched a special 25th Anniversary Edition with unique badging, dual-tone paint options, and a chrome tank. The Splendor Plus remains the backbone of Indian mobility with its proven 97.2cc engine delivering over 60 km/l mileage.",
  },
  {
    id: 5,
    headline:
      "Yamaha MT-15 V3 Leaked: New TFT Display & Cornering ABS Expected",
    date: "Mar 5, 2026",
    category: "Upcoming",
    categoryColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    summary:
      "Leaked images suggest Yamaha is preparing a major upgrade for the MT-15 with a new TFT instrument cluster and advanced safety features.",
    full: "Spy shots and leaked documents suggest Yamaha is working on a significant update for the popular MT-15. The V3 is expected to feature a full TFT color display, cornering ABS, traction control, and a revised 155cc engine with slightly higher power output. The design is said to be sharper and more aggressive with new LED lighting elements. Yamaha India is expected to launch the MT-15 V3 at the upcoming India Bike Week 2026. Price is estimated to be around ₹1.80 lakh ex-showroom.",
  },
  {
    id: 6,
    headline:
      "TVS Apache RTR 160 4V Gets New Bluetooth Features in 2026 Update",
    date: "Feb 28, 2026",
    category: "Update",
    categoryColor: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    summary:
      "TVS Motor Company has quietly updated the Apache RTR 160 4V with SmartXonnect Bluetooth connectivity and new instrument cluster features.",
    full: "TVS Motor Company has rolled out a mid-cycle update for the Apache RTR 160 4V, adding the brand's SmartXonnect Bluetooth technology to the commuter sports segment. The new features include call and SMS alerts on the instrument cluster, turn-by-turn navigation, and ride statistics via the TVS Connect app. The 159.7cc engine remains unchanged with 17.63 bhp and 14.12 Nm of torque. The update is available across all variants with a marginal price increase of ₹2,000. TVS claims over 50,000 pre-bookings for the updated model.",
  },
];

export function NewsPage() {
  const [selected, setSelected] = useState<(typeof NEWS)[0] | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Latest Bike News
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          New launches, reviews, and updates from the Indian bike industry
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
              data-ocid="news.card"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${article.categoryColor}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {article.date}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-3">
                  {article.headline}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 line-clamp-3">
                  {article.summary}
                </p>
                <button
                  type="button"
                  onClick={() => setSelected(article)}
                  className="mt-4 text-sm font-semibold text-[#004085] dark:text-blue-400 hover:underline text-left"
                  data-ocid="news.button"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          data-ocid="news.modal"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-7 relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold"
              aria-label="Close article"
              data-ocid="news.close_button"
            >
              ×
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${selected.categoryColor}`}
              >
                {selected.category}
              </span>
              <span className="text-xs text-gray-400">{selected.date}</span>
            </div>
            <h2 className="font-extrabold text-xl text-gray-900 dark:text-white mb-4">
              {selected.headline}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {selected.full}
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#004085] text-white font-semibold hover:bg-blue-800 transition-colors"
              data-ocid="news.confirm_button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
