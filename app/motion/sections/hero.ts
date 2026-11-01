// Section 2 + fog joint A (video 0:08–0:14).
// The intro (wordmark rise, fades) runs in CSS from first paint; see
// styles/motion.css. Here: what happens as you scroll away from the hero.
import type { RefObject } from "react";
import { lib } from "../lib";
import { useSectionMotion } from "../useSectionMotion";

export function useHeroMotion(ref: RefObject<HTMLElement | null>) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    const media = root.querySelector(".hero__media");
    const inner = root.querySelector(".hero__inner");
    const word = root.querySelector(".hero__wordmark");

    // Every screen size: the hero holds still while mist thickens from dark to
    // grey to cream, so the next section arrives through fog, not a hard cut.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=60%",
        pin: true,
        pinSpacer: root.parentElement ?? undefined,
        scrub: 0.6,
        anticipatePin: 1,
        // Once the cream veil covers the hero, the nav should switch to its light style.
        onUpdate: (self) => {
          root.dataset.tone = self.progress > 0.72 ? "light" : "dark";
        },
        onLeaveBack: () => {
          root.dataset.tone = "dark";
        },
      },
    });
    tl.to(inner, { opacity: 0, duration: 0.5 }, 0)
      .to(word, { yPercent: desktop ? -6 : -10, duration: 0.5 }, 0)
      .to(media, { yPercent: 8, scale: 1.04, duration: 1 }, 0)
      .fromTo(".hero__veil", { opacity: 0 }, { opacity: 0.6, duration: 0.6 }, 0.1)
      .fromTo(".hero__band--a", { yPercent: 30, opacity: 0 }, { yPercent: -10, opacity: 0.9, duration: 0.9 }, 0)
      .fromTo(".hero__band--b", { yPercent: 50, opacity: 0 }, { yPercent: -20, opacity: 0.7, duration: 0.9 }, 0.05)
      .fromTo(".hero__cream", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4);
  });
}
