import type { Config } from "@react-router/dev/config";
import { serviceSlugs } from "./app/content/services";

// Static site: every route is rendered to HTML at build time (Node), and the
// output in build/client deploys to any static host. No runtime server.
export default {
  ssr: false,
  prerender: ["/", ...serviceSlugs.map((s) => `/services/${s}`), "/privacy", "/consent", "/404"],
} satisfies Config;
