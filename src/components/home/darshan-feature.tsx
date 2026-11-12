"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DarshanEntry } from "@/lib/darshan";
import { darshanSection } from "@/content/site";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/section-heading";
import { ArrowLink } from "@/components/ui/buttons";

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
            <SectionLabel>Daily Darshan</SectionLabel>
            <h2 className="display-1 mt-5 max-w-2xl text-balance">
              {darshanSection.title}
            </h2>
          </div>
          <ArrowLink href={darshanSection.cta.href} className="pb-2">
            {darshanSection.cta.label}
          </ArrowLink>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <figure>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal/10 sm:aspect-[16/11] lg:aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            </div>

          </figure>

          <div className="flex flex-col">
            <p className="text-[0.82rem] text-charcoal/45">
              {current.weekday}, {current.day} {current.month} {current.year}
            </p>
            <p className="mt-3 font-display text-[1.5rem] leading-snug text-charcoal">
              {current.caption}
            </p>
            <p className="body-base mt-3 max-w-sm text-charcoal/60">{current.note}</p>

            <div className="mt-8 grid grid-cols-4 gap-2.5 sm:grid-cols-7 lg:grid-cols-4">
              {entries.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View darshan for ${entry.dateLabel}`}
                  aria-pressed={index === active}
                  className={cn(
                    "group relative aspect-square overflow-hidden transition-opacity duration-500",
                    index === active ? "opacity-100" : "opacity-50 hover:opacity-85",
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
                </button>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-line pt-6">
              <p className="text-[0.82rem] text-charcoal/40">Last seven days</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous darshan"
                  className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/20 transition-colors duration-300 hover:border-charcoal"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next darshan"
                  className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/20 transition-colors duration-300 hover:border-charcoal"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
