import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { initiatives } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { ButtonLink } from "@/components/ui/buttons";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return initiatives.map((initiative) => ({ slug: initiative.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const initiative = initiatives.find((item) => item.slug === slug);

  if (!initiative) return { title: "Initiative not found" };

  return {
    title: initiative.title,
    description: initiative.excerpt,
    openGraph: {
      title: `${initiative.title} — Prabhu Prem Mission`,
      description: initiative.excerpt,
      images: [{ url: initiative.image }],
    },
  };
}

export default async function InitiativeDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const initiative = initiatives.find((item) => item.slug === slug);

  if (!initiative) notFound();

  const index = initiatives.findIndex((item) => item.slug === slug);
  const next = initiatives[(index + 1) % initiatives.length];

  return (
    <>
      <PageHero
        eyebrow="Our Initiatives"
        meta={formatDate(initiative.date)}
        title={
          <>
            {initiative.title}
            <span className="mt-3 block font-deva text-2xl tracking-normal text-gold/80 sm:text-3xl">
              {initiative.sanskrit}
            </span>
          </>
        }
        intro={initiative.intro}
        image={initiative.image}
        alt={initiative.imageAlt}
        imageClassName="object-[50%_45%]"
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/20 pt-5 text-[0.7rem] tracking-[0.01em] text-ivory/45">
          <span>{initiative.location}</span>
          <span className="hidden h-3 w-px bg-ivory/20 sm:block" />
          <span>{initiative.category}</span>
        </div>
      </PageHero>

      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <SectionLabel>The work</SectionLabel>
              <div className="mt-8 hidden lg:block">
                <Link
                  href="/initiatives"
                  className="group inline-flex items-center gap-2 text-[0.8rem] tracking-[0.01em] text-charcoal/45 transition-colors duration-500 hover:text-charcoal"
                >
                  <ArrowLeft
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
                    strokeWidth={1.5}
                  />
                  All initiatives
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-6">
                {initiative.body.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={
                      i === 0
                        ? "body-lg text-charcoal/75"
                        : "body-lg text-charcoal/60"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14 border-y border-line py-10" delay={0.08}>
              <p className="font-display text-2xl italic leading-snug text-charcoal/80 sm:text-3xl">
                &ldquo;{initiative.quote}&rdquo;
              </p>
              <p className="mt-4 text-[0.7rem] tracking-[0.01em] text-charcoal/35">
                A reflection from the mission
              </p>
            </Reveal>

            <Reveal className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm" delay={0.1}>
              <div>
                <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/35">
                  Initiative
                </p>
                <p className="mt-2 font-display text-xl">{initiative.title}</p>
              </div>
              <div>
                <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/35">
                  Where
                </p>
                <p className="mt-2 font-display text-xl">{initiative.location}</p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-2">
            <div className="border-t border-line pt-5 lg:sticky lg:top-32">
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/35">
                Get involved
              </p>
              <p className="mt-3 text-xs font-normal leading-relaxed text-charcoal/50">
                Volunteer your time, offer a contribution, or simply come and
                see the work for yourself.
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                <Link
                  href="/donate"
                  className="group inline-flex items-center gap-1.5 text-[0.8rem] font-medium tracking-[0.01em] text-charcoal transition-colors duration-500 hover:text-saffron"
                >
                  Donate
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 text-[0.8rem] font-medium tracking-[0.01em] text-charcoal/60 transition-colors duration-500 hover:text-charcoal"
                >
                  Volunteer
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream pb-20 md:pb-28">
        <div className="container-x">
          <Reveal>
            <ParallaxImage
              src={initiative.gallery[0].src}
              alt={initiative.gallery[0].alt}
              sizes="100vw"
              className="aspect-[16/10] w-full md:aspect-[21/9]"
              imageClassName="img-warm"
              strength={40}
            />
          </Reveal>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {initiative.gallery.slice(1).map((item) => (
              <Reveal key={item.src}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="img-warm object-cover"
                  />
                </div>
                <p className="mt-3 text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                  {item.alt}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-ivory md:py-28">
        <div className="container-x">
          <div className="grid gap-10 border-b border-line-light pb-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel light>Continue</SectionLabel>
            </div>
            <div className="lg:col-span-9">
              <p className="text-[0.7rem] tracking-[0.01em] text-ivory/40">
                Next initiative
              </p>
              <Link
                href={`/initiatives/${next.slug}`}
                className="group mt-4 flex flex-wrap items-baseline justify-between gap-4"
              >
                <span className="display-2 transition-colors duration-500 group-hover:text-gold">
                  {next.title}
                </span>
                <ArrowUpRight
                  className="h-6 w-6 text-ivory/40 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-ivory"
                  strokeWidth={1.25}
                />
              </Link>
              <p className="mt-3 max-w-xl text-sm font-normal leading-relaxed text-ivory/50">
                {next.excerpt}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm font-normal leading-relaxed text-ivory/50">
              Every contribution becomes a meal, a book, a visit or a tree.
              Thank you for walking with us.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/donate" variant="light">
                Support this seva
              </ButtonLink>
              <ButtonLink href="/initiatives" variant="outline-light">
                All initiatives
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
