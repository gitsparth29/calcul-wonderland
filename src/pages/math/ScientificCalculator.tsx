import { useState } from "react";
import { evaluate } from "mathjs";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === "0" ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleFunction = (fn: string) => {
    const num = parseFloat(display);
    let result: number;
    switch (fn) {
      case "sin": result = Math.sin(num * Math.PI / 180); break;
      case "cos": result = Math.cos(num * Math.PI / 180); break;
      case "tan": result = Math.tan(num * Math.PI / 180); break;
      case "sqrt": result = Math.sqrt(num); break;
      case "log": result = Math.log10(num); break;
      case "ln": result = Math.log(num); break;
      case "x²": result = num * num; break;
      case "1/x": result = 1 / num; break;
      default: return;
    }
    setDisplay(result.toString());
  };

  const calculate = () => {
    try {
      const expression = equation + display;
      const result = evaluate(expression);
      setDisplay(String(result));
      setEquation("");
    } catch { setDisplay("Error"); }
  };

  const clear = () => { setDisplay("0"); setEquation(""); };

  const buttons = [
    ["sin", "cos", "tan", "C"],
    ["log", "ln", "sqrt", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "x²", "="],
  ];

  const handleClick = (btn: string) => {
    if (btn === "C") clear();
    else if (btn === "=") calculate();
    else if (["+", "-", "×", "÷"].includes(btn)) handleOperator(btn === "×" ? "*" : btn === "÷" ? "/" : btn);
    else if (["sin", "cos", "tan", "sqrt", "log", "ln", "x²", "1/x"].includes(btn)) handleFunction(btn);
    else handleNumber(btn);
  };

  return (
    <CalculatorLayout title="Scientific Calculator" description="Advanced mathematical calculations" backLink="/math" backLabel="Math Calculators" icon={<Calculator className="h-8 w-8 text-primary-foreground" />} category="Math" canonicalPath="/math/scientific" keywords={["scientific calculator online", "advanced calculator", "trigonometry calculator"]}>
      <Card className="shadow-medium max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="text-sm text-muted-foreground h-6">{equation}</div>
            <div className="text-3xl font-mono font-bold text-right">{display}</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {buttons.flat().map((btn) => (
              <Button key={btn} variant={btn === "=" ? "default" : ["C", "÷", "×", "-", "+"].includes(btn) ? "secondary" : "outline"} className="h-14 text-lg" onClick={() => handleClick(btn)}>
                {btn}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default ScientificCalculator;
