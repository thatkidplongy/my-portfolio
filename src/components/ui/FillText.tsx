/**
 * Text that wipes to the accent colour on hover. Renders a second, coloured
 * copy over the first; `.fill-word` in globals.css animates its clip.
 *
 * The fill is triggered by hovering an enclosing link or the text itself, so
 * this works both inside project rows and as a standalone heading.
 */
const FillText = ({ children }: { children: string }) => (
  <span className="fill-word">
    {children}
    <span data-fill aria-hidden="true">
      {children}
    </span>
  </span>
);

export default FillText;
