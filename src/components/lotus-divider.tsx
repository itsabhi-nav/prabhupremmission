import { cn } from "@/lib/utils";

/** A small lotus used to close a section — eight petals opening from a seed. */
export function LotusDivider({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "light" | "dark";
}) {
  const color =
    tone === "light"
      ? "text-ivory/60"
      : tone === "dark"
        ? "text-charcoal/50"
        : "text-saffron/70";

  return (
    <svg
      viewBox="0 0 160 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-auto", color, className)}
    >
      <g stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.75">
        <path d="M80 46 C 80 30 70 20 56 16 C 60 30 68 40 80 46 Z" />
        <path d="M80 46 C 80 30 90 20 104 16 C 100 30 92 40 80 46 Z" />
        <path d="M80 46 C 80 26 68 12 52 4 C 56 22 66 38 80 46 Z" />
        <path d="M80 46 C 80 26 92 12 108 4 C 104 22 94 38 80 46 Z" />
        <path d="M80 46 C 80 28 74 18 62 12 C 68 28 72 38 80 46 Z" />
        <path d="M80 46 C 80 28 86 18 98 12 C 92 28 88 38 80 46 Z" />
      </g>
      <circle cx="80" cy="7" r="2.6" fill="currentColor" fillOpacity="0.8" />
      <path d="M8 24 H 52" stroke="currentColor" strokeOpacity="0.28" />
      <path d="M108 24 H 152" stroke="currentColor" strokeOpacity="0.28" />
    </svg>
  );
}
