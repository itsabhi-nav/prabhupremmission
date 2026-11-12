import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sankalpaIntro } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { SankalpaGenerator } from "@/components/sankalpa-generator";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Sankalpa",
  description:
    "Write a sankalpa — a private resolve taken before a practice — and print a patra to keep. Prepared entirely in your browser.",
};

const steps = [
  {
    number: "I",
    title: "Name the vow",
    body: "A fast, a japa count, a season of service. Say it plainly, in your own words.",
  },
  {
    number: "II",
    title: "Set the days",
    body: "Eleven, twenty-one, forty or a hundred and eight. A resolve with an end is easier to keep.",
  },
  {
    number: "III",
    title: "Keep the patra",
    body: "Print it, fold it, place it where you will see it. The paper is only a reminder.",
  },
];

export default function SankalpaPage() {
  return (
    <>
      <div className="print:hidden">
        <PageHero
          eyebrow={sankalpaIntro.eyebrow}
          meta={sankalpaIntro.meta}
          title={
            <>
              A vow made quietly,{" "}
              and kept.
            </>
          }
          intro={sankalpaIntro.intro}
          image={sankalpaIntro.image}
          alt={sankalpaIntro.imageAlt}
          imageClassName={sankalpaIntro.imageClassName}
        />
      </div>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:gap-8">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 0.08}
                className="lg:col-span-4"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[0.8rem] font-medium text-saffron/70">
                    {step.number}
                  </span>
                  <div>
                    <h2 className="font-display text-xl text-charcoal">{step.title}</h2>
                    <p className="mt-2 max-w-xs text-[0.82rem] font-normal leading-relaxed text-charcoal/55">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <SectionLabel>The patra</SectionLabel>
            <p className="mt-4 max-w-xl font-display text-2xl leading-snug text-charcoal/80 sm:text-3xl">
              Fill in what you wish to hold yourself to. The patra updates as
              you write.
            </p>
          </div>

          <div className="mt-12">
            <SankalpaGenerator />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-24 print:hidden">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel>Before you begin</SectionLabel>
              <p className="mt-5 max-w-md text-[0.92rem] font-normal leading-relaxed text-charcoal/60">
                {sankalpaIntro.note}
              </p>
            </div>
            <div className="lg:col-span-2" />
            <div className="lg:col-span-5 lg:justify-self-end">
              <Link href="/utsav" className="btn btn-outline group">
                See the festival year
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
