import Image from "next/image";
import { guidance } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/buttons";

export function GuidanceSection() {
  return (
    <section
      id="guidance"
      className="relative overflow-hidden bg-charcoal py-24 text-ivory md:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 20%, rgba(197,139,69,0.13) 0%, transparent 60%), radial-gradient(60% 50% at 10% 90%, rgba(185,154,99,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-x relative">
        <div className="mb-14 flex items-center justify-between border-b border-line-light pb-4">
          <SectionLabel light>02 — Spiritual Guidance</SectionLabel>
          <p className="hidden text-[0.58rem] uppercase tracking-[0.22em] text-ivory/30 sm:block">
            Gurudev · Swami Radharaman Ji
          </p>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="relative lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -bottom-5 -right-5 h-full w-full border border-gold/30"
              />
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
                <Image
                  src={guidance.image}
                  alt={guidance.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="img-warm-deep object-cover object-[50%_35%] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,16,0.05)_0%,transparent_55%,rgba(20,19,16,0.6)_100%)]" />
                <p className="absolute bottom-5 left-5 right-5 text-[0.55rem] uppercase leading-relaxed tracking-[0.18em] text-ivory/50">
                  {guidance.imageCaption}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pl-8">
            <Reveal delay={0.12}>
              <h2 className="display-1 text-balance">{guidance.title}</h2>

              <div className="mt-8 space-y-6">
                {guidance.body.map((paragraph) => (
                  <p key={paragraph} className="body-lg text-ivory/60">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 border-y border-line-light py-8">
                <p
                  className="font-deva text-3xl leading-snug text-gold sm:text-4xl"
                  lang="sa"
                >
                  {guidance.quote}
                </p>
                <p className="mt-3 text-[0.6rem] uppercase tracking-[0.22em] text-ivory/40">
                  {guidance.quoteTranslation}
                </p>
              </div>

              <div className="mt-9">
                <ArrowLink href={guidance.cta.href} light>
                  {guidance.cta.label}
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
