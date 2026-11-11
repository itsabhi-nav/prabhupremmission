"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Initiative } from "@/content/site";
import { cn, formatDate } from "@/lib/utils";

export function InitiativesIndex({ items }: { items: Initiative[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );
  const [active, setActive] = useState("All");

  const filtered = items.filter(
    (item) => active === "All" || item.category === active,
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-4">
        <span className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/35">
          Filter
        </span>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "relative py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500",
              active === category
                ? "text-charcoal"
                : "text-charcoal/40 hover:text-charcoal/80",
            )}
          >
            {category}
            {active === category && (
              <motion.span
                layoutId="initiative-filter"
                className="absolute inset-x-0 -bottom-0.5 h-px bg-saffron"
              />
            )}
          </button>
        ))}
        <span className="ml-auto text-[0.56rem] uppercase tracking-[0.18em] text-charcoal/35">
          {String(filtered.length).padStart(2, "0")} initiatives
        </span>
      </div>

      <motion.div layout className="mt-12 grid gap-x-12 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((initiative, index) => (
            <motion.div
              layout
              key={initiative.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={cn(index % 2 === 1 && "md:mt-20")}
            >
              <Link href={`/initiatives/${initiative.slug}`} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden bg-sand">
                  <Image
                    src={initiative.image}
                    alt={initiative.imageAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="img-warm object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
                  <div>
                    <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                      {initiative.category} · {formatDate(initiative.date)}
                    </p>
                    <h3 className="mt-2 font-display text-3xl transition-colors duration-500 group-hover:text-saffron">
                      {initiative.title}
                    </h3>
                    <p className="mt-2 max-w-[40ch] text-sm font-light leading-relaxed text-charcoal/55">
                      {initiative.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-charcoal/40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-charcoal"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
