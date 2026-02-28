import { useCurrency, type CurrencyCode } from "@/contexts/CurrencyContext";
import { Label } from "@/components/ui/label";

const currencyOptions: { code: CurrencyCode; symbol: string }[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "JPY", symbol: "¥" },
];

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-3">
      <Label className="text-sm font-medium text-foreground">Currency:</Label>
      <div className="inline-flex rounded-lg border border-border overflow-hidden">
        {currencyOptions.map((opt) => (
          <button
            key={opt.code}
            onClick={() => setCurrency(opt.code)}
            className={`px-4 py-2 text-sm font-semibold transition-colors border-r last:border-r-0 border-border min-w-[44px] ${
              currency === opt.code
                ? "bg-destructive text-destructive-foreground"
                : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
            aria-label={`Select ${opt.code} currency`}
            aria-pressed={currency === opt.code}
          >
            {opt.symbol}
          </button>
        ))}
      </div>
    </div>
  );
};
