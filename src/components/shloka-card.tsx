"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy } from "lucide-react";
import type { Shloka } from "@/content/shlokas";
import { cn } from "@/lib/utils";

export function ShlokaCard({
  shloka,
  index = 0,
  defaultOpen = false,
}: {
  shloka: Shloka;
  index?: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(
        `${shloka.deva}\n${shloka.iast}\n— ${shloka.source}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="group border-t border-line pt-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[0.8rem] font-medium text-saffron">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[0.8rem] text-charcoal/45">
              {shloka.source}
            </span>
            <span className="text-[0.8rem] text-charcoal/35">
              {shloka.theme}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl leading-tight text-charcoal sm:text-3xl">
            {shloka.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${shloka.title}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-charcoal/15 text-charcoal/45 transition-all duration-500 hover:border-charcoal hover:text-charcoal"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
          ) : (
            <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      <p className="deva-display mt-7 text-[1.7rem] leading-[1.6] text-charcoal/90 sm:text-[2.1rem]">
        {shloka.deva}
      </p>

      <p className="mt-3 font-display text-base italic leading-relaxed text-charcoal/45">
        {shloka.iast}
      </p>

      <div className="mt-6 border-l border-saffron/50 pl-5">
        <p className="body-base text-charcoal/70">{shloka.meaning}</p>
      </div>

      {shloka.note && (
        <p className="mt-5 text-xs font-normal leading-relaxed text-charcoal/40">
          {shloka.note}
        </p>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-6 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.01em] text-charcoal/40 transition-colors duration-500 hover:text-charcoal"
      >
        {open ? "Hide the words" : "Word by word"}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-500",
            open && "rotate-180",
          )}
          strokeWidth={1.5}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
              {shloka.gloss.map((entry, i) => (
                <div key={`${entry.deva}-${i}`} className="flex gap-4">
                  <dt className="min-w-0 flex-1">
                    <span className="deva-display block text-lg text-charcoal/80">
                      {entry.deva}
                    </span>
                    <span className="mt-0.5 block text-[0.72rem] text-charcoal/40">
                      {entry.iast}
                    </span>
                  </dt>
                  <dd className="max-w-[9rem] text-right text-xs font-normal leading-relaxed text-charcoal/55">
                    {entry.gloss}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
