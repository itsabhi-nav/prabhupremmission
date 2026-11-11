"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  variant = "light",
  compact = false,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const dark = variant === "dark";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <div className={cn("w-full", compact ? "max-w-md" : "")}>
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex items-start gap-4 border-t py-6",
              dark ? "border-line-light" : "border-line",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full",
                dark ? "bg-gold text-charcoal" : "bg-charcoal text-ivory",
              )}
            >
              <Check className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div>
              <p className={cn("font-display text-2xl", dark ? "text-ivory" : "text-charcoal")}>
                You are on the list.
              </p>
              <p
                className={cn(
                  "mt-1 text-sm font-light leading-relaxed",
                  dark ? "text-ivory/55" : "text-charcoal/60",
                )}
              >
                A quiet letter will find you at the beginning of each month.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className={cn("grid gap-5", compact ? "" : "sm:grid-cols-[1fr_1.2fr_auto]")}>
              <label className="block">
                <span
                  className={cn(
                    "mb-1 block text-[0.58rem] uppercase tracking-[0.22em]",
                    dark ? "text-ivory/40" : "text-charcoal/45",
                  )}
                >
                  Your name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Name"
                  autoComplete="name"
                  className={cn("field", dark && "field-light")}
                />
              </label>

              <label className="block">
                <span
                  className={cn(
                    "mb-1 block text-[0.58rem] uppercase tracking-[0.22em]",
                    dark ? "text-ivory/40" : "text-charcoal/45",
                  )}
                >
                  Email address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(error)}
                  className={cn("field", dark && "field-light")}
                />
              </label>

              <button
                type="submit"
                aria-label="Subscribe to the newsletter"
                className={cn(
                  "group flex h-[3.1rem] items-center justify-center gap-3 self-end rounded-full border px-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-500",
                  dark
                    ? "border-ivory/30 text-ivory hover:border-gold hover:bg-gold hover:text-charcoal"
                    : "border-charcoal bg-charcoal text-ivory hover:border-saffron hover:bg-saffron",
                )}
              >
                Subscribe
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-xs text-saffron"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
