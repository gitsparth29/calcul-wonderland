import { useState, useMemo, useEffect } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Info,
} from "lucide-react";
import {
  addYears,
  addDays,
  differenceInCalendarDays,
  format,
  parseISO,
  isValid,
  max as dateMax,
  min as dateMin,
} from "date-fns";
import { toast } from "@/hooks/use-toast";

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

const visaNotes: Record<VisaType, string> = {
  "skilled-worker": "Must meet salary and continuous employment requirements.",
  spouse: "Relationship must still be valid and genuine at the time of application.",
  "global-talent": "Endorsement or eligibility evidence must still apply.",
  "innovator-founder": "Business must meet ongoing endorsement criteria.",
  "health-care": "Must remain in eligible health & care employment.",
  "long-residence": "Different absence rules may apply over the 10-year period.",
};

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

const STORAGE_KEY = "ilr-calculator-state-v1";

const ILRCalculator = () => {
  const [visaType, setVisaType] = useState<VisaType>("skilled-worker");
  const [visaStart, setVisaStart] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [trips, setTrips] = useState<Trip[]>([newTrip()]);
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.visaType) setVisaType(data.visaType);
        if (data.visaStart) setVisaStart(data.visaStart);
        if (data.entryDate) setEntryDate(data.entryDate);
        if (Array.isArray(data.trips) && data.trips.length) setTrips(data.trips);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ visaType, visaStart, entryDate, trips })
      );
    } catch {
      // ignore
    }
  }, [visaType, visaStart, entryDate, trips, hydrated]);

  const results = useMemo(() => {
    if (!visaStart) return null;
    const start = parseISO(visaStart);
    if (!isValid(start)) return null;

    const years = visaType === "long-residence" ? 10 : 5;
    const eligibility = addYears(start, years);
    const earliest = addDays(eligibility, -28);
    const today = new Date();
    const daysRemaining = differenceInCalendarDays(earliest, today);

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
    const average = tripData.length ? Math.round(totalDays / tripData.length) : 0;

    // Rolling 12-month windows anchored at each trip departure.
    // Count the actual days within the window (handles partial overlap).
    let maxRolling = 0;
    let worstWindow: { start: Date; end: Date } | null = null;

    if (tripData.length > 0) {
      const sorted = [...tripData].sort((a, b) => a.departure.getTime() - b.departure.getTime());
      for (const anchor of sorted) {
        const windowStart = anchor.departure;
        const windowEnd = addDays(windowStart, 365);
        let sum = 0;
        for (const t of sorted) {
          // overlap of [t.departure, t.return] with [windowStart, windowEnd]
          const oStart = dateMax([t.departure, windowStart]);
          const oEnd = dateMin([t.return, windowEnd]);
          const overlap = differenceInCalendarDays(oEnd, oStart);
          if (overlap > 0) sum += overlap;
        }
        if (sum > maxRolling) {
          maxRolling = sum;
          worstWindow = { start: windowStart, end: windowEnd };
        }
      }
    }

    let status: "eligible" | "risk" | "not-eligible" = "eligible";
    if (visaType !== "long-residence") {
      if (maxRolling > 180) status = "not-eligible";
      else if (maxRolling >= 150) status = "risk";
    }

    const riskLabel =
      status === "not-eligible" ? "High Risk" : status === "risk" ? "Borderline" : "Safe";

    return {
      eligibility,
      earliest,
      daysRemaining,
      totalDays,
      longest,
      average,
      tripCount: tripData.length,
      maxRolling,
      worstWindow,
      status,
      riskLabel,
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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const copyResults = async () => {
    if (!results) return;
    const lines = [
      `UK ILR Eligibility Summary`,
      `Visa: ${visaOptions.find((v) => v.value === visaType)?.label}`,
      `Eligibility date: ${format(results.eligibility, "MMMM d, yyyy")}`,
      `Earliest application date: ${format(results.earliest, "MMMM d, yyyy")}`,
      results.daysRemaining > 0
        ? `Days remaining: ${results.daysRemaining}`
        : `You can apply now.`,
      `Total absence days: ${results.totalDays}`,
      `Number of trips: ${results.tripCount}`,
      `Longest trip: ${results.longest} days`,
      `Average trip: ${results.average} days`,
      `Max in any rolling 12 months: ${results.maxRolling} days`,
      `Status: ${results.riskLabel}`,
      ``,
      `I checked my ILR eligibility. I can apply on ${format(
        results.earliest,
        "MMMM d, yyyy"
      )} and my total absence is ${results.totalDays} days.`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast({ title: "Copied", description: "Results copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not access clipboard.", variant: "destructive" });
    }
  };

  const statusConfig = {
    eligible: {
      label: "Safe",
      icon: <CheckCircle2 className="h-5 w-5" />,
      className:
        "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    },
    risk: {
      label: "Borderline – Near Limit",
      icon: <AlertTriangle className="h-5 w-5" />,
      className:
        "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    },
    "not-eligible": {
      label: "High Risk – Exceeds 180 Days",
      icon: <XCircle className="h-5 w-5" />,
      className:
        "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
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
              <h2 className="font-heading text-lg font-semibold text-foreground">Your Details</h2>

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
                <p className="text-xs text-muted-foreground flex items-start gap-1.5 pt-1">
                  <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>{visaNotes[visaType]}</span>
                </p>
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
                    subtext={
                      results.daysRemaining > 0
                        ? `You can apply in ${results.daysRemaining} days`
                        : "You can apply now"
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard label="Total Absence Days" value={results.totalDays} />
                    <ResultCard label="Number of Trips" value={results.tripCount} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard label="Longest Trip" value={`${results.longest} days`} />
                    <ResultCard label="Average Trip" value={`${results.average} days`} />
                  </div>

                  <ResultCard
                    label="Max in Any Rolling 12 Months"
                    value={`${results.maxRolling} days`}
                    subtext="180-day rule limit"
                  />

                  <div
                    className={`rounded-xl border p-5 flex items-center gap-3 ${statusConfig[results.status].className}`}
                  >
                    {statusConfig[results.status].icon}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide opacity-80">
                        Risk Level
                      </p>
                      <p className="font-heading text-lg font-bold">{results.riskLabel}</p>
                    </div>
                  </div>

                  {results.status === "not-eligible" && results.worstWindow && (
                    <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 p-4 text-sm text-red-800 dark:text-red-300">
                      ⚠️ Between {format(results.worstWindow.start, "MMM d, yyyy")} and{" "}
                      {format(results.worstWindow.end, "MMM d, yyyy")}, absences exceed 180 days.
                    </div>
                  )}

                  <Button variant="outline" className="w-full" onClick={copyResults}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Results
                  </Button>

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

            <div>
              <h2 className="font-heading text-2xl font-bold mb-3">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger>What is the 180-day rule?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    You must not be outside the UK for more than 180 days in any rolling 12-month
                    period during your qualifying residence. Exceeding this can break continuous
                    residence for ILR.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>Can I apply 28 days early?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes. The Home Office allows you to submit your ILR application up to 28 days
                    before completing your qualifying period. Applying any earlier risks refusal.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>What counts as absence?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Any whole day spent outside the UK counts toward your absence total. The day of
                    departure and the day of return are usually not counted as full days away.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger>Are there exceptions to the 180-day rule?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Limited exceptions exist for serious illness, conflict, natural disasters, or
                    research-related travel. Always check current Home Office guidance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </CalculatorLayout>
      </main>
      <Footer />
    </div>
  );
};

export default ILRCalculator;
