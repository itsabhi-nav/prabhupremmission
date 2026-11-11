"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/logo";

const overrideDarkPaths = ["/privacy", "/terms"];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState(pathname);
  const lightHero = !overrideDarkPaths.some((path) => pathname.startsWith(path));
  const solid = scrolled || !lightHero;

  if (pathname !== activePath) {
    setActivePath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          solid
            ? "border-b border-line bg-ivory/92 text-charcoal backdrop-blur-xl"
            : "border-b border-transparent bg-transparent text-ivory",
        )}
      >
        <div className="container-x flex h-[76px] items-center justify-between md:h-[92px]">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="relative z-10 shrink-0 transition-opacity duration-500 hover:opacity-70"
          >
            <Wordmark />
          </Link>

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9"
          >
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative py-2 text-[0.63rem] font-medium uppercase tracking-[0.19em] transition-colors duration-500",
                    active ? "" : "opacity-70 hover:opacity-100",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-4">
            <Link
              href="/donate"
              className={cn(
                "group hidden items-center gap-2.5 rounded-full border px-5 py-2.5 text-[0.63rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 sm:inline-flex",
                solid
                  ? "border-charcoal bg-charcoal text-ivory hover:border-saffron hover:bg-saffron"
                  : "border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
              )}
            >
              Donate
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition-colors duration-500 hover:border-current/60 lg:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-charcoal text-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(120% 80% at 90% 10%, rgba(185,154,99,0.16) 0%, transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(197,139,69,0.12) 0%, transparent 60%)",
              }}
            />
            <div className="container-x relative flex h-[76px] shrink-0 items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} aria-label={site.name}>
                <Wordmark />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors duration-500 hover:border-ivory/60"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="container-x relative flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-6">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.08 + index * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between border-b border-line-light py-4"
                    >
                      <span className="display-2 leading-none transition-colors duration-500 group-hover:text-gold">
                        {item.label}
                      </span>
                      <span className="text-[0.6rem] tracking-[0.2em] text-ivory/40">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mt-10 flex flex-col gap-6 border-t border-line-light pt-6 sm:flex-row sm:items-end sm:justify-between"
              >
                <div className="space-y-1 text-sm font-light text-ivory/60">
                  <p>{site.email}</p>
                  <p>{site.phone}</p>
                  <p className="pt-2 text-[0.6rem] uppercase tracking-[0.2em] text-ivory/35">
                    {site.address.line1} · {site.address.line2}
                  </p>
                </div>
                <Link
                  href="/donate"
                  onClick={() => setOpen(false)}
                  className="btn btn-outline-light w-fit"
                >
                  Offer a contribution
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
