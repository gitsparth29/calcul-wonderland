import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

const RandomNumberGenerator = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);
    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) return;

    const nums: number[] = [];
    for (let i = 0; i < countVal; i++) {
      nums.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }
    setResults(nums);
  };

  return (
    <CalculatorLayout title="Random Number Generator" description="Generate random numbers in any range" backLink="/math" backLabel="Math Calculators" icon={<Shuffle className="h-8 w-8 text-primary-foreground" />}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <InputGroup label="Minimum" value={min} onChange={setMin} placeholder="1" />
            <InputGroup label="Maximum" value={max} onChange={setMax} placeholder="100" />
            <InputGroup label="How Many" value={count} onChange={setCount} placeholder="1" />
            <Button onClick={generate} className="w-full" size="lg">Generate</Button>
          </CardContent>
        </Card>
        <div>
          <ResultCard label="Random Number(s)" value={results.length > 0 ? results.join(", ") : "--"} highlight />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RandomNumberGenerator;
