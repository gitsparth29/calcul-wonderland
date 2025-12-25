import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const BMRCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activityLevel, setActivityLevel] = useState("1.55");
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    mifflin: number;
    harris: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const activity = parseFloat(activityLevel);

    if (isNaN(a) || isNaN(w) || isNaN(h)) return;

    // Mifflin-St Jeor Equation
    let mifflin: number;
    if (gender === "male") {
      mifflin = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      mifflin = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Harris-Benedict Equation
    let harris: number;
    if (gender === "male") {
      harris = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    } else {
      harris = 447.593 + 9.247 * w + 3.098 * h - 4.330 * a;
    }

    const bmr = mifflin;
    const tdee = bmr * activity;

    setResults({ bmr, tdee, mifflin, harris });
  };

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate and daily calorie needs"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<Heart className="h-8 w-8 text-primary-foreground" />}
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
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary (little exercise)</SelectItem>
                  <SelectItem value="1.375">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="1.55">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="1.725">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="1.9">Very Active (hard exercise)</SelectItem>
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
            label="Basal Metabolic Rate"
            value={results ? `${Math.round(results.bmr)} calories/day` : "--"}
            highlight
          />
          <ResultCard
            label="Daily Calorie Needs (TDEE)"
            value={results ? `${Math.round(results.tdee)} calories/day` : "--"}
          />
          <ResultCard
            label="Mifflin-St Jeor BMR"
            value={results ? `${Math.round(results.mifflin)} cal` : "--"}
          />
          <ResultCard
            label="Harris-Benedict BMR"
            value={results ? `${Math.round(results.harris)} cal` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default BMRCalculator;
