import type { Metadata } from "next";
import Image from "next/image";
import { aboutPage, mission, principles } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { ArrowLink, ButtonLink } from "@/components/ui/buttons";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, vision and spiritual guidance behind Prabhu Prem Mission — a life shaped by remembrance, service and love.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Mission"
        meta="Bharat · India"
        title={
          <>
            A life shaped by <span className="italic text-gold">remembrance.</span>
          </>
        }
        intro={aboutPage.intro}
        image={aboutPage.heroImage}
        alt={aboutPage.heroImageAlt}
        imageClassName="object-[50%_60%]"
      />

      <section className="bg-ivory py-24 md:py-32 lg:py-40">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionLabel>Who we are</SectionLabel>
            <p
              aria-hidden
              className="mt-10 font-deva text-[8rem] leading-none text-saffron/15"
            >
              प्रेम
            </p>
            <div className="mt-8 hidden border-t border-line pt-5 lg:block">
              <p className="text-[0.58rem] uppercase leading-relaxed tracking-[0.2em] text-charcoal/40">
                A spiritual mission
                <br />
                in the living tradition
                <br />
                of Indian bhakti.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="display-2 text-balance">{aboutPage.visionTitle}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {aboutPage.visionBody.map((paragraph) => (
                  <p key={paragraph} className="body-lg text-charcoal/60">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-12" delay={0.1}>
              <div className="grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                {principles.map((principle) => (
                  <div key={principle.number}>
                    <p className="font-display text-sm italic text-saffron">
                      {principle.number}
                    </p>
                    <p className="mt-2 font-display text-2xl">{principle.title}</p>
                    <p className="mt-2 text-xs font-light leading-relaxed text-charcoal/50">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <ParallaxImage
              src="/images/mission.jpg"
              alt="Historic stone temples and a tree in a quiet courtyard"
              sizes="100vw"
              className="aspect-[16/10] w-full md:aspect-[21/9]"
              imageClassName="img-warm"
              strength={50}
            />
            <div className="mt-4 flex justify-between gap-6 text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/40">
              <span>A quiet courtyard at the Dham</span>
              <span className="hidden sm:block">Placeholder photography</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32 lg:py-40">
        <div className="container-x">
          <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>Our story</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-2 max-w-2xl text-balance">
                Small beginnings, held with patience.
              </h2>
            </div>
          </div>

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <Stagger className="mt-2">
                {aboutPage.timeline.map((chapter, index) => (
                  <StaggerItem
                    key={chapter.chapter}
                    className="grid gap-6 border-b border-line py-10 sm:grid-cols-[100px_1fr] md:py-12"
                  >
                    <div>
                      <p className="font-display text-sm italic text-saffron">
                        0{index + 1}
                      </p>
                      <p className="mt-2 text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/40">
                        {chapter.chapter}
                      </p>
                    </div>
                    <div>
                      <h3 className="display-3 max-w-xl text-balance">
                        {chapter.title}
                      </h3>
                      <p className="body-base mt-4 max-w-xl text-charcoal/55">
                        {chapter.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal className="lg:col-span-4 lg:pt-10" delay={0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
                <Image
                  src="/images/about-hero.jpg"
                  alt="A weathered Indian temple in warm afternoon light"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="img-warm object-cover"
                />
              </div>
              <p className="mt-4 text-[0.56rem] uppercase leading-relaxed tracking-[0.18em] text-charcoal/40">
                Stone remembers what the world forgets.
                <br />
                Placeholder photography.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="guidance" className="bg-cream py-24 md:py-32 lg:py-40">
        <div className="container-x">
          <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>Spiritual Guidance</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-2 max-w-2xl text-balance">
                Two lives given to the path.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-12">
            {[aboutPage.guru, aboutPage.swami].map((person) => (
              <Reveal key={person.name}>
                <div className="grid gap-7 sm:grid-cols-[0.85fr_1fr] sm:items-start">
                  <div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand">
                      <Image
                        src={person.image}
                        alt={person.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 80vw"
                        className="img-warm-deep object-cover object-[50%_35%]"
                      />
                      <span className="absolute bottom-3 left-3 right-3 text-[0.5rem] uppercase leading-relaxed tracking-[0.16em] text-ivory/70">
                        Representative image
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                      {person.role}
                    </p>
                    <h3 className="mt-3 font-display text-3xl leading-tight">
                      {person.name}
                    </h3>
                    <div className="mt-4 space-y-3">
                      {person.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm font-light leading-relaxed text-charcoal/55"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 border-t border-line pt-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl font-display text-xl italic leading-relaxed text-charcoal/60">
                &ldquo;{mission.sanskritMeaning}&rdquo; — a blessing the mission
                returns to often.
              </p>
              <ArrowLink href="/initiatives">See our seva</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal py-24 text-ivory md:py-32">
        <div className="container-x relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel light>Walk with us</SectionLabel>
            <h2 className="display-1 mt-6 max-w-2xl text-balance">
              The door is open. <span className="italic text-gold">Come as you are.</span>
            </h2>
            <p className="body-lg mt-6 max-w-lg text-ivory/55">
              Whether you come to sit in silence, to serve, or simply to
              understand a little more — there is a place for you here.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 lg:col-span-4 lg:items-end">
            <ButtonLink href="/initiatives" variant="light">
              Explore our initiatives
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Write to us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
