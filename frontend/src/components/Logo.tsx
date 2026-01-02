import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ className, size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon - Abstract signal/wave form */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer ring */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
            className="opacity-60"
          />
          {/* Inner pulse waves */}
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke="url(#gradient2)"
            strokeWidth="2.5"
            className="opacity-80"
          />
          <circle
            cx="24"
            cy="24"
            r="8"
            fill="url(#gradient2)"
            className="opacity-90"
          />
          {/* Center dot */}
          <circle cx="24" cy="24" r="3" fill="hsl(var(--foreground))" />
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
              <stop offset="100%" stopColor="hsl(173, 58%, 39%)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
              <stop offset="100%" stopColor="hsl(173, 58%, 39%)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Animated pulse effect */}
        <div className="absolute inset-0 animate-pulse-soft">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              className="opacity-20"
            />
          </svg>
        </div>
      </div>

      {showText && (
        <span
          className={cn(
            "font-display font-semibold tracking-tight gradient-text",
            textSizeClasses[size]
          )}
        >
          SilentSignal
        </span>
      )}
    </div>
  );
};

export default Logo;
