import type { Metadata } from "next";
import Link from "next/link";
import { getShlokaOfDay } from "@/lib/shloka";
import { shlokas } from "@/content/shlokas";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { ShlokaExplorer } from "@/components/shloka-explorer";
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
        title="A verse to carry today."
        intro="A small, living collection of verses from the Indian tradition — written in Devanagari, transliterated, opened word by word, and read slowly."
        image="/images/carving.jpg"
        alt="A carved stone figure set into the wall of a South Indian temple"
        imageClassName="object-[50%_40%]"
      />

      {/* today's verse */}
      <section className="bg-vermilion py-24 text-ivory md:py-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <Reveal>
                <SectionLabel light>Shloka of the day</SectionLabel>
                <p className="mt-4 text-[0.82rem] text-ivory/65">
                  {formatToday(now)}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-9">
              <Reveal delay={0.06}>
                <p className="deva-display text-ivory text-[2rem] leading-[1.6] sm:text-[2.9rem] lg:text-[3.4rem]">
                  {today.deva}
                </p>

                <p className="mt-6 font-display text-base italic leading-relaxed text-ivory/70 sm:text-lg">
                  {today.iast}
                </p>

                <p className="mt-10 max-w-2xl text-lg font-normal leading-[1.8] text-ivory/90 sm:text-xl">
                  {today.meaning}
                </p>

                {today.note && (
                  <p className="mt-6 max-w-xl text-xs font-normal leading-relaxed text-ivory/40">
                    {today.note}
                  </p>
                )}

                <p className="mt-10 text-[0.82rem] text-ivory/65">
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
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 className="display-2 text-balance">
              Read one. Then sit with it.
            </h2>
            <p className="body-base mt-5 max-w-lg text-charcoal/60">
              A verse read once is a line of poetry. A verse carried through a
              week becomes part of the way one lives.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/gyan" className="btn btn-solid">
                Read the Gyan
              </Link>
              <Link href="/darshan" className="btn btn-outline">
                Daily Darshan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
