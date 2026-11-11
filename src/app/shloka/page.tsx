import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getShlokaOfDay } from "@/lib/shloka";
import { shlokas } from "@/content/shlokas";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { ShlokaExplorer } from "@/components/shloka-explorer";
import { Yantra } from "@/components/yantra";
import { Diya } from "@/components/diya";
import { LotusDivider } from "@/components/lotus-divider";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Shloka",
  description:
    "A living collection of verses from the Indian tradition — Devanagari, transliteration, word by word meaning and a place to count your own japa.",
};

export const revalidate = 3600;

function formatToday(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ShlokaPage() {
  const now = new Date();
  const today = getShlokaOfDay(now);

  return (
    <>
      <PageHero
        eyebrow="Shloka · The Verse"
        meta={formatToday(now)}
        title={
          <>
            A verse to <span className="italic text-gold">carry today.</span>
          </>
        }
        intro="A small, living collection of verses from the Indian tradition — written in Devanagari, transliterated, opened word by word, and read slowly."
        image="/images/deity.jpg"
        alt="A deity figure dressed in flowers — placeholder photography"
        imageClassName="object-[50%_35%]"
      />

      {/* today's verse */}
      <section className="relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-52 top-1/2 h-[min(720px,85vw)] w-[min(720px,85vw)] -translate-y-1/2 text-gold opacity-[0.15]"
        >
          <Yantra />
        </div>

        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <Reveal>
                <SectionLabel light>Shloka of the day</SectionLabel>
                <p className="mt-5 text-[0.56rem] uppercase tracking-[0.2em] text-ivory/35">
                  {formatToday(now)}
                </p>
                <div className="mt-8 hidden lg:block">
                  <Diya className="h-20 w-25 text-gold/70" />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-9">
              <Reveal delay={0.06}>
                <p className="deva-display text-gold-leaf animate-gold-leaf text-[2rem] leading-[1.6] sm:text-[2.9rem] lg:text-[3.4rem]">
                  {today.deva}
                </p>

                <p className="mt-6 font-display text-base italic leading-relaxed text-ivory/45 sm:text-lg">
                  {today.iast}
                </p>

                <div className="mt-8 h-px w-full max-w-lg bg-gradient-to-r from-saffron/60 via-line-light to-transparent" />

                <p className="mt-8 max-w-2xl text-lg font-light leading-[1.8] text-ivory/70 sm:text-xl">
                  {today.meaning}
                </p>

                {today.note && (
                  <p className="mt-6 max-w-xl text-xs font-light leading-relaxed text-ivory/40">
                    {today.note}
                  </p>
                )}

                <p className="mt-10 text-[0.56rem] uppercase tracking-[0.2em] text-ivory/40">
                  {today.source} · {today.theme}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* the collection */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-x">
          <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>The collection</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-2 max-w-2xl text-balance">
                {shlokas.length} verses, opened slowly.
              </h2>
              <p className="body-base mt-4 max-w-xl text-charcoal/55">
                Filter by theme, open any verse to read it word by word, and use
                the counter to keep your own japa. Nothing here is hurried.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <ShlokaExplorer />
          </div>
        </div>
      </section>

      {/* closing */}
      <section className="relative overflow-hidden bg-cream py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col items-center gap-8 text-center">
            <LotusDivider tone="gold" />
            <h2 className="display-2 max-w-2xl text-balance">
              Read one. Then <span className="italic text-saffron">sit with it.</span>
            </h2>
            <p className="body-base max-w-lg text-charcoal/55">
              A verse read once is a line of poetry. A verse carried through a
              week becomes part of the way one lives.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/gyan" className="btn btn-solid group">
                Read the Gyan
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
              <Link href="/darshan" className="btn btn-outline group">
                Daily Darshan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
