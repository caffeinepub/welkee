# Welkee — Lead Capture & Dashboard Privacy Fix

## Current State

- **MobileLeadPopup** (MobileLeadPopup.tsx): Already exists. Shows when Buy Now is clicked. Has a 'Skip & Continue' button that allows users to bypass phone capture and go directly to brand URL.
- **WhatsApp button** (VehicleCard.tsx): `handleWhatsAppClick` only records a click stat, then immediately opens the WhatsApp share URL — no phone capture popup shown.
- **AdminDashboard** (AdminDashboard.tsx): Uses a PIN of "7860". Only shows one table (old Leads table with name/phone/city/bikeName/formType/timestamp). Does NOT show Registered Users table. Does NOT show separate clean phone leads table. Currently has Vehicle Popularity data built in via clickStats utility.
- **Footer Admin button**: Already correctly gated by `isSuperAdmin` prop.
- **AuthContext**: Already correctly checks `mohdali7z7z00@gmail.com` / `20242025786786` for SUPER ADMIN.
- **clickStats.ts**: Has both click tracking and phone lead utilities (`getPhoneLeads`, `addPhoneLead`).
- **Admin PIN**: Currently set to "7860" — needs updating to "20242025786786".

## Requested Changes (Diff)

### Add
- Show MobileLeadPopup when WhatsApp button is clicked too (before opening WhatsApp share link)
- Registered Users table in AdminDashboard: columns = Email Address, Date of Signup
- Phone Leads table in AdminDashboard: columns = Customer Phone Number, Time of Inquiry
- Auth system already stores users in localStorage `welkee_users` — add `signupDate` field to stored user data

### Modify
- **MobileLeadPopup**: Make it MANDATORY — remove the 'Skip & Continue' button and backdrop/close button that allow bypassing without entering a number. The only way to proceed is entering a valid phone number and submitting.
- **MobileLeadPopup**: Update title/text to match: "Enter your Mobile Number to get the Official Brand Link & Special Offers."
- **VehicleCard**: WhatsApp button must now show MobileLeadPopup (storing phone lead) BEFORE opening the WhatsApp share URL
- **AdminDashboard**: Replace existing single table with two clean tables. Remove Vehicle Popularity section entirely.
  - Table 1 (Users): Email Address | Date of Signup
  - Table 2 (Leads): Customer Phone Number | Time of Inquiry
- **AdminDashboard**: Update PIN from "7860" to "20242025786786" (but maxLength on input may need increasing)
- **AuthContext**: When a new user registers, store `signupDate` (ISO string or locale string) alongside email/password in localStorage

### Remove
- 'Skip & Continue without saving' button from MobileLeadPopup
- Backdrop click-to-dismiss (cancel) from MobileLeadPopup
- Close X button from MobileLeadPopup
- Vehicle Popularity table/section from AdminDashboard
- Old leads table format (name/city/formType columns) — replaced by the two clean tables

## Implementation Plan

1. **MobileLeadPopup.tsx** — Remove skip/cancel/close functionality. Make phone number submission mandatory. Update heading text. After submit, open either brandUrl (Buy Now flow) or whatsappUrl (WhatsApp flow) — accept an optional `whatsappUrl` prop to know which to open.
2. **VehicleCard.tsx** — Add `showWhatsAppLeadPopup` state. On WhatsApp button click, show MobileLeadPopup with whatsappUrl set. After number submitted, open WhatsApp share URL.
3. **AuthContext.tsx** — Add `signupDate` to StoredUser type. Save `new Date().toLocaleString('en-IN')` when registering a new user.
4. **AdminDashboard.tsx** — Update PIN to "20242025786786". Remove old leads table and Vehicle Popularity. Add Table 1 reading from `welkee_users` localStorage (email + signupDate). Add Table 2 reading from `welkee_phone_leads` localStorage (phone + timestamp formatted). Increase PIN input maxLength to 14.
