import type { Metadata } from "next";
import { donation, site } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { DonationForm } from "@/components/donation-form";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support the spiritual and humanitarian work of Prabhu Prem Mission — annadaan, education, gauseva, health and more.",
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Support the Mission"
        meta="Seva · Daan"
        title={
          <>
            Be a part of something{" "}
            meaningful.
          </>
        }
        intro={donation.intro}
        image="/images/donate-hero.jpg"
        alt="An evening aarti lamp offered at the river"
        imageClassName="object-[50%_50%]"
      />

      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel>Make an offering</SectionLabel>
            <h2 className="display-2 mt-6 max-w-lg text-balance">
              Every contribution becomes something you can almost touch.
            </h2>
            <p className="body-base mt-5 max-w-xl text-charcoal/55">
              A meal, a book, a veterinarian&rsquo;s visit, a tree. Choose an
              amount and the mission will direct it where it is needed most — or
              to a particular initiative, if you prefer.
            </p>

            <div className="mt-10">
              <DonationForm />
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9 lg:pt-2">
            <div className="border-t border-charcoal/20 pt-5">
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                How your offering is held
              </p>
            </div>

            <div className="mt-2">
              {donation.trust.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="border-b border-line py-5">
                    <div className="flex items-baseline gap-4">
                      <span className="text-[0.8rem] font-medium text-saffron">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-normal text-charcoal/90">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs font-normal leading-relaxed text-charcoal/50">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 bg-cream p-5" delay={0.15}>
              <p className="font-deva text-xl text-saffron" lang="sa">
                दानं परमं धर्मः
              </p>
              <p className="mt-1 text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                Giving is the highest duty
              </p>
              <p className="mt-3 text-xs font-normal leading-relaxed text-charcoal/50">
                A traditional line the mission returns to. It is offered here as
                a reflection, not as a claim about outcomes.
              </p>
            </Reveal>

            <Reveal className="mt-8 border-t border-line pt-5" delay={0.2}>
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                Prefer to give quietly?
              </p>
              <p className="mt-2 text-xs font-normal leading-relaxed text-charcoal/50">
                Gupta Daan is an offering made without recognition. Tick the box
                in the form and your name will not be recorded publicly.
              </p>
              <a
                href="#gupta-daan"
                className="mt-4 inline-flex text-[0.8rem] font-medium tracking-[0.01em] text-charcoal underline decoration-charcoal/25 underline-offset-4 transition-colors duration-500 hover:text-saffron"
              >
                Offer Gupta Daan
              </a>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <ParallaxImage
              src={donation.image}
              alt={donation.imageAlt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full"
              imageClassName="img-warm"
              strength={40}
            />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel>Where it goes</SectionLabel>
            <h2 className="display-2 mt-6 max-w-lg text-balance">
              Small sums, held with care, become daily work.
            </h2>
            <div className="mt-6 space-y-4 text-charcoal/60">
              <p className="body-base">
                Contributions support the mission&rsquo;s six seva programmes and
                the quiet costs that hold them together: kitchen fuel, books,
                fodder, medicine, transport and the upkeep of the Dham itself.
              </p>
              <p className="body-base">
                No amount is too small, and no offering is treated as a
                transaction. The mission does not promise specific outcomes; it
                promises to use what it receives carefully.
              </p>
            </div>
            <p className="mt-8 max-w-md text-xs font-normal leading-relaxed text-charcoal/40">
              {donation.payment.note}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-ivory md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel light>Other ways to give</SectionLabel>
            <h2 className="display-2 mt-6 max-w-xl text-balance">
              Time is also an offering.
            </h2>
            <p className="body-lg mt-5 max-w-lg text-ivory/55">
              Volunteers are welcome in the kitchen, the classroom, the cow
              shelter and the garden. If you would rather give your hands than
              your money, write to us and we will find a place for you.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 lg:col-span-5 lg:items-end">
            <a href="/contact" className="btn btn-light group">
              Volunteer with us
            </a>
            <a
              href={`mailto:${site.email}`}
              className="btn btn-outline-light group"
            >
              Write to the mission
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
