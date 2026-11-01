import { useRef } from "react";
import { useFogMotion } from "~/motion/sections/fog";
import { Picture } from "./Picture";

/** A band of mist that carries the page from one tone to the other. */
export function FogJoint({ variant }: { variant: "a" | "b" | "c" | "d" }) {
  const ref = useRef<HTMLDivElement>(null);
  const toLight = variant === "a" || variant === "c";
  useFogMotion(ref, toLight);
  return (
    <div
      ref={ref}
      className={`fog fog--${variant} ${toLight ? "fog--to-light" : "fog--to-dark"}`}
      data-tone={toLight ? "light" : "dark"}
      aria-hidden="true"
    >
      <div className="fog__base" />
      <div className="fog__veil" />
      <Picture name="fog-a" sizes="100vw" className="fog__band fog__band--a" />
      <Picture name="fog-b" sizes="100vw" className="fog__band fog__band--b" />
    </div>
  );
}
