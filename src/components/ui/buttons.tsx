import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "light" | "outline" | "outline-light";

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  arrow = true,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
}) {
  const classes = cn(
    "btn group",
    variant === "solid" && "btn-solid",
    variant === "light" && "btn-light",
    variant === "outline" && "btn-outline",
    variant === "outline-light" && "btn-outline-light",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        <span>{children}</span>
        {arrow && (
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
      )}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em]",
        light ? "text-ivory/80 hover:text-ivory" : "text-charcoal/80 hover:text-charcoal",
        className,
      )}
    >
      <span className="link-underline pb-1">{children}</span>
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
          light
            ? "border-ivory/25 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal"
            : "border-charcoal/20 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory",
        )}
      >
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </span>
    </Link>
  );
}
