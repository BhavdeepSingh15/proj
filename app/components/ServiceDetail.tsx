import type { ReactNode } from "react";
import { supportSection, type Service } from "~/content/services";
import { ui } from "~/content/site";
import { Picture } from "./Picture";

/** The full "Learn more" content. Used in the dialog and on /services/[slug]. */
export function ServiceDetail({
  service,
  titleId,
  as: Title = "h2",
  actions,
  closeButton,
}: {
  service: Service;
  titleId: string;
  as?: "h1" | "h2";
  actions: ReactNode;
  closeButton?: ReactNode;
}) {
  const L = supportSection.labels;
  // Sub-headings sit one level below the title (h2 on the page, h3 in the dialog).
  const Sub = Title === "h1" ? "h2" : "h3";
  return (
    <article className="sdetail">
      <div className="sdetail__img">
        <Picture name={service.image} sizes="(min-width: 900px) 860px, 100vw" flipId={`svc-${service.slug}`} />
        {closeButton}
      </div>
      <div className="sdetail__body">
        <div className="sdetail__head">
          <p className="kicker">{service.kicker}</p>
          <Title id={titleId} className="h2 sdetail__title" tabIndex={-1}>
            {service.name}
          </Title>
        </div>
        <p className="sdetail__intro">{service.intro}</p>
        <div className="sdetail__cols">
          <section aria-labelledby={`${titleId}-helps`}>
            <Sub id={`${titleId}-helps`} className="sdetail__sub">
              {L.helpsWith}
            </Sub>
            <ul className="ticks">
              {service.helpsWith.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby={`${titleId}-sessions`}>
            <Sub id={`${titleId}-sessions`} className="sdetail__sub">
              {L.inSessions}
            </Sub>
            <ul className="points">
              {service.inSessions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="sdetail__notes">
          <div className="sdetail__note">
            <Sub className="sdetail__sub">{L.howLong}</Sub>
            <p>{service.howLong}</p>
          </div>
          <div className="sdetail__note sdetail__note--soft">
            <Sub className="sdetail__sub">{L.goodToKnow}</Sub>
            <p>{service.goodToKnow}</p>
          </div>
        </div>
        <div className="sdetail__reading">
          <Sub className="sdetail__sub">{L.readMore}</Sub>
          <ul>
            {service.readMore.map((r) => (
              <li key={r.url}>
                <a className="text-link" href={r.url} target="_blank" rel="noopener">
                  {r.label}
                  <span className="sr-only"> {ui.opensNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="sdetail__actions">{actions}</div>
      </div>
    </article>
  );
}
