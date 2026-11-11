export type DarshanEntry = {
  id: string;
  iso: string;
  day: string;
  month: string;
  monthShort: string;
  year: string;
  weekday: string;
  dateLabel: string;
  caption: string;
  note: string;
  image: string;
  alt: string;
};

const frames = [
  {
    image: "/images/darshan-2.jpg",
    alt: "Sri Radha and Krishna adorned with fresh flower garlands",
    caption: "The deities, dressed in fresh flowers",
    note: "Jasmine, rose and marigold gathered before sunrise.",
  },
  {
    image: "/images/darshan-3.jpg",
    alt: "An elaborate flower and lamp offering arranged on the floor",
    caption: "An offering of light and petals",
    note: "The floor altar prepared for the evening aarti.",
  },
  {
    image: "/images/darshan-4.jpg",
    alt: "A brass aarti thali with a burning lamp and offerings",
    caption: "The aarti thali, ready",
    note: "Brass, camphor, ghee and a steady hand.",
  },
  {
    image: "/images/darshan-5.jpg",
    alt: "A single clay diya burning in the dark",
    caption: "One lamp, kept burning",
    note: "A quiet corner of the Dham after sunset.",
  },
  {
    image: "/images/darshan-6.jpg",
    alt: "The ghats and temple towers across the river at first light",
    caption: "First light across the water",
    note: "The city waking as the morning bell rings.",
  },
  {
    image: "/images/darshan-7.jpg",
    alt: "Evening aarti lamps glowing in the dark",
    caption: "Evening aarti",
    note: "The day offered back, flame by flame.",
  },
  {
    image: "/images/darshan-8.jpg",
    alt: "Warm carved stone facade of a temple in the afternoon",
    caption: "The old stone, warmed by the sun",
    note: "A quiet afternoon at the Dham.",
  },
  {
    image: "/images/deity.jpg",
    alt: "A decorated shrine with floral garlands and offerings",
    caption: "The altar in full bloom",
    note: "The shrine prepared for a festival evening.",
  },
  {
    image: "/images/lamps.jpg",
    alt: "Rows of small oil lamps glowing in the dark",
    caption: "Lamps for the evening",
    note: "Hundreds of flames, one intention.",
  },
  {
    image: "/images/marigold.jpg",
    alt: "Marigold flowers arranged as an offering",
    caption: "Marigold, before the garlands are made",
    note: "The fragrance arrives before the flowers do.",
  },
  {
    image: "/images/temple-field.jpg",
    alt: "A temple standing in a quiet green field",
    caption: "Stillness at the edge of the Dham",
    note: "The fields beyond the temple wall.",
  },
];

const weekdayFormatter = new Intl.DateTimeFormat("en-IN", { weekday: "long" });
const dayFormatter = new Intl.DateTimeFormat("en-IN", { day: "2-digit" });
const monthFormatter = new Intl.DateTimeFormat("en-IN", { month: "long" });
const monthShortFormatter = new Intl.DateTimeFormat("en-IN", { month: "short" });
const yearFormatter = new Intl.DateTimeFormat("en-IN", { year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function getDarshanEntries(count = 7, base = new Date()): DarshanEntry[] {
  const start = new Date(base);
  start.setHours(12, 0, 0, 0);

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() - index);
    const frame = frames[index % frames.length];

    return {
      id: `${date.toISOString().slice(0, 10)}-${index}`,
      iso: date.toISOString().slice(0, 10),
      day: dayFormatter.format(date),
      month: monthFormatter.format(date),
      monthShort: monthShortFormatter.format(date),
      year: yearFormatter.format(date),
      weekday: weekdayFormatter.format(date),
      dateLabel: dateFormatter.format(date),
      ...frame,
    };
  });
}

export function groupByMonth(entries: DarshanEntry[]) {
  const groups = new Map<string, DarshanEntry[]>();
  for (const entry of entries) {
    const key = `${entry.month} ${entry.year}`;
    const group = groups.get(key) ?? [];
    group.push(entry);
    groups.set(key, group);
  }
  return Array.from(groups, ([label, items]) => ({ label, items }));
}
