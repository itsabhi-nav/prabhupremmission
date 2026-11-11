"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  "A general enquiry",
  "Visiting the Dham",
  "Volunteering",
  "Seva & initiatives",
  "Donations",
  "Media & press",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!done) return;
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [done]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Please share your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Please write a little more — it helps us respond well.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <div ref={containerRef}>
      <AnimatePresence mode="wait" initial={false}>
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-line bg-ivory p-7 sm:p-10"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-charcoal text-ivory">
            <Check className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h2 className="mt-6 font-display text-3xl">Your message is with us.</h2>
          <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
            Thank you for writing, {name.split(" ")[0]}. A member of the mission
            will reply to {email} within a few working days. If your message is
            urgent, please call the Dham directly.
          </p>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setName("");
              setEmail("");
              setMessage("");
              setSubject(subjects[0]);
            }}
            className="btn btn-outline mt-7"
          >
            Write another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="border border-line bg-ivory p-6 sm:p-9 lg:p-10"
        >
          <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
            Write to us
          </p>
          <h2 className="mt-2 font-display text-3xl">Begin a conversation</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
                Your name
              </span>
              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                placeholder="Name"
                autoComplete="name"
                className="field"
              />
            </label>

            <label className="block">
              <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
                Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className="field"
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
              What is this about?
            </span>
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="field appearance-none pr-6"
            >
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-6 block">
            <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
              Your message
            </span>
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setError("");
              }}
              rows={5}
              placeholder="Tell us a little about what brings you here…"
              className={cn("field resize-none")}
            />
          </label>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
                className="mt-4 text-xs text-saffron"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-[0.62rem] font-light leading-relaxed text-charcoal/40">
              Your details are used only to reply to you. Nothing is shared or
              published.
            </p>
            <button type="submit" className="btn btn-solid group shrink-0">
              Send the message
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </motion.form>
      )}
      </AnimatePresence>
    </div>
  );
}
