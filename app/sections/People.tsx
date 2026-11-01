// Sections 9–11: Approaches (alternating rows), About (collage + pull quote),
// Works with (circle swatches).
import { useRef } from "react";
import { ApproachDrawing, Glyph } from "~/components/Drawings";
import { Heading } from "~/components/Heading";
import { Picture } from "~/components/Picture";
import { useServiceDialog } from "~/components/ServiceDialog";
import { approaches, approachesSection } from "~/content/lists";
import { about, contact, ui, worksWith } from "~/content/site";
import { useAboutMotion, useApproachesMotion, useWorksWithMotion } from "~/motion/sections/people";

const pad = (n: number) => String(n).padStart(2, "0");

export function Approaches() {
  const ref = useRef<HTMLElement>(null);
  useApproachesMotion(ref);
  return (
    <section ref={ref} id="approaches" className="section approaches tone-light" data-tone="light" aria-labelledby="approaches-title">
      <div className="container">
        <Heading h={approachesSection.heading} id="approaches-title" className="h2 approaches__title" />
        <ol className="approaches__list">
          {approaches.map((a, i) => (
            <li key={a.id} className={`arow ${i % 2 ? "arow--flip" : ""}`} data-row="">
              <div className="arow__text">
                <p className="arow__num" aria-hidden="true">
                  {pad(i + 1)} / {pad(approaches.length)}
                </p>
                <h3 className="arow__title">{a.name}</h3>
                <p className="kicker arow__short">{a.short}</p>
                <p className="arow__desc">{a.text}</p>
              </div>
              <div className="arow__panel">
                <ApproachDrawing id={a.id} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  useAboutMotion(ref);
  return (
    <section ref={ref} id="about" className="section about tone-light" data-tone="light" aria-labelledby="about-title">
      <div className="about__sand" aria-hidden="true" />
      <div className="container about__grid">
        <div className="about__copy">
          <p className="kicker" data-reveal="">
            {about.kicker}
          </p>
          <h2 id="about-title" className="h2 about__name" data-mask="">
            {about.name}
          </h2>
          <p className="about__role" data-reveal="">
            {about.title}
          </p>
          <div className="about__bio">
            {about.bio.map((p) => (
              <p key={p.slice(0, 24)} data-reveal="">
                {p}
              </p>
            ))}
          </div>
          <div className="about__lists" data-reveal="">
            <div>
              <h3 className="kicker">{about.qualificationsLabel}</h3>
              <ul className="ticks">
                {about.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="kicker">{about.approachesLabel}</h3>
              <ul className="ticks">
                {about.approaches.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
          <dl className="about__facts" data-reveal="">
            <div className="about__work">
              <dt className="kicker">{about.workplaceLabel}</dt>
              <dd>{about.workplace}</dd>
            </div>
            <div className="about__work about__work--caps">
              <dt className="kicker">{about.empanelledLabel}</dt>
              <dd>{about.empanelled}</dd>
            </div>
          </dl>
          <p className="about__note" data-reveal="">
            {about.notSuitableFor}
          </p>
          <p data-reveal="">
            <a className="text-link" href={contact.googleProfile} target="_blank" rel="noopener">
              {contact.googleProfileLabel}
              <span className="sr-only"> {ui.opensNewTab}</span>
            </a>
          </p>
        </div>
        <div className="about__collage">
          <div className="about__tile about__tile--portrait">
            <Picture name="portrait" alt={about.portraitAlt} sizes="(min-width: 1024px) 360px, 80vw" />
          </div>
          <figure className="about__quote">
            <blockquote>
              <p>“{about.pullQuote}”</p>
            </blockquote>
          </figure>
          <div className="about__tile about__tile--water" aria-hidden="true">
            <Picture name="tile-water" sizes="(min-width: 1024px) 220px, 40vw" />
          </div>
          <div className="about__tile about__tile--texture" aria-hidden="true">
            <Picture name="tile-texture" sizes="(min-width: 1024px) 200px, 40vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorksWith() {
  const ref = useRef<HTMLElement>(null);
  const { openService } = useServiceDialog();
  useWorksWithMotion(ref);
  return (
    <section ref={ref} className="section works tone-light" data-tone="light" aria-labelledby="works-title">
      <div className="container">
        <p className="kicker" data-reveal="">
          {worksWith.kicker}
        </p>
        <Heading h={worksWith.heading} id="works-title" className="h2 works__title" />
        <ul className="works__circles">
          {worksWith.groups.map((g) => (
            <li key={g.label} className="works__item" data-card="">
              <a
                className="works__link"
                href={`/services/${g.service}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  openService(g.service, e.currentTarget);
                }}
              >
                <span className="works__circle">
                  <Glyph id={g.glyph} />
                </span>
                <span className="works__label">{g.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="works__concerns">
          {worksWith.concerns.map((c) => (
            <li key={c} data-concern="">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
