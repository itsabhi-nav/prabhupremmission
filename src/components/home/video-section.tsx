"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import { featuredVideo } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function VideoSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="bg-charcoal py-24 text-ivory md:py-32 lg:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 border-b border-line-light pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel light>05 — Pravachan</SectionLabel>
            <h2 className="display-1 mt-5 max-w-3xl text-balance">
              {featuredVideo.title}
            </h2>
          </div>
          <p className="shrink-0 text-[0.58rem] uppercase tracking-[0.22em] text-ivory/40">
            {featuredVideo.eyebrowMeta}
          </p>
        </div>

        <Reveal className="mt-12">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative block aspect-[16/10] w-full overflow-hidden bg-ink text-left md:aspect-[16/8.4]"
            aria-label={`Play ${featuredVideo.title}`}
          >
            <Image
              src={featuredVideo.poster}
              alt={featuredVideo.posterAlt}
              fill
              sizes="100vw"
              className="img-warm object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,16,0.18)_0%,transparent_35%,rgba(20,19,16,0.82)_100%)]" />

            <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory/60 bg-charcoal/35 text-ivory shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-ivory group-hover:bg-ivory group-hover:text-charcoal sm:h-24 sm:w-24">
              <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" strokeWidth={1} />
            </span>

            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8 md:p-10">
              <div>
                <p className="text-[0.56rem] uppercase tracking-[0.24em] text-ivory/50">
                  {featuredVideo.eyebrow}
                </p>
                <p className="mt-3 max-w-xl font-display text-2xl leading-tight sm:text-3xl">
                  {featuredVideo.description}
                </p>
              </div>
              <span className="shrink-0 text-[0.58rem] uppercase tracking-[0.2em] text-ivory/45">
                {featuredVideo.duration}
              </span>
            </div>
          </button>
        </Reveal>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.58rem] uppercase tracking-[0.2em] text-ivory/30">
            Recorded at the Dham · New discourses added regularly
          </p>
          <a
            href={featuredVideo.channel}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ivory/60 transition-colors duration-500 hover:text-ivory"
          >
            <span className="link-underline pb-1">Watch more on YouTube</span>
            <ArrowUpRight
              className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label={featuredVideo.title}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/25 text-ivory transition-colors duration-500 hover:bg-ivory hover:text-charcoal sm:right-8 sm:top-8"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-charcoal">
                {featuredVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeId}?autoplay=1&rel=0`}
                    title={featuredVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <>
                    <Image
                      src={featuredVideo.poster}
                      alt=""
                      fill
                      sizes="90vw"
                      className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      <p className="text-[0.58rem] uppercase tracking-[0.24em] text-gold">
                        Discourse archive
                      </p>
                      <p className="mt-4 max-w-md font-display text-3xl font-light text-ivory sm:text-4xl">
                        This pravachan will be published here soon.
                      </p>
                      <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-ivory/50">
                        The mission&apos;s latest discourse is being prepared. In
                        the meantime, the YouTube archive is open to you.
                      </p>
                      <a
                        href={featuredVideo.channel}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-light mt-7"
                      >
                        Visit the channel
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-5 flex items-start justify-between gap-6 text-ivory">
                <div>
                  <p className="text-[0.56rem] uppercase tracking-[0.22em] text-ivory/40">
                    {featuredVideo.eyebrow}
                  </p>
                  <p className="mt-2 font-display text-xl">{featuredVideo.title}</p>
                </div>
                <p className="hidden text-[0.56rem] uppercase tracking-[0.2em] text-ivory/35 sm:block">
                  {featuredVideo.duration}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
