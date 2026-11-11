"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { hero, principles } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();
  const lines = [
    <span key="1">Discover the path of</span>,
    <span key="2" className="italic text-gold">
      love, wisdom &amp;
    </span>,
    <span key="3">spiritual awakening.</span>,
  ];

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-ivory">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom img-warm object-cover object-[50%_58%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,16,0.62)_0%,rgba(20,19,16,0.16)_32%,rgba(20,19,16,0.52)_72%,rgba(20,19,16,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_60%,rgba(20,19,16,0.55)_0%,transparent_65%)]" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-between pb-8 pt-24 md:pb-10 md:pt-32">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="flex items-start justify-between gap-6 border-t border-ivory/20 pt-4"
        >
          <p className="eyebrow text-ivory/60">{hero.label}</p>
          <p className="hidden text-[0.58rem] uppercase tracking-[0.22em] text-ivory/40 sm:block">
            {hero.note}
          </p>
        </motion.div>

        <div className="pt-8 lg:pt-14">
          <h1 className="display-hero w-full text-[clamp(2.5rem,10.4vw,3.4rem)] sm:text-[clamp(3.4rem,8.4vw,8.8rem)]">
            {lines.map((line, index) => (
              <span
                key={index}
                className="block overflow-hidden pb-[0.06em]"
                aria-hidden={index > 0}
              >
                <motion.span
                  className="block will-change-transform"
                  initial={reduce ? { y: 0 } : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.25, delay: 0.28 + index * 0.11, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="sr-only">
              {hero.title.join(" ")}
            </span>
          </h1>
        </div>

        <div className="mt-6 grid gap-8 border-t border-ivory/20 pt-6 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="hidden lg:col-span-3 lg:block"
          >
            <p className="text-[0.56rem] uppercase tracking-[0.24em] text-ivory/35">
              Guiding principles
            </p>
            <ul className="mt-4 space-y-2">
              {principles.map((principle) => (
                <li
                  key={principle.title}
                  className="flex items-baseline gap-3 text-[0.6rem] uppercase tracking-[0.2em] text-ivory/55"
                >
                  <span className="font-display text-[0.58rem] italic text-gold/70">
                    {principle.number}
                  </span>
                  {principle.title}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="max-w-sm text-sm font-light leading-relaxed text-ivory/70 sm:text-[0.95rem] lg:col-span-4 lg:col-start-5"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease }}
            className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end lg:self-end"
          >
            <Link href={hero.primaryCta.href} className="btn btn-light group">
              {hero.primaryCta.label}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ivory/70 transition-colors duration-500 hover:text-ivory"
            >
              <span className="link-underline pb-1">{hero.secondaryCta.label}</span>
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.15 }}
          className="mt-14 flex items-end justify-between border-t border-ivory/15 pt-5"
        >
          <div className="flex items-center gap-3 text-[0.56rem] uppercase tracking-[0.24em] text-ivory/45">
            <span className="relative block h-8 w-px overflow-hidden bg-ivory/20">
              <span className="animate-scroll-pulse absolute inset-0 block bg-gold" />
            </span>
            Scroll to explore
          </div>
          <div className="hidden items-center gap-2 text-[0.56rem] uppercase tracking-[0.24em] text-ivory/35 sm:flex">
            <ArrowDown className="h-3 w-3" strokeWidth={1.5} />
            Darshan updated each morning
          </div>
        </motion.div>
      </div>

      <p
        aria-hidden
        lang="sa"
        className="absolute right-7 top-1/2 hidden -translate-y-1/2 font-deva text-lg tracking-[0.28em] text-ivory/35 [writing-mode:vertical-rl] xl:block"
      >
        {hero.sanskrit}
      </p>
    </section>
  );
}
