import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryCard } from "@/components/home/CategoryCard";
import { CalculatorCard } from "@/components/home/CalculatorCard";
import { SearchBar } from "@/components/home/SearchBar";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { 
  DollarSign, 
  Heart, 
  Calculator, 
  Wrench,
  Home,
  Scale,
  Percent,
  Calendar,
  ArrowRight,
  PiggyBank,
  Activity,
  Divide,
  Clock
} from "lucide-react";

const categories = [
  {
    title: "Finance",
    description: "Calculate mortgages, loans, investments, and more",
    icon: <DollarSign className="h-7 w-7 text-primary-foreground" />,
    path: "/finance",
    calculators: ["Mortgage", "Loan", "Investment", "Compound Interest", "Retirement"],
    gradient: "bg-gradient-primary",
  },
  {
    title: "Health",
    description: "BMI, calories, body fat, and fitness calculators",
    icon: <Heart className="h-7 w-7 text-primary-foreground" />,
    path: "/health",
    calculators: ["BMI", "Calorie", "Body Fat", "BMR", "Ideal Weight"],
    gradient: "bg-gradient-to-br from-rose-500 to-pink-600",
  },
  {
    title: "Math",
    description: "Scientific, fraction, and percentage calculators",
    icon: <Calculator className="h-7 w-7 text-primary-foreground" />,
    path: "/math",
    calculators: ["Scientific", "Fraction", "Percentage", "Random Number"],
    gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    title: "Tools",
    description: "Age, date, time, and everyday utility calculators",
    icon: <Wrench className="h-7 w-7 text-primary-foreground" />,
    path: "/tools",
    calculators: ["Age", "Date", "Time", "GPA", "Password Generator"],
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
];

const popularCalculators = [
  {
    title: "Mortgage Calculator",
    description: "Calculate monthly payments and total interest",
    icon: <Home className="h-5 w-5" />,
    path: "/finance/mortgage",
  },
  {
    title: "BMI Calculator",
    description: "Find your Body Mass Index instantly",
    icon: <Scale className="h-5 w-5" />,
    path: "/health/bmi",
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages quickly and easily",
    icon: <Percent className="h-5 w-5" />,
    path: "/math/percentage",
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age from birthdate",
    icon: <Calendar className="h-5 w-5" />,
    path: "/tools/age",
  },
  {
    title: "Compound Interest",
    description: "See how your money grows over time",
    icon: <PiggyBank className="h-5 w-5" />,
    path: "/finance/compound-interest",
  },
  {
    title: "Calorie Calculator",
    description: "Determine your daily calorie needs",
    icon: <Activity className="h-5 w-5" />,
    path: "/health/calorie",
  },
  {
    title: "Fraction Calculator",
    description: "Add, subtract, multiply, divide fractions",
    icon: <Divide className="h-5 w-5" />,
    path: "/math/fraction",
  },
  {
    title: "Time Calculator",
    description: "Add and subtract time durations",
    icon: <Clock className="h-5 w-5" />,
    path: "/tools/time",
  },
];

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CalcHub",
  "url": "https://calchub.com",
  "description": "Free online calculators for mortgages, BMI, percentages, age, and more. Quick, accurate, and easy-to-use tools for finance, health, math, and everyday tasks.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://calchub.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CalcHub",
  "url": "https://calchub.com",
  "logo": "https://calchub.com/logo.png",
  "sameAs": []
};

const Index = () => {
  return (
    <>
      <SEOHead
        title="CalcHub - Free Online Calculators for Finance, Health & Math"
        description="Free online calculators for mortgages, BMI, percentages, age, and more. Quick, accurate, and easy-to-use tools for finance, health, math, and everyday tasks. No signup required."
        canonicalPath=""
        keywords={[
          "online calculator",
          "free calculator",
          "mortgage calculator",
          "bmi calculator",
          "percentage calculator",
          "finance calculator",
          "health calculator",
          "math calculator"
        ]}
        structuredData={[homeStructuredData, organizationData]}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-hero py-16 md:py-24" aria-labelledby="hero-heading">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center animate-fade-in">
                <h1 id="hero-heading" className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Free Online{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Calculators
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Quick, accurate, and easy-to-use calculators for finance, health, math, and everyday tasks. No signup required.
                </p>
                
                <div className="mb-8">
                  <SearchBar />
                </div>
                
                <nav className="flex flex-wrap justify-center gap-4" aria-label="Quick navigation">
                  <Button variant="hero" size="lg" asChild>
                    <a href="#categories">
                      Explore Calculators
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#popular">Popular Tools</a>
                  </Button>
                </nav>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section id="categories" className="py-16 md:py-20" aria-labelledby="categories-heading">
            <div className="container">
              <header className="text-center mb-12 animate-fade-in">
                <h2 id="categories-heading" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Calculator Categories
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Choose a category to find the perfect calculator for your needs
                </p>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
                {categories.map((category, index) => (
                  <article
                    key={category.title}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    role="listitem"
                  >
                    <CategoryCard {...category} />
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Calculators Section */}
          <section id="popular" className="py-16 md:py-20 bg-muted/30" aria-labelledby="popular-heading">
            <div className="container">
              <header className="text-center mb-12">
                <h2 id="popular-heading" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Popular Calculators
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Our most-used tools to help you calculate quickly
                </p>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
                {popularCalculators.map((calc, index) => (
                  <article
                    key={calc.title}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    role="listitem"
                  >
                    <CalculatorCard {...calc} />
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-20" aria-labelledby="cta-heading">
            <div className="container">
              <aside className="max-w-3xl mx-auto text-center bg-gradient-primary rounded-3xl p-8 md:p-12 shadow-large">
                <h2 id="cta-heading" className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                  Can't find what you're looking for?
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  We're constantly adding new calculators. Browse all our categories to find more tools.
                </p>
                <Button variant="secondary" size="lg" asChild>
                  <a href="#categories">
                    View All Categories
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </aside>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
