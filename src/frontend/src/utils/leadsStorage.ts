export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  bikeName: string;
  formType: string;
  timestamp: number;
}

const STORAGE_KEY = "welkee_leads";

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

export function addLead(
  name: string,
  phone: string,
  city: string,
  bikeName: string,
  formType: string,
): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    phone,
    city,
    bikeName,
    formType,
    timestamp: Date.now(),
  };
  leads.push(newLead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return newLead;
}
