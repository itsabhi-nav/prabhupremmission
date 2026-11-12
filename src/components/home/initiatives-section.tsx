import Image from "next/image";
import Link from "next/link";
import { initiatives, initiativesSection } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/buttons";

export function InitiativesSection() {
  const [featured, ...rest] = initiatives;
  const others = rest.slice(0, 4);

  return (
    <section className="bg-ivory py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Seva"
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
                className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-col justify-center lg:col-span-4 lg:pl-4">
              <p className="text-[0.82rem] text-charcoal/40">{featured.category}</p>
              <h3 className="display-2 mt-4 text-balance transition-colors duration-500 group-hover:text-saffron">
                {featured.title}
              </h3>
              <p className="body-base mt-4 max-w-[36ch] text-charcoal/60">
                {featured.excerpt}
              </p>
              <span className="link-underline mt-7 w-fit pb-1 text-[0.92rem] text-charcoal/70">
                Read the story
              </span>
            </div>
          </Link>
        </Reveal>

        <Stagger className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-28">
          {others.map((initiative) => (
            <StaggerItem key={initiative.slug}>
              <Link href={`/initiatives/${initiative.slug}`} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden bg-sand">
                  <Image
                    src={initiative.image}
                    alt={initiative.imageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-[0.82rem] text-charcoal/40">
                    {initiative.category}
                  </p>
                  <h3 className="mt-2 font-display text-[1.75rem] leading-snug transition-colors duration-500 group-hover:text-saffron">
                    {initiative.title}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-sm font-normal leading-relaxed text-charcoal/55">
                    {initiative.excerpt}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 md:mt-24">
          <ArrowLink href={initiativesSection.cta.href}>
            {initiativesSection.cta.label}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
