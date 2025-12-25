import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [neck, setNeck] = useState("38");
  const [waist, setWaist] = useState("85");
  const [hip, setHip] = useState("95");
  const [results, setResults] = useState<{
    bodyFat: number;
    category: string;
    fatMass: number;
    leanMass: number;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);

    if (isNaN(h) || isNaN(w) || isNaN(n) || isNaN(wa)) return;

    let bodyFat: number;

    // US Navy Method
    if (gender === "male") {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      if (isNaN(hi)) return;
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }

    bodyFat = Math.max(0, Math.min(bodyFat, 60));

    const fatMass = (w * bodyFat) / 100;
    const leanMass = w - fatMass;

    let category: string;
    if (gender === "male") {
      if (bodyFat < 6) category = "Essential Fat";
      else if (bodyFat < 14) category = "Athletes";
      else if (bodyFat < 18) category = "Fitness";
      else if (bodyFat < 25) category = "Average";
      else category = "Obese";
    } else {
      if (bodyFat < 14) category = "Essential Fat";
      else if (bodyFat < 21) category = "Athletes";
      else if (bodyFat < 25) category = "Fitness";
      else if (bodyFat < 32) category = "Average";
      else category = "Obese";
    }

    setResults({ bodyFat, category, fatMass, leanMass });
  };

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Estimate your body fat percentage using the US Navy method"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<Activity className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Your Measurements</CardTitle>
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
              label="Age"
              value={age}
              onChange={setAge}
              placeholder="25"
              suffix="years"
              type="number"
            />
            <InputGroup
              label="Weight"
              value={weight}
              onChange={setWeight}
              placeholder="70"
              suffix="kg"
              type="number"
            />
            <InputGroup
              label="Height"
              value={height}
              onChange={setHeight}
              placeholder="175"
              suffix="cm"
              type="number"
            />
            <InputGroup
              label="Neck Circumference"
              value={neck}
              onChange={setNeck}
              placeholder="38"
              suffix="cm"
              type="number"
            />
            <InputGroup
              label="Waist Circumference"
              value={waist}
              onChange={setWaist}
              placeholder="85"
              suffix="cm"
              type="number"
            />
            {gender === "female" && (
              <InputGroup
                label="Hip Circumference"
                value={hip}
                onChange={setHip}
                placeholder="95"
                suffix="cm"
                type="number"
              />
            )}
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Body Fat Percentage"
            value={results ? `${results.bodyFat.toFixed(1)}%` : "--"}
            highlight
          />
          <ResultCard
            label="Category"
            value={results ? results.category : "--"}
          />
          <ResultCard
            label="Fat Mass"
            value={results ? `${results.fatMass.toFixed(1)} kg` : "--"}
          />
          <ResultCard
            label="Lean Body Mass"
            value={results ? `${results.leanMass.toFixed(1)} kg` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;
