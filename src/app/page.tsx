import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import DocSightShowcase from "@/components/sections/docsight-showcase";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <DocSightShowcase />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
