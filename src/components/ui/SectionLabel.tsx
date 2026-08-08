const Asterisk = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-7 w-7 shrink-0 animate-[spin_9s_linear_infinite] text-signal md:h-9 md:w-9"
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
 * name set in display type, so each section announces itself at the same
 * scale as the headlines rather than as fine print.
 */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="slide-up-and-fade mb-10 flex items-center gap-5">
    <Asterisk />
    <h2 className="display text-4xl leading-none md:text-6xl">{children}</h2>
  </div>
);

export default SectionLabel;
