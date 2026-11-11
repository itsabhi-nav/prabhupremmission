import { cn } from "@/lib/utils";

export function Marquee({ light = false }: { light?: boolean }) {
  const items = ["Bhakti", "Seva", "Gyan", "Satsang", "Prem", "Darshan"];

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
                key={`${copy}-${item}`}
                className="flex items-center gap-10 px-10 text-[0.65rem] uppercase tracking-[0.32em] opacity-60"
              >
                {item}
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
