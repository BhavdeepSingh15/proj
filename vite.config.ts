import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  resolve: { tsconfigPaths: true },
  // Bundle the animation libraries into the pre-render (Node) build too.
  ssr: { noExternal: ["gsap", "lenis"] },
});
