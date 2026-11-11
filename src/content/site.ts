/**
 * Central content layer.
 *
 * Everything written here is intentionally kept in one typed file so it can be
 * swapped for a CMS (Sanity, Payload, Supabase, etc.) without touching the UI.
 * Items marked "placeholder" should be replaced with verified mission details.
 */

export const site = {
  name: "Prabhu Prem Mission",
  shortName: "Prabhu Prem",
  tagline: "Love · Wisdom · Seva",
  description:
    "A spiritual and humanitarian mission devoted to bhakti, selfless service and the quiet transformation of everyday life.",
  url: "https://prabhupremmission.org",
  email: "namaste@prabhupremmission.org",
  phone: "+91 98765 43210", // placeholder
  address: {
    line1: "Prabhu Prem Dham",
    line2: "Vrindavan, Uttar Pradesh 281121",
    country: "India",
  },
  socials: {
    youtube: "https://www.youtube.com/@prabhupremmission",
    facebook: "https://www.facebook.com/prabhupremmission",
    instagram: "https://www.instagram.com/prabhupremmission",
  },
  legal: {
    copyright: `© ${new Date().getFullYear()} Prabhu Prem Mission. All rights reserved.`,
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Initiatives", href: "/initiatives" },
  { label: "Dham Darshan", href: "/darshan" },
  { label: "Gyan", href: "/gyan" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  label: "Prabhu Prem Mission",
  title: ["Discover the path of", "love, wisdom &", "spiritual awakening."],
  intro:
    "An invitation to experience the timeless wisdom of spirituality, devotion and selfless love.",
  primaryCta: { label: "Explore our mission", href: "/about" },
  secondaryCta: { label: "Daily Dham Darshan", href: "/darshan" },
  image: "/images/hero.jpg",
  imageAlt: "An ornate South Indian temple gopuram silhouetted against a rose-gold sunset sky",
  note: "Bharat · India",
  sanskrit: "श्री राधारमण",
};

export const mission = {
  eyebrow: "Our Philosophy",
  title: "A journey towards a more meaningful life.",
  sanskrit: "सर्वे भवन्तु सुखिनः",
  sanskritMeaning: "May all beings be happy.",
  body: [
    "Prabhu Prem Mission is a spiritual and humanitarian initiative rooted in the living traditions of India. It exists to make the timeless wisdom of bhakti — devotion — accessible, warm and relevant to the way we live today.",
    "We believe that the inner life and the outer life are not separate. Prayer deepens service. Service softens the heart. And a softened heart is able to recognise the divine in every person it meets.",
  ],
  cta: { label: "Discover our story", href: "/about" },
  image: "/images/heritage.jpg",
  imageAlt: "Ancient stone temple towers rising quietly above a green courtyard",
  detailImage: "/images/mission-detail.jpg",
  detailAlt: "Hand-carved stone detail from a historic Indian temple",
  detailCaption: "The craft of devotion — carved, repeated, remembered.",
};

export const principles = [
  {
    number: "I",
    title: "Bhakti",
    description:
      "A living relationship with the divine, expressed through prayer, kirtan, ritual and quiet remembrance.",
  },
  {
    number: "II",
    title: "Seva",
    description:
      "Service offered without expectation — food, care, education and dignity for those who need it most.",
  },
  {
    number: "III",
    title: "Gyan",
    description:
      "The study of scripture and self, so that understanding may deepen what devotion begins.",
  },
];

export const guidance = {
  eyebrow: "Spiritual Guidance",
  title: "Wisdom carried with love.",
  body: [
    "Prabhu Prem Mission is guided by Gurudev and Swami Radharaman Ji, whose lives are devoted to the practice and sharing of India's spiritual inheritance.",
    "Their teachings return us to the essentials: remembrance, humility, compassion and the steady work of becoming a little more present, a little more kind.",
  ],
  quote: "वसुधैव कुटुम्बकम्",
  quoteTranslation: "The whole world is one family.",
  cta: { label: "Read about Gurudev & Swami Ji", href: "/about#guidance" },
  image: "/images/guru-portrait.jpg",
  imageAlt:
    "A monk in maroon robes standing in warm morning light — a representative image",
  imageCaption: "Representative image. Official portraits to be added.",
};

export const darshanSection = {
  eyebrow: "Daily Dham Darshan",
  title: "A glimpse of the Dham, every day.",
  intro:
    "Flowers, lamps and the morning aarti — the last seven days at the Dham, gathered in one quiet place.",
  cta: { label: "View all Darshan", href: "/darshan" },
};

export const initiativesSection = {
  eyebrow: "Our Initiatives",
  title: "Service, in its many forms.",
  intro:
    "Seva is not a department of life. It is the natural expression of a heart in prayer. These are the ways we try to live that belief.",
  cta: { label: "Explore all initiatives", href: "/initiatives" },
};

export type Initiative = {
  slug: string;
  title: string;
  sanskrit: string;
  category: string;
  excerpt: string;
  intro: string;
  body: string[];
  quote: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  date: string;
  location: string;
  featured?: boolean;
};

export const initiatives: Initiative[] = [
  {
    slug: "annadaan",
    title: "Annadaan",
    sanskrit: "अन्नदान",
    category: "Seva",
    excerpt:
      "A warm meal, offered with respect. Community kitchens and langar seva that meet people where they are.",
    intro:
      "Annadaan is the oldest form of hospitality we know: to feed another person before asking anything of them.",
    body: [
      "Our annadaan seva gathers volunteers around simple community kitchens. Meals are prepared fresh, served with dignity and offered to anyone who arrives — without distinction of faith, caste or circumstance.",
      "The work is deliberately unglamorous. It begins before sunrise, continues through the heat of the day and ends with washing the vessels. We believe this is exactly where spiritual practice becomes real.",
      "Alongside daily meals, the mission supports ration assistance for families in transition and festival langar where the whole neighbourhood is invited to eat together.",
    ],
    quote:
      "Food offered with love is never only food. It is a reminder that no one should eat alone.",
    image: "/images/init-annadaan.jpg",
    imageAlt: "A community meal being served to a large group of people in India",
    gallery: [
      { src: "/images/init-annadaan.jpg", alt: "Community meal distribution" },
      { src: "/images/darshan-4.jpg", alt: "Aarti thali prepared for offering" },
      { src: "/images/marigold.jpg", alt: "Marigold flowers at the shrine" },
    ],
    date: "2026-11-02",
    location: "Vrindavan, Uttar Pradesh",
    featured: true,
  },
  {
    slug: "vidya-daan",
    title: "Vidya Daan",
    sanskrit: "विद्यादान",
    category: "Education",
    excerpt:
      "Learning support, books and mentorship for children in and around the mission's neighbourhood.",
    intro:
      "The greatest gift we can offer a child is the confidence to keep asking questions.",
    body: [
      "Vidya Daan supports children with school materials, quiet study spaces and volunteer-led classes in the evenings. The focus is not only on marks, but on curiosity, expression and self-belief.",
      "Teachers and mentors from the community are invited to share what they know. Older students are encouraged to teach younger ones, so that learning becomes a circle rather than a ladder.",
      "The programme also works with families to keep children in school through difficult seasons, offering practical support without making anyone feel small for needing it.",
    ],
    quote:
      "A lamp does not lose its light by lighting another lamp.",
    image: "/images/init-education.jpg",
    imageAlt: "Children walking together to school in the early morning light",
    gallery: [
      { src: "/images/init-education.jpg", alt: "Children walking to school" },
      { src: "/images/init-women.jpg", alt: "Women in yellow sarees at a gathering" },
      { src: "/images/mission-detail.jpg", alt: "Carved temple detail" },
    ],
    date: "2026-10-21",
    location: "Vrindavan, Uttar Pradesh",
  },
  {
    slug: "gauseva",
    title: "Gauseva",
    sanskrit: "गौसेवा",
    category: "Care",
    excerpt:
      "Shelter, fodder and medical care for cows — a practice of gentleness towards the creatures who share our world.",
    intro:
      "To care for a cow is to practise patience in its most ordinary form.",
    body: [
      "Gauseva at the mission is a daily rhythm: fodder in the morning, water through the day, clean shelter and veterinary attention when it is needed. The cows are not a spectacle; they are neighbours.",
      "Volunteers learn to move slowly, to notice small changes in health and mood, and to understand that care is mostly repetition. There is no shortcut to trust.",
      "We also support local farmers with fodder during dry months and share what we learn about humane, low-stress animal care.",
    ],
    quote:
      "Gentleness is not weakness. It is strength that has learned to wait.",
    image: "/images/init-gauseva.jpg",
    imageAlt: "A cow resting in warm afternoon light at a shelter",
    gallery: [
      { src: "/images/init-gauseva.jpg", alt: "Cow at the shelter" },
      { src: "/images/temple-field.jpg", alt: "Temple in a green field" },
      { src: "/images/init-environment.jpg", alt: "Banyan tree roots" },
    ],
    date: "2026-10-06",
    location: "Vrindavan, Uttar Pradesh",
  },
  {
    slug: "swasthya-seva",
    title: "Swasthya Seva",
    sanskrit: "स्वास्थ्यसेवा",
    category: "Health",
    excerpt:
      "Health camps, elder visits and practical support for those whose needs are often unseen.",
    intro:
      "Health is not only the absence of illness. It is the presence of care.",
    body: [
      "Swasthya Seva brings basic health check-ups, medicine support and follow-up visits to elders and families with limited access to care. Where a hospital visit is needed, volunteers help with transport and paperwork.",
      "Our elder visits are simple and unhurried: conversation, a warm meal, help around the house. Sometimes the most useful medicine is company.",
      "All health activities are conducted with local practitioners and clear consent. We do not promise outcomes; we try to be reliably present.",
    ],
    quote:
      "To sit with someone in their difficulty is already a form of healing.",
    image: "/images/init-health.jpg",
    imageAlt: "An elderly woman's hands clasped together, holding a warm cup",
    gallery: [
      { src: "/images/init-health.jpg", alt: "Elderly hands holding a cup" },
      { src: "/images/darshan-4.jpg", alt: "Aarti thali" },
      { src: "/images/ghat.jpg", alt: "Boats on the river at Varanasi" },
    ],
    date: "2026-09-18",
    location: "Vrindavan, Uttar Pradesh",
  },
  {
    slug: "nari-shakti",
    title: "Nari Shakti",
    sanskrit: "नारीशक्ति",
    category: "Dignity",
    excerpt:
      "Skills, sisterhood and safe spaces for women building a life on their own terms.",
    intro:
      "When a woman is given room to speak, an entire family begins to listen.",
    body: [
      "Nari Shakti creates space for women to learn practical skills, share difficulties and build small enterprises with others they trust. The programme is led by women from the community, not designed for them from a distance.",
      "Sessions are informal by intention. Children are welcome. Tea is poured. The learning is as much about confidence and solidarity as it is about tailoring, cooking or basic accounting.",
      "The mission's role is to provide materials, mentorship and a steady space — and then to step back and let the women lead.",
    ],
    quote:
      "Dignity grows where a person is heard, not only helped.",
    image: "/images/init-women.jpg",
    imageAlt: "Women in bright yellow sarees at a community gathering in India",
    gallery: [
      { src: "/images/init-women.jpg", alt: "Women at a gathering" },
      { src: "/images/init-education.jpg", alt: "Children on their way to school" },
      { src: "/images/init-health.jpg", alt: "Elderly hands" },
    ],
    date: "2026-09-02",
    location: "Vrindavan, Uttar Pradesh",
  },
  {
    slug: "prakriti-seva",
    title: "Prakriti Seva",
    sanskrit: "प्रकृतिसेवा",
    category: "Environment",
    excerpt:
      "Trees, water and simple choices that leave the neighbourhood a little greener than we found it.",
    intro:
      "The earth does not need our worship as much as it needs our attention.",
    body: [
      "Prakriti Seva tends to the trees and green spaces around the mission, plants native species and encourages waste segregation and water care in the neighbourhood.",
      "The work is practical and local. We plant in the monsoon, water through the dry months and replace what does not survive. There are no ribbons or photo opportunities at the end — only shade, years later.",
      "Children in the Vidya Daan programme are invited to adopt a tree each year, so that care for the natural world becomes part of their education rather than a subject apart from it.",
    ],
    quote:
      "We do not inherit the earth from our ancestors. We borrow it from those who come after us.",
    image: "/images/init-environment.jpg",
    imageAlt: "Sunlight falling through the aerial roots of a banyan tree",
    gallery: [
      { src: "/images/init-environment.jpg", alt: "Banyan tree roots" },
      { src: "/images/temple-field.jpg", alt: "Temple and tree in a green field" },
      { src: "/images/heritage.jpg", alt: "Historic stone temples" },
    ],
    date: "2026-08-14",
    location: "Vrindavan, Uttar Pradesh",
  },
];

export type Publication = {
  slug: string;
  title: string;
  sanskrit: string;
  subtitle: string;
  issue: string;
  date: string;
  description: string;
  href: string;
  theme: "maroon" | "charcoal" | "olive" | "indigo";
  pages: number;
};

export const publications: Publication[] = [
  {
    slug: "prem-sandesh-november-2026",
    title: "Prem Sandesh",
    sanskrit: "प्रेम संदेश",
    subtitle: "The monthly letter of Prabhu Prem Mission",
    issue: "Issue XII",
    date: "2026-11-01",
    description:
      "On stillness as a form of courage, the meaning of lamp offerings, and a letter from the mission kitchen.",
    href: "/gyan/prem-sandesh-november-2026.pdf",
    theme: "maroon",
    pages: 16,
  },
  {
    slug: "antar-yatra-october-2026",
    title: "Antar Yatra",
    sanskrit: "अंतर यात्रा",
    subtitle: "Notes for the inward journey",
    issue: "Issue XI",
    date: "2026-10-01",
    description:
      "The discipline of small beginnings, an introduction to japa, and reflections from the Dham.",
    href: "/gyan/antar-yatra-october-2026.pdf",
    theme: "charcoal",
    pages: 14,
  },
  {
    slug: "seva-katha-september-2026",
    title: "Seva Katha",
    sanskrit: "सेवा कथा",
    subtitle: "Stories from the mission's service",
    issue: "Issue X",
    date: "2026-09-01",
    description:
      "A meal shared at midnight, the quiet work of gauseva, and what the children taught us this month.",
    href: "/gyan/seva-katha-september-2026.pdf",
    theme: "olive",
    pages: 12,
  },
  {
    slug: "gyan-amrit-august-2026",
    title: "Gyan Amrit",
    sanskrit: "ज्ञान अमृत",
    subtitle: "Selections from Guruji's teachings",
    issue: "Issue IX",
    date: "2026-08-01",
    description:
      "On surrender, the practice of listening, and why devotion without humility remains incomplete.",
    href: "/gyan/gyan-amrit-august-2026.pdf",
    theme: "indigo",
    pages: 20,
  },
];

export const gyanSection = {
  eyebrow: "Gyan · Monthly Wisdom",
  title: "Words to carry with you.",
  intro:
    "Each month we gather a small publication of teachings, reflections and stories from the mission. Read it slowly. Take what serves you.",
  cta: { label: "Read the latest publication", href: "/gyan" },
};

export const featuredVideo = {
  eyebrow: "Pravachan",
  title: "On surrender, and the courage of a quiet heart.",
  description:
    "The latest discourse from the Dham — on letting go, listening within, and the steadiness that follows.",
  duration: "42 min",
  eyebrowMeta: "Latest discourse · 2026",
  poster: "/images/video.jpg",
  posterAlt: "A priest offering an evening aarti lamp in rising smoke",
  youtubeId: "", // Add a YouTube ID here (or via CMS) to enable the inline player.
  channel: site.socials.youtube,
};

export const donation = {
  eyebrow: "Support the Mission",
  title: "Be a part of something meaningful.",
  intro:
    "Your contribution helps us continue our spiritual and humanitarian journey — from the morning lamp to the last meal served at night.",
  cta: { label: "Contribute to the mission", href: "/donate" },
  secondary: { label: "Offer Gupta Daan", href: "/donate#gupta-daan" },
  image: "/images/donate-hands.jpg",
  imageAlt: "A hand shielding the flame of a clay diya in the dark",
  trust: [
    {
      title: "Offered with care",
      description:
        "Contributions are applied to the mission's seva and its daily running — never treated as a transaction.",
    },
    {
      title: "Recorded transparently",
      description:
        "Every offering is acknowledged and recorded. Payment instructions are shown only after the form is complete.",
    },
    {
      title: "Kept private",
      description:
        "Gupta Daan is received with discretion. Your details are never shared or published.",
    },
  ],
  payment: {
    note: "These are placeholder payment details. Replace them with the mission's verified details before launch.",
    upiId: "prabhupremmission@upi",
    upiName: "Prabhu Prem Mission",
    qr: "/donate-qr.svg",
    bankName: "State Bank of India",
    accountName: "Prabhu Prem Mission",
    accountNumber: "0000 0000 0000",
    ifsc: "SBIN0000000",
    branch: "Vrindavan, Uttar Pradesh",
    confirmation:
      "After payment, please share a screenshot or reference number with us so the offering can be acknowledged. A payment is never marked complete automatically.",
  },
};

export const newsletter = {
  eyebrow: "Newsletter",
  title: "Let wisdom find its way to you.",
  intro:
    "Receive monthly spiritual reflections, Guruji's teachings and meaningful updates from Prabhu Prem Mission.",
  note: "Monthly. No noise. Unsubscribe whenever you wish.",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Come, sit with us.",
  intro:
    "Whether you are seeking, serving or simply curious, there is a place for you at the Dham. Write to us, and a member of the mission will respond.",
  image: "/images/contact.jpg",
  imageAlt: "A quiet lane of ochre buildings leading towards a North Indian temple",
  hours: "9:00 am – 6:00 pm IST · Monday to Saturday",
  mapNote:
    "The mission is in Vrindavan, Uttar Pradesh. Replace this panel with a verified map location before launch.",
};

export const aboutPage = {
  eyebrow: "About the Mission",
  title: "A life shaped by remembrance.",
  intro:
    "Prabhu Prem Mission is an offering — to the wisdom that has been carried to us, and to the people with whom we share it.",
  heroImage: "/images/heritage.jpg",
  heroImageAlt: "Ancient stone temples standing quietly above a green courtyard",
  visionTitle: "A world where devotion and service are inseparable.",
  visionBody: [
    "We imagine communities where the inner life is not a retreat from the world but a way of meeting it — with more patience, more generosity and less noise.",
    "Our work is small by design. A meal, a class, a visit, a tree, a lamp. We believe that lasting change gathers in these ordinary places.",
  ],
  timeline: [
    {
      chapter: "The seed",
      title: "A mission born of a simple intention.",
      body: "What began as a small gathering of seekers around prayer and conversation grew, slowly, into a place of service. Nothing about it was planned at scale.",
    },
    {
      chapter: "The practice",
      title: "A rhythm of bhakti and seva.",
      body: "The day at the mission moves between the shrine and the world outside it: aarti at dawn, kitchen work through the morning, and quiet study when the day settles.",
    },
    {
      chapter: "The invitation",
      title: "An open door, kept open.",
      body: "Prabhu Prem Mission is not built around a membership. It is built around a welcome — for the seeker, the sceptic, the volunteer and the neighbour.",
    },
  ],
  guidanceTitle: "Our guides",
  guru: {
    name: "Gurudev",
    role: "Founder & Spiritual Guide",
    body: [
      "Gurudev's presence is best described through the life of the mission itself: a commitment to simplicity, a refusal to turn devotion into performance, and an insistence that the spiritual path be walked with others.",
      "Biographical details, photographs and selected teachings will be published here once provided by the mission. Nothing has been invented in their place.",
    ],
    image: "/images/guru-portrait.jpg",
    imageAlt: "A monk in maroon robes in warm morning light — representative image",
  },
  swami: {
    name: "Swami Radharaman Ji",
    role: "Spiritual Guide",
    body: [
      "Swami Radharaman Ji shares the mission's understanding of bhakti as a living practice — tender, disciplined and deeply human.",
      "A full introduction, portrait and recorded teachings are held as placeholders in this design and can be added through the content layer or CMS.",
    ],
    image: "/images/guru.jpg",
    imageAlt:
      "A monk in maroon robes walking alone along a tree-lined path — representative image",
  },
};

export const legal = {
  privacy: {
    title: "Privacy Policy",
    updated: "Placeholder — to be reviewed before launch",
    intro:
      "This policy explains, in plain language, what information Prabhu Prem Mission collects and how it is used. This is sample copy for the design and should be replaced with a legally reviewed policy.",
    sections: [
      {
        title: "What we collect",
        body: "When you write to us, subscribe to the newsletter or offer a donation, we receive the details you choose to share — such as your name, email address and the purpose of your message.",
      },
      {
        title: "How we use it",
        body: "Your details are used only to respond to you, send the communications you asked for, and acknowledge your offering. We do not sell or rent personal information.",
      },
      {
        title: "Your choices",
        body: "You may ask to see, correct or delete the information we hold about you, and you may unsubscribe from the newsletter at any time.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "Placeholder — to be reviewed before launch",
    intro:
      "These terms govern the use of this website. This is sample copy for the design and should be replaced with legally reviewed terms before launch.",
    sections: [
      {
        title: "Use of this website",
        body: "The content here is offered for personal, non-commercial use. You may share links freely; please do not reproduce substantial portions without permission.",
      },
      {
        title: "Donations",
        body: "Payment details shown on this website are placeholders. The mission will publish verified payment channels before accepting contributions. Submitting the donation form does not constitute a completed payment.",
      },
      {
        title: "Changes",
        body: "Content, schedules and these terms may change as the mission grows. Material changes will be reflected on this page.",
      },
    ],
  },
};
