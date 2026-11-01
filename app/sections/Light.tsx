// Light sections 4–6: Reassurance (arched window), At a glance (count-up),
// Credentials (photo card with overlapping headline).
import { useRef } from "react";
import { Heading } from "~/components/Heading";
import { Picture } from "~/components/Picture";
import { credentials, glance, reassurance } from "~/content/site";
import { useCredentialsMotion, useGlanceMotion, useReassuranceMotion } from "~/motion/sections/light";

export function Reassurance() {
  const ref = useRef<HTMLElement>(null);
  useReassuranceMotion(ref);
  const [l1, l2, l3] = reassurance.lines;
  return (
    <section ref={ref} className="section reassure tone-light" data-tone="light" aria-labelledby="reassure-title">
      <div className="container reassure__wrap">
        <h2 className="reassure__title" id="reassure-title">
          <span className="reassure__l1">{l1} </span>
          <span className="reassure__arch">
            <Picture name="arch" sizes="(min-width: 1024px) 30vw, 72vw" className="reassure__pic" />
            <span className="reassure__l2">{l2} </span>
          </span>
          <span className="reassure__l3">{l3}</span>
        </h2>
        <p className="reassure__text" data-reveal="">
          {reassurance.text}
        </p>
      </div>
    </section>
  );
}

export function Glance() {
  const ref = useRef<HTMLElement>(null);
  useGlanceMotion(ref);
  return (
    <section ref={ref} className="section glance tone-light" data-tone="light" aria-labelledby="glance-title">
      <img className="glance__contours" src="/img/contours.svg" alt="" aria-hidden="true" width="1200" height="840" loading="lazy" />
      <div className="container">
        <Heading h={glance.heading} id="glance-title" className="h2 glance__title" />
        <dl className="glance__grid">
          {glance.facts.map((f, i) => {
            const shown = "text" in f ? f.text : String(f.value);
            return (
              <div key={i} className={`fact fact--${i + 1}`} data-fact="">
                <dt className="fact__label">{f.label}</dt>
                <dd className="fact__value">
                  <span className="fact__stack" aria-hidden="true">
                    <span className="fact__sharp">
                      <span className="fact__num" data-count={"value" in f ? f.value : undefined}>
                        {shown}
                      </span>
                      {"unit" in f && f.unit && <span className="fact__unit">{f.unit}</span>}
                    </span>
                    <span className="fact__blur">
                      <span className="fact__num" data-count={"value" in f ? f.value : undefined}>
                        {shown}
                      </span>
                      {"unit" in f && f.unit && <span className="fact__unit">{f.unit}</span>}
                    </span>
                  </span>
                  <span className="sr-only">
                    {shown} {"unit" in f ? f.unit : ""}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

export function Credentials() {
  const ref = useRef<HTMLElement>(null);
  useCredentialsMotion(ref);
  return (
    <section ref={ref} className="section creds tone-light" data-tone="light" aria-labelledby="creds-title">
      <div className="container creds__grid">
        <div className="creds__card">
          <Picture name="card" sizes="(min-width: 1024px) 45vw, 100vw" className="creds__pic" />
        </div>
        <div className="creds__copy">
          <p className="kicker" data-reveal="">
            {credentials.kicker}
          </p>
          <Heading h={credentials.heading} id="creds-title" className="h2 creds__title" mask={false} />
          <p className="creds__teaser" data-reveal="">
            {credentials.teaser}
          </p>
          <dl className="creds__rows">
            {credentials.rows.map((r) => (
              <div key={r.label} className="creds__row" data-reveal="">
                <dt className="kicker">{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
