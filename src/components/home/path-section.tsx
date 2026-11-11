"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { pathSection, pathSteps } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";
import { LotusDivider } from "@/components/lotus-divider";
import { Reveal } from "@/components/motion/reveal";

export function PathSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-ivory py-24 md:py-32 lg:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel>{pathSection.eyebrow}</SectionLabel>
              <h2 className="display-2 mt-6 max-w-md text-balance">
                {pathSection.title}
              </h2>
              <p className="body-base mt-5 max-w-sm text-charcoal/55">
                {pathSection.intro}
              </p>
              <p className="mt-8 max-w-sm border-l border-saffron/50 pl-4 text-[0.62rem] font-light leading-relaxed text-charcoal/40">
                {pathSection.source}
              </p>
              <Link
                href={pathSection.cta.href}
                className="group mt-8 inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-charcoal/70 transition-colors duration-500 hover:text-saffron"
              >
                <span className="link-underline pb-1">{pathSection.cta.label}</span>
                <ArrowUpRight
                  className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>

          <div ref={trackRef} className="lg:col-span-7 lg:col-start-6">
            <div className="relative">
              {/* the hairline that draws itself as you read */}
              <div
                aria-hidden
                className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line sm:block"
              />
              <motion.div
                aria-hidden
                style={{ scaleY: lineScale }}
                className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-saffron to-saffron/10 sm:block"
              />

              <ol className="space-y-10 sm:space-y-12">
                {pathSteps.map((step, index) => (
                  <Reveal key={step.number} delay={index * 0.06}>
                    <li className="relative flex gap-6 sm:gap-8">
                      <span className="relative z-10 mt-1 grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full border border-saffron/50 bg-ivory">
                        <span className="h-[5px] w-[5px] rounded-full bg-saffron" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="font-display text-sm italic text-saffron/80">
                            {step.number}
                          </span>
                          <span className="deva-display text-xl text-charcoal/85">
                            {step.deva}
                          </span>
                          <span className="font-display text-2xl leading-none text-charcoal">
                            {step.name}
                          </span>
                          <span className="text-[0.54rem] uppercase tracking-[0.2em] text-charcoal/35">
                            {step.gloss}
                          </span>
                        </div>
                        <p className="body-base mt-2 max-w-lg text-charcoal/55">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="mt-14 flex justify-center">
              <LotusDivider tone="gold" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
