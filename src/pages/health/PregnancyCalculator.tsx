import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { format, addDays, addWeeks, differenceInWeeks, differenceInDays } from "date-fns";

const PregnancyCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>(undefined);
  const [results, setResults] = useState<{
    dueDate: Date;
    currentWeek: number;
    currentDay: number;
    trimester: string;
    conception: Date;
    milestones: { name: string; date: Date }[];
  } | null>(null);

  const calculate = () => {
    if (!lastPeriod) return;

    const dueDate = addDays(lastPeriod, 280);
    const conception = addDays(lastPeriod, 14);
    const today = new Date();

    const totalDays = differenceInDays(today, lastPeriod);
    const currentWeek = Math.floor(totalDays / 7);
    const currentDay = totalDays % 7;

    let trimester: string;
    if (currentWeek < 13) trimester = "First Trimester";
    else if (currentWeek < 27) trimester = "Second Trimester";
    else trimester = "Third Trimester";

    const milestones = [
      { name: "End of First Trimester", date: addWeeks(lastPeriod, 13) },
      { name: "Gender can be determined", date: addWeeks(lastPeriod, 18) },
      { name: "End of Second Trimester", date: addWeeks(lastPeriod, 27) },
      { name: "Third Trimester begins", date: addWeeks(lastPeriod, 28) },
      { name: "Full term", date: addWeeks(lastPeriod, 37) },
      { name: "Due Date", date: dueDate },
    ];

    setResults({
      dueDate,
      currentWeek: Math.max(0, currentWeek),
      currentDay: Math.max(0, currentDay),
      trimester,
      conception,
      milestones,
    });
  };

  return (
    <CalculatorLayout
      title="Pregnancy Calculator"
      description="Track pregnancy milestones and calculate your due date"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<Baby className="h-8 w-8 text-primary-foreground" />}
      category="Health"
      canonicalPath="/health/pregnancy"
      keywords={["pregnancy tracker", "pregnancy week calculator", "trimester calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>First Day of Last Period</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={lastPeriod}
              onSelect={setLastPeriod}
              className="rounded-md border mx-auto"
            />
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Estimated Due Date"
            value={results ? format(results.dueDate, "MMMM d, yyyy") : "--"}
            highlight
          />
          <ResultCard
            label="Current Progress"
            value={results ? `Week ${results.currentWeek}, Day ${results.currentDay}` : "--"}
          />
          <ResultCard
            label="Trimester"
            value={results ? results.trimester : "--"}
          />
          <ResultCard
            label="Estimated Conception"
            value={results ? format(results.conception, "MMMM d, yyyy") : "--"}
          />
          {results && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-base">Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {results.milestones.map((milestone) => (
                    <div key={milestone.name} className="flex justify-between">
                      <span className="text-muted-foreground">{milestone.name}:</span>
                      <span className="font-medium">{format(milestone.date, "MMM d, yyyy")}</span>
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

export default PregnancyCalculator;
