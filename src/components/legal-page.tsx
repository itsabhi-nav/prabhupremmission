import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <article className="bg-ivory pt-32 md:pt-40">
      <div className="container-x">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-charcoal/40 transition-colors duration-500 hover:text-charcoal"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          Back to the mission
        </Link>

        <header className="mt-12 grid gap-8 border-b border-line pb-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Legal</SectionLabel>
            <p className="mt-4 text-[0.58rem] uppercase tracking-[0.18em] text-charcoal/35">
              {updated}
            </p>
          </div>
          <div className="lg:col-span-8">
            <h1 className="display-1 text-balance">{title}</h1>
            <p className="body-lg mt-6 max-w-xl text-charcoal/60">{intro}</p>
          </div>
        </header>

        <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/35">
                On this page
              </p>
              <ul className="mt-4 space-y-2.5">
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${index + 1}`}
                      className="group flex items-baseline gap-3 text-sm font-light text-charcoal/55 transition-colors duration-500 hover:text-charcoal"
                    >
                      <span className="font-display text-xs italic text-saffron/70">
                        0{index + 1}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <div className="space-y-10">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  id={`section-${index + 1}`}
                  className="scroll-mt-32 border-t border-line pt-8 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm italic text-saffron">
                      0{index + 1}
                    </span>
                    <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  <p className="body-base mt-4 max-w-2xl text-charcoal/60">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-14 border-t border-line pt-8">
              <p className="text-sm font-light leading-relaxed text-charcoal/50">
                Questions about this page can be sent to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-charcoal underline decoration-charcoal/25 underline-offset-4 transition-colors duration-500 hover:text-saffron"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
