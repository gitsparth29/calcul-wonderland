import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("10000");
  const [interestRate, setInterestRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compound, setCompound] = useState("12");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [results, setResults] = useState<{
    futureValue: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compound);
    const PMT = parseFloat(monthlyContribution) || 0;

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) return;

    // Future value of principal
    const FV_principal = P * Math.pow(1 + r / n, n * t);

    // Future value of monthly contributions (annuity)
    let FV_contributions = 0;
    if (PMT > 0) {
      const periodicRate = r / 12;
      const totalPeriods = t * 12;
      FV_contributions = PMT * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
    }

    const futureValue = FV_principal + FV_contributions;
    const totalContributions = P + PMT * t * 12;
    const totalInterest = futureValue - totalContributions;

    setResults({ futureValue, totalContributions, totalInterest });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="See how your investments grow with compound interest"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<TrendingUp className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Initial Investment"
              value={principal}
              onChange={setPrincipal}
              placeholder="10000"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Annual Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="7"
              suffix="%"
              type="number"
            />
            <InputGroup
              label="Years"
              value={years}
              onChange={setYears}
              placeholder="10"
              suffix="years"
              type="number"
            />
            <div className="space-y-2">
              <Label>Compound Frequency</Label>
              <Select value={compound} onValueChange={setCompound}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputGroup
              label="Monthly Contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              placeholder="100"
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
            label="Future Value"
            value={results ? formatCurrency(results.futureValue) : "--"}
            highlight
          />
          <ResultCard
            label="Total Contributions"
            value={results ? formatCurrency(results.totalContributions) : "--"}
          />
          <ResultCard
            label="Total Interest Earned"
            value={results ? formatCurrency(results.totalInterest) : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;
