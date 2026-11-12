import Link from "next/link";
import { nav, site } from "@/content/site";
import { AmbientAudio } from "@/components/ambient-audio";
import { Wordmark } from "@/components/logo";

const socials = [
  { label: "YouTube", href: site.socials.youtube },
  { label: "Instagram", href: site.socials.instagram },
  { label: "Facebook", href: site.socials.facebook },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="container-x relative pt-20 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_0.8fr_1.1fr] lg:gap-12">
          <div className="max-w-sm">
            <Link href="/" aria-label={site.name} className="inline-block">
              <Wordmark />
            </Link>
            <p className="mt-6 text-sm font-normal leading-relaxed text-ivory/55">
              A spiritual and humanitarian mission devoted to bhakti, selfless
              service and the quiet transformation of everyday life.
            </p>
            <p className="mt-7 font-deva text-lg text-gold/80" lang="sa">
              ॥ श्री राधारमण ॥
            </p>
          </div>

          <div>
            <p className="text-[0.8rem] text-ivory/35">Explore</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {[
                ...nav,
                { label: "Sankalpa", href: "/sankalpa" },
                { label: "Donate", href: "/donate" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] font-normal text-ivory/65 transition-colors duration-300 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.8rem] text-ivory/35">Visit &amp; write</p>
            <address className="mt-5 space-y-4 text-sm font-normal not-italic leading-relaxed text-ivory/65">
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
                  className="transition-colors duration-300 hover:text-ivory"
                >
                  {site.email}
                </a>
                <br />
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="transition-colors duration-300 hover:text-ivory"
                >
                  {site.phone}
                </a>
              </p>
              <p className="text-ivory/40">Darshan daily · 5:00 am – 8:00 pm</p>
            </address>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.88rem] font-normal text-ivory/50 transition-colors duration-300 hover:text-ivory"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-light py-6 text-[0.8rem] text-ivory/35 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p>{site.legal.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-ivory">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-ivory">
              Terms
            </Link>
            <AmbientAudio placement="up" label />
          </div>
        </div>
      </div>
    </footer>
  );
}
