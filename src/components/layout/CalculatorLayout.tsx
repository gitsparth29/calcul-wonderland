import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  backLink: string;
  backLabel: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const CalculatorLayout = ({
  title,
  description,
  backLink,
  backLabel,
  children,
  icon,
}: CalculatorLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container py-8">
        <Link to={backLink}>
          <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {backLabel}
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            {icon && (
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-4 shadow-medium">
                {icon}
              </div>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
