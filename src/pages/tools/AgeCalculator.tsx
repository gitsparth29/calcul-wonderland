import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Cake, CalendarDays } from "lucide-react";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours, differenceInMinutes, format, isValid, parse } from "date-fns";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [results, setResults] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    nextBirthday: string;
    daysUntilBirthday: number;
  } | null>(null);

  const calculateAge = () => {
    const birth = parse(birthDate, "yyyy-MM-dd", new Date());
    const to = parse(toDate, "yyyy-MM-dd", new Date());

    if (!isValid(birth) || !isValid(to)) {
      setResults(null);
      return;
    }

    const years = differenceInYears(to, birth);
    const monthsAfterYears = differenceInMonths(to, birth) % 12;
    
    // Calculate remaining days after years and months
    const dateAfterYearsAndMonths = new Date(birth);
    dateAfterYearsAndMonths.setFullYear(birth.getFullYear() + years);
    dateAfterYearsAndMonths.setMonth(birth.getMonth() + monthsAfterYears);
    const daysAfterMonths = differenceInDays(to, dateAfterYearsAndMonths);

    const totalDays = differenceInDays(to, birth);
    const totalWeeks = differenceInWeeks(to, birth);
    const totalMonths = differenceInMonths(to, birth);
    const totalHours = differenceInHours(to, birth);

    // Calculate next birthday
    const currentYear = to.getFullYear();
    let nextBirthdayYear = currentYear;
    const birthdayThisYear = new Date(currentYear, birth.getMonth(), birth.getDate());
    
    if (birthdayThisYear <= to) {
      nextBirthdayYear = currentYear + 1;
    }
    
    const nextBirthday = new Date(nextBirthdayYear, birth.getMonth(), birth.getDate());
    const daysUntilBirthday = differenceInDays(nextBirthday, to);

    setResults({
      years,
      months: monthsAfterYears,
      days: daysAfterMonths,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      nextBirthday: format(nextBirthday, "MMMM d, yyyy"),
      daysUntilBirthday,
    });
  };

  useEffect(() => {
    if (birthDate) {
      calculateAge();
    }
  }, [birthDate, toDate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CalculatorLayout
          title="Age Calculator"
          description="Calculate your exact age in years, months, days, and more"
          backLink="/tools"
          backLabel="Tools"
          icon={<Calendar className="h-8 w-8 text-primary-foreground" />}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                Enter Dates
              </h3>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium text-foreground">
                    Date of Birth
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={toDate}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toDate" className="text-sm font-medium text-foreground">
                    Age at Date (defaults to today)
                  </Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-6"
                onClick={calculateAge}
              >
                Calculate Age
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {results && (
                <>
                  <ResultCard
                    label="Your Age"
                    value={`${results.years} years, ${results.months} months, ${results.days} days`}
                    highlight
                    icon={<Cake className="h-5 w-5 text-primary-foreground" />}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label="Total Years"
                      value={results.years.toLocaleString()}
                      icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
                    />
                    <ResultCard
                      label="Total Months"
                      value={results.totalMonths.toLocaleString()}
                      icon={<CalendarDays className="h-5 w-5 text-muted-foreground" />}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label="Total Weeks"
                      value={results.totalWeeks.toLocaleString()}
                    />
                    <ResultCard
                      label="Total Days"
                      value={results.totalDays.toLocaleString()}
                    />
                  </div>

                  <ResultCard
                    label="Total Hours"
                    value={results.totalHours.toLocaleString()}
                    icon={<Clock className="h-5 w-5 text-muted-foreground" />}
                  />

                  <div className="bg-gradient-accent rounded-xl p-5">
                    <p className="text-sm font-medium text-accent-foreground/80 mb-1">
                      Next Birthday
                    </p>
                    <p className="font-heading text-xl font-bold text-accent-foreground">
                      {results.nextBirthday}
                    </p>
                    <p className="text-sm text-accent-foreground/70 mt-1">
                      {results.daysUntilBirthday === 0
                        ? "🎉 Happy Birthday!"
                        : `${results.daysUntilBirthday} days away`}
                    </p>
                  </div>
                </>
              )}

              {!results && (
                <div className="bg-muted/50 rounded-xl p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your birth date to calculate your age
                  </p>
                </div>
              )}
            </div>
          </div>
        </CalculatorLayout>
      </main>
      <Footer />
    </div>
  );
};

export default AgeCalculator;
