import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const CreditCardCalculator = () => {
  const [balance, setBalance] = useState("5000");
  const [interestRate, setInterestRate] = useState("18");
  const [monthlyPayment, setMonthlyPayment] = useState("200");
  const [results, setResults] = useState<{
    monthsToPayoff: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculate = () => {
    const B = parseFloat(balance);
    const APR = parseFloat(interestRate) / 100;
    const PMT = parseFloat(monthlyPayment);

    if (isNaN(B) || isNaN(APR) || isNaN(PMT)) return;

    const monthlyRate = APR / 12;

    // Check if payment is enough to cover interest
    const minPayment = B * monthlyRate;
    if (PMT <= minPayment) {
      setResults(null);
      return;
    }

    // Calculate months to payoff
    const monthsToPayoff = Math.ceil(
      -Math.log(1 - (B * monthlyRate) / PMT) / Math.log(1 + monthlyRate)
    );

    const totalPayment = PMT * monthsToPayoff;
    const totalInterest = totalPayment - B;

    setResults({ monthsToPayoff, totalInterest, totalPayment });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <CalculatorLayout
      title="Credit Card Interest Calculator"
      description="Calculate credit card payoff time and interest costs"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<CreditCard className="h-8 w-8 text-primary-foreground" />}
      category="Finance"
      canonicalPath="/finance/credit-card"
      keywords={["credit card payoff calculator", "credit card interest", "debt calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Credit Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Current Balance"
              value={balance}
              onChange={setBalance}
              placeholder="5000"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Annual Interest Rate (APR)"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="18"
              suffix="%"
              type="number"
            />
            <InputGroup
              label="Monthly Payment"
              value={monthlyPayment}
              onChange={setMonthlyPayment}
              placeholder="200"
              prefix="$"
              type="number"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Time to Pay Off"
            value={results ? formatMonths(results.monthsToPayoff) : "--"}
            highlight
          />
          <ResultCard
            label="Total Interest Paid"
            value={results ? formatCurrency(results.totalInterest) : "--"}
          />
          <ResultCard
            label="Total Amount Paid"
            value={results ? formatCurrency(results.totalPayment) : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CreditCardCalculator;
