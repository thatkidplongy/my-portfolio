import SectionLabel from "@/components/ui/SectionLabel";
import ScrollToButton from "@/components/ui/ScrollToButton";
import FillText from "@/components/ui/FillText";
import { getTechIcon } from "@/lib/tech-icons";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const EXPERIENCES: Experience[] = [
  {
    id: "1",
    company: "Apteum",
    position: "Full Stack Engineer",
    location: "Cebu City, Cebu",
    period: "Nov 2024 to Present",
    description:
      "Building AI powered features on AWS Bedrock for a property inspection SaaS platform, alongside full stack product work across its microservices.",
    achievements: [
      "Spearheaded an AI strata inspection report platform on AWS Bedrock (Claude), with answer suggestions, confidence scores and cited PDF sources, cutting manual report writing time for inspectors",
      "Architected a Data as a Service pipeline from report upload to structured JSON via Bedrock extraction, benchmarked across 500+ historical reports",
      "Led the migration from OpenAI and LangChain to Bedrock plus an MCP server for LLM summaries, lowering API costs and improving reliability",
      "Built a real time collaborative report editor with version history, one click restore and WYSIWYG to PDF parity",
      "Delivered 30+ features across 8+ microservices, from Stripe and HubSpot integrations to compliance forms and a product bundling engine",
      "Served as Release Manager, coordinating cross team QA, hotfixes and CI/CD on CircleCI and Vercel",
    ],
    technologies: [
      "AWS Bedrock",
      "Claude",
      "MCP",
      "LLM Integration",
      "TypeScript",
      "React",
      "Next.js",
      "GraphQL",
      "Apollo",
      "Node.js",
      "Sequelize",
      "PostgreSQL",
      "Serverless",
      "AWS Lambda",
      "S3",
      "SQS",
      "ElastiCache",
      "Stripe",
      "HubSpot",
      "Docker",
      "CircleCI",
      "Vercel",
    ],
  },
  {
    id: "2",
    company: "Valhalla Online Services Inc.",
    position: "Frontend Engineer",
    location: "Cebu City, Cebu",
    period: "Dec 2023 to Oct 2024",
    description:
      "Spearheaded frontend development on business value calculators and UBX websites using Next.js, TypeScript and Tailwind.",
    achievements: [
      "Spearheaded frontend development on three calculators on exit on your terms using Nextjs/Typescript/Tailwind on mobile, tablet and web views",
      "Developed react components following atomic design principle on mobile, tablet and web views",
      "Handled the creation of new features and maintenance in UBX Websites using Nextjs/Typescript/Tailwind on mobile, tablet and web views",
      "Created templates using javascript, html and css to be used by Marketing and Print in UBX",
      "Regularly presenting updates to the client every week, and resolve and apply their feedbacks",
      "Developed figma designs into code using Tailwind",
      "Developed figma designs into code to pdf generation using Puppeteer",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Puppeteer",
    ],
  },
  {
    id: "3",
    company: "Codevelopr, Inc.",
    position: "Software Engineer",
    location: "BGC, Taguig City",
    period: "Dec 2022 to Jul 2024",
    description:
      "Developed and maintained frontend applications using React, Next.js and TypeScript for the Kairos Medical Laboratory Management System.",
    achievements: [
      "Developed and maintained frontend applications using React, Next.js, and TypeScript",
      "Implemented state management using Zustand",
      "Integrated with RESTful APIs to fetch and manipulate data",
      "Leveraged trpc (Transport RPC) to build efficient and type safe communication between client and server",
      "Worked closely with designers and UX/UI teams to create intuitive and user friendly interfaces",
      "Collaborated with backend developers to define and consume API contracts",
      "Assisted in troubleshooting and debugging production issues to ensure smooth operation of the applications",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Zustand",
      "trpc",
      "RESTful APIs",
    ],
  },
  {
    id: "4",
    company: "Focus Global Inc.",
    position: "Full Stack Software Engineer",
    location: "Bonifacio Global City, Taguig",
    period: "May 2022 to Sep 2022",
    description:
      "Wrote atomic designed components with responsive design and developed backend API endpoints.",
    achievements: [
      "Wrote atomic designed components with responsive design (desktop, mobile, tablet screens)",
      "Designed frontend structure from FIGMA layouts",
      "Wrote filter and router functions",
      "Implemented Image Optimization",
      "Implemented general API Client for multiple project use",
      "Developed Google App Script integration of Google sheets to Google Calendar and Slack apps",
      "Wrote backend api endpoints",
      "Developed unit test for api endpoints",
      "Handled maintenance of existing wordpress website",
    ],
    technologies: [
      "React",
      "TypeScript",
      "WordPress",
      "Google App Script",
      "Google Sheets",
      "Google Calendar",
      "Slack",
      "Unit Testing",
    ],
  },
  {
    id: "5",
    company: "Apollo Global Technologies",
    position: "Software Developer",
    location: "Makati City",
    period: "Sep 2021 to Apr 2022",
    description:
      "Wrote frontend components using Vuetify and Quasar, and migrated the project from Vue 2 to Vue 3.",
    achievements: [
      "Wrote frontend components using vuetify and quasar",
      "Implemented filtering system for table of data and maps data",
      "Developed graph data features",
      "Migrated whole project code from Vue 2 (Vuetify) to Vue 3 (Quasar)",
    ],
    technologies: ["Vue.js", "Vuetify", "Quasar", "JavaScript", "Vue 2", "Vue 3"],
  },
];

const AchievementList = ({ achievements }: { achievements: string[] }) => (
  <ul className="mt-5 space-y-2">
    {achievements.map((achievement) => (
      <li key={achievement} className="flex gap-3 leading-relaxed text-muted">
        <span
          aria-hidden="true"
          className="mt-[0.6em] inline-block h-1 w-1 shrink-0 rounded-full bg-signal"
        />
        <span>{achievement}</span>
      </li>
    ))}
  </ul>
);

/**
 * Placed as a direct grid child rather than nested in the header: that lets the
 * grid put it under the job title on desktop while it still falls last in
 * source order, which is where it belongs on a single column phone layout.
 * Short travel reveal, not the long one: at 150px the row leaves a visible
 * hole under the bullets while it waits for its trigger.
 */
const TechList = ({ technologies }: { technologies: string[] }) => (
  <ul className="slide-up flex flex-wrap gap-x-4 gap-y-2 lg:col-start-1 lg:row-start-2">
    {technologies.map((tech) => {
      const { Icon, color } = getTechIcon(tech);

      return (
        <li key={tech} className="flex items-center gap-2 text-sm text-muted">
          <Icon
            className="h-5 w-5 shrink-0"
            style={{ color }}
            aria-hidden="true"
          />
          {tech}
        </li>
      );
    })}
  </ul>
);

const Experience = () => (
  <section id="experience" className="pb-section">
    <div className="container-x">
      <SectionLabel>My Experience</SectionLabel>

      <div>
        {EXPERIENCES.map((job) => (
          <article
            key={job.id}
            className="grid gap-6 border-t border-line py-9 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-6"
          >
            <header className="slide-up-and-fade">
              <p className="text-muted">{job.company}</p>
              <h3 className="display mt-2 text-3xl md:text-4xl">
                <FillText>{job.position}</FillText>
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-faint">
                {job.period}
              </p>
              <p className="mt-1 text-sm text-faint">{job.location}</p>
            </header>

            <div className="slide-up-and-fade lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <p className="text-lg leading-relaxed text-body">
                {job.description}
              </p>

              <AchievementList achievements={job.achievements} />
            </div>

            <TechList technologies={job.technologies} />
          </article>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-12">
        <p className="slide-up-and-fade mb-8 max-w-2xl text-2xl font-extralight text-muted md:text-3xl">
          Looking for an engineer who can take a feature from schema to screen?
        </p>
        <div className="slide-up-and-fade">
          <ScrollToButton target="#contact">Let&apos;s Work Together</ScrollToButton>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
