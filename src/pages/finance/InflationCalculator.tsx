import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const InflationCalculator = () => {
  const { formatCurrency, currencySymbol } = useCurrency();
  const [currentAmount, setCurrentAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [years, setYears] = useState("");
  const [results, setResults] = useState<{
    futureValue: number;
    purchasingPower: number;
    totalInflation: number;
  } | null>(null);

  const calculate = () => {
    const amount = parseFloat(currentAmount);
    const rate = parseFloat(inflationRate) / 100;
    const period = parseInt(years);

    if (isNaN(amount) || isNaN(rate) || isNaN(period)) return;

    // Future value needed to maintain purchasing power
    const futureValue = amount * Math.pow(1 + rate, period);
    
    // What current amount will be worth in the future
    const purchasingPower = amount / Math.pow(1 + rate, period);
    
    // Total cumulative inflation
    const totalInflation = ((Math.pow(1 + rate, period) - 1) * 100);

    setResults({
      futureValue,
      purchasingPower,
      totalInflation,
    });
  };

  const reset = () => {
    setCurrentAmount("");
    setInflationRate("");
    setYears("");
    setResults(null);
  };

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate the impact of inflation on your money's purchasing power over time"
      icon={<TrendingUp className="h-6 w-6 text-primary-foreground" />}
      backLink="/finance"
      backLabel="Finance Calculators"
      category="Finance"
      canonicalPath="/finance/inflation"
      keywords={["purchasing power calculator", "cpi calculator", "inflation rate"]}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <InputGroup
            label="Current Amount"
            value={currentAmount}
            onChange={setCurrentAmount}
            placeholder="10000"
            type="number"
            prefix={currencySymbol}
          />
          <InputGroup
            label="Annual Inflation Rate"
            value={inflationRate}
            onChange={setInflationRate}
            placeholder="3"
            type="number"
            suffix="%"
          />
          <InputGroup
            label="Number of Years"
            value={years}
            onChange={setYears}
            placeholder="10"
            type="number"
          />
          <div className="flex gap-3 pt-4">
            <Button onClick={calculate} className="flex-1">
              Calculate
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {results ? (
            <>
              <ResultCard
                label="Future Value Needed"
                value={formatCurrency(results.futureValue)}
                subtext="Amount needed to maintain same purchasing power"
                highlight
              />
              <ResultCard
                label="Future Purchasing Power"
                value={formatCurrency(results.purchasingPower)}
                subtext="What your current amount will be worth"
              />
              <ResultCard
                label="Cumulative Inflation"
                value={`${results.totalInflation.toFixed(2)}%`}
                subtext="Total price increase over the period"
              />
            </>
          ) : (
            <div className="bg-muted/50 rounded-xl p-8 text-center">
              <p className="text-muted-foreground">
                Enter values and click Calculate to see inflation impact
              </p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default InflationCalculator;
