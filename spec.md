# Welkee — Unified Auth & Lead System (Stable Version)

## Current State

- **Auth**: Email/Password login/signup via `AuthContext.tsx`. Signup only requires email + password (no mobile number). Users stored in localStorage (`welkee_users`). Sessions stored in sessionStorage (auto-logout on tab close + 30min inactivity timer). Owner credentials (mohdali7z7z00@gmail.com / 20242025786786) grant SUPER_ADMIN status.
- **Lead capture**: When any user (guest or logged-in) clicks 'Buy Now' or 'WhatsApp Share', `MobileLeadPopup` fires asking for a phone number. Phone leads stored separately in localStorage (`welkee_phone_leads`). No link between phone leads and user accounts.
- **Admin Dashboard** (`AdminDashboard.tsx`): Two separate tables — "Registered Users" (email + signup date) and "Customer Leads" (phone + time). PIN: 20242025786786. Footer Admin button visible only to SUPER_ADMIN.
- **Flow problem**: Guests can browse freely but are hit with a phone number popup on every Buy Now / WhatsApp click with no auth gate. Logged-in users also see the phone popup every time.

## Requested Changes (Diff)

### Add
- **Mobile number field to signup form**: Signup requires Email + Password + Mobile Number. Mobile number saved alongside email in the user record.
- **Auth gate on action buttons**: When a guest (not logged in) clicks 'Buy Now' or 'WhatsApp Share' on any VehicleCard or VehicleDetailModal, show a Login/Signup modal instead of the phone popup. After successful login/signup, immediately execute the original action (open brand URL or WhatsApp link).
- **Seamless post-login redirect**: Once logged in, Buy Now and WhatsApp buttons open the official brand link directly — no additional popups.
- **New unified Admin table** — "Registered Leads": columns: # | Email Address | Linked Mobile Number | Signup Date. Replace the two old tables with this one.

### Modify
- **AuthContext**: Add `mobile` field to `StoredUser`. `register()` function now accepts `email, password, mobile`. Save mobile linked to email.
- **AuthModal / SignupForm**: Add a mobile number input field (10-digit Indian number). Validate format.
- **VehicleCard**: Remove `MobileLeadPopup` from Buy Now / WhatsApp handlers. Instead check `user` from AuthContext — if null, show AuthModal with `pendingAction` (buy or whatsapp + vehicle info). If logged in, directly open the brand/WhatsApp URL.
- **VehicleDetailModal**: Same change as VehicleCard — replace phone popup with auth gate.
- **AdminDashboard**: Replace two-table layout with one "Registered Leads" table: columns # | Email Address | Linked Mobile Number | Signup Date. Read from `welkee_users` localStorage key.
- **Footer Admin button**: Unchanged — visible only to SUPER_ADMIN.
- **Session security**: Unchanged — sessionStorage + 30min inactivity.
- **Footer branding**: Unchanged — no Caffeine.ai watermark, only "© 2026 WELKEE. All Rights Reserved."

### Remove
- `MobileLeadPopup` component — no longer needed (replace with auth gate)
- `LeadsContext` (welkee_leads localStorage) — no longer needed
- `clickStats.ts` (welkee_phone_leads) — no longer needed
- "Customer Leads" table from AdminDashboard
- "Registered Users" table from AdminDashboard (replaced by unified Registered Leads table)
- Any separate phone lead storage logic

## Implementation Plan

1. **Update `AuthContext.tsx`**: Add `mobile: string` to `StoredUser`. Update `register(email, password, mobile)` signature. Save mobile alongside email/password/signupDate.

2. **Update `AuthModal.tsx`**: Add mobile number input to signup form. Validate 10-digit Indian number. Pass mobile to `register()`. Add optional `onSuccess` callback prop and `pendingAction` prop so calling components can trigger an action immediately after successful auth.

3. **Update `VehicleCard.tsx`**: Replace `showLeadPopup`/`showWhatsAppPopup` states + `MobileLeadPopup` usage with auth-gate logic. If `user` is null → show `AuthModal` with a `pendingAction`. If user is logged in → directly `window.open(brandUrl)` or open WhatsApp link.

4. **Update `VehicleDetailModal.tsx`**: Same auth-gate pattern as VehicleCard.

5. **Update `AdminDashboard.tsx`**: Remove two-table layout. Add one table "Registered Leads" reading from `welkee_users` with columns: # | Email Address | Linked Mobile Number | Signup Date.

6. **Delete** `MobileLeadPopup.tsx`, `LeadsContext.tsx`, `clickStats.ts` (or gut their contents to avoid import errors — safer to empty them if imports exist elsewhere).

7. **Update `App.tsx`**: Remove `LeadsProvider` wrapper if LeadsContext is removed.

8. **Keep unchanged**: All 20 vehicle data/images, Footer, Header, ThemeContext, CityContext, CompareContext, all pages (About, EMI, Compare, Dealers, News, Privacy), Day/Night mode, city selector, 3-dot menu.
