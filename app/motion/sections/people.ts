// Sections 9–11 (video 0:34–0:52.5): alternating rows with self-drawing line
// art, the About collage with staggered tiles, and the circle swatches.
import type { RefObject } from "react";
import { lib } from "../lib";
import { fadeUp, maskUp } from "../reveal";
import { dur, stagger } from "../tokens";
import { useSectionMotion } from "../useSectionMotion";

type R = RefObject<HTMLElement | null>;

/** 9. Each row: the drawing draws in, its panel slides in from its own side. */
export function useApproachesMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    gsap.utils.toArray<HTMLElement>(".arow", root).forEach((row, i) => {
      const panel = row.querySelector(".arow__panel");
      const paths = row.querySelectorAll(".drawing path");
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 75%", once: true } });
      tl.fromTo(
        panel,
        { opacity: 0, x: (i % 2 ? -1 : 1) * (desktop ? 40 : 28) },
        { opacity: 1, x: 0, y: 0, duration: 1, ease: "calm", clearProps: "transform" },
        0,
      )
        .from(paths, { drawSVG: "0%", duration: dur.draw, ease: "glide", stagger: 0.15 }, 0.15)
        .fromTo(
          row.querySelectorAll(".arow__text > *"),
          { opacity: 0, y: desktop ? 24 : 16 },
          { opacity: 1, y: 0, duration: dur.reveal, ease: "calm", stagger: stagger.line, clearProps: "transform" },
          0.1,
        );
    });
  });
}

/** 10. Background warms to sand; tiles rise at staggered speeds; the quote unmasks. */
export function useAboutMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    gsap.fromTo(
      ".about__sand",
      { opacity: 0 },
      { opacity: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 55%", scrub: 0.6 } },
    );
    // Tiles drift at different speeds. On phones the collage sits below the
    // text, so it is its own trigger and the travel is shorter.
    const collage = root.querySelector(".about__collage");
    const k = desktop ? 1 : 0.35;
    const tile = (sel: string, from: number, to: number) =>
      gsap.fromTo(sel, { y: from * k }, { y: to * k, ease: "none", scrollTrigger: { trigger: desktop ? root : collage, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    tile(".about__tile--portrait", 0, -40);
    tile(".about__tile--texture", 60, -60);
    tile(".about__tile--water", 100, -80);
    if (!desktop) {
      gsap.fromTo(root.querySelectorAll(".about__tile picture"), { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "calm", stagger: 0.12, scrollTrigger: { trigger: collage, start: "top 85%", once: true } });
    }
    const quote = root.querySelector<HTMLElement>(".about__quote p");
    if (quote) maskUp(quote, { start: "top 75%" });
    fadeUp(root.querySelectorAll(".about__bio p"), desktop, { stagger: stagger.line, start: "top 85%" });
  });
}

/** 11. Circles scale and fade in one after another. */
export function useWorksWithMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    const circles = root.querySelectorAll(".works__circle");
    const labels = root.querySelectorAll(".works__label");
    gsap
      .timeline({ scrollTrigger: { trigger: ".works__circles", start: "top 75%", once: true } })
      .fromTo(
        circles,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: dur.reveal, ease: "calm", stagger: desktop ? 0.15 : 0.1, clearProps: "transform" },
        0,
      )
      .fromTo(labels, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "calm", stagger: desktop ? 0.15 : 0.1 }, 0.2);
    fadeUp(root.querySelectorAll(".works__concerns li"), desktop, { stagger: 0.05, start: "top 85%" });
  });
}
