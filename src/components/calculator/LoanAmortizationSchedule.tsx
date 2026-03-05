import { useMemo, useState } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface YearlyRow {
  year: number;
  dateRange: string;
  interest: number;
  principal: number;
  balance: number;
}

interface ChartDataPoint {
  year: number;
  balance: number;
  interest: number;
  payment: number;
}

interface LoanAmortizationScheduleProps {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  monthlyPayment: number;
}

export const LoanAmortizationSchedule = ({
  loanAmount,
  interestRate,
  loanTermYears,
  monthlyPayment,
}: LoanAmortizationScheduleProps) => {
  const { formatCurrency } = useCurrency();
  const [scheduleView, setScheduleView] = useState("annual");

  const { monthlySchedule, yearlySchedule, chartData } = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTermYears * 12;
    const rows: AmortizationRow[] = [];
    let balance = loanAmount;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance = Math.max(0, balance - principalPayment);

      rows.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance,
      });
    }

    const now = new Date();
    const startMonth = now.getMonth();
    const startYear = now.getFullYear();

    const yearly: YearlyRow[] = [];
    const chart: ChartDataPoint[] = [];
    const termYears = Math.ceil(totalMonths / 12);

    // Add year 0 point for chart
    chart.push({ year: 0, balance: loanAmount, interest: 0, payment: 0 });

    let cumulativeInterest = 0;
    let cumulativePayment = 0;

    for (let y = 1; y <= termYears; y++) {
      const startIdx = (y - 1) * 12;
      const endIdx = Math.min(y * 12, totalMonths);
      const yearRows = rows.slice(startIdx, endIdx);

      const yearInterest = yearRows.reduce((s, r) => s + r.interest, 0);
      const yearPrincipal = yearRows.reduce((s, r) => s + r.principal, 0);
      const endBalance = yearRows[yearRows.length - 1]?.balance || 0;

      const fromDate = new Date(startYear, startMonth + startIdx);
      const toDate = new Date(startYear, startMonth + endIdx - 1);
      const fmt = (d: Date) => `${d.getMonth() + 1}/${String(d.getFullYear()).slice(-2)}`;

      yearly.push({
        year: y,
        dateRange: `${fmt(fromDate)}-${fmt(toDate)}`,
        interest: yearInterest,
        principal: yearPrincipal,
        balance: endBalance,
      });

      cumulativeInterest += yearInterest;
      cumulativePayment += yearRows.reduce((s, r) => s + r.payment, 0);

      chart.push({
        year: y,
        balance: endBalance,
        interest: cumulativeInterest,
        payment: cumulativePayment,
      });
    }

    return { monthlySchedule: rows, yearlySchedule: yearly, chartData: chart };
  }, [loanAmount, interestRate, loanTermYears, monthlyPayment]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">Year {label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: {formatCurrency(item.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <Card className="shadow-medium">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Loan Balance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="year"
                  label={{ value: "Year", position: "insideBottomRight", offset: -5, fill: "hsl(var(--muted-foreground))" }}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="balance" name="Balance" stroke="hsl(217, 71%, 53%)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="interest" name="Interest" stroke="hsl(142, 71%, 45%)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="payment" name="Payment" stroke="hsl(0, 72%, 51%)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Table */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">Amortization Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={scheduleView} onValueChange={setScheduleView} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="annual">Annual Schedule</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="annual">
              <div className="max-h-[500px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Ending Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearlySchedule.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell className="font-medium">{row.year}</TableCell>
                        <TableCell>{row.dateRange}</TableCell>
                        <TableCell>{formatCurrency(row.interest)}</TableCell>
                        <TableCell>{formatCurrency(row.principal)}</TableCell>
                        <TableCell>{formatCurrency(row.balance)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="monthly">
              <div className="max-h-[500px] overflow-auto">
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
                    {monthlySchedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell className="font-medium">{row.month}</TableCell>
                        <TableCell>{formatCurrency(row.payment)}</TableCell>
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
    </div>
  );
};
