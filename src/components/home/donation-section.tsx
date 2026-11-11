import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { donation } from "@/content/site";
import { SectionLabel } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/buttons";

export function DonationSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory">
      <Image
        src={donation.image}
        alt={donation.imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,16,0.97)_0%,rgba(20,19,16,0.9)_38%,rgba(20,19,16,0.35)_72%,rgba(20,19,16,0.55)_100%)]" />
      <div className="absolute inset-0 bg-charcoal/40 md:bg-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,16,0.5)_0%,transparent_40%,rgba(20,19,16,0.6)_100%)]" />

      <div className="container-x relative py-24 md:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel light>07 — Support the Mission</SectionLabel>
            <Reveal>
              <h2 className="display-1 mt-5 max-w-[13ch] text-balance">
                {donation.title}
              </h2>
              <p className="body-lg mt-6 max-w-lg text-ivory/60">
                {donation.intro}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink href={donation.cta.href} variant="light">
                  {donation.cta.label}
                </ButtonLink>
                <Link
                  href={donation.secondary.href}
                  className="group inline-flex items-center gap-2 px-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ivory/60 transition-colors duration-500 hover:text-ivory"
                >
                  <span className="link-underline pb-1">{donation.secondary.label}</span>
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <Reveal delay={0.15} className="border-t border-line-light">
              {donation.trust.map((item) => (
                <div
                  key={item.title}
                  className="group border-b border-line-light py-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    <div>
                      <h3 className="text-sm font-normal text-ivory/90">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-light leading-relaxed text-ivory/45">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
