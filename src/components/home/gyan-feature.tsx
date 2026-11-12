import { ArrowDownToLine } from "lucide-react";
import { gyanSection, publications } from "@/content/site";
import { BookCover } from "@/components/book-cover";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/buttons";
import { SectionLabel } from "@/components/section-heading";
import { formatDate } from "@/lib/utils";

export function GyanFeature() {
  const latest = publications[0];

  return (
    <section className="bg-cream py-24 md:py-32 lg:py-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <BookCover
            publication={latest}
            className="mx-auto max-w-[300px] lg:ml-0"
          />
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.08}>
          <SectionLabel>{gyanSection.eyebrow}</SectionLabel>
          <p className="mt-7 text-[0.78rem] text-charcoal/45">
            {latest.issue} <span aria-hidden>·</span> {formatDate(latest.date)}
          </p>
          <h2 className="display-1 mt-3 max-w-2xl text-balance">
            {gyanSection.title}
          </h2>
          <p className="body-lg mt-5 max-w-xl text-charcoal/60">
            {gyanSection.intro}
          </p>
          <div className="mt-8 border-t border-line pt-5">
            <h3 className="font-display text-2xl">{latest.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/55">
              {latest.description}
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={latest.href} download className="btn btn-solid group">
              Read the latest issue
              <ArrowDownToLine
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
            <ArrowLink href={gyanSection.cta.href}>Explore the archive</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
