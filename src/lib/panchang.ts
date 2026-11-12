/**
 * Panchang — the Indian lunisolar calendar, computed astronomically.
 *
 * Nothing here is a hard-coded festival list. Tithis are derived from the
 * true phase of the Moon (Meeus, *Astronomical Algorithms*, ch. 49) and the
 * local sunrise at Vrindavan, which is the traditional rule for deciding
 * which tithi belongs to which day.
 *
 * Lunar month names follow the purnimanta convention: a lunar month is named
 * for the solar rashi at the Purnima that ends it.
 */

const RAD = Math.PI / 180;
const IST_OFFSET_HOURS = 5.5;

/** Vrindavan, Uttar Pradesh */
export const DHAM = { latitude: 27.58, longitude: 77.7 };

const sin = (deg: number) => Math.sin(deg * RAD);
const cos = (deg: number) => Math.cos(deg * RAD);
const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

/** Julian Day from a JS Date (UTC). */
export function toJulian(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

export function fromJulian(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000);
}

/**
 * True new moon, as a Julian Ephemeris Date.
 * @param k lunation number since the new moon of 2000 January 6
 */
export function newMoonJDE(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  let jde =
    2451550.09766 +
    29.530588861 * k +
    0.00015437 * T2 -
    0.00000015 * T3 +
    0.00000000073 * T4;

  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const M = norm360(2.5534 + 29.1053567 * k - 0.0000014 * T2 - 0.00000011 * T3);
  const Mp = norm360(
    201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4,
  );
  const F = norm360(
    160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4,
  );
  const O = norm360(124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3);

  jde +=
    -0.4072 * sin(Mp) +
    0.17241 * E * sin(M) +
    0.01608 * sin(2 * Mp) +
    0.01039 * sin(2 * F) +
    0.00739 * E * sin(Mp - M) -
    0.00514 * E * sin(Mp + M) +
    0.00208 * E * E * sin(2 * M) -
    0.00111 * sin(Mp - 2 * F) -
    0.00057 * sin(Mp + 2 * F) +
    0.00056 * E * sin(2 * Mp + M) -
    0.00042 * sin(3 * Mp) +
    0.00042 * E * sin(M + 2 * F) +
    0.00038 * E * sin(M - 2 * F) -
    0.00024 * E * sin(2 * Mp - M) -
    0.00017 * sin(O) -
    0.00007 * sin(Mp + 2 * M) +
    0.00004 * sin(2 * Mp - 2 * F) +
    0.00004 * sin(3 * M) +
    0.00003 * sin(Mp + M - 2 * F) +
    0.00003 * sin(2 * Mp + 2 * F) -
    0.00003 * sin(Mp + M + 2 * F) +
    0.00003 * sin(Mp - M + 2 * F) -
    0.00002 * sin(Mp - M - 2 * F) -
    0.00002 * sin(3 * Mp + M) +
    0.00002 * sin(4 * M);

  const A = [
    299.77 + 0.107408 * k - 0.009173 * T2,
    251.88 + 0.016321 * k,
    251.83 + 26.651886 * k,
    349.42 + 36.412478 * k,
    84.66 + 18.206239 * k,
    141.74 + 53.303771 * k,
    207.14 + 2.453732 * k,
    154.84 + 7.30686 * k,
    34.52 + 27.261239 * k,
    207.19 + 0.121824 * k,
    291.34 + 1.844379 * k,
    161.72 + 24.198154 * k,
    239.56 + 25.513099 * k,
    331.55 + 3.592518 * k,
  ];
  const weights = [
    0.000325, 0.000165, 0.000164, 0.000126, 0.00011, 0.000062, 0.00006,
    0.000056, 0.000047, 0.000042, 0.00004, 0.000037, 0.000035, 0.000023,
  ];
  for (let i = 0; i < A.length; i++) jde += weights[i] * sin(A[i]);

  return jde;
}

/** Approximate ΔT in seconds (TT − UT). Good to a second or two. */
function deltaTSeconds(jd: number): number {
  const year = 2000 + (jd - 2451545.0) / 365.25;
  if (year >= 2005 && year < 2050) {
    const t = year - 2000;
    return 62.92 + 0.32217 * t + 0.005589 * t * t;
  }
  return 69;
}

/** The new moon that begins the lunation containing the given instant. */
export function lunationStart(jd: number): number {
  const k = Math.floor((jd - 2451550.09766) / SYNODIC_MONTH);
  const start = (index: number) =>
    newMoonJDE(index) - deltaTSeconds(newMoonJDE(index)) / 86400;

  let best = start(k);
  if (jd < best) {
    best = start(k - 1);
  } else {
    const next = start(k + 1);
    if (jd >= next) best = next;
  }
  return best;
}

export const SYNODIC_MONTH = 29.530588861;
export const TITHI_LENGTH = SYNODIC_MONTH / 30;

/** 0 = Pratipada … 14 = Purnima, 15 = Amavasya … 29 = Purnima (kṛṣṇa) */
export type TithiIndex = number;

export const tithiNames = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima",
  "Amavasya",
] as const;

export const tithiDeva = [
  "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी",
  "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी",
  "पूर्णिमा", "अमावस्या",
] as const;

/** Human label for a tithi index (handles the kṛṣṇa-pakṣa repeat). */
export function tithiName(index: TithiIndex): string {
  const i = ((index % 30) + 30) % 30;
  if (i < 15) return tithiNames[i];
  // kṛṣṇa-pakṣa runs Pratipada … Chaturdashi, then Amavasya
  if (i === 29) return tithiNames[15];
  return tithiNames[i - 15];
}

export function tithiDevanagari(index: TithiIndex): string {
  const i = ((index % 30) + 30) % 30;
  if (i < 15) return tithiDeva[i];
  if (i === 29) return tithiDeva[15];
  return tithiDeva[i - 15];
}

/** Sunrise or sunset at the Dham for the given calendar date. */
export function solarEvent(date: Date, kind: "rise" | "set" = "rise"): Date {
  // JD at 00:00 UT of the target date
  const dayStart = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  const jd0 = dayStart / 86400000 + 2440587.5;

  // days since 2000 January 0.0
  const n = Math.floor(jd0 - 2451545.0 + 0.5);
  const Jstar = n + 0.0009;

  const M = norm360(357.5291 + 0.98560028 * Jstar);
  const C = 1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M);
  const L = norm360(M + C + 180 + 102.9372);

  // solar transit at Greenwich, in UT
  const Jtransit = 2451545.0 + Jstar + 0.0053 * sin(M) - 0.0069 * sin(2 * L);

  const epsilon = 23.4393 - 0.0000004 * Jstar;
  const delta = Math.asin(sin(L) * sin(epsilon));

  const cosH =
    (sin(-0.833 * RAD) - sin(DHAM.latitude * RAD) * sin(delta)) /
    (cos(DHAM.latitude * RAD) * cos(delta));
  if (cosH > 1 || cosH < -1) {
    // never happens at Vrindavan, but stay safe
    return new Date(dayStart + (kind === "rise" ? 6 : 18) * 3600000);
  }
  const H = Math.acos(cosH) / RAD;

  // shift to the Dham's longitude, then step to rise or set
  const offset = DHAM.longitude / 360 + (kind === "rise" ? H / 360 : -H / 360);
  return fromJulian(Jtransit - offset);
}

/** Sunrise at the Dham for the given calendar date, as an absolute instant. */
export function sunriseOn(date: Date): Date {
  return solarEvent(date, "rise");
}

/** Sunset at the Dham for the given calendar date, as an absolute instant. */
export function sunsetOn(date: Date): Date {
  return solarEvent(date, "set");
}

/** The tithi index prevailing at an arbitrary instant. */
export function tithiAtInstant(instant: Date): TithiIndex {
  return tithiFromLongitudes(instant);
}

/** The tithi index prevailing at a given hour (IST) on the given date. */
export function tithiAtHour(date: Date, hour: number): TithiIndex {
  const instant = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    hour - IST_OFFSET_HOURS,
  );
  return tithiAtInstant(new Date(instant));
}

/** The tithi index prevailing at noon IST on the given date. */
export function tithiAtMidday(date: Date): TithiIndex {
  return tithiAtHour(date, 12);
}

/** The tithi index prevailing at sunrise on the given date. */
export function tithiAtSunrise(date: Date): TithiIndex {
  return tithiAtInstant(sunriseOn(date));
}

/**
 * The tithi index prevailing at the middle of the night that begins on the
 * given date — 00:00 IST the following morning. Night observances (Diwali,
 * Shivaratri, Janmashtami) are kept on the night whose midnight holds the
 * tithi, which is the classical nishītha-kāla rule.
 */
export function tithiAtMidnight(date: Date): TithiIndex {
  const nextMorning = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1,
    -IST_OFFSET_HOURS, // 00:00 IST expressed in UTC
  );
  return tithiAtInstant(new Date(nextMorning));
}

/**
 * The tithi index prevailing at sunset on the given date.
 * Festivals that begin at dusk — Holika Dahan, the lamp offerings — follow
 * the tithi that holds at sunset rather than at sunrise.
 */
export function tithiAtSunset(date: Date): TithiIndex {
  return tithiAtInstant(sunsetOn(date));
}

/** Apparent geocentric longitude of the Sun, tropical degrees. */
export function sunLongitude(date: Date): number {
  const jd = toJulian(date);
  const T = (jd - 2451545.0) / 36525;
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * sin(M) +
    (0.019993 - 0.000101 * T) * sin(2 * M) +
    0.000289 * sin(3 * M);
  return norm360(L0 + C - 0.00569 - 0.00478 * sin(125.04 - 1934.136 * T));
}

/**
 * Geocentric ecliptic longitude of the Moon, tropical degrees.
 * Meeus, *Astronomical Algorithms*, ch. 47 — the principal periodic terms,
 * good to about a hundredth of a degree, which is far finer than a tithi.
 */
export function moonLongitude(date: Date): number {
  const jd = toJulian(date);
  const T = (jd - 2451545.0) / 36525;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  const Lp = norm360(
    218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000,
  );
  const D = norm360(
    297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000,
  );
  const M = norm360(357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000);
  const Mp = norm360(
    134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000,
  );
  const F = norm360(
    93.272095 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000,
  );

  const terms: [number, number, number, number, number][] = [
    [0, 0, 1, 0, 6288774],
    [2, 0, -1, 0, 1274027],
    [2, 0, 0, 0, 658314],
    [0, 0, 2, 0, 213618],
    [0, 1, 0, 0, -185116],
    [0, 0, 0, 2, -114332],
    [2, 0, -2, 0, 58793],
    [2, -1, -1, 0, 57066],
    [2, 0, 1, 0, 53322],
    [2, -1, 0, 0, 45758],
    [0, 1, -1, 0, -40923],
    [1, 0, 0, 0, -34720],
    [0, 1, 1, 0, -30383],
    [2, 0, -3, 0, 15327],
    [0, 0, 1, 2, -12528],
    [0, 0, 1, -2, 10980],
    [4, 0, -1, 0, 10675],
    [0, 0, 3, 0, 10034],
    [4, 0, -2, 0, 8548],
    [2, 1, -1, 0, -7888],
    [2, 1, 0, 0, -6766],
    [1, 0, -1, 0, -5163],
    [1, 1, 0, 0, 4987],
    [2, -1, 1, 0, 4036],
    [2, 0, 2, 0, 3994],
    [4, 0, 0, 0, 3861],
    [2, 0, -1, 2, 3665],
    [2, 1, -2, 0, -2689],
    [2, 1, 1, 0, 2422],
    [2, 0, -4, 0, 2210],
    [0, 1, -2, 0, -1786],
  ];

  let sum = 0;
  for (const [d, m, mp, f, coeff] of terms) {
    sum += coeff * sin(d * D + m * M + mp * Mp + f * F);
  }

  // additive terms for Venus, Jupiter and the oblateness of the Earth
  const A1 = 119.75 + 131.849 * T;
  const A2 = 53.09 + 479264.29 * T;
  sum += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);

  return norm360(Lp + sum / 1000000);
}

/** The lunar day (tithi) at an instant, from the true Moon–Sun elongation. */
function tithiFromLongitudes(date: Date): TithiIndex {
  const elongation = norm360(moonLongitude(date) - sunLongitude(date));
  return Math.floor(elongation / 12) % 30;
}
/** Apparent sidereal longitude of the Sun, expressed as a rashi (0 = Mesha). */
export function sunRashi(date: Date): number {
  const jd = toJulian(date);
  const year = 2000 + (jd - 2451545.0) / 365.25;
  const ayanamsa = 23.85 + 0.01397 * (year - 2000);
  return Math.floor(norm360(sunLongitude(date) - ayanamsa) / 30);
}

export const rashiNames = [
  "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
  "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena",
] as const;

/** Purnimanta lunar month names, keyed by the solar rashi at the Purnima. */
export const lunarMonthNames = [
  "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
  "Ashwin", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna",
] as const;

export const lunarMonthDeva = [
  "चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद",
  "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन",
] as const;

export type Paksha = "Shukla" | "Krishna";

export function pakshaOf(index: TithiIndex): Paksha {
  return index < 15 ? "Shukla" : "Krishna";
}

/** "Shukla Navami", the way a panchang writes it. */
export function tithiLabel(index: TithiIndex): string {
  return `${pakshaOf(index)} ${tithiName(index)}`;
}

/** The Moon's illuminated fraction at an instant, 0 (new) to 1 (full). */
export function moonIllumination(date: Date): number {
  const elongation =
    ((moonLongitude(date) - sunLongitude(date)) % 360 + 360) % 360;
  return (1 - Math.cos((elongation * Math.PI) / 180)) / 2;
}

/**
 * The lunar month a tithi belongs to.
 *
 * The month is named for the solar rashi in which the Moon stands at the
 * amāvasyā that opens the month — the classical amānta rule. The rāshi
 * boundaries and the amāvasyā rarely coincide, so a month may begin a few
 * days before or after its sankrānti; the name follows the amāvasyā.
 */
export function lunarMonthOf(date: Date): {
  name: string;
  deva: string;
  rashi: number;
} {
  const start = lunationStart(toJulian(date));
  const rashi = sunRashi(fromJulian(start));
  return {
    name: lunarMonthNames[rashi],
    deva: lunarMonthDeva[rashi],
    rashi,
  };
}

export type PanchangDay = {
  date: Date;
  /** ISO date, YYYY-MM-DD, in the Dham's timezone */
  iso: string;
  tithi: TithiIndex;
  tithiName: string;
  tithiDeva: string;
  paksha: Paksha;
  month: string;
  monthDeva: string;
};

/** Walk day by day from `from` for `days`, returning the tithi of each day. */
export function panchangRange(from: Date, days: number): PanchangDay[] {
  const out: PanchangDay[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(
      Date.UTC(
        from.getUTCFullYear(),
        from.getUTCMonth(),
        from.getUTCDate() + i,
        12, 0, 0,
      ),
    );
    const tithi = tithiAtSunrise(date);
    const month = lunarMonthOf(date);
    out.push({
      date,
      iso: date.toISOString().slice(0, 10),
      tithi,
      tithiName: tithiName(tithi),
      tithiDeva: tithiDevanagari(tithi),
      paksha: pakshaOf(tithi),
      month: month.name,
      monthDeva: month.deva,
    });
  }
  return out;
}

/** Next date (from `from`) on which the given tithi occurs. */
export function nextTithi(from: Date, target: number, withinDays = 400): Date | null {
  for (let i = 0; i < withinDays; i++) {
    const date = new Date(
      Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i, 12),
    );
    if (tithiAtSunrise(date) === target) return date;
  }
  return null;
}

/** Next date on which a given tithi occurs inside a given lunar month. */
export function nextTithiInMonth(
  from: Date,
  target: number,
  monthName: string,
  withinDays = 800,
): Date | null {
  for (let i = 0; i < withinDays; i++) {
    const date = new Date(
      Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + i, 12),
    );
    const tithi = tithiAtSunrise(date);
    if (tithi !== target) continue;
    if (lunarMonthOf(date).name === monthName) return date;
  }
  return null;
}
