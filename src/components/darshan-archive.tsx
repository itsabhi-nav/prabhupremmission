"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { DarshanEntry } from "@/lib/darshan";
import { cn } from "@/lib/utils";

export function DarshanArchive({ entries }: { entries: DarshanEntry[] }) {
  const months = useMemo(
    () =>
      Array.from(new Set(entries.map((entry) => `${entry.month} ${entry.year}`))),
    [entries],
  );
  const [month, setMonth] = useState(months[0]);
  const [active, setActive] = useState<number | null>(null);

  const filtered = entries.filter(
    (entry) => `${entry.month} ${entry.year}` === month,
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (direction: number) => {
      setActive((index) => {
        if (index === null) return index;
        return (index + direction + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : filtered[active];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-4">
        <span className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/35">
          Month
        </span>
        {months.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              setMonth(label);
              setActive(null);
            }}
            className={cn(
              "relative py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500",
              month === label
                ? "text-charcoal"
                : "text-charcoal/40 hover:text-charcoal/80",
            )}
          >
            {label}
            {month === label && (
              <motion.span
                layoutId="darshan-month"
                className="absolute inset-x-0 -bottom-0.5 h-px bg-saffron"
              />
            )}
          </button>
        ))}
        <span className="ml-auto text-[0.56rem] uppercase tracking-[0.18em] text-charcoal/35">
          {String(filtered.length).padStart(2, "0")} entries
        </span>
      </div>

      <motion.ul layout className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((entry, index) => (
            <motion.li
              layout
              key={entry.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group block w-full text-left"
                aria-label={`Open darshan for ${entry.dateLabel}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={entry.image}
                    alt={entry.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1.5 text-[0.5rem] uppercase tracking-[0.18em] text-charcoal/70 backdrop-blur">
                    {index === 0 && month === months[0] ? "Latest" : entry.weekday}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[linear-gradient(180deg,transparent,rgba(20,19,16,0.72))] p-4 text-ivory">
                    <span className="font-display text-lg leading-tight">
                      {entry.caption}
                    </span>
                    <span className="shrink-0 font-sans text-2xl font-light leading-none tracking-tight">
                      {entry.day}
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <p className="text-[0.56rem] uppercase tracking-[0.18em] text-charcoal/40">
                    {entry.weekday} · {entry.monthShort} {entry.year}
                  </p>
                  <span className="text-[0.56rem] uppercase tracking-[0.18em] text-charcoal/30 transition-colors duration-500 group-hover:text-charcoal">
                    View
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col bg-ink/97 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Darshan for ${current.dateLabel}`}
          >
            <div className="flex items-center justify-between border-b border-ivory/15 px-5 py-4 text-ivory sm:px-8">
              <div>
                <p className="text-[0.55rem] uppercase tracking-[0.22em] text-ivory/45">
                  Daily Dham Darshan
                </p>
                <p className="mt-1 font-display text-lg">{current.dateLabel}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close darshan"
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/25 transition-colors duration-500 hover:bg-ivory hover:text-charcoal"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-8 sm:py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous darshan"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 bg-ink/40 text-ivory backdrop-blur transition-colors duration-500 hover:bg-ivory hover:text-charcoal sm:left-8"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next darshan"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 bg-ink/40 text-ivory backdrop-blur transition-colors duration-500 hover:bg-ivory hover:text-charcoal sm:right-8"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="border-t border-ivory/15 px-5 py-5 text-ivory sm:px-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div>
                  <p className="font-display text-xl leading-tight">
                    {current.caption}
                  </p>
                  <p className="mt-1 text-sm font-light text-ivory/50">
                    {current.note}
                  </p>
                </div>
                <p className="shrink-0 text-[0.55rem] uppercase tracking-[0.2em] text-ivory/35">
                  {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(filtered.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
