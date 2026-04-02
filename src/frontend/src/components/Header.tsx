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
  { label: "About Us", page: "about" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="text-2xl font-extrabold tracking-wider text-[#004085] dark:text-blue-400 hover:opacity-80 transition-opacity shrink-0"
          data-ocid="header.link"
        >
          WELKEE
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* City Selector */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="hidden md:block text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004085] cursor-pointer"
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
        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
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
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Open menu"
              data-ocid="header.open_modal_button"
            >
              {menuOpen ? <X size={20} /> : <MoreVertical size={20} />}
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50"
                data-ocid="header.dropdown_menu"
              >
                {/* Mobile city selector inside menu */}
                <div className="md:hidden px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <label
                    htmlFor="mobile-city-select"
                    className="text-xs text-gray-500 dark:text-gray-400 block mb-1"
                  >
                    Select City
                  </label>
                  <select
                    id="mobile-city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
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
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-blue-50 dark:hover:bg-gray-700 ${
                      currentPage === item.page
                        ? "text-[#004085] dark:text-blue-400 bg-blue-50 dark:bg-gray-700"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                    data-ocid="header.link"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Divider */}
                <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

                {/* Login / Account section */}
                {!auth.user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuth(true);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2 text-[#004085] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                    data-ocid="header.open_modal_button"
                  >
                    <User size={16} />
                    Login / Account
                  </button>
                ) : (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500 truncate">
                      {truncateEmail(auth.user.email)}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        auth.logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
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
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={auth.login}
        onRegister={auth.register}
      />
    </header>
  );
}
