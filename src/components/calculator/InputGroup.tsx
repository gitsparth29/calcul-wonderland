import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputGroupProps {
  label: string;
  id?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
}

export const InputGroup = ({
  label,
  id,
  value,
  onChange,
  type = "number",
  placeholder,
  prefix,
  suffix,
  min,
  max,
  step,
}: InputGroupProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
            {prefix}
          </div>
        )}
        <Input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`${prefix ? "pl-8" : ""} ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};
