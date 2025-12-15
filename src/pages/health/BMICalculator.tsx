import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Scale, User, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

type Unit = "imperial" | "metric";

const BMICalculator = () => {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [weight, setWeight] = useState("160");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [heightCm, setHeightCm] = useState("178");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    let bmiValue: number;

    if (unit === "imperial") {
      const totalInches = parseFloat(heightFeet) * 12 + parseFloat(heightInches);
      const weightLbs = parseFloat(weight);
      bmiValue = (weightLbs / (totalInches * totalInches)) * 703;
    } else {
      const heightM = parseFloat(heightCm) / 100;
      const weightKg = parseFloat(weight);
      bmiValue = weightKg / (heightM * heightM);
    }

    if (isNaN(bmiValue) || !isFinite(bmiValue)) {
      setBmi(null);
      return;
    }

    setBmi(bmiValue);
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, heightFeet, heightInches, heightCm, unit]);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600", bg: "bg-blue-100" };
    if (bmi < 25) return { label: "Normal", color: "text-success", bg: "bg-emerald-100" };
    if (bmi < 30) return { label: "Overweight", color: "text-amber-600", bg: "bg-amber-100" };
    return { label: "Obese", color: "text-destructive", bg: "bg-red-100" };
  };

  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CalculatorLayout
          title="BMI Calculator"
          description="Calculate your Body Mass Index to understand your weight category"
          backLink="/health"
          backLabel="Health Calculators"
          icon={<Scale className="h-8 w-8 text-primary-foreground" />}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                Your Measurements
              </h3>

              {/* Unit Toggle */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">Unit System</Label>
                <div className="flex gap-2">
                  <Button
                    variant={unit === "imperial" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUnit("imperial")}
                    className="flex-1"
                  >
                    Imperial (lb/ft)
                  </Button>
                  <Button
                    variant={unit === "metric" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUnit("metric")}
                    className="flex-1"
                  >
                    Metric (kg/cm)
                  </Button>
                </div>
              </div>

              <div className="space-y-5">
                <InputGroup
                  label={unit === "imperial" ? "Weight (lbs)" : "Weight (kg)"}
                  id="weight"
                  value={weight}
                  onChange={setWeight}
                  suffix={unit === "imperial" ? "lbs" : "kg"}
                  placeholder={unit === "imperial" ? "160" : "72"}
                />

                {unit === "imperial" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup
                      label="Height (feet)"
                      id="heightFeet"
                      value={heightFeet}
                      onChange={setHeightFeet}
                      suffix="ft"
                      placeholder="5"
                    />
                    <InputGroup
                      label="Height (inches)"
                      id="heightInches"
                      value={heightInches}
                      onChange={setHeightInches}
                      suffix="in"
                      placeholder="10"
                    />
                  </div>
                ) : (
                  <InputGroup
                    label="Height (cm)"
                    id="heightCm"
                    value={heightCm}
                    onChange={setHeightCm}
                    suffix="cm"
                    placeholder="178"
                  />
                )}
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-6"
                onClick={calculateBMI}
              >
                Calculate BMI
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {bmi && category && (
                <>
                  <ResultCard
                    label="Your BMI"
                    value={bmi.toFixed(1)}
                    highlight
                    icon={<Scale className="h-5 w-5 text-primary-foreground" />}
                  />

                  <div className={cn("rounded-xl p-5 border border-border", category.bg)}>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Category</p>
                    <p className={cn("font-heading text-2xl font-bold", category.color)}>
                      {category.label}
                    </p>
                  </div>

                  {/* BMI Scale */}
                  <div className="bg-card rounded-xl border border-border p-5 shadow-soft">
                    <p className="text-sm font-medium text-muted-foreground mb-4">BMI Categories</p>
                    <div className="space-y-3">
                      {[
                        { label: "Underweight", range: "< 18.5", color: "bg-blue-500" },
                        { label: "Normal", range: "18.5 - 24.9", color: "bg-emerald-500" },
                        { label: "Overweight", range: "25 - 29.9", color: "bg-amber-500" },
                        { label: "Obese", range: "≥ 30", color: "bg-red-500" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <div className={cn("w-3 h-3 rounded-full", item.color)} />
                          <span className="text-sm text-foreground flex-1">{item.label}</span>
                          <span className="text-sm text-muted-foreground">{item.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </CalculatorLayout>
      </main>
      <Footer />
    </div>
  );
};

export default BMICalculator;
