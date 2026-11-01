import { contact, safety, ui } from "~/content/site";
import { CameraIcon, ChatIcon, MailIcon, PinIcon, ProfileIcon } from "./Icons";
import { useAnchorClick } from "./Nav";

// The footer is deliberately static: no reveals, no scroll effects.
export function Footer() {
  const anchor = useAnchorClick();

  return (
    <footer className="footer tone-dark" data-tone="dark">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__safety">
            <div className="safety">
              <p className="safety__notice">{safety.notice}</p>
              {safety.helplines.map((h) => (
                <p key={h.tel} className="safety__line">
                  {h.name}: <a href={`tel:${h.tel}`}>{h.number}</a>
                </p>
              ))}
            </div>
          </div>
          <nav className="footer__col" aria-label="Footer">
            <ul className="footer__links">
              {ui.footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => anchor(e, l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer__col">
            <ul className="footer__contact">
              <li>
                <a href={contact.whatsappLink} target="_blank" rel="noopener">
                  <ChatIcon /> WhatsApp {contact.whatsappDisplay}
                  <span className="sr-only"> {ui.opensNewTab}</span>
                </a>
              </li>
              <li>
                <a href="/#write" onClick={(e) => anchor(e, "/#write")}>
                  <MailIcon /> {ui.writeEmail}
                </a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noopener">
                  <CameraIcon /> Instagram<span className="sr-only"> {ui.opensNewTab}</span>
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener">
                  <ProfileIcon /> LinkedIn<span className="sr-only"> {ui.opensNewTab}</span>
                </a>
              </li>
              <li className="footer__place">
                <PinIcon /> {contact.location}
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <p className="footer__copy">
            <img src="/logo.svg" alt="" width="22" height="19" /> {ui.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
