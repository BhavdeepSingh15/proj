// Abstract line drawings for the six approaches and the three "Works with"
// circles. Single 1.25 px stroke, round caps; drawn in by DrawSVG on scroll.
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const drawings: Record<string, React.ReactNode> = {
  // A tangled loop that straightens into a calm line.
  cbt: (
    <path
      {...common}
      d="M24,150 C52,150 62,108 92,110 C122,112 124,160 100,168 C76,176 66,136 94,122 C124,108 146,146 130,168 C116,186 96,164 116,142 C136,120 164,140 182,146 C206,154 240,148 336,148"
    />
  ),
  // Two opposed waves that meet and settle into one.
  dbt: (
    <>
      <path {...common} d="M24,92 C96,92 124,176 192,148" />
      <path {...common} d="M24,206 C96,206 124,120 192,148" />
      <path {...common} d="M192,148 C224,136 252,150 336,148" />
    </>
  ),
  // A broken line rejoined with small, careful stitches.
  cpt: (
    <>
      <path {...common} d="M24,140 C80,130 122,152 160,142" />
      <path {...common} d="M200,142 C242,132 292,152 336,140" />
      <path {...common} d="M163,126 L175,158" />
      <path {...common} d="M176,126 L188,158" />
      <path {...common} d="M189,126 L201,158" />
    </>
  ),
  // Two nested arcs, one sheltering the other.
  attachment: (
    <>
      <path {...common} d="M70,212 C70,122 128,70 180,70 C232,70 290,122 290,212" />
      <path {...common} d="M180,148 a30,30 0 1,1 -0.1,0" />
      <path {...common} d="M40,226 L320,226" opacity="0.5" />
    </>
  ),
  // Small circles of different sizes gathered around a central one.
  ifs: (
    <>
      <path {...common} d="M180,102 a38,38 0 1,1 -0.1,0" />
      <path {...common} d="M96,82 a14,14 0 1,1 -0.1,0" />
      <path {...common} d="M262,74 a18,18 0 1,1 -0.1,0" />
      <path {...common} d="M286,172 a12,12 0 1,1 -0.1,0" />
      <path {...common} d="M110,180 a20,20 0 1,1 -0.1,0" />
      <path {...common} d="M180,36 a10,10 0 1,1 -0.1,0" />
      <path {...common} d="M204,226 a9,9 0 1,1 -0.1,0" />
    </>
  ),
  // Two ripples overlapping.
  couples: (
    <>
      <path {...common} d="M148,118 a22,22 0 1,1 -0.1,0" />
      <path {...common} d="M148,94 a46,46 0 1,1 -0.1,0" />
      <path {...common} d="M148,70 a70,70 0 1,1 -0.1,0" opacity="0.6" />
      <path {...common} d="M212,118 a22,22 0 1,1 -0.1,0" />
      <path {...common} d="M212,94 a46,46 0 1,1 -0.1,0" />
      <path {...common} d="M212,70 a70,70 0 1,1 -0.1,0" opacity="0.6" />
    </>
  ),
};

export function ApproachDrawing({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 360 280" className="drawing" aria-hidden="true" focusable="false">
      {drawings[id]}
    </svg>
  );
}

const glyphs: Record<string, React.ReactNode> = {
  small: (
    <>
      <path {...common} d="M50,42 a8,8 0 1,1 -0.1,0" />
      <path {...common} d="M50,32 a18,18 0 1,1 -0.1,0" />
    </>
  ),
  one: (
    <>
      <path {...common} d="M50,38 a12,12 0 1,1 -0.1,0" />
      <path {...common} d="M50,26 a24,24 0 1,1 -0.1,0" />
      <path {...common} d="M50,14 a36,36 0 1,1 -0.1,0" opacity="0.6" />
    </>
  ),
  two: (
    <>
      <path {...common} d="M38,38 a12,12 0 1,1 -0.1,0" />
      <path {...common} d="M38,24 a26,26 0 1,1 -0.1,0" />
      <path {...common} d="M62,38 a12,12 0 1,1 -0.1,0" />
      <path {...common} d="M62,24 a26,26 0 1,1 -0.1,0" />
    </>
  ),
};

export function Glyph({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 100 100" className="glyph" aria-hidden="true" focusable="false">
      {glyphs[id]}
    </svg>
  );
}
