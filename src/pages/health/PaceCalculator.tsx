import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const PaceCalculator = () => {
  const [calcType, setCalcType] = useState("pace");
  const [distance, setDistance] = useState("5");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");
  const [paceMin, setPaceMin] = useState("5");
  const [paceSec, setPaceSec] = useState("0");
  const [results, setResults] = useState<{
    pace: string;
    speed: number;
    time: string;
    splits: { km: number; time: string }[];
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const h = parseFloat(hours) || 0;
    const m = parseFloat(minutes) || 0;
    const s = parseFloat(seconds) || 0;
    const pm = parseFloat(paceMin) || 0;
    const ps = parseFloat(paceSec) || 0;

    if (isNaN(dist)) return;

    let totalSeconds: number;
    let paceSeconds: number;

    if (calcType === "pace") {
      totalSeconds = h * 3600 + m * 60 + s;
      paceSeconds = totalSeconds / dist;
    } else {
      paceSeconds = pm * 60 + ps;
      totalSeconds = paceSeconds * dist;
    }

    const paceMinutes = Math.floor(paceSeconds / 60);
    const paceRemainder = Math.round(paceSeconds % 60);
    const pace = `${paceMinutes}:${paceRemainder.toString().padStart(2, "0")} /km`;

    const speedKmh = (dist / totalSeconds) * 3600;

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMins = Math.floor((totalSeconds % 3600) / 60);
    const totalSecs = Math.round(totalSeconds % 60);
    const time = totalHours > 0
      ? `${totalHours}:${totalMins.toString().padStart(2, "0")}:${totalSecs.toString().padStart(2, "0")}`
      : `${totalMins}:${totalSecs.toString().padStart(2, "0")}`;

    const splits = [];
    for (let km = 1; km <= Math.min(dist, 10); km++) {
      const splitSeconds = paceSeconds * km;
      const splitH = Math.floor(splitSeconds / 3600);
      const splitM = Math.floor((splitSeconds % 3600) / 60);
      const splitS = Math.round(splitSeconds % 60);
      const splitTime = splitH > 0
        ? `${splitH}:${splitM.toString().padStart(2, "0")}:${splitS.toString().padStart(2, "0")}`
        : `${splitM}:${splitS.toString().padStart(2, "0")}`;
      splits.push({ km, time: splitTime });
    }

    setResults({ pace, speed: speedKmh, time, splits });
  };

  return (
    <CalculatorLayout
      title="Pace Calculator"
      description="Calculate running or walking pace, speed, and split times"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<Timer className="h-8 w-8 text-primary-foreground" />}
      category="Health"
      canonicalPath="/health/pace"
      keywords={["running pace calculator", "speed calculator", "marathon pace", "split time calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Calculate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Calculate</Label>
              <Select value={calcType} onValueChange={setCalcType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pace">Pace from Time</SelectItem>
                  <SelectItem value="time">Time from Pace</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputGroup
              label="Distance"
              value={distance}
              onChange={setDistance}
              placeholder="5"
              suffix="km"
              type="number"
            />
            {calcType === "pace" ? (
              <div className="space-y-2">
                <Label>Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  <InputGroup
                    label=""
                    value={hours}
                    onChange={setHours}
                    placeholder="0"
                    suffix="h"
                    type="number"
                  />
                  <InputGroup
                    label=""
                    value={minutes}
                    onChange={setMinutes}
                    placeholder="25"
                    suffix="m"
                    type="number"
                  />
                  <InputGroup
                    label=""
                    value={seconds}
                    onChange={setSeconds}
                    placeholder="0"
                    suffix="s"
                    type="number"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Pace</Label>
                <div className="grid grid-cols-2 gap-2">
                  <InputGroup
                    label=""
                    value={paceMin}
                    onChange={setPaceMin}
                    placeholder="5"
                    suffix="min"
                    type="number"
                  />
                  <InputGroup
                    label=""
                    value={paceSec}
                    onChange={setPaceSec}
                    placeholder="0"
                    suffix="sec"
                    type="number"
                  />
                </div>
              </div>
            )}
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Pace"
            value={results ? results.pace : "--"}
            highlight
          />
          <ResultCard
            label="Speed"
            value={results ? `${results.speed.toFixed(2)} km/h` : "--"}
          />
          <ResultCard
            label="Total Time"
            value={results ? results.time : "--"}
          />
          {results && results.splits.length > 0 && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-base">Split Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {results.splits.map((split) => (
                    <div key={split.km} className="flex justify-between">
                      <span className="text-muted-foreground">{split.km} km:</span>
                      <span className="font-medium">{split.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PaceCalculator;
