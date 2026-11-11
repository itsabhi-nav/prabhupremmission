"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { shlokas, shlokaThemes, type ShlokaTheme } from "@/content/shlokas";
import { ShlokaCard } from "@/components/shloka-card";
import { cn } from "@/lib/utils";

const GOAL = 108;

function JapaCounter() {
  const [count, setCount] = useState(0);
  const laps = Math.floor(count / GOAL);
  const withinMala = count % GOAL;
  const progress = withinMala / GOAL;
  const circumference = 2 * Math.PI * 88;

  return (
    <div className="border border-line bg-ivory p-7 text-center sm:p-9">
      <p className="text-[0.54rem] uppercase tracking-[0.24em] text-charcoal/40">
        Japa · माला
      </p>

      <button
        type="button"
        onClick={() => setCount((value) => value + 1)}
        aria-label={`Count one mantra. ${withinMala} of ${GOAL} in this mala.`}
        className="group relative mx-auto mt-6 block h-[196px] w-[196px] rounded-full"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="rgba(36,35,31,0.1)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="var(--color-saffron)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>

        <motion.span
          key={withinMala}
          initial={{ scale: 0.88, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="deva-display pointer-events-none absolute inset-0 grid place-items-center text-[3.4rem] text-charcoal/85 transition-colors duration-500 group-hover:text-saffron"
        >
          ॐ
        </motion.span>
      </button>

      <p className="mt-5 font-display text-2xl tabular-nums">
        {String(withinMala).padStart(3, "0")}
        <span className="text-charcoal/25"> / {GOAL}</span>
      </p>

      <p className="mt-2 text-[0.58rem] uppercase tracking-[0.18em] text-charcoal/35">
        {laps > 0 ? `${laps} mala${laps > 1 ? "s" : ""} complete` : "this mala"}
      </p>

      <button
        type="button"
        onClick={() => setCount(0)}
        className="mt-5 inline-flex items-center gap-2 text-[0.56rem] uppercase tracking-[0.18em] text-charcoal/35 transition-colors duration-500 hover:text-charcoal"
      >
        <RotateCcw className="h-3 w-3" strokeWidth={1.5} />
        Begin again
      </button>
    </div>
  );
}

export function ShlokaExplorer() {
  const [filter, setFilter] = useState<ShlokaTheme | "All">("All");

  const available = useMemo(
    () => shlokaThemes.filter((theme) => shlokas.some((s) => s.theme === theme)),
    [],
  );

  const filtered = useMemo(
    () =>
      filter === "All" ? shlokas : shlokas.filter((s) => s.theme === filter),
    [filter],
  );

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <JapaCounter />

            <div className="mt-10 border-t border-line pt-6">
              <p className="text-[0.54rem] uppercase tracking-[0.22em] text-charcoal/40">
                Read by theme
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["All", ...available] as const).map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setFilter(theme)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-all duration-400",
                      filter === theme
                        ? "border-charcoal bg-charcoal text-ivory"
                        : "border-charcoal/15 text-charcoal/55 hover:border-charcoal/45 hover:text-charcoal",
                    )}
                  >
                    {theme}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-xs font-light leading-relaxed text-charcoal/40">
                {filtered.length} verse{filtered.length > 1 ? "s" : ""} in this
                reading. Open any verse to see it word by word.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-10">
            {filtered.map((shloka) => (
              <ShlokaCard
                key={shloka.id}
                shloka={shloka}
                index={shlokas.indexOf(shloka)}
              />
            ))}
          </div>

          <p className="mt-14 border-t border-line pt-6 text-xs font-light leading-relaxed text-charcoal/40">
            Renderings are working translations prepared for this interface.
            Verify each verse against a published edition before printing or
            distributing them.
          </p>
        </div>
      </div>
    </div>
  );
}
