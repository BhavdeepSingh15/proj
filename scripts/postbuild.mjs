// Runs after `react-router build` (Node): writes sitemap.xml and robots.txt,
// and copies the pre-rendered 404 page to 404.html for static hosts.
import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { serviceSlugs } from "../app/content/services.ts";
import { seo } from "../app/content/site.ts";

const out = join(process.cwd(), "build", "client");
const paths = ["/", ...serviceSlugs.map((s) => `/services/${s}`), "/privacy"];
const today = new Date().toISOString().slice(0, 10);

writeFileSync(
  join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${seo.siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${seo.siteUrl}/sitemap.xml\n`);

const notFound = join(out, "404", "index.html");
if (existsSync(notFound)) copyFileSync(notFound, join(out, "404.html"));
console.log("postbuild: sitemap.xml, robots.txt, 404.html");
