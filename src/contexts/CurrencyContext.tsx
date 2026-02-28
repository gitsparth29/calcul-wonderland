import { createContext, useContext, useState, ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "JPY";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  locale: string;
}

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", locale: "en-US" },
  EUR: { code: "EUR", symbol: "€", locale: "de-DE" },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB" },
  INR: { code: "INR", symbol: "₹", locale: "en-IN" },
  JPY: { code: "JPY", symbol: "¥", locale: "ja-JP" },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  currencySymbol: string;
  formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const info = currencies[currency];

  const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(info.locale, {
      style: "currency",
      currency: info.code,
      ...options,
    }).format(value);

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, currencySymbol: info.symbol, formatCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};
