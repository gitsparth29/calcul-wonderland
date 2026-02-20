import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [loanTerm, setLoanTerm] = useState("3");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) return;

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({ monthlyPayment, totalPayment, totalInterest });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate monthly payments and total interest for any loan"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<DollarSign className="h-8 w-8 text-primary-foreground" />}
      category="Finance"
      canonicalPath="/finance/loan"
      keywords={["loan payment calculator", "personal loan calculator", "loan interest calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              placeholder="10000"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Annual Interest Rate"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="5"
              suffix="%"
              type="number"
            />
            <InputGroup
              label="Loan Term"
              value={loanTerm}
              onChange={setLoanTerm}
              placeholder="3"
              suffix="years"
              type="number"
            />
            <Button onClick={calculateLoan} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Monthly Payment"
            value={results ? formatCurrency(results.monthlyPayment) : "--"}
            highlight
          />
          <ResultCard
            label="Total Payment"
            value={results ? formatCurrency(results.totalPayment) : "--"}
          />
          <ResultCard
            label="Total Interest"
            value={results ? formatCurrency(results.totalInterest) : "--"}
          />
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="mt-12 max-w-none" aria-label="About Loan Calculator">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Loan Calculator</h2>

        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">What Is a Loan Calculator?</h3>
        <p className="text-muted-foreground mb-4">
          A loan calculator is an online financial tool that helps you estimate loan payments, total interest, and the overall repayment cost based on key inputs such as loan amount, interest rate (APR), loan term, and compounding frequency. A modern loan payment calculator can be used for a wide range of borrowing needs, including personal loans, auto loans, student loans, business loans, and mortgages—any situation where payments are made on a regular schedule.
        </p>
        <p className="text-muted-foreground mb-4">
          When most people think of a loan, they imagine an amortized loan—where the borrower gradually repays both principal and interest over time. A monthly loan calculator simplifies this process by instantly showing how much you'll pay each month and how much the loan will cost over its full term.
        </p>
        <p className="text-muted-foreground mb-4">
          Using a loan calculator online before borrowing helps you compare options, avoid over-borrowing, and understand how interest accumulates over time.
        </p>

        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">How This Loan Calculator Works</h3>
        <p className="text-muted-foreground mb-3">
          Our loan calculator with interest is designed to support multiple loan structures, making it useful for everyday borrowers as well as advanced financial planning.
        </p>
        <p className="text-muted-foreground mb-2">By entering a few details, you can instantly view:</p>
        <ul className="text-muted-foreground mb-4 list-disc list-inside space-y-1">
          <li>Your periodic loan payment</li>
          <li>Total interest paid</li>
          <li>Full repayment amount</li>
          <li>A detailed loan amortization schedule</li>
        </ul>

        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Types of Loans This Calculator Supports</h3>

        <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">1. Amortized Loans (Most Common)</h4>
        <p className="text-muted-foreground mb-3">
          Amortized loans involve fixed, recurring payments made over the life of the loan. Each payment includes interest (the cost of borrowing) and principal (repayment of the borrowed amount). Over time, the interest portion decreases while the principal portion increases. This structure is used by most consumer loans, including:
        </p>
        <ul className="text-muted-foreground mb-3 list-disc list-inside space-y-1">
          <li>Personal loan calculator</li>
          <li>Auto loan calculator</li>
          <li>Student loan calculator</li>
          <li>Mortgage loan calculator</li>
        </ul>
        <p className="text-muted-foreground mb-2">For amortized loans, the calculator shows:</p>
        <ul className="text-muted-foreground mb-4 list-disc list-inside space-y-1">
          <li>Monthly payment amount</li>
          <li>Total interest paid</li>
          <li>Full loan amortization schedule</li>
        </ul>

        <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">2. Deferred Payment Loans (Lump Sum at Maturity)</h4>
        <p className="text-muted-foreground mb-3">
          Some loans require no regular payments during the loan term. Instead, both principal and interest are paid together at the end. This loan calculator for deferred payments estimates:
        </p>
        <ul className="text-muted-foreground mb-3 list-disc list-inside space-y-1">
          <li>Final lump-sum amount due</li>
          <li>Total interest accumulated</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          These loans are commonly used in short-term business financing, bridge loans, and certain commercial lending scenarios.
        </p>

        <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">3. Bond-Style Loans (Zero-Coupon Structure)</h4>
        <p className="text-muted-foreground mb-3">In this structure, the borrower repays a fixed amount at maturity, similar to zero-coupon bonds:</p>
        <ul className="text-muted-foreground mb-3 list-disc list-inside space-y-1">
          <li>The loan is issued at a discount</li>
          <li>No periodic interest payments</li>
          <li>Full face value is paid at maturity</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          While rare for consumer loans, this structure is widely used in bond markets and structured finance, and our calculator can model this repayment style accurately.
        </p>

        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">Loan Formula Used in Calculations</h3>
        <p className="text-muted-foreground mb-3">
          For standard amortized loans, this loan amortization calculator uses the following formula:
        </p>
        <p className="font-mono bg-muted rounded px-3 py-2 text-sm text-muted-foreground mb-3">
          A = P × (r(1+r)^n) / ((1+r)^n − 1)
        </p>
        <ul className="text-muted-foreground mb-4 list-none space-y-1">
          <li><strong>P</strong> = Loan principal</li>
          <li><strong>r</strong> = Periodic interest rate (APR ÷ compounding periods)</li>
          <li><strong>n</strong> = Total number of payments</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          This formula ensures payments are evenly distributed and the loan is fully repaid by the end of the term.
        </p>

        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">Example Loan Calculation</h3>
        <ul className="text-muted-foreground mb-3 list-none space-y-1">
          <li>Loan amount: $20,000</li>
          <li>Interest rate: 8% APR</li>
          <li>Loan term: 5 years</li>
          <li>Compounding: Monthly</li>
        </ul>
        <ul className="text-muted-foreground mb-3 list-none space-y-1">
          <li><strong>Step 1 – Monthly interest rate:</strong> 8% ÷ 12 = 0.67% (0.0067)</li>
          <li><strong>Step 2 – Number of payments:</strong> 5 × 12 = 60 months</li>
          <li><strong>Step 3 – Result:</strong> The estimated monthly loan payment is approximately $406, with total interest paid of around $4,360.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          The calculator also displays a full loan repayment schedule, showing how each payment is split between interest and principal.
        </p>

        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Loan Basics Every Borrower Should Know</h3>

        <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Interest Rate: APR vs APY</h4>
        <ul className="text-muted-foreground mb-3 list-disc list-inside space-y-1">
          <li><strong>APR (Annual Percentage Rate)</strong> represents the true cost of borrowing, including interest and lender fees.</li>
          <li><strong>APY (Annual Percentage Yield)</strong> is used for savings and investments, not loans.</li>
        </ul>
        <p className="text-muted-foreground mb-4">This loan calculator APR-based model ensures accurate repayment estimates.</p>

        <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Compounding Frequency</h4>
        <p className="text-muted-foreground mb-4">
          Interest may compound monthly, quarterly, or annually. More frequent compounding increases total interest, even if the APR remains the same. Most consumer loans compound monthly.
        </p>

        <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Loan Term</h4>
        <ul className="text-muted-foreground mb-4 list-disc list-inside space-y-1">
          <li>Shorter loan terms → higher payments, lower total interest</li>
          <li>Longer loan terms → lower payments, higher total interest</li>
        </ul>
        <p className="text-muted-foreground mb-4">This loan term calculator allows instant comparison across different repayment lengths.</p>

        <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Secured vs Unsecured Loans</h4>
        <p className="text-muted-foreground mb-2"><strong>Secured Loans</strong></p>
        <p className="text-muted-foreground mb-2">Secured loans require collateral such as a vehicle or property.</p>
        <ul className="text-muted-foreground mb-3 list-disc list-inside space-y-1">
          <li>Pros: Lower interest rates, higher approval chances</li>
          <li>Cons: Risk of asset loss if you default</li>
        </ul>
        <p className="text-muted-foreground mb-4">Common examples include auto loans and mortgages.</p>
        <p className="text-muted-foreground mb-2"><strong>Unsecured Loans</strong></p>
        <p className="text-muted-foreground mb-2">Unsecured loans do not require collateral and are approved based on creditworthiness.</p>
        <ul className="text-muted-foreground mb-3 list-disc list-inside space-y-1">
          <li>Higher interest rates</li>
          <li>Lower borrowing limits</li>
          <li>Shorter repayment terms</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Examples include personal loans, credit cards, and some student loans. Lenders typically assess income, credit score, existing debt, and overall financial stability.
        </p>

        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Why Use Our Loan Calculator?</h3>
        <ul className="text-muted-foreground mb-4 list-none space-y-3">
          <li>✔ <strong>Supports Multiple Loan Types</strong> — Calculate amortized loans, deferred payment loans, and bond-style loans in one place.</li>
          <li>✔ <strong>Clear Cost Breakdown</strong> — See exactly how much interest you'll pay and how payments change over time.</li>
          <li>✔ <strong>Smarter Borrowing Decisions</strong> — Compare loan terms, interest rates, and repayment structures before committing.</li>
          <li>✔ <strong>Fast, Simple, and Accurate</strong> — No spreadsheets or manual math—just instant results using transparent formulas.</li>
        </ul>
      </section>
    </CalculatorLayout>
  );
};

export default LoanCalculator;
