import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,9,0.82)_0%,rgba(14,12,9,0.2)_24%,rgba(14,12,9,0.55)_66%,rgba(14,12,9,0.96)_100%)]" />

      <div className="container-x relative pb-12 pt-36 md:pb-16 md:pt-48">
        <p className="eyebrow text-ivory/55">{eyebrow}</p>

        <h1
          className={cn(
            "display-1 mt-5 max-w-4xl text-balance",
            align === "center" && "mx-auto text-center",
          )}
        >
          {title}
        </h1>

        {intro && (
          <p
            className={cn(
              "mt-7 max-w-xl text-[1.02rem] font-normal leading-relaxed text-ivory/70",
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
