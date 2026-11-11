import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/logo";

const links = [
  { label: "The mission", href: "/about" },
  { label: "Our initiatives", href: "/initiatives" },
  { label: "Daily Darshan", href: "/darshan" },
  { label: "Write to us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 80% 10%, rgba(185,154,99,0.14) 0%, transparent 55%), radial-gradient(70% 60% at 0% 100%, rgba(197,139,69,0.1) 0%, transparent 60%)",
        }}
      />
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-16 right-0 select-none font-display text-[34vw] leading-[0.7] tracking-[-0.05em] text-ivory/[0.035]"
      >
        404
      </p>

      <div className="container-x relative py-32">
        <div className="flex items-center justify-between gap-6 border-t border-ivory/20 pt-4">
          <p className="eyebrow text-ivory/50">A wrong turn</p>
          <p className="text-[0.56rem] uppercase tracking-[0.22em] text-ivory/30">
            Prabhu Prem Mission
          </p>
        </div>

        <div className="mt-16 max-w-3xl">
          <LogoMark className="h-10 w-10 text-gold" />
          <h1 className="display-1 mt-8 text-balance">
            This path is quiet.{" "}
            <span className="italic text-gold">Perhaps it is elsewhere.</span>
          </h1>
          <p className="body-lg mt-6 max-w-lg text-ivory/55">
            The page you were looking for is not here — it may have moved, or it
            may not have been written yet. These doors are open, though.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ivory/65 transition-colors duration-500 hover:text-ivory"
              >
                <span className="link-underline pb-1">{link.label}</span>
                <ArrowUpRight
                  className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            ))}
          </div>

          <Link href="/" className="btn btn-light group mt-12">
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
