// Every string in app/content must be appendix text, an approved change,
// or an interface label. Run with `npm test`.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as site from "../app/content/site";
import * as svc from "../app/content/services";
import * as lists from "../app/content/lists";
import { approvedChanges } from "../app/content/changes";

const IGNORED_KEYS = new Set(["slug", "image", "id", "glyph", "service", "href", "tel", "siteUrl", "imageAlt", "serviceSlugs"]);

const normalise = (s: string) =>
  s
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 $2")
    .replace(/\s+/g, " ");

const appendix = normalise(readFileSync(new URL("../appendix.md", import.meta.url), "utf8"));
const allowed = new Set(approvedChanges.map((c) => c.text));

function collect(value: unknown, path: string, out: { path: string; text: string }[]) {
  if (typeof value === "string") {
    if (value.trim()) out.push({ path, text: value });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collect(v, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (IGNORED_KEYS.has(k)) continue;
      collect(v, `${path}.${k}`, out);
    }
  }
}

describe("content provenance", () => {
  const strings: { path: string; text: string }[] = [];
  const { ui, ...siteContent } = site; // ui = interface labels, approved separately
  collect(siteContent, "site", strings);
  collect(svc, "services", strings);
  collect(lists, "lists", strings);

  it("finds content to check", () => {
    expect(strings.length).toBeGreaterThan(150);
  });

  it("traces every string to the appendix or an approved change", () => {
    const untraced = strings.filter(
      ({ text }) => !appendix.includes(normalise(text)) && !allowed.has(text),
    );
    expect(untraced).toEqual([]);
  });

  it("keeps the therapist's name inside About only", () => {
    const name = "Anoop Inder Kaur";
    const outside = strings.filter(
      (s) => s.text.includes(name) && !s.path.startsWith("site.about.") && !s.path.startsWith("site.contact."),
    );
    expect(outside).toEqual([]);
    expect(site.seo.title).not.toContain(name);
    expect(site.seo.description).not.toContain(name);
  });

  it("never shows fees or prices", () => {
    const money = strings.filter((s) => /₹|\bRs\.?\s?\d|\bINR\b|\bfee(s)?\b|\bprice/i.test(s.text));
    expect(money).toEqual([]);
  });
});
