// Section 7 (video 0:24–0:30): vertical scroll drives a horizontal track of
// cards; a progress line with a dawn dot fills along the bottom; cards skew
// gently with scroll speed (capped at 3°, eased back to 0 when you stop).
// Same on phones: there the heading scrolls up under the nav first, then the
// cards and progress line hold, centred in the space below it.
import type { RefObject } from "react";
import { lib } from "../lib";
import { skewMax } from "../tokens";
import { useSectionMotion } from "../useSectionMotion";

export function useSupportMotion(ref: RefObject<HTMLElement | null>, setIndex: (i: number) => void) {
  useSectionMotion(ref, ({ desktop, lenis }) => {
    const { gsap } = lib;
    const root = ref.current!;
    const cards = gsap.utils.toArray<HTMLElement>(".scard", root);
    const inners = cards.map((c) => c.querySelector<HTMLElement>(".scard__inner")!);

    const pin = root.querySelector<HTMLElement>(".support__pin")!;
    const track = root.querySelector<HTMLElement>(".support__track")!;
    const viewport = root.querySelector<HTMLElement>(".support__viewport")!;
    const progress = root.querySelector<HTMLElement>(".support__progress")!;
    const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

    // Phones: how far into the pin to start, so the heading has gone and the
    // cards + progress line are centred between the nav and the bottom edge.
    const navH = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64;
    const phoneOffset = () => {
      const top = pin.getBoundingClientRect().top;
      const stageTop = viewport.getBoundingClientRect().top - top;
      const stageH = progress.getBoundingClientRect().bottom - viewport.getBoundingClientRect().top;
      const room = window.innerHeight - navH();
      return Math.max(0, Math.round(stageTop - navH() - Math.max(0, (room - stageH) / 2)));
    };

    gsap.from(inners, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.08,
      ease: "calm",
      scrollTrigger: { trigger: pin, start: "top 75%", once: true },
    });

    // Phones: the heading fades as it slides up under the nav, so only the
    // cards and progress line remain while the track moves.
    if (!desktop) {
      gsap.fromTo(
        root.querySelector(".support__head"),
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: () => `top+=${Math.max(0, phoneOffset() - window.innerHeight * 0.35)} top`,
            end: () => `top+=${phoneOffset()} top`,
            scrub: 0.4,
          },
        },
      );
    }

    const skewTo = gsap.quickTo(inners, "skewX", { duration: 0.5, ease: "calm" });
    let settle: gsap.core.Tween | null = null;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: () => (desktop ? "top top" : `top+=${phoneOffset()} top`),
        end: () => `+=${distance()}`,
        // ScrollTrigger makes its own spacer here: handing it .support__spacer
        // made Chrome report a full-viewport layout shift on every refresh.
        // React never moves the pin, so the extra wrapper is safe.
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          root.style.setProperty("--p", self.progress.toFixed(4));
          setIndex(Math.round(self.progress * (cards.length - 1)));
          const skew = gsap.utils.clamp(-skewMax, skewMax, self.getVelocity() / -400);
          skewTo(skew);
          settle?.kill();
          settle = gsap.delayedCall(0.12, () => skewTo(0));
        },
      },
    });

    // Keyboard: when a card's link gets focus, scroll to where that card shows.
    const onFocus = (e: FocusEvent) => {
      const card = (e.target as HTMLElement).closest(".scard");
      const st = tween.scrollTrigger;
      if (!card || !st) return;
      // Slide the track just far enough that this card starts at the page
      // gutter (or as far as the track goes), then scroll to that point.
      const gutter = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 20;
      const d = Math.max(1, distance());
      const shift = Math.min(d, Math.max(0, (card as HTMLElement).offsetLeft - gutter));
      const y = st.start + (st.end - st.start) * (shift / d);
      if (lenis.current) lenis.current.scrollTo(y, { duration: 0.6 });
      else window.scrollTo({ top: y });
    };
    track.addEventListener("focusin", onFocus);

    return () => {
      track.removeEventListener("focusin", onFocus);
      settle?.kill();
      root.style.removeProperty("--p");
    };
  });
}
