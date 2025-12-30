import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/home/CalculatorCard";
import { SEOHead } from "@/components/seo/SEOHead";
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
    <>
      <SEOHead
        title="Utility Tools - Age, Date, Time & Conversion Calculators"
        description="Free utility calculators for age, dates, time, GPA, grades, and unit conversions. Essential everyday tools for students, professionals, and everyone."
        canonicalPath="/tools"
        keywords={[
          "age calculator",
          "date calculator",
          "time calculator",
          "gpa calculator",
          "unit converter",
          "password generator"
        ]}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gradient-hero">
          <div className="container py-12">
            <header className="text-center mb-12 animate-fade-in">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-medium" aria-hidden="true">
                <Wrench className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Utility Tools
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Age, date, time, and everyday utility calculators
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto" aria-label="Utility tools list">
              {calculators.map((calc, index) => (
                <article
                  key={calc.title}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CalculatorCard {...calc} />
                </article>
              ))}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ToolsCategory;
