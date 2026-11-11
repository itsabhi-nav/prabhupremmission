import { cn } from "@/lib/utils";

const items = [
  { en: "Bhakti", hi: "भक्ति" },
  { en: "Seva", hi: "सेवा" },
  { en: "Gyan", hi: "ज्ञान" },
  { en: "Shanti", hi: "शान्ति" },
  { en: "Prem", hi: "प्रेम" },
  { en: "Darshan", hi: "दर्शन" },
  { en: "Satsang", hi: "सत्सङ्ग" },
];

export function Marquee({ light = false }: { light?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y py-5",
        light
          ? "border-line-light bg-charcoal text-ivory"
          : "border-line bg-ivory text-charcoal",
      )}
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <span
                key={`${copy}-${item.en}`}
                className="flex items-baseline gap-3 px-8 text-[0.65rem] uppercase tracking-[0.3em] opacity-60 sm:px-10"
              >
                {item.en}
                <span className="deva-display text-[0.95rem] tracking-normal text-saffron/80">
                  {item.hi}
                </span>
                <span aria-hidden className="text-[0.55rem] text-saffron">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
