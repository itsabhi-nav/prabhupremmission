import Image from "next/image";
import Link from "next/link";
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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,12,0.96)_0%,rgba(18,16,12,0.86)_42%,rgba(18,16,12,0.3)_74%,rgba(18,16,12,0.55)_100%)]" />
      <div className="absolute inset-0 bg-charcoal/40 md:bg-transparent" />

      <div className="container-x relative py-24 md:py-32 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel light>Support the Mission</SectionLabel>
              <h2 className="display-1 mt-5 max-w-[13ch] text-balance">
                {donation.title}
              </h2>
              <p className="body-lg mt-6 max-w-lg text-ivory/60">
                {donation.intro}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={donation.cta.href} variant="light">
                  {donation.cta.label}
                </ButtonLink>
                <Link
                  href={donation.secondary.href}
                  className="link-underline pb-1 text-[0.92rem] text-ivory/65 hover:text-ivory"
                >
                  {donation.secondary.label}
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <Reveal delay={0.15} className="border-t border-line-light">
              {donation.trust.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-line-light py-5"
                >
                  <h3 className="text-sm font-normal text-ivory/90">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-normal leading-relaxed text-ivory/45">
                    {item.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
