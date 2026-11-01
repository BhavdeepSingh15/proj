// Sections 13–14 (video 0:53.5–1:01.5, plus the timeline at 1:05).
import type { RefObject } from "react";
import { lib } from "../lib";
import { fadeUp } from "../reveal";
import { dur, stagger } from "../tokens";
import { useSectionMotion } from "../useSectionMotion";

type R = RefObject<HTMLElement | null>;

/** 13. Rules grow down, then four numbered columns rise with a stagger. */
export function useExpectMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    gsap
      .timeline({ scrollTrigger: { trigger: ".expect__cols", start: "top 80%", once: true } })
      .fromTo(root.querySelectorAll(".expect__rule"), { scaleY: 0 }, { scaleY: 1, duration: dur.reveal, ease: "calm", stagger: stagger.item }, 0)
      .fromTo(
        root.querySelectorAll(".expect__col > :not(.expect__rule)"),
        { opacity: 0, y: desktop ? 40 : 28 },
        { opacity: 1, y: 0, duration: 1, ease: "calm", stagger: desktop ? 0.05 : 0.04, clearProps: "transform" },
        0.1,
      );
  });
}

/** 14. Groups fade up; the rail's cream line fills with reading progress. */
export function usePoliciesMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    gsap.utils.toArray<HTMLElement>(".policy", root).forEach((p) => fadeUp(p, desktop, { start: "top 85%" }));
    gsap.fromTo(
      ".policies__fill",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".policies__list", start: "top center", end: "bottom center", scrub: 0.6 },
      },
    );
  });
}
