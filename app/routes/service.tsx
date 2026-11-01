import { data } from "react-router";
import { BookButton } from "~/components/BookingNotice";
import { ArrowLeftIcon, ChatIcon } from "~/components/Icons";
import { ServiceDetail } from "~/components/ServiceDetail";
import { getService } from "~/content/services";
import { contact, practice, seo, ui } from "~/content/site";
import type { Route } from "./+types/service";

// Runs at build time (pre-rendering) for each /services/[slug].
export function loader({ params }: Route.LoaderArgs) {
  const service = getService(params.slug);
  if (!service) throw data(null, { status: 404 });
  return { slug: service.slug };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const s = getService(loaderData?.slug);
  if (!s) return [{ title: practice.name }];
  const title = `${s.name} | ${practice.name}`;
  return [
    { title },
    { name: "description", content: s.description },
    { tagName: "link", rel: "canonical", href: `${seo.siteUrl}/services/${s.slug}` },
    { property: "og:title", content: title },
    { property: "og:description", content: s.description },
    { property: "og:image", content: `${seo.siteUrl}/og.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

export default function ServicePage({ loaderData }: Route.ComponentProps) {
  const service = getService(loaderData.slug)!;
  return (
    <div className="page page--service tone-light" data-tone="light">
      <div className="container page__inner">
        <a className="page__back" href="/#support">
          <ArrowLeftIcon width={16} height={16} /> {ui.backHome}
        </a>
        <ServiceDetail
          service={service}
          titleId="service-page-title"
          as="h1"
          actions={
            <>
              <BookButton />
              <a className="btn btn--ghost" href={contact.whatsappLink} target="_blank" rel="noopener">
                <ChatIcon />
                {ui.messageWhatsapp}
                <span className="sr-only"> {ui.opensNewTab}</span>
              </a>
            </>
          }
        />
      </div>
    </div>
  );
}
