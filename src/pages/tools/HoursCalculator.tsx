import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { Label } from "@/components/ui/label";

const HoursCalculator = () => {
  const [startHour, setStartHour] = useState("9");
  const [startMinute, setStartMinute] = useState("00");
  const [startPeriod, setStartPeriod] = useState("AM");
  const [endHour, setEndHour] = useState("5");
  const [endMinute, setEndMinute] = useState("30");
  const [endPeriod, setEndPeriod] = useState("PM");
  const [results, setResults] = useState<{
    hours: number;
    minutes: number;
    totalHours: number;
    totalMinutes: number;
  } | null>(null);

  const convertTo24Hour = (hour: number, period: string): number => {
    if (period === "AM") {
      return hour === 12 ? 0 : hour;
    } else {
      return hour === 12 ? 12 : hour + 12;
    }
  };

  const calculate = () => {
    const sh = parseInt(startHour) || 0;
    const sm = parseInt(startMinute) || 0;
    const eh = parseInt(endHour) || 0;
    const em = parseInt(endMinute) || 0;

    const startHour24 = convertTo24Hour(sh, startPeriod);
    const endHour24 = convertTo24Hour(eh, endPeriod);

    let startTotal = startHour24 * 60 + sm;
    let endTotal = endHour24 * 60 + em;

    // If end time is before start time, assume it's the next day
    if (endTotal < startTotal) {
      endTotal += 24 * 60;
    }

    const diffMinutes = endTotal - startTotal;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setResults({
      hours,
      minutes,
      totalHours: diffMinutes / 60,
      totalMinutes: diffMinutes,
    });
  };

  return (
    <CalculatorLayout
      title="Hours Calculator"
      description="Calculate hours between two times"
      backLink="/tools"
      backLabel="Utility Tools"
      icon={<Timer className="h-8 w-8 text-primary-foreground" />}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Enter Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <div className="flex gap-2">
                <InputGroup
                  label=""
                  value={startHour}
                  onChange={setStartHour}
                  placeholder="9"
                  type="number"
                />
                <span className="flex items-center text-2xl">:</span>
                <InputGroup
                  label=""
                  value={startMinute}
                  onChange={setStartMinute}
                  placeholder="00"
                  type="number"
                />
                <select
                  value={startPeriod}
                  onChange={(e) => setStartPeriod(e.target.value)}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <div className="flex gap-2">
                <InputGroup
                  label=""
                  value={endHour}
                  onChange={setEndHour}
                  placeholder="5"
                  type="number"
                />
                <span className="flex items-center text-2xl">:</span>
                <InputGroup
                  label=""
                  value={endMinute}
                  onChange={setEndMinute}
                  placeholder="30"
                  type="number"
                />
                <select
                  value={endPeriod}
                  onChange={(e) => setEndPeriod(e.target.value)}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Duration"
            value={
              results
                ? `${results.hours} hours ${results.minutes} minutes`
                : "--"
            }
            highlight
          />
          <ResultCard
            label="Total Hours (Decimal)"
            value={results ? results.totalHours.toFixed(2) : "--"}
          />
          <ResultCard
            label="Total Minutes"
            value={results ? results.totalMinutes.toString() : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default HoursCalculator;
