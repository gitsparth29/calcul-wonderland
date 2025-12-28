import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const PaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [termType, setTermType] = useState<"months" | "years">("years");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    payoffDate: string;
  } | null>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const termValue = parseInt(loanTerm);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(termValue)) return;

    const months = termType === "years" ? termValue * 12 : termValue;
    const monthlyRate = annualRate / 12;

    let monthlyPayment: number;

    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate: payoffDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    });
  };

  const reset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setTermType("years");
    setResults(null);
  };

  return (
    <CalculatorLayout
      title="Payment Calculator"
      description="Calculate monthly payments for loans, mortgages, or any fixed-term financing"
      icon={<CreditCard className="h-6 w-6 text-primary-foreground" />}
      backLink="/finance"
      backLabel="Finance Calculators"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <InputGroup
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            placeholder="25000"
            type="number"
            prefix="$"
          />
          <InputGroup
            label="Annual Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            placeholder="6.5"
            type="number"
            suffix="%"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              label="Loan Term"
              value={loanTerm}
              onChange={setLoanTerm}
              placeholder="5"
              type="number"
            />
            <div className="space-y-2">
              <Label>Term Type</Label>
              <Select value={termType} onValueChange={(v) => setTermType(v as typeof termType)}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
                label="Monthly Payment"
                value={`$${results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                subtext="Fixed payment amount"
                highlight
              />
              <ResultCard
                label="Total Payment"
                value={`$${results.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                subtext="Total of all payments"
              />
              <ResultCard
                label="Total Interest"
                value={`$${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                subtext="Cost of borrowing"
              />
              <ResultCard
                label="Payoff Date"
                value={results.payoffDate}
                subtext="Estimated loan payoff"
              />
            </>
          ) : (
            <div className="bg-muted/50 rounded-xl p-8 text-center">
              <p className="text-muted-foreground">
                Enter loan details to calculate monthly payments
              </p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PaymentCalculator;
