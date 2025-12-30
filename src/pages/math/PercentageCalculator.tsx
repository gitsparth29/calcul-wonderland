import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Button } from "@/components/ui/button";
import { Percent, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CalculationType = "whatIs" | "isWhatPercent" | "percentChange";

const PercentageCalculator = () => {
  const [calcType, setCalcType] = useState<CalculationType>("whatIs");
  
  // What is X% of Y?
  const [percentOf, setPercentOf] = useState("20");
  const [ofNumber, setOfNumber] = useState("100");
  
  // X is what % of Y?
  const [isNumber, setIsNumber] = useState("25");
  const [ofTotal, setOfTotal] = useState("100");
  
  // % change from X to Y
  const [fromNumber, setFromNumber] = useState("50");
  const [toNumber, setToNumber] = useState("75");

  const calculateResult = () => {
    switch (calcType) {
      case "whatIs":
        return (parseFloat(percentOf) / 100) * parseFloat(ofNumber);
      case "isWhatPercent":
        return (parseFloat(isNumber) / parseFloat(ofTotal)) * 100;
      case "percentChange":
        return ((parseFloat(toNumber) - parseFloat(fromNumber)) / parseFloat(fromNumber)) * 100;
      default:
        return 0;
    }
  };

  const result = calculateResult();
  const isValidResult = !isNaN(result) && isFinite(result);

  const tabs = [
    { id: "whatIs" as CalculationType, label: "X% of Y" },
    { id: "isWhatPercent" as CalculationType, label: "X is what % of Y" },
    { id: "percentChange" as CalculationType, label: "% Change" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CalculatorLayout
          title="Percentage Calculator"
          description="Calculate percentages quickly with multiple calculation modes"
          backLink="/math"
          backLabel="Math Calculators"
          icon={<Percent className="h-8 w-8 text-primary-foreground" />}
          category="Math"
          canonicalPath="/math/percentage"
          keywords={["percent calculator", "percentage change", "discount calculator"]}
        >
          <div className="max-w-2xl mx-auto">
            {/* Calculation Type Tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-muted rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCalcType(tab.id)}
                  className={cn(
                    "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all",
                    calcType === tab.id
                      ? "bg-card text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              {/* What is X% of Y? */}
              {calcType === "whatIs" && (
                <div className="space-y-6">
                  <div className="flex items-end gap-4">
                    <span className="text-lg font-medium text-foreground pb-2">What is</span>
                    <div className="flex-1">
                      <InputGroup
                        label=""
                        id="percentOf"
                        value={percentOf}
                        onChange={setPercentOf}
                        suffix="%"
                      />
                    </div>
                    <span className="text-lg font-medium text-foreground pb-2">of</span>
                    <div className="flex-1">
                      <InputGroup
                        label=""
                        id="ofNumber"
                        value={ofNumber}
                        onChange={setOfNumber}
                      />
                    </div>
                    <span className="text-lg font-medium text-foreground pb-2">?</span>
                  </div>
                  
                  {isValidResult && (
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <span className="text-muted-foreground">{percentOf}% of {ofNumber}</span>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      <span className="font-heading text-3xl font-bold text-primary">
                        {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* X is what % of Y? */}
              {calcType === "isWhatPercent" && (
                <div className="space-y-6">
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <InputGroup
                        label=""
                        id="isNumber"
                        value={isNumber}
                        onChange={setIsNumber}
                      />
                    </div>
                    <span className="text-lg font-medium text-foreground pb-2">is what % of</span>
                    <div className="flex-1">
                      <InputGroup
                        label=""
                        id="ofTotal"
                        value={ofTotal}
                        onChange={setOfTotal}
                      />
                    </div>
                    <span className="text-lg font-medium text-foreground pb-2">?</span>
                  </div>
                  
                  {isValidResult && (
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <span className="text-muted-foreground">{isNumber} is</span>
                      <span className="font-heading text-3xl font-bold text-primary">
                        {result.toFixed(2)}%
                      </span>
                      <span className="text-muted-foreground">of {ofTotal}</span>
                    </div>
                  )}
                </div>
              )}

              {/* % Change */}
              {calcType === "percentChange" && (
                <div className="space-y-6">
                  <div className="flex items-end gap-4">
                    <span className="text-lg font-medium text-foreground pb-2">From</span>
                    <div className="flex-1">
                      <InputGroup
                        label=""
                        id="fromNumber"
                        value={fromNumber}
                        onChange={setFromNumber}
                      />
                    </div>
                    <span className="text-lg font-medium text-foreground pb-2">to</span>
                    <div className="flex-1">
                      <InputGroup
                        label=""
                        id="toNumber"
                        value={toNumber}
                        onChange={setToNumber}
                      />
                    </div>
                  </div>
                  
                  {isValidResult && (
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <span className="text-muted-foreground">Change:</span>
                      <span className={cn(
                        "font-heading text-3xl font-bold",
                        result >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {result >= 0 ? "+" : ""}{result.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Reference */}
            <div className="mt-8 bg-muted/50 rounded-xl p-6">
              <h4 className="font-heading font-semibold text-foreground mb-4">Quick Reference</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  { label: "10% of 100", value: "10" },
                  { label: "25% of 80", value: "20" },
                  { label: "50% of 200", value: "100" },
                  { label: "15% of 60", value: "9" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">= {item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CalculatorLayout>
      </main>
      <Footer />
    </div>
  );
};

export default PercentageCalculator;
