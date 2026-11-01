import { ArrowLeftIcon } from "~/components/Icons";
import { practice, privacy, seo, ui } from "~/content/site";
import type { Route } from "./+types/privacy";

export const meta: Route.MetaFunction = () => [
  { title: `${privacy.title} | ${practice.name}` },
  { name: "description", content: privacy.paragraphs[0] },
  { tagName: "link", rel: "canonical", href: `${seo.siteUrl}/privacy` },
];

export default function Privacy() {
  return (
    <div className="page tone-light" data-tone="light">
      <div className="container page__inner page__narrow">
        <a className="page__back" href="/">
          <ArrowLeftIcon width={16} height={16} /> {ui.backHome}
        </a>
        <h1 className="h2">{privacy.title}</h1>
        <div className="page__prose">
          {privacy.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
