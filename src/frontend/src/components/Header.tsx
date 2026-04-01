import {
  ChevronDown,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  STATIC_BIKES,
  STATIC_ELECTRIC,
  STATIC_SCOOTERS,
} from "../data/staticData";
import type { EmailUser } from "../hooks/useEmailAuth";
import type { Bike } from "../hooks/useQueries";

const NAV_ITEMS = [
  { label: "New Bikes", value: "new" },
  { label: "Scooters", value: "scooter" },
  { label: "Electric", value: "electric" },
  { label: "Used Bikes", value: "used" },
  { label: "Reviews", value: "reviews" },
  { label: "Brands", value: "brands" },
  { label: "Offers", value: "offers" },
];

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"];

const ALL_BIKES: Bike[] = [
  ...STATIC_BIKES,
  ...STATIC_SCOOTERS,
  ...STATIC_ELECTRIC,
];

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLoginClick: () => void;
  user: EmailUser | null;
  onLogout: () => void;
  wishlistCount?: number;
  onWishlistClick?: () => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onSearchSelect: (bike: Bike) => void;
}

function truncateEmail(email: string) {
  return email.length > 15 ? `${email.slice(0, 15)}...` : email;
}

export function Header({
  activeTab,
  onTabChange,
  onLoginClick,
  user,
  onLogout,
  wishlistCount,
  onWishlistClick,
  selectedCity,
  onCityChange,
  onSearchSelect,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Bike[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = ALL_BIKES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.brand.toLowerCase().includes(q),
    ).slice(0, 6);
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelectBike(bike: Bike) {
    setSearchQuery(bike.name);
    setShowSuggestions(false);
    onSearchSelect(bike);
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
      data-ocid="header.panel"
    >
      {/* Primary Blue Header */}
      <div className="bg-welkee-blue">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
          {/* Logo */}
          <a
            href="/"
            className="flex-shrink-0 font-black text-2xl tracking-widest text-white"
            data-ocid="header.link"
          >
            WELKEE
          </a>

          {/* Search bar (desktop) */}
          <div className="hidden md:flex flex-1 mx-2 relative" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Search bikes, brands, models..."
              className="w-full h-10 rounded-full pl-4 pr-12 text-sm text-gray-800 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-welkee-orange"
              data-ocid="header.search_input"
            />
            <button
              type="button"
              className="absolute right-1 top-1 bottom-1 px-3 bg-welkee-orange hover:bg-welkee-orange-dark rounded-full text-white transition-colors"
            >
              <Search size={16} />
            </button>
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                {suggestions.map((bike) => (
                  <button
                    key={bike.name}
                    type="button"
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-welkee-blue flex items-center justify-between gap-2"
                    onMouseDown={() => handleSelectBike(bike)}
                    data-ocid="header.button"
                  >
                    <span className="flex items-center gap-2">
                      <Search
                        size={13}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span>{bike.name}</span>
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {bike.brand}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* City Selector */}
          <div className="hidden md:block relative flex-shrink-0" ref={cityRef}>
            <button
              type="button"
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center gap-1.5 text-white text-sm font-medium hover:text-orange-200 transition-colors"
              data-ocid="header.button"
            >
              <MapPin size={14} />
              <span className="max-w-[80px] truncate">{selectedCity}</span>
              <ChevronDown size={13} />
            </button>
            {showCityDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 min-w-[140px] overflow-hidden">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      selectedCity === city
                        ? "bg-blue-50 text-welkee-blue font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onMouseDown={() => {
                      onCityChange(city);
                      setShowCityDropdown(false);
                    }}
                    data-ocid="header.button"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className="w-7 h-7 bg-welkee-orange rounded-full flex items-center justify-center">
                    <User size={14} />
                  </div>
                  <span className="font-medium">
                    {truncateEmail(user.email)}
                  </span>
                  <button
                    type="button"
                    onClick={onWishlistClick}
                    className="relative hover:opacity-80 transition-opacity ml-1"
                    aria-label="My Wishlist"
                    data-ocid="header.button"
                  >
                    <Heart size={18} className="text-white fill-red-400" />
                    {wishlistCount !== undefined && wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-white text-sm font-medium hover:text-orange-200 transition-colors"
                  data-ocid="header.button"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="text-white text-sm font-medium hover:text-orange-200 transition-colors"
                  data-ocid="header.button"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="bg-welkee-orange hover:bg-welkee-orange-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                  data-ocid="header.button"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden ml-auto text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="header.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Secondary Nav Row */}
      <nav
        className="bg-white border-b border-gray-200 hidden md:block"
        data-ocid="header.panel"
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.value}>
                <button
                  type="button"
                  onClick={() => onTabChange(item.value)}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === item.value
                      ? "text-welkee-blue font-semibold"
                      : "text-gray-600 hover:text-welkee-blue"
                  }`}
                  data-ocid="header.tab"
                >
                  {item.label}
                  {activeTab === item.value && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-welkee-orange rounded-full" />
                  )}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={onWishlistClick}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1.5"
                data-ocid="header.tab"
              >
                <Heart size={14} />
                My Wishlist
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="p-4">
            <div className="relative mb-3" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bikes..."
                className="w-full h-10 rounded-full pl-4 pr-12 text-sm text-gray-800 bg-gray-100 border border-gray-200 focus:outline-none"
                data-ocid="header.search_input"
              />
              <Search
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                  {suggestions.map((bike) => (
                    <button
                      key={bike.name}
                      type="button"
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50"
                      onMouseDown={() => {
                        handleSelectBike(bike);
                        setMobileOpen(false);
                      }}
                      data-ocid="header.button"
                    >
                      {bike.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* City picker mobile */}
            <div className="mb-3">
              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-full h-10 rounded-xl px-3 text-sm text-gray-700 bg-gray-100 border border-gray-200 focus:outline-none"
              >
                <option value="Select City">Select City</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onTabChange(item.value);
                      setMobileOpen(false);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.value
                        ? "bg-blue-50 text-welkee-blue"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    data-ocid="header.tab"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onWishlistClick?.();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 flex items-center gap-2"
                  data-ocid="header.tab"
                >
                  <Heart size={14} />
                  My Wishlist
                </button>
              </li>
            </ul>
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
              {user ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex-1 border border-red-300 text-red-500 text-sm font-semibold py-2 rounded-full"
                  data-ocid="header.button"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onLoginClick}
                    className="flex-1 border border-welkee-blue text-welkee-blue text-sm font-semibold py-2 rounded-full"
                    data-ocid="header.button"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={onLoginClick}
                    className="flex-1 bg-welkee-orange text-white text-sm font-semibold py-2 rounded-full"
                    data-ocid="header.button"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
