import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { InputGroup } from "@/components/calculator/InputGroup";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

const gradePoints: Record<string, number> = { "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0 };

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ grade: "A", credits: "3" }]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addCourse = () => setCourses([...courses, { grade: "A", credits: "3" }]);
  const removeCourse = (i: number) => setCourses(courses.filter((_, idx) => idx !== i));
  const updateCourse = (i: number, field: string, value: string) => {
    const updated = [...courses];
    updated[i] = { ...updated[i], [field]: value };
    setCourses(updated);
  };

  const calculate = () => {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach(c => {
      const credits = parseFloat(c.credits) || 0;
      totalPoints += gradePoints[c.grade] * credits;
      totalCredits += credits;
    });
    setGpa(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  return (
    <CalculatorLayout title="GPA Calculator" description="Calculate your Grade Point Average" backLink="/tools" backLabel="Utility Tools" icon={<GraduationCap className="h-8 w-8 text-primary-foreground" />}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader><CardTitle>Courses</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {courses.map((c, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Select value={c.grade} onValueChange={(v) => updateCourse(i, "grade", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-24">
                  <InputGroup label="" value={c.credits} onChange={(v) => updateCourse(i, "credits", v)} placeholder="3" suffix="cr" />
                </div>
                {courses.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeCourse(i)}><Trash2 className="h-4 w-4" /></Button>}
              </div>
            ))}
            <Button variant="outline" onClick={addCourse} className="w-full"><Plus className="h-4 w-4 mr-2" />Add Course</Button>
            <Button onClick={calculate} className="w-full" size="lg">Calculate GPA</Button>
          </CardContent>
        </Card>
        <ResultCard label="Your GPA" value={gpa !== null ? gpa.toFixed(2) : "--"} highlight />
      </div>
    </CalculatorLayout>
  );
};

export default GPACalculator;
