import { cn } from "@/lib/utils";

/**
 * A diya — the clay lamp. The flame flickers on a slow, irregular cycle so it
 * never reads as a loop.
 */
export function Diya({
  className,
  lit = true,
}: {
  className?: string;
  lit?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-auto", className)}
    >
      {/* glow */}
      {lit && (
        <>
          <circle
            cx="60"
            cy="34"
            r="30"
            fill="url(#diya-glow)"
            className="animate-diya-glow"
          />
          <circle
            cx="60"
            cy="34"
            r="18"
            fill="url(#diya-glow)"
            className="animate-diya-glow"
            style={{ animationDelay: "0.4s" }}
          />
        </>
      )}

      {/* flame */}
      {lit && (
        <g className="animate-diya-flame" style={{ transformOrigin: "60px 60px" }}>
          <path
            d="M60 12 C 68 26 72 34 72 42 C 72 52 67 60 60 60 C 53 60 48 52 48 42 C 48 34 52 26 60 12 Z"
            fill="url(#diya-flame)"
          />
          <path
            d="M60 28 C 64 36 66 41 66 45 C 66 50 63 54 60 54 C 57 54 54 50 54 45 C 54 41 56 36 60 28 Z"
            fill="#FFF3D6"
            fillOpacity="0.85"
          />
        </g>
      )}

      {/* lamp bowl */}
      <path
        d="M16 62 C 16 62 22 80 60 80 C 98 80 104 62 104 62 C 104 62 96 66 60 66 C 24 66 16 62 16 62 Z"
        fill="currentColor"
        fillOpacity="0.92"
      />
      <path
        d="M8 62 C 8 58 12 56 18 56 L 102 56 C 108 56 112 58 112 62 C 112 66 108 67 102 67 L 18 67 C 12 67 8 66 8 62 Z"
        fill="currentColor"
        fillOpacity="0.72"
      />
      <path
        d="M8 62 C 8 58 12 56 18 56 L 102 56 C 108 56 112 58 112 62 C 112 66 108 67 102 67 L 18 67 C 12 67 8 66 8 62 Z"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <path
        d="M54 56 L 54 50 C 54 48 56 47 60 47 C 64 47 66 48 66 50 L 66 56"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />

      <defs>
        <radialGradient id="diya-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5C878" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#E09A3C" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#E09A3C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-flame" x1="60" y1="12" x2="60" y2="60">
          <stop offset="0%" stopColor="#FFE7A8" />
          <stop offset="55%" stopColor="#F0A73E" />
          <stop offset="100%" stopColor="#C2681F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
