import { createContext, useContext, useEffect, useState } from "react";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  vehicleName: string;
  formType: string;
  submittedAt: string;
}

interface LeadsContextValue {
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "submittedAt">) => void;
  clearLeads: () => void;
}

const LeadsContext = createContext<LeadsContextValue>({
  leads: [],
  addLead: () => {},
  clearLeads: () => {},
});

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = localStorage.getItem("welkee_leads");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("welkee_leads", JSON.stringify(leads));
  }, [leads]);

  const addLead = (lead: Omit<Lead, "id" | "submittedAt">) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      submittedAt: new Date().toLocaleString("en-IN"),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const clearLeads = () => setLeads([]);

  return (
    <LeadsContext.Provider value={{ leads, addLead, clearLeads }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  return useContext(LeadsContext);
}
