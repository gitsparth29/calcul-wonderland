import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Drumstick } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ProteinIntakeCalculator = () => {
  const [weight, setWeight] = useState("70");
  const [goal, setGoal] = useState("maintain");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [results, setResults] = useState<{
    dailyProtein: number;
    perMeal: number;
    minProtein: number;
    maxProtein: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (isNaN(w)) return;

    // Base protein needs per kg
    const proteinRates: Record<string, { min: number; max: number }> = {
      sedentary: { min: 0.8, max: 1.0 },
      light: { min: 1.0, max: 1.2 },
      moderate: { min: 1.2, max: 1.6 },
      active: { min: 1.4, max: 1.8 },
      athlete: { min: 1.6, max: 2.2 },
    };

    // Goal adjustments
    const goalMultiplier: Record<string, number> = {
      "lose-weight": 1.2, // Higher protein for muscle preservation
      maintain: 1.0,
      "build-muscle": 1.3,
      athlete: 1.4,
    };

    const rate = proteinRates[activityLevel] || proteinRates.moderate;
    const multiplier = goalMultiplier[goal] || 1.0;

    const minProtein = w * rate.min * multiplier;
    const maxProtein = w * rate.max * multiplier;
    const dailyProtein = (minProtein + maxProtein) / 2;
    const perMeal = dailyProtein / 4; // Assuming 4 meals/snacks

    setResults({ dailyProtein, perMeal, minProtein, maxProtein });
  };

  return (
    <CalculatorLayout
      title="Protein Intake Calculator"
      description="Calculate your optimal daily protein intake"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<Drumstick className="h-8 w-8 text-primary-foreground" />}
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
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose-weight">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="build-muscle">Build Muscle</SelectItem>
                  <SelectItem value="athlete">Athletic Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light Exercise</SelectItem>
                  <SelectItem value="moderate">Moderate Exercise</SelectItem>
                  <SelectItem value="active">Active / Regular Training</SelectItem>
                  <SelectItem value="athlete">Athlete / Heavy Training</SelectItem>
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
            label="Recommended Daily Protein"
            value={results ? `${results.dailyProtein.toFixed(0)}g` : "--"}
            highlight
          />
          <ResultCard
            label="Per Meal (4 meals)"
            value={results ? `${results.perMeal.toFixed(0)}g` : "--"}
          />
          <ResultCard
            label="Minimum"
            value={results ? `${results.minProtein.toFixed(0)}g` : "--"}
          />
          <ResultCard
            label="Maximum"
            value={results ? `${results.maxProtein.toFixed(0)}g` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default ProteinIntakeCalculator;
