import { useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// 2024 US Federal Tax Brackets
const taxBrackets2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

const standardDeductions = {
  single: 14600,
  married: 29200,
  head: 21900,
};

const IncomeTaxCalculator = () => {
  const { formatCurrency, currencySymbol } = useCurrency();
  const [grossIncome, setGrossIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "head">("single");
  const [deductions, setDeductions] = useState("");
  const [results, setResults] = useState<{
    taxableIncome: number;
    federalTax: number;
    effectiveRate: number;
    marginalRate: number;
    afterTaxIncome: number;
  } | null>(null);

  const calculateTax = (income: number, brackets: typeof taxBrackets2024.single) => {
    let tax = 0;
    let marginalRate = 0;

    for (const bracket of brackets) {
      if (income > bracket.min) {
        const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
        tax += taxableInBracket * bracket.rate;
        marginalRate = bracket.rate;
      }
    }

    return { tax, marginalRate };
  };

  const calculate = () => {
    const income = parseFloat(grossIncome);
    if (isNaN(income)) return;

    const deductionAmount = deductions ? parseFloat(deductions) : standardDeductions[filingStatus];
    const taxableIncome = Math.max(0, income - deductionAmount);
    
    const { tax: federalTax, marginalRate } = calculateTax(taxableIncome, taxBrackets2024[filingStatus]);
    const effectiveRate = income > 0 ? (federalTax / income) * 100 : 0;
    const afterTaxIncome = income - federalTax;

    setResults({
      taxableIncome,
      federalTax,
      effectiveRate,
      marginalRate: marginalRate * 100,
      afterTaxIncome,
    });
  };

  const reset = () => {
    setGrossIncome("");
    setFilingStatus("single");
    setDeductions("");
    setResults(null);
  };

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      description="Estimate your U.S. federal income tax based on 2024 tax brackets"
      icon={<FileText className="h-6 w-6 text-primary-foreground" />}
      backLink="/finance"
      backLabel="Finance Calculators"
      category="Finance"
      canonicalPath="/finance/income-tax"
      keywords={["federal tax calculator", "tax bracket calculator", "tax estimator 2024"]}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <InputGroup
            label="Annual Gross Income"
            value={grossIncome}
            onChange={setGrossIncome}
            placeholder="75000"
            type="number"
            prefix={currencySymbol}
          />
          
          <div className="space-y-2">
            <Label>Filing Status</Label>
            <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as typeof filingStatus)}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married Filing Jointly</SelectItem>
                <SelectItem value="head">Head of Household</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <InputGroup
            label={`Deductions (Standard: $${standardDeductions[filingStatus].toLocaleString()})`}
            value={deductions}
            onChange={setDeductions}
            placeholder={standardDeductions[filingStatus].toString()}
            type="number"
            prefix={currencySymbol}
          />

          <div className="flex gap-3 pt-4">
            <Button onClick={calculate} className="flex-1">
              Calculate
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {results ? (
            <>
              <ResultCard
                label="Federal Income Tax"
                value={formatCurrency(results.federalTax)}
                subtext="Estimated annual federal tax"
                highlight
              />
              <ResultCard
                label="Taxable Income"
                value={formatCurrency(results.taxableIncome)}
                subtext="Income after deductions"
              />
              <ResultCard
                label="Effective Tax Rate"
                value={`${results.effectiveRate.toFixed(2)}%`}
                subtext="Actual percentage of income paid"
              />
              <ResultCard
                label="Marginal Tax Rate"
                value={`${results.marginalRate.toFixed(0)}%`}
                subtext="Rate on last dollar earned"
              />
              <ResultCard
                label="After-Tax Income"
                value={formatCurrency(results.afterTaxIncome)}
                subtext="Take-home amount (federal only)"
              />
            </>
          ) : (
            <div className="bg-muted/50 rounded-xl p-8 text-center">
              <p className="text-muted-foreground">
                Enter your income to estimate federal taxes
              </p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default IncomeTaxCalculator;
