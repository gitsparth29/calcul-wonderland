import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";

const TriangleCalculator = () => {
  const [sideA, setSideA] = useState("3");
  const [sideB, setSideB] = useState("4");
  const [sideC, setSideC] = useState("5");
  const [results, setResults] = useState<{
    area: number;
    perimeter: number;
    angleA: number;
    angleB: number;
    angleC: number;
    type: string;
    isValid: boolean;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) return;

    // Check if valid triangle (sum of any two sides must be greater than third)
    const isValid = a + b > c && b + c > a && a + c > b;
    if (!isValid) {
      setResults({
        area: 0,
        perimeter: 0,
        angleA: 0,
        angleB: 0,
        angleC: 0,
        type: "Invalid Triangle",
        isValid: false,
      });
      return;
    }

    const perimeter = a + b + c;
    const s = perimeter / 2; // Semi-perimeter

    // Heron's formula for area
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // Law of cosines for angles
    const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;

    // Determine triangle type
    let type = "";
    if (a === b && b === c) {
      type = "Equilateral";
    } else if (a === b || b === c || a === c) {
      type = "Isosceles";
    } else {
      type = "Scalene";
    }

    // Check for right triangle
    const sides = [a, b, c].sort((x, y) => x - y);
    if (Math.abs(sides[0] ** 2 + sides[1] ** 2 - sides[2] ** 2) < 0.0001) {
      type += " Right";
    }

    setResults({ area, perimeter, angleA, angleB, angleC, type, isValid: true });
  };

  return (
    <CalculatorLayout
      title="Triangle Calculator"
      description="Calculate area, perimeter, and angles from side lengths"
      backLink="/math"
      backLabel="Math Calculators"
      icon={<Triangle className="h-8 w-8 text-primary-foreground" />}
      category="Math"
      canonicalPath="/math/triangle"
      keywords={["triangle area calculator", "pythagorean theorem", "triangle angles"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Enter Side Lengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Side A"
              value={sideA}
              onChange={setSideA}
              placeholder="3"
              type="number"
            />
            <InputGroup
              label="Side B"
              value={sideB}
              onChange={setSideB}
              placeholder="4"
              type="number"
            />
            <InputGroup
              label="Side C"
              value={sideC}
              onChange={setSideC}
              placeholder="5"
              type="number"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Triangle Type"
            value={results ? results.type : "--"}
            highlight
          />
          <ResultCard
            label="Area"
            value={results && results.isValid ? results.area.toFixed(4) : "--"}
          />
          <ResultCard
            label="Perimeter"
            value={results && results.isValid ? results.perimeter.toFixed(4) : "--"}
          />
          <ResultCard
            label="Angle A"
            value={results && results.isValid ? `${results.angleA.toFixed(2)}°` : "--"}
          />
          <ResultCard
            label="Angle B"
            value={results && results.isValid ? `${results.angleB.toFixed(2)}°` : "--"}
          />
          <ResultCard
            label="Angle C"
            value={results && results.isValid ? `${results.angleC.toFixed(2)}°` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default TriangleCalculator;
