import { createContext, useContext, useState } from "react";
import type { Vehicle } from "../data/vehicleData";

interface CompareContextValue {
  compareList: Vehicle[];
  addToCompare: (v: Vehicle) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextValue>({
  compareList: [],
  addToCompare: () => false,
  removeFromCompare: () => {},
  clearCompare: () => {},
  isInCompare: () => false,
});

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Vehicle[]>([]);

  const addToCompare = (v: Vehicle): boolean => {
    if (compareList.length >= 3) return false;
    if (compareList.find((c) => c.id === v.id)) return false;
    setCompareList((prev) => [...prev, v]);
    return true;
  };

  const removeFromCompare = (id: string) =>
    setCompareList((prev) => prev.filter((v) => v.id !== id));

  const clearCompare = () => setCompareList([]);
  const isInCompare = (id: string) => compareList.some((v) => v.id === id);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
