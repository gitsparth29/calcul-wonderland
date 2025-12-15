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

// Calculator pages
import MortgageCalculator from "./pages/finance/MortgageCalculator";
import BMICalculator from "./pages/health/BMICalculator";
import PercentageCalculator from "./pages/math/PercentageCalculator";
import AgeCalculator from "./pages/tools/AgeCalculator";

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
          
          {/* Health Routes */}
          <Route path="/health" element={<HealthCategory />} />
          <Route path="/health/bmi" element={<BMICalculator />} />
          
          {/* Math Routes */}
          <Route path="/math" element={<MathCategory />} />
          <Route path="/math/percentage" element={<PercentageCalculator />} />
          
          {/* Tools Routes */}
          <Route path="/tools" element={<ToolsCategory />} />
          <Route path="/tools/age" element={<AgeCalculator />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
