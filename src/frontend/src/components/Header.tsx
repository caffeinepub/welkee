import { Moon, MoreVertical, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CITIES, useCityContext } from "../context/CityContext";
import { useTheme } from "../context/ThemeContext";
import { AuthModal } from "./AuthModal";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { label: "Home", page: "home" },
  { label: "All Vehicles", page: "all-vehicles" },
  { label: "EMI Calculator", page: "emi" },
];

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { selectedCity, setSelectedCity } = useCityContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const auth = useAuth();

  const truncateEmail = (email: string) =>
    email.length > 20 ? `${email.slice(0, 20)}...` : email;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a] shadow-lg border-b border-yellow-900/30">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center gap-3">
        {/* LEFT: Large Gold Medallion Emblem with Lion Logo inside */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-4 shrink-0 hover:opacity-90 transition-opacity"
          aria-label="Go to homepage"
          data-ocid="header.link"
        >
          {/* Gold Circular Medallion Frame with Lion inside */}
          <div
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              flexShrink: 0,
            }}
          >
            {/* Clean white circular background behind the lion */}
            <div
              style={{
                position: "absolute",
                inset: "14%",
                borderRadius: "50%",
                background: "#ffffff",
                zIndex: 1,
              }}
            />

            {/* Lion logo inside — on white background, no black boxes */}
            <img
              src="/assets/generated/welkee-lion-clean-white.dim_400x400.png"
              alt="Welkee Lion"
              style={{
                position: "absolute",
                inset: "14%",
                width: "72%",
                height: "72%",
                objectFit: "cover",
                borderRadius: "50%",
                zIndex: 2,
              }}
            />

            {/* Gold medallion frame ring overlay on top */}
            <img
              src="/assets/generated/welkee-gold-medallion-v2-transparent.dim_500x500.png"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Compact WELKEE brand name ONLY — no tagline */}
          <span
            style={{
              color: "#FFD700",
              fontFamily: "'Inter', 'Roboto', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "0.15em",
              textShadow: "0 1px 8px rgba(255,215,0,0.25)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            WELKEE
          </span>
        </button>

        {/* SPACER */}
        <div className="flex-1" />

        {/* City Selector */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="hidden md:block text-sm border border-yellow-900/40 rounded-lg px-3 py-1.5 bg-[#111130] text-yellow-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] cursor-pointer shrink-0"
          aria-label="Select city"
          data-ocid="header.select"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-yellow-900/30 transition-colors text-yellow-400"
            aria-label="Toggle theme"
            data-ocid="header.toggle"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Three-dot menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 rounded-full hover:bg-yellow-900/30 transition-colors text-yellow-400"
              aria-label="Open menu"
              data-ocid="header.open_modal_button"
            >
              {menuOpen ? <X size={20} /> : <MoreVertical size={20} />}
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-12 w-56 bg-[#0a0a1a] rounded-xl shadow-xl border border-yellow-900/40 py-2 z-50"
                data-ocid="header.dropdown_menu"
              >
                {/* Mobile city selector inside menu */}
                <div className="md:hidden px-4 py-2 border-b border-yellow-900/30">
                  <label
                    htmlFor="mobile-city-select"
                    className="text-xs text-yellow-600 block mb-1"
                  >
                    Select City
                  </label>
                  <select
                    id="mobile-city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full text-sm border border-yellow-900/40 rounded-lg px-2 py-1.5 bg-[#111130] text-yellow-300 focus:outline-none"
                    data-ocid="header.select"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nav items */}
                {menuItems.map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      onNavigate(item.page);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-yellow-900/20 ${
                      currentPage === item.page
                        ? "text-[#FFD700] bg-yellow-900/20"
                        : "text-yellow-200"
                    }`}
                    data-ocid="header.link"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Divider */}
                <div className="border-t border-yellow-900/30 my-1" />

                {/* Login / Account section */}
                {!auth.user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuth(true);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2 text-[#FFD700] hover:bg-yellow-900/20 transition-colors"
                    data-ocid="header.open_modal_button"
                  >
                    <User size={16} />
                    Login / Account
                  </button>
                ) : (
                  <>
                    <div className="px-4 py-2 text-xs text-yellow-600 truncate">
                      {truncateEmail(auth.user.email)}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        auth.logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-900/20 transition-colors"
                      data-ocid="header.button"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </header>
  );
}
