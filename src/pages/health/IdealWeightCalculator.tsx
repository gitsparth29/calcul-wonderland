import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const IdealWeightCalculator = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("175");
  const [results, setResults] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
    bmiRange: { min: number; max: number };
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (isNaN(h)) return;

    const heightInches = h / 2.54;
    const inchesOver5Feet = Math.max(0, heightInches - 60);

    let robinson: number, miller: number, devine: number, hamwi: number;

    if (gender === "male") {
      robinson = 52 + 1.9 * inchesOver5Feet;
      miller = 56.2 + 1.41 * inchesOver5Feet;
      devine = 50 + 2.3 * inchesOver5Feet;
      hamwi = 48 + 2.7 * inchesOver5Feet;
    } else {
      robinson = 49 + 1.7 * inchesOver5Feet;
      miller = 53.1 + 1.36 * inchesOver5Feet;
      devine = 45.5 + 2.3 * inchesOver5Feet;
      hamwi = 45.5 + 2.2 * inchesOver5Feet;
    }

    // Healthy BMI range (18.5 - 24.9)
    const heightM = h / 100;
    const bmiMin = 18.5 * heightM * heightM;
    const bmiMax = 24.9 * heightM * heightM;

    setResults({
      robinson,
      miller,
      devine,
      hamwi,
      bmiRange: { min: bmiMin, max: bmiMax },
    });
  };

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight using multiple formulas"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<Target className="h-8 w-8 text-primary-foreground" />}
      category="Health"
      canonicalPath="/health/ideal-weight"
      keywords={["ideal body weight", "healthy weight calculator", "target weight"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputGroup
              label="Height"
              value={height}
              onChange={setHeight}
              placeholder="175"
              suffix="cm"
              type="number"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Robinson Formula"
            value={results ? `${results.robinson.toFixed(1)} kg` : "--"}
            highlight
          />
          <ResultCard
            label="Miller Formula"
            value={results ? `${results.miller.toFixed(1)} kg` : "--"}
          />
          <ResultCard
            label="Devine Formula"
            value={results ? `${results.devine.toFixed(1)} kg` : "--"}
          />
          <ResultCard
            label="Hamwi Formula"
            value={results ? `${results.hamwi.toFixed(1)} kg` : "--"}
          />
          <ResultCard
            label="Healthy BMI Range"
            value={results ? `${results.bmiRange.min.toFixed(1)} - ${results.bmiRange.max.toFixed(1)} kg` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default IdealWeightCalculator;
