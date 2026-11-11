import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactPage, site } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { SectionLabel } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to Prabhu Prem Mission, plan a visit to the Dham, or ask about volunteering and seva.",
};

const socials = [
  { label: "YouTube", href: site.socials.youtube, handle: "@prabhupremmission" },
  { label: "Instagram", href: site.socials.instagram, handle: "@prabhupremmission" },
  { label: "Facebook", href: site.socials.facebook, handle: "/prabhupremmission" },
];

const enquiries = [
  {
    title: "Plan a visit",
    body: "The Dham is open daily. Write ahead if you would like to join a morning aarti or stay for a meal.",
  },
  {
    title: "Volunteer",
    body: "Tell us what you can offer — time, skills, or simply willingness. We will find a place for you.",
  },
  {
    title: "Press & media",
    body: "For interviews, photographs or permissions, write to us with your deadline and outlet.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        meta="Vrindavan · India"
        title={
          <>
            Come, <span className="italic text-gold">sit with us.</span>
          </>
        }
        intro={contactPage.intro}
        image={contactPage.image}
        alt={contactPage.imageAlt}
        imageClassName="object-[50%_45%]"
      />

      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionLabel>Send a message</SectionLabel>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-charcoal/20 pt-5">
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                The Dham
              </p>
            </div>

            <div className="mt-2 space-y-5">
              <div className="flex items-start gap-4 border-b border-line py-5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-charcoal/85">
                    {site.address.line1}
                  </p>
                  <p className="mt-1 text-xs font-light leading-relaxed text-charcoal/50">
                    {site.address.line2}
                    <br />
                    {site.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-line pb-5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron" strokeWidth={1.5} />
                <div>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-charcoal/85 transition-colors duration-500 hover:text-saffron"
                  >
                    {site.email}
                  </a>
                  <p className="mt-1 text-xs font-light text-charcoal/45">
                    For general enquiries
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-line pb-5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" strokeWidth={1.5} />
                <div>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="text-sm text-charcoal/85 transition-colors duration-500 hover:text-saffron"
                  >
                    {site.phone}
                  </a>
                  <p className="mt-1 text-xs font-light text-charcoal/45">
                    Placeholder number
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-saffron" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-charcoal/85">{contactPage.hours}</p>
                  <p className="mt-1 text-xs font-light text-charcoal/45">
                    Aarti · 5:30 am &amp; 6:30 pm (placeholder)
                  </p>
                </div>
              </div>
            </div>

            <Reveal className="mt-8 border-t border-line pt-5" delay={0.08}>
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                Follow the mission
              </p>
              <ul className="mt-4 space-y-2.5">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 text-sm text-charcoal/70 transition-colors duration-500 hover:text-charcoal"
                    >
                      <span>{social.label}</span>
                      <span className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.14em] text-charcoal/35">
                        {social.handle}
                        <ArrowUpRight
                          className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-5">
              <SectionLabel>Before you write</SectionLabel>
              <h2 className="display-2 mt-6 max-w-md text-balance">
                A few doors you might be looking for.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border-t border-charcoal/20">
                {enquiries.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-charcoal/15 py-5"
                  >
                    <h3 className="text-sm font-normal text-charcoal/90">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-xs font-light leading-relaxed text-charcoal/55">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Reveal className="relative mt-14 overflow-hidden">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal sm:aspect-[21/8]">
              <Image
                src="/images/ghat.jpg"
                alt="Boats and temple towers along the river at Varanasi"
                fill
                sizes="100vw"
                className="img-warm object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,16,0.25)_0%,rgba(20,19,16,0.55)_100%)]" />
              <div className="absolute inset-0 flex flex-col items-start justify-between p-6 sm:p-9">
                <span className="flex items-center gap-2 bg-ivory/90 px-3 py-2 text-[0.52rem] uppercase tracking-[0.2em] text-charcoal/70 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                  Vrindavan, Uttar Pradesh
                </span>
                <div className="max-w-md text-ivory">
                  <p className="font-display text-2xl leading-tight sm:text-3xl">
                    The mission sits a short walk from the old town.
                  </p>
                  <p className="mt-2 text-xs font-light leading-relaxed text-ivory/60">
                    {contactPage.mapNote}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-ivory md:py-28">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <SectionLabel light>Or simply arrive</SectionLabel>
            <h2 className="display-2 mt-6 max-w-xl text-balance">
              The door is open, <span className="italic text-gold">as you are.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/darshan" className="btn btn-light group">
              Daily Darshan
            </Link>
            <Link href="/donate" className="btn btn-outline-light group">
              Support the seva
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
