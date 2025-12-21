import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";

const SalaryCalculator = () => {
  const [amount, setAmount] = useState("50000");
  const [payPeriod, setPayPeriod] = useState("yearly");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [results, setResults] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    monthly: number;
    yearly: number;
  } | null>(null);

  const calculate = () => {
    const value = parseFloat(amount);
    const hours = parseFloat(hoursPerWeek);

    if (isNaN(value) || isNaN(hours)) return;

    let yearly: number;
    switch (payPeriod) {
      case "hourly":
        yearly = value * hours * 52;
        break;
      case "daily":
        yearly = value * (hours / 8) * 260;
        break;
      case "weekly":
        yearly = value * 52;
        break;
      case "biweekly":
        yearly = value * 26;
        break;
      case "monthly":
        yearly = value * 12;
        break;
      default:
        yearly = value;
    }

    const hourly = yearly / (hours * 52);
    const daily = hourly * 8;
    const weekly = hourly * hours;
    const biweekly = weekly * 2;
    const monthly = yearly / 12;

    setResults({ hourly, daily, weekly, biweekly, monthly, yearly });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Salary Calculator"
      description="Convert between hourly, monthly, and annual salary"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<Wallet className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Salary Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Salary Amount"
              value={amount}
              onChange={setAmount}
              placeholder="50000"
              prefix="$"
              type="number"
            />
            <div className="space-y-2">
              <Label>Pay Period</Label>
              <Select value={payPeriod} onValueChange={setPayPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputGroup
              label="Hours per Week"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              placeholder="40"
              type="number"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <ResultCard
            label="Hourly"
            value={results ? formatCurrency(results.hourly) : "--"}
          />
          <ResultCard
            label="Daily"
            value={results ? formatCurrency(results.daily) : "--"}
          />
          <ResultCard
            label="Weekly"
            value={results ? formatCurrency(results.weekly) : "--"}
          />
          <ResultCard
            label="Bi-weekly"
            value={results ? formatCurrency(results.biweekly) : "--"}
          />
          <ResultCard
            label="Monthly"
            value={results ? formatCurrency(results.monthly) : "--"}
          />
          <ResultCard
            label="Yearly"
            value={results ? formatCurrency(results.yearly) : "--"}
            highlight
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default SalaryCalculator;
