"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Palette,
  Server,
  Smartphone,
  Globe,
  Wrench,
  GitBranch,
  TestTube,
  RefreshCw,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      skills: [
        {
          name: "React",
          level: 90,
          icon: <Code className="h-4 w-4" />,
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "TypeScript",
          level: 88,
          icon: <Code className="h-4 w-4" />,
          color: "from-blue-600 to-blue-700",
        },
        {
          name: "Next.js",
          level: 85,
          icon: <Code className="h-4 w-4" />,
          color: "from-gray-600 to-gray-700",
        },
        {
          name: "Tailwind CSS",
          level: 90,
          icon: <Code className="h-4 w-4" />,
          color: "from-cyan-500 to-cyan-600",
        },
        {
          name: "HTML/CSS",
          level: 92,
          icon: <Code className="h-4 w-4" />,
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    {
      title: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      skills: [
        {
          name: "Node.js",
          level: 85,
          icon: <Server className="h-4 w-4" />,
          color: "from-green-500 to-green-600",
        },
        {
          name: "Express.js",
          level: 82,
          icon: <Server className="h-4 w-4" />,
          color: "from-gray-500 to-gray-600",
        },
        {
          name: "GraphQL",
          level: 78,
          icon: <Server className="h-4 w-4" />,
          color: "from-purple-500 to-purple-600",
        },
        {
          name: "REST APIs",
          level: 85,
          icon: <Server className="h-4 w-4" />,
          color: "from-blue-500 to-blue-600",
        },
      ],
    },
    {
      title: "Database & Cloud",
      icon: <Database className="h-6 w-6" />,
      skills: [
        {
          name: "PostgreSQL",
          level: 80,
          icon: <Database className="h-4 w-4" />,
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "AWS Cloud Services",
          level: 75,
          icon: <Database className="h-4 w-4" />,
          color: "from-orange-500 to-orange-600",
        },
        {
          name: "Docker",
          level: 78,
          icon: <Database className="h-4 w-4" />,
          color: "from-blue-600 to-blue-700",
        },
        {
          name: "Serverless",
          level: 72,
          icon: <Database className="h-4 w-4" />,
          color: "from-green-500 to-green-600",
        },
      ],
    },
    {
      title: "Design & Tools",
      icon: <Palette className="h-6 w-6" />,
      skills: [
        {
          name: "Figma",
          level: 70,
          icon: <Palette className="h-4 w-4" />,
          color: "from-purple-500 to-purple-600",
        },
        {
          name: "Git",
          level: 85,
          icon: <Palette className="h-4 w-4" />,
          color: "from-orange-600 to-orange-700",
        },
        {
          name: "VS Code",
          level: 90,
          icon: <Palette className="h-4 w-4" />,
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Postman",
          level: 80,
          icon: <Palette className="h-4 w-4" />,
          color: "from-orange-500 to-orange-600",
        },
      ],
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      skills: [
        {
          name: "React Native",
          level: 70,
          icon: <Smartphone className="h-4 w-4" />,
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Flutter",
          level: 65,
          icon: <Smartphone className="h-4 w-4" />,
          color: "from-blue-600 to-blue-700",
        },
      ],
    },
    {
      title: "Other Technologies",
      icon: <Globe className="h-6 w-6" />,
      skills: [
        {
          name: "GraphQL",
          level: 75,
          icon: <Globe className="h-4 w-4" />,
          color: "from-pink-500 to-pink-600",
        },
        {
          name: "Redis",
          level: 70,
          icon: <Globe className="h-4 w-4" />,
          color: "from-red-500 to-red-600",
        },
        {
          name: "Jest",
          level: 80,
          icon: <Globe className="h-4 w-4" />,
          color: "from-red-600 to-red-700",
        },
      ],
    },
    {
      title: "Tools & Testing",
      icon: <Wrench className="h-6 w-6" />,
      skills: [
        {
          name: "Git",
          level: 85,
          icon: <GitBranch className="h-4 w-4" />,
          color: "from-orange-500 to-orange-600",
        },
        {
          name: "Jest",
          level: 75,
          icon: <TestTube className="h-4 w-4" />,
          color: "from-green-500 to-green-600",
        },
        {
          name: "CircleCI",
          level: 70,
          icon: <RefreshCw className="h-4 w-4" />,
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Zustand",
          level: 80,
          icon: <Database className="h-4 w-4" />,
          color: "from-purple-500 to-purple-600",
        },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`p-1 bg-gradient-to-r ${skill.color} rounded text-white`}
                        >
                          {skill.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                        }}
                        viewport={{ once: true }}
                        className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-300`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Always Learning & Growing
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Technology evolves rapidly, and I&apos;m committed to continuous
            learning. I regularly explore new frameworks, tools, and
            methodologies to stay current with industry best practices and
            deliver cutting-edge solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
