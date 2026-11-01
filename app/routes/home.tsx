import { FogJoint } from "~/components/FogJoint";
import { ServiceDialogProvider } from "~/components/ServiceDialog";
import { contact, practice, seo } from "~/content/site";
import { Contact } from "~/sections/Contact";
import { Expect, Policies } from "~/sections/Dark";
import { Hero } from "~/sections/Hero";
import { Faq, Where } from "~/sections/Info";
import { Journey } from "~/sections/Journey";
import { Credentials, Glance, Reassurance } from "~/sections/Light";
import { Loader } from "~/sections/Loader";
import { About, Approaches, WorksWith } from "~/sections/People";
import { Support } from "~/sections/Support";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  { title: seo.title },
  { name: "description", content: seo.description },
  { tagName: "link", rel: "canonical", href: `${seo.siteUrl}/` },
  { property: "og:type", content: "website" },
  { property: "og:title", content: seo.title },
  { property: "og:description", content: seo.description },
  { property: "og:url", content: `${seo.siteUrl}/` },
  { property: "og:image", content: `${seo.siteUrl}/og.jpg` },
  { property: "og:locale", content: "en_IN" },
  { name: "twitter:card", content: "summary_large_image" },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: practice.name,
      url: `${seo.siteUrl}/`,
      logo: `${seo.siteUrl}/logo.svg`,
      sameAs: [contact.instagram, contact.googleProfile],
    },
  },
];

// Start fetching the hero photo early (art-directed: phone crop vs wide).
export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    as: "image",
    type: "image/avif",
    imageSrcSet: "/img/hero-m-720.avif 720w, /img/hero-m-1080.avif 1080w",
    imageSizes: "100vw",
    media: "(max-width: 767px)",
  },
  {
    rel: "preload",
    as: "image",
    type: "image/avif",
    imageSrcSet: "/img/hero-1280.avif 1280w, /img/hero-1920.avif 1920w, /img/hero-2560.avif 2560w",
    imageSizes: "100vw",
    media: "(min-width: 768px)",
  },
];

export default function Home() {
  return (
    <ServiceDialogProvider>
      <Loader />
      <Hero />
      <FogJoint variant="a" />
      <Reassurance />
      <Glance />
      <Credentials />
      <Support />
      <Journey />
      <Approaches />
      <About />
      <WorksWith />
      <FogJoint variant="b" />
      <Expect />
      <Policies />
      <FogJoint variant="c" />
      <Where />
      <Faq />
      <FogJoint variant="d" />
      <Contact />
    </ServiceDialogProvider>
  );
}
