// Sections 4–6 (video 0:14–0:24): arched window, count-up, photo card.
import type { RefObject } from "react";
import { lib } from "../lib";
import { fadeUp } from "../reveal";
import { dur, parallaxMax } from "../tokens";
import { useSectionMotion } from "../useSectionMotion";

type R = RefObject<HTMLElement | null>;

/** 4. Text and arch scroll at different speeds; the window opens as it rises. */
export function useReassuranceMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    const k = parallaxMax(desktop) / 140; // offsets below are the desktop values
    const q = (s: string) => root.querySelector(s);
    gsap
      .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 } })
      .fromTo(q(".reassure__l1"), { y: 80 * k }, { y: -120 * k }, 0)
      .fromTo(q(".reassure__arch"), { y: 60 * k }, { y: -40 * k }, 0)
      .fromTo(q(".reassure__l3"), { y: 140 * k }, { y: -60 * k }, 0);
    gsap
      .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top bottom", end: "center center", scrub: 0.6 } })
      .fromTo(q(".reassure__arch"), { scale: desktop ? 0.88 : 0.94 }, { scale: 1 }, 0)
      .fromTo(q(".reassure__pic img"), { scale: 1.15 }, { scale: 1 }, 0);
    fadeUp(q(".reassure__text"), desktop, { start: "top 75%" });
  });
}

/** 5. Numbers count up while sharpening from a blur (an opacity crossfade). */
export function useGlanceMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    gsap.utils.toArray<HTMLElement>(".fact", root).forEach((fact, i) => {
      const nums = fact.querySelectorAll<HTMLElement>(".fact__num[data-count]");
      const target = Number(nums[0]?.dataset.count ?? 0);
      const tl = gsap.timeline({ scrollTrigger: { trigger: fact, start: "top 85%", once: true }, delay: (i % 2) * 0.15 });
      tl.fromTo(fact.querySelector(".fact__value"), { y: 12 }, { y: 0, duration: dur.mask, ease: "calm" }, 0)
        .fromTo(fact.querySelector(".fact__sharp"), { opacity: 0 }, { opacity: 1, duration: dur.mask, ease: "calm" }, 0)
        .fromTo(fact.querySelector(".fact__blur"), { opacity: 1 }, { opacity: 0, duration: dur.mask, ease: "calm" }, 0)
        .fromTo(fact.querySelector(".fact__label"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: "calm" }, 0.3);
      if (target) {
        const big = target > 9;
        const counter = { v: 0 };
        const write = () => nums.forEach((n) => (n.textContent = String(Math.round(counter.v))));
        write();
        tl.to(
          counter,
          {
            v: target,
            duration: big ? (desktop ? dur.draw : 1) : desktop ? 1.2 : 1,
            ease: big ? "calm" : `steps(${target})`,
            onUpdate: write,
            onComplete: () => nums.forEach((n) => (n.textContent = String(target))),
          },
          0,
        );
      }
    });
    gsap.fromTo(".glance__contours", { y: 0 }, { y: desktop ? -40 : -30, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    // Restore the real numbers if the animation is reverted (mode change).
    return () => root.querySelectorAll<HTMLElement>(".fact__num[data-count]").forEach((n) => (n.textContent = n.dataset.count!));
  });
}

/** 6. The photo card rises slower than its overlapping headline. */
export function useCredentialsMotion(ref: R) {
  useSectionMotion(ref, ({ desktop }) => {
    const { gsap } = lib;
    const root = ref.current!;
    const card = root.querySelector(".creds__card");
    const title = root.querySelector(".creds__title");
    // Phones too, with shorter travel so the overlap still reads.
    gsap
      .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top bottom", end: "center center", scrub: 0.6 } })
      .fromTo(card, { y: desktop ? 120 : 50 }, { y: 0 }, 0)
      .fromTo(title, { y: desktop ? 200 : 90 }, { y: 0 }, 0);
    fadeUp(root.querySelector(".creds__copy .kicker"), desktop);
    fadeUp(root.querySelector(".creds__teaser"), desktop, { start: "top 80%" });
    fadeUp(root.querySelectorAll(".creds__row"), desktop, { stagger: 0.1, start: "top 85%" });
  });
}
