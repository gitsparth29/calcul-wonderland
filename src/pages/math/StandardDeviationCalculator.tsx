import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const StandardDeviationCalculator = () => {
  const [dataInput, setDataInput] = useState("10, 12, 23, 23, 16, 23, 21, 16");
  const [results, setResults] = useState<{
    count: number;
    sum: number;
    mean: number;
    populationStdDev: number;
    sampleStdDev: number;
    variance: number;
    min: number;
    max: number;
    range: number;
  } | null>(null);

  const calculate = () => {
    // Parse numbers from input (comma, space, or newline separated)
    const numbers = dataInput
      .split(/[\s,]+/)
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) return;

    const count = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / count;

    // Calculate variance
    const squaredDiffs = numbers.map((n) => Math.pow(n - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

    const populationVariance = sumSquaredDiffs / count;
    const sampleVariance = count > 1 ? sumSquaredDiffs / (count - 1) : 0;

    const populationStdDev = Math.sqrt(populationVariance);
    const sampleStdDev = Math.sqrt(sampleVariance);

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;

    setResults({
      count,
      sum,
      mean,
      populationStdDev,
      sampleStdDev,
      variance: sampleVariance,
      min,
      max,
      range,
    });
  };

  return (
    <CalculatorLayout
      title="Standard Deviation Calculator"
      description="Calculate standard deviation, variance, and other statistics"
      backLink="/math"
      backLabel="Math Calculators"
      icon={<BarChart3 className="h-8 w-8 text-primary-foreground" />}
      category="Math"
      canonicalPath="/math/standard-deviation"
      keywords={["statistics calculator", "variance calculator", "mean calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Enter Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Set (comma or space separated)</Label>
              <Textarea
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                placeholder="10, 12, 23, 23, 16, 23, 21, 16"
                rows={5}
                className="font-mono"
              />
            </div>
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Sample Standard Deviation"
            value={results ? results.sampleStdDev.toFixed(4) : "--"}
            highlight
          />
          <ResultCard
            label="Population Standard Deviation"
            value={results ? results.populationStdDev.toFixed(4) : "--"}
          />
          <ResultCard
            label="Variance (Sample)"
            value={results ? results.variance.toFixed(4) : "--"}
          />
          <ResultCard
            label="Mean"
            value={results ? results.mean.toFixed(4) : "--"}
          />
          <ResultCard
            label="Count"
            value={results ? results.count.toString() : "--"}
          />
          <ResultCard
            label="Sum"
            value={results ? results.sum.toFixed(4) : "--"}
          />
          <ResultCard
            label="Range"
            value={results ? `${results.min} - ${results.max} (${results.range})` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default StandardDeviationCalculator;
