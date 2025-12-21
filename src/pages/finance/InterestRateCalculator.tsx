import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Percent } from "lucide-react";

const InterestRateCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("20000");
  const [monthlyPayment, setMonthlyPayment] = useState("400");
  const [loanTerm, setLoanTerm] = useState("5");
  const [results, setResults] = useState<{
    annualRate: number;
    monthlyRate: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const PMT = parseFloat(monthlyPayment);
    const years = parseFloat(loanTerm);

    if (isNaN(P) || isNaN(PMT) || isNaN(years)) return;

    const n = years * 12;
    const totalPayment = PMT * n;

    if (totalPayment <= P) {
      setResults(null);
      return;
    }

    // Newton-Raphson method to find interest rate
    let rate = 0.01; // Initial guess
    for (let i = 0; i < 100; i++) {
      const f = P * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1) - PMT;
      const df = P * (Math.pow(1 + rate, n) * (1 + rate * n - n * rate) - 1) / 
                  Math.pow(Math.pow(1 + rate, n) - 1, 2);
      
      const newRate = rate - f / df;
      if (Math.abs(newRate - rate) < 0.0000001) break;
      rate = newRate;
    }

    const annualRate = rate * 12 * 100;
    const totalInterest = totalPayment - P;

    setResults({
      annualRate,
      monthlyRate: rate * 100,
      totalInterest,
    });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Interest Rate Calculator"
      description="Calculate the interest rate from loan payment information"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<Percent className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Loan Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              placeholder="20000"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Monthly Payment"
              value={monthlyPayment}
              onChange={setMonthlyPayment}
              placeholder="400"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Loan Term"
              value={loanTerm}
              onChange={setLoanTerm}
              placeholder="5"
              suffix="years"
              type="number"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Annual Interest Rate"
            value={results ? `${results.annualRate.toFixed(2)}%` : "--"}
            highlight
          />
          <ResultCard
            label="Monthly Interest Rate"
            value={results ? `${results.monthlyRate.toFixed(3)}%` : "--"}
          />
          <ResultCard
            label="Total Interest Paid"
            value={results ? formatCurrency(results.totalInterest) : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default InterestRateCalculator;
