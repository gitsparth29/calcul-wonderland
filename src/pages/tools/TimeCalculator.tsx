import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TimeCalculator = () => {
  const [operation, setOperation] = useState("add");
  const [hours1, setHours1] = useState("2");
  const [minutes1, setMinutes1] = useState("30");
  const [seconds1, setSeconds1] = useState("0");
  const [hours2, setHours2] = useState("1");
  const [minutes2, setMinutes2] = useState("45");
  const [seconds2, setSeconds2] = useState("30");
  const [results, setResults] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    totalMinutes: number;
    totalHours: number;
  } | null>(null);

  const calculate = () => {
    const h1 = parseInt(hours1) || 0;
    const m1 = parseInt(minutes1) || 0;
    const s1 = parseInt(seconds1) || 0;
    const h2 = parseInt(hours2) || 0;
    const m2 = parseInt(minutes2) || 0;
    const s2 = parseInt(seconds2) || 0;

    const totalSeconds1 = h1 * 3600 + m1 * 60 + s1;
    const totalSeconds2 = h2 * 3600 + m2 * 60 + s2;

    let resultSeconds: number;
    if (operation === "add") {
      resultSeconds = totalSeconds1 + totalSeconds2;
    } else {
      resultSeconds = Math.abs(totalSeconds1 - totalSeconds2);
    }

    const hours = Math.floor(resultSeconds / 3600);
    const minutes = Math.floor((resultSeconds % 3600) / 60);
    const seconds = resultSeconds % 60;

    setResults({
      hours,
      minutes,
      seconds,
      totalSeconds: resultSeconds,
      totalMinutes: resultSeconds / 60,
      totalHours: resultSeconds / 3600,
    });
  };

  return (
    <CalculatorLayout
      title="Time Calculator"
      description="Add and subtract time durations"
      backLink="/tools"
      backLabel="Utility Tools"
      icon={<Clock className="h-8 w-8 text-primary-foreground" />}
      category="Tools"
      canonicalPath="/tools/time"
      keywords={["time duration calculator", "add time", "hours minutes calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Time Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>First Time</Label>
              <div className="grid grid-cols-3 gap-2">
                <InputGroup
                  label=""
                  value={hours1}
                  onChange={setHours1}
                  placeholder="2"
                  suffix="h"
                  type="number"
                />
                <InputGroup
                  label=""
                  value={minutes1}
                  onChange={setMinutes1}
                  placeholder="30"
                  suffix="m"
                  type="number"
                />
                <InputGroup
                  label=""
                  value={seconds1}
                  onChange={setSeconds1}
                  placeholder="0"
                  suffix="s"
                  type="number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Operation</Label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add (+)</SelectItem>
                  <SelectItem value="subtract">Subtract (−)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Second Time</Label>
              <div className="grid grid-cols-3 gap-2">
                <InputGroup
                  label=""
                  value={hours2}
                  onChange={setHours2}
                  placeholder="1"
                  suffix="h"
                  type="number"
                />
                <InputGroup
                  label=""
                  value={minutes2}
                  onChange={setMinutes2}
                  placeholder="45"
                  suffix="m"
                  type="number"
                />
                <InputGroup
                  label=""
                  value={seconds2}
                  onChange={setSeconds2}
                  placeholder="30"
                  suffix="s"
                  type="number"
                />
              </div>
            </div>
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Result"
            value={
              results
                ? `${results.hours}h ${results.minutes}m ${results.seconds}s`
                : "--"
            }
            highlight
          />
          <ResultCard
            label="Total Seconds"
            value={results ? results.totalSeconds.toLocaleString() : "--"}
          />
          <ResultCard
            label="Total Minutes"
            value={results ? results.totalMinutes.toFixed(2) : "--"}
          />
          <ResultCard
            label="Total Hours"
            value={results ? results.totalHours.toFixed(4) : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default TimeCalculator;
