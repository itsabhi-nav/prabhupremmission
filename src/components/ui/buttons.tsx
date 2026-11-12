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
        "link-underline w-fit pb-1 text-[0.92rem]",
        light ? "text-ivory/80 hover:text-ivory" : "text-charcoal/75 hover:text-charcoal",
        className,
      )}
    >
      {children}
    </Link>
  );
}
