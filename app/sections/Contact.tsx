// Section 18: Contact on dark, reached through fog joint D.
import { useRef } from "react";
import { BookButton } from "~/components/BookingNotice";
import { Composer } from "~/components/Composer";
import { Heading } from "~/components/Heading";
import { CameraIcon, ChatIcon, PinIcon, ProfileIcon } from "~/components/Icons";
import { contact, contactSection, safety, ui } from "~/content/site";
import { useContactMotion } from "~/motion/sections/contact";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useContactMotion(ref);
  return (
    <section ref={ref} id="contact" className="section contact tone-dark" data-tone="dark" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__copy">
          <p className="kicker" data-reveal="">
            {contactSection.kicker}
          </p>
          <Heading h={contactSection.heading} id="contact-title" className="h2 contact__title" />
          <p className="contact__text" data-reveal="">
            {contactSection.text}
          </p>
          <p className="contact__text muted" data-reveal="">
            {contactSection.closing}
          </p>
          <div className="contact__ctas" data-reveal="">
            <a className="btn btn--whatsapp contact__wa" href={contact.whatsappLink} target="_blank" rel="noopener">
              <ChatIcon />
              {ui.messageWhatsapp}
              <span className="sr-only"> {ui.opensNewTab}</span>
            </a>
            <BookButton className="btn btn--ghost" />
          </div>
          <p className="contact__num" data-reveal="">
            {contact.whatsappDisplay} <span className="muted">· {contact.whatsappHours}</span>
          </p>
          <ul className="contact__links" data-reveal="">
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
            <li>
              <a href={contact.googleProfile} target="_blank" rel="noopener">
                <PinIcon /> {contact.googleProfileLabel}
                <span className="sr-only"> {ui.opensNewTab}</span>
              </a>
            </li>
          </ul>
          <p className="contact__pay" data-reveal="">
            {contact.payments}
          </p>
          <div className="safety" data-reveal="">
            <p className="safety__notice">{safety.notice}</p>
            {safety.helplines.map((h) => (
              <p key={h.tel} className="safety__line">
                {h.name}: <a href={`tel:${h.tel}`}>{h.number}</a>
              </p>
            ))}
          </div>
        </div>
        <div className="contact__form">
          <Composer />
        </div>
      </div>
    </section>
  );
}
