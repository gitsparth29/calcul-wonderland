import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  calculators: string[];
  gradient: string;
}

export const CategoryCard = ({
  title,
  description,
  icon,
  path,
  calculators,
  gradient,
}: CategoryCardProps) => {
  return (
    <Link
      to={path}
      className="group block bg-card rounded-2xl border border-border p-6 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1"
    >
      <div
        className={`inline-flex h-14 w-14 items-center justify-center rounded-xl mb-4 ${gradient} shadow-medium transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
      
      <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {calculators.slice(0, 3).map((calc) => (
          <span
            key={calc}
            className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground"
          >
            {calc}
          </span>
        ))}
        {calculators.length > 3 && (
          <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">
            +{calculators.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
        Explore calculators
        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};
