"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

// Custom component for project images with fallback
const ProjectImage = ({ project }: { project: Project }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-t-lg flex items-center justify-center text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="text-center relative z-10">
          <Eye className="h-12 w-12 mx-auto mb-3 opacity-90" />
          <p className="text-sm font-semibold mb-1">Image Failed to Load</p>
          <p className="text-xs opacity-90 max-w-32 leading-tight mb-2">
            {project.title}
          </p>
          <p className="text-xs opacity-70 break-all">Path: {project.image}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        className="w-full h-48 object-cover rounded-t-lg transition-opacity duration-300 border border-gray-300"
        onLoad={() => {
          console.log(`Image loaded successfully for ${project.title}`);
        }}
        onError={(e) => {
          console.error(`Image error for ${project.title}:`, e);
          setImageError(true);
        }}
        width={1000}
        height={1000}
      />
    </div>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      id: "1",
      title: "Exit on Your Terms - Business Value Calculator",
      description:
        "A comprehensive business valuation calculator with three main tools: Business Value Estimate Calculator, Discretionary Earnings Calculator, and Value Gap Analysis. Built with Next.js, TypeScript, and Tailwind CSS for responsive design across all devices.",
      image: "/eoyt.png",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React",
        "Responsive Design",
        "Business Logic",
      ],
      githubUrl: "https://github.com/yourusername/business-value-calculator",
      liveUrl:
        "https://app.exitonyourterms.com/business-value-estimate-calculator",
      featured: true,
    },
    {
      id: "2",
      title: "UBX Training & Franchise Website",
      description:
        "A comprehensive website for UBX Training, Own UBX Franchise, and The Training Camp. Features include responsive design, content management, and marketing templates for print and digital use.",
      image: "/ubx-training.png",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React",
        "Marketing Templates",
        "Puppeteer",
      ],
      githubUrl: "https://github.com/yourusername/ubx-website",
      liveUrl: "https://ubxtraining.com",
      featured: true,
    },

    {
      id: "3",
      title: "Socially - Social Media Platform",
      description:
        "A social media website inspired by Pinterest, featuring user authentication, content sharing, and social interactions. Built with modern web technologies for optimal user experience.",
      image: "/socially.png",
      techStack: [
        "React",
        "TypeScript",
        "Social Media Features",
        "User Authentication",
        "Content Management",
      ],
      githubUrl: "https://github.com/yourusername/socially",
      liveUrl: "https://socially-by-plongy.vercel.app/",
      featured: false,
    },
    {
      id: "4",
      title: "Sneakpeek - E-commerce Platform",
      description:
        "A full-featured e-commerce website for sneakers, watches, and headsets. Includes product catalog, shopping cart, user authentication, and payment processing.",
      image: "/sneak-peek.png",
      techStack: [
        "E-commerce",
        "Product Management",
        "Shopping Cart",
        "Payment Processing",
        "User Authentication",
      ],
      githubUrl: "https://github.com/yourusername/sneapeek",
      liveUrl: "https://sneakpeek-plongy.vercel.app/",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and technical capabilities
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <ProjectImage project={project} />

                {/* Project Links */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                      aria-label="View live demo"
                    >
                      <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            More Projects
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Additional projects showcasing various technologies and approaches
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <ProjectImage project={project} />

                {/* Project Links */}
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                      aria-label="View live demo"
                    >
                      <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </motion.a>
                  )}
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                    aria-label="View source code"
                  >
                    <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h4>

                <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Project Links */}
                <div className="flex space-x-2">
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Demo</span>
                    </motion.a>
                  )}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <Github className="h-3 w-3" />
                    <span>Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Interested in working together or have a project in mind?
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
            Let&apos;s Talk
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
