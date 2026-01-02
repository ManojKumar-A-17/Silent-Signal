import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SignalCard from "@/components/SignalCard";
import { Plus, TrendingUp, Clock, Filter } from "lucide-react";

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState<"recent" | "trending">("recent");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const signals = [
    {
      id: "1",
      content: "The pressure of maintaining a perfect GPA while working part-time is overwhelming. Some days I feel like I'm drowning in assignments and responsibilities. Every morning is a battle between wanting to stay in bed and knowing I have deadlines to meet.",
      stressType: "Academic" as const,
      stressIntensity: 72,
      timestamp: "2 hours ago",
      likeCount: 24,
      commentCount: 5,
      reshareCount: 3,
    },
    {
      id: "2",
      content: "Graduation is approaching and I have no idea what I want to do with my life. Everyone seems to have it figured out except me. The constant questions from family about my plans just add to the anxiety.",
      stressType: "Career" as const,
      stressIntensity: 65,
      timestamp: "5 hours ago",
      likeCount: 45,
      commentCount: 12,
      reshareCount: 8,
    },
    {
      id: "3",
      content: "Lost my best friend over a misunderstanding. The silence is deafening and I don't know how to reach out anymore. We used to talk every day, now it's been weeks.",
      stressType: "Personal" as const,
      stressIntensity: 58,
      timestamp: "Yesterday",
      likeCount: 67,
      commentCount: 18,
      reshareCount: 5,
    },
    {
      id: "4",
      content: "Failed my first major exam in college. I studied for weeks but my mind just went blank when I saw the questions. Feeling like I don't belong here.",
      stressType: "Academic" as const,
      stressIntensity: 81,
      timestamp: "Yesterday",
      likeCount: 89,
      commentCount: 24,
      reshareCount: 11,
    },
    {
      id: "5",
      content: "Got rejected from my dream internship. I spent so much time on the application and really thought I had a chance. Starting to question if I'm good enough for this field.",
      stressType: "Career" as const,
      stressIntensity: 69,
      timestamp: "2 days ago",
      likeCount: 112,
      commentCount: 31,
      reshareCount: 15,
    },
    {
      id: "6",
      content: "My parents expect me to be perfect at everything. Good grades, sports, social life, part-time job. I'm exhausted trying to meet everyone's expectations while losing sight of my own.",
      stressType: "Personal" as const,
      stressIntensity: 74,
      timestamp: "2 days ago",
      likeCount: 156,
      commentCount: 42,
      reshareCount: 23,
    },
  ];

  const categories = ["all", "Academic", "Career", "Personal"];

  const filteredSignals = signals.filter(
    (signal) => activeCategory === "all" || signal.stressType === activeCategory
  );

  const sortedSignals = [...filteredSignals].sort((a, b) => {
    if (activeFilter === "trending") {
      return b.likeCount - a.likeCount;
    }
    return 0; // Keep original order for recent
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Signal <span className="gradient-text">Feed</span>
              </h1>
              <p className="text-muted-foreground">
                Anonymous expressions from the community
              </p>
            </div>
            <Link to="/drop-signal">
              <Button variant="hero" className="gap-2">
                <Plus className="w-4 h-4" />
                Drop Signal
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card variant="glass" className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-1">
                  <Button
                    variant={activeFilter === "recent" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("recent")}
                    className="gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Recent
                  </Button>
                  <Button
                    variant={activeFilter === "trending" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter("trending")}
                    className="gap-1.5"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Trending
                  </Button>
                </div>
              </div>

              <div className="h-6 w-px bg-border hidden sm:block" />

              {/* Categories */}
              <div className="flex flex-wrap gap-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Signal List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {sortedSignals.map((signal, index) => (
            <div
              key={signal.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SignalCard {...signal} />
            </div>
          ))}

          {sortedSignals.length === 0 && (
            <Card variant="glass" className="p-12 text-center">
              <p className="text-muted-foreground">
                No signals found in this category.
              </p>
            </Card>
          )}
        </div>

        {/* Load More */}
        <div className="max-w-3xl mx-auto mt-8 text-center">
          <Button variant="glass" size="lg">
            Load More Signals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
