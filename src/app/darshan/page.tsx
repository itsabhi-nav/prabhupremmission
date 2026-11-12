import type { Metadata } from "next";
import Image from "next/image";
import { darshanSection } from "@/content/site";
import { getDarshanEntries } from "@/lib/darshan";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { DarshanArchive } from "@/components/darshan-archive";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Daily Dham Darshan",
  description:
    "A daily glimpse of the Dham — flowers, lamps and the morning aarti, gathered in one quiet archive.",
};

export const revalidate = 3600;

export default function DarshanPage() {
  const entries = getDarshanEntries(30);
  const today = entries[0];
  const recent = entries.slice(1, 4);

  return (
    <>
      <PageHero
        eyebrow="Daily Dham Darshan"
        meta="Updated each morning"
        title={
          <>
            A glimpse of the Dham, every day.
          </>
        }
        intro={darshanSection.intro}
        image={today.image}
        alt={today.alt}
        imageClassName="object-[50%_38%]"
      />

      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand md:aspect-[16/11]">
                  <Image
                    src={today.image}
                    alt={today.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="img-warm object-cover"
                  />
                  <span className="absolute left-4 top-4 flex items-center gap-2 bg-ivory/92 px-3 py-2 text-[0.7rem] tracking-[0.01em] text-charcoal/70 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                    Today
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-6 border-t border-line pt-4">
                  <div>
                    <p className="font-display text-xl leading-tight">
                      {today.caption}
                    </p>
                    <p className="mt-1 text-sm font-normal text-charcoal/50">
                      {today.note}
                    </p>
                  </div>
                  <p className="shrink-0 text-[0.7rem] tracking-[0.01em] text-charcoal/35">
                    {today.dateLabel}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pt-4">
              <SectionLabel>Today at the Dham</SectionLabel>
              <Reveal delay={0.08}>
                <div className="mt-8 flex items-start gap-6 border-b border-line pb-7">
                  <p className="font-sans text-[4.6rem] font-normal leading-[0.8] tracking-[-0.06em] text-charcoal">
                    {today.day}
                  </p>
                  <div className="pt-2">
                    <p className="text-[0.8rem] tracking-[0.01em] text-charcoal/45">
                      {today.weekday}
                    </p>
                    <p className="mt-1 font-display text-2xl leading-tight">
                      {today.month} {today.year}
                    </p>
                  </div>
                </div>

                <p className="body-base mt-7 text-charcoal/60">
                  Each morning the shrine is dressed before the first bell. The
                  photographs here are a quiet record of those ordinary
                  offerings — flowers, lamps, and the care of the people who
                  keep the rhythm of the Dham.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-2.5">
                  {recent.map((entry) => (
                    <div key={entry.id} className="relative aspect-square overflow-hidden bg-sand">
                      <Image
                        src={entry.image}
                        alt={entry.alt}
                        fill
                        sizes="120px"
                        className="img-warm object-cover"
                      />
                      <span className="absolute bottom-1.5 left-2 text-[0.8rem] tracking-[0.01em] text-ivory drop-shadow">
                        {entry.day}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-[0.7rem] leading-relaxed tracking-[0.01em] text-charcoal/35">
                  Photography is offered as a placeholder for the mission&apos;s
                  own daily darshan archive.
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
              <SectionLabel>The archive</SectionLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-2 max-w-2xl text-balance">
                Thirty days of light, kept together.
              </h2>
              <p className="body-base mt-4 max-w-xl text-charcoal/55">
                Browse the last month of darshan photographs. Select any frame
                to open it, then use the arrow keys to move between days.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <DarshanArchive entries={entries} />
          </div>
        </div>
      </section>
    </>
  );
}
