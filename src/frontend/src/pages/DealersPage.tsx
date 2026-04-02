import { useState } from "react";
import { CITIES } from "../context/CityContext";

const DEALERS: Record<
  string,
  Array<{
    name: string;
    address: string;
    phone: string;
    timing: string;
    mapsUrl: string;
  }>
> = {
  Delhi: [
    {
      name: "Vijay Hero Showroom",
      address: "Plot 14, Karol Bagh, New Delhi - 110005",
      phone: "+91 98110 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Karol+Bagh+New+Delhi",
    },
    {
      name: "Rajdhani Honda World",
      address: "22, Lajpat Nagar, New Delhi - 110024",
      phone: "+91 98110 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Lajpat+Nagar+New+Delhi",
    },
    {
      name: "Capital TVS Motors",
      address: "5, Nehru Place, New Delhi - 110019",
      phone: "+91 98110 11223",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Nehru+Place+New+Delhi",
    },
  ],
  Mumbai: [
    {
      name: "Shakti Royal Enfield",
      address: "201, Andheri West, Mumbai - 400058",
      phone: "+91 98200 12345",
      timing: "Mon-Sat: 9:30AM-7:30PM",
      mapsUrl: "https://maps.google.com/?q=Andheri+West+Mumbai",
    },
    {
      name: "Marine Honda Bikes",
      address: "44, Bandra West, Mumbai - 400050",
      phone: "+91 98200 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai",
    },
    {
      name: "Viman Yamaha Studio",
      address: "8, Dadar East, Mumbai - 400014",
      phone: "+91 98200 99001",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Dadar+Mumbai",
    },
  ],
  Bangalore: [
    {
      name: "Prestige Bajaj Zone",
      address: "10, Koramangala 5th Block, Bangalore - 560095",
      phone: "+91 98441 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Koramangala+Bangalore",
    },
    {
      name: "Silicon Hero Hub",
      address: "77, Jayanagar 4th Block, Bangalore - 560011",
      phone: "+91 98441 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Jayanagar+Bangalore",
    },
    {
      name: "Garden City TVS",
      address: "33, Malleshwaram, Bangalore - 560003",
      phone: "+91 98441 44556",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Malleshwaram+Bangalore",
    },
  ],
  Chennai: [
    {
      name: "Marina Honda Point",
      address: "22, Anna Salai, Chennai - 600002",
      phone: "+91 98410 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Anna+Salai+Chennai",
    },
    {
      name: "Mylapore Yamaha",
      address: "5, T.Nagar, Chennai - 600017",
      phone: "+91 98410 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=T+Nagar+Chennai",
    },
    {
      name: "Covelong Bajaj World",
      address: "18, Velachery, Chennai - 600042",
      phone: "+91 98410 33445",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Velachery+Chennai",
    },
  ],
  Hyderabad: [
    {
      name: "Charminar Royal Enfield",
      address: "77, Banjara Hills, Hyderabad - 500034",
      phone: "+91 98490 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    },
    {
      name: "Hi-Tech Honda Motors",
      address: "22, Madhapur, Hyderabad - 500081",
      phone: "+91 98490 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Madhapur+Hyderabad",
    },
    {
      name: "Golconda TVS Auto",
      address: "10, Kukatpally, Hyderabad - 500072",
      phone: "+91 98490 55667",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Kukatpally+Hyderabad",
    },
  ],
  Pune: [
    {
      name: "Shaniwar Hero Arena",
      address: "4, Deccan Gymkhana, Pune - 411004",
      phone: "+91 98220 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Deccan+Gymkhana+Pune",
    },
    {
      name: "Sinhagad Bajaj Plaza",
      address: "88, Kothrud, Pune - 411038",
      phone: "+91 98220 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Kothrud+Pune",
    },
    {
      name: "Peshwa Honda City",
      address: "16, Viman Nagar, Pune - 411014",
      phone: "+91 98220 44332",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Viman+Nagar+Pune",
    },
  ],
  Kolkata: [
    {
      name: "Park Street TVS",
      address: "11, Park Street, Kolkata - 700016",
      phone: "+91 98310 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Park+Street+Kolkata",
    },
    {
      name: "Howrah Yamaha Center",
      address: "33, Salt Lake City, Kolkata - 700091",
      phone: "+91 98310 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Salt+Lake+Kolkata",
    },
    {
      name: "Victoria Hero Bikes",
      address: "5, Gariahat, Kolkata - 700019",
      phone: "+91 98310 22334",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Gariahat+Kolkata",
    },
  ],
  Ahmedabad: [
    {
      name: "Sabarmati Bajaj Arena",
      address: "22, C.G. Road, Ahmedabad - 380006",
      phone: "+91 98250 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=CG+Road+Ahmedabad",
    },
    {
      name: "Naroda Honda World",
      address: "10, Maninagar, Ahmedabad - 380008",
      phone: "+91 98250 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Maninagar+Ahmedabad",
    },
    {
      name: "Kankaria Royal Enfield",
      address: "5, Satellite, Ahmedabad - 380015",
      phone: "+91 98250 11223",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Satellite+Ahmedabad",
    },
  ],
  Jaipur: [
    {
      name: "Pink City Honda",
      address: "18, Malviya Nagar, Jaipur - 302017",
      phone: "+91 98290 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Malviya+Nagar+Jaipur",
    },
    {
      name: "Amer Hero Bikes",
      address: "4, Tonk Road, Jaipur - 302015",
      phone: "+91 98290 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Tonk+Road+Jaipur",
    },
    {
      name: "Hawa Mahal TVS Auto",
      address: "33, Vaishali Nagar, Jaipur - 302021",
      phone: "+91 98290 99012",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Vaishali+Nagar+Jaipur",
    },
  ],
  Lucknow: [
    {
      name: "Nawab Yamaha",
      address: "12, Gomti Nagar, Lucknow - 226010",
      phone: "+91 98390 12345",
      timing: "Mon-Sat: 9AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Gomti+Nagar+Lucknow",
    },
    {
      name: "Hazratganj Hero Hub",
      address: "5, Hazratganj, Lucknow - 226001",
      phone: "+91 98390 67890",
      timing: "Mon-Sun: 9AM-8PM",
      mapsUrl: "https://maps.google.com/?q=Hazratganj+Lucknow",
    },
    {
      name: "Alambagh Bajaj Point",
      address: "77, Alambagh, Lucknow - 226005",
      phone: "+91 98390 33445",
      timing: "Mon-Sat: 10AM-7PM",
      mapsUrl: "https://maps.google.com/?q=Alambagh+Lucknow",
    },
  ],
};

export function DealersPage() {
  const [city, setCity] = useState("Delhi");
  const dealers = DEALERS[city] || [];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Find Dealers Near You
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Locate authorized showrooms in your city
        </p>

        <div className="mb-8">
          <label
            htmlFor="dealers-city-select"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Select City
          </label>
          <select
            id="dealers-city-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#004085] min-w-48"
            data-ocid="dealers.select"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5" data-ocid="dealers.list">
          {dealers.map((d) => (
            <div
              key={d.name}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="font-bold text-lg text-[#004085] dark:text-blue-400 mb-2">
                {d.name}
              </h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div>📍 {d.address}</div>
                <div>📞 {d.phone}</div>
                <div>🕐 {d.timing}</div>
              </div>
              <div className="flex gap-3">
                <a
                  href={`tel:${d.phone.replace(/\s/g, "")}`}
                  className="flex-1 text-center py-2.5 rounded-lg bg-[#004085] text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                  data-ocid="dealers.primary_button"
                >
                  Call Now
                </a>
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-lg border border-[#004085] text-[#004085] dark:text-blue-400 dark:border-blue-400 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  data-ocid="dealers.secondary_button"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
