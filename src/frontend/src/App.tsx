import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AdminDashboard } from "./components/AdminDashboard";
import { AuthModal } from "./components/AuthModal";
import { BikeComparison } from "./components/BikeComparison";
import { BikeDetailsPage } from "./components/BikeDetailsPage";
import { BikesSection } from "./components/BikesSection";
import { BrandsSection } from "./components/BrandsSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LeadPopup } from "./components/LeadPopup";
import { WishlistPage } from "./components/WishlistPage";
import { Toaster } from "./components/ui/sonner";
import { STATIC_BIKES, STATIC_BRANDS } from "./data/staticData";
import { useEmailAuth } from "./hooks/useEmailAuth";
import {
  type Bike,
  useGetAllBrands,
  useGetFeaturedBikes,
} from "./hooks/useQueries";
import { useWishlist } from "./hooks/useWishlist";

const queryClient = new QueryClient();

type CurrentView = "home" | "wishlist" | { type: "bike-detail"; bike: Bike };

function AppContent() {
  const [activeTab, setActiveTab] = useState("new");
  const [currentView, setCurrentView] = useState<CurrentView>("home");
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [leadPopup, setLeadPopup] = useState<{
    open: boolean;
    bike: Bike | null;
    type: "offers" | "price";
  }>({
    open: false,
    bike: null,
    type: "offers",
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { user, login, register, logout } = useEmailAuth();
  const userId = user?.id?.toString() ?? null;
  const {
    wishlist,
    toggleWishlist,
    isWishlisted,
    count: wishlistCount,
  } = useWishlist(userId);

  const { data: apiBikes } = useGetFeaturedBikes();
  const { data: apiBrands } = useGetAllBrands();

  const bikes = apiBikes && apiBikes.length > 0 ? apiBikes : STATIC_BIKES;
  const brands = apiBrands && apiBrands.length > 0 ? apiBrands : STATIC_BRANDS;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (currentView !== "home") setCurrentView("home");
    document
      .getElementById("bikes-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBikeClick = (bike: Bike) => {
    setCurrentView({ type: "bike-detail", bike });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSelect = (bike: Bike) => {
    setCurrentView({ type: "bike-detail", bike });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLeadOpen = (bike: Bike, type: "offers" | "price") => {
    setLeadPopup({ open: true, bike, type });
  };

  const handleBrandClick = (brandName: string) => {
    setActiveBrand((prev) => (prev === brandName ? null : brandName));
    if (currentView !== "home") setCurrentView("home");
    document
      .getElementById("bikes-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWishlistToggle = (bikeName: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    const result = toggleWishlist(bikeName);
    if (result === "added") toast.success(`${bikeName} saved to wishlist`);
    else if (result === "removed")
      toast.info(`${bikeName} removed from wishlist`);
  };

  const handleWishlistClick = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setCurrentView("wishlist");
  };

  return (
    <div className="min-h-screen bg-welkee-gray font-sans">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLoginClick={() => setAuthModalOpen(true)}
        user={user}
        onLogout={logout}
        wishlistCount={wishlistCount}
        onWishlistClick={handleWishlistClick}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onSearchSelect={handleSearchSelect}
      />

      {/* Spacer for fixed header */}
      <div className="h-[108px] md:h-[108px]" />

      {currentView === "home" ? (
        <main>
          <HeroSection
            onSearch={() =>
              document
                .getElementById("bikes-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />

          <div className="max-w-7xl mx-auto">
            <div className="bg-welkee-gray">
              <BrandsSection
                brands={brands}
                onBrandClick={handleBrandClick}
                activeBrand={activeBrand}
              />

              <div id="bikes-section">
                <BikesSection
                  bikes={bikes.filter(
                    (b) => b.category === "new" || activeTab === "new",
                  )}
                  activeCategory={activeTab}
                  onCategoryChange={handleTabChange}
                  onBikeClick={handleBikeClick}
                  onLeadOpen={handleLeadOpen}
                  activeBrand={activeBrand}
                  onBrandChange={setActiveBrand}
                  isLoggedIn={!!user}
                  isWishlisted={isWishlisted}
                  onWishlistToggle={handleWishlistToggle}
                  selectedCity={selectedCity}
                />
              </div>

              <BikeComparison />
            </div>
          </div>
        </main>
      ) : currentView === "wishlist" ? (
        <WishlistPage
          wishlist={wishlist}
          onBack={() => setCurrentView("home")}
          onBikeClick={handleBikeClick}
          onWishlistToggle={handleWishlistToggle}
          selectedCity={selectedCity}
        />
      ) : (
        <BikeDetailsPage
          bike={currentView.bike}
          onBack={() => setCurrentView("home")}
          selectedCity={selectedCity}
          allBikes={bikes}
          onBikeSelect={handleBikeClick}
        />
      )}

      <Footer />

      <LeadPopup
        open={leadPopup.open}
        onClose={() => setLeadPopup((prev) => ({ ...prev, open: false }))}
        bikeName={leadPopup.bike?.name ?? ""}
        type={leadPopup.type}
      />

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={async (email, pass) => {
          const result = await login(email, pass);
          if ("err" in result) return result.err;
          return null;
        }}
        onRegister={async (email, pass) => {
          const result = await register(email, pass);
          if ("err" in result) return result.err;
          return null;
        }}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? <AdminDashboard /> : <AppContent />}
    </QueryClientProvider>
  );
}
