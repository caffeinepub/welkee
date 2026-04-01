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
import { KeyRound, RefreshCw, Trash2, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type Lead, getLeads } from "../utils/leadsStorage";

const ADMIN_PIN = "7860";

function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleString();
}

function formatFormType(t: string): string {
  if (t === "test-ride") return "Test Ride";
  if (t === "offers") return "Get Offers";
  return t.charAt(0).toUpperCase() + t.slice(1);
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
            maxLength={6}
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
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (unlocked) {
      setLeads(getLeads());
    }
  }, [unlocked]);

  function refreshLeads() {
    setLeads(getLeads());
  }

  if (!unlocked) {
    return <PinGate onUnlock={() => setUnlocked(true)} />;
  }

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
              {leads.length} Leads
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshLeads}
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leads Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">
            All enquiries submitted via Get Offers and Book a Test Ride forms.
          </p>
        </div>

        {leads.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-gray-400"
            data-ocid="admin.empty_state"
          >
            <Users size={48} className="mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-500">No leads yet</p>
            <p className="text-sm mt-1">
              Leads will appear here once users fill out the enquiry forms.
            </p>
          </div>
        ) : (
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            data-ocid="admin.table"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-12 font-semibold text-gray-700">
                      #
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Phone
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      City
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Bike Name
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Type
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Date / Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead, idx) => (
                    <TableRow
                      key={lead.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                      data-ocid={`admin.row.item.${idx + 1}`}
                    >
                      <TableCell className="text-gray-400 text-sm">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-gray-600 font-mono text-sm">
                        {lead.phone}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {lead.city}
                      </TableCell>
                      <TableCell className="text-gray-700 font-medium">
                        {lead.bikeName}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lead.formType === "test-ride"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {formatFormType(lead.formType)}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                        {formatTimestamp(lead.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {leads.length > 0 && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => {
                if (confirm("Clear all leads? This cannot be undone.")) {
                  localStorage.removeItem("welkee_leads");
                  setLeads([]);
                }
              }}
            >
              <Trash2 size={14} className="mr-1.5" />
              Clear All Leads
            </Button>
          </div>
        )}
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
