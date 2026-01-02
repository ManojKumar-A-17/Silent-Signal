import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const DropSignal = () => {
  const [signal, setSignal] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (signal.trim().length < 10) {
      toast.error("Please share a bit more about what you're feeling");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Navigate to analysis page with signal data
    navigate("/analysis", { 
      state: { 
        signal,
        analysis: {
          stressType: signal.toLowerCase().includes("exam") || signal.toLowerCase().includes("study") || signal.toLowerCase().includes("gpa") 
            ? "Academic" 
            : signal.toLowerCase().includes("job") || signal.toLowerCase().includes("career") || signal.toLowerCase().includes("work")
            ? "Career"
            : "Personal",
          stressIntensity: Math.floor(Math.random() * 40) + 40, // 40-80 range
          confidence: Math.floor(Math.random() * 20) + 75, // 75-95 range
          reflection: getReflection(signal),
        }
      } 
    });
  };

  const getReflection = (text: string) => {
    const reflections = [
      "It sounds like you're carrying a heavy weight right now. Acknowledging this is an important first step.",
      "Your feelings are valid. Many others share similar experiences, even if it doesn't always feel that way.",
      "This moment of expression shows courage. Whatever you're facing, you don't have to face it alone.",
      "The pressure you're describing is real and significant. Thank you for trusting this space with your thoughts.",
    ];
    return reflections[Math.floor(Math.random() * reflections.length)];
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Drop Your Signal
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            What's weighing on you right now? Share freely — your words remain completely anonymous.
          </p>
        </div>

        {/* Signal Input Card */}
        <Card variant="elevated" className="animate-slide-up">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              Express Yourself
            </CardTitle>
            <CardDescription>
              There's no character limit. Take your time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Textarea
                placeholder="What's weighing on you right now? Describe your thoughts, feelings, or situation..."
                value={signal}
                onChange={(e) => setSignal(e.target.value)}
                className="min-h-[200px] md:min-h-[280px] resize-none text-base leading-relaxed bg-input border-border focus:border-primary/50"
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {signal.length} characters
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAnalyze}
                disabled={isAnalyzing || signal.trim().length < 10}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Analyze My Signal
                  </>
                )}
              </Button>
            </div>

            {/* Helper Text */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Your signal will be analyzed by AI for stress patterns, then you'll have the option to share anonymously.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prompts */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
          {[
            "Struggling with deadlines",
            "Feeling isolated lately",
            "Uncertain about the future",
          ].map((prompt) => (
            <Button
              key={prompt}
              variant="glass"
              size="sm"
              className="text-xs"
              onClick={() => setSignal(prev => prev + (prev ? " " : "") + prompt + "...")}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropSignal;
