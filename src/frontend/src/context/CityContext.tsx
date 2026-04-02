import { createContext, useContext, useState } from "react";

interface CityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const CityContext = createContext<CityContextType>({
  selectedCity: "Delhi",
  setSelectedCity: () => {},
});

export const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState(
    () => localStorage.getItem("welkee_city") || "Delhi",
  );

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    localStorage.setItem("welkee_city", city);
  };

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext() {
  return useContext(CityContext);
}
