import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CityProvider } from "./context/CityContext";
import { CompareProvider } from "./context/CompareContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AboutPage } from "./pages/AboutPage";
import { AdminPage } from "./pages/AdminPage";
import { AllVehiclesPage } from "./pages/AllVehiclesPage";
import { ComparePage } from "./pages/ComparePage";
import { ContactPage } from "./pages/ContactPage";
import { DealersPage } from "./pages/DealersPage";
import { EMIPage } from "./pages/EMIPage";
import { HomePage } from "./pages/HomePage";
import { NewsPage } from "./pages/NewsPage";
import { PrivacyPage } from "./pages/PrivacyPage";

const queryClient = new QueryClient();

type Page =
  | "home"
  | "all-vehicles"
  | "compare"
  | "emi"
  | "contact"
  | "about"
  | "privacy"
  | "admin"
  | "dealers"
  | "news";

function getInitialPage(): Page {
  const path = window.location.pathname;
  if (path === "/all-vehicles" || path === "/catalog") return "all-vehicles";
  if (path === "/compare") return "compare";
  if (path === "/emi-calculator") return "emi";
  if (path === "/contact") return "contact";
  if (path === "/about") return "about";
  if (path === "/privacy") return "privacy";
  if (path === "/dealers") return "dealers";
  if (path === "/news") return "news";
  return "home";
}

function AppShell() {
  const [page, setPage] = useState<Page>(getInitialPage);
  const { isSuperAdmin } = useAuth();

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "admin") {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header currentPage={page} onNavigate={navigate} />
      <div className="h-16" />
      <div className="flex-1">
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "all-vehicles" && <AllVehiclesPage />}
        {page === "compare" && <ComparePage onNavigate={navigate} />}
        {page === "emi" && <EMIPage />}
        {page === "contact" && <ContactPage />}
        {page === "about" && <AboutPage />}
        {page === "privacy" && <PrivacyPage />}
        {page === "dealers" && <DealersPage />}
        {page === "news" && <NewsPage />}
      </div>
      <Footer onNavigate={navigate} isSuperAdmin={isSuperAdmin} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CityProvider>
          <CompareProvider>
            <AuthProvider>
              <AppShell />
            </AuthProvider>
          </CompareProvider>
        </CityProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
