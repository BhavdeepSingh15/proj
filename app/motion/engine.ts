// The animation engine: GSAP + plugins + Lenis. Loaded with a dynamic
// import() just after first paint (see lib.ts), so it never delays the page.
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { curves } from "./tokens";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip, CustomEase);
CustomEase.create("calm", curves.calm);
CustomEase.create("glide", curves.glide);
CustomEase.create("ui", curves.ui);
gsap.defaults({ ease: "calm", duration: 0.9 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const engine = { gsap, ScrollTrigger, SplitText, Flip, Lenis };
