import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { gyanSection, newsletter, publications } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { BookCover } from "@/components/book-cover";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gyan",
  description:
    "Monthly publications, teachings and reflections from Prabhu Prem Mission — words to carry with you.",
};

export default function GyanPage() {
  const [featured, ...archive] = publications;

  return (
    <>
      <PageHero
        eyebrow="Gyan · Monthly Wisdom"
        meta="Publications & teachings"
        title={
          <>
            Words to <span className="italic text-gold">carry with you.</span>
          </>
        }
        intro={gyanSection.intro}
        image="/images/lamps.jpg"
        alt="Rows of small oil lamps glowing in the dark"
        imageClassName="object-[50%_55%]"
      />

      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <BookCover publication={featured} className="mx-auto max-w-[340px] lg:mx-0" />
              </Reveal>
              <p className="mt-5 text-center text-[0.54rem] uppercase tracking-[0.2em] text-charcoal/35 lg:text-left">
                Cover design · Placeholder
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
              <SectionLabel>Latest publication</SectionLabel>
              <Reveal delay={0.08}>
                <p className="mt-6 text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                  {featured.issue} · {formatDate(featured.date)}
                </p>
                <h2 className="display-1 mt-4">{featured.title}</h2>
                <p className="mt-2 font-deva text-2xl text-saffron/80" lang="sa">
                  {featured.sanskrit}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-charcoal/40">
                  {featured.subtitle}
                </p>

                <p className="body-lg mt-7 text-charcoal/60">
                  {featured.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-4 text-[0.56rem] uppercase tracking-[0.16em] text-charcoal/40">
                  <span>{featured.pages} pages</span>
                  <span className="h-3 w-px bg-line" />
                  <span>PDF · Free to read</span>
                  <span className="h-3 w-px bg-line" />
                  <span>English</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={featured.href}
                    download
                    className="btn btn-solid group"
                  >
                    Download PDF
                    <ArrowDownToLine
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                  <Link
                    href="/donate"
                    className="group inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-charcoal/60 transition-colors duration-500 hover:text-charcoal"
                  >
                    <span className="link-underline pb-1">Support the publications</span>
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                  </Link>
                </div>

                <p className="mt-6 max-w-md text-xs font-light leading-relaxed text-charcoal/40">
                  Placeholder PDF. The mission&apos;s actual publications will
                  replace these files before launch.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28 lg:py-32">
        <div className="container-x">
          <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>From the archive</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-2 max-w-2xl text-balance">
                A small library of the inward life.
              </h2>
              <p className="body-base mt-4 max-w-xl text-charcoal/55">
                Each issue gathers a teaching, a reflection and a story from the
                mission&rsquo;s seva. Read them in any order.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-2">
            {archive.map((publication, index) => (
              <Reveal key={publication.slug} delay={index * 0.04}>
                <a
                  href={publication.href}
                  download
                  aria-label={`Download ${publication.title}`}
                  className="group grid gap-6 border-b border-line py-8 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-1">
                    <p className="font-display text-sm italic text-saffron">
                      {String(index + 2).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="hidden md:col-span-2 md:block">
                    <BookCover
                      publication={publication}
                      className="max-w-[130px] shadow-[10px_14px_30px_-18px_rgba(36,35,31,0.55)]"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[0.54rem] uppercase tracking-[0.2em] text-charcoal/35">
                      {publication.issue} · {formatDate(publication.date)}
                    </p>
                    <h3 className="mt-2 font-display text-3xl leading-tight transition-colors duration-500 group-hover:text-saffron">
                      {publication.title}
                    </h3>
                    <p className="mt-1 font-deva text-base text-saffron/70" lang="sa">
                      {publication.sanskrit}
                    </p>
                    <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-charcoal/55">
                      {publication.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:col-span-4 md:justify-end">
                    <div className="text-right">
                      <p className="text-[0.54rem] uppercase tracking-[0.18em] text-charcoal/35">
                        {publication.pages} pages
                      </p>
                      <p className="mt-1 text-[0.54rem] uppercase tracking-[0.18em] text-charcoal/35">
                        {publication.subtitle}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-charcoal/20 transition-all duration-500 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory"
                    >
                      <ArrowDownToLine className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>A monthly letter</SectionLabel>
            <h2 className="display-2 mt-6 max-w-md text-balance">
              {newsletter.title}
            </h2>
            <p className="body-base mt-5 max-w-md text-charcoal/55">
              {newsletter.intro}
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <NewsletterForm />
            <p className="mt-4 text-[0.62rem] font-light tracking-wide text-charcoal/40">
              {newsletter.note}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
