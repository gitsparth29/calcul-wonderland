import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CurrencyProvider } from "./contexts/CurrencyContext";
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
import InflationCalculator from "./pages/finance/InflationCalculator";
import IncomeTaxCalculator from "./pages/finance/IncomeTaxCalculator";
import PaymentCalculator from "./pages/finance/PaymentCalculator";

// Health Calculators
import BMICalculator from "./pages/health/BMICalculator";
import CalorieCalculator from "./pages/health/CalorieCalculator";
import BodyFatCalculator from "./pages/health/BodyFatCalculator";
import BMRCalculator from "./pages/health/BMRCalculator";
import IdealWeightCalculator from "./pages/health/IdealWeightCalculator";
import PaceCalculator from "./pages/health/PaceCalculator";
import PregnancyCalculator from "./pages/health/PregnancyCalculator";
import DueDateCalculator from "./pages/health/DueDateCalculator";
import WaterIntakeCalculator from "./pages/health/WaterIntakeCalculator";
import ProteinIntakeCalculator from "./pages/health/ProteinIntakeCalculator";

// Math Calculators
import PercentageCalculator from "./pages/math/PercentageCalculator";
import ScientificCalculator from "./pages/math/ScientificCalculator";
import RandomNumberGenerator from "./pages/math/RandomNumberGenerator";
import FractionCalculator from "./pages/math/FractionCalculator";
import TriangleCalculator from "./pages/math/TriangleCalculator";
import StandardDeviationCalculator from "./pages/math/StandardDeviationCalculator";

// Tools
import AgeCalculator from "./pages/tools/AgeCalculator";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import GPACalculator from "./pages/tools/GPACalculator";
import DateCalculator from "./pages/tools/DateCalculator";
import TimeCalculator from "./pages/tools/TimeCalculator";
import HoursCalculator from "./pages/tools/HoursCalculator";
import GradeCalculator from "./pages/tools/GradeCalculator";
import ConcreteCalculator from "./pages/tools/ConcreteCalculator";
import SubnetCalculator from "./pages/tools/SubnetCalculator";
import UnitConverter from "./pages/tools/UnitConverter";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
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
          <Route path="/finance/inflation" element={<InflationCalculator />} />
          <Route path="/finance/income-tax" element={<IncomeTaxCalculator />} />
          <Route path="/finance/payment" element={<PaymentCalculator />} />
          
          {/* Health Routes */}
          <Route path="/health" element={<HealthCategory />} />
          <Route path="/health/bmi" element={<BMICalculator />} />
          <Route path="/health/calorie" element={<CalorieCalculator />} />
          <Route path="/health/body-fat" element={<BodyFatCalculator />} />
          <Route path="/health/bmr" element={<BMRCalculator />} />
          <Route path="/health/ideal-weight" element={<IdealWeightCalculator />} />
          <Route path="/health/pace" element={<PaceCalculator />} />
          <Route path="/health/pregnancy" element={<PregnancyCalculator />} />
          <Route path="/health/due-date" element={<DueDateCalculator />} />
          <Route path="/health/water-intake" element={<WaterIntakeCalculator />} />
          <Route path="/health/protein-intake" element={<ProteinIntakeCalculator />} />
          
          {/* Math Routes */}
          <Route path="/math" element={<MathCategory />} />
          <Route path="/math/percentage" element={<PercentageCalculator />} />
          <Route path="/math/scientific" element={<ScientificCalculator />} />
          <Route path="/math/random" element={<RandomNumberGenerator />} />
          <Route path="/math/fraction" element={<FractionCalculator />} />
          <Route path="/math/triangle" element={<TriangleCalculator />} />
          <Route path="/math/standard-deviation" element={<StandardDeviationCalculator />} />
          
          {/* Tools Routes */}
          <Route path="/tools" element={<ToolsCategory />} />
          <Route path="/tools/age" element={<AgeCalculator />} />
          <Route path="/tools/password" element={<PasswordGenerator />} />
          <Route path="/tools/gpa" element={<GPACalculator />} />
          <Route path="/tools/date" element={<DateCalculator />} />
          <Route path="/tools/time" element={<TimeCalculator />} />
          <Route path="/tools/hours" element={<HoursCalculator />} />
          <Route path="/tools/grade" element={<GradeCalculator />} />
          <Route path="/tools/concrete" element={<ConcreteCalculator />} />
          <Route path="/tools/subnet" element={<SubnetCalculator />} />
          <Route path="/tools/conversion" element={<UnitConverter />} />
          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
