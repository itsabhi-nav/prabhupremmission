import { mission, principles } from "@/content/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { ArrowLink } from "@/components/ui/buttons";

export function MissionSection() {
  return (
    <section className="bg-ivory py-24 md:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading eyebrow="Our Philosophy" title={mission.title} />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <ParallaxImage
              src={mission.image}
              alt={mission.imageAlt}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[4/5] w-full bg-sand sm:aspect-[16/12] lg:aspect-[4/5]"
              imageClassName="img-warm"
              strength={40}
            />
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <Reveal delay={0.1}>
              <p className="font-deva text-2xl leading-snug text-saffron" lang="sa">
                {mission.sanskrit}
              </p>
              <p className="mt-2 text-[0.82rem] text-charcoal/45">
                {mission.sanskritMeaning}
              </p>

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
            <StaggerItem key={principle.number}>
              <h3 className="display-3">{principle.title}</h3>
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
