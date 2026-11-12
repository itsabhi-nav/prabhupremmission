import { cn } from "@/lib/utils";

/**
 * A nakshatra chakra — the 27 lunar mansions, the 12 rāśi, and a small
 * constellation scattered across them. It is drawn once and turns slowly
 * above the photography, never competing with it.
 */
export function MandalaField({ className }: { className?: string }) {
  const nakshatras = Array.from({ length: 27 }, (_, i) => i * (360 / 27));
  const rashis = Array.from({ length: 12 }, (_, i) => i * 30);

  // deterministic constellation — no randomness, so server and client agree
  const stars = [
    [188, 96, 1.7], [232, 74, 1.1], [268, 110, 1.5], [312, 92, 0.9],
    [344, 138, 1.3], [318, 188, 1.8], [352, 226, 1.0], [296, 268, 1.4],
    [330, 316, 0.9], [272, 338, 1.6], [214, 322, 1.0], [186, 280, 1.4],
    [140, 312, 0.9], [104, 272, 1.5], [72, 224, 1.1], [58, 172, 1.6],
    [92, 128, 1.0], [136, 150, 1.3], [178, 118, 0.9], [244, 158, 1.2],
    [286, 206, 0.8], [232, 244, 1.1], [150, 236, 0.9], [116, 190, 1.2],
  ];
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
    [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22],
    [22, 23], [23, 17], [19, 5], [0, 18],
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {/* faint starfield */}
      <g opacity="0.55">
        {Array.from({ length: 64 }, (_, i) => {
          const x = 20 + ((i * 137.508) % 360);
          const y = 24 + ((i * 97.31) % 352);
          const r = i % 7 === 0 ? 1.4 : i % 3 === 0 ? 0.9 : 0.55;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill="currentColor"
              opacity={0.24 + (i % 5) * 0.09}
            />
          );
        })}
      </g>

      {/* outer graduated ring */}
      <g className="animate-yantra" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="196" stroke="currentColor" strokeOpacity="0.2" />
        <circle
          cx="200"
          cy="200"
          r="188"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="1 9"
        />
        {nakshatras.map((angle, i) => {
          const long = i % 3 === 0;
          return (
            <line
              key={angle}
              x1="200"
              y1={long ? 8 : 12}
              x2="200"
              y2={long ? 22 : 18}
              stroke="currentColor"
              strokeOpacity={long ? 0.45 : 0.24}
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
        <circle cx="200" cy="200" r="176" stroke="currentColor" strokeOpacity="0.12" />
      </g>

      {/* rashi spokes, turning the other way */}
      <g
        className="animate-yantra-reverse"
        style={{ transformOrigin: "200px 200px" }}
      >
        {rashis.map((angle) => (
          <line
            key={angle}
            x1="200"
            y1="40"
            x2="200"
            y2="66"
            stroke="currentColor"
            strokeOpacity="0.34"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="118"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeDasharray="2 6"
        />
      </g>

      {/* constellation */}
      <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.6">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={stars[a][0]}
            y1={stars[a][1]}
            x2={stars[b][0]}
            y2={stars[b][1]}
          />
        ))}
      </g>
      <g fill="currentColor">
        {stars.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.5 + (i % 4) * 0.12} />
        ))}
      </g>

      {/* the bindu */}
      <circle cx="200" cy="200" r="2.4" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
