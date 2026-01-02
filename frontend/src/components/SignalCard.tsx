import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark, Flag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SignalCardProps {
  id: string;
  content: string;
  stressType?: "Academic" | "Career" | "Personal";
  stressIntensity?: number;
  timestamp: string;
  likeCount: number;
  commentCount: number;
  reshareCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onReshare?: () => void;
  onBookmark?: () => void;
  onFlag?: () => void;
}

const SignalCard = ({
  content,
  stressType,
  stressIntensity = 50,
  timestamp,
  likeCount,
  commentCount,
  reshareCount,
  isLiked = false,
  isBookmarked = false,
  onLike,
  onComment,
  onReshare,
  onBookmark,
  onFlag,
}: SignalCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    onLike?.();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.();
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity < 33) return "bg-accent";
    if (intensity < 66) return "bg-secondary";
    return "bg-destructive";
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 33) return "Low";
    if (intensity < 66) return "Moderate";
    return "High";
  };

  return (
    <Card variant="elevated" className="hover:shadow-lg transition-all duration-300 group">
      <CardContent className="pt-6">
        {/* Anonymous Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">Anonymous</p>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>

        {/* Content */}
        <p className="text-foreground/90 leading-relaxed mb-4">{content}</p>

        {/* Stress Indicators */}
        {stressType && (
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
              {stressType}
            </span>
            <div className="flex items-center gap-2 flex-1">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    getIntensityColor(stressIntensity)
                  )}
                  style={{ width: `${stressIntensity}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {getIntensityLabel(stressIntensity)}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t border-border/50 pt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            {/* Like */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-1.5 group/btn",
                liked && "text-destructive"
              )}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-all",
                  liked && "fill-destructive"
                )}
              />
              <span className="text-xs">{likes}</span>
            </Button>

            {/* Comment */}
            <Button variant="ghost" size="sm" onClick={onComment} className="gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{commentCount}</span>
            </Button>

            {/* Reshare */}
            <Button variant="ghost" size="sm" onClick={onReshare} className="gap-1.5">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">{reshareCount}</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            {/* Bookmark */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className={cn(bookmarked && "text-secondary")}
            >
              <Bookmark
                className={cn(
                  "w-4 h-4 transition-all",
                  bookmarked && "fill-secondary"
                )}
              />
            </Button>

            {/* Flag */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onFlag}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Flag className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignalCard;
