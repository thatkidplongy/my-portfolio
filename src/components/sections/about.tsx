import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import DownloadCVButton from "@/components/ui/DownloadCVButton";

const DETAILS = [
  { label: "Location", value: "Cebu City, Philippines" },
  { label: "Experience", value: "5+ Years" },
  { label: "Email", value: "fgclavano@gmail.com", href: "mailto:fgclavano@gmail.com" },
  { label: "Phone", value: "0966 453 2948", href: "tel:+639664532948" },
];

const About = () => (
  <section id="about" className="pb-section">
    <div className="container-x">
      <p className="slide-up-and-fade mb-24 max-w-5xl text-3xl font-extralight leading-[1.25] text-body md:text-5xl md:leading-[1.2]">
        I build software the way I was trained to build circuits. Understand
        the whole system first, then make every part earn its place.
      </p>

      <SectionLabel>About</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-20">
        <div className="slide-up-and-fade group relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-elevated">
          <Image
            src="/profile-image.jpg"
            alt="Florante G. Clavano Jr."
            fill
            sizes="(min-width: 1024px) 340px, 100vw"
            priority
            className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div>
          <h3 className="slide-up-and-fade display text-5xl md:text-6xl">
            Hi, I&apos;m Florante.
          </h3>

          <div className="mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-muted">
            <p className="slide-up-and-fade">
              I studied as an{" "}
              <span className="text-signal">
                Electronics and Communications Engineer
              </span>{" "}
              and practiced the profession for a year before moving into
              software, a shift that came straight out of how much I enjoyed
              coding back in college.
            </p>
            <p className="slide-up-and-fade">
              Five years on, I&apos;ve shipped production web apps across
              ecommerce, logistics, business valuation and property technology.
              I work across the stack: React and Next.js on the front, Node and
              GraphQL services behind it, plus the database schemas, testing
              and AWS infrastructure that hold it together.
            </p>
            <p className="slide-up-and-fade">
              Most recently that has meant{" "}
              <span className="text-signal">AI powered features</span> on AWS
              Bedrock: an LLM report platform with confidence scoring and
              citation tracking, a document intelligence pipeline benchmarked
              across 500+ historical reports, and a migration off OpenAI and
              LangChain onto Bedrock and MCP.
            </p>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="slide-up bg-canvas p-5">
                <dt className="text-xs uppercase tracking-[0.15em] text-faint">
                  {detail.label}
                </dt>
                <dd className="mt-2 text-body">
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="transition-colors duration-300 hover:text-signal"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="slide-up-and-fade mt-12">
            <DownloadCVButton />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
