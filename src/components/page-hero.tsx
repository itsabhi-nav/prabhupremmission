import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
  meta,
  children,
  className,
  imageClassName,
  align = "left",
  priority = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image: string;
  alt: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  align?: "left" | "center";
  priority?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex min-h-[74svh] flex-col justify-end overflow-hidden bg-charcoal text-ivory md:min-h-[82svh]",
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className={cn("img-warm object-cover", imageClassName)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,16,0.82)_0%,rgba(20,19,16,0.34)_18%,rgba(20,19,16,0.1)_34%,rgba(20,19,16,0.55)_70%,rgba(20,19,16,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_15%_70%,rgba(20,19,16,0.35)_0%,transparent_65%)]" />

      <div className="container-x relative pb-12 pt-36 md:pb-16 md:pt-44">
        <div className="flex items-center justify-between gap-6 border-t border-ivory/20 pt-4">
          <p className="eyebrow text-ivory/70">{eyebrow}</p>
          {meta && (
            <p className="hidden text-[0.58rem] uppercase tracking-[0.22em] text-ivory/60 sm:block">
              {meta}
            </p>
          )}
        </div>

        <h1
          className={cn(
            "display-1 mt-10 max-w-5xl text-balance md:mt-14",
            align === "center" && "mx-auto text-center",
          )}
        >
          {title}
        </h1>

        {intro && (
          <p
            className={cn(
              "body-lg mt-6 max-w-xl text-pretty text-ivory/65",
              align === "center" && "mx-auto text-center",
            )}
          >
            {intro}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
