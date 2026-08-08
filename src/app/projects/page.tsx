import type { Metadata } from "next";
import Projects from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects | Florante G. Clavano Jr.",
  description:
    "Client and personal projects: property platforms, AI document tooling, mobile apps and internal dashboards.",
};

export default function ProjectsPage() {
  // The section supplies its own bottom padding only: inline it followed
  // another section, as a page it needs clearance under the fixed menu.
  return (
    <div className="pt-32 lg:pt-40">
      <Projects />
    </div>
  );
}
