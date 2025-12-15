import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  icon?: ReactNode;
  subtext?: string;
}

export const ResultCard = ({ label, value, highlight, icon, subtext }: ResultCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-5 transition-all duration-300",
        highlight
          ? "bg-gradient-primary text-primary-foreground shadow-medium"
          : "bg-card border border-border shadow-soft"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-sm font-medium mb-1", highlight ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {label}
          </p>
          <p className={cn("font-heading text-2xl md:text-3xl font-bold", highlight ? "text-primary-foreground" : "text-foreground")}>
            {value}
          </p>
          {subtext && (
            <p className={cn("text-xs mt-1", highlight ? "text-primary-foreground/70" : "text-muted-foreground")}>
              {subtext}
            </p>
          )}
        </div>
        {icon && (
          <div className={cn("p-2 rounded-lg", highlight ? "bg-primary-foreground/10" : "bg-muted")}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
