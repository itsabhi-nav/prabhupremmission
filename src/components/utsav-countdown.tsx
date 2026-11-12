"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function difference(target: number): { parts: Parts; elapsed: boolean } {
  const ms = Math.max(0, target - Date.now());
  return {
    elapsed: target - Date.now() <= 0,
    parts: {
      days: Math.floor(ms / 86400000),
      hours: Math.floor((ms / 3600000) % 24),
      minutes: Math.floor((ms / 60000) % 60),
      seconds: Math.floor((ms / 1000) % 60),
    },
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

export function UtsavCountdown({ iso, label }: { iso: string; label: string }) {
  const target = Date.parse(`${iso}T00:00:00+05:30`);
  const [state, setState] = useState<{ parts: Parts; elapsed: boolean } | null>(
    null,
  );

  useEffect(() => {
    const tick = () => setState(difference(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const parts = state?.parts ?? null;
  const cells: { value: string; unit: string }[] = parts
    ? [
        { value: String(parts.days), unit: "days" },
        { value: pad(parts.hours), unit: "hours" },
        { value: pad(parts.minutes), unit: "minutes" },
        { value: pad(parts.seconds), unit: "seconds" },
      ]
    : [
        { value: "—", unit: "days" },
        { value: "—", unit: "hours" },
        { value: "—", unit: "minutes" },
        { value: "—", unit: "seconds" },
      ];

  const elapsed = state?.elapsed ?? false;

  return (
    <div>
      <p className="text-[0.7rem] tracking-[0.01em] text-gold">
        {elapsed ? "Observed today" : `Until ${label}`}
      </p>
      <div className="mt-4 flex items-end gap-4 sm:gap-6" aria-live="off">
        {cells.map((cell, index) => (
          <div key={cell.unit} className="flex items-end gap-4 sm:gap-6">
            <div>
              <span className="block font-display text-4xl tabular-nums leading-none text-ivory sm:text-5xl lg:text-6xl">
                {cell.value}
              </span>
              <span className="mt-2 block text-[0.75rem] tracking-[0.01em] text-ivory/35">
                {cell.unit}
              </span>
            </div>
            {index < cells.length - 1 && (
              <span
                aria-hidden
                className="mb-6 block h-8 w-px bg-ivory/15 sm:h-10"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
