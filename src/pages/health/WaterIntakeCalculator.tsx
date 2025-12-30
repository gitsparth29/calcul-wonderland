import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState("70");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [climate, setClimate] = useState("temperate");
  const [results, setResults] = useState<{
    liters: number;
    cups: number;
    ounces: number;
    hourly: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (isNaN(w)) return;

    // Base calculation: 30-35ml per kg of body weight
    let baseWater = w * 0.033; // liters

    // Activity level adjustments
    const activityMultiplier: Record<string, number> = {
      sedentary: 0.9,
      light: 1.0,
      moderate: 1.1,
      active: 1.2,
      "very-active": 1.4,
    };

    // Climate adjustments
    const climateMultiplier: Record<string, number> = {
      cold: 0.9,
      temperate: 1.0,
      hot: 1.2,
      "very-hot": 1.4,
    };

    const liters = baseWater * (activityMultiplier[activityLevel] || 1) * (climateMultiplier[climate] || 1);
    const cups = liters * 4.227; // 1 liter ≈ 4.227 cups
    const ounces = liters * 33.814;
    const hourly = liters / 16; // Assuming 16 waking hours

    setResults({ liters, cups, ounces, hourly });
  };

  return (
    <CalculatorLayout
      title="Water Intake Calculator"
      description="Calculate your daily water intake needs"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<Droplets className="h-8 w-8 text-primary-foreground" />}
      category="Health"
      canonicalPath="/health/water-intake"
      keywords={["daily water intake", "hydration calculator", "how much water to drink"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Weight"
              value={weight}
              onChange={setWeight}
              placeholder="70"
              suffix="kg"
              type="number"
            />
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little exercise)</SelectItem>
                  <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (athlete)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Climate</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold">Cold</SelectItem>
                  <SelectItem value="temperate">Temperate</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="very-hot">Very Hot / Humid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Daily Water Intake"
            value={results ? `${results.liters.toFixed(1)} liters` : "--"}
            highlight
          />
          <ResultCard
            label="In Cups"
            value={results ? `${results.cups.toFixed(1)} cups` : "--"}
          />
          <ResultCard
            label="In Ounces"
            value={results ? `${results.ounces.toFixed(0)} oz` : "--"}
          />
          <ResultCard
            label="Per Hour (waking)"
            value={results ? `${(results.hourly * 1000).toFixed(0)} ml` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default WaterIntakeCalculator;
