import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Shloka } from "@/content/shlokas";
import { Yantra } from "@/components/yantra";
import { Diya } from "@/components/diya";
import { LotusDivider } from "@/components/lotus-divider";
import { Reveal } from "@/components/motion/reveal";

export function ShlokaSection({ shloka, dateLabel }: { shloka: Shloka; dateLabel: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ivory md:py-32 lg:py-40">
      {/* the yantra, turning slowly behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[min(760px,90vw)] w-[min(760px,90vw)] -translate-y-1/2 text-gold opacity-[0.16] sm:-right-24"
      >
        <Yantra />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 12% 50%, rgba(197,139,69,0.14) 0%, transparent 60%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-2">
            <Reveal>
              <LotusDivider className="mb-6 h-9 w-36" tone="gold" />
              <p className="text-[0.56rem] uppercase tracking-[0.24em] text-gold">
                Shloka of the day
              </p>
              <p className="mt-3 text-[0.56rem] uppercase tracking-[0.2em] text-ivory/35">
                {dateLabel}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <p className="deva-display text-gold-leaf animate-gold-leaf text-[2.1rem] leading-[1.55] sm:text-[3rem] lg:text-[3.6rem]">
                {shloka.deva}
              </p>

              <p className="mt-6 font-display text-base italic leading-relaxed text-ivory/45 sm:text-lg">
                {shloka.iast}
              </p>

              <div className="mt-8 h-px w-full max-w-md bg-gradient-to-r from-saffron/60 via-line-light to-transparent" />

              <p className="mt-8 max-w-2xl text-lg font-light leading-[1.8] text-ivory/70 sm:text-xl">
                {shloka.meaning}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <p className="text-[0.56rem] uppercase tracking-[0.2em] text-ivory/40">
                  {shloka.source}
                </p>
                <Link
                  href="/shloka"
                  className="group inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:text-gold"
                >
                  <span className="link-underline pb-1">Read the verse</span>
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-2 lg:flex lg:items-end lg:justify-end">
            <Reveal delay={0.15}>
              <Diya className="h-24 w-30 text-gold/70" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
