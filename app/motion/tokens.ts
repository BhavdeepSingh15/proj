// Motion tokens: the single source for every animation on the site.
// Nothing bounces, nothing loops, nothing shorter than 0.2 s for content.
export const ease = {
  calm: "calm", // cubic-bezier(0.22, 1, 0.36, 1)
  glide: "glide", // cubic-bezier(0.65, 0, 0.35, 1)
  ui: "ui", // cubic-bezier(0.2, 0, 0, 1)
} as const;

export const curves = {
  calm: "0.22,1,0.36,1",
  glide: "0.65,0,0.35,1",
  ui: "0.2,0,0,1",
} as const;

export const dur = {
  ui: 0.3,
  reveal: 0.9,
  mask: 1.2,
  draw: 1.6,
} as const;

export const stagger = {
  line: 0.08,
  item: 0.12,
} as const;

export const rise = (desktop: boolean) => (desktop ? 24 : 20);
export const parallaxMax = (desktop: boolean) => (desktop ? 140 : 90);
export const scrub = 0.6;
export const lenisLerp = 0.1;
export const skewMax = 3; // degrees, gallery cards
