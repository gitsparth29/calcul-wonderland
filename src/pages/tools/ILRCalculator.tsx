import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldCheck, Plus, Trash2, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { addYears, addDays, differenceInCalendarDays, format, parseISO, isValid } from "date-fns";

type VisaType =
  | "skilled-worker"
  | "spouse"
  | "global-talent"
  | "innovator-founder"
  | "health-care"
  | "long-residence";

const visaOptions: { value: VisaType; label: string }[] = [
  { value: "skilled-worker", label: "Skilled Worker" },
  { value: "spouse", label: "Spouse Visa" },
  { value: "global-talent", label: "Global Talent" },
  { value: "innovator-founder", label: "Innovator Founder" },
  { value: "health-care", label: "Health & Care Worker" },
  { value: "long-residence", label: "10-Year Long Residence" },
];

interface Trip {
  id: string;
  departure: string;
  return: string;
}

const newTrip = (): Trip => ({
  id: Math.random().toString(36).slice(2),
  departure: "",
  return: "",
});

const ILRCalculator = () => {
  const [visaType, setVisaType] = useState<VisaType>("skilled-worker");
  const [visaStart, setVisaStart] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [trips, setTrips] = useState<Trip[]>([newTrip()]);

  const results = useMemo(() => {
    if (!visaStart) return null;
    const start = parseISO(visaStart);
    if (!isValid(start)) return null;

    const years = visaType === "long-residence" ? 10 : 5;
    const eligibility = addYears(start, years);
    const earliest = addDays(eligibility, -28);

    const tripData = trips
      .filter((t) => t.departure && t.return)
      .map((t) => {
        const d = parseISO(t.departure);
        const r = parseISO(t.return);
        if (!isValid(d) || !isValid(r) || r < d) return null;
        return { departure: d, return: r, days: differenceInCalendarDays(r, d) };
      })
      .filter((t): t is { departure: Date; return: Date; days: number } => t !== null);

    const totalDays = tripData.reduce((s, t) => s + t.days, 0);
    const longest = tripData.reduce((m, t) => Math.max(m, t.days), 0);

    // Rolling 12-month check for 5-year routes
    let maxRolling = 0;
    if (visaType !== "long-residence" && tripData.length > 0) {
      const sorted = [...tripData].sort((a, b) => a.departure.getTime() - b.departure.getTime());
      for (const anchor of sorted) {
        const windowEnd = addDays(anchor.departure, 365);
        let sum = 0;
        for (const t of sorted) {
          if (t.departure >= anchor.departure && t.departure < windowEnd) {
            sum += t.days;
          }
        }
        if (sum > maxRolling) maxRolling = sum;
      }
    }

    let status: "eligible" | "risk" | "not-eligible" = "eligible";
    if (visaType !== "long-residence") {
      if (maxRolling > 180) status = "not-eligible";
      else if (maxRolling > 150) status = "risk";
    }

    return {
      eligibility,
      earliest,
      totalDays,
      longest,
      tripCount: tripData.length,
      maxRolling,
      status,
    };
  }, [visaType, visaStart, trips]);

  const tripErrors = trips.map((t) => {
    if (!t.departure || !t.return) return "";
    const d = parseISO(t.departure);
    const r = parseISO(t.return);
    if (!isValid(d) || !isValid(r)) return "Invalid date";
    if (r < d) return "Return date must be after departure date";
    return "";
  });

  const addTrip = () => setTrips([...trips, newTrip()]);
  const removeTrip = (id: string) =>
    setTrips(trips.length > 1 ? trips.filter((t) => t.id !== id) : trips);
  const updateTrip = (id: string, field: "departure" | "return", value: string) =>
    setTrips(trips.map((t) => (t.id === id ? { ...t, [field]: value } : t)));

  const reset = () => {
    setVisaType("skilled-worker");
    setVisaStart("");
    setEntryDate("");
    setTrips([newTrip()]);
  };

  const statusConfig = {
    eligible: {
      label: "Eligible",
      icon: <CheckCircle2 className="h-5 w-5" />,
      className: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    },
    risk: {
      label: "Risk – Near Limit",
      icon: <AlertTriangle className="h-5 w-5" />,
      className: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    },
    "not-eligible": {
      label: "Not Eligible",
      icon: <XCircle className="h-5 w-5" />,
      className: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CalculatorLayout
          title="UK ILR Calculator – Check Your Eligibility"
          description="Estimate your Indefinite Leave to Remain eligibility date, earliest application date, and check the 180-day absence rule."
          backLink="/tools"
          backLabel="Tools"
          icon={<ShieldCheck className="h-8 w-8 text-primary-foreground" />}
          category="Tools"
          canonicalPath="/tools/ilr"
          keywords={["uk ilr calculator", "indefinite leave to remain", "180 day rule", "ilr eligibility"]}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-5">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Your Details
              </h2>

              <div className="space-y-2">
                <Label htmlFor="visaType" className="text-sm font-medium text-foreground">
                  Visa Type
                </Label>
                <Select value={visaType} onValueChange={(v) => setVisaType(v as VisaType)}>
                  <SelectTrigger id="visaType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visaOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visaStart" className="text-sm font-medium text-foreground">
                  Visa Start Date
                </Label>
                <Input
                  id="visaStart"
                  type="date"
                  value={visaStart}
                  onChange={(e) => setVisaStart(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryDate" className="text-sm font-medium text-foreground">
                  UK Entry Date
                </Label>
                <Input
                  id="entryDate"
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <h3 className="font-heading text-base font-semibold text-foreground mb-3">
                  Absences from the UK
                </h3>
                <div className="space-y-4">
                  {trips.map((trip, idx) => (
                    <div key={trip.id} className="rounded-xl border border-border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">Trip {idx + 1}</p>
                        {trips.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTrip(trip.id)}
                            aria-label="Remove trip"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Departure
                          </Label>
                          <Input
                            type="date"
                            value={trip.departure}
                            onChange={(e) => updateTrip(trip.id, "departure", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Return
                          </Label>
                          <Input
                            type="date"
                            value={trip.return}
                            min={trip.departure || undefined}
                            onChange={(e) => updateTrip(trip.id, "return", e.target.value)}
                          />
                        </div>
                      </div>
                      {tripErrors[idx] && (
                        <p className="text-xs text-destructive">{tripErrors[idx]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="mt-4" onClick={addTrip}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Trip
                </Button>
              </div>

              <Button variant="ghost" size="sm" className="w-full" onClick={reset}>
                Reset
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {results ? (
                <>
                  <ResultCard
                    label="ILR Eligibility Date"
                    value={format(results.eligibility, "MMMM d, yyyy")}
                    highlight
                    icon={<ShieldCheck className="h-5 w-5 text-primary-foreground" />}
                  />
                  <ResultCard
                    label="Earliest Application Date"
                    value={format(results.earliest, "MMMM d, yyyy")}
                    subtext="28 days before eligibility"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard label="Total Absence Days" value={results.totalDays} />
                    <ResultCard label="Number of Trips" value={results.tripCount} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard label="Longest Trip (days)" value={results.longest} />
                    <ResultCard
                      label="Max Rolling 12-Month"
                      value={results.maxRolling}
                      subtext="180-day limit"
                    />
                  </div>

                  <div
                    className={`rounded-xl border p-5 flex items-center gap-3 ${statusConfig[results.status].className}`}
                  >
                    {statusConfig[results.status].icon}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide opacity-80">
                        Status
                      </p>
                      <p className="font-heading text-lg font-bold">
                        {statusConfig[results.status].label}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    This tool provides guidance only and is not legal advice.
                  </p>
                </>
              ) : (
                <div className="bg-muted/50 rounded-xl p-8 text-center">
                  <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your visa start date to check your ILR eligibility.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SEO Content */}
          <section className="mt-12 max-w-3xl mx-auto space-y-6 text-foreground" aria-label="About ILR">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-3">What is ILR?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Indefinite Leave to Remain (ILR) is a UK immigration status that allows you to live,
                work, and study in the UK without time restrictions. Most visa routes require 5 years
                of continuous lawful residence, while the Long Residence route requires 10 years.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold mb-3">The 180-Day Absence Rule</h2>
              <p className="text-muted-foreground leading-relaxed">
                For most 5-year routes, you must not spend more than 180 days outside the UK in any
                rolling 12-month period during your qualifying time. Exceeding this limit can break
                continuous residence and delay your ILR eligibility.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold mb-3">The 28-Day Early Application Rule</h2>
              <p className="text-muted-foreground leading-relaxed">
                You can apply for ILR up to 28 days before completing your qualifying period.
                Applying earlier than this may result in your application being refused, so timing
                your application correctly is important.
              </p>
            </div>
          </section>
        </CalculatorLayout>
      </main>
      <Footer />
    </div>
  );
};

export default ILRCalculator;
