import SectionLabel from "@/components/ui/SectionLabel";
import RouteCta from "@/components/ui/RouteCta";
import ShowcaseStory from "@/components/showcase/ShowcaseStory";
import { SHOWCASES } from "@/lib/showcases";

/**
 * The featured projects, each told as a pinned scroll story. Sides alternate
 * so consecutive stories do not read as one long column.
 */
const Showcases = () => (
  <section id="featured" className="py-section lg:pb-0">
    <div className="container-x lg:mb-16">
      <SectionLabel>Featured</SectionLabel>
    </div>

    {SHOWCASES.map((showcase, i) => (
      <ShowcaseStory
        key={showcase.id}
        showcase={showcase}
        reversed={i % 2 === 1}
      />
    ))}

    <div className="container-x slide-up-and-fade pt-16 lg:pt-24">
      <RouteCta href="/projects">See all projects</RouteCta>
    </div>
  </section>
);

export default Showcases;
