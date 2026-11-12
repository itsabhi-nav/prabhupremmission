"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { featuredVideo, pravachan, site } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Talk = {
  title: string;
  deva?: string;
  duration: string;
  youtubeId: string;
  note?: string;
};

const covered: Talk = {
  title: featuredVideo.title,
  duration: featuredVideo.duration,
  youtubeId: featuredVideo.youtubeId,
  note: featuredVideo.eyebrowMeta,
};

export function VideoSection() {
  const [selected, setSelected] = useState<Talk | null>(null);
  const [playing, setPlaying] = useState(false);

  const active = selected ?? covered;
  const allTalks = pravachan.talks.length ? pravachan.talks : [covered];

  const choose = (talk: Talk) => {
    setSelected(talk);
    setPlaying(false);
  };

  return (
    <section className="bg-charcoal py-24 text-ivory md:py-32 lg:py-36">
      <div className="container-x">
        <div className="border-b border-line-light pb-5">
          <SectionLabel light>Pravachan</SectionLabel>
          <h2 className="display-1 mt-5 max-w-3xl text-balance">
            {featuredVideo.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* player */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink md:aspect-video">
                {playing && active.youtubeId ? (
                  <>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                      title={active.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setPlaying(false)}
                      className="absolute right-3 top-3 z-10 border border-ivory/25 bg-charcoal/70 px-3 py-2 text-[0.7rem] tracking-[0.01em] text-ivory/80 backdrop-blur-md transition-colors hover:bg-charcoal"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    <Image
                      src={featuredVideo.poster}
                      alt={featuredVideo.posterAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="img-warm object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,16,0.18)_0%,transparent_35%,rgba(20,19,16,0.85)_100%)]" />

                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label={`Play ${active.title}`}
                      className="group absolute inset-0 flex items-center justify-center"
                    >
                      <span className="grid h-20 w-20 place-items-center rounded-full border border-ivory/60 bg-charcoal/35 text-ivory shadow-[0_10px_60px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-ivory group-hover:bg-ivory group-hover:text-charcoal sm:h-24 sm:w-24">
                        <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" strokeWidth={1} />
                      </span>
                    </button>

                  </>
                )}

                {!active.youtubeId && playing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/95 px-6 text-center">
                    <p className="text-[0.7rem] tracking-[0.01em] text-gold">
                      Discourse archive
                    </p>
                    <p className="mt-4 max-w-md font-display text-3xl font-normal text-ivory sm:text-4xl">
                      This pravachan will be published here soon.
                    </p>
                    <p className="mt-4 max-w-sm text-sm font-normal leading-relaxed text-ivory/50">
                      The recording is being prepared. The YouTube archive is
                      open to you in the meantime.
                    </p>
                    <a
                      href={site.socials.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-light mt-7"
                    >
                      Visit the channel
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                    <button
                      type="button"
                      onClick={() => setPlaying(false)}
                      className="mt-5 text-[0.7rem] tracking-[0.01em] text-ivory/40 transition-colors hover:text-ivory/70"
                    >
                      Back to the still
                    </button>
                  </div>
                )}
              </div>
            </Reveal>

            <div className="mt-6">
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[0.92rem] text-ivory/65 hover:text-ivory"
              >
                More discourses on YouTube
              </a>
            </div>
          </div>

          {/* the archive */}
          <aside className="lg:col-span-4">
            <p className="eyebrow text-ivory/40">Recent discourses</p>

            <ul className="mt-5 border-t border-line-light">
              {allTalks.map((talk, index) => {
                const isActive = active.title === talk.title;
                return (
                  <li key={talk.title} className="border-b border-line-light">
                    <button
                      type="button"
                      onClick={() => choose(talk)}
                      className={cn(
                        "group flex w-full items-start gap-4 py-4 text-left transition-colors duration-300",
                        isActive ? "" : "opacity-75 hover:opacity-100",
                      )}
                    >
                      <span className="mt-1.5 text-[0.72rem] tabular-nums text-ivory/30">
                        0{index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-[0.95rem] leading-snug transition-colors",
                            isActive ? "text-ivory" : "text-ivory/75",
                          )}
                        >
                          {talk.title}
                        </span>
                        <span className="mt-1.5 block text-[0.78rem] text-ivory/40">
                          {talk.duration}
                          {talk.note ? ` · ${talk.note}` : ""}
                        </span>
                      </span>
                      <Play
                        className={cn(
                          "mt-1 h-3 w-3 shrink-0 fill-current transition-colors",
                          isActive ? "text-saffron" : "text-ivory/20 group-hover:text-ivory/50",
                        )}
                        strokeWidth={1}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-[0.9rem] text-ivory/50 transition-colors duration-300 hover:text-ivory"
            >
              {pravachan.channel.handle}
            </a>
          </aside>

        </div>
      </div>
    </section>
  );
}
