import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
}

export const CalculatorCard = ({ title, description, icon, path }: CalculatorCardProps) => {
  return (
    <Link
      to={path}
      className="group flex items-start gap-4 bg-card rounded-xl border border-border p-4 shadow-soft hover:shadow-medium transition-all duration-200 hover:border-primary/20"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
      
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};
