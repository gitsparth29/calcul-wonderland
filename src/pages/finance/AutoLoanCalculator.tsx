import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const AutoLoanCalculator = () => {
  const { formatCurrency, currencySymbol } = useCurrency();
  const [carPrice, setCarPrice] = useState("25000");
  const [downPayment, setDownPayment] = useState("5000");
  const [tradeIn, setTradeIn] = useState("0");
  const [interestRate, setInterestRate] = useState("6");
  const [loanTerm, setLoanTerm] = useState("5");
  const [results, setResults] = useState<{
    loanAmount: number;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateAutoLoan = () => {
    const price = parseFloat(carPrice);
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (isNaN(price) || isNaN(rate) || isNaN(years)) return;

    const principal = price - down - trade;
    const monthlyRate = rate / 12;
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

    setResults({
      loanAmount: principal,
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };


  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your car loan payments and total cost"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<Car className="h-8 w-8 text-primary-foreground" />}
      category="Finance"
      canonicalPath="/finance/auto-loan"
      keywords={["car loan calculator", "car payment calculator", "vehicle financing", "auto finance"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Vehicle & Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Car Price"
              value={carPrice}
              onChange={setCarPrice}
              placeholder="25000"
              prefix={currencySymbol}
              type="number"
            />
            <InputGroup
              label="Down Payment"
              value={downPayment}
              onChange={setDownPayment}
              placeholder="5000"
              prefix={currencySymbol}
              type="number"
            />
            <InputGroup
              label="Trade-in Value"
              value={tradeIn}
              onChange={setTradeIn}
              placeholder="0"
              prefix={currencySymbol}
              type="number"
            />
            <InputGroup
              label="Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="6"
              suffix="%"
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
            <Button onClick={calculateAutoLoan} className="w-full" size="lg">
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
            label="Loan Amount"
            value={results ? formatCurrency(results.loanAmount) : "--"}
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

export default AutoLoanCalculator;
