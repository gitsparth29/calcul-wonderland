import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addDays, subDays, addMonths, subMonths, addYears, subYears, differenceInDays } from "date-fns";

const DateCalculator = () => {
  const [calcType, setCalcType] = useState("add");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState("30");
  const [months, setMonths] = useState("0");
  const [years, setYears] = useState("0");
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [results, setResults] = useState<{
    resultDate: Date;
    daysDiff?: number;
  } | null>(null);

  const calculate = () => {
    if (calcType === "difference") {
      if (!startDate || !endDate) return;
      const daysDiff = Math.abs(differenceInDays(endDate, startDate));
      setResults({ resultDate: endDate, daysDiff });
    } else {
      if (!startDate) return;
      const d = parseInt(days) || 0;
      const m = parseInt(months) || 0;
      const y = parseInt(years) || 0;

      let resultDate = startDate;
      if (calcType === "add") {
        resultDate = addYears(addMonths(addDays(startDate, d), m), y);
      } else {
        resultDate = subYears(subMonths(subDays(startDate, d), m), y);
      }
      setResults({ resultDate });
    }
  };

  return (
    <CalculatorLayout
      title="Date Calculator"
      description="Add or subtract days, months, years from dates"
      backLink="/tools"
      backLabel="Utility Tools"
      icon={<CalendarDays className="h-8 w-8 text-primary-foreground" />}
      category="Tools"
      canonicalPath="/tools/date"
      keywords={["date difference calculator", "days between dates", "add days to date"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Date Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Calculation Type</Label>
              <Select value={calcType} onValueChange={setCalcType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add to Date</SelectItem>
                  <SelectItem value="subtract">Subtract from Date</SelectItem>
                  <SelectItem value="difference">Days Between Dates</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-md border mx-auto"
              />
            </div>
            {calcType === "difference" ? (
              <div className="space-y-2">
                <Label>End Date</Label>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-md border mx-auto"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <InputGroup
                  label="Years"
                  value={years}
                  onChange={setYears}
                  placeholder="0"
                  type="number"
                />
                <InputGroup
                  label="Months"
                  value={months}
                  onChange={setMonths}
                  placeholder="0"
                  type="number"
                />
                <InputGroup
                  label="Days"
                  value={days}
                  onChange={setDays}
                  placeholder="30"
                  type="number"
                />
              </div>
            )}
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {calcType === "difference" ? (
            <ResultCard
              label="Days Between Dates"
              value={results?.daysDiff !== undefined ? `${results.daysDiff} days` : "--"}
              highlight
            />
          ) : (
            <ResultCard
              label="Result Date"
              value={results ? format(results.resultDate, "MMMM d, yyyy") : "--"}
              highlight
            />
          )}
          <ResultCard
            label="Day of Week"
            value={results ? format(results.resultDate, "EEEE") : "--"}
          />
          <ResultCard
            label="Week of Year"
            value={results ? format(results.resultDate, "'Week' w") : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default DateCalculator;
