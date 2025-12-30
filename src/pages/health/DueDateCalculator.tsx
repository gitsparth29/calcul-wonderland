import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addDays, subDays, differenceInDays } from "date-fns";

const DueDateCalculator = () => {
  const [calcMethod, setCalcMethod] = useState("lmp");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [results, setResults] = useState<{
    dueDate: Date;
    daysRemaining: number;
    weeksPregnant: number;
    conception: Date;
  } | null>(null);

  const calculate = () => {
    if (!selectedDate) return;

    let dueDate: Date;
    let conception: Date;

    if (calcMethod === "lmp") {
      // Last Menstrual Period method
      dueDate = addDays(selectedDate, 280);
      conception = addDays(selectedDate, 14);
    } else if (calcMethod === "conception") {
      // Conception date method
      conception = selectedDate;
      dueDate = addDays(selectedDate, 266);
    } else {
      // IVF transfer date (add 266 days minus embryo age)
      conception = subDays(selectedDate, 3); // Assuming 3-day embryo
      dueDate = addDays(selectedDate, 263);
    }

    const today = new Date();
    const daysRemaining = differenceInDays(dueDate, today);
    const daysSinceLMP = calcMethod === "lmp" 
      ? differenceInDays(today, selectedDate)
      : differenceInDays(today, subDays(conception, 14));
    const weeksPregnant = Math.floor(daysSinceLMP / 7);

    setResults({
      dueDate,
      daysRemaining: Math.max(0, daysRemaining),
      weeksPregnant: Math.max(0, weeksPregnant),
      conception,
    });
  };

  return (
    <CalculatorLayout
      title="Due Date Calculator"
      description="Calculate your baby's estimated due date"
      backLink="/health"
      backLabel="Health Calculators"
      icon={<CalendarIcon className="h-8 w-8 text-primary-foreground" />}
      category="Health"
      canonicalPath="/health/due-date"
      keywords={["baby due date", "pregnancy due date", "expected delivery date"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Calculate Due Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Calculation Method</Label>
              <Select value={calcMethod} onValueChange={setCalcMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lmp">First Day of Last Period</SelectItem>
                  <SelectItem value="conception">Conception Date</SelectItem>
                  <SelectItem value="ivf">IVF Transfer Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                {calcMethod === "lmp" && "First Day of Last Period"}
                {calcMethod === "conception" && "Conception Date"}
                {calcMethod === "ivf" && "IVF Transfer Date"}
              </Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto"
              />
            </div>
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
            label="Days Remaining"
            value={results ? `${results.daysRemaining} days` : "--"}
          />
          <ResultCard
            label="Weeks Pregnant"
            value={results ? `${results.weeksPregnant} weeks` : "--"}
          />
          <ResultCard
            label="Estimated Conception"
            value={results ? format(results.conception, "MMMM d, yyyy") : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default DueDateCalculator;
