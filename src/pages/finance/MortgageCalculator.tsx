import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { PaymentBreakdownChart } from "@/components/charts/PaymentBreakdownChart";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, Calendar, TrendingUp } from "lucide-react";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    loanAmount: number;
  } | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      setResults(null);
      return;
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount: principal,
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CalculatorLayout
          title="Mortgage Calculator"
          description="Calculate your monthly mortgage payment, total interest, and create an amortization schedule"
          backLink="/finance"
          backLabel="Finance Calculators"
          icon={<Home className="h-8 w-8 text-primary-foreground" />}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                Loan Details
              </h3>
              
              <div className="space-y-5">
                <InputGroup
                  label="Home Price"
                  id="homePrice"
                  value={homePrice}
                  onChange={setHomePrice}
                  prefix="$"
                  placeholder="300,000"
                />
                
                <InputGroup
                  label="Down Payment"
                  id="downPayment"
                  value={downPayment}
                  onChange={setDownPayment}
                  prefix="$"
                  placeholder="60,000"
                />
                
                <InputGroup
                  label="Loan Term"
                  id="loanTerm"
                  value={loanTerm}
                  onChange={setLoanTerm}
                  suffix="years"
                  placeholder="30"
                />
                
                <InputGroup
                  label="Interest Rate"
                  id="interestRate"
                  value={interestRate}
                  onChange={setInterestRate}
                  suffix="%"
                  step={0.1}
                  placeholder="6.5"
                />
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-6"
                onClick={calculateMortgage}
              >
                Calculate Payment
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {results && (
                <>
                  <ResultCard
                    label="Monthly Payment"
                    value={formatCurrency(results.monthlyPayment)}
                    highlight
                    icon={<DollarSign className="h-5 w-5 text-primary-foreground" />}
                    subtext="Principal & Interest"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label="Loan Amount"
                      value={formatCurrency(results.loanAmount)}
                      icon={<Home className="h-5 w-5 text-muted-foreground" />}
                    />
                    <ResultCard
                      label="Loan Term"
                      value={`${loanTerm} years`}
                      icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
                    />
                  </div>
                  
                  <ResultCard
                    label="Total Interest"
                    value={formatCurrency(results.totalInterest)}
                    icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
                    subtext={`${((results.totalInterest / results.loanAmount) * 100).toFixed(1)}% of loan amount`}
                  />
                  
                  <ResultCard
                    label="Total Payment"
                    value={formatCurrency(results.totalPayment)}
                    subtext="Over the life of the loan"
                  />
                </>
              )}
            </div>
          </div>

          {/* Chart Section */}
          {results && (
            <div className="mt-8">
              <PaymentBreakdownChart 
                principal={results.loanAmount} 
                interest={results.totalInterest}
                title="Total Cost Breakdown"
              />
            </div>
          )}
        </CalculatorLayout>
      </main>
      <Footer />
    </div>
  );
};

export default MortgageCalculator;
