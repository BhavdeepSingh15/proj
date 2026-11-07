// Sections 13–14 on dark: What to expect (numbered columns) and Session
// policies (sticky headline + scrolling list with a reading-progress rail).
import { useEffect, useRef, useState } from "react";
import { Heading } from "~/components/Heading";
import { policies, policiesSection } from "~/content/lists";
import { ArrowIcon } from "~/components/Icons";
import { consent, expect, ui } from "~/content/site";
import { useExpectMotion, usePoliciesMotion } from "~/motion/sections/dark";

const pad = (n: number) => String(n).padStart(2, "0");

export function Expect() {
  const ref = useRef<HTMLElement>(null);
  useExpectMotion(ref);
  return (
    <section ref={ref} className="section expect tone-dark" data-tone="dark" aria-labelledby="expect-title">
      <div className="container">
        <Heading h={expect.heading} id="expect-title" className="h2 expect__title" />
        <ol className="expect__cols">
          {expect.columns.map((c, i) => (
            <li key={c.title} className="expect__col" data-col="">
              <span className="expect__rule" aria-hidden="true" />
              <p className="expect__num" aria-hidden="true">
                {pad(i + 1)}
              </p>
              <h3 className="expect__name">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="expect__text">
                  {l}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Policies() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  usePoliciesMotion(ref);

  // Reading progress: the group crossing the middle of the screen is "current".
  useEffect(() => {
    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-policy]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(items.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} id="policies" className="section policies tone-dark" data-tone="dark" aria-labelledby="policies-title">
      <div className="container policies__grid">
        <div className="policies__aside">
          <div className="policies__sticky">
            <Heading h={policiesSection.heading} id="policies-title" className="h2 policies__title" />
            <p className="policies__count" aria-hidden="true">
              {pad(current + 1)} / {pad(policies.length)}
            </p>
          </div>
        </div>
        <div className="policies__main">
        <div className="policies__listwrap">
          <span className="policies__rail" aria-hidden="true">
            <span className="policies__fill" />
          </span>
          <ol className="policies__list">
          {policies.map((p, i) => (
            <li
              key={p.title}
              className={`policy ${"emergency" in p && p.emergency ? "policy--emergency" : ""}`}
              data-policy=""
              data-state={i < current ? "read" : i === current ? "current" : "ahead"}
            >
              <span className="policy__dot" aria-hidden="true" />
              <p className="policy__num" aria-hidden="true">
                {pad(i + 1)}
              </p>
              <h3 className="policy__title">{p.title}</h3>
              <ul className="policy__points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
          </ol>
        </div>
          <p className="policies__consent">
            <span>{consent.policiesLine}</span>
            <a className="btn btn--ghost" href="/consent">
              {ui.consent.open}
              <ArrowIcon width={16} height={16} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
