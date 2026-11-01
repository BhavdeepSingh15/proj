// Section 18 (video 1:11–1:14): contact on dark. Fog joint D sits above it.
import type { RefObject } from "react";
import { lib } from "../lib";
import { fadeUp } from "../reveal";
import { useSectionMotion } from "../useSectionMotion";

export function useContactMotion(ref: RefObject<HTMLElement | null>) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    fadeUp(root.querySelectorAll(".contact__copy [data-reveal]"), desktop, { stagger: 0.06, start: "top 85%", trigger: root });
    fadeUp(root.querySelectorAll(".composer__head, .composer [data-field]"), desktop, {
      stagger: 0.06,
      start: "top 80%",
      trigger: root.querySelector(".contact__form")!,
    });
    // The WhatsApp pill settles into place (no pulse, no loop).
    gsap.fromTo(
      ".contact__wa",
      { scale: 0.96 },
      { scale: 1, duration: 0.9, ease: "calm", clearProps: "transform", scrollTrigger: { trigger: root, start: "top 70%", once: true } },
    );
  });
}
