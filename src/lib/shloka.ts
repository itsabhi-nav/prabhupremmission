import { shlokas, type Shloka } from "@/content/shlokas";

/**
 * A stable, day-indexed pick from the collection. The same day always yields
 * the same verse, on the server and in the browser.
 */
export function shlokaIndexForDate(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 1);
  const day = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) /
      86400000,
  );
  return ((day % shlokas.length) + shlokas.length) % shlokas.length;
}

export function getShlokaOfDay(date: Date = new Date()): Shloka {
  return shlokas[shlokaIndexForDate(date)];
}

/** Groups the collection by theme, preserving the authored order. */
export function shlokasByTheme(): { theme: string; items: Shloka[] }[] {
  const map = new Map<string, Shloka[]>();
  for (const item of shlokas) {
    const list = map.get(item.theme) ?? [];
    list.push(item);
    map.set(item.theme, list);
  }
  return Array.from(map, ([theme, items]) => ({ theme, items }));
}
