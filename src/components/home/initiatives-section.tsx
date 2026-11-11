import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { initiatives, initiativesSection } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/buttons";
import { cn } from "@/lib/utils";

export function InitiativesSection() {
  const [featured, ...rest] = initiatives;
  const others = rest.slice(0, 4);

  return (
    <section className="bg-ivory py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow="04 — Seva"
          title={initiativesSection.title}
          intro={initiativesSection.intro}
        />

        <Reveal className="mt-14 lg:mt-20">
          <Link
            href={`/initiatives/${featured.slug}`}
            className="group grid gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-sand lg:col-span-8">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute left-5 top-5 bg-ivory/90 px-3 py-2 text-[0.55rem] uppercase tracking-[0.2em] text-charcoal/70 backdrop-blur">
                Featured initiative
              </span>
            </div>

            <div className="flex flex-col justify-center lg:col-span-4 lg:pl-4">
              <div className="flex items-center gap-4 text-[0.58rem] uppercase tracking-[0.22em] text-charcoal/40">
                <span>{featured.category}</span>
                <span className="h-px flex-1 bg-line" />
                <span>01 / 06</span>
              </div>
              <h3 className="display-2 mt-6 transition-colors duration-500 group-hover:text-saffron">
                {featured.title}
              </h3>
              <p className="body-base mt-4 max-w-[36ch] text-charcoal/60">
                {featured.excerpt}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-charcoal/70">
                <span className="link-underline pb-1">Read the story</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </Link>
        </Reveal>

        <Stagger className="mt-20 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:mt-28">
          {others.map((initiative, index) => (
            <StaggerItem
              key={initiative.slug}
              className={cn(index % 2 === 1 && "md:mt-24")}
            >
              <Link href={`/initiatives/${initiative.slug}`} className="group block">
                <div
                  className={cn(
                    "relative overflow-hidden bg-sand",
                    index % 3 === 0 ? "aspect-[4/3]" : "aspect-[5/4]",
                  )}
                >
                  <Image
                    src={initiative.image}
                    alt={initiative.imageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(20,19,16,0.28)_100%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>

                <div className="mt-5 flex items-start justify-between gap-5 border-t border-line pt-4">
                  <div>
                    <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                      {initiative.category} · 0{index + 2} / 06
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-normal transition-colors duration-500 group-hover:text-saffron">
                      {initiative.title}
                    </h3>
                    <p className="mt-2 max-w-[38ch] text-sm font-light leading-relaxed text-charcoal/55">
                      {initiative.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-charcoal/40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-charcoal"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 flex justify-center md:mt-24">
          <ArrowLink href={initiativesSection.cta.href}>
            {initiativesSection.cta.label}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
