import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { PaymentBreakdownChart } from "@/components/charts/PaymentBreakdownChart";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, Calendar, TrendingUp } from "lucide-react";

const MortgageCalculator = () => {
  const { formatCurrency: formatCurrencyCtx, currencySymbol } = useCurrency();
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    loanAmount: number;
  } | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      setResults(null);
      return;
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount: principal,
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate]);

  const formatCurrency = (value: number) => {
    return formatCurrencyCtx(value, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Mortgage Calculator (With Taxes, Insurance &amp; PMI) – Infinity Calculator</title>
        <meta name="description" content="Estimate monthly mortgage payments with taxes, insurance, PMI, and extra payments. See total interest, payoff time, and full amortization." />
        <link rel="canonical" href="https://infinitycalculator.net/calculators/mortgage" />
      </Helmet>
      <Header />
      <main className="flex-1">
        <CalculatorLayout
          title="Mortgage Calculator"
          description="Calculate your monthly mortgage payment, total interest, and create an amortization schedule"
          backLink="/finance"
          backLabel="Finance Calculators"
          icon={<Home className="h-8 w-8 text-primary-foreground" />}
          category="Finance"
          canonicalPath="/finance/mortgage"
          keywords={["home loan calculator", "monthly payment calculator", "house payment", "mortgage payment estimator"]}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                Loan Details
              </h3>
              
              <div className="space-y-5">
                <InputGroup
                  label="Home Price"
                  id="homePrice"
                  value={homePrice}
                  onChange={setHomePrice}
                  prefix={currencySymbol}
                  placeholder="300,000"
                />
                
                <InputGroup
                  label="Down Payment"
                  id="downPayment"
                  value={downPayment}
                  onChange={setDownPayment}
                  prefix={currencySymbol}
                  placeholder="60,000"
                />
                
                <InputGroup
                  label="Loan Term"
                  id="loanTerm"
                  value={loanTerm}
                  onChange={setLoanTerm}
                  suffix="years"
                  placeholder="30"
                />
                
                <InputGroup
                  label="Interest Rate"
                  id="interestRate"
                  value={interestRate}
                  onChange={setInterestRate}
                  suffix="%"
                  step={0.1}
                  placeholder="6.5"
                />
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full mt-6"
                onClick={calculateMortgage}
              >
                Calculate Payment
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {results && (
                <>
                  <ResultCard
                    label="Monthly Payment"
                    value={formatCurrency(results.monthlyPayment)}
                    highlight
                    icon={<DollarSign className="h-5 w-5 text-primary-foreground" />}
                    subtext="Principal & Interest"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label="Loan Amount"
                      value={formatCurrency(results.loanAmount)}
                      icon={<Home className="h-5 w-5 text-muted-foreground" />}
                    />
                    <ResultCard
                      label="Loan Term"
                      value={`${loanTerm} years`}
                      icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
                    />
                  </div>
                  
                  <ResultCard
                    label="Total Interest"
                    value={formatCurrency(results.totalInterest)}
                    icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
                    subtext={`${((results.totalInterest / results.loanAmount) * 100).toFixed(1)}% of loan amount`}
                  />
                  
                  <ResultCard
                    label="Total Payment"
                    value={formatCurrency(results.totalPayment)}
                    subtext="Over the life of the loan"
                  />
                </>
              )}
            </div>
          </div>

          {/* Chart Section */}
          {results && (
            <div className="mt-8">
              <PaymentBreakdownChart 
                principal={results.loanAmount} 
                interest={results.totalInterest}
                title="Total Cost Breakdown"
              />
            </div>
          )}

          {/* SEO Content Section */}
          <section className="mt-12 prose prose-slate max-w-none" aria-label="About Mortgage Calculator">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Mortgage Calculator</h2>

            <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">What Is a Mortgage Calculator?</h3>
            <p className="text-muted-foreground mb-4">
              A mortgage calculator is an online financial tool that helps you estimate your monthly mortgage payment based on key inputs such as the loan amount, interest rate, loan term, and down payment. A modern mortgage payment calculator goes beyond basic principal and interest by allowing you to include property taxes, homeowners insurance, HOA fees, and private mortgage insurance (PMI)—giving a realistic view of your total monthly housing cost.
            </p>
            <p className="text-muted-foreground mb-4">
              This type of home loan calculator is especially useful for first-time home buyers, homeowners planning a mortgage refinance, and investors comparing multiple loan scenarios. While mortgage structures vary globally, most calculations follow U.S. mortgage standards, including fixed-rate loans and standard mortgage amortization schedules.
            </p>
            <p className="text-muted-foreground mb-4">
              Using a monthly mortgage calculator early in your planning process helps you set a realistic budget, avoid over-borrowing, and clearly understand how interest costs accumulate over time.
            </p>

            <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">How This Mortgage Calculator Works</h3>
            <p className="text-muted-foreground mb-4">
              Our mortgage calculator with taxes and insurance uses standard amortization principles to break your loan into predictable monthly payments over the life of the mortgage. By entering a few simple details, you can instantly see your estimated payment, total interest paid, and full loan repayment amount.
            </p>
            <p className="text-muted-foreground mb-4">
              This calculator also supports scenarios such as extra mortgage payments, helping you explore early payoff strategies and long-term interest savings.
            </p>

            <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">Key Mortgage Calculator Inputs Explained</h3>

            <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Loan Amount</h4>
            <p className="text-muted-foreground mb-4">
              The total amount borrowed from the lender. This is typically the home purchase price minus your down payment.
            </p>

            <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Down Payment</h4>
            <p className="text-muted-foreground mb-4">
              The upfront amount you pay toward the property. A higher down payment usually lowers your monthly mortgage payment and may eliminate PMI.
            </p>

            <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Loan Term</h4>
            <p className="text-muted-foreground mb-4">
              The length of time to repay the loan—commonly 15-year or 30-year mortgage terms. Shorter terms mean higher monthly payments but significantly lower total interest.
            </p>

            <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Interest Rate (APR)</h4>
            <p className="text-muted-foreground mb-4">
              The annual interest rate charged by the lender. A fixed-rate mortgage calculator assumes the rate stays constant throughout the loan term, keeping payments predictable.
            </p>

            <h4 className="font-heading text-lg font-semibold text-foreground mt-5 mb-2">Additional Costs (Optional)</h4>
            <p className="text-muted-foreground mb-4">
              You can include property taxes, homeowners insurance, HOA fees, and PMI to calculate your true monthly housing cost using this mortgage calculator with escrow-style expenses.
            </p>

            <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">What the Mortgage Calculator Shows</h3>
            <ul className="text-muted-foreground mb-4 list-disc list-inside space-y-1">
              <li>Estimated monthly mortgage payment</li>
              <li>Total interest paid over the loan term</li>
              <li>Full loan repayment amount</li>
              <li>Impact of extra or early mortgage payments</li>
              <li>Comparison between different loan terms and interest rates</li>
            </ul>

            <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">Mortgage Formula Used in Calculations</h3>
            <p className="text-muted-foreground mb-2 font-mono bg-muted rounded px-3 py-2 text-sm">
              Monthly Payment (M) = P × (r(1+r)^n) / ((1+r)^n − 1)
            </p>
            <p className="text-muted-foreground mb-1 mt-3">Where:</p>
            <ul className="text-muted-foreground mb-4 list-none space-y-1">
              <li><strong>P</strong> = Loan principal (amount borrowed)</li>
              <li><strong>r</strong> = Monthly interest rate (annual rate ÷ 12)</li>
              <li><strong>n</strong> = Total number of payments (loan term × 12)</li>
            </ul>

            <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">Example Mortgage Calculation</h3>
            <ul className="text-muted-foreground mb-4 list-none space-y-1">
              <li>Home price: $400,000</li>
              <li>Down payment: $80,000 (20%)</li>
              <li>Loan amount: $320,000</li>
              <li>Interest rate: 6% annually</li>
              <li>Loan term: 30 years</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              The estimated monthly principal and interest payment is approximately $1,919. Adding property taxes, insurance, or HOA fees increases the total monthly cost—something this mortgage calculator with taxes and insurance clearly displays.
            </p>

            <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">Why Use Our Mortgage Calculator?</h3>
            <ul className="text-muted-foreground mb-4 list-disc list-inside space-y-1">
              <li>Accurate &amp; realistic estimates (PMI, taxes, insurance, extra payments included)</li>
              <li>Easy loan comparison across rates and terms</li>
              <li>Early payoff planning with extra payments</li>
              <li>Beginner-friendly and fast</li>
            </ul>
          </section>
        </CalculatorLayout>
      </main>
      <Footer />
    </div>
  );
};

export default MortgageCalculator;
