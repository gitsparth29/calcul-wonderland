import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";

const InvestmentCalculator = () => {
  const [startingAmount, setStartingAmount] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [years, setYears] = useState("20");
  const [results, setResults] = useState<{
    finalBalance: number;
    totalContributions: number;
    totalGains: number;
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(startingAmount);
    const PMT = parseFloat(monthlyContribution);
    const r = parseFloat(annualReturn) / 100;
    const t = parseFloat(years);

    if (isNaN(P) || isNaN(PMT) || isNaN(r) || isNaN(t)) return;

    const monthlyRate = r / 12;
    const months = t * 12;

    // Future value of initial investment
    const FV_initial = P * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions
    const FV_contributions = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const finalBalance = FV_initial + FV_contributions;
    const totalContributions = P + PMT * months;
    const totalGains = finalBalance - totalContributions;

    setResults({ finalBalance, totalContributions, totalGains });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="Plan your investment returns over time"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<PiggyBank className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Starting Amount"
              value={startingAmount}
              onChange={setStartingAmount}
              placeholder="5000"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Monthly Contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              placeholder="200"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Expected Annual Return"
              value={annualReturn}
              onChange={setAnnualReturn}
              placeholder="8"
              suffix="%"
              type="number"
            />
            <InputGroup
              label="Investment Period"
              value={years}
              onChange={setYears}
              placeholder="20"
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
            label="Final Balance"
            value={results ? formatCurrency(results.finalBalance) : "--"}
            highlight
          />
          <ResultCard
            label="Total Contributions"
            value={results ? formatCurrency(results.totalContributions) : "--"}
          />
          <ResultCard
            label="Total Gains"
            value={results ? formatCurrency(results.totalGains) : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default InvestmentCalculator;
