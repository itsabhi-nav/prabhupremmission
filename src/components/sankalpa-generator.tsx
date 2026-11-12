"use client";

import { useMemo, useState } from "react";
import { Printer, RotateCcw } from "lucide-react";
import { shlokaById } from "@/content/shlokas";
import { cn } from "@/lib/utils";

const intents = [
  {
    id: "japa",
    label: "A daily japa",
    deva: "जप",
    vow: "I will sit for japa each morning, before the world finds me, and finish the count I have taken.",
  },
  {
    id: "fast",
    label: "A fast",
    deva: "व्रत",
    vow: "I will keep a simple fast, eat with restraint, and remember why the body was quieted.",
  },
  {
    id: "seva",
    label: "A season of service",
    deva: "सेवा",
    vow: "I will offer my hands in service — regularly, cheerfully, and without waiting to be asked.",
  },
  {
    id: "study",
    label: "A study of scripture",
    deva: "स्वाध्याय",
    vow: "I will read a little each day, slowly, and let what I read change the way I live.",
  },
  {
    id: "shanti",
    label: "A quieter mind",
    deva: "शांति",
    vow: "I will keep a still half-hour each day, without a screen, and return to the breath.",
  },
  {
    id: "gratitude",
    label: "A practice of gratitude",
    deva: "कृतज्ञता",
    vow: "Each night I will name what was given to me, and give something back before I sleep.",
  },
];

const durations = [11, 21, 40, 108];

export function SankalpaGenerator() {
  const [name, setName] = useState("");
  const [gotra, setGotra] = useState("");
  const [city, setCity] = useState("");
  const [intent, setIntent] = useState(intents[0].id);
  const [customVow, setCustomVow] = useState("");
  const [days, setDays] = useState(21);
  const [start, setStart] = useState(() => new Date().toISOString().slice(0, 10));

  const verse = shlokaById("gita-65");

  const chosen = intents.find((item) => item.id === intent) ?? intents[0];
  const vow = customVow.trim() || chosen.vow;

  const dates = useMemo(() => {
    const from = new Date(`${start}T12:00:00Z`);
    if (Number.isNaN(from.getTime())) return { begin: "—", end: "—", deva: "—" };
    const to = new Date(from.getTime() + (days - 1) * 86400000);
    const fmt = (date: Date) =>
      new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
    const devaFmt = (date: Date) =>
      new Intl.DateTimeFormat("hi-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
    return { begin: fmt(from), end: fmt(to), deva: devaFmt(from) };
  }, [start, days]);

  const ready = name.trim().length > 0;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      {/* form */}
      <div className="print:hidden lg:col-span-5">
        <div className="space-y-7">
          <div>
            <label
              htmlFor="sankalpa-name"
              className="text-[0.7rem] tracking-[0.01em] text-charcoal/45"
            >
              Your name
            </label>
            <input
              id="sankalpa-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="The name you are called by"
              autoComplete="name"
              className="mt-2 w-full border-b border-line bg-transparent pb-3 font-display text-2xl text-charcoal outline-none transition-colors placeholder:text-charcoal/25 focus:border-saffron"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="sankalpa-gotra"
                className="text-[0.7rem] tracking-[0.01em] text-charcoal/45"
              >
                Gotra <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="sankalpa-gotra"
                value={gotra}
                onChange={(event) => setGotra(event.target.value)}
                placeholder="Kashyapa"
                className="mt-2 w-full border-b border-line bg-transparent pb-2.5 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-charcoal/25 focus:border-saffron"
              />
            </div>
            <div>
              <label
                htmlFor="sankalpa-city"
                className="text-[0.7rem] tracking-[0.01em] text-charcoal/45"
              >
                City
              </label>
              <input
                id="sankalpa-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Where you sit"
                autoComplete="address-level2"
                className="mt-2 w-full border-b border-line bg-transparent pb-2.5 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-charcoal/25 focus:border-saffron"
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-[0.7rem] tracking-[0.01em] text-charcoal/45">
              The resolve
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {intents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIntent(item.id)}
                  aria-pressed={intent === item.id}
                  className={cn(
                    "flex flex-col items-start gap-1 border px-3 py-3 text-left transition-all duration-300",
                    intent === item.id
                      ? "border-saffron bg-saffron/10"
                      : "border-line hover:border-charcoal/30",
                  )}
                >
                  <span className="font-deva text-sm text-saffron/80" lang="sa">
                    {item.deva}
                  </span>
                  <span className="text-[0.8rem] leading-snug text-charcoal/70">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="sankalpa-vow"
              className="text-[0.7rem] tracking-[0.01em] text-charcoal/45"
            >
              In your own words <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              id="sankalpa-vow"
              value={customVow}
              onChange={(event) => setCustomVow(event.target.value)}
              rows={3}
              maxLength={240}
              placeholder={chosen.vow}
              className="mt-2 w-full resize-none border border-line bg-transparent p-3 text-[0.9rem] font-normal leading-relaxed text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-saffron"
            />
            <p className="mt-1 text-right text-[0.7rem] tabular-nums text-charcoal/30">
              {customVow.length}/240
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <span className="text-[0.7rem] tracking-[0.01em] text-charcoal/45">
                For how long
              </span>
              <div className="mt-3 flex gap-2">
                {durations.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDays(value)}
                    aria-pressed={days === value}
                    className={cn(
                      "flex-1 border py-2 text-[0.8rem] tabular-nums transition-colors duration-300",
                      days === value
                        ? "border-charcoal bg-charcoal text-ivory"
                        : "border-line text-charcoal/60 hover:border-charcoal/40",
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="sankalpa-start"
                className="text-[0.7rem] tracking-[0.01em] text-charcoal/45"
              >
                Beginning
              </label>
              <input
                id="sankalpa-start"
                type="date"
                value={start}
                onChange={(event) => setStart(event.target.value)}
                className="mt-2 w-full border-b border-line bg-transparent pb-2.5 text-[0.9rem] text-charcoal outline-none transition-colors focus:border-saffron"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <button
              type="button"
              onClick={() => window.print()}
              disabled={!ready}
              className="btn btn-solid group disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Printer className="h-3.5 w-3.5" strokeWidth={1.5} />
              Print / save as PDF
            </button>
            <button
              type="button"
              onClick={() => {
                setName("");
                setGotra("");
                setCity("");
                setCustomVow("");
                setIntent(intents[0].id);
                setDays(21);
                setStart(new Date().toISOString().slice(0, 10));
              }}
              className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.01em] text-charcoal/50 transition-colors hover:text-charcoal"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Begin again
            </button>
          </div>
          {!ready && (
            <p className="text-[0.8rem] text-charcoal/40">
              Add your name to prepare the patra for printing.
            </p>
          )}
        </div>
      </div>

      {/* the patra */}
      <div className="lg:col-span-7 lg:col-start-6">
        <div
          id="sankalpa-patra"
          className="relative overflow-hidden border border-gold/45 bg-[#fbf8f0] px-6 py-10 text-charcoal shadow-[0_30px_80px_-50px_rgba(73,58,43,0.5)] sm:px-10 sm:py-14"
        >
          {/* printed rules and ornaments */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-3 border border-gold/25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 text-gold opacity-[0.07]"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72">
              <YantraMark />
            </div>
          </div>

          <div className="relative text-center">
            <p className="font-deva text-lg tracking-[0.12em] text-saffron" lang="sa">
              ॥ संकल्प पत्र ॥
            </p>
            <p className="mt-2 text-[0.75rem] tracking-[0.01em] text-charcoal/45">
              Prabhu Prem Mission · Vrindavan
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold/40" />
              <span className="h-1 w-1 rotate-45 bg-gold/60" />
              <span className="h-px w-10 bg-gold/40" />
            </div>
          </div>

          <div className="relative mt-9 space-y-5 text-center">
            <p className="text-[0.8rem] tracking-[0.01em] text-charcoal/40">
              On {dates.begin}
            </p>

            <p className="font-display text-[1.55rem] leading-snug sm:text-[1.9rem]">
              I,{" "}
              <span className="italic text-brown">
                {name.trim() || "your name"}
              </span>
              {gotra.trim() && (
                <>
                  , of the <span className="italic text-brown">{gotra.trim()}</span>{" "}
                  gotra
                </>
              )}
              {city.trim() && (
                <>
                  , sitting in <span className="italic text-brown">{city.trim()}</span>
                </>
              )}
              , hold this resolve:
            </p>

            <p className="mx-auto max-w-[34rem] font-display text-xl leading-relaxed text-charcoal/85 sm:text-2xl">
              “{vow}”
            </p>

            <p className="text-[0.8rem] tracking-[0.01em] text-charcoal/50">
              For {days} days · {dates.begin} — {dates.end}
            </p>
          </div>

          {verse && (
            <div className="relative mt-10 border-t border-gold/25 pt-8 text-center">
              <p
                className="deva-display text-lg leading-relaxed text-charcoal/80 sm:text-xl"
                lang="sa"
              >
                {verse.deva}
              </p>
              <p className="mt-4 text-[0.8rem] tracking-[0.01em] text-charcoal/35">
                {verse.source}
              </p>
              <p className="mx-auto mt-3 max-w-md text-[0.82rem] font-normal italic leading-relaxed text-charcoal/55">
                {verse.meaning}
              </p>
            </div>
          )}

          <div className="relative mt-10 flex items-end justify-between gap-6 pt-6">
            <div className="flex-1">
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/35">
                Sankalpa
              </p>
              <div className="mt-8 border-b border-charcoal/25" />
              <p className="mt-2 text-[0.8rem] text-charcoal/45">
                {name.trim() || "—"}
              </p>
            </div>

            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-saffron/40 text-saffron/70">
              <div className="text-center">
                <p className="font-deva text-xl leading-none" lang="sa">
                  श्री
                </p>
                <p className="mt-1 text-[0.7rem] tracking-[0.01em]">
                  Dham
                </p>
              </div>
            </div>

            <div className="flex-1 text-right">
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/35">
                Date
              </p>
              <div className="mt-8 border-b border-charcoal/25" />
              <p className="mt-2 font-deva text-[0.78rem] text-charcoal/50" lang="hi">
                {dates.deva}
              </p>
            </div>
          </div>

          <p className="relative mt-8 text-center text-[0.75rem] tracking-[0.01em] text-charcoal/30">
            A private resolve · Not a substitute for ritual instruction
          </p>
        </div>

        <p className="mt-4 max-w-md text-[0.8rem] font-normal leading-relaxed text-charcoal/40">
          The patra is prepared in your browser. Your name and resolve are not
          sent anywhere, and nothing is stored on our servers.
        </p>
      </div>
    </div>
  );
}

function YantraMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden className="h-full w-full">
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeOpacity="0.5" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="2 6" />
      {Array.from({ length: 24 }, (_, i) => (
        <line
          key={i}
          x1="100"
          y1="6"
          x2="100"
          y2="16"
          stroke="currentColor"
          strokeOpacity="0.4"
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}
      <rect
        x="46"
        y="46"
        width="108"
        height="108"
        stroke="currentColor"
        strokeOpacity="0.35"
        transform="rotate(45 100 100)"
      />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="2" fill="currentColor" />
    </svg>
  );
}
