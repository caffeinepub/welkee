const CLICK_STATS_KEY = "welkee_click_stats";
const PHONE_LEADS_KEY = "welkee_phone_leads";

export interface ClickStats {
  buyNow: number;
  whatsapp: number;
}

export function getClickStats(): Record<string, ClickStats> {
  try {
    const raw = localStorage.getItem(CLICK_STATS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, ClickStats>) : {};
  } catch {
    return {};
  }
}

export function recordClick(
  vehicleId: string,
  type: "buyNow" | "whatsapp",
): void {
  const stats = getClickStats();
  if (!stats[vehicleId]) {
    stats[vehicleId] = { buyNow: 0, whatsapp: 0 };
  }
  stats[vehicleId][type] += 1;
  localStorage.setItem(CLICK_STATS_KEY, JSON.stringify(stats));
}

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
