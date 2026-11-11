import Image from "next/image";
import { mission, principles } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { ArrowLink } from "@/components/ui/buttons";

export function MissionSection() {
  return (
    <section className="relative bg-ivory py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow="01 — Our Philosophy"
          title={mission.title}
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="relative lg:col-span-7">
            <ParallaxImage
              src={mission.image}
              alt={mission.imageAlt}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[4/5] w-full bg-sand sm:aspect-[16/12] lg:aspect-[4/5]"
              imageClassName="img-warm"
              strength={40}
            />

            <div className="absolute -bottom-10 -right-4 hidden w-[38%] border border-ivory bg-ivory p-2 shadow-[0_24px_60px_-30px_rgba(36,35,31,0.45)] lg:block xl:-right-10">
              <div className="relative aspect-square w-full">
                <Image
                  src={mission.detailImage}
                  alt={mission.detailAlt}
                  fill
                  sizes="22vw"
                  className="img-warm object-cover"
                />
              </div>
            </div>

            <p className="mt-5 flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.2em] text-charcoal/40">
              <span className="h-px w-6 bg-saffron/60" />
              {mission.detailCaption}
            </p>
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <Reveal delay={0.1}>
              <div className="border-l border-saffron/35 pl-5">
                <p className="font-deva text-2xl leading-snug text-saffron" lang="sa">
                  {mission.sanskrit}
                </p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/40">
                  {mission.sanskritMeaning}
                </p>
              </div>

              <div className="mt-9 space-y-6">
                {mission.body.map((paragraph) => (
                  <p key={paragraph} className="body-lg text-charcoal/65">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10">
                <ArrowLink href={mission.cta.href}>{mission.cta.label}</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>

        <Stagger className="mt-20 grid gap-10 border-t border-line pt-10 md:mt-28 md:grid-cols-3 md:gap-12">
          {principles.map((principle) => (
            <StaggerItem key={principle.number} className="group">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm italic text-saffron">
                  {principle.number}
                </span>
                <span className="h-px w-8 bg-line transition-all duration-700 group-hover:w-14 group-hover:bg-saffron/60" />
              </div>
              <h3 className="display-3 mt-5">{principle.title}</h3>
              <p className="body-base mt-3 max-w-[30ch] text-charcoal/55">
                {principle.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
