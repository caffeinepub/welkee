// LeadsContext is no longer used — gutted to prevent compile errors
import type { ReactNode } from "react";

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

export function LeadsProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useLeads(): LeadsContextValue {
  return {
    leads: [],
    addLead: () => {},
    clearLeads: () => {},
  };
}
