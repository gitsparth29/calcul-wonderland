import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface Calculator {
  title: string;
  path: string;
  category: string;
}

const allCalculators: Calculator[] = [
  // Finance
  { title: "Mortgage Calculator", path: "/finance/mortgage", category: "Finance" },
  { title: "Loan Calculator", path: "/finance/loan", category: "Finance" },
  { title: "Auto Loan Calculator", path: "/finance/auto-loan", category: "Finance" },
  { title: "Compound Interest Calculator", path: "/finance/compound-interest", category: "Finance" },
  { title: "Investment Calculator", path: "/finance/investment", category: "Finance" },
  { title: "Retirement Calculator", path: "/finance/retirement", category: "Finance" },
  { title: "Credit Card Calculator", path: "/finance/credit-card", category: "Finance" },
  { title: "Interest Rate Calculator", path: "/finance/interest-rate", category: "Finance" },
  { title: "Salary Calculator", path: "/finance/salary", category: "Finance" },
  { title: "Sales Tax Calculator", path: "/finance/sales-tax", category: "Finance" },
  { title: "Debt Payoff Calculator", path: "/finance/debt-payoff", category: "Finance" },
  { title: "Amortization Calculator", path: "/finance/amortization", category: "Finance" },
  { title: "Inflation Calculator", path: "/finance/inflation", category: "Finance" },
  { title: "Income Tax Calculator", path: "/finance/income-tax", category: "Finance" },
  { title: "Payment Calculator", path: "/finance/payment", category: "Finance" },
  // Health
  { title: "BMI Calculator", path: "/health/bmi", category: "Health" },
  { title: "Calorie Calculator", path: "/health/calorie", category: "Health" },
  { title: "Body Fat Calculator", path: "/health/body-fat", category: "Health" },
  { title: "BMR Calculator", path: "/health/bmr", category: "Health" },
  { title: "Ideal Weight Calculator", path: "/health/ideal-weight", category: "Health" },
  { title: "Pace Calculator", path: "/health/pace", category: "Health" },
  { title: "Pregnancy Calculator", path: "/health/pregnancy", category: "Health" },
  { title: "Due Date Calculator", path: "/health/due-date", category: "Health" },
  { title: "Water Intake Calculator", path: "/health/water-intake", category: "Health" },
  { title: "Protein Intake Calculator", path: "/health/protein-intake", category: "Health" },
  // Math
  { title: "Percentage Calculator", path: "/math/percentage", category: "Math" },
  { title: "Scientific Calculator", path: "/math/scientific", category: "Math" },
  { title: "Random Number Generator", path: "/math/random", category: "Math" },
  { title: "Fraction Calculator", path: "/math/fraction", category: "Math" },
  { title: "Triangle Calculator", path: "/math/triangle", category: "Math" },
  { title: "Standard Deviation Calculator", path: "/math/standard-deviation", category: "Math" },
  // Tools
  { title: "Age Calculator", path: "/tools/age", category: "Tools" },
  { title: "Password Generator", path: "/tools/password", category: "Tools" },
  { title: "GPA Calculator", path: "/tools/gpa", category: "Tools" },
  { title: "Date Calculator", path: "/tools/date", category: "Tools" },
  { title: "Time Calculator", path: "/tools/time", category: "Tools" },
  { title: "Hours Calculator", path: "/tools/hours", category: "Tools" },
  { title: "Grade Calculator", path: "/tools/grade", category: "Tools" },
  { title: "Concrete Calculator", path: "/tools/concrete", category: "Tools" },
  { title: "Subnet Calculator", path: "/tools/subnet", category: "Tools" },
  { title: "Unit Converter", path: "/tools/conversion", category: "Tools" },
];

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredCalculators = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return allCalculators
      .filter(
        (calc) =>
          calc.title.toLowerCase().includes(lowerQuery) ||
          calc.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
  };

  const handleResultClick = () => {
    setQuery("");
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-12 pr-10 h-12 bg-background/80 backdrop-blur-sm border-border/50 rounded-xl text-base shadow-sm focus:shadow-md transition-shadow"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isFocused && filteredCalculators.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50">
          {filteredCalculators.map((calc) => (
            <Link
              key={calc.path}
              to={calc.path}
              onClick={handleResultClick}
              className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">{calc.title}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {calc.category}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isFocused && query && filteredCalculators.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg p-4 text-center z-50">
          <p className="text-muted-foreground">No calculators found for "{query}"</p>
        </div>
      )}
    </div>
  );
};
