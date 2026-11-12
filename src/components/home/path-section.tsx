import { pathSection, pathSteps } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/buttons";

export function PathSection() {
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
              <p className="mt-8 max-w-sm text-[0.82rem] font-normal leading-relaxed text-charcoal/40">
                {pathSection.source}
              </p>
              <div className="mt-8">
                <ArrowLink href={pathSection.cta.href}>
                  {pathSection.cta.label}
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="border-t border-line">
              {pathSteps.map((step, index) => (
                <Reveal key={step.number} delay={index * 0.06}>
                  <li className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                    <span className="font-display text-[2.1rem] leading-[0.9] text-saffron tabular-nums">
                      {step.number}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="deva-display text-xl text-charcoal/80" lang="sa">
                          {step.deva}
                        </span>
                        <span className="font-display text-[1.55rem] leading-none text-charcoal">
                          {step.name}
                        </span>
                        <span className="text-[0.82rem] text-charcoal/40">
                          {step.gloss}
                        </span>
                      </div>
                      <p className="mt-2.5 max-w-lg text-[0.95rem] font-normal leading-relaxed text-charcoal/60">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
