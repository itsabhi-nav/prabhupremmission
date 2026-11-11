import { cn } from "@/lib/utils";

/**
 * A slowly turning yantra — concentric rings, a lotus crown, an eight-pointed
 * star and the bindu at the centre. Used as a quiet, breathing backdrop.
 */
export function Yantra({
  className,
  spin = true,
  stroke = "currentColor",
}: {
  className?: string;
  spin?: boolean;
  stroke?: string;
}) {
  const petals = Array.from({ length: 24 }, (_, i) => i * 15);
  const inner = Array.from({ length: 16 }, (_, i) => i * 22.5);

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      style={{ color: stroke }}
    >
      <defs>
        <path
          id="yantra-petal"
          d="M200 92 C 214 112 214 138 200 158 C 186 138 186 112 200 92 Z"
        />
        <path
          id="yantra-petal-inner"
          d="M200 132 C 209 146 209 166 200 180 C 191 166 191 146 200 132 Z"
        />
      </defs>

      {/* outer rings */}
      <circle cx="200" cy="200" r="196" stroke="currentColor" strokeOpacity="0.18" />
      <circle
        cx="200"
        cy="200"
        r="188"
        stroke="currentColor"
        strokeOpacity="0.32"
        strokeDasharray="1 7"
        strokeWidth="1.5"
      />

      {/* rotating lotus crown */}
      <g
        className={spin ? "animate-yantra" : undefined}
        style={{ transformOrigin: "200px 200px" }}
      >
        {petals.map((angle) => (
          <use
            key={angle}
            href="#yantra-petal"
            transform={`rotate(${angle} 200 200)`}
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.03"
          />
        ))}
      </g>

      <circle cx="200" cy="200" r="152" stroke="currentColor" strokeOpacity="0.26" />

      {/* eight-pointed star, two squares */}
      <g
        className={spin ? "animate-yantra-reverse" : undefined}
        style={{ transformOrigin: "200px 200px" }}
      >
        <rect
          x="96"
          y="96"
          width="208"
          height="208"
          stroke="currentColor"
          strokeOpacity="0.28"
          transform="rotate(45 200 200)"
        />
        <rect
          x="96"
          y="96"
          width="208"
          height="208"
          stroke="currentColor"
          strokeOpacity="0.2"
        />
        {inner.map((angle) => (
          <use
            key={angle}
            href="#yantra-petal-inner"
            transform={`rotate(${angle} 200 200)`}
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="0.9"
            fill="currentColor"
            fillOpacity="0.05"
          />
        ))}
      </g>

      <circle cx="200" cy="200" r="64" stroke="currentColor" strokeOpacity="0.34" />

      {/* bindu */}
      <circle cx="200" cy="200" r="6" fill="currentColor" fillOpacity="0.65" />
      <circle
        cx="200"
        cy="200"
        r="20"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
    </svg>
  );
}
