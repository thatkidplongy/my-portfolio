import SectionLabel from "@/components/ui/SectionLabel";
import RouteCta from "@/components/ui/RouteCta";
import FillText from "@/components/ui/FillText";
import { getTechIcon } from "@/lib/tech-icons";

const STACK: { title: string; skills: string[] }[] = [
  {
    title: "AI & LLM",
    skills: [
      "AWS Bedrock",
      "Claude",
      "MCP",
      "LLM Integration",
      "Document Intelligence",
      "PDF Parsing",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MUI",
      "Zustand",
      "TanStack Query",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "GraphQL",
      "Apollo",
      "Express.js",
      "Nest.js",
      "Sequelize",
      "Python",
      "FastAPI",
      "Serverless",
      "REST APIs",
    ],
  },
  {
    title: "Database & Cloud",
    skills: ["PostgreSQL", "Redis", "AWS Lambda", "S3", "Docker", "Vercel"],
  },
  {
    title: "Integrations",
    skills: ["Stripe", "HubSpot", "Xero"],
  },
  {
    title: "Mobile",
    skills: ["React Native", "Expo", "Flutter"],
  },
  {
    title: "Tools & Testing",
    skills: ["Git", "Jest", "CircleCI", "Figma", "VS Code", "Postman"],
  },
];

const Skills = () => (
  <section id="skills" className="pb-section">
    <div className="container-x">
      <SectionLabel>My Stack</SectionLabel>

      <div className="space-y-10">
        {STACK.map((group) => (
          <div
            key={group.title}
            className="grid gap-4 border-t border-line pt-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12"
          >
            <h3 className="slide-up-and-fade display text-4xl text-muted md:text-5xl">
              <FillText>{group.title}</FillText>
            </h3>

            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4 lg:pt-1">
              {group.skills.map((skill) => {
                const { Icon, color } = getTechIcon(skill);

                return (
                  <li
                    key={skill}
                    className="slide-up flex items-center gap-4 text-body transition-colors duration-300 hover:text-accent"
                  >
                    <Icon
                      className="h-8 w-8 shrink-0"
                      style={{ color }}
                      aria-hidden="true"
                    />
                    <span className="text-lg">{skill}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="slide-up-and-fade mt-14 max-w-3xl text-xl font-extralight leading-relaxed text-muted md:text-2xl">
        Technology moves fast, so I keep moving with it, regularly picking up
        new frameworks, tools and methodologies to stay current and ship better
        work.
      </p>

      <div className="slide-up-and-fade mt-12">
        <RouteCta href="/experience">Where I have used it</RouteCta>
      </div>
    </div>
  </section>
);

export default Skills;
