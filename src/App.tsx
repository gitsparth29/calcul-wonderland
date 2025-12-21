import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Category pages
import FinanceCategory from "./pages/finance/FinanceCategory";
import HealthCategory from "./pages/health/HealthCategory";
import MathCategory from "./pages/math/MathCategory";
import ToolsCategory from "./pages/tools/ToolsCategory";

// Finance Calculators
import MortgageCalculator from "./pages/finance/MortgageCalculator";
import LoanCalculator from "./pages/finance/LoanCalculator";
import AutoLoanCalculator from "./pages/finance/AutoLoanCalculator";
import CompoundInterestCalculator from "./pages/finance/CompoundInterestCalculator";
import InvestmentCalculator from "./pages/finance/InvestmentCalculator";
import RetirementCalculator from "./pages/finance/RetirementCalculator";
import CreditCardCalculator from "./pages/finance/CreditCardCalculator";
import InterestRateCalculator from "./pages/finance/InterestRateCalculator";
import SalaryCalculator from "./pages/finance/SalaryCalculator";
import SalesTaxCalculator from "./pages/finance/SalesTaxCalculator";
import DebtPayoffCalculator from "./pages/finance/DebtPayoffCalculator";
import AmortizationCalculator from "./pages/finance/AmortizationCalculator";

// Health Calculators
import BMICalculator from "./pages/health/BMICalculator";
import CalorieCalculator from "./pages/health/CalorieCalculator";

// Math Calculators
import PercentageCalculator from "./pages/math/PercentageCalculator";
import ScientificCalculator from "./pages/math/ScientificCalculator";
import RandomNumberGenerator from "./pages/math/RandomNumberGenerator";

// Tools
import AgeCalculator from "./pages/tools/AgeCalculator";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import GPACalculator from "./pages/tools/GPACalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Finance Routes */}
          <Route path="/finance" element={<FinanceCategory />} />
          <Route path="/finance/mortgage" element={<MortgageCalculator />} />
          <Route path="/finance/loan" element={<LoanCalculator />} />
          <Route path="/finance/auto-loan" element={<AutoLoanCalculator />} />
          <Route path="/finance/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/finance/investment" element={<InvestmentCalculator />} />
          <Route path="/finance/retirement" element={<RetirementCalculator />} />
          <Route path="/finance/credit-card" element={<CreditCardCalculator />} />
          <Route path="/finance/interest-rate" element={<InterestRateCalculator />} />
          <Route path="/finance/salary" element={<SalaryCalculator />} />
          <Route path="/finance/sales-tax" element={<SalesTaxCalculator />} />
          <Route path="/finance/debt-payoff" element={<DebtPayoffCalculator />} />
          <Route path="/finance/amortization" element={<AmortizationCalculator />} />
          
          {/* Health Routes */}
          <Route path="/health" element={<HealthCategory />} />
          <Route path="/health/bmi" element={<BMICalculator />} />
          <Route path="/health/calorie" element={<CalorieCalculator />} />
          
          {/* Math Routes */}
          <Route path="/math" element={<MathCategory />} />
          <Route path="/math/percentage" element={<PercentageCalculator />} />
          <Route path="/math/scientific" element={<ScientificCalculator />} />
          <Route path="/math/random" element={<RandomNumberGenerator />} />
          
          {/* Tools Routes */}
          <Route path="/tools" element={<ToolsCategory />} />
          <Route path="/tools/age" element={<AgeCalculator />} />
          <Route path="/tools/password" element={<PasswordGenerator />} />
          <Route path="/tools/gpa" element={<GPACalculator />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
