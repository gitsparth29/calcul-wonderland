import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ConcreteCalculator = () => {
  const [shapeType, setShapeType] = useState("slab");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [diameter, setDiameter] = useState("2");
  const [results, setResults] = useState<{
    cubicFeet: number;
    cubicYards: number;
    cubicMeters: number;
    bags40lb: number;
    bags60lb: number;
    bags80lb: number;
  } | null>(null);

  const calculate = () => {
    let cubicFeet: number;

    if (shapeType === "slab" || shapeType === "wall") {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const d = parseFloat(depth) / 12; // Convert inches to feet

      if (isNaN(l) || isNaN(w) || isNaN(d)) return;
      cubicFeet = l * w * d;
    } else if (shapeType === "column") {
      const d = parseFloat(diameter) / 2; // Radius in feet
      const h = parseFloat(depth) / 12; // Height in feet (using depth field)
      const heightFeet = parseFloat(length); // Using length as height

      if (isNaN(d) || isNaN(heightFeet)) return;
      cubicFeet = Math.PI * d * d * heightFeet;
    } else {
      // Footing
      const l = parseFloat(length);
      const w = parseFloat(width);
      const d = parseFloat(depth) / 12;

      if (isNaN(l) || isNaN(w) || isNaN(d)) return;
      cubicFeet = l * w * d;
    }

    const cubicYards = cubicFeet / 27;
    const cubicMeters = cubicFeet * 0.0283168;

    // Bag calculations (concrete density ~150 lbs/cubic foot)
    const totalPounds = cubicFeet * 150;
    const bags40lb = Math.ceil(totalPounds / 40 * 1.1); // 10% extra for waste
    const bags60lb = Math.ceil(totalPounds / 60 * 1.1);
    const bags80lb = Math.ceil(totalPounds / 80 * 1.1);

    setResults({ cubicFeet, cubicYards, cubicMeters, bags40lb, bags60lb, bags80lb });
  };

  return (
    <CalculatorLayout
      title="Concrete Calculator"
      description="Calculate concrete volume for your construction project"
      backLink="/tools"
      backLabel="Utility Tools"
      icon={<Box className="h-8 w-8 text-primary-foreground" />}
      category="Tools"
      canonicalPath="/tools/concrete"
      keywords={["concrete volume calculator", "cubic yards calculator", "cement calculator"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Project Dimensions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Shape Type</Label>
              <Select value={shapeType} onValueChange={setShapeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slab">Slab / Square</SelectItem>
                  <SelectItem value="footing">Footing / Footer</SelectItem>
                  <SelectItem value="wall">Wall</SelectItem>
                  <SelectItem value="column">Column / Cylinder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {shapeType === "column" ? (
              <>
                <InputGroup
                  label="Diameter"
                  value={diameter}
                  onChange={setDiameter}
                  placeholder="2"
                  suffix="feet"
                  type="number"
                />
                <InputGroup
                  label="Height"
                  value={length}
                  onChange={setLength}
                  placeholder="3"
                  suffix="feet"
                  type="number"
                />
              </>
            ) : (
              <>
                <InputGroup
                  label="Length"
                  value={length}
                  onChange={setLength}
                  placeholder="10"
                  suffix="feet"
                  type="number"
                />
                <InputGroup
                  label="Width"
                  value={width}
                  onChange={setWidth}
                  placeholder="10"
                  suffix="feet"
                  type="number"
                />
                <InputGroup
                  label="Depth / Thickness"
                  value={depth}
                  onChange={setDepth}
                  placeholder="4"
                  suffix="inches"
                  type="number"
                />
              </>
            )}
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Cubic Yards Needed"
            value={results ? results.cubicYards.toFixed(2) : "--"}
            highlight
          />
          <ResultCard
            label="Cubic Feet"
            value={results ? results.cubicFeet.toFixed(2) : "--"}
          />
          <ResultCard
            label="Cubic Meters"
            value={results ? results.cubicMeters.toFixed(2) : "--"}
          />
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-base">Pre-Mixed Bags Needed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">40 lb bags:</span>
                <span className="font-medium">{results ? results.bags40lb : "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">60 lb bags:</span>
                <span className="font-medium">{results ? results.bags60lb : "--"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">80 lb bags:</span>
                <span className="font-medium">{results ? results.bags80lb : "--"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default ConcreteCalculator;
