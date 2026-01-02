import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Brain, Eye, Trash2, Heart } from "lucide-react";

const About = () => {
  const principles = [
    {
      icon: Shield,
      title: "Privacy by Design",
      description:
        "Every feature is built with privacy as the foundation. We don't collect personal data beyond what's essential for the system to function. Your identity is never linked to your signals.",
    },
    {
      icon: Lock,
      title: "Complete Anonymity",
      description:
        "When you post a signal, no one — not even administrators — can trace it back to you. Your authentication is used solely for system integrity and preventing abuse, never for identification.",
    },
    {
      icon: Brain,
      title: "Ethical AI Use",
      description:
        "Our AI categorizes and reflects, but never diagnoses or advises. It's designed to help you understand your stress patterns, not to replace professional support. We maintain clear boundaries.",
    },
    {
      icon: Eye,
      title: "Transparent Data Lifecycle",
      description:
        "We're clear about what happens to your data. Signals are stored securely, used only in aggregate analytics, and can be removed from public view at any time through moderation.",
    },
    {
      icon: Trash2,
      title: "Minimal Data Retention",
      description:
        "We retain only what's necessary. Analytics are computed from aggregate patterns, not stored individual signals. Your thoughts don't become permanent records.",
    },
    {
      icon: Heart,
      title: "Empathy Over Engagement",
      description:
        "Unlike social platforms optimized for engagement, SilentSignal prioritizes emotional well-being. Features are designed to support, not to create addiction or social pressure.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">SilentSignal</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A privacy-first platform for anonymous stress expression, built on ethical 
            principles and designed to foster understanding without exploitation.
          </p>
        </div>

        {/* Mission Statement */}
        <Card variant="elevated" className="max-w-3xl mx-auto mb-12 animate-slide-up">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-center">
              Our <span className="gradient-text-warm">Mission</span>
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Student stress is often invisible. The pressure to appear successful, 
                the fear of judgment, and the stigma around mental health create a culture 
                where struggles are hidden. This accumulated, unexpressed stress affects 
                academic performance, relationships, and overall well-being.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SilentSignal exists to break this silence. We provide a safe, anonymous 
                space where students can express what they're truly feeling without fear. 
                Through collective anonymous expression, we build a picture of what students 
                actually go through — enabling institutions, support systems, and peers to 
                understand and respond more effectively.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is not a replacement for professional help. It's a first step — an 
                acknowledgment that the struggle is real, and that you're not alone.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ethical Principles */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8 text-center">
            Ethical <span className="gradient-text">Principles</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <Card
                key={principle.title}
                variant="elevated"
                className="animate-slide-up hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <principle.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Not Social Media */}
        <Card variant="glass" className="max-w-3xl mx-auto mb-12">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-center">
              What SilentSignal is <span className="text-destructive">NOT</span>
            </h2>
            <div className="space-y-4">
              {[
                "Not a social network — there are no followers, profiles, or social hierarchies",
                "Not a competition — likes represent support, not popularity",
                "Not a diagnostic tool — our AI reflects, it doesn't diagnose or prescribe",
                "Not a replacement for professional help — if you're in crisis, please seek appropriate support",
                "Not permanent — your signals can be moderated and analytics are aggregate-only",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive font-bold text-sm">×</span>
                  </div>
                  <p className="text-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crisis Resources */}
        <Card variant="elevated" className="max-w-3xl mx-auto border-secondary/50">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-3">
              If You're in Crisis
            </h3>
            <p className="text-muted-foreground mb-4">
              SilentSignal is a reflection tool, not emergency support. If you're experiencing 
              a mental health crisis, please reach out to professional resources.
            </p>
            <p className="text-sm text-muted-foreground">
              Contact your institution's counseling services, a trusted adult, or a crisis hotline 
              in your region.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
