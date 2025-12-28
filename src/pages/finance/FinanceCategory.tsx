import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/home/CalculatorCard";
import { 
  Home, 
  CreditCard, 
  Car, 
  Percent, 
  Wallet, 
  PiggyBank,
  TrendingUp,
  DollarSign,
  Receipt,
  Building,
  Clock,
  Calculator
} from "lucide-react";

const calculators = [
  {
    title: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments and total interest",
    icon: <Home className="h-5 w-5" />,
    path: "/finance/mortgage",
  },
  {
    title: "Loan Calculator",
    description: "Calculate loan payments and amortization schedules",
    icon: <DollarSign className="h-5 w-5" />,
    path: "/finance/loan",
  },
  {
    title: "Auto Loan Calculator",
    description: "Calculate car loan payments and total cost",
    icon: <Car className="h-5 w-5" />,
    path: "/finance/auto-loan",
  },
  {
    title: "Payment Calculator",
    description: "Calculate monthly payments for any loan",
    icon: <CreditCard className="h-5 w-5" />,
    path: "/finance/payment",
  },
  {
    title: "Compound Interest",
    description: "See how your investments grow over time",
    icon: <TrendingUp className="h-5 w-5" />,
    path: "/finance/compound-interest",
  },
  {
    title: "Investment Calculator",
    description: "Plan your investment returns",
    icon: <PiggyBank className="h-5 w-5" />,
    path: "/finance/investment",
  },
  {
    title: "Retirement Calculator",
    description: "Plan for your retirement savings",
    icon: <Building className="h-5 w-5" />,
    path: "/finance/retirement",
  },
  {
    title: "Credit Card Interest",
    description: "Calculate credit card interest and payoff time",
    icon: <CreditCard className="h-5 w-5" />,
    path: "/finance/credit-card",
  },
  {
    title: "Interest Rate Calculator",
    description: "Calculate interest rates from payment info",
    icon: <Percent className="h-5 w-5" />,
    path: "/finance/interest-rate",
  },
  {
    title: "Inflation Calculator",
    description: "See how inflation affects purchasing power",
    icon: <TrendingUp className="h-5 w-5" />,
    path: "/finance/inflation",
  },
  {
    title: "Income Tax Calculator",
    description: "Estimate your federal income tax",
    icon: <Receipt className="h-5 w-5" />,
    path: "/finance/income-tax",
  },
  {
    title: "Salary Calculator",
    description: "Convert between hourly, monthly, and annual salary",
    icon: <Wallet className="h-5 w-5" />,
    path: "/finance/salary",
  },
  {
    title: "Sales Tax Calculator",
    description: "Calculate sales tax for purchases",
    icon: <Receipt className="h-5 w-5" />,
    path: "/finance/sales-tax",
  },
  {
    title: "Debt Payoff Calculator",
    description: "Plan your debt payoff strategy",
    icon: <Clock className="h-5 w-5" />,
    path: "/finance/debt-payoff",
  },
  {
    title: "Amortization Calculator",
    description: "Generate amortization schedules",
    icon: <Calculator className="h-5 w-5" />,
    path: "/finance/amortization",
  },
];

const FinanceCategory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero">
        <div className="container py-12">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-4 shadow-medium">
              <DollarSign className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Finance Calculators
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Calculate mortgages, loans, investments, and more with our free financial tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {calculators.map((calc, index) => (
              <div
                key={calc.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CalculatorCard {...calc} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FinanceCategory;
