import { newsletter } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/motion/reveal";
import { LogoMark } from "@/components/logo";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ivory py-24 md:py-32 lg:py-40">
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-6 select-none font-deva text-[24rem] leading-none text-charcoal/[0.03]"
      >
        प्रेम
      </p>

      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionLabel>08 — A Monthly Letter</SectionLabel>
          <Reveal>
            <h2 className="display-1 mt-5 max-w-[15ch] text-balance">
              {newsletter.title}
            </h2>
            <p className="body-lg mt-6 max-w-md text-charcoal/60">
              {newsletter.intro}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          <Reveal delay={0.1}>
            <div className="flex items-center justify-between border-t border-charcoal/20 pt-5">
              <LogoMark className="h-7 w-7 text-saffron" />
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                Once a month · From the Dham
              </p>
            </div>

            <div className="mt-8">
              <NewsletterForm />
            </div>

            <p className="mt-5 text-[0.62rem] font-light tracking-wide text-charcoal/40">
              {newsletter.note}
            </p>

            <div className="mt-10 space-y-2 border-t border-line pt-6">
              <p className="font-display text-lg italic text-charcoal/60">
                &ldquo;Let the mind grow quiet enough to hear what has always
                been speaking.&rdquo;
              </p>
              <p className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/35">
                A reflection from the mission
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
