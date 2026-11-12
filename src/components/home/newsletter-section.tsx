import { newsletter } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { SectionLabel } from "@/components/section-heading";

export function NewsletterSection() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-x">
        <Reveal className="grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>{newsletter.eyebrow}</SectionLabel>
            <h2 className="display-2 mt-6 max-w-lg text-balance">
              {newsletter.title}
            </h2>
            <p className="body-base mt-5 max-w-md text-charcoal/60">
              {newsletter.intro}
            </p>
            <p className="mt-5 text-[0.78rem] text-charcoal/45">
              {newsletter.note}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
