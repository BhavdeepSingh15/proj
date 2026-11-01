// Section 7: Areas of support. With motion (any screen): a pinned horizontal
// gallery driven by vertical scroll. Reduced motion: a swipe carousel with
// Previous/Next buttons on phones, a plain 3 × 2 grid on desktop.
import { useEffect, useRef, useState } from "react";
import { Heading } from "~/components/Heading";
import { ArrowIcon, ArrowLeftIcon } from "~/components/Icons";
import { Picture } from "~/components/Picture";
import { useServiceDialog } from "~/components/ServiceDialog";
import { services, supportSection } from "~/content/services";
import { ui } from "~/content/site";
import { useMotion } from "~/motion/MotionProvider";
import { useSupportMotion } from "~/motion/sections/support";

const pad = (n: number) => String(n).padStart(2, "0");

export function Support() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const { openService } = useServiceDialog();
  const { mode } = useMotion();
  useSupportMotion(ref, setIndex);

  // Phone carousel: progress follows the native horizontal scroll.
  useEffect(() => {
    const el = track.current;
    const section = ref.current;
    if (!el || !section) return;
    const onScroll = () => {
      if (getComputedStyle(el).overflowX !== "auto") return;
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      section.style.setProperty("--p", String(p));
      setIndex(Math.round(p * (services.length - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".scard");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: mode === "full" ? "smooth" : "auto" });
  };

  return (
    <section ref={ref} id="support" className="support tone-light" data-tone="light" aria-labelledby="support-title">
      {/* The spacer is ScrollTrigger's pin spacer, so pinning never moves React's DOM. */}
      <div className="support__spacer">
      <div className="support__pin">
        <div className="container support__head">
          <Heading h={supportSection.heading} id="support-title" />
          <p className="lead" data-reveal="">
            {supportSection.lead}
          </p>
        </div>
        <div className="support__viewport">
          <ul ref={track} className="support__track">
            {services.map((s, i) => (
              <li key={s.slug} className="scard" data-card="" style={{ "--i": i } as React.CSSProperties}>
                <div className="scard__inner">
                  <div className="scard__pic">
                    <Picture name={s.image} sizes="(min-width: 1024px) 26vw, 80vw" flipId={`svc-${s.slug}`} />
                  </div>
                  <p className="kicker scard__kicker">{s.kicker}</p>
                  <h3 className="h3 scard__title">{s.name}</h3>
                  <p className="scard__text">{s.description}</p>
                  <a
                    className="scard__more"
                    href={`/services/${s.slug}`}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                      e.preventDefault();
                      openService(s.slug, e.currentTarget);
                    }}
                  >
                    {ui.learnMore}
                    <span className="sr-only">: {s.name}</span>
                    <ArrowIcon width={16} height={16} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="container support__progress">
          <div className="support__bar" aria-hidden="true">
            <span className="support__fill" />
            <span className="support__dot" />
          </div>
          <p className="support__count" aria-hidden="true">
            {pad(index + 1)} / {pad(services.length)}
          </p>
          <div className="support__arrows">
            <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label={ui.previous}>
              <ArrowLeftIcon />
            </button>
            <button type="button" className="icon-btn" onClick={() => step(1)} aria-label={ui.next}>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
