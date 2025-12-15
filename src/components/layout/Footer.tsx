import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Calculator className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">CalcHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online calculators for finance, health, math, and everyday tools.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Finance</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/finance/mortgage" className="text-muted-foreground hover:text-foreground transition-colors">Mortgage Calculator</Link></li>
              <li><Link to="/finance/loan" className="text-muted-foreground hover:text-foreground transition-colors">Loan Calculator</Link></li>
              <li><Link to="/finance/compound-interest" className="text-muted-foreground hover:text-foreground transition-colors">Compound Interest</Link></li>
              <li><Link to="/finance/retirement" className="text-muted-foreground hover:text-foreground transition-colors">Retirement Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Health</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/health/bmi" className="text-muted-foreground hover:text-foreground transition-colors">BMI Calculator</Link></li>
              <li><Link to="/health/calorie" className="text-muted-foreground hover:text-foreground transition-colors">Calorie Calculator</Link></li>
              <li><Link to="/health/body-fat" className="text-muted-foreground hover:text-foreground transition-colors">Body Fat Calculator</Link></li>
              <li><Link to="/health/bmr" className="text-muted-foreground hover:text-foreground transition-colors">BMR Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/age" className="text-muted-foreground hover:text-foreground transition-colors">Age Calculator</Link></li>
              <li><Link to="/math/percentage" className="text-muted-foreground hover:text-foreground transition-colors">Percentage Calculator</Link></li>
              <li><Link to="/tools/password" className="text-muted-foreground hover:text-foreground transition-colors">Password Generator</Link></li>
              <li><Link to="/tools/date" className="text-muted-foreground hover:text-foreground transition-colors">Date Calculator</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CalcHub. All calculators are free to use.</p>
        </div>
      </div>
    </footer>
  );
};
