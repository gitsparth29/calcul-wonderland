import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";

const SalesTaxCalculator = () => {
  const [price, setPrice] = useState("100");
  const [taxRate, setTaxRate] = useState("7");
  const [results, setResults] = useState<{
    taxAmount: number;
    totalPrice: number;
    preTaxPrice: number;
  } | null>(null);

  const calculateFromPreTax = () => {
    const preTax = parseFloat(price);
    const rate = parseFloat(taxRate) / 100;

    if (isNaN(preTax) || isNaN(rate)) return;

    const taxAmount = preTax * rate;
    const totalPrice = preTax + taxAmount;

    setResults({ taxAmount, totalPrice, preTaxPrice: preTax });
  };

  const calculateFromTotal = () => {
    const total = parseFloat(price);
    const rate = parseFloat(taxRate) / 100;

    if (isNaN(total) || isNaN(rate)) return;

    const preTaxPrice = total / (1 + rate);
    const taxAmount = total - preTaxPrice;

    setResults({ taxAmount, totalPrice: total, preTaxPrice });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <CalculatorLayout
      title="Sales Tax Calculator"
      description="Calculate sales tax for purchases or reverse calculate from total"
      backLink="/finance"
      backLabel="Finance Calculators"
      icon={<Receipt className="h-8 w-8 text-primary-foreground" />}
      category="Finance"
      canonicalPath="/finance/sales-tax"
      keywords={["tax calculator", "reverse sales tax", "price before tax"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Calculate Sales Tax</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputGroup
              label="Price"
              value={price}
              onChange={setPrice}
              placeholder="100"
              prefix="$"
              type="number"
            />
            <InputGroup
              label="Tax Rate"
              value={taxRate}
              onChange={setTaxRate}
              placeholder="7"
              suffix="%"
              type="number"
            />
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={calculateFromPreTax} size="lg" className="w-full">
                Add Tax
              </Button>
              <Button onClick={calculateFromTotal} variant="outline" size="lg" className="w-full">
                Remove Tax
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Pre-tax Price"
            value={results ? formatCurrency(results.preTaxPrice) : "--"}
          />
          <ResultCard
            label="Sales Tax"
            value={results ? formatCurrency(results.taxAmount) : "--"}
          />
          <ResultCard
            label="Total Price"
            value={results ? formatCurrency(results.totalPrice) : "--"}
            highlight
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default SalesTaxCalculator;
