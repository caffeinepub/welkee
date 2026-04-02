const PHONE_LEADS_KEY = "welkee_phone_leads";

export interface PhoneLead {
  id: string;
  phone: string;
  vehicleName: string;
  vehicleId: string;
  timestamp: number;
}

export function getPhoneLeads(): PhoneLead[] {
  try {
    const raw = localStorage.getItem(PHONE_LEADS_KEY);
    return raw ? (JSON.parse(raw) as PhoneLead[]) : [];
  } catch {
    return [];
  }
}

export function addPhoneLead(
  phone: string,
  vehicleName: string,
  vehicleId: string,
): PhoneLead {
  const leads = getPhoneLeads();
  const newLead: PhoneLead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    phone,
    vehicleName,
    vehicleId,
    timestamp: Date.now(),
  };
  leads.push(newLead);
  localStorage.setItem(PHONE_LEADS_KEY, JSON.stringify(leads));
  return newLead;
}
