"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Building, ExternalLink } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

const Experience = () => {
  const experiences: Experience[] = [
    {
      id: "1",
      company: "Apteum",
      position: "Full-Stack Engineer",
      location: "7th Floor, Park Centrale, Bldg, Cebu City, 6000 Cebu",
      startDate: "Nov 2024",
      endDate: "Present",
      current: true,
      description:
        "Handle DB schema planning, migrations for new implementations and develop end-to-end new feature flows.",
      achievements: [
        "Handle DB schema planning, migrations for new implementations",
        "Created UML sequence diagram in every ticket assigned (API design, frontend ↔ backend communication)",
        "Designed entity-relationship diagram for every flow/ticket assigned",
        "Plan, develop, test end to end new feature flows",
        "Implemented unit testing for E2E flow for every day ticket for new and previous developed functions/implementations",
      ],
      technologies: [
        "TypeScript",
        "ReactJS",
        "Next.JS",
        "GraphQL",
        "NodeJS",
        "ExpressJS",
        "Serverless",
        "AWS Lambda",
        "SQS",
        "ElastiCache",
        "Postgres DB",
        "Docker",
        "CircleCI",
        "Github",
      ],
      companyUrl: undefined,
    },
    {
      id: "2",
      company: "Valhalla Online Services Inc.",
      position: "Frontend Engineer",
      location: "IT Services and IT Consulting, Cebu City, Cebu",
      startDate: "Dec 2023",
      endDate: "Oct 2024",
      current: false,
      description:
        "Spearheaded frontend development on business value calculators and UBX websites using Next.js/TypeScript/Tailwind.",
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
      companyUrl: undefined,
    },
    {
      id: "3",
      company: "Codevelopr, Inc.",
      position: "Software Engineer",
      location: "BGC, Taguig City",
      startDate: "Dec 2022",
      endDate: "Jul 2024",
      current: false,
      description:
        "Developed and maintained front-end applications using React, Next.js, and TypeScript for Kairos Medical Laboratory Management System.",
      achievements: [
        "Developed and maintained front-end applications using React, Next.js, and TypeScript",
        "Implemented state management using Zustand",
        "Integrated with RESTful APIs to fetch and manipulate data",
        "Leveraged trpc (Transport RPC) to build efficient and type-safe communication between client and server",
        "Worked closely with designers and UX/UI teams to create intuitive and user-friendly interfaces",
        "Collaborated with back-end developers to define and consume API contracts",
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
      companyUrl: undefined,
    },
    {
      id: "4",
      company: "Focus Global Inc.",
      position: "Full-Stack Software Engineer",
      location: "Bonifacio Global City, Taguig",
      startDate: "May 2022",
      endDate: "Sep 2022",
      current: false,
      description:
        "Wrote atomic designed components with responsive design and developed backend API endpoints.",
      achievements: [
        "Wrote atomic designed components with responsive design (desktop, mobile, tablet screens)",
        "Designed front-end structure from FIGMA layouts",
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
      companyUrl: undefined,
    },
    {
      id: "5",
      company: "Apollo Global Technologies",
      position: "Software Developer",
      location: "Makati City",
      startDate: "Sep 2021",
      endDate: "Apr 2022",
      current: false,
      description:
        "Wrote front-end components using Vuetify and Quasar, and migrated project from Vue 2 to Vue 3.",
      achievements: [
        "Wrote front-end components using vuetify and quasar",
        "Implemented filtering system for table of data and maps data",
        "Developed graph data features",
        "Migrated whole project code from Vue 2 (Vuetify) to Vue 3 (Quasar)",
      ],
      technologies: [
        "Vue.js",
        "Vuetify",
        "Quasar",
        "JavaScript",
        "Vue 2",
        "Vue 3",
      ],
      companyUrl: undefined,
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and the impact I&apos;ve made along the way
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10" />

                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {experience.company}
                          </h3>
                          {experience.companyUrl && (
                            <motion.a
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              href={experience.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                              aria-label="Visit company website"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </motion.a>
                          )}
                        </div>

                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {experience.position}
                        </h4>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {experience.startDate} -{" "}
                          {experience.current ? "Present" : experience.endDate}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-1">
                        {experience.achievements.map(
                          (achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-blue-600 dark:text-blue-400 mt-1">
                                •
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {achievement}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Technologies Used:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Looking for a developer who can deliver results?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Let&apos;s Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
