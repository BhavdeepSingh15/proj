// Decides how much motion to run, loads the animation engine after first
// paint, owns smooth scrolling (Lenis), and exposes helpers to sections.
// Modes:
//   pending  – before hydration, or while the engine is still loading
//   full     – animations on (OS allows motion and the visitor hasn't opted out)
//   reduced  – the device's "reduce motion" setting, or the 3.5 s fail-safe
import type Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { lib, loadMotion } from "./lib";
import { enqueue } from "./queue";
import { fadeUp, maskUp } from "./reveal";
import { lenisLerp } from "./tokens";

type Mode = "pending" | "full" | "reduced";

type MotionState = {
  mode: Mode;
  desktop: boolean;
  lenis: React.RefObject<Lenis | null>;
  scrollToHash: (hash: string) => void;
  scrollToTop: () => void;
};

const MotionContext = createContext<MotionState | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [osReduce, setOsReduce] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [ready, setReady] = useState(false);
  const [engine, setEngine] = useState<"idle" | "loaded" | "failed">("idle");
  const lenis = useRef<Lenis | null>(null);

  // Read preferences once in the browser, then follow changes.
  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesk = window.matchMedia("(min-width: 1024px)");
    setOsReduce(mqReduce.matches);
    setDesktop(mqDesk.matches);
    setReady(true);
    const onReduce = () => setOsReduce(mqReduce.matches);
    const onDesk = () => setDesktop(mqDesk.matches);
    mqReduce.addEventListener("change", onReduce);
    mqDesk.addEventListener("change", onDesk);
    return () => {
      mqReduce.removeEventListener("change", onReduce);
      mqDesk.removeEventListener("change", onDesk);
    };
  }, []);

  const wantsMotion = ready && !osReduce;

  // Load GSAP + Lenis only when motion is wanted, after the first paint.
  useEffect(() => {
    if (!wantsMotion || engine !== "idle") return;
    let cancelled = false;
    const start = () =>
      loadMotion().then(
        () => {
          if (cancelled) return;
          const html = document.documentElement;
          if (html.classList.contains("motion-failed")) return setEngine("failed");
          // Switch to the pinning layout (all screen sizes) before anything is measured.
          html.classList.add("is-pinning");
          setEngine("loaded");
        },
        () => !cancelled && setEngine("failed"),
      );
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 500 }) : window.setTimeout(start, 30);
    return () => {
      cancelled = true;
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, [wantsMotion, engine]);

  const mode: Mode = !ready
    ? "pending"
    : !wantsMotion || engine === "failed"
      ? "reduced"
      : engine === "loaded"
        ? "full"
        : "pending";

  // Reflect the mode on <html> so CSS can show static or animated states.
  useEffect(() => {
    if (mode === "pending") return;
    const html = document.documentElement;
    html.classList.add("motion-ready");
    if (mode === "full") {
      html.classList.add("motion");
      html.removeAttribute("data-motion");
    } else {
      html.classList.remove("motion", "show-loader");
      html.setAttribute("data-motion", "reduce");
    }
    html.classList.toggle("is-pinning", mode === "full");
  }, [mode, desktop]);

  // Smooth wheel scrolling on desktop pointers only (touch stays native).
  useEffect(() => {
    if (mode !== "full" || !desktop || !window.matchMedia("(pointer: fine)").matches) return;
    const { gsap, ScrollTrigger, Lenis: LenisClass } = lib;
    const instance = new LenisClass({ lerp: lenisLerp, smoothWheel: true });
    lenis.current = instance;
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenis.current = null;
    };
  }, [mode, desktop]);

  // Safety net: any [data-reveal]/[data-mask] element no section animated gets
  // a default reveal, so nothing can stay hidden. Queued after the sections.
  useEffect(() => {
    if (mode !== "full") return;
    const mine: HTMLElement[] = [];
    let ctx: ReturnType<typeof lib.gsap.context> | null = null;
    const cancel = enqueue(() => {
      ctx = lib.gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-bound])").forEach((el) => {
          mine.push(el);
          fadeUp(el, desktop);
        });
        document.querySelectorAll<HTMLElement>("[data-mask]:not([data-bound])").forEach((el) => {
          mine.push(el);
          maskUp(el);
        });
      });
    });
    return () => {
      cancel();
      ctx?.revert();
      mine.forEach((el) => el.removeAttribute("data-bound"));
    };
  }, [mode, desktop]);

  // Recalculate trigger positions once fonts and images have settled.
  useEffect(() => {
    if (mode !== "full") return;
    const { ScrollTrigger } = lib;
    let cancelled = false;
    const refresh = () => !cancelled && ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    const t = window.setTimeout(refresh, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, [mode, desktop]);

  const scrollToHash = useCallback((hash: string) => {
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    const offset = -(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64) - 16;
    if (lenis.current) {
      lenis.current.scrollTo(el, { offset, duration: 1.2 });
    } else {
      const reduce = document.documentElement.getAttribute("data-motion") === "reduce";
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? "auto" : "smooth" });
    }
    history.pushState(null, "", `#${id}`);
    const focusTarget = (el.querySelector("h2, h1, h3") as HTMLElement | null) ?? el;
    if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus({ preventScroll: true });
  }, []);

  // The logo link on the home page: glide back to the top and clear any #hash.
  const scrollToTop = useCallback(() => {
    const reduce = document.documentElement.getAttribute("data-motion") === "reduce";
    if (lenis.current) lenis.current.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    if (location.hash) history.pushState(null, "", "/");
    const title = document.getElementById("hero-title");
    if (title) {
      if (!title.hasAttribute("tabindex")) title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }
  }, []);

  const value = useMemo(
    () => ({ mode, desktop, lenis, scrollToHash, scrollToTop }),
    [mode, desktop, scrollToHash, scrollToTop],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion must be used inside <MotionProvider>");
  return ctx;
}
