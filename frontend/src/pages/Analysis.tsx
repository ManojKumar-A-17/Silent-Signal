import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Brain, Check, AlertCircle, ArrowRight, X, Shield, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [consent, setConsent] = useState({
    anonymous: false,
    aggregate: false,
    understand: false,
  });

  const { signal, analysis } = location.state || {};

  useEffect(() => {
    if (!signal || !analysis) {
      navigate("/drop-signal");
    }
  }, [signal, analysis, navigate]);

  if (!signal || !analysis) return null;

  const allConsentsGiven = consent.anonymous && consent.aggregate && consent.understand;

  const getIntensityColor = (intensity: number) => {
    if (intensity < 33) return "from-accent to-accent/50";
    if (intensity < 66) return "from-secondary to-secondary/50";
    return "from-destructive to-destructive/50";
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 33) return "Low";
    if (intensity < 66) return "Moderate";
    return "High";
  };

  const handlePublish = () => {
    toast.success("Your signal has been published anonymously!");
    navigate("/feed");
  };

  const handleDiscard = () => {
    toast.info("Signal discarded. You can always come back.");
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
            <Brain className="w-8 h-8 text-primary animate-pulse-soft" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Signal Analysis
          </h1>
          <p className="text-muted-foreground">
            Here's what our AI understood from your signal
          </p>
        </div>

        {/* Analysis Results */}
        <Card variant="elevated" className="mb-6 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Check className="w-5 h-5 text-accent" />
              AI Reflection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Original Signal Preview */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Your signal:</p>
              <p className="text-foreground/90 italic">"{signal.slice(0, 150)}{signal.length > 150 ? '...' : ''}"</p>
            </div>

            {/* Stress Type */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Stress Category</p>
                <p className="font-medium text-lg">{analysis.stressType}</p>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/20 text-primary font-medium">
                {analysis.stressType}
              </div>
            </div>

            {/* Stress Intensity */}
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">Stress Intensity</p>
                <p className="font-medium">{getIntensityLabel(analysis.stressIntensity)}</p>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
                    getIntensityColor(analysis.stressIntensity)
                  )}
                  style={{ width: `${analysis.stressIntensity}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                AI Confidence: {analysis.confidence}%
              </p>
            </div>

            {/* Reflection */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground/90 leading-relaxed italic">
                  "{analysis.reflection}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent Section */}
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '150ms' }}>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              Consent & Acknowledgement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id="anonymous"
                  checked={consent.anonymous}
                  onCheckedChange={(checked) =>
                    setConsent((prev) => ({ ...prev, anonymous: checked as boolean }))
                  }
                />
                <Label htmlFor="anonymous" className="text-sm leading-relaxed cursor-pointer">
                  I understand my signal will be published <strong>completely anonymously</strong>. 
                  My identity will never be revealed to other users.
                </Label>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id="aggregate"
                  checked={consent.aggregate}
                  onCheckedChange={(checked) =>
                    setConsent((prev) => ({ ...prev, aggregate: checked as boolean }))
                  }
                />
                <Label htmlFor="aggregate" className="text-sm leading-relaxed cursor-pointer">
                  I consent to my signal being used in <strong>aggregate analytics</strong> to 
                  understand stress patterns. No individual signals are ever shown in reports.
                </Label>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id="understand"
                  checked={consent.understand}
                  onCheckedChange={(checked) =>
                    setConsent((prev) => ({ ...prev, understand: checked as boolean }))
                  }
                />
                <Label htmlFor="understand" className="text-sm leading-relaxed cursor-pointer">
                  I understand this is a <strong>reflection tool, not professional help</strong>. 
                  If I'm in crisis, I will seek appropriate support.
                </Label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                disabled={!allConsentsGiven}
                onClick={handlePublish}
              >
                <Lock className="w-4 h-4" />
                Publish Anonymously
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={handleDiscard}
              >
                <X className="w-4 h-4" />
                Discard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analysis;
