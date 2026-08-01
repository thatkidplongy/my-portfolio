import SectionLabel from "@/components/ui/SectionLabel";
import FillText from "@/components/ui/FillText";
import { getTechIcon } from "@/lib/tech-icons";

const STACK: { title: string; skills: string[] }[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Zustand",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "GraphQL", "REST APIs", "Serverless"],
  },
  {
    title: "Database & Cloud",
    skills: ["PostgreSQL", "Redis", "AWS", "Docker"],
  },
  {
    title: "Mobile",
    skills: ["React Native", "Flutter"],
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

      <div className="space-y-16">
        {STACK.map((group) => (
          <div
            key={group.title}
            className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12"
          >
            <h3 className="slide-up-and-fade display text-4xl text-muted md:text-5xl">
              <FillText>{group.title}</FillText>
            </h3>

            <ul className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:pt-1">
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

      <p className="slide-up-and-fade mt-20 max-w-3xl text-xl font-extralight leading-relaxed text-muted md:text-2xl">
        Technology moves fast, so I keep moving with it, regularly picking up
        new frameworks, tools and methodologies to stay current and ship better
        work.
      </p>
    </div>
  </section>
);

export default Skills;
