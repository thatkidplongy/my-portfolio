const Asterisk = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4 shrink-0 animate-[spin_9s_linear_infinite] text-signal"
    fill="currentColor"
  >
    {[0, 60, 120].map((angle) => (
      <rect
        key={angle}
        x="10.6"
        y="1"
        width="2.8"
        height="22"
        rx="1.4"
        transform={`rotate(${angle} 12 12)`}
      />
    ))}
  </svg>
);

/**
 * The repeated section opener: a slowly rotating asterisk beside the section
 * name, set small so it reads as a quiet marker and leaves the headlines to
 * carry the page.
 */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="slide-up-and-fade mb-10 flex items-center gap-3">
    <Asterisk />
    <h2 className="display text-lg leading-none">{children}</h2>
  </div>
);

export default SectionLabel;
