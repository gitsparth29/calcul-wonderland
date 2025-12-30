import { useState } from "react";
import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Key, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PasswordGenerator = () => {
  const [length, setLength] = useState([16]);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast({ title: "Copied!", description: "Password copied to clipboard" });
  };

  return (
    <CalculatorLayout title="Password Generator" description="Generate secure random passwords" backLink="/tools" backLabel="Utility Tools" icon={<Key className="h-8 w-8 text-primary-foreground" />} category="Tools" canonicalPath="/tools/password" keywords={["random password generator", "secure password", "strong password"]}>
      <Card className="shadow-medium max-w-lg mx-auto">
        <CardHeader><CardTitle>Generate Password</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Length: {length[0]}</Label>
            <Slider value={length} onValueChange={setLength} min={4} max={64} step={1} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="upper" checked={uppercase} onCheckedChange={(c) => setUppercase(!!c)} />
              <Label htmlFor="upper">Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lower" checked={lowercase} onCheckedChange={(c) => setLowercase(!!c)} />
              <Label htmlFor="lower">Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nums" checked={numbers} onCheckedChange={(c) => setNumbers(!!c)} />
              <Label htmlFor="nums">Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="syms" checked={symbols} onCheckedChange={(c) => setSymbols(!!c)} />
              <Label htmlFor="syms">Symbols (!@#...)</Label>
            </div>
          </div>
          <Button onClick={generate} className="w-full" size="lg">Generate Password</Button>
          {password && (
            <div className="p-4 bg-muted rounded-lg flex items-center justify-between gap-4">
              <code className="font-mono text-sm break-all flex-1">{password}</code>
              <Button variant="outline" size="icon" onClick={copy}><Copy className="h-4 w-4" /></Button>
            </div>
          )}
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default PasswordGenerator;
