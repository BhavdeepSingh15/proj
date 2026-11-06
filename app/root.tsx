import { Analytics } from "@vercel/analytics/react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";

import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/chrome.css";
import "./styles/sections.css";
import "./styles/motion.css";

import { BookingProvider } from "./components/BookingNotice";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { ui } from "./content/site";
import { MotionProvider } from "./motion/MotionProvider";

// Runs before first paint: decides whether animations (and the intro loader)
// are allowed, so hidden starting states never flash. Only the device's own
// "reduce motion" setting turns them off. (It also clears the old on-site
// switch's saved choice, so nobody is left stuck without animations.) If the app hasn't
// started within 3.5 s, motion is switched off and everything shows.
const headScript = `(function(){var d=document.documentElement,s=null;
try{localStorage.removeItem('sw-motion')}catch(e){}
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(rm){d.setAttribute('data-motion','reduce');return}
d.classList.add('motion');if(location.pathname==='/')d.classList.add('is-home');
try{s=sessionStorage.getItem('sw-intro')}catch(e){}
if(location.pathname==='/'&&!location.hash&&!s){d.classList.add('show-loader');try{sessionStorage.setItem('sw-intro','1')}catch(e){}}
else{d.classList.add('no-loader')}
setTimeout(function(){if(!d.classList.contains('motion-ready')){d.classList.remove('motion','show-loader');d.classList.add('motion-failed')}},3500)})();`;

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2f3a33" />
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <BookingProvider>
        <Nav />
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
        {/* Vercel Web Analytics: anonymous visit counts, no cookies. */}
        <Analytics />
      </BookingProvider>
    </MotionProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="section tone-dark simple-page">
      <div className="container">
        <h1 className="h2">{notFound ? ui.pageNotFound : "Error"}</h1>
        <p>
          <a className="text-link" href="/">
            {ui.backHome}
          </a>
        </p>
      </div>
    </main>
  );
}
