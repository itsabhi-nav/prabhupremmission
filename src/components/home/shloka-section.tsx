import Link from "next/link";
import type { Shloka } from "@/content/shlokas";
import { Reveal } from "@/components/motion/reveal";

export function ShlokaSection({
  shloka,
  dateLabel,
}: {
  shloka: Shloka;
  dateLabel: string;
}) {
  return (
    <section className="relative bg-brown py-24 text-ivory md:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5 text-ivory/75">
                <span aria-hidden className="h-1.5 w-1.5 bg-ivory" />
                Shloka of the day
              </p>
              <p className="mt-2 text-sm text-ivory/65">{dateLabel}</p>
              <div className="mt-8 h-px w-16 bg-ivory/25" />
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal delay={0.06}>
              <p
                className="deva-display max-w-4xl text-[2.1rem] leading-[1.5] text-ivory sm:text-[2.9rem] lg:text-[3.6rem]"
                lang="sa"
              >
                {shloka.deva}
              </p>

              <p className="mt-8 font-display text-base italic leading-relaxed text-ivory/65 sm:text-lg">
                {shloka.iast}
              </p>

              <p className="mt-10 max-w-2xl text-lg font-normal leading-[1.8] text-ivory/90 sm:text-[1.22rem]">
                {shloka.meaning}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
                <p className="text-sm text-ivory/60">{shloka.source}</p>
                <Link
                  href="/shloka"
                  className="link-underline text-[0.92rem] text-ivory hover:text-ivory/70"
                >
                  Read the verse
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
