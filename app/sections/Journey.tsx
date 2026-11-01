// Section 8: Your first session, a path that draws itself (Before → During → After).
import { useRef } from "react";
import { BookButton } from "~/components/BookingNotice";
import { Heading } from "~/components/Heading";
import { firstSession } from "~/content/site";
import { useJourneyMotion } from "~/motion/sections/journey";

// A gentle water-surface wave through the three stops (x = 200, 600, 1000).
const PTS: [number, number][] = [
  [0, 170],
  [200, 128],
  [400, 186],
  [600, 118],
  [800, 182],
  [1000, 124],
  [1200, 150],
];
const STOPS = [1, 3, 5];

function catmullRom(p: [number, number][]) {
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const WAVE = catmullRom(PTS);

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  useJourneyMotion(ref);
  return (
    <section ref={ref} id="first-session" className="section journey tone-light" data-tone="light" aria-labelledby="journey-title">
      <div className="container">
        <Heading h={firstSession.heading} id="journey-title" />
        <div className="journey__route">
          <div className="journey__wave" aria-hidden="true">
            <svg viewBox="0 0 1200 260" preserveAspectRatio="none" className="journey__svg">
              <path d={WAVE} className="journey__ghost" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="journey__solid">
              <svg viewBox="0 0 1200 260" preserveAspectRatio="none" className="journey__svg">
                <path d={WAVE} className="journey__line" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            {STOPS.map((pi, i) => (
              <span
                key={i}
                className="journey__dot"
                data-stop={i}
                style={{ left: `${(PTS[pi][0] / 1200) * 100}%`, top: `${(PTS[pi][1] / 260) * 100}%` }}
              />
            ))}
          </div>
          <div className="journey__rail" aria-hidden="true">
            <span className="journey__rail-line" />
          </div>
          <ol className="journey__stops">
            {firstSession.steps.map((s, i) => (
              <li key={s.title} className="journey__stop" data-stop-text={i}>
                <span className="journey__mdot" aria-hidden="true" />
                <p className="kicker">{s.title}</p>
                <p className="journey__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="journey__cta" data-reveal="">
          <BookButton />
        </div>
      </div>
    </section>
  );
}
