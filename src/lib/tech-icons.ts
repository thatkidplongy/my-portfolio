import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiStyledcomponents,
  SiVite,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiServerless,
  SiTrpc,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiRailway,
  SiFlutter,
  SiGit,
  SiGithub,
  SiJest,
  SiCircleci,
  SiFigma,
  SiPostman,
  SiPuppeteer,
  SiWordpress,
  SiGoogleappsscript,
  SiGooglesheets,
  SiGooglecalendar,
  SiVuedotjs,
  SiVuetify,
  SiQuasar,
  SiClaude,
  SiExpo,
  SiFastapi,
  SiReactquery,
  SiSqlite,
  SiApollographql,
  SiSequelize,
  SiStripe,
  SiHubspot,
  SiMui,
  SiNestjs,
  SiPython,
  SiVercel,
  SiXero,
} from "react-icons/si";
import { FaAws, FaSlack } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import {
  Braces,
  Brain,
  FlaskConical,
  Layers,
  MonitorSmartphone,
  Plug,
  ScanText,
  Webhook,
} from "lucide-react";

export type TechIconComponent =
  | IconType
  | React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

export interface TechIcon {
  Icon: TechIconComponent;
  color: string;
}

/** Used for anything that has no real brand mark of its own. */
const NEUTRAL = "var(--color-muted)";

const AWS: TechIcon = { Icon: FaAws, color: "#FF9900" };
const REACT: TechIcon = { Icon: SiReact, color: "#61DAFB" };
const NEXT: TechIcon = { Icon: SiNextdotjs, color: "#FFFFFF" };
const VUE: TechIcon = { Icon: SiVuedotjs, color: "#4FC08D" };
const POSTGRES: TechIcon = { Icon: SiPostgresql, color: "#4169E1" };

/**
 * Keys are names normalised by {@link normalise}, so "Next.js", "Next.JS" and
 * "NextJS" all resolve to the same entry. Brands whose mark is black in their
 * own guidelines use white here so they stay visible on the dark canvas.
 */
const REGISTRY: Record<string, TechIcon> = {
  // Frontend
  react: REACT,
  reactjs: REACT,
  reactnative: REACT,
  reactvite: { Icon: SiVite, color: "#646CFF" },
  vite: { Icon: SiVite, color: "#646CFF" },
  nextjs: NEXT,
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  tailwindcss: { Icon: SiTailwindcss, color: "#38BDF8" },
  html: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: SiCss, color: "#1572B6" },
  styledcomponents: { Icon: SiStyledcomponents, color: "#DB7093" },
  shadcnui: { Icon: SiShadcnui, color: "#FFFFFF" },
  zustand: { Icon: Layers, color: NEUTRAL },
  tanstackquery: { Icon: SiReactquery, color: "#FF4154" },
  reactquery: { Icon: SiReactquery, color: "#FF4154" },
  responsivedesign: { Icon: MonitorSmartphone, color: NEUTRAL },

  // AI and LLM. Bedrock is an AWS service so it carries the AWS mark; MCP and
  // the capability entries have no brand of their own.
  awsbedrock: AWS,
  bedrock: AWS,
  claude: { Icon: SiClaude, color: "#D97757" },
  mcp: { Icon: Plug, color: NEUTRAL },
  llmintegration: { Icon: Brain, color: NEUTRAL },
  documentintelligence: { Icon: ScanText, color: NEUTRAL },
  pdfparsing: { Icon: ScanText, color: NEUTRAL },

  // Backend
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E" },
  nestjs: { Icon: SiNestjs, color: "#E0234E" },
  python: { Icon: SiPython, color: "#4B8BBE" },
  fastapi: { Icon: SiFastapi, color: "#009688" },
  apollo: { Icon: SiApollographql, color: "#7B5CF0" },
  apolloclient: { Icon: SiApollographql, color: "#7B5CF0" },
  apolloserver: { Icon: SiApollographql, color: "#7B5CF0" },
  sequelize: { Icon: SiSequelize, color: "#52B0E7" },
  expressjs: { Icon: SiExpress, color: "#FFFFFF" },
  graphql: { Icon: SiGraphql, color: "#E10098" },
  serverless: { Icon: SiServerless, color: "#FD5750" },
  trpc: { Icon: SiTrpc, color: "#398CCB" },
  restapis: { Icon: Webhook, color: NEUTRAL },
  restfulapis: { Icon: Webhook, color: NEUTRAL },

  // Data and cloud
  postgresql: POSTGRES,
  postgresdb: POSTGRES,
  sqlite: { Icon: SiSqlite, color: "#4DB6F0" },
  redis: { Icon: SiRedis, color: "#FF4438" },
  aws: AWS,
  awslambda: AWS,
  sqs: AWS,
  elasticache: AWS,
  docker: { Icon: SiDocker, color: "#2496ED" },
  railway: { Icon: SiRailway, color: "#FFFFFF" },
  s3: AWS,
  vercel: { Icon: SiVercel, color: "#FFFFFF" },

  // Product integrations
  stripe: { Icon: SiStripe, color: "#635BFF" },
  hubspot: { Icon: SiHubspot, color: "#FF7A59" },
  xero: { Icon: SiXero, color: "#13B5EA" },
  mui: { Icon: SiMui, color: "#2E9BFF" },

  // Mobile
  expo: { Icon: SiExpo, color: "#FFFFFF" },
  flutter: { Icon: SiFlutter, color: "#47C5FB" },

  // Tooling and testing
  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub, color: "#FFFFFF" },
  jest: { Icon: SiJest, color: "#C63D14" },
  unittesting: { Icon: FlaskConical, color: NEUTRAL },
  circleci: { Icon: SiCircleci, color: "#FFFFFF" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
  vscode: { Icon: VscVscode, color: "#22A0E8" },
  postman: { Icon: SiPostman, color: "#FF6C37" },
  puppeteer: { Icon: SiPuppeteer, color: "#40B5A4" },

  // Platforms and integrations
  wordpress: { Icon: SiWordpress, color: "#3C9CD7" },
  googleappscript: { Icon: SiGoogleappsscript, color: "#4285F4" },
  googlesheets: { Icon: SiGooglesheets, color: "#34A853" },
  googlecalendar: { Icon: SiGooglecalendar, color: "#4285F4" },
  slack: { Icon: FaSlack, color: "#36C5F0" },

  // Vue era
  vuejs: VUE,
  vue2: VUE,
  vue3: VUE,
  vuetify: { Icon: SiVuetify, color: "#2E86E0" },
  quasar: { Icon: SiQuasar, color: "#3A93E8" },
};

const FALLBACK: TechIcon = { Icon: Braces, color: NEUTRAL };

const normalise = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

export const getTechIcon = (name: string): TechIcon =>
  REGISTRY[normalise(name)] ?? FALLBACK;
