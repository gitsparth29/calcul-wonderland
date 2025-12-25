import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FractionCalculator = () => {
  const [num1, setNum1] = useState("1");
  const [den1, setDen1] = useState("2");
  const [num2, setNum2] = useState("1");
  const [den2, setDen2] = useState("4");
  const [operation, setOperation] = useState("add");
  const [results, setResults] = useState<{
    numerator: number;
    denominator: number;
    simplified: { num: number; den: number };
    decimal: number;
    mixed: string;
  } | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const calculate = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) return;

    let numerator: number;
    let denominator: number;

    switch (operation) {
      case "add":
        numerator = n1 * d2 + n2 * d1;
        denominator = d1 * d2;
        break;
      case "subtract":
        numerator = n1 * d2 - n2 * d1;
        denominator = d1 * d2;
        break;
      case "multiply":
        numerator = n1 * n2;
        denominator = d1 * d2;
        break;
      case "divide":
        if (n2 === 0) return;
        numerator = n1 * d2;
        denominator = d1 * n2;
        break;
      default:
        return;
    }

    const divisor = gcd(numerator, denominator);
    const simplified = {
      num: numerator / divisor,
      den: denominator / divisor,
    };

    // Handle negative denominators
    if (simplified.den < 0) {
      simplified.num = -simplified.num;
      simplified.den = -simplified.den;
    }

    const decimal = numerator / denominator;

    // Calculate mixed number
    let mixed = "";
    if (Math.abs(simplified.num) >= simplified.den) {
      const whole = Math.trunc(simplified.num / simplified.den);
      const remainder = Math.abs(simplified.num % simplified.den);
      if (remainder === 0) {
        mixed = `${whole}`;
      } else {
        mixed = `${whole} ${remainder}/${simplified.den}`;
      }
    } else {
      mixed = `${simplified.num}/${simplified.den}`;
    }

    setResults({ numerator, denominator, simplified, decimal, mixed });
  };

  return (
    <CalculatorLayout
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions"
      backLink="/math"
      backLabel="Math Calculators"
      icon={<Divide className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Enter Fractions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>First Fraction</Label>
              <div className="flex items-center gap-2">
                <InputGroup
                  label=""
                  value={num1}
                  onChange={setNum1}
                  placeholder="1"
                  type="number"
                />
                <span className="text-2xl text-muted-foreground">/</span>
                <InputGroup
                  label=""
                  value={den1}
                  onChange={setDen1}
                  placeholder="2"
                  type="number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Operation</Label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add (+)</SelectItem>
                  <SelectItem value="subtract">Subtract (−)</SelectItem>
                  <SelectItem value="multiply">Multiply (×)</SelectItem>
                  <SelectItem value="divide">Divide (÷)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Second Fraction</Label>
              <div className="flex items-center gap-2">
                <InputGroup
                  label=""
                  value={num2}
                  onChange={setNum2}
                  placeholder="1"
                  type="number"
                />
                <span className="text-2xl text-muted-foreground">/</span>
                <InputGroup
                  label=""
                  value={den2}
                  onChange={setDen2}
                  placeholder="4"
                  type="number"
                />
              </div>
            </div>
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Result (Simplified)"
            value={results ? `${results.simplified.num}/${results.simplified.den}` : "--"}
            highlight
          />
          <ResultCard
            label="Mixed Number"
            value={results ? results.mixed : "--"}
          />
          <ResultCard
            label="Decimal"
            value={results ? results.decimal.toFixed(6) : "--"}
          />
          <ResultCard
            label="Unsimplified"
            value={results ? `${results.numerator}/${results.denominator}` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default FractionCalculator;
