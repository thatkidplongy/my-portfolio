const Asterisk = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-5 w-5 shrink-0 animate-[spin_9s_linear_infinite] text-signal"
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
 * The repeated section opener: a slowly rotating asterisk beside a small
 * uppercase label. Every section on the page starts with one.
 */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="slide-up-and-fade mb-12 flex items-center gap-4">
    <Asterisk />
    <h2 className="text-sm uppercase leading-none tracking-[0.2em] text-body">
      {children}
    </h2>
  </div>
);

export default SectionLabel;
