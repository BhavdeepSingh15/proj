import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { contact, practice, safety, ui } from "~/content/site";
import { useMotion } from "~/motion/MotionProvider";
import { BookButton } from "./BookingNotice";
import { ChatIcon, CloseIcon, MailIcon, MenuIcon } from "./Icons";
import { Modal } from "./Modal";

// Any part of the name after the wordmark (hidden on small phones).
const brandRest = practice.name.replace(practice.wordmark, "").trim();

/** Same-page anchors scroll smoothly (through Lenis on desktop) and move focus. */
export function useAnchorClick() {
  const { pathname } = useLocation();
  const { scrollToHash } = useMotion();
  return (e: React.MouseEvent<HTMLAnchorElement>, href: string, after?: () => void) => {
    if (pathname !== "/" || !href.startsWith("/#")) return;
    e.preventDefault();
    after?.();
    scrollToHash(href.slice(1));
  };
}

export function Nav() {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const anchor = useAnchorClick();
  const { scrollToTop } = useMotion();

  // The logo goes home. Other pages follow the link to "/" (which opens at
  // the top). On the home page itself, scroll back to the top instead of
  // reloading, because a reload can land back at the same scroll position.
  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    scrollToTop();
  };

  // Match the nav to whichever section sits under it. Reads the element
  // under the nav's centre line once per frame while scrolling (works with
  // pinned sections whose tone changes mid-scroll).
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setAtTop(window.scrollY < 12);
      const y = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64) / 2;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((el) => !el.closest(".nav") && el.closest("[data-tone]"));
      const tone = (under?.closest("[data-tone]") as HTMLElement | null)?.dataset.tone;
      if (tone) setTone(tone === "light" ? "light" : "dark");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        {ui.skip}
      </a>
      <header className="nav" data-nav-tone={tone} data-top={atTop ? "" : undefined}>
        <div className="nav__inner container">
          <a className="nav__brand" href="/" onClick={goHome}>
            <img src="/logo.svg" alt="" width="28" height="24" className="nav__logo" />
            <span className="nav__brand-name">
              {practice.wordmark}
              {brandRest && <span className="nav__brand-rest"> {brandRest}</span>}
            </span>
            {/* Spoken name = the visible text, then where it goes. */}
            <span className="sr-only">, {ui.home}</span>
          </a>
          <nav className="nav__links" aria-label="Main">
            <ul>
              {ui.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => anchor(e, l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav__actions">
            <BookButton className="btn btn--dawn nav__pill" />
            <button
              ref={menuBtn}
              type="button"
              className="icon-btn nav__menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
              <span className="sr-only">{ui.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy="menu-title" variant="menu" returnFocus={menuBtn}>
        <div className="menu tone-dark">
          <div className="menu__top">
            <p id="menu-title" className="menu__brand">
              {practice.name}
            </p>
            <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label={ui.close} data-autofocus="">
              <CloseIcon />
            </button>
          </div>
          <ul className="menu__links">
            {ui.footerLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => anchor(e, l.href, () => setMenuOpen(false))}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__actions">
            <a className="btn btn--whatsapp" href={contact.whatsappLink} target="_blank" rel="noopener">
              <ChatIcon />
              {ui.messageWhatsapp}
              <span className="sr-only"> {ui.opensNewTab}</span>
            </a>
            <a className="btn btn--ghost" href="/#write" onClick={(e) => anchor(e, "/#write", () => setMenuOpen(false))}>
              <MailIcon />
              {ui.writeEmail}
            </a>
          </div>
          <div className="safety">
            <p className="safety__notice">{safety.notice}</p>
            {safety.helplines.map((h) => (
              <p key={h.tel} className="safety__line">
                {h.name}: <a href={`tel:${h.tel}`}>{h.number}</a>
              </p>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
