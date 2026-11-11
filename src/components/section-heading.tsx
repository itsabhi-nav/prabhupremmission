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
        "eyebrow flex items-center gap-3",
        light ? "text-ivory/45" : "text-charcoal/45",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-7", light ? "bg-gold/60" : "bg-saffron/70")}
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
