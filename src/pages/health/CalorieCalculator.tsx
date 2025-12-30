import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Flame } from "lucide-react";

const CalorieCalculator = () => {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.55");
  const [results, setResults] = useState<{ bmr: number; maintenance: number; lose: number; gain: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);
    if (isNaN(a) || isNaN(w) || isNaN(h)) return;

    let bmr = gender === "male" 
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const maintenance = bmr * act;
    setResults({ bmr, maintenance, lose: maintenance - 500, gain: maintenance + 500 });
  };

  return (
    <CalculatorLayout title="Calorie Calculator" description="Calculate your daily calorie needs" backLink="/health" backLabel="Health Calculators" icon={<Flame className="h-8 w-8 text-primary-foreground" />} category="Health" canonicalPath="/health/calorie" keywords={["daily calorie calculator", "tdee calculator", "calorie intake", "weight loss calories"]}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader><CardTitle>Your Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <InputGroup label="Age" value={age} onChange={setAge} placeholder="30" suffix="years" />
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputGroup label="Weight" value={weight} onChange={setWeight} placeholder="70" suffix="kg" />
            <InputGroup label="Height" value={height} onChange={setHeight} placeholder="175" suffix="cm" />
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary</SelectItem>
                  <SelectItem value="1.375">Light exercise</SelectItem>
                  <SelectItem value="1.55">Moderate exercise</SelectItem>
                  <SelectItem value="1.725">Active</SelectItem>
                  <SelectItem value="1.9">Very active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full" size="lg">Calculate</Button>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <ResultCard label="Maintenance Calories" value={results ? `${Math.round(results.maintenance)} cal/day` : "--"} highlight />
          <ResultCard label="Weight Loss" value={results ? `${Math.round(results.lose)} cal/day` : "--"} subtext="-0.5 kg/week" />
          <ResultCard label="Weight Gain" value={results ? `${Math.round(results.gain)} cal/day` : "--"} subtext="+0.5 kg/week" />
          <ResultCard label="BMR" value={results ? `${Math.round(results.bmr)} cal/day` : "--"} />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CalorieCalculator;
