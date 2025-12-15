import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/home/CalculatorCard";
import { 
  Calculator, 
  Percent, 
  Divide, 
  Shuffle,
  Triangle,
  BarChart3
} from "lucide-react";

const calculators = [
  {
    title: "Scientific Calculator",
    description: "Advanced mathematical calculations",
    icon: <Calculator className="h-5 w-5" />,
    path: "/math/scientific",
  },
  {
    title: "Fraction Calculator",
    description: "Add, subtract, multiply, divide fractions",
    icon: <Divide className="h-5 w-5" />,
    path: "/math/fraction",
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages quickly",
    icon: <Percent className="h-5 w-5" />,
    path: "/math/percentage",
  },
  {
    title: "Random Number Generator",
    description: "Generate random numbers in any range",
    icon: <Shuffle className="h-5 w-5" />,
    path: "/math/random",
  },
  {
    title: "Triangle Calculator",
    description: "Calculate triangle sides and angles",
    icon: <Triangle className="h-5 w-5" />,
    path: "/math/triangle",
  },
  {
    title: "Standard Deviation",
    description: "Calculate standard deviation of data sets",
    icon: <BarChart3 className="h-5 w-5" />,
    path: "/math/standard-deviation",
  },
];

const MathCategory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero">
        <div className="container py-12">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4 shadow-medium">
              <Calculator className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Math Calculators
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Scientific, fraction, percentage, and other mathematical calculators
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

export default MathCategory;
