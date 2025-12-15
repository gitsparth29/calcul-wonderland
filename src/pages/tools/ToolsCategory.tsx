import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/home/CalculatorCard";
import { 
  Calendar,
  CalendarDays,
  Clock,
  Timer,
  GraduationCap,
  Award,
  Box,
  Network,
  Key,
  ArrowLeftRight,
  Wrench
} from "lucide-react";

const calculators = [
  {
    title: "Age Calculator",
    description: "Calculate exact age from birthdate",
    icon: <Calendar className="h-5 w-5" />,
    path: "/tools/age",
  },
  {
    title: "Date Calculator",
    description: "Add or subtract days from dates",
    icon: <CalendarDays className="h-5 w-5" />,
    path: "/tools/date",
  },
  {
    title: "Time Calculator",
    description: "Add and subtract time durations",
    icon: <Clock className="h-5 w-5" />,
    path: "/tools/time",
  },
  {
    title: "Hours Calculator",
    description: "Calculate hours between times",
    icon: <Timer className="h-5 w-5" />,
    path: "/tools/hours",
  },
  {
    title: "GPA Calculator",
    description: "Calculate your Grade Point Average",
    icon: <GraduationCap className="h-5 w-5" />,
    path: "/tools/gpa",
  },
  {
    title: "Grade Calculator",
    description: "Calculate grades and weighted averages",
    icon: <Award className="h-5 w-5" />,
    path: "/tools/grade",
  },
  {
    title: "Concrete Calculator",
    description: "Calculate concrete volume for projects",
    icon: <Box className="h-5 w-5" />,
    path: "/tools/concrete",
  },
  {
    title: "Subnet Calculator",
    description: "Calculate IP subnets and CIDR",
    icon: <Network className="h-5 w-5" />,
    path: "/tools/subnet",
  },
  {
    title: "Password Generator",
    description: "Generate secure random passwords",
    icon: <Key className="h-5 w-5" />,
    path: "/tools/password",
  },
  {
    title: "Unit Converter",
    description: "Convert between various units",
    icon: <ArrowLeftRight className="h-5 w-5" />,
    path: "/tools/conversion",
  },
];

const ToolsCategory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero">
        <div className="container py-12">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-medium">
              <Wrench className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Utility Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Age, date, time, and everyday utility calculators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {calculators.map((calc, index) => (
              <div
                key={calc.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CalculatorCard {...calc} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolsCategory;
