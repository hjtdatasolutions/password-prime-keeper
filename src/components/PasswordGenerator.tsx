import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw, Shield, Check } from "lucide-react";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (options.includeLowercase) charset += lowercase;
    if (options.includeUppercase) charset += uppercase;
    if (options.includeNumbers) charset += numbers;
    if (options.includeSymbols) charset += symbols;

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < options.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
    setCopied(false);
  }, [options, toast]);

  const calculateStrength = (password: string): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: "No password", color: "text-muted-foreground" };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score: score * 16.67, label: "Weak", color: "text-destructive" };
    if (score <= 4) return { score: score * 16.67, label: "Medium", color: "text-yellow-500" };
    return { score: score * 16.67, label: "Strong", color: "text-accent" };
  };

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Password copied!",
        description: "Password has been copied to your clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy password to clipboard",
        variant: "destructive",
      });
    }
  };

  const strength = calculateStrength(password);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="shadow-card bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
              Password Generator
            </CardTitle>
          </div>
          <CardDescription>
            Generate secure, customizable passwords for all your accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Generated Password Display */}
          <div className="space-y-3">
            <Label htmlFor="password-output" className="text-sm font-medium">
              Generated Password
            </Label>
            <div className="relative">
              <Input
                id="password-output"
                value={password}
                readOnly
                placeholder="Click generate to create a password"
                className="pr-20 font-mono text-sm bg-muted/50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!password}
                  className="h-8 w-8 p-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generatePassword}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Password Strength</span>
                  <span className={strength.color}>{strength.label}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Password Length */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="length-slider" className="text-sm font-medium">
                Password Length
              </Label>
              <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                {options.length}
              </span>
            </div>
            <Slider
              id="length-slider"
              min={4}
              max={50}
              step={1}
              value={[options.length]}
              onValueChange={(value) => setOptions({ ...options, length: value[0] })}
              className="w-full"
            />
          </div>

          {/* Character Type Options */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Character Types</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={options.includeUppercase}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeUppercase: checked as boolean })
                  }
                />
                <Label htmlFor="uppercase" className="text-sm cursor-pointer">
                  Uppercase (A-Z)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={options.includeLowercase}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeLowercase: checked as boolean })
                  }
                />
                <Label htmlFor="lowercase" className="text-sm cursor-pointer">
                  Lowercase (a-z)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeNumbers: checked as boolean })
                  }
                />
                <Label htmlFor="numbers" className="text-sm cursor-pointer">
                  Numbers (0-9)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={options.includeSymbols}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeSymbols: checked as boolean })
                  }
                />
                <Label htmlFor="symbols" className="text-sm cursor-pointer">
                  Symbols (!@#$...)
                </Label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generatePassword}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Secure Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;