import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const conversionCategories = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meters", factor: 1 },
      kilometer: { name: "Kilometers", factor: 0.001 },
      centimeter: { name: "Centimeters", factor: 100 },
      millimeter: { name: "Millimeters", factor: 1000 },
      mile: { name: "Miles", factor: 0.000621371 },
      yard: { name: "Yards", factor: 1.09361 },
      foot: { name: "Feet", factor: 3.28084 },
      inch: { name: "Inches", factor: 39.3701 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilograms", factor: 1 },
      gram: { name: "Grams", factor: 1000 },
      milligram: { name: "Milligrams", factor: 1000000 },
      pound: { name: "Pounds", factor: 2.20462 },
      ounce: { name: "Ounces", factor: 35.274 },
      ton: { name: "Metric Tons", factor: 0.001 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius", factor: 1 },
      fahrenheit: { name: "Fahrenheit", factor: 1 },
      kelvin: { name: "Kelvin", factor: 1 },
    },
  },
  area: {
    name: "Area",
    units: {
      sqmeter: { name: "Square Meters", factor: 1 },
      sqkilometer: { name: "Square Kilometers", factor: 0.000001 },
      sqfoot: { name: "Square Feet", factor: 10.7639 },
      sqyard: { name: "Square Yards", factor: 1.19599 },
      acre: { name: "Acres", factor: 0.000247105 },
      hectare: { name: "Hectares", factor: 0.0001 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liters", factor: 1 },
      milliliter: { name: "Milliliters", factor: 1000 },
      gallon: { name: "Gallons (US)", factor: 0.264172 },
      quart: { name: "Quarts", factor: 1.05669 },
      pint: { name: "Pints", factor: 2.11338 },
      cup: { name: "Cups", factor: 4.22675 },
      floz: { name: "Fluid Ounces", factor: 33.814 },
    },
  },
  speed: {
    name: "Speed",
    units: {
      mps: { name: "Meters/Second", factor: 1 },
      kph: { name: "Kilometers/Hour", factor: 3.6 },
      mph: { name: "Miles/Hour", factor: 2.23694 },
      knot: { name: "Knots", factor: 1.94384 },
      fps: { name: "Feet/Second", factor: 3.28084 },
    },
  },
};

type CategoryKey = keyof typeof conversionCategories;

const UnitConverter = () => {
  const [category, setCategory] = useState<CategoryKey>("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");
  const [fromValue, setFromValue] = useState("1");
  const [result, setResult] = useState<string>("3.28084");

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    
    // Convert to Celsius first
    if (from === "celsius") celsius = value;
    else if (from === "fahrenheit") celsius = (value - 32) * 5/9;
    else celsius = value - 273.15; // kelvin
    
    // Convert from Celsius to target
    if (to === "celsius") return celsius;
    else if (to === "fahrenheit") return celsius * 9/5 + 32;
    else return celsius + 273.15; // kelvin
  };

  const convert = (value: string, from: string, to: string, cat: CategoryKey) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult("--");
      return;
    }

    if (cat === "temperature") {
      const converted = convertTemperature(numValue, from, to);
      setResult(converted.toFixed(4));
      return;
    }

    const units = conversionCategories[cat].units;
    const fromFactor = (units as any)[from]?.factor || 1;
    const toFactor = (units as any)[to]?.factor || 1;

    // Convert to base unit, then to target
    const baseValue = numValue / fromFactor;
    const converted = baseValue * toFactor;
    setResult(converted.toFixed(6).replace(/\.?0+$/, ""));
  };

  const handleCategoryChange = (newCategory: CategoryKey) => {
    setCategory(newCategory);
    const units = Object.keys(conversionCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    convert(fromValue, units[0], units[1] || units[0], newCategory);
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit, category);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    convert(fromValue, unit, toUnit, category);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    convert(fromValue, fromUnit, unit, category);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    convert(fromValue, toUnit, temp, category);
  };

  return (
    <CalculatorLayout
      title="Unit Converter"
      description="Convert between various units of measurement"
      backLink="/tools"
      backLabel="Utility Tools"
      icon={<ArrowLeftRight className="h-8 w-8 text-primary-foreground" />}
    >
      <Card className="shadow-medium max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => handleCategoryChange(v as CategoryKey)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversionCategories).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversionCategories[category].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Enter value"
              />
            </div>

            <button
              onClick={swapUnits}
              className="p-2 rounded-full hover:bg-muted transition-colors self-center"
            >
              <ArrowLeftRight className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={handleToUnitChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversionCategories[category].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-medium">
                {result}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default UnitConverter;
