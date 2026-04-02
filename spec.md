# Welkee — Real Authentication & Owner Access

## Current State
- `useEmailAuth.ts` provides localStorage-based email/password auth with `login`, `register`, `logout`.
- `AuthModal.tsx` has a Login + Sign Up tabbed modal with proper error states.
- `Header.tsx` has a three-dot menu with 5 items (Home, All Vehicles, EMI Calculator, About Us, Contact Us). No login button is present in the menu.
- `Footer.tsx` has NO admin button — it was fully removed in Ghost Mode.
- `App.tsx` has a `handleLogoSecretClick` Shift+triple-click shortcut that navigates to admin page.
- `AdminPage.tsx` is PIN-protected at `20242025786786`.
- Auth state is not lifted to `App.tsx` — it was used only inside wishlist-related components.

## Requested Changes (Diff)

### Add
- **Login/Account button in Three-Dot Menu**: A new menu item at the top of the hamburger menu. Shows "Login / Account" when logged out; shows the user's email (truncated) + a Logout option when logged in.
- **AuthContext**: Lift authentication state (user, isSuperAdmin, login, register, logout) to a React context so all components can access it.
- **isSuperAdmin flag**: When the logged-in email is exactly `mohdali7z7z00@gmail.com` AND password used was `20242025786786`, set `isSuperAdmin = true` in context.
- **Admin button in Footer**: Conditionally render an "Admin" button in the footer bottom bar only when `isSuperAdmin === true`. For all other users (including logged-out), the button is 100% invisible.
- **Specific wrong-password error**: When a registered email exists but the password is wrong, return the error message "Wrong Password. Please try again." (distinct from account-not-found).
- **Admin navigation from footer**: Clicking the Admin button navigates to the admin page.

### Modify
- **useEmailAuth.ts**: Split the login error into two distinct cases — "email not found" vs "wrong password". Update the wrong-password message to "Wrong Password. Please try again."
- **Header.tsx**: Add the Login/Account menu item to `menuItems`. Pass auth state as props or read from AuthContext. When logged in, show email + logout.
- **Footer.tsx**: Accept `isSuperAdmin` and `onNavigate` props (already has `onNavigate`). Render a subtle "Admin" button in the bottom copyright bar, visible only when `isSuperAdmin === true`.
- **App.tsx**: Remove the `handleLogoSecretClick` and Shift+triple-click admin shortcut entirely. Wrap `AppShell` with an `AuthProvider`. Pass auth state down to Header and Footer. Keep admin page accessible only via the footer Admin button (for super admin) or direct navigation triggered by super admin.
- **AdminPage.tsx**: Keep PIN protection as-is. The super admin still must enter the PIN after navigating.

### Remove
- The `handleLogoSecretClick` handler and the `adminClickCount`/`lastAdminClick` state in `App.tsx`.
- The `onLogoSecretClick` prop from `Header.tsx`.
- All Shift+click or tap shortcuts for admin access.

## Implementation Plan
1. Create `src/frontend/src/context/AuthContext.tsx` — provides `user`, `isSuperAdmin`, `login`, `register`, `logout`.
   - Internally uses the same localStorage pattern from `useEmailAuth.ts`.
   - After successful login, check if email === `mohdali7z7z00@gmail.com` AND password === `20242025786786`, set `isSuperAdmin = true`.
   - Persist `isSuperAdmin` in localStorage session alongside user so it survives refresh.
   - Improve login error: if email found but password wrong → return "Wrong Password. Please try again."
2. Update `App.tsx`:
   - Wrap with `AuthProvider`.
   - Remove all Shift+click admin shortcut code.
   - Pass `isSuperAdmin` and `onNavigate` to `Footer`.
   - Pass auth context to `Header`.
3. Update `Header.tsx`:
   - Import and use `AuthContext`.
   - Add Login/Account item to menu: if not logged in → "Login / Account" button that opens AuthModal. If logged in → show truncated email + "Logout" button.
   - Render `AuthModal` when `showAuth` state is true.
4. Update `Footer.tsx`:
   - Accept `isSuperAdmin: boolean` prop.
   - In the bottom copyright bar, conditionally render an "Admin" button when `isSuperAdmin === true`.
5. Delete `useEmailAuth.ts` (or keep as unused) — auth is now in AuthContext.
