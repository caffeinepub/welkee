import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KeyRound, RefreshCw, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ADMIN_PIN = "20242025786786";

interface StoredUser {
  id: number;
  email: string;
  password: string;
  signupDate?: string;
}

interface PhoneLead {
  id: string;
  phone: string;
  vehicleName: string;
  vehicleId: string;
  timestamp: number;
}

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div
        className={`bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm flex flex-col items-center ${
          shake ? "animate-[shake_0.4s_ease]" : ""
        }`}
        style={{ animation: shake ? "shake 0.4s ease" : undefined }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#004085" }}
        >
          <KeyRound size={26} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Access</h1>
        <p className="text-gray-500 text-sm mb-7 text-center">
          Enter the PIN to access the Welkee Admin Dashboard.
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            maxLength={14}
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => {
              setError(false);
              setPin(e.target.value.replace(/\D/g, ""));
            }}
            className={`text-center text-xl tracking-widest font-mono ${
              error ? "border-red-500 focus-visible:ring-red-400" : ""
            }`}
            data-ocid="admin.pin_input"
          />
          {error && (
            <p className="text-red-500 text-xs text-center -mt-2">
              Incorrect PIN. Please try again.
            </p>
          )}
          <Button
            type="submit"
            className="w-full font-semibold py-2.5"
            style={{ backgroundColor: "#004085" }}
            data-ocid="admin.pin_submit"
          >
            Unlock Dashboard
          </Button>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

export function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [phoneLeads, setPhoneLeads] = useState<PhoneLead[]>([]);

  const loadData = useCallback(() => {
    try {
      const rawUsers = localStorage.getItem("welkee_users");
      setUsers(rawUsers ? (JSON.parse(rawUsers) as StoredUser[]) : []);
    } catch {
      setUsers([]);
    }
    try {
      const rawLeads = localStorage.getItem("welkee_phone_leads");
      setPhoneLeads(rawLeads ? (JSON.parse(rawLeads) as PhoneLead[]) : []);
    } catch {
      setPhoneLeads([]);
    }
  }, []);

  useEffect(() => {
    if (unlocked) {
      loadData();
    }
  }, [unlocked, loadData]);

  if (!unlocked) {
    return <PinGate onUnlock={() => setUnlocked(true)} />;
  }

  const sortedLeads = [...phoneLeads].reverse();

  return (
    <div className="min-h-screen bg-gray-50" data-ocid="admin.page">
      {/* Header */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: "#004085" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white text-2xl font-bold tracking-tight">
              Welkee
            </span>
            <span className="text-blue-200 text-sm font-medium px-2 py-0.5 border border-blue-300 rounded">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className="bg-white text-blue-900 font-semibold text-sm px-3 py-1"
              data-ocid="admin.panel"
            >
              <Users size={14} className="mr-1.5" />
              {phoneLeads.length} Leads
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              className="border-white text-white hover:bg-white hover:text-blue-900 transition-colors"
              data-ocid="admin.button"
            >
              <RefreshCw size={14} className="mr-1.5" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Table 1 — Registered Users */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Registered Users
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              All users who have created an account on Welkee.
            </p>
          </div>

          {users.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-xl border border-gray-200"
              data-ocid="admin.users.empty_state"
            >
              <Users size={40} className="mb-3 text-gray-300" />
              <p className="text-base font-medium text-gray-500">
                No registered users yet.
              </p>
            </div>
          ) : (
            <div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              data-ocid="admin.users.table"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12 font-semibold text-gray-700">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Email Address
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Date of Signup
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u, idx) => (
                      <TableRow
                        key={u.id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                        data-ocid={`admin.users.row.item.${idx + 1}`}
                      >
                        <TableCell className="text-gray-400 text-sm">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {u.email}
                        </TableCell>
                        <TableCell className="text-gray-600 text-sm">
                          {u.signupDate ?? "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </section>

        {/* Table 2 — Customer Leads */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Customer Leads</h2>
            <p className="text-gray-500 mt-1 text-sm">
              Phone numbers collected when users click Buy Now or WhatsApp
              Share.
            </p>
          </div>

          {sortedLeads.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-xl border border-gray-200"
              data-ocid="admin.leads.empty_state"
            >
              <Users size={40} className="mb-3 text-gray-300" />
              <p className="text-base font-medium text-gray-500">
                No leads captured yet.
              </p>
            </div>
          ) : (
            <div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              data-ocid="admin.leads.table"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12 font-semibold text-gray-700">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Customer Phone Number
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Time of Inquiry
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLeads.map((lead, idx) => (
                      <TableRow
                        key={lead.id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                        data-ocid={`admin.leads.row.item.${idx + 1}`}
                      >
                        <TableCell className="text-gray-400 text-sm">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-mono font-semibold text-gray-900">
                          +91 {lead.phone}
                        </TableCell>
                        <TableCell className="text-gray-600 text-sm whitespace-nowrap">
                          {new Date(lead.timestamp).toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 py-6 mt-8 border-t border-gray-200">
        © {new Date().getFullYear()} Welkee Admin Panel. Built with{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="underline hover:text-gray-600"
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
