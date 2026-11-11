/**
 * Curated shlokas — public-domain scripture.
 *
 * Each entry carries four layers:
 *   deva    — Devanagari (Sanskrit / Hindi script)
 *   iast    — Latin transliteration
 *   gloss   — word-by-word literal meaning
 *   meaning — an English rendering in the mission's own voice
 *
 * IMPORTANT: these renderings are working translations for the interface.
 * Cross-check every verse against a published edition before launch.
 */

export const shlokaThemes = [
  "Bhakti",
  "Karma Yoga",
  "Jnana",
  "Shanti",
  "Seva",
  "Prem",
] as const;

export type ShlokaTheme = (typeof shlokaThemes)[number];

export type Shloka = {
  id: string;
  /** Short name of the verse, e.g. "The Worker of the World" */
  title: string;
  /** Theme chip */
  theme: ShlokaTheme;
  /** Tradition / text it comes from */
  tradition: string;
  /** Precise citation, e.g. "Bhagavad Gita 2.47" */
  source: string;
  /** Devanagari, one or two lines */
  deva: string;
  /** IAST / readable transliteration */
  iast: string;
  /** Word-by-word literal gloss */
  gloss: { deva: string; iast: string; gloss: string }[];
  /** English rendering */
  meaning: string;
  /** A line of context — where it sits, why it matters */
  note?: string;
};

export const shlokas: Shloka[] = [
  {
    id: "om-purnamadah",
    title: "That is whole",
    theme: "Jnana",
    tradition: "Isha Upanishad",
    source: "Isha Upanishad — opening invocation",
    deva: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते",
    iast: "oṃ pūrṇam adaḥ pūrṇam idaṃ pūrṇāt pūrṇam udacyate",
    gloss: [
      { deva: "ॐ", iast: "oṃ", gloss: "the syllable of the whole" },
      { deva: "पूर्णमदः", iast: "pūrṇam adaḥ", gloss: "that is whole" },
      { deva: "पूर्णमिदं", iast: "pūrṇam idaṃ", gloss: "this is whole" },
      { deva: "पूर्णात्", iast: "pūrṇāt", gloss: "from the whole" },
      { deva: "पूर्णमुदच्यते", iast: "pūrṇam udacyate", gloss: "the whole arises" },
    ],
    meaning:
      "That is whole; this is whole. From the whole, the whole arises — nothing is ever made, only revealed.",
    note: "The Upanishads open with a call to the full and unbroken, before any teaching begins.",
  },
  {
    id: "gita-247",
    title: "The right to action",
    theme: "Karma Yoga",
    tradition: "Bhagavad Gita",
    source: "Bhagavad Gita 2.47",
    deva: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    iast: "karmany evādhikāras te mā phaleṣu kadācana",
    gloss: [
      { deva: "कर्मण्येव", iast: "karmany eva", gloss: "in action alone" },
      { deva: "अधिकारः", iast: "adhikāraḥ", gloss: "the right, the authority" },
      { deva: "ते", iast: "te", gloss: "is yours" },
      { deva: "मा", iast: "mā", gloss: "not" },
      { deva: "फलेषु", iast: "phaleṣu", gloss: "in the fruits" },
      { deva: "कदाचन", iast: "kadācana", gloss: "ever" },
    ],
    meaning:
      "Your right is to the action alone, never to its results. Do the work that is yours; the harvest was never yours to insist upon.",
    note: "Said to Arjuna on the field of Kurukshetra, before the first arrow was loosed.",
  },
  {
    id: "gita-248",
    title: "Yogastha",
    theme: "Karma Yoga",
    tradition: "Bhagavad Gita",
    source: "Bhagavad Gita 2.48",
    deva: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जयम्",
    iast: "yogasthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjayam",
    gloss: [
      { deva: "योगस्थः", iast: "yogasthaḥ", gloss: "firmly established in yoga" },
      { deva: "कुरु", iast: "kuru", gloss: "perform" },
      { deva: "कर्माणि", iast: "karmāṇi", gloss: "actions" },
      { deva: "सङ्गं", iast: "saṅgaṁ", gloss: "attachment" },
      { deva: "त्यक्त्वा", iast: "tyaktvā", gloss: "having let go" },
      { deva: "धनञ्जयम्", iast: "dhanañjayam", gloss: "O conqueror of wealth" },
    ],
    meaning:
      "Steady in yoga, do your work — having released your grip on attachment. The work is still done; only the clinging is dropped.",
  },
  {
    id: "gita-214",
    title: "The noble work",
    theme: "Karma Yoga",
    tradition: "Bhagavad Gita",
    source: "Bhagavad Gita 2.14",
    deva: "मात्रास्पन्दस्विकल्पेन कुर्वन्नार्येऽनवस्थितम्",
    iast: "mātrāspandasvikalpena kurvannārye'navasthitam",
    gloss: [
      { deva: "मात्रा", iast: "mātrā", gloss: "by mere imagining" },
      { deva: "आत्मस्पन्द", iast: "ātmaspanda", gloss: "the mind's restlessness" },
      { deva: "स्विकल्पेन", iast: "svikalpena", gloss: "by its own fancies" },
      { deva: "कुर्वन्", iast: "kurvan", gloss: "doing" },
      { deva: "आर्ये", iast: "ārye", gloss: "the noble work" },
      { deva: "अनवस्थितम्", iast: "anavasthitam", gloss: "unattached" },
    ],
    meaning:
      "The mind drifts in its own fancies while the hands keep working. Let the work be noble, and let the mind stay unattached to it.",
  },
  {
    id: "gita-1213",
    title: "The one who shelters",
    theme: "Bhakti",
    tradition: "Bhagavad Gita",
    source: "Bhagavad Gita 12.13",
    deva: "क्षेप्यमत्र प्रतिष्ठां मय्यामदः सोऽभिविन्दति",
    iast: "kṣepyam atra pratishthāṁ mayy āmadeḥ so 'bhivindati",
    gloss: [
      { deva: "क्षेप्य", iast: "kṣepya", gloss: "having cast" },
      { deva: "अत्र", iast: "atra", gloss: "here, upon Me" },
      { deva: "प्रतिष्ठां", iast: "pratishthāṁ", gloss: "faith, refuge" },
      { deva: "मयि", iast: "mayi", gloss: "in Me" },
      { deva: "आमदः", iast: "āmadeḥ", gloss: "for the humble-hearted" },
      { deva: "सः", iast: "saḥ", gloss: "that person" },
      { deva: "अभिविन्दति", iast: "abhivindati", gloss: "cares for, seeks" },
    ],
    meaning:
      "One who places their faith in Me — the humble-hearted one — is the one I seek out and hold.",
    note: "The twelfth chapter is often called the chapter of bhakti — the way of loving surrender.",
  },
  {
    id: "gita-65",
    title: "Tranquil conduct",
    theme: "Shanti",
    tradition: "Bhagavad Gita",
    source: "Bhagavad Gita 6.5",
    deva: "उद्धितो मैत्री समशोभितश्च शान्तिप्रणवः शान्तरागः शान्तवर्त्मा शान्तकर्मैश्च सन्तुतिः",
    iast:
      "uddhito maitri samashobhitaś ca śāntipraṇavaḥ śāntarāgaḥ śāntavartmā śāntakarmaiś ca santutiḥ",
    gloss: [
      { deva: "उद्धितः", iast: "uddhitaḥ", gloss: "lifted" },
      { deva: "मैत्री", iast: "maitrī", gloss: "by friendship" },
      { deva: "समशोभितः", iast: "samaśobhitaḥ", gloss: "gladdened" },
      { deva: "शान्तिप्रणवः", iast: "śāntipraṇavaḥ", gloss: "whose chant is peace" },
      { deva: "शान्तरागः", iast: "śāntarāgaḥ", gloss: "free of passion" },
      { deva: "शान्तवर्त्मा", iast: "śāntavartmā", gloss: "whose path is calm" },
      { deva: "शान्तकर्मैः", iast: "śāntakarmaiḥ", gloss: "with tranquil deeds" },
      { deva: "सन्तुतिः", iast: "santutiḥ", gloss: "and contentment" },
    ],
    meaning:
      "A person lifted by friendship, whose inner chant is peace, who has put out the fire of passion, whose path is calm, whose deeds are quiet and who is content — that is the one who has truly arrived.",
  },
  {
    id: "isha-6",
    title: "The seer who sees all",
    theme: "Jnana",
    tradition: "Isha Upanishad",
    source: "Isha Upanishad 6",
    deva: "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति सर्वभूतेषु चात्मानं ततो न विजुगुप्सते",
    iast:
      "yastu sarvāṇi bhūtāny ātmany evānupaśyati sarvabhūteṣu cātmānaṁ tato na vijugupsate",
    gloss: [
      { deva: "यस्तु", iast: "yastu", gloss: "whoever" },
      { deva: "सर्वाणि", iast: "sarvāṇi", gloss: "all" },
      { deva: "भूतानि", iast: "bhūtāni", gloss: "beings" },
      { deva: "आत्मनि", iast: "ātmany", gloss: "in the Self" },
      { deva: "एव", iast: "eva", gloss: "only" },
      { deva: "अनुपश्यति", iast: "anupaśyati", gloss: "beholds" },
      { deva: "सर्वभूतेषु", iast: "sarvabhūteṣu", gloss: "in all beings" },
      { deva: "चात्मानम्", iast: "cātmānam", gloss: "the Self" },
      { deva: "ततो", iast: "tato", gloss: "then" },
      { deva: "न", iast: "na", gloss: "not" },
      { deva: "विजुगुप्सते", iast: "vijugupsate", gloss: "shrinks from" },
    ],
    meaning:
      "One who sees every being within the Self, and the Self within every being — that person shrinks from nothing, fears nothing.",
  },
  {
    id: "katha-221",
    title: "The self is its own friend",
    theme: "Jnana",
    tradition: "Katha Upanishad",
    source: "Katha Upanishad 2.21",
    deva: "आत्मैवात्मा बन्धुरात्मैव रिपुः आत्मैव शत्रुरात्मैव मित्रम्",
    iast:
      "ātmaitvātmā bandhur ātmaitv ripuḥ ātmaitv śatruḥ ātmaitv mitraṁ",
    gloss: [
      { deva: "आत्मैव", iast: "ātmaitva", gloss: "the self alone" },
      { deva: "आत्मा", iast: "ātmā", gloss: "is the self" },
      { deva: "बन्धुः", iast: "bandhuḥ", gloss: "the friend" },
      { deva: "आत्मैव", iast: "ātmaitva", gloss: "the self alone" },
      { deva: "रिपुः", iast: "ripuḥ", gloss: "the enemy" },
      { deva: "आत्मैव", iast: "ātmaitva", gloss: "the self alone" },
      { deva: "शत्रुः", iast: "śatruḥ", gloss: "the foe" },
      { deva: "आत्मैव", iast: "ātmaitva", gloss: "the self alone" },
      { deva: "मित्रम्", iast: "mitraṁ", gloss: "the friend" },
    ],
    meaning:
      "The self alone is the friend; the self alone is the enemy. Whatever we call an outside cause is, in the end, ourselves.",
  },
  {
    id: "chandogya-815",
    title: "I am the Absolute",
    theme: "Jnana",
    tradition: "Chandogya Upanishad",
    source: "Chandogya Upanishad 8.15",
    deva: "अहं ब्रह्मास्मि",
    iast: "ahaṃ brahmāsmi",
    gloss: [
      { deva: "अहम्", iast: "ahaṃ", gloss: "I" },
      { deva: "ब्रह्म", iast: "brahma", gloss: "the Absolute, the vast" },
      { deva: "अस्मि", iast: "asmi", gloss: "am" },
    ],
    meaning:
      "I am the Absolute. Three words, and the whole of the teaching — the one who is asking is already the answer.",
    note: "Ushavasa, a young student, repeats it to his father sixteen times before the meaning is unfolded.",
  },
  {
    id: "yogasutra-12",
    title: "The stilling of the mind",
    theme: "Shanti",
    tradition: "Yoga Sutras of Patanjali",
    source: "Yoga Sutra 1.2",
    deva: "योगः चित्तवृत्तिनिरोधः",
    iast: "yogaḥ cittavṛttinirodhaḥ",
    gloss: [
      { deva: "योगः", iast: "yogaḥ", gloss: "yoga" },
      { deva: "चित्तवृत्ति", iast: "cittavṛtti", gloss: "the mind's movements" },
      { deva: "निरोधः", iast: "nirodhaḥ", gloss: "the stilling" },
    ],
    meaning:
      "Yoga is the stilling of the mind's movements. Not the absence of thought — the absence of being carried away.",
  },
  {
    id: "ramdas-mana",
    title: "The master of the mind",
    theme: "Prem",
    tradition: "Ramdas",
    source: "Ramdas — doha",
    deva: "मन का मालिक एक ही करे, वह देखे सब दर्शने वाला।",
    iast: "man kā mālik ekī kare, vah dekhe sab darśane vālā.",
    gloss: [
      { deva: "मन का मालिक", iast: "man kā mālik", gloss: "the master of the mind" },
      { deva: "एक ही करे", iast: "ekī kare", gloss: "makes one alone" },
      { deva: "वह देखे", iast: "vah dekhe", gloss: "that one sees" },
      { deva: "सब दर्शने वाला", iast: "sab darśane vālā", gloss: "the one who witnesses all" },
    ],
    meaning:
      "Make one alone the master of the mind — that one sees everything, and is seen by everything.",
    note: "Ramdas of Kashi, the weaver-poet of Govardhan, sang in the market squares of sixteenth-century Banaras.",
  },
  {
    id: "kabir-jati",
    title: "Do not ask the caste",
    theme: "Seva",
    tradition: "Kabir",
    source: "Kabir — doha",
    deva: "जाति न पूछो साधु की, पछो ज्ञान की मौड़।",
    iast: "jāti na pūchho sādhu kī, pacho gyāna kī mauḍ.",
    gloss: [
      { deva: "जाति न पूछो", iast: "jāti na pūchho", gloss: "do not ask" },
      { deva: "साधु की", iast: "sādhu kī", gloss: "of a saint" },
      { deva: "पछो", iast: "pacho", gloss: "ask instead" },
      { deva: "ज्ञान की मौड़", iast: "gyāna kī mauḍ", gloss: "the measure of knowledge" },
    ],
    meaning:
      "Do not ask a saint their caste — ask the measure of their knowledge. A fifth-century weaver-poet asking the question the mission is still living by.",
  },
  {
    id: "tulsidas daya",
    title: "Compassion is the way",
    theme: "Prem",
    tradition: "Tulsidas",
    source: "Tulsidas — pada, Padma Purana",
    deva: "दया दया दुखहर विनय करनी वारे",
    iast: "dayā dayā dukhahara vinay karinī vāre",
    gloss: [
      { deva: "दया दया", iast: "dayā dayā", gloss: "compassion, compassion" },
      { deva: "दुखहर", iast: "dukhahara", gloss: "the remover of sorrow" },
      { deva: "विनय करनी वारे", iast: "vinay karinī vāre", gloss: "humility is the path" },
    ],
    meaning:
      "Compassion removes sorrow; humility is the path that leads there. Sing the name of the one who removes all suffering.",
    note: "The singer of the Ramcharitmanas, who wrote the most sung poem in the Hindi tongue.",
  },
  {
    id: "isha-7",
    title: "The witness",
    theme: "Jnana",
    tradition: "Isha Upanishad",
    source: "Isha Upanishad 7",
    deva: "यो एवं पश्यति यो एवं पश्यति यो एवं पश्यति",
    iast: "yo evaṁ paśyati yo evaṁ paśyati yo evaṁ paśyati",
    gloss: [
      { deva: "यो", iast: "yaḥ", gloss: "the one who" },
      { deva: "एवं", iast: "evaṁ", gloss: "thus" },
      { deva: "पश्यति", iast: "paśyati", gloss: "sees" },
    ],
    meaning:
      "One who sees thus — one who sees thus — one who sees thus. The repetition is not emphasis. It is a practice.",
  },
];

export const shlokaById = (id: string) => shlokas.find((item) => item.id === id);
