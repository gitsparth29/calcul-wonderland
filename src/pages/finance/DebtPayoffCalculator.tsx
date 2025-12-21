import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const DebtPayoffCalculator = () => {
  const [debtAmount, setDebtAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("15");
  const [monthlyPayment, setMonthlyPayment] = useState("300");
  const [extraPayment, setExtraPayment] = useState("0");
  const [results, setResults] = useState<{
    monthsToPayoff: number;
    totalInterest: number;
    totalPayment: number;
    savedMonths?: number;
    savedInterest?: number;
  } | null>(null);

  const calculate = () => {
    const debt = parseFloat(debtAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    const extra = parseFloat(extraPayment) || 0;

    if (isNaN(debt) || isNaN(rate) || isNaN(payment)) return;

    const calculatePayoff = (monthlyPmt: number) => {
      let balance = debt;
      let months = 0;
      let totalInterest = 0;

      while (balance > 0 && months < 600) {
        const interest = balance * rate;
        totalInterest += interest;
        balance = balance + interest - monthlyPmt;
        months++;
        if (balance < 0) balance = 0;
      }

      return { months, totalInterest, totalPayment: debt + totalInterest };
    };

    const baseResult = calculatePayoff(payment);
    const extraResult = extra > 0 ? calculatePayoff(payment + extra) : null;

    setResults({
      monthsToPayoff: extraResult?.months || baseResult.months,
      totalInterest: extraResult?.totalInterest || baseResult.totalInterest,
      totalPayment: extraResult?.totalPayment || baseResult.totalPayment,
      savedMonths: extraResult ? baseResult.months - extraResult.months : undefined,
      savedInterest: extraResult ? baseResult.totalInterest - extraResult.totalInterest : undefined,
    });
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
      title="Debt Payoff Calculator"
      description="Plan your debt payoff strategy and see how extra payments help"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<Clock className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Debt Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Total Debt"
              value={debtAmount}
              onChange={setDebtAmount}
              placeholder="10000"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="15"
              suffix="%"
              type="number"
            />
            <InputGroup
              label="Monthly Payment"
              value={monthlyPayment}
              onChange={setMonthlyPayment}
              placeholder="300"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Extra Monthly Payment"
              value={extraPayment}
              onChange={setExtraPayment}
              placeholder="0"
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
            label="Total Interest"
            value={results ? formatCurrency(results.totalInterest) : "--"}
          />
          <ResultCard
            label="Total Payment"
            value={results ? formatCurrency(results.totalPayment) : "--"}
          />
          {results?.savedMonths && (
            <ResultCard
              label="Time Saved with Extra Payment"
              value={formatMonths(results.savedMonths)}
              subtext={`${formatCurrency(results.savedInterest || 0)} interest saved`}
            />
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default DebtPayoffCalculator;
