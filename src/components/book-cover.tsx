import { cn } from "@/lib/utils";
import type { Publication } from "@/content/site";
import { LogoMark } from "@/components/logo";

const themes: Record<Publication["theme"], { bg: string; accent: string }> = {
  maroon: {
    bg: "linear-gradient(145deg, #5a1f22 0%, #3b1418 55%, #2a0f12 100%)",
    accent: "#d9b67c",
  },
  charcoal: {
    bg: "linear-gradient(145deg, #3a3833 0%, #26241f 55%, #1a1916 100%)",
    accent: "#c9a66d",
  },
  olive: {
    bg: "linear-gradient(145deg, #4a4a33 0%, #32321f 55%, #242417 100%)",
    accent: "#d8c28f",
  },
  indigo: {
    bg: "linear-gradient(145deg, #2c3149 0%, #1e2233 55%, #151824 100%)",
    accent: "#c7ad7d",
  },
};

export function BookCover({
  publication,
  className,
}: {
  publication: Publication;
  className?: string;
}) {
  const theme = themes[publication.theme];

  return (
    <div
      className={cn(
        "group relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-[2px] shadow-[20px_28px_60px_-30px_rgba(36,35,31,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2",
        className,
      )}
      style={{ background: theme.bg }}
    >
      <div aria-hidden className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 15% 0%, ${theme.accent}33 0%, transparent 55%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 26px)",
          }}
        />
      </div>

      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[10px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.06) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      <div
        className="relative flex h-full flex-col justify-between border p-6 sm:p-8"
        style={{ borderColor: `${theme.accent}55`, margin: "14px" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[0.75rem] tracking-[0.01em]"
            style={{ color: `${theme.accent}cc` }}
          >
            {publication.issue}
          </span>
          <LogoMark className="h-5 w-5" style={{ color: theme.accent }} />
        </div>

        <div className="text-center">
          <p
            className="font-deva text-2xl sm:text-3xl"
            style={{ color: theme.accent }}
            lang="sa"
          >
            {publication.sanskrit}
          </p>
          <div
            aria-hidden
            className="mx-auto my-4 h-px w-8"
            style={{ background: `${theme.accent}66` }}
          />
          <p
            className="font-display text-3xl font-normal leading-none tracking-wide sm:text-4xl"
            style={{ color: "#f4efe4" }}
          >
            {publication.title}
          </p>
          <p
            className="mt-3 text-[0.75rem] tracking-[0.01em]"
            style={{ color: `${theme.accent}aa` }}
          >
            Prabhu Prem Mission
          </p>
        </div>

        <div
          className="flex items-center justify-between border-t pt-4 text-[0.75rem] tracking-[0.01em]"
          style={{ borderColor: `${theme.accent}33`, color: `${theme.accent}aa` }}
        >
          <span>Monthly</span>
          <span>{publication.pages} pages</span>
        </div>
      </div>
    </div>
  );
}
