// Fog joints B, C, D (A is folded into the pinned hero).
// Video 0:52.5, 1:01.5, 1:11. Mist rises through the boundary as you scroll;
// the "drift" is scroll-linked, never a loop.
import type { RefObject } from "react";
import { lib } from "../lib";
import { useSectionMotion } from "../useSectionMotion";

export function useFogMotion(ref: RefObject<HTMLElement | null>, toLight: boolean) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const el = ref.current!;
    if (getComputedStyle(el).display === "none") return;
    const a = el.querySelector(".fog__band--a");
    const b = el.querySelector(".fog__band--b");
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
    });
    tl.fromTo(a, { yPercent: 40, opacity: 0.1 }, { yPercent: 0, opacity: 0.9, duration: 0.5 }, 0).to(
      a,
      { yPercent: -30, opacity: 0.45, duration: 0.5 },
      0.5,
    );
    // The second band drifts sideways against the first (a little less on phones).
    const dir = toLight ? -1 : 1;
    const x = desktop ? 3 : 5;
    tl.fromTo(b, { xPercent: -x * dir, yPercent: 30, opacity: 0 }, { xPercent: x * dir, yPercent: -20, opacity: 0.7, duration: 1 }, 0);
  });
}
