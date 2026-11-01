// Sections 16–17 (video 1:02.5–1:11): the map and info card, and the FAQ.
import { useEffect, useRef, type RefObject } from "react";
import { lib } from "../lib";
import { fadeUp } from "../reveal";
import { useMotion } from "../MotionProvider";
import { useSectionMotion } from "../useSectionMotion";

type R = RefObject<HTMLElement | null>;

/** 16. Map lines fade in, marker scales in; switching chips crossfades the card
 *  and, for "Online", one ripple expands from the marker (plays once, no loop). */
export function useWhereMotion(ref: R, tab: number) {
  const { mode } = useMotion();
  const shownTab = useRef(tab);

  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    gsap
      .timeline({ scrollTrigger: { trigger: ".where__grid", start: "top 75%", once: true } })
      .from(root.querySelectorAll(".map__roads path, .map__lake"), { opacity: 0, duration: 0.9, ease: "calm", stagger: 0.03 }, 0)
      .from(root.querySelector(".map__marker"), { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "calm" }, 0.5)
      .from(root.querySelector(".map__sector"), { opacity: 0, duration: 0.6, ease: "calm" }, 0.4)
      .fromTo(
        root.querySelector(".where__card:not([hidden])"),
        { opacity: 0, y: desktop ? 24 : 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "calm", clearProps: "transform" },
        0.2,
      );
  });

  // React to chip changes (outside the scroll setup, so it never re-runs it).
  useEffect(() => {
    // Only a real chip change animates; the engine loading (mode changing)
    // must not, or the scroll reveal above would capture a half-faded card.
    if (shownTab.current === tab) return;
    shownTab.current = tab;
    if (mode !== "full" || !lib.gsap || !ref.current) return;
    const { gsap } = lib;
    const card = ref.current.querySelector(".where__card:not([hidden])");
    gsap.fromTo(card, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: "ui", clearProps: "transform" });
    if (tab === 1) {
      gsap.fromTo(
        ref.current.querySelector(".map__ripple circle"),
        { opacity: 0.6, scale: 0.6, transformOrigin: "50% 50%" },
        { opacity: 0, scale: 1.8, duration: 1.2, ease: "calm" },
      );
    }
  }, [tab, mode, ref]);
}

/** 17. Rows reveal with a stagger; the plus icon rotation is CSS. */
export function useFaqMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    fadeUp(ref.current!.querySelectorAll(".qa"), desktop, { stagger: 0.06, start: "top 85%", trigger: ref.current!.querySelector(".faq__list")! });
  });
}
