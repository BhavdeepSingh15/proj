import { Fragment, useRef } from "react";
import { ChatIcon } from "~/components/Icons";
import { HeroPicture, Picture } from "~/components/Picture";
import { contact, hero, practice, ui } from "~/content/site";
import { useHeroMotion } from "~/motion/sections/hero";

// Each word is its own mask, so a two-line wordmark (phones) still rises
// letter by letter from below its own line. --i runs across all letters.
let letter = 0;
const words = practice.wordmark.split(" ").map((w) => Array.from(w).map((c) => ({ c, i: letter++ })));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroMotion(ref);

  return (
    // The wrapper doubles as ScrollTrigger's pin spacer, so pinning never moves
    // the hero in the DOM (which would restart its CSS intro animation).
    <div className="hero-spacer">
    <section ref={ref} id="top" className="hero tone-dark" data-tone="dark" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <HeroPicture className="hero__pic" />
        <div className="hero__glows">
          <span className="glow glow--1" />
          <span className="glow glow--2" />
          <span className="glow glow--3" />
          <span className="glow glow--4" />
          <span className="glow glow--5" />
        </div>
      </div>

      {/* Fog joint A: mist thickens over the pinned hero (see motion/sections/hero.ts) */}
      <div className="hero__fog" aria-hidden="true">
        <div className="hero__veil" />
        <Picture name="fog-a" sizes="100vw" className="hero__band hero__band--a" />
        <Picture name="fog-b" sizes="100vw" className="hero__band hero__band--b" />
        <div className="hero__cream" />
      </div>

      <div className="hero__inner container">
        <div className="hero__aside">
          <p className="kicker hero__kicker intro-a" style={{ "--d": "0.15s" } as React.CSSProperties}>
            {hero.kicker}
          </p>
          <p className="hero__headline intro-b" style={{ "--d": "0.2s" } as React.CSSProperties}>
            {hero.headline}
          </p>
          <p className="hero__intro intro-b" style={{ "--d": "0.28s" } as React.CSSProperties}>
            {hero.intro}
          </p>
          <p className="hero__spec intro-a" style={{ "--d": "0.36s" } as React.CSSProperties}>
            {hero.specialties}
          </p>
          <div className="hero__cta intro-a" style={{ "--d": "0.44s" } as React.CSSProperties}>
            <a className="btn btn--ghost hero__pill" href={contact.whatsappLink} target="_blank" rel="noopener">
              <ChatIcon />
              {ui.messageWhatsapp}
              <span className="sr-only"> {ui.opensNewTab}</span>
            </a>
          </div>
        </div>

        <h1 id="hero-title" className="hero__wordmark">
          <span className="hero__mask" aria-hidden="true">
            {words.map((word, w) => (
              <Fragment key={w}>
                {w > 0 && " "}
                <span className="hero__word">
                  {word.map(({ c, i }) => (
                    <span key={i} className="hero__char" style={{ "--i": i } as React.CSSProperties}>
                      {c}
                    </span>
                  ))}
                </span>
              </Fragment>
            ))}
          </span>
          <span className="sr-only">{practice.name}</span>
        </h1>

        <p className="hero__avail intro-a" style={{ "--d": "0.5s" } as React.CSSProperties}>
          <span className="hero__dot" aria-hidden="true" />
          {practice.availability}
        </p>
      </div>
    </section>
    </div>
  );
}
