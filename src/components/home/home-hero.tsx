"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[94svh] items-end overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="img-warm object-cover object-[50%_58%]"
        />
        <div className="absolute inset-0 bg-[#181713] opacity-30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0.78)_0%,rgba(8,9,10,0.2)_26%,rgba(8,9,10,0.55)_62%,rgba(8,9,10,0.97)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,10,0.66)_0%,rgba(8,9,10,0.28)_38%,transparent_68%)]" />
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute right-[1vw] top-[12%] hidden select-none font-deva text-[15vw] leading-none text-ivory/[0.07] lg:block"
        lang="sa"
      >
        प्रेम
      </p>

      <div className="container-x relative w-full pb-14 pt-40 md:pb-20">
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="flex items-center gap-4 text-[0.95rem] text-ivory/60"
        >
          <span aria-hidden className="h-px w-10 bg-saffron" />
          <span className="deva-display" lang="sa">
            {hero.sanskrit}
          </span>
        </motion.p>

        <h1 className="display-hero mt-7 max-w-[14ch] text-balance">
          {hero.title.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? { y: 0 } : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.15, delay: 0.2 + index * 0.09, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease }}
          className="mt-10 flex flex-col gap-7 border-t border-ivory/20 pt-6 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-sm text-[0.98rem] font-normal leading-relaxed text-ivory/70">
            {hero.intro}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={hero.primaryCta.href} className="btn btn-light">
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="link-underline text-[0.92rem] text-ivory/75 hover:text-ivory"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
