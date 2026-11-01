// A tiny handle to the animation engine. Components import `lib` (no GSAP
// code); `loadMotion()` fills it in once, after first paint.
import type { engine } from "./engine";

export type Lib = typeof engine;
export const lib = {} as Lib;

let loading: Promise<Lib> | null = null;

export function loadMotion(): Promise<Lib> {
  loading ??= import("./engine").then((m) => Object.assign(lib, m.engine));
  return loading;
}

export const motionLoaded = () => Boolean(lib.gsap);
