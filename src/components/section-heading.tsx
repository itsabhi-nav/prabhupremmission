import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  light = false,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-2.5",
        light ? "text-ivory/55" : "text-charcoal/50",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 shrink-0",
          light ? "bg-gold" : "bg-saffron",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  className,
  titleClassName,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="lg:col-span-3">
        <SectionLabel light={light}>{eyebrow}</SectionLabel>
      </div>
      <div
        className={cn(
          "lg:col-span-9",
          align === "center" && "flex flex-col items-center text-center",
        )}
      >
        <h2
          className={cn(
            "display-1 text-balance",
            light ? "text-ivory" : "text-charcoal",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={cn(
              "body-lg mt-6 max-w-xl text-pretty",
              light ? "text-ivory/55" : "text-charcoal/60",
            )}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
