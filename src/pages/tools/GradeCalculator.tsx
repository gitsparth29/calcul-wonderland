import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Assignment {
  id: number;
  name: string;
  score: string;
  maxScore: string;
  weight: string;
}

const GradeCalculator = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: "Assignment 1", score: "85", maxScore: "100", weight: "20" },
    { id: 2, name: "Assignment 2", score: "92", maxScore: "100", weight: "30" },
    { id: 3, name: "Final Exam", score: "78", maxScore: "100", weight: "50" },
  ]);
  const [results, setResults] = useState<{
    weightedGrade: number;
    letterGrade: string;
    totalWeight: number;
  } | null>(null);

  const addAssignment = () => {
    const newId = Math.max(...assignments.map((a) => a.id), 0) + 1;
    setAssignments([
      ...assignments,
      { id: newId, name: `Assignment ${newId}`, score: "", maxScore: "100", weight: "10" },
    ]);
  };

  const removeAssignment = (id: number) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
    setAssignments(
      assignments.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const calculate = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    assignments.forEach((a) => {
      const score = parseFloat(a.score);
      const maxScore = parseFloat(a.maxScore);
      const weight = parseFloat(a.weight);

      if (!isNaN(score) && !isNaN(maxScore) && !isNaN(weight) && maxScore > 0) {
        const percentage = (score / maxScore) * 100;
        totalWeightedScore += percentage * weight;
        totalWeight += weight;
      }
    });

    const weightedGrade = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

    let letterGrade: string;
    if (weightedGrade >= 93) letterGrade = "A";
    else if (weightedGrade >= 90) letterGrade = "A-";
    else if (weightedGrade >= 87) letterGrade = "B+";
    else if (weightedGrade >= 83) letterGrade = "B";
    else if (weightedGrade >= 80) letterGrade = "B-";
    else if (weightedGrade >= 77) letterGrade = "C+";
    else if (weightedGrade >= 73) letterGrade = "C";
    else if (weightedGrade >= 70) letterGrade = "C-";
    else if (weightedGrade >= 67) letterGrade = "D+";
    else if (weightedGrade >= 63) letterGrade = "D";
    else if (weightedGrade >= 60) letterGrade = "D-";
    else letterGrade = "F";

    setResults({ weightedGrade, letterGrade, totalWeight });
  };

  return (
    <CalculatorLayout
      title="Grade Calculator"
      description="Calculate your weighted grade average"
      backLink="/tools"
      backLabel="Utility Tools"
      icon={<Award className="h-8 w-8 text-primary-foreground" />}
      category="Tools"
      canonicalPath="/tools/grade"
      keywords={["weighted grade calculator", "final grade calculator", "class grade"]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Assignments
              <Button onClick={addAssignment} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((a) => (
              <div key={a.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={a.name}
                    onChange={(e) => updateAssignment(a.id, "name", e.target.value)}
                    className="font-medium bg-transparent border-b border-transparent hover:border-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <Button
                    onClick={() => removeAssignment(a.id)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">Score</Label>
                    <input
                      type="number"
                      value={a.score}
                      onChange={(e) => updateAssignment(a.id, "score", e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="85"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Max</Label>
                    <input
                      type="number"
                      value={a.maxScore}
                      onChange={(e) => updateAssignment(a.id, "maxScore", e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Weight %</Label>
                    <input
                      type="number"
                      value={a.weight}
                      onChange={(e) => updateAssignment(a.id, "weight", e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded"
                      placeholder="20"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={calculate} className="w-full" size="lg">
              Calculate Grade
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <ResultCard
            label="Weighted Grade"
            value={results ? `${results.weightedGrade.toFixed(2)}%` : "--"}
            highlight
          />
          <ResultCard
            label="Letter Grade"
            value={results ? results.letterGrade : "--"}
          />
          <ResultCard
            label="Total Weight"
            value={results ? `${results.totalWeight}%` : "--"}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default GradeCalculator;
