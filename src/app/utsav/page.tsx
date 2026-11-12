import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { utsav } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { UtsavCountdown } from "@/components/utsav-countdown";
import { UtsavCalendar, type CalendarEntry } from "@/components/utsav-calendar";
import { Reveal } from "@/components/motion/reveal";
import {
  calendar,
  festivalsForYear,
  nextFrom,
  observancesForYear,
} from "@/lib/festivals";
import { moonIllumination, tithiAtSunrise, tithiLabel } from "@/lib/panchang";

export const metadata: Metadata = {
  title: "Utsav",
  description:
    "The festival year at Prabhu Prem Mission — every date computed from the true phase of the moon and the sunrise at Vrindavan, with a countdown to the next utsav.",
};

export const revalidate = 3600;

const formatLong = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));

function toEntry(entry: {
  id: string;
  name: string;
  deva: string;
  iso: string;
  tithi?: string;
  note?: string;
  kind: "festival" | "observance";
}): CalendarEntry {
  return {
    id: entry.id,
    name: entry.name,
    deva: entry.deva,
    iso: entry.iso,
    tithi: entry.tithi,
    note: entry.note,
    kind: entry.kind,
  };
}

/**
 * The centre of the shadow disc that leaves exactly `fraction` of the moon's
 * area lit — solved from the overlap of two equal circles, so a 10% crescent
 * looks like a 10% crescent rather than a guess.
 */
function shadowOffset(fraction: number, radius: number): number {
  const target = 1 - fraction;
  let low = 0;
  let high = radius * 2;
  for (let i = 0; i < 26; i++) {
    const distance = (low + high) / 2;
    const overlap =
      (2 * radius * radius * Math.acos(distance / (2 * radius)) -
        (distance / 2) * Math.sqrt(4 * radius * radius - distance * distance)) /
      (Math.PI * radius * radius);
    if (overlap > target) low = distance;
    else high = distance;
  }
  return (low + high) / 2;
}

export default function UtsavPage() {
  const now = new Date();
  const year = now.getFullYear();
  const years = [year, year + 1];

  const allFestivals = calendar([year, year + 1, year + 2]).filter(
    (entry) => entry.kind === "festival",
  );
  const next = nextFrom(allFestivals, now);
  const todayTithi = tithiAtSunrise(now);
  const illumination = Math.round(moonIllumination(now) * 100);

  const data = years.map((y) => ({
    year: y,
    festivals: festivalsForYear(y).map(toEntry),
    observances: observancesForYear(y).map(toEntry),
  }));

  return (
    <>
      <PageHero
        eyebrow={utsav.eyebrow}
        meta={utsav.meta}
        title={
          <>
            The year, told in{" "}
            moons.
          </>
        }
        intro={utsav.intro}
        image={utsav.image}
        alt={utsav.imageAlt}
        imageClassName={utsav.imageClassName}
      />

      {/* next festival */}
      <section className="relative overflow-hidden bg-ink py-20 text-ivory md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(90% 120% at 85% 0%, rgba(194,67,30,0.14) 0%, transparent 55%), radial-gradient(70% 90% at 0% 100%, rgba(154,132,82,0.09) 0%, transparent 60%)",
          }}
        />
        <div className="container-x relative">
          <div className="flex flex-col gap-5 border-b border-line-light pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel light>{utsav.nextLabel}</SectionLabel>
              {next ? (
                <h2 className="display-1 mt-5 max-w-3xl text-balance">
                  {next.name}{" "}
                  <span className="font-deva text-[0.5em] text-gold/70" lang="sa">
                    {next.deva}
                  </span>
                </h2>
              ) : (
                <h2 className="display-1 mt-5">The calendar is being read.</h2>
              )}
            </div>
            {next && (
              <p className="shrink-0 text-[0.7rem] tracking-[0.01em] text-ivory/50">
                {formatLong(next.iso)}
              </p>
            )}
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              {next ? (
                <>
                  <UtsavCountdown iso={next.iso} label={next.name} />
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line-light pt-5">
                    <span className="text-[0.7rem] tracking-[0.01em] text-gold">
                      {next.tithi}
                    </span>
                    <span className="text-[0.7rem] tracking-[0.01em] text-ivory/40">
                      Dham calendar · Vrindavan
                    </span>
                  </div>
                  {next.note && (
                    <p className="mt-6 max-w-xl font-display text-xl leading-snug text-ivory/70 sm:text-2xl">
                      {next.note}
                    </p>
                  )}
                </>
              ) : null}
            </div>

            {/* today's panchang */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="border border-ivory/12 bg-ivory/[0.03] p-6 sm:p-7">
                <p className="text-[0.7rem] tracking-[0.01em] text-ivory/40">
                  Today at the Dham
                </p>
                <div className="mt-6 flex items-center gap-5">
                  <MoonGlyph illumination={illumination} waning={todayTithi >= 15} />
                  <div>
                    <p className="font-display text-2xl leading-tight text-ivory">
                      {tithiLabel(todayTithi)}
                    </p>
                    <p className="mt-1 text-[0.7rem] tracking-[0.01em] text-ivory/40">
                      Tithi at sunrise
                    </p>
                  </div>
                </div>
                <div className="mt-7 space-y-3 border-t border-line-light pt-5 text-[0.7rem] text-ivory/55">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="tracking-[0.01em] text-ivory/35">
                      Moon
                    </span>
                    <span className="tabular-nums">{illumination}% lit</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="tracking-[0.01em] text-ivory/35">
                      Place
                    </span>
                    <span>Vrindavan · 27.58° N</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="tracking-[0.01em] text-ivory/35">
                      Method
                    </span>
                    <span>True elongation</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[0.8rem] font-normal leading-relaxed text-ivory/35">
                {utsav.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* the calendar */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-5 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>{utsav.listEyebrow}</SectionLabel>
              <h2 className="display-1 mt-5 max-w-2xl text-balance">
                {utsav.listTitle}
              </h2>
            </div>
            <p className="max-w-xs text-[0.7rem] font-normal leading-relaxed text-charcoal/50">
              Select a year. Every row carries the tithi it was computed from.
            </p>
          </div>

          <Reveal className="mt-10">
            <UtsavCalendar years={data} highlightId={next?.id} />
          </Reveal>
        </div>
      </section>

      {/* sankalpa */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel>Sankalpa</SectionLabel>
              <h2 className="display-1 mt-5 max-w-lg text-balance">
                {utsav.sankalpa.title}
              </h2>
              <p className="mt-5 max-w-md text-[0.95rem] font-normal leading-relaxed text-charcoal/60">
                {utsav.sankalpa.body}
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
              <Link href={utsav.sankalpa.cta.href} className="btn btn-solid group">
                {utsav.sankalpa.cta.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MoonGlyph({
  illumination,
  waning,
}: {
  illumination: number;
  waning: boolean;
}) {
  const offset = shadowOffset(illumination / 100, 28);
  return (
    <svg viewBox="0 0 80 80" aria-hidden className="h-16 w-16 shrink-0 text-gold">
      <defs>
        <mask id="moon-mask">
          <rect width="80" height="80" fill="black" />
          <circle cx="40" cy="40" r="28" fill="white" />
          <circle cx={40 + (waning ? offset : -offset)} cy="40" r="28" fill="black" />
        </mask>
      </defs>
      <circle
        cx="40"
        cy="40"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      <circle cx="40" cy="40" r="28" fill="currentColor" mask="url(#moon-mask)" />
    </svg>
  );
}
