// Section 8 (video 0:30–0:34): the route draws itself as you scroll (a
// clip-path wipe over a dashed ghost path); stops appear one by one.
import type { RefObject } from "react";
import { lib } from "../lib";
import { useSectionMotion } from "../useSectionMotion";

const STOP_AT = [1 / 6, 1 / 2, 5 / 6]; // stop positions along the wave (x / width)

export function useJourneyMotion(ref: RefObject<HTMLElement | null>) {
  useSectionMotion(ref, () => {
    const { gsap } = lib;
    const root = ref.current!;
    const tablet = window.matchMedia("(min-width: 768px)").matches;
    const texts = gsap.utils.toArray<HTMLElement>(".journey__stop", root);

    if (!tablet) {
      // Phones: the same route, drawn as a vertical rail. As the line reaches
      // each stop, its dot fills in and the step rises into view.
      const rail = root.querySelector<HTMLElement>(".journey__rail")!;
      const mdots = gsap.utils.toArray<HTMLElement>(".journey__mdot", root);
      const parts = texts.map((t) => t.querySelectorAll("p"));
      const deep = getComputedStyle(root).getPropertyValue("--deep").trim() || "#2e5651";
      texts.forEach((t) => t.setAttribute("data-bound", ""));
      gsap.set(parts, { opacity: 0, y: 20 });
      gsap.set(mdots, { scale: 0.55 });
      let marks: number[] = [];
      const measure = () => {
        const top = rail.getBoundingClientRect().top;
        const h = Math.max(1, rail.offsetHeight);
        marks = mdots.map((d) => (d.getBoundingClientRect().top + d.offsetHeight / 2 - top) / h);
      };
      const shown = texts.map(() => false);
      const reveal = (i: number) => {
        shown[i] = true;
        gsap.to(mdots[i], { scale: 1, backgroundColor: deep, duration: 0.45, ease: "calm" });
        gsap.to(parts[i], { opacity: 1, y: 0, duration: 0.9, ease: "calm", stagger: 0.08, clearProps: "transform" });
      };
      const check = (p: number) => marks.forEach((m, i) => !shown[i] && p >= m - 0.02 && reveal(i));
      measure();
      gsap.fromTo(
        ".journey__rail-line",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "none",
          scrollTrigger: {
            trigger: rail,
            start: "top 70%",
            end: "bottom 45%",
            scrub: 0.6,
            onRefresh: (self) => {
              measure();
              check(self.progress);
            },
            onUpdate: (self) => check(self.progress),
            onLeave: () => check(1),
          },
        },
      );
      return;
    }

    const dots = gsap.utils.toArray<HTMLElement>(".journey__dot", root);
    gsap.set(dots, { scale: 0, opacity: 0 });
    gsap.set(texts, { opacity: 0, y: 16 });
    const shown = [false, false, false];
    const reveal = (i: number) => {
      shown[i] = true;
      gsap.to(dots[i], { scale: 1, opacity: 1, duration: 0.4, ease: "calm" });
      gsap.to(texts[i], { opacity: 1, y: 0, duration: 0.9, ease: "calm", delay: 0.1, clearProps: "transform" });
    };

    gsap.fromTo(
      ".journey__solid",
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: ".journey__wave",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.6,
          onUpdate: (self) => STOP_AT.forEach((at, i) => !shown[i] && self.progress >= at - 0.03 && reveal(i)),
        },
      },
    );
  });
}
