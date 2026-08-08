import SectionLabel from "@/components/ui/SectionLabel";
import ShowcaseStory from "@/components/showcase/ShowcaseStory";
import { SHOWCASES } from "@/lib/showcases";

/**
 * The featured projects, each told as a pinned scroll story. Sides alternate
 * so consecutive stories do not read as one long column.
 */
const Showcases = () => (
  <section id="featured" className="py-section lg:pb-0">
    <div className="container-x">
      <SectionLabel>Featured</SectionLabel>
    </div>

    {SHOWCASES.map((showcase, i) => (
      <ShowcaseStory
        key={showcase.id}
        showcase={showcase}
        reversed={i % 2 === 1}
      />
    ))}
  </section>
);

export default Showcases;
