import { contact, practice, safety, ui } from "~/content/site";
import type { Route } from "./+types/not-found";

export const meta: Route.MetaFunction = () => [
  { title: `${ui.pageNotFound} | ${practice.name}` },
  { name: "robots", content: "noindex" },
];

export default function NotFound() {
  return (
    <div className="page page--404 tone-dark" data-tone="dark">
      <div className="container page__inner page__narrow">
        <p className="page__word" aria-hidden="true">
          {practice.wordmark}
        </p>
        <h1 className="h2">{ui.pageNotFound}</h1>
        <p className="page__links">
          <a className="btn btn--dawn" href="/">
            {ui.backHome}
          </a>
          <a className="btn btn--ghost" href={contact.whatsappLink} target="_blank" rel="noopener">
            {ui.messageWhatsapp}
            <span className="sr-only"> {ui.opensNewTab}</span>
          </a>
        </p>
        <div className="safety">
          <p className="safety__notice">{safety.notice}</p>
          {safety.helplines.map((h) => (
            <p key={h.tel} className="safety__line">
              {h.name}: <a href={`tel:${h.tel}`}>{h.number}</a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
