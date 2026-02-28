import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

const RetirementCalculator = () => {
  const { formatCurrency, currencySymbol } = useCurrency();
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [results, setResults] = useState<{
    retirementSavings: number;
    monthlyIncome: number;
    totalContributions: number;
  } | null>(null);

  const calculate = () => {
    const current = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100;

    if (isNaN(current) || isNaN(retirement) || isNaN(savings) || isNaN(monthly) || isNaN(rate)) return;

    const yearsToRetirement = retirement - current;
    const monthlyRate = rate / 12;
    const months = yearsToRetirement * 12;

    // Future value of current savings
    const FV_savings = savings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions
    const FV_contributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const retirementSavings = FV_savings + FV_contributions;
    const totalContributions = savings + monthly * months;

    // Estimate monthly income (4% rule over 25 years)
    const monthlyIncome = (retirementSavings * 0.04) / 12;

    setResults({ retirementSavings, monthlyIncome, totalContributions });
  };


  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Plan for your retirement savings and income"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<Building className="h-8 w-8 text-primary-foreground" />}
      category="Finance"
      canonicalPath="/finance/retirement"
      keywords={["retirement planning calculator", "401k calculator", "retirement savings", "pension calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Retirement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Current Age"
              value={currentAge}
              onChange={setCurrentAge}
              placeholder="30"
              type="number"
            />
            <InputGroup
              label="Retirement Age"
              value={retirementAge}
              onChange={setRetirementAge}
              placeholder="65"
              type="number"
            />
            <InputGroup
              label="Current Savings"
              value={currentSavings}
              onChange={setCurrentSavings}
              placeholder="50000"
              prefix={currencySymbol}
              type="number"
            />
            <InputGroup
              label="Monthly Contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              placeholder="500"
              prefix={currencySymbol}
              type="number"
            />
            <InputGroup
              label="Expected Annual Return"
              value={annualReturn}
              onChange={setAnnualReturn}
              placeholder="7"
              suffix="%"
              type="number"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Retirement Savings"
            value={results ? formatCurrency(results.retirementSavings) : "--"}
            highlight
          />
          <ResultCard
            label="Estimated Monthly Income"
            value={results ? formatCurrency(results.monthlyIncome) : "--"}
            subtext="Based on 4% withdrawal rate"
          />
          <ResultCard
            label="Total Contributions"
            value={results ? formatCurrency(results.totalContributions) : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RetirementCalculator;
