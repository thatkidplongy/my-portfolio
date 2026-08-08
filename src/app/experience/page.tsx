import type { Metadata } from "next";
import Experience from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience | Florante G. Clavano Jr.",
  description:
    "Five years of software engineering across AI platforms, property tech and franchise systems.",
};

export default function ExperiencePage() {
  // The section supplies its own bottom padding only: inline it followed
  // another section, as a page it needs clearance under the fixed menu.
  return (
    <div className="pt-32 lg:pt-40">
      <Experience />
    </div>
  );
}
