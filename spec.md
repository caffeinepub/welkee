# Welkee — Analytics & Lead Capture Upgrade

## Current State
- 20 real vehicles (10 bikes, 10 scooters) with authentic specs and images
- "Buy Now" buttons open official brand URLs in new tab (no lead forms)
- WhatsApp Share buttons on every card
- Authentication via localStorage: email/password with super-admin detection (mohdali7z7z00@gmail.com)
- Admin footer button only visible when isSuperAdmin === true
- AdminPage (/admin) behind PIN 20242025786786, currently shows one table: Customer Leads (from old LeadsContext)
- LeadsContext stores leads in localStorage with fields: name, phone, city, vehicleName, formType
- No click tracking or vehicle popularity tracking exists
- Registered users stored only in localStorage (welkee_users key)
- Backend has submitLead(), registerUser(), getLeads() but frontend uses localStorage only

## Requested Changes (Diff)

### Add
- **Click tracking context**: Track every "Buy Now" click and "WhatsApp Share" click per vehicle, stored in localStorage under `welkee_click_stats` as `{ [vehicleId]: { buyNow: number, whatsapp: number } }`
- **Mobile Lead Capture popup**: When user clicks "Buy Now" (or "Get Deal"), intercept the click and show a modal: "Enter your Mobile Number to access the Official Brand Site & Special Offers." Fields: phone number (required). On submit: save phone + vehicleName + timestamp to leads storage, then proceed to open the brand URL in new tab
- **CustomerLeads storage** in localStorage: `welkee_phone_leads` — array of `{ id, phone, vehicleName, clickType, timestamp }`
- **Registered Users list in Admin**: Read from existing `welkee_users` localStorage key and display emails in a table
- **Vehicle Popularity table in Admin**: Aggregated click totals per vehicle from `welkee_click_stats`
- **Customer Leads table in Admin**: Phone numbers from `welkee_phone_leads`

### Modify
- **VehicleCard.tsx**: 
  - "Buy Now" button: intercept click → record click stat → show mobile number popup → on submit, save lead + open brand URL
  - "WhatsApp Share" button: intercept click → record click stat → open WhatsApp URL
- **AdminPage.tsx**: Rebuild into 3 clear tabs/tables:
  1. "Registered Users" — emails from welkee_users localStorage
  2. "Vehicle Popularity" — click totals per vehicle (Buy Now + WhatsApp), sorted by most clicks
  3. "Customer Leads" — phone numbers from welkee_phone_leads
- **AdminDashboard.tsx** (if used): Keep consistent with AdminPage changes (AdminPage is the primary; AdminDashboard.tsx may be unused/redundant — check App.tsx routing)
- **Footer.tsx**: Admin button remains only visible to isSuperAdmin — no change needed, already correct

### Remove
- Old LeadsContext `addLead` being called on "Buy Now" (was already removed per previous build, confirm)
- No removal of any vehicle data, images, specs, or layout

## Implementation Plan
1. Add `welkee_click_stats` helpers and `welkee_phone_leads` helpers to a new utils file `clickStats.ts`
2. Create `MobileLeadPopup.tsx` — modal that collects phone number, calls back with phone then opens URL
3. Update `VehicleCard.tsx`: intercept Buy Now click (record stat, show popup); intercept WhatsApp click (record stat only)
4. Rebuild `AdminPage.tsx` with 3-table layout: Registered Users / Vehicle Popularity / Customer Leads, all from localStorage
5. Keep PIN gate as-is (20242025786786), keep isSuperAdmin footer gate as-is
