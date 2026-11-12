import {
  panchangRange,
  tithiAtHour,
  tithiAtMidnight,
  tithiAtSunrise,
  tithiName,
  type PanchangDay,
} from "./panchang";

export type FestivalKind = "festival" | "observance";

export type Festival = {
  id: string;
  name: string;
  deva: string;
  /** ISO date, YYYY-MM-DD */
  iso: string;
  date: Date;
  kind: FestivalKind;
  /** the tithi the day carries, e.g. "Krishna Ekadashi" */
  tithi: string;
  /** why the day is kept — one quiet line */
  note?: string;
};

type Rule = {
  id: string;
  name: string;
  deva: string;
  /** tithi index that marks the day */
  tithi: number;
  /**
   * The moment whose tithi fixes the date:
   * "sunrise" — day-long observances
   * "midnight" — night observances (the nishītha-kāla rule)
   * a number — the hour of the pūjā in IST (12 for the Diwali sequence,
   *   13 for Ram Navami's madhyāhna, 15 for Vijayadashami's aparāhna)
   */
  when: "sunrise" | "midnight" | number;
  /** the date the tradition centres the festival on, used to pick the right occurrence */
  ref: [number, number];
  kind: FestivalKind;
  note: string;
};

/**
 * Named festivals are located by the tithi they fall on and the date the
 * tradition centres them on — never by a hand-typed date. The tithi comes
 * from the sky; the reference date only disambiguates which occurrence in
 * the year is meant.
 */
const RULES: Rule[] = [
  {
    id: "maha-shivaratri",
    name: "Maha Shivaratri",
    deva: "महाशिवरात्रि",
    tithi: 28,
    when: "midnight",
    ref: [2, 16],
    kind: "festival",
    note: "The night of Shiva — kept awake, watched, and spent in silence.",
  },
  {
    id: "holi",
    name: "Holi",
    deva: "होली",
    tithi: 14,
    when: "sunrise",
    ref: [3, 12],
    kind: "festival",
    note: "Holika Dahan at dusk; Dhulandi the next morning, when the colour starts.",
  },
  {
    id: "ram-navami",
    name: "Ram Navami",
    deva: "राम नवमी",
    tithi: 8,
    when: 13,
    ref: [4, 2],
    kind: "festival",
    note: "The birth of Rama — kept with kirtan and lamps.",
  },
  {
    id: "hanuman-jayanti",
    name: "Hanuman Jayanti",
    deva: "हनुमान जयंती",
    tithi: 14,
    when: "sunrise",
    ref: [4, 12],
    kind: "festival",
    note: "The birth of Hanuman — the servant who carried the mountain.",
  },
  {
    id: "guru-purnima",
    name: "Guru Purnima",
    deva: "गुरु पूर्णिमा",
    tithi: 14,
    when: "sunrise",
    ref: [7, 10],
    kind: "festival",
    note: "The full moon of the teachers — a day to sit with one who has shown the way.",
  },
  {
    id: "raksha-bandhan",
    name: "Raksha Bandhan",
    deva: "रक्षा बंधन",
    tithi: 14,
    when: "sunrise",
    ref: [8, 15],
    kind: "festival",
    note: "A thread tied in gratitude, and the promise that comes with it.",
  },
  {
    id: "janmashtami",
    name: "Janmashtami",
    deva: "जन्माष्टमी",
    tithi: 22,
    when: "sunrise",
    ref: [8, 28],
    kind: "festival",
    note: "The birth of Krishna — kept through the night of the eighth day.",
  },
  {
    id: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    deva: "गणेश चतुर्थी",
    tithi: 3,
    when: 13,
    ref: [9, 5],
    kind: "festival",
    note: "The day the obstacles were named and set aside.",
  },
  {
    id: "navratri",
    name: "Sharad Navratri",
    deva: "शरद नवरात्रि",
    tithi: 0,
    when: 17,
    ref: [10, 5],
    kind: "festival",
    note: "Nine nights, nine forms of the Goddess — the first day of the festival.",
  },
  {
    id: "dussehra",
    name: "Dussehra",
    deva: "विजयादशमी",
    tithi: 9,
    when: 15,
    ref: [10, 12],
    kind: "festival",
    note: "Vijayadashami — the tenth day, when the long waiting is rewarded.",
  },
  {
    id: "dhanteras",
    name: "Dhanteras",
    deva: "धनतेरस",
    tithi: 27,
    when: 12,
    ref: [10, 26],
    kind: "festival",
    note: "The eve of the lamps — the Dham cleans its steps and lights them.",
  },
  {
    id: "diwali",
    name: "Diwali",
    deva: "दीपावली",
    tithi: 29,
    when: "midnight",
    ref: [10, 30],
    kind: "festival",
    note: "The night of lamps — one for each year of light, and one to offer.",
  },
  {
    id: "govardhan-puja",
    name: "Govardhan Puja",
    deva: "गोवर्धन पूजा",
    tithi: 0,
    when: 15,
    ref: [10, 31],
    kind: "festival",
    note: "Annakut — the hill of food offered, and the many who are fed.",
  },
  {
    id: "bhai-dooj",
    name: "Bhai Dooj",
    deva: "भाई दूज",
    tithi: 1,
    when: 15,
    ref: [11, 1],
    kind: "festival",
    note: "Sisters keep the day for their brothers — a tilak placed by hand.",
  },
  {
    id: "kartik-purnima",
    name: "Dev Deepawali",
    deva: "कार्तिक पूर्णिमा",
    tithi: 14,
    when: "sunrise",
    ref: [11, 15],
    kind: "festival",
    note: "The lamps of the Dham are lit for the dead, and the whole riverbank glows.",
  },
  {
    id: "gita-jayanti",
    name: "Gita Jayanti",
    deva: "गीता जयंती",
    tithi: 10,
    when: "sunrise",
    ref: [12, 10],
    kind: "festival",
    note: "The day the Song of God was given — read together, chapter by chapter.",
  },
];

const daysBetween = (a: Date, b: Date) =>
  Math.abs(a.getTime() - b.getTime()) / 86400000;

/** Does the rule's tithi hold at the moment the rule observes? */
function tithiHolds(rule: Rule, day: PanchangDay): boolean {
  if (typeof rule.when === "number") {
    return tithiAtHour(day.date, rule.when) === rule.tithi;
  }
  if (rule.when === "midnight") {
    return tithiAtMidnight(day.date) === rule.tithi;
  }
  return tithiAtSunrise(day.date) === rule.tithi;
}

/** Named festivals for a calendar year, computed from the sky. */
export function festivalsForYear(year: number): Festival[] {
  const out: Festival[] = [];
  const range = panchangRange(new Date(Date.UTC(year, 0, 1, 12)), 366);

  for (const rule of RULES) {
    const ref = new Date(Date.UTC(year, rule.ref[0] - 1, rule.ref[1], 12));

    let best: { day: PanchangDay; distance: number } | null = null;

    for (const day of range) {
      if (!tithiHolds(rule, day)) continue;
      const distance = daysBetween(day.date, ref);
      if (!best || distance < best.distance) best = { day, distance };
    }

    if (!best) continue;
    const day = best.day;
    out.push({
      id: `${rule.id}-${day.iso}`,
      name: rule.name,
      deva: rule.deva,
      iso: day.iso,
      date: day.date,
      kind: rule.kind,
      tithi: `${rule.tithi < 15 ? "Shukla" : "Krishna"} ${tithiName(rule.tithi)}`,
      note: rule.note,
    });
  }

  // Chhath is the sixth day of the waxing fortnight that Diwali opens.
  // Deriving it from the lamps keeps it in the right lunar month every year.
  const diwali = out.find((item) => item.id.startsWith("diwali-"));
  if (diwali) {
    const after = range.find(
      (day) =>
        day.date.getTime() > diwali.date.getTime() &&
        day.date.getTime() - diwali.date.getTime() <= 20 * 86400000 &&
        day.tithi === 5,
    );
    if (after) {
      out.push({
        id: `chhath-puja-${after.iso}`,
        name: "Chhath Puja",
        deva: "छठ पूजा",
        iso: after.iso,
        date: after.date,
        kind: "festival",
        tithi: "Shukla Shashthi",
        note: "Four days at the water's edge, for the sun and the bond of family.",
      });
    }
  }

  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** The observances — every Ekadashi, Purnima, Amavasya and Ashtami. */
export function observancesForYear(year: number): Festival[] {
  const days = panchangRange(new Date(Date.UTC(year, 0, 1, 12)), 366);
  const out: Festival[] = [];

  for (const day of days) {
    const isEkadashi = day.tithi === 10 || day.tithi === 25;
    const isPurnima = day.tithi === 14;
    const isAmavasya = day.tithi === 29;
    const isAshtami = day.tithi === 7 || day.tithi === 22;

    if (!isEkadashi && !isPurnima && !isAmavasya && !isAshtami) continue;

    const name = isEkadashi
      ? day.paksha === "Shukla"
        ? "Shukla Ekadashi"
        : "Krishna Ekadashi"
      : isPurnima
        ? "Purnima"
        : isAmavasya
          ? "Amavasya"
          : day.paksha === "Shukla"
            ? "Shukla Ashtami"
            : "Krishna Ashtami";

    const deva = isEkadashi
      ? "एकादशी"
      : isPurnima
        ? "पूर्णिमा"
        : isAmavasya
          ? "अमावस्या"
          : "अष्टमी";

    out.push({
      id: `obs-${day.iso}`,
      name,
      deva,
      iso: day.iso,
      date: day.date,
      kind: "observance",
      tithi: `${day.paksha} ${day.tithiName}`,
    });
  }

  return out;
}

/** Every festival and observance across a span of years. */
export function calendar(years: number[]): Festival[] {
  const all: Festival[] = [];
  for (const year of years) {
    all.push(...festivalsForYear(year), ...observancesForYear(year));
  }
  return all.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** The next entry in a sorted list that has not yet passed. */
export function nextFrom(
  list: Festival[],
  from: Date = new Date(),
): Festival | null {
  const now = from.getTime();
  return list.find((item) => item.date.getTime() >= now - 86400000) ?? null;
}

/** Days from `from` until `date`, counted on the calendar. */
export function daysUntil(date: Date, from: Date = new Date()): number {
  const start = Date.UTC(
    from.getFullYear(),
    from.getMonth(),
    from.getDate(),
  );
  const target = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return Math.round((target - start) / 86400000);
}
