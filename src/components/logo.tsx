import { cn } from "@/lib/utils";

export function LogoMark({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
      style={style}
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M20 7.5c3.4 4.1 3.4 8.4 0 12.5-3.4-4.1-3.4-8.4 0-12.5Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path
        d="M20 32.5c-3.4-4.1-3.4-8.4 0-12.5 3.4 4.1 3.4 8.4 0 12.5Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path
        d="M7.5 20c4.1-3.4 8.4-3.4 12.5 0-4.1 3.4-8.4 3.4-12.5 0Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path
        d="M32.5 20c-4.1 3.4-8.4 3.4-12.5 0 4.1-3.4 8.4-3.4 12.5 0Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <circle cx="20" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={compact ? "h-8 w-8" : "h-9 w-9"} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] leading-none tracking-[-0.01em] sm:text-[1.5rem]">
          Prabhu Prem
        </span>
        <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.42em] opacity-70">
          Mission
        </span>
      </span>
    </span>
  );
}
