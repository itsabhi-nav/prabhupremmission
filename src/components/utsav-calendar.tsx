"use client";

import { useMemo, useState } from "react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarEntry = {
  id: string;
  name: string;
  deva: string;
  iso: string;
  tithi?: string;
  note?: string;
  kind: "festival" | "observance";
};

type Year = {
  year: number;
  festivals: CalendarEntry[];
  observances: CalendarEntry[];
};

const monthShort = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

const monthLong = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { month: "long", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

const weekday = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { weekday: "short", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

function icsFor(year: number, festivals: CalendarEntry[]) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Prabhu Prem Mission//Utsav//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:Prabhu Prem Mission — Utsav ${year}`,
  ];
  for (const f of festivals) {
    const start = f.iso.replace(/-/g, "");
    const next = new Date(`${f.iso}T12:00:00Z`);
    next.setUTCDate(next.getUTCDate() + 1);
    const end = next.toISOString().slice(0, 10).replace(/-/g, "");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${f.id}@prabhupremmission.org`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${f.name} — Prabhu Prem Mission`,
      `DESCRIPTION:${f.tithi ?? ""}${f.note ? ` — ${f.note}` : ""}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function UtsavCalendar({
  years,
  highlightId,
}: {
  years: Year[];
  highlightId?: string;
}) {
  const [activeYear, setActiveYear] = useState(years[0]?.year ?? new Date().getFullYear());
  const active = years.find((item) => item.year === activeYear) ?? years[0];

  const grouped = useMemo(() => {
    if (!active) return [];
    const groups: { label: string; entries: CalendarEntry[] }[] = [];
    for (const entry of active.festivals) {
      const label = `${monthLong(entry.iso)} ${entry.iso.slice(0, 4)}`;
      const group = groups[groups.length - 1];
      if (group && group.label === label) group.entries.push(entry);
      else groups.push({ label, entries: [entry] });
    }
    return groups;
  }, [active]);

  const download = () => {
    if (!active) return;
    const blob = new Blob([icsFor(active.year, active.festivals)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `prabhu-prem-utsav-${active.year}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Year">
          {years.map((item) => (
            <button
              key={item.year}
              type="button"
              role="tab"
              aria-selected={item.year === activeYear}
              onClick={() => setActiveYear(item.year)}
              className={cn(
                "rounded-[2px] border px-4 py-2 text-[0.85rem] transition-colors duration-300",
                item.year === activeYear
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-line text-charcoal/60 hover:border-charcoal/40 hover:text-charcoal",
              )}
            >
              {item.year}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={download}
          className="group inline-flex items-center gap-2 text-[0.7rem] tracking-[0.01em] text-charcoal/55 transition-colors duration-300 hover:text-charcoal"
        >
          <ArrowDownToLine className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="link-underline pb-1">Add the year to your calendar</span>
        </button>
      </div>

      <div className="mt-2">
        {grouped.map((group) => (
          <div key={group.label} className="grid gap-6 border-b border-line py-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-2">
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                {group.label}
              </p>
            </div>
            <ul className="md:col-span-10">
              {group.entries.map((entry) => {
                const day = entry.iso.slice(8, 10);
                const isNext = entry.id === highlightId;
                return (
                  <li
                    key={entry.id}
                    className={cn(
                      "group flex items-start gap-5 border-b border-line/60 py-4 last:border-b-0 sm:gap-7",
                      isNext && "bg-saffron/[0.06]",
                    )}
                  >
                    <div className="w-12 shrink-0 pt-0.5 sm:w-14">
                      <span className="block font-display text-2xl leading-none text-charcoal sm:text-3xl">
                        {day}
                      </span>
                      <span className="mt-1 block text-[0.75rem] tracking-[0.01em] text-charcoal/35">
                        {weekday(entry.iso)} · {monthShort(entry.iso)}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <p className="font-display text-xl text-charcoal sm:text-2xl">
                          {entry.name}
                        </p>
                        <span className="font-deva text-sm text-saffron/80" lang="sa">
                          {entry.deva}
                        </span>
                        {isNext && (
                          <span className="rounded-[2px] bg-saffron/10 px-2 py-0.5 text-[0.72rem] text-saffron">
                            Next
                          </span>
                        )}
                      </div>
                      {entry.tithi && (
                        <p className="mt-1 text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                          {entry.tithi}
                        </p>
                      )}
                      {entry.note && (
                        <p className="mt-2 max-w-xl text-[0.82rem] font-normal leading-relaxed text-charcoal/60">
                          {entry.note}
                        </p>
                      )}
                    </div>

                    <span className="mt-1 hidden shrink-0 text-charcoal/20 transition-colors duration-300 group-hover:text-saffron sm:block">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {active && (
        <div className="mt-14 border-t border-line pt-8">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[0.7rem] tracking-[0.01em] text-charcoal/40">
                The quiet rhythm
              </p>
              <p className="mt-3 max-w-[16rem] text-[0.82rem] font-normal leading-relaxed text-charcoal/55">
                Ekadashi, Purnima, Amavasya and Ashtami, kept quietly through
                the year.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:col-span-9 lg:grid-cols-4">
              {active.observances.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2"
                >
                  <span className="text-[0.72rem] text-charcoal/70">{entry.name}</span>
                  <span className="shrink-0 text-[0.7rem] tabular-nums tracking-[0.01em] text-charcoal/40">
                    {entry.iso.slice(8, 10)} {monthShort(entry.iso)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
