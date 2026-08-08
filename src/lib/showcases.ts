/**
 * The projects that get the pinned scroll story, in page order. Everything
 * else stays in the project list: the treatment only reads as special while
 * it is reserved for a few, and each entry costs a viewport of scroll per
 * beat.
 */

export interface ShowcaseBeat {
  index: string;
  title: string;
  body: string;
}

export interface Showcase {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  beats: ShowcaseBeat[];
}

export const SHOWCASES: Showcase[] = [
  {
    id: "docsight",
    name: "DocSight",
    image: "/docsight.png",
    imageAlt:
      "DocSight answering a question about an SEC filing with citations",
    liveUrl: "https://docsight-ten.vercel.app/",
    repoUrl: "https://github.com/thatkidplongy/docsight",
    beats: [
      {
        index: "01",
        title: "Ask anything of a filing",
        body: "Drop in an SEC filing and ask a question in plain English. Retrieval runs on device, so nothing leaves the browser.",
      },
      {
        index: "02",
        title: "Every claim carries a citation",
        body: "Answers arrive with their sources attached, and each citation is checked in code against the document it came from.",
      },
      {
        index: "03",
        title: "Confidence you can inspect",
        body: "Scores are computed from retrieval and verification signals, not guessed by the model describing its own work.",
      },
      {
        index: "04",
        title: "Benchmarked against invention",
        body: "A published benchmark catches models citing sentences they made up, so the guarantees are measured rather than claimed.",
      },
    ],
  },
  {
    id: "beforeyoubuy",
    name: "Before You Buy",
    image: "/beforeyoubuy.png",
    imageAlt: "The Before You Buy property report platform",
    liveUrl: "https://www.beforeyoubuy.com.au/",
    beats: [
      {
        index: "01",
        title: "Every property report in one place",
        body: "Buyers order building, pest and strata reports through a single funnel instead of chasing separate inspectors and inboxes.",
      },
      {
        index: "02",
        title: "Built across eight microservices",
        body: "Ordering, payments, documents and CRM each own their slice, tied together with schema first GraphQL and shipped on CircleCI.",
      },
      {
        index: "03",
        title: "Serving real buyers daily",
        body: "Live in production in Australia, with state specific compliance forms and bundling that opened new revenue streams.",
      },
    ],
  },
  {
    id: "arise",
    name: "Arise",
    image: "/arise.png",
    imageAlt: "Arise, a life RPG mobile app showing quests and rank progress",
    repoUrl: "https://github.com/thatkidplongy/arise",
    beats: [
      {
        index: "01",
        title: "Your life as a quest log",
        body: "Daily habits become quests with XP, ranks and streaks, borrowing the progression loop that makes Solo Leveling addictive.",
      },
      {
        index: "02",
        title: "Native, offline first",
        body: "React Native and Expo on the front, FastAPI and SQLite behind it, so progress survives a lost connection.",
      },
      {
        index: "03",
        title: "Built to keep me honest",
        body: "A personal project that had to survive daily use by its own author, which is a harsher reviewer than any test suite.",
      },
    ],
  },
];
