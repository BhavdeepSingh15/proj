// Sections 16–17: Where sessions happen (map + tabs) and FAQ (accordion).
import { useRef, useState } from "react";
import { Heading } from "~/components/Heading";
import { ArrowIcon, PlusIcon } from "~/components/Icons";
import { faqs, faqSection } from "~/content/lists";
import { ui, where } from "~/content/site";
import { useFaqMotion, useWhereMotion } from "~/motion/sections/info";

// A hand-drawn schematic of a city sector grid (not a real map, no tiles).
function SectorMap() {
  const cols = [40, 130, 220, 310, 400, 490, 580];
  const rows = [30, 110, 190, 270, 350];
  return (
    <svg viewBox="0 0 620 380" className="map" aria-hidden="true" focusable="false">
      <path className="map__lake" d="M470,40 C520,22 590,34 596,70 C602,104 560,118 520,108 C486,100 448,62 470,40Z" />
      <g className="map__roads">
        {cols.map((x, i) => (
          <path key={`c${i}`} d={`M${x + (i % 2 ? 3 : -2)},14 C${x + 6},120 ${x - 5},250 ${x + 2},366`} />
        ))}
        {rows.map((y, i) => (
          <path key={`r${i}`} d={`M20,${y + (i % 2 ? 2 : -2)} C200,${y + 6} 400,${y - 5} 604,${y + 3}`} />
        ))}
      </g>
      <g className="map__sector">
        <rect x="318" y="198" width="74" height="64" rx="6" />
      </g>
      <g className="map__ripple">
        <circle cx="355" cy="230" r="36" />
      </g>
      <g className="map__marker">
        <circle cx="355" cy="230" r="8" />
      </g>
      <text x="355" y="288" textAnchor="middle" className="map__label">
        {where.mapLabel}
      </text>
    </svg>
  );
}

export function Where() {
  const ref = useRef<HTMLElement>(null);
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useWhereMotion(ref, tab);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (tab + (e.key === "ArrowRight" ? 1 : -1) + where.places.length) % where.places.length;
    setTab(next);
    tabs.current[next]?.focus();
  };

  return (
    <section ref={ref} id="where" className="section where tone-light" data-tone="light" aria-labelledby="where-title">
      <div className="container">
        <Heading h={where.heading} id="where-title" className="h2 where__title" />
        <div className="where__tabs" role="tablist" aria-labelledby="where-title" onKeyDown={onKey} data-reveal="">
          {where.places.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={tab === i}
              aria-controls={`panel-${p.id}`}
              tabIndex={tab === i ? 0 : -1}
              className="chip"
              onClick={() => setTab(i)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className={`where__grid where__grid--${where.places[tab].id}`}>
          <div className="where__map">
            <SectorMap />
          </div>
          {where.places.map((p, i) => (
            <div
              key={p.id}
              role="tabpanel"
              id={`panel-${p.id}`}
              aria-labelledby={`tab-${p.id}`}
              hidden={tab !== i}
              className="where__card"
              tabIndex={0}
            >
              <p className="kicker">{p.label}</p>
              <h3 className="h3 where__value">{p.value}</h3>
              {p.extra && <p className="muted">{p.extra}</p>}
              {p.link && (
                <a className="btn btn--dawn where__btn" href={p.link.href} target="_blank" rel="noopener">
                  {p.link.label}
                  <ArrowIcon width={16} height={16} />
                  <span className="sr-only"> {ui.opensNewTab}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const ref = useRef<HTMLElement>(null);
  useFaqMotion(ref);
  return (
    <section ref={ref} id="faq" className="section faq tone-light" data-tone="light" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__aside">
          <Heading h={faqSection.heading} id="faq-title" className="h2 faq__title" />
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <details key={f.q} className="qa" data-qa="">
              <summary className="qa__q">
                <span className="qa__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="qa__text">{f.q}</span>
                <PlusIcon className="qa__icon" />
              </summary>
              <div className="qa__a">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
