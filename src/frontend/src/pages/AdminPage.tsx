import { useState } from "react";
import { useLeads } from "../context/LeadsContext";
import type { Lead } from "../context/LeadsContext";

const ADMIN_PIN = "7860";

function exportCSV(leads: Lead[]) {
  const headers = [
    "ID",
    "Name",
    "Phone",
    "City",
    "Vehicle",
    "Form Type",
    "Submitted At",
  ];
  const rows = leads.map((l) => [
    l.id,
    l.name,
    l.phone,
    l.city,
    l.vehicleName,
    l.formType,
    l.submittedAt,
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `welkee-leads-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminPage() {
  const { leads, clearLeads } = useLeads();
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

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
              maxLength={6}
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
              {leads.length} lead{leads.length !== 1 ? "s" : ""} collected
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => exportCSV(leads)}
              disabled={leads.length === 0}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              data-ocid="admin.secondary_button"
            >
              Export CSV
            </button>
            {confirmClear ? (
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-400">Sure?</span>
                <button
                  type="button"
                  onClick={() => {
                    clearLeads();
                    setConfirmClear(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                  data-ocid="admin.confirm_button"
                >
                  Yes, Clear
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                data-ocid="admin.delete_button"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {leads.length === 0 ? (
          <div
            className="text-center py-20 bg-gray-800 rounded-2xl"
            data-ocid="admin.empty_state"
          >
            <p className="text-4xl mb-3">📊</p>
            <p className="text-gray-400">
              No leads yet. Forms submitted will appear here.
            </p>
          </div>
        ) : (
          <div
            className="overflow-x-auto rounded-2xl border border-gray-700"
            data-ocid="admin.table"
          >
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  {[
                    "#",
                    "Name",
                    "Phone",
                    "City",
                    "Vehicle",
                    "Form Type",
                    "Submitted At",
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
                {leads.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-500">{i + 1}</td>
                    <td className="py-3 px-4 text-sm font-semibold">
                      {lead.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      {lead.phone}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      {lead.city}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded-full">
                        {lead.vehicleName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          lead.formType === "Get Offers"
                            ? "bg-orange-900/40 text-orange-300"
                            : lead.formType === "Book a Test Ride"
                              ? "bg-green-900/40 text-green-300"
                              : "bg-purple-900/40 text-purple-300"
                        }`}
                      >
                        {lead.formType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {lead.submittedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
