import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { initiatives, initiativesSection } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { InitiativesIndex } from "@/components/initiatives-index";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/buttons";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Initiatives",
  description:
    "Annadaan, Vidya Daan, Gauseva, Swasthya Seva, Nari Shakti and Prakriti Seva — the service initiatives of Prabhu Prem Mission.",
};

export default function InitiativesPage() {
  const [featured, ...rest] = initiatives;

  return (
    <>
      <PageHero
        eyebrow="Our Initiatives"
        meta="Seva · In action"
        title={
          <>
            Service, in its many forms.
          </>
        }
        intro={initiativesSection.intro}
        image="/images/init-education.jpg"
        alt="Children walking to school in the early morning light in rural India"
        imageClassName="object-[50%_45%]"
      />

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-x">
          <SectionLabel>Featured initiative</SectionLabel>

          <Reveal className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Link
              href={`/initiatives/${featured.slug}`}
              className="group relative aspect-[16/10] overflow-hidden bg-sand lg:col-span-7"
            >
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </Link>

            <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9">
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                {featured.category} · {formatDate(featured.date)}
              </p>
              <h2 className="display-2 mt-4 transition-colors duration-500 group-hover:text-saffron">
                {featured.title}
              </h2>
              <p className="mt-1 font-deva text-xl text-saffron/80" lang="sa">
                {featured.sanskrit}
              </p>
              <p className="body-base mt-5 text-charcoal/60">{featured.intro}</p>
              <Link
                href={`/initiatives/${featured.slug}`}
                className="group mt-7 inline-flex w-fit items-center gap-2 text-[0.8rem] font-medium tracking-[0.01em] text-charcoal/70 transition-colors duration-500 hover:text-charcoal"
              >
                <span className="link-underline pb-1">Read the full story</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-24 md:pb-32">
        <div className="container-x">
          <div className="mb-12 grid gap-6 border-t border-line pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>All initiatives</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-2 max-w-2xl text-balance">
                Six ways of offering our attention.
              </h2>
            </div>
          </div>

          <InitiativesIndex items={rest} />

          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm font-normal leading-relaxed text-charcoal/50">
              Every initiative is small on purpose. If one of them speaks to
              you, write to us — there is always room for another pair of hands.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/donate">Support the seva</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Volunteer with us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
