import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { gyanSection, publications } from "@/content/site";
import { BookCover } from "@/components/book-cover";
import { SectionLabel } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export function GyanSection() {
  const [featured, ...archive] = publications;

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 select-none font-deva text-[26rem] leading-none text-charcoal/[0.035]"
      >
        ज्ञान
      </div>

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionLabel>06 — Gyan</SectionLabel>
            <h2 className="display-1 mt-5 max-w-md text-balance">
              {gyanSection.title}
            </h2>
            <p className="body-lg mt-6 max-w-md text-charcoal/60">
              {gyanSection.intro}
            </p>

            <div className="mt-10 flex items-center gap-5">
              <Link
                href="/gyan"
                className="group inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-charcoal/70 transition-colors duration-500 hover:text-charcoal"
              >
                <span className="link-underline pb-1">
                  Visit the Gyan library
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className="mt-14 border-t border-line pt-6">
              <p className="font-deva text-2xl text-saffron/90" lang="sa">
                ज्ञानं परमं बलम्
              </p>
              <p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-charcoal/40">
                Knowledge is the highest strength
              </p>
            </div>
          </div>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <div className="grid gap-8 sm:grid-cols-[0.85fr_1fr] sm:items-center">
              <BookCover publication={featured} className="mx-auto sm:mx-0" />

              <div>
                <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                  Latest publication · {featured.issue}
                </p>
                <h3 className="display-3 mt-3">{featured.title}</h3>
                <p className="mt-1 font-deva text-lg text-saffron/80" lang="sa">
                  {featured.sanskrit}
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-charcoal/60">
                  {featured.description}
                </p>
                <div className="mt-6 flex items-center gap-4 border-t border-line pt-4 text-[0.56rem] uppercase tracking-[0.16em] text-charcoal/40">
                  <span>{formatDate(featured.date)}</span>
                  <span className="h-3 w-px bg-line" />
                  <span>{featured.pages} pages</span>
                </div>
                <a
                  href={featured.href}
                  download
                  className="group mt-6 inline-flex items-center gap-2.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-saffron"
                >
                  <ArrowDownToLine
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5"
                    strokeWidth={1.5}
                  />
                  Read / download PDF
                </a>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                From the archive
              </p>
              <ul className="mt-3">
                {archive.slice(0, 3).map((publication) => (
                  <li key={publication.slug}>
                    <a
                      href={publication.href}
                      download
                      className="group flex items-center justify-between gap-6 border-t border-line py-4 transition-colors duration-500 hover:text-saffron"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-[0.55rem] uppercase tracking-[0.18em] text-charcoal/35">
                          {publication.issue}
                        </span>
                        <span className="font-display text-xl">{publication.title}</span>
                      </span>
                      <span className="flex items-center gap-4">
                        <span className="hidden text-[0.55rem] uppercase tracking-[0.16em] text-charcoal/35 sm:block">
                          {formatDate(publication.date, { day: undefined })}
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-charcoal/35 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
