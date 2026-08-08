import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Showcases from "@/components/sections/showcases";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Showcases />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
