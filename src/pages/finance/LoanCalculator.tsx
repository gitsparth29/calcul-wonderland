import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [loanTerm, setLoanTerm] = useState("3");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) return;

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({ monthlyPayment, totalPayment, totalInterest });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate monthly payments and total interest for any loan"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<DollarSign className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              placeholder="10000"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Annual Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="5"
              suffix="%"
              type="number"
            />
            <InputGroup
              label="Loan Term"
              value={loanTerm}
              onChange={setLoanTerm}
              placeholder="3"
              suffix="years"
              type="number"
            />
            <Button onClick={calculateLoan} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Monthly Payment"
            value={results ? formatCurrency(results.monthlyPayment) : "--"}
            highlight
          />
          <ResultCard
            label="Total Payment"
            value={results ? formatCurrency(results.totalPayment) : "--"}
          />
          <ResultCard
            label="Total Interest"
            value={results ? formatCurrency(results.totalInterest) : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default LoanCalculator;
