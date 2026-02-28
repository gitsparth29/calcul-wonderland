import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/calculator/PrintButton";
import { CalculatorSEO } from "@/components/seo/CalculatorSEO";
import { CurrencySelector } from "@/components/calculator/CurrencySelector";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  backLink: string;
  backLabel: string;
  children: ReactNode;
  icon?: ReactNode;
  category?: "Finance" | "Health" | "Math" | "Tools";
  canonicalPath?: string;
  keywords?: string[];
}

export const CalculatorLayout = ({
  title,
  description,
  backLink,
  backLabel,
  children,
  icon,
  category = "Tools",
  canonicalPath,
  keywords = [],
}: CalculatorLayoutProps) => {
  return (
    <>
      {canonicalPath && (
        <CalculatorSEO
          name={title}
          description={description}
          path={canonicalPath}
          category={category}
          keywords={keywords}
        />
      )}
      <article className="min-h-screen bg-gradient-hero">
        <div className="container py-8">
          <nav className="flex items-center justify-between mb-6" aria-label="Breadcrumb">
            <Link to={backLink}>
              <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground print:hidden">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {backLabel}
              </Button>
            </Link>
            <PrintButton title={title} />
          </nav>

          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8 animate-fade-in" data-print-section>
              {icon && (
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-4 shadow-medium print:hidden" aria-hidden="true">
                  {icon}
                </div>
              )}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto print:text-sm">
                {description}
              </p>
              <p className="hidden print:block text-sm text-muted-foreground mt-2">
                Calculated on {new Date().toLocaleDateString()}
              </p>
              {category === "Finance" && (
                <div className="mt-4 flex justify-center print:hidden">
                  <CurrencySelector />
                </div>
              )}
            </header>

            <section className="animate-slide-up" style={{ animationDelay: "0.1s" }} data-results aria-label="Calculator inputs and results">
              {children}
            </section>
          </div>
        </div>
      </article>
    </>
  );
};
