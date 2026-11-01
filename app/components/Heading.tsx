type Parts = { before?: string; em: string; after?: string };

/** Renders a heading whose middle words are set in italic, e.g. "Areas of *support*". */
export function Heading({
  h,
  as: As = "h2",
  className = "h2",
  id,
  mask = true,
}: {
  h: Parts;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  mask?: boolean;
}) {
  return (
    <As className={className} id={id} data-mask={mask ? "" : undefined}>
      {h.before}
      <em>{h.em}</em>
      {h.after}
    </As>
  );
}
