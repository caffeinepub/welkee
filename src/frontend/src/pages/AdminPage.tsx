import { useState } from "react";
import { vehicles } from "../data/vehicleData";
import {
  type PhoneLead,
  getClickStats,
  getPhoneLeads,
} from "../utils/clickStats";

const ADMIN_PIN = "20242025786786";

type TabId = "users" | "popularity" | "leads";

interface StoredUser {
  id: number;
  email: string;
  password?: string;
}

function getRegisteredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem("welkee_users");
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function exportAllCSV(
  users: StoredUser[],
  phoneLeads: PhoneLead[],
  popularityData: Array<{
    name: string;
    brand: string;
    buyNow: number;
    whatsapp: number;
    total: number;
  }>,
) {
  const usersSection = [
    ["=== REGISTERED USERS ==="],
    ["#", "Email"],
    ...users.map((u, i) => [String(i + 1), u.email]),
    [""],
    ["=== VEHICLE POPULARITY ==="],
    [
      "#",
      "Vehicle Name",
      "Brand",
      "Buy Now Clicks",
      "WhatsApp Clicks",
      "Total Clicks",
    ],
    ...popularityData.map((p, i) => [
      String(i + 1),
      p.name,
      p.brand,
      String(p.buyNow),
      String(p.whatsapp),
      String(p.total),
    ]),
    [""],
    ["=== CUSTOMER LEADS ==="],
    ["#", "Phone Number", "Vehicle", "Date/Time"],
    ...phoneLeads.map((l, i) => [
      String(i + 1),
      l.phone,
      l.vehicleName,
      new Date(l.timestamp).toLocaleString("en-IN"),
    ]),
  ];

  const csv = usersSection
    .map((row) => row.map((c) => `"${c}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `welkee-dashboard-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminPage() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("users");
  const [refreshKey, setRefreshKey] = useState(0);

  // Data — re-read whenever refreshKey changes
  const registeredUsers = unlocked ? getRegisteredUsers() : [];
  const clickStats = unlocked ? getClickStats() : {};
  const phoneLeads = unlocked ? getPhoneLeads() : [];

  const popularityData = vehicles
    .map((v) => {
      const s = clickStats[v.id] ?? { buyNow: 0, whatsapp: 0 };
      return {
        id: v.id,
        name: v.name,
        brand: v.brand,
        buyNow: s.buyNow,
        whatsapp: s.whatsapp,
        total: s.buyNow + s.whatsapp,
      };
    })
    .sort((a, b) => b.total - a.total);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
      setPinError("");
    } else {
      setPinError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  // Suppress unused warning — refreshKey is used to trigger re-reads above
  void refreshKey;

  if (!unlocked) {
    return (
      <main
        className="min-h-screen bg-gray-900 flex items-center justify-center p-4"
        data-ocid="admin.page"
      >
        <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-gray-700">
          <div className="text-center mb-6">
            <span className="text-4xl">🔐</span>
            <h1 className="text-xl font-extrabold text-white mt-3">
              Admin Access
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Enter your PIN to continue
            </p>
          </div>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-ocid="admin.input"
            />
            {pinError && (
              <p
                className="text-red-400 text-sm text-center"
                data-ocid="admin.error_state"
              >
                {pinError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#004085] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
              data-ocid="admin.submit_button"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  const tabs: Array<{ id: TabId; label: string; count: number; icon: string }> =
    [
      {
        id: "users",
        label: "Registered Users",
        count: registeredUsers.length,
        icon: "👥",
      },
      {
        id: "popularity",
        label: "Vehicle Popularity",
        count: popularityData.filter((p) => p.total > 0).length,
        icon: "📊",
      },
      {
        id: "leads",
        label: "Customer Leads",
        count: phoneLeads.length,
        icon: "📱",
      },
    ];

  return (
    <main
      className="bg-gray-900 min-h-screen text-white"
      data-ocid="admin.page"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Live analytics &amp; lead management
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              data-ocid="admin.secondary_button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Data
            </button>
            <button
              type="button"
              onClick={() =>
                exportAllCSV(registeredUsers, phoneLeads, popularityData)
              }
              className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              data-ocid="admin.export_button"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`rounded-xl p-4 text-left border transition-all ${
                activeTab === t.id
                  ? "bg-[#004085] border-blue-500"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-750"
              }`}
              data-ocid={`admin.${t.id}.tab`}
            >
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className="text-2xl font-extrabold">{t.count}</div>
              <div className="text-xs text-gray-400 mt-0.5">{t.label}</div>
            </button>
          ))}
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-6 border-b border-gray-700 pb-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
                activeTab === t.id
                  ? "bg-gray-800 text-white border border-gray-700 border-b-gray-800"
                  : "text-gray-400 hover:text-white"
              }`}
              data-ocid={`admin.${t.id}.tab`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── TABLE 1: Registered Users ── */}
        {activeTab === "users" && (
          <section data-ocid="admin.users.panel">
            <h2 className="text-lg font-bold mb-4 text-white">
              👥 Registered Users
            </h2>
            {registeredUsers.length === 0 ? (
              <div
                className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700"
                data-ocid="admin.users.empty_state"
              >
                <p className="text-3xl mb-3">📭</p>
                <p className="text-gray-400">No registered users yet.</p>
              </div>
            ) : (
              <div
                className="overflow-x-auto rounded-2xl border border-gray-700"
                data-ocid="admin.users.table"
              >
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      {["#", "Email Address", "Registered"].map((h) => (
                        <th
                          key={h}
                          className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((u, i) => (
                      <tr
                        key={u.id}
                        className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                        data-ocid={`admin.users.item.${i + 1}`}
                      >
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {i + 1}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          {u.email}
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-400">
                          {u.id ? new Date(u.id).toLocaleString("en-IN") : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* ── TABLE 2: Vehicle Popularity ── */}
        {activeTab === "popularity" && (
          <section data-ocid="admin.popularity.panel">
            <h2 className="text-lg font-bold mb-4 text-white">
              📊 Vehicle Popularity — Most Viewed Models
            </h2>
            <div
              className="overflow-x-auto rounded-2xl border border-gray-700"
              data-ocid="admin.popularity.table"
            >
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    {[
                      "#",
                      "Vehicle Name",
                      "Brand",
                      "Buy Now Clicks",
                      "WhatsApp Clicks",
                      "Total Clicks",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {popularityData.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                      data-ocid={`admin.popularity.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold">
                        {p.name}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded-full">
                          {p.brand}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-center">
                        <span
                          className={`inline-block min-w-[2rem] text-center px-2 py-0.5 rounded-full text-xs font-bold ${
                            p.buyNow > 0
                              ? "bg-orange-900/40 text-orange-300"
                              : "text-gray-600"
                          }`}
                        >
                          {p.buyNow}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-center">
                        <span
                          className={`inline-block min-w-[2rem] text-center px-2 py-0.5 rounded-full text-xs font-bold ${
                            p.whatsapp > 0
                              ? "bg-green-900/40 text-green-300"
                              : "text-gray-600"
                          }`}
                        >
                          {p.whatsapp}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-center">
                        <span
                          className={`inline-block min-w-[2rem] text-center px-2 py-0.5 rounded-full text-xs font-bold ${
                            p.total > 0
                              ? "bg-purple-900/40 text-purple-300"
                              : "text-gray-600"
                          }`}
                        >
                          {p.total}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {popularityData.every((p) => p.total === 0) && (
              <p
                className="text-center text-gray-500 text-sm mt-4"
                data-ocid="admin.popularity.empty_state"
              >
                No clicks tracked yet. Clicks will appear here once users
                interact with vehicle cards.
              </p>
            )}
          </section>
        )}

        {/* ── TABLE 3: Customer Leads (Phone Numbers) ── */}
        {activeTab === "leads" && (
          <section data-ocid="admin.leads.panel">
            <h2 className="text-lg font-bold mb-4 text-white">
              📱 Customer Leads — Phone Numbers
            </h2>
            {phoneLeads.length === 0 ? (
              <div
                className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700"
                data-ocid="admin.leads.empty_state"
              >
                <p className="text-3xl mb-3">📭</p>
                <p className="text-gray-400">No leads captured yet.</p>
                <p className="text-gray-600 text-sm mt-1">
                  Phone numbers will appear here after users click Buy Now.
                </p>
              </div>
            ) : (
              <div
                className="overflow-x-auto rounded-2xl border border-gray-700"
                data-ocid="admin.leads.table"
              >
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      {["#", "Phone Number", "Vehicle", "Date / Time"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {phoneLeads
                      .slice()
                      .reverse()
                      .map((lead, i) => (
                        <tr
                          key={lead.id}
                          className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                          data-ocid={`admin.leads.item.${i + 1}`}
                        >
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {i + 1}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold font-mono">
                            +91 {lead.phone}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded-full">
                              {lead.vehicleName}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-gray-400">
                            {new Date(lead.timestamp).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
