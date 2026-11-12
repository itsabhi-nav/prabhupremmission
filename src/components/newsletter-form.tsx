"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { site } from "@/content/site";
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
                "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[2px]",
                dark ? "bg-gold text-charcoal" : "bg-charcoal text-ivory",
              )}
            >
              <Check className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div>
              <p className={cn("font-display text-2xl", dark ? "text-ivory" : "text-charcoal")}>
                Thank you for your interest.
              </p>
              <p
                className={cn(
                  "mt-1 text-sm font-light leading-relaxed",
                  dark ? "text-ivory/55" : "text-charcoal/60",
                )}
              >
                This preview is not connected to an email list yet. To
                subscribe, please{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline decoration-current/40 underline-offset-4 transition-colors hover:text-saffron"
                >
                  write to the mission
                </a>
                .
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
                    "mb-1 block text-[0.74rem]",
                    dark ? "text-ivory/45" : "text-charcoal/50",
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
                    "mb-1 block text-[0.74rem]",
                    dark ? "text-ivory/45" : "text-charcoal/50",
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
                aria-label="Subscribe to the monthly letter"
                className={cn(
                  "btn self-end",
                  dark ? "btn-outline-light" : "btn-solid",
                )}
              >
                Subscribe
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
