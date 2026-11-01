// Shared reveal patterns, used inside useSectionMotion callbacks.
import { lib } from "./lib";
import { dur, rise, stagger } from "./tokens";

/** Fade-up: opacity 0 → 1 and y rise → 0, once, when the element nears view. */
export function fadeUp(
  targets: string | Element | Element[] | NodeListOf<Element> | null,
  desktop: boolean,
  opts: { trigger?: Element | string; start?: string; stagger?: number; delay?: number } = {},
) {
  const { gsap } = lib;
  const els = gsap.utils.toArray<HTMLElement>(targets);
  if (!els.length) return;
  els.forEach((e) => e.setAttribute("data-bound", ""));
  gsap.fromTo(
    els,
    { opacity: 0, y: rise(desktop) },
    {
      opacity: 1,
      y: 0,
      duration: dur.reveal,
      ease: "calm",
      stagger: opts.stagger ?? stagger.line,
      delay: opts.delay ?? 0,
      clearProps: "transform",
      scrollTrigger: { trigger: opts.trigger ?? els[0], start: opts.start ?? "top 85%", once: true },
    },
  );
}

/** Mask-up: split display type into masked lines that rise into place. */
export function maskUp(el: HTMLElement | null, opts: { start?: string; trigger?: Element } = {}) {
  if (!el) return;
  el.setAttribute("data-bound", "");
  const { gsap, SplitText } = lib;
  // Headings get an aria-label with the full text; other elements keep their
  // text readable as-is (aria-label isn't allowed on a <p>).
  const aria = /^H[1-6]$/.test(el.tagName) ? "auto" : "none";
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line", aria });
  gsap.set(el, { opacity: 1 });
  gsap.from(split.lines, {
    yPercent: 105,
    duration: dur.mask,
    ease: "calm",
    stagger: stagger.line,
    scrollTrigger: { trigger: opts.trigger ?? el, start: opts.start ?? "top 85%", once: true },
  });
  return split;
}

/** Scrubbed vertical drift between two offsets while the trigger crosses the viewport. */
export function drift(target: string | Element | null, trigger: Element, from: number, to: number, start = "top bottom", end = "bottom top") {
  lib.gsap.fromTo(target, { y: from }, { y: to, ease: "none", scrollTrigger: { trigger, start, end, scrub: 0.6 } });
}

