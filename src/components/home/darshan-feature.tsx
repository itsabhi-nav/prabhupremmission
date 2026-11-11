"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { DarshanEntry } from "@/lib/darshan";
import { darshanSection } from "@/content/site";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/section-heading";

export function DarshanFeature({ entries }: { entries: DarshanEntry[] }) {
  const [active, setActive] = useState(0);
  const current = entries[active];

  const go = (direction: number) => {
    setActive((index) => (index + direction + entries.length) % entries.length);
  };

  return (
    <section className="bg-sand py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>03 — Daily Darshan</SectionLabel>
            <h2 className="display-1 mt-5 max-w-2xl text-balance">
              {darshanSection.title}
            </h2>
          </div>
          <Link
            href={darshanSection.cta.href}
            className="group inline-flex shrink-0 items-center gap-2 pb-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-charcoal/60 transition-colors duration-500 hover:text-charcoal"
          >
            <span className="link-underline pb-1">{darshanSection.cta.label}</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal/10 sm:aspect-[16/11] lg:aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  priority={active === 0}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="img-warm object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(20,19,16,0.45)_100%)]" />

            <div className="absolute left-5 top-5 flex items-center gap-2 bg-ivory/90 px-3 py-2 text-[0.55rem] uppercase tracking-[0.2em] text-charcoal/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
              {active === 0 ? "Today" : current.weekday}
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-ivory">
              <p className="max-w-sm font-display text-xl leading-tight sm:text-2xl">
                {current.caption}
              </p>
              <span className="hidden shrink-0 text-[0.55rem] uppercase tracking-[0.2em] text-ivory/60 sm:block">
                {String(active + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="flex items-start gap-6 border-b border-line pb-7">
              <p className="font-sans text-[4.6rem] font-light leading-[0.8] tracking-[-0.06em] text-charcoal sm:text-[5.4rem]">
                {current.day}
              </p>
              <div className="pt-2">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-charcoal/45">
                  {current.weekday}
                </p>
                <p className="mt-1 font-display text-2xl leading-tight">
                  {current.month} {current.year}
                </p>
              </div>
            </div>

            <p className="body-base max-w-sm text-charcoal/60">{current.note}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous darshan"
                  className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/20 transition-all duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next darshan"
                  className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/20 transition-all duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <p className="text-[0.58rem] uppercase tracking-[0.2em] text-charcoal/35">
                Last seven days
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7 lg:grid-cols-4">
              {entries.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View darshan for ${entry.dateLabel}`}
                  aria-pressed={index === active}
                  className={cn(
                    "group relative aspect-square overflow-hidden transition-opacity duration-500",
                    index === active ? "opacity-100" : "opacity-55 hover:opacity-90",
                  )}
                >
                  <Image
                    src={entry.image}
                    alt={entry.alt}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={cn(
                      "absolute inset-0 border transition-colors duration-500",
                      index === active ? "border-charcoal" : "border-transparent",
                    )}
                  />
                  <span className="absolute bottom-1 left-1.5 text-[0.5rem] font-medium uppercase tracking-wider text-ivory drop-shadow">
                    {entry.day}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
