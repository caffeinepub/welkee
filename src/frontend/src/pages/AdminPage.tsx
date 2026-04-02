import { useState } from "react";

const ADMIN_PIN = "20242025786786";

interface StoredUser {
  id: number;
  email: string;
  mobile?: string;
  signupDate?: string;
}

function getRegisteredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem("welkee_users");
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

export function AdminPage() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Suppress unused-variable lint for refreshKey (used only to trigger re-read)
  void refreshKey;

  const registeredUsers = unlocked ? getRegisteredUsers() : [];

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
              Welkee — Registered Leads
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
          </div>
        </div>

        {/* Summary stat */}
        <div className="mb-8">
          <div className="bg-[#004085] rounded-xl p-5 inline-flex flex-col gap-1">
            <div className="text-3xl font-extrabold">
              {registeredUsers.length}
            </div>
            <div className="text-sm text-blue-200">Total Registered Leads</div>
          </div>
        </div>

        {/* Registered Leads Table */}
        <section data-ocid="admin.leads.panel">
          <h2 className="text-lg font-bold mb-4 text-white">
            Registered Leads
          </h2>
          {registeredUsers.length === 0 ? (
            <div
              className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700"
              data-ocid="admin.leads.empty_state"
            >
              <p className="text-3xl mb-3">📭</p>
              <p className="text-gray-400">No registered leads yet.</p>
              <p className="text-gray-600 text-sm mt-1">
                Users will appear here after signing up.
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
                    {[
                      "#",
                      "Email Address",
                      "Linked Mobile Number",
                      "Signup Date",
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
                  {registeredUsers.map((u, i) => (
                    <tr
                      key={u.id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                      data-ocid={`admin.leads.item.${i + 1}`}
                    >
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {i + 1}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {u.email}
                      </td>
                      <td className="py-3 px-4 text-sm font-mono">
                        {u.mobile ? `+91 ${u.mobile}` : "—"}
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-400">
                        {u.signupDate ??
                          (u.id ? new Date(u.id).toLocaleString("en-IN") : "—")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <footer className="text-center text-xs text-gray-600 py-6 mt-8 border-t border-gray-800">
        © {new Date().getFullYear()} Welkee Admin Panel.
      </footer>
    </main>
  );
}
