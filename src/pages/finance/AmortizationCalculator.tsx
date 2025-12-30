import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AmortizationChart, BalanceChart } from "@/components/charts/AmortizationChart";
import { PaymentBreakdownChart } from "@/components/charts/PaymentBreakdownChart";
import { Calculator } from "lucide-react";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const AmortizationCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("200000");
  const [interestRate, setInterestRate] = useState("6");
  const [loanTerm, setLoanTerm] = useState("30");
  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);
  const [summary, setSummary] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n)) return;

    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const rows: AmortizationRow[] = [];
    let balance = P;

    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const principal = monthlyPayment - interest;
      balance -= principal;
      if (balance < 0) balance = 0;

      rows.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance,
      });
    }

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setSummary({ monthlyPayment, totalPayment, totalInterest });
    setSchedule(rows);
  };

  // Aggregate data by year for charts
  const yearlyData = useMemo(() => {
    if (schedule.length === 0) return [];
    
    const years: { year: number; principal: number; interest: number; balance: number }[] = [];
    const termYears = Math.ceil(schedule.length / 12);
    
    for (let year = 1; year <= termYears; year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, schedule.length);
      const yearRows = schedule.slice(startMonth, endMonth);
      
      years.push({
        year,
        principal: yearRows.reduce((sum, row) => sum + row.principal, 0),
        interest: yearRows.reduce((sum, row) => sum + row.interest, 0),
        balance: yearRows[yearRows.length - 1]?.balance || 0,
      });
    }
    
    return years;
  }, [schedule]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Amortization Calculator"
      description="Generate a detailed loan amortization schedule"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<Calculator className="h-8 w-8 text-primary-foreground" />}
      category="Finance"
      canonicalPath="/finance/amortization"
      keywords={["amortization schedule", "loan schedule", "payment schedule calculator"]}
    >
      <div className="space-y-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <InputGroup
                label="Loan Amount"
                value={loanAmount}
                onChange={setLoanAmount}
                placeholder="200000"
                prefix="$"
                type="number"
              />
              <InputGroup
                label="Interest Rate"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="6"
                suffix="%"
                type="number"
              />
              <InputGroup
                label="Loan Term"
                value={loanTerm}
                onChange={setLoanTerm}
                placeholder="30"
                suffix="years"
                type="number"
              />
              <div className="flex items-end">
                <Button onClick={calculate} className="w-full" size="lg">
                  Calculate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {summary && (
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Monthly Payment</div>
                <div className="text-2xl font-bold text-primary">{formatCurrency(summary.monthlyPayment)}</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Total Payment</div>
                <div className="text-2xl font-bold">{formatCurrency(summary.totalPayment)}</div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="text-2xl font-bold">{formatCurrency(summary.totalInterest)}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {summary && yearlyData.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            <PaymentBreakdownChart 
              principal={parseFloat(loanAmount)} 
              interest={summary.totalInterest}
              title="Total Cost Breakdown"
            />
            <BalanceChart data={yearlyData} title="Remaining Balance" />
          </div>
        )}

        {yearlyData.length > 0 && (
          <AmortizationChart data={yearlyData} title="Annual Principal vs Interest" />
        )}

        {schedule.length > 0 && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Amortization Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly Summary</TabsTrigger>
                </TabsList>
                
                <TabsContent value="monthly">
                  <div className="max-h-96 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Month</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Principal</TableHead>
                          <TableHead>Interest</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schedule.slice(0, 60).map((row) => (
                          <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell>{formatCurrency(row.payment)}</TableCell>
                            <TableCell>{formatCurrency(row.principal)}</TableCell>
                            <TableCell>{formatCurrency(row.interest)}</TableCell>
                            <TableCell>{formatCurrency(row.balance)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {schedule.length > 60 && (
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Showing first 60 months of {schedule.length} total months
                      </p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="yearly">
                  <div className="max-h-96 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead>Principal Paid</TableHead>
                          <TableHead>Interest Paid</TableHead>
                          <TableHead>End Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {yearlyData.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{formatCurrency(row.principal)}</TableCell>
                            <TableCell>{formatCurrency(row.interest)}</TableCell>
                            <TableCell>{formatCurrency(row.balance)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default AmortizationCalculator;
