import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorCard } from "@/components/home/CalculatorCard";
import { SEOHead } from "@/components/seo/SEOHead";
import { 
  Scale, 
  Flame, 
  Activity, 
  Heart, 
  Target,
  Timer,
  Baby,
  Calendar,
  Droplets,
  Drumstick
} from "lucide-react";

const calculators = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: <Scale className="h-5 w-5" />,
    path: "/health/bmi",
  },
  {
    title: "Calorie Calculator",
    description: "Determine your daily calorie needs",
    icon: <Flame className="h-5 w-5" />,
    path: "/health/calorie",
  },
  {
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage",
    icon: <Activity className="h-5 w-5" />,
    path: "/health/body-fat",
  },
  {
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate",
    icon: <Heart className="h-5 w-5" />,
    path: "/health/bmr",
  },
  {
    title: "Ideal Weight Calculator",
    description: "Find your ideal weight range",
    icon: <Target className="h-5 w-5" />,
    path: "/health/ideal-weight",
  },
  {
    title: "Pace Calculator",
    description: "Calculate running or walking pace",
    icon: <Timer className="h-5 w-5" />,
    path: "/health/pace",
  },
  {
    title: "Pregnancy Calculator",
    description: "Track pregnancy milestones",
    icon: <Baby className="h-5 w-5" />,
    path: "/health/pregnancy",
  },
  {
    title: "Due Date Calculator",
    description: "Calculate your baby's due date",
    icon: <Calendar className="h-5 w-5" />,
    path: "/health/due-date",
  },
  {
    title: "Water Intake Calculator",
    description: "Calculate daily water needs",
    icon: <Droplets className="h-5 w-5" />,
    path: "/health/water-intake",
  },
  {
    title: "Protein Intake Calculator",
    description: "Determine optimal protein intake",
    icon: <Drumstick className="h-5 w-5" />,
    path: "/health/protein-intake",
  },
];

const HealthCategory = () => {
  return (
    <>
      <SEOHead
        title="Health Calculators - BMI, Calorie & Fitness Tools"
        description="Free health calculators for BMI, calories, body fat percentage, BMR, and more. Track your fitness goals and improve your health with accurate tools."
        canonicalPath="/health"
        keywords={[
          "health calculator",
          "bmi calculator",
          "calorie calculator",
          "body fat calculator",
          "fitness calculator"
        ]}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gradient-hero">
          <div className="container py-12">
            <header className="text-center mb-12 animate-fade-in">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 mb-4 shadow-medium" aria-hidden="true">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                Health Calculators
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Calculate BMI, calories, body fat, and track your fitness goals
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto" aria-label="Health calculators list">
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

export default HealthCategory;
