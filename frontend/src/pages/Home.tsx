import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SignalCard from "@/components/SignalCard";
import { ArrowRight, Shield, Brain, Lock, Users, ChevronDown } from "lucide-react";

const Home = () => {
  // Sample signals for demonstration
  const sampleSignals = [
    {
      id: "1",
      content: "The pressure of maintaining a perfect GPA while working part-time is overwhelming. Some days I feel like I'm drowning in assignments and responsibilities.",
      stressType: "Academic" as const,
      stressIntensity: 72,
      timestamp: "2 hours ago",
      likeCount: 24,
      commentCount: 5,
      reshareCount: 3,
    },
    {
      id: "2",
      content: "Graduation is approaching and I have no idea what I want to do with my life. Everyone seems to have it figured out except me.",
      stressType: "Career" as const,
      stressIntensity: 65,
      timestamp: "5 hours ago",
      likeCount: 45,
      commentCount: 12,
      reshareCount: 8,
    },
    {
      id: "3",
      content: "Lost my best friend over a misunderstanding. The silence is deafening and I don't know how to reach out anymore.",
      stressType: "Personal" as const,
      stressIntensity: 58,
      timestamp: "Yesterday",
      likeCount: 67,
      commentCount: 18,
      reshareCount: 5,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Complete Anonymity",
      description: "Your identity is never revealed. Express yourself freely without fear of judgment.",
    },
    {
      icon: Brain,
      title: "AI-Powered Reflection",
      description: "Our AI helps categorize and understand stress patterns without offering advice or diagnosis.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "No personal data is collected beyond what's necessary. Your thoughts remain yours.",
    },
    {
      icon: Users,
      title: "Silent Support",
      description: "Connect with others through empathy. Likes and comments create community without exposure.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your stress deserves to be{" "}
            <span className="gradient-text">heard</span>, not hidden
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            SilentSignal is a safe, anonymous space where you can express academic, 
            career, and personal stress without revealing your identity. No judgment, 
            no exposure — just understanding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/drop-signal">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Drop a Signal
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/feed">
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                Explore Signals
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 animate-float">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <Card variant="glass" className="max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8 text-center">
              Why <span className="gradient-text">SilentSignal</span>?
            </h2>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Academic and personal stress among students often goes unspoken. The pressure 
                to appear capable, the fear of being judged, and the stigma around mental health 
                create a culture of silence. This hidden stress can accumulate, affecting academic 
                performance, relationships, and overall well-being.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">SilentSignal is not a social media platform.</strong> We're 
                a stress signal and awareness system built around three core principles: anonymity, 
                reflection, and collective understanding. Here, you won't find followers, likes 
                as popularity metrics, or any form of social competition.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our AI doesn't give advice or diagnose. It simply helps categorize and reflect 
                your stress back to you in a way that promotes self-understanding. The analytics 
                we generate are aggregate patterns — never individual stories.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Every interaction here is designed to be empathetic, not performative. When you 
                like a post, you're sending a silent signal of support. When you comment, your 
                words reach someone without revealing who you are. This is a space where vulnerability 
                is protected, not exploited.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 text-center">
          Built on <span className="gradient-text-warm">Trust</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="elevated"
              className="group hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Signals Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Recent <span className="gradient-text">Signals</span>
            </h2>
            <Link to="/feed">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {sampleSignals.map((signal, index) => (
              <div
                key={signal.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <SignalCard {...signal} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-8">
        <Card variant="elevated" className="max-w-3xl mx-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <CardContent className="p-8 md:p-12 text-center relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Ready to share your signal?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Your words matter. Your experience matters. Share anonymously and 
              help build a picture of what students truly go through.
            </p>
            <Link to="/drop-signal">
              <Button variant="warm" size="xl">
                Drop Your Signal
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
