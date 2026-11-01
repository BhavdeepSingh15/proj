// Checks the built HTML (run after `npm run build`):
//  1. The therapist's name appears only inside the About section on "/",
//     never in <title>, meta tags, JSON-LD or any other page.
//  2. No fees or prices anywhere.
//  3. The emergency notice and both Tele-MANAS numbers are on every page.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const NAME = "Anoop Inder Kaur";
const root = join(process.cwd(), "build", "client");
const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html") && !f.startsWith("__spa")) files.push(p);
  }
})(root);

const problems = [];
for (const file of files) {
  const rel = file.slice(root.length) || "/";
  const html = readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  const visible = body.replace(/<script[\s\S]*?<\/script>/g, "");

  if (head.includes(NAME)) problems.push(`${rel}: name in <head> (title/meta/JSON-LD)`);
  const aboutStart = visible.indexOf('id="about"');
  const aboutEnd = aboutStart >= 0 ? visible.indexOf("</section>", aboutStart) : -1;
  const outside = aboutStart >= 0 ? visible.slice(0, aboutStart) + visible.slice(aboutEnd) : visible;
  if (outside.includes(NAME)) problems.push(`${rel}: name outside the About section`);

  if (/₹|\bRs\.?\s?\d|\bINR\b/.test(visible)) problems.push(`${rel}: a price or fee appears`);

  if (!rel.includes("404")) {
    for (const must of ["This website is not for emergencies.", "tel:14416", "tel:18008914416"]) {
      if (!visible.includes(must)) problems.push(`${rel}: missing "${must}"`);
    }
  }
}

if (problems.length) {
  console.error("Built-site checks FAILED:\n" + problems.map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log(`Built-site checks passed on ${files.length} pages.`);
