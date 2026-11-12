import { guidance } from "@/content/site";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/buttons";
import { SectionLabel } from "@/components/section-heading";

export function GuidanceSection() {
  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <figure>
            <ParallaxImage
              src={guidance.image}
              alt={guidance.imageAlt}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/5] max-h-[760px] w-full bg-sand"
              imageClassName="img-warm-deep object-[50%_35%]"
              strength={36}
            />
            <figcaption className="mt-4 text-[0.78rem] text-charcoal/45">
              {guidance.imageCaption}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <SectionLabel>{guidance.eyebrow}</SectionLabel>
          <h2 className="display-1 mt-6 max-w-xl text-balance">
            {guidance.title}
          </h2>
          <div className="body-lg mt-7 space-y-5 text-charcoal/60">
            {guidance.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <ArrowLink href={guidance.cta.href}>{guidance.cta.label}</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
