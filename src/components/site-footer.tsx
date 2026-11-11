import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/content/site";
import { Wordmark } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";

const socials = [
  { label: "YouTube", href: site.socials.youtube },
  { label: "Instagram", href: site.socials.instagram },
  { label: "Facebook", href: site.socials.facebook },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 85% 0%, rgba(185,154,99,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="container-x relative pt-20 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_1fr_1.4fr] lg:gap-10">
          <div className="max-w-sm">
            <Link href="/" aria-label={site.name} className="inline-block">
              <Wordmark />
            </Link>
            <p className="mt-6 text-sm font-light leading-relaxed text-ivory/55">
              A spiritual and humanitarian mission devoted to bhakti, selfless
              service and the quiet transformation of everyday life.
            </p>
            <p className="mt-7 font-deva text-lg text-gold/80" lang="sa">
              ॥ श्री राधारमण ॥
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-[0.62rem] uppercase tracking-[0.18em] text-ivory/55 transition-colors duration-500 hover:text-ivory"
                >
                  {social.label}
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.24em] text-ivory/35">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {[...nav.slice(1), { label: "Donate", href: "/donate" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm font-light text-ivory/65 transition-colors duration-500 hover:text-ivory"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-3" />
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.24em] text-ivory/35">
              Visit &amp; write
            </p>
            <address className="mt-5 space-y-3 text-sm font-light not-italic leading-relaxed text-ivory/65">
              <p>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.country}
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors duration-500 hover:text-ivory"
                >
                  {site.email}
                </a>
                <br />
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="transition-colors duration-500 hover:text-ivory"
                >
                  {site.phone}
                </a>
              </p>
              <p className="text-ivory/40">Darshan daily · 5:00 am – 8:00 pm</p>
            </address>
          </div>

          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.24em] text-ivory/35">
              A monthly letter
            </p>
            <p className="mt-5 font-display text-2xl leading-tight text-ivory/90">
              Wisdom, delivered quietly.
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-ivory/45">
              Reflections, teachings and news from the mission, once a month.
            </p>
            <div className="mt-6">
              <NewsletterForm variant="dark" compact />
            </div>
          </div>
        </div>

        <div aria-hidden className="mt-16 select-none overflow-hidden md:mt-24">
          <p className="-mb-[0.12em] whitespace-nowrap font-display text-[16vw] font-light leading-[0.8] tracking-[-0.04em] text-ivory/[0.07]">
            Prabhu Prem
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-line-light py-7 text-[0.6rem] uppercase tracking-[0.16em] text-ivory/35 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.legal.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors duration-500 hover:text-ivory">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-500 hover:text-ivory">
              Terms
            </Link>
            <span className="hidden h-3 w-px bg-ivory/15 sm:block" />
            <span className="normal-case tracking-[0.08em] text-ivory/30">
              In loving service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
