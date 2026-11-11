# Prabhu Prem Mission — website

A premium, editorial website for **Prabhu Prem Mission**, built with Next.js,
React, TypeScript, Tailwind CSS and Framer Motion. The design language is
*editorial luxury* (ivory, serif, photography, generous space) with selected
*cinematic spirituality* moments for Gurudev, Pravachan and donation.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3400
npm run build
npm run start
npm run lint    # eslint (flat config in eslint.config.mjs)
```

Requires Node 20+.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, philosophy, guidance, Daily Darshan, initiatives, video, Gyan, donation, newsletter |
| `/about` | Story, vision, timeline and spiritual guidance |
| `/initiatives` | All six seva initiatives with category filters |
| `/initiatives/[slug]` | Initiative detail — prose, quote, gallery, related initiative |
| `/darshan` | Daily Dham Darshan — today, last 7 days and a 30-day archive with month filters and lightbox |
| `/shloka` | Shloka of the day, the full bilingual collection, theme filters and a japa counter |
| `/gyan` | Publications, PDF downloads and newsletter |
| `/donate` | Donation form, UPI QR, bank details and Gupta Daan |
| `/contact` | Contact form, visit details and social links |
| `/privacy`, `/terms` | Legal placeholders |
| `not-found` | Branded 404 |

`sitemap.xml` and `robots.txt` are generated from `src/app/sitemap.ts` and
`src/app/robots.ts`.

## Editing content

All copy, navigation, people, initiatives, publications, payment details and
legal text live in:

```
src/content/site.ts
```

The file is fully typed. Replace the values there (or swap the module for a CMS)
without touching the UI. Darshan dates are generated relative to the current day
in `src/lib/darshan.ts`; the most recent seven days are shown on the home page
and thirty days in the archive.

### Shlokas

The verses live in their own file:

```
src/content/shlokas.ts
```

Each entry carries four layers — `deva` (Devanagari), `iast` (transliteration),
`gloss` (word-by-word) and `meaning` (English). `src/lib/shloka.ts` picks the
verse of the day deterministically, so the same verse shows all day. Add a
verse by appending to the `shlokas` array — the themes, filters, copy button
and the daily pick all follow automatically.

> The English renderings are working translations prepared for the interface.
> Cross-check every verse against a published edition before printing or
> distributing it.

### Design tokens

Defined in `src/app/globals.css` under `@theme`:

- Ivory `#F8F6F0`, cream `#F2EDE2`, sand `#E8DFCF`
- Charcoal `#24231F`, ink `#1A1916`
- Saffron `#C58B45`, gold `#B99A63`, brown `#493A2B`
- Type: Cormorant Garamond (display), Inter (body), Tiro Devanagari Hindi

## What must be replaced before launch

Nothing about the mission has been invented. Everything below is a deliberate
placeholder and is labelled as such in the interface where appropriate:

1. **Photography** — every image is Pexels stock. See
   `public/images/CREDITS.md`. Replace with verified photography of the Dham,
   Gurudev, Swami Radharaman Ji and the seva programmes.
2. **Gurudev & Swami Ji** — biographies, portraits and teachings.
3. **Contact details** — `site.phone`, `site.address`, `site.email` and the
   social handles.
4. **Payment details** — UPI ID, payee name, bank, account number, IFSC and
   branch in `donation.payment`. Regenerate `public/donate-qr.svg` for the real
   UPI ID.
5. **Publications** — the four PDFs in `public/gyan/` are design placeholders.
6. **Legal copy** — `legal.privacy` and `legal.terms` are sample text and need
   legal review.
7. **YouTube** — add `featuredVideo.youtubeId` to enable the inline player.
   Until then the modal links to the channel.
8. **Darshan archive** — the image set in `src/lib/darshan.ts` repeats a small
   set of placeholder photographs. Replace with a daily archive (or CMS).
9. **Shloka translations** — the English renderings in
   `src/content/shlokas.ts` are working translations. Have them checked
   against a published edition, and replace the `note` lines with the
   mission's own commentary.
10. **The fivefold path** — `pathSteps` in `src/content/site.ts` presents a
    classical Vedāntic framework. Keep the attribution line, or replace the
    section with the mission's own framing.

## Donation behaviour

The donation form never takes a payment and never reports a payment as
successful. Submitting the form reveals the UPI QR, UPI ID, bank details and a
manual confirmation note. The confirmation copy is in
`donation.payment.confirmation`.

## Motion & accessibility

- Framer Motion powers reveals, line masks, hover states and page transitions.
- Lenis provides smooth scrolling.
- `prefers-reduced-motion` disables Lenis and collapses all animation
  durations via CSS.
- Forms use native labels, visible focus styles, `aria-invalid` feedback and a
  skip-to-content link.
- Lightboxes close on `Escape` and support arrow-key navigation.

## Project structure

```
src/
  app/            routes, metadata, sitemap, robots, 404
  components/     layout, motion, forms, page sections
    home/         homepage sections
    ui/           buttons and small primitives
  content/        site.ts (all editable copy) + shlokas.ts (verses)
  lib/            darshan dates, shloka helpers, formatting, class helpers
public/
  images/         placeholder photography + CREDITS.md
  gyan/           placeholder PDFs
  donate-qr.svg   placeholder UPI QR
```
# prabhupremmission
