/**
 * The projects that get the pinned scroll story, in page order: two client
 * projects first so a visitor meets the production work before the personal
 * work. Everything else lives on the projects route, since the treatment
 * only reads as special while it is rare and each beat costs a viewport of
 * scroll.
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
        body: "Ordering, payments, documents and CRM each own their slice, tied together with schema first GraphQL. Live in Australia and serving buyers daily.",
      },
    ],
  },
  {
    id: "exit-on-your-terms",
    name: "Exit on Your Terms",
    image: "/eoyt.png",
    imageAlt: "The Exit on Your Terms business value estimate calculator",
    liveUrl:
      "https://app.exitonyourterms.com/business-value-estimate-calculator",
    beats: [
      {
        index: "01",
        title: "What is the business actually worth",
        body: "Owners planning an exit get a value estimate from their own numbers, without booking a valuation first.",
      },
      {
        index: "02",
        title: "Three calculators, one model",
        body: "Value estimate, discretionary earnings and value gap share the same engine, so the figures agree. Built in Next.js to embed inside the client's own funnel.",
      },
    ],
  },
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
        body: "Each citation is checked in code against the document it came from, with confidence computed from real signals and a published benchmark that catches models citing sentences they invented.",
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
        body: "React Native and Expo on the front, FastAPI and SQLite behind it, so progress survives a lost connection. Built to survive daily use by its own author.",
      },
    ],
  },
];
