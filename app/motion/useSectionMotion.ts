// Runs a section's animations only in "full" mode, once the engine has
// loaded. Setups are queued (one per task, in page order) so they never block
// the main thread for long. Everything created inside is recorded by
// gsap.context() and reverted when the mode or breakpoint changes, or the
// section unmounts.
import type Lenis from "lenis";
import { useEffect, type RefObject } from "react";
import { lib } from "./lib";
import { useMotion } from "./MotionProvider";
import { enqueue } from "./queue";

type Ctx = { desktop: boolean; lenis: RefObject<Lenis | null> };

export function useSectionMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: Ctx) => void | (() => void),
  deps: unknown[] = [],
) {
  const { mode, desktop, lenis } = useMotion();
  useEffect(() => {
    const el = scope.current;
    if (mode !== "full" || !el || !lib.gsap) return;
    let cleanup: void | (() => void);
    let ctx: ReturnType<typeof lib.gsap.context> | null = null;
    const cancel = enqueue(() => {
      ctx = lib.gsap.context(() => {
        cleanup = setup({ desktop, lenis });
      }, el);
    });
    return () => {
      cancel();
      cleanup?.();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, desktop, ...deps]);
}
