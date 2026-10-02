"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Currency = "USD" | "GBP" | "EUR" | "AUD" | "CAD";

export const CURRENCIES: { code: Currency; symbol: string; label: string; rate: number }[] = [
  { code: "USD", symbol: "$",  label: "US Dollar",         rate: 1.00 },
  { code: "GBP", symbol: "£",  label: "British Pound",     rate: 0.79 },
  { code: "EUR", symbol: "€",  label: "Euro",              rate: 0.92 },
  { code: "AUD", symbol: "A$", label: "Australian Dollar", rate: 1.53 },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar",   rate: 1.36 },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("murall_currency") as Currency | null;
    if (saved && CURRENCIES.some((c) => c.code === saved)) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("murall_currency", c);
  }, []);

  const formatPrice = useCallback((usdAmount: number): string => {
    const cur = CURRENCIES.find((c) => c.code === currency)!;
    const converted = Math.round(usdAmount * cur.rate);
    const prefix = currency !== "USD" ? "~" : "";
    return `${prefix}${cur.symbol}${converted}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
