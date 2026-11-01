// "Write an email": builds a formal email (same wording as the booking site)
// and opens it in Gmail or the visitor's mail app. Nothing is sent or stored.
// Booking, appointment and payment topics are handled on WhatsApp instead.
import { useMemo, useRef, useState } from "react";
import { bookingNotice, composer, contact, ui } from "~/content/site";
import { BookButton } from "./BookingNotice";
import { MailIcon } from "./Icons";

type Values = { name: string; phone: string; topic: string; forWhom: string; mode: string; times: string; message: string };

export function buildEmail(v: Values) {
  const t = composer.topics.find((x) => x.id === v.topic) ?? composer.topics[0];
  const T = composer.template;
  const who = v.name.trim() || T.namePlaceholder;
  const details = [
    `- ${T.forWhom}: ${v.forWhom}`,
    `- ${T.mode}: ${v.mode}`,
    v.times.trim() && `- ${T.times}: ${v.times.trim()}`,
    v.phone.trim() && `- ${T.phone}: ${v.phone.trim()}`,
  ].filter(Boolean) as string[];
  const body = [
    composer.greeting,
    "",
    T.opening,
    "",
    T.regarding(who, t.phrase),
    ...(v.message.trim() ? ["", v.message.trim()] : []),
    "",
    T.detailsIntro,
    ...details,
    "",
    T.nextSteps,
    "",
    T.thanks,
    "",
    T.signOff,
    who,
    ...(v.phone.trim() ? [v.phone.trim()] : []),
  ].join("\n");
  return { subject: T.subject(t.label, who), body };
}

export function emailLinks(email: { subject: string; body: string }) {
  const s = encodeURIComponent(email.subject);
  const b = encodeURIComponent(email.body);
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}&su=${s}&body=${b}`,
    mailto: `mailto:${contact.email}?subject=${s}&body=${b}`,
  };
}

export function Composer() {
  const [v, setV] = useState<Values>({
    name: "",
    phone: "",
    topic: composer.topics[1].id, // "A question before booking"
    forWhom: composer.forWhom[0],
    mode: composer.modes[0],
    times: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((o) => ({ ...o, [k]: e.target.value }));
    if (k === "name") setError(false);
  };

  const email = useMemo(() => buildEmail(v), [v]);
  const links = emailLinks(email);
  const topic = composer.topics.find((t) => t.id === v.topic)!;

  const guard = (e: React.MouseEvent) => {
    if (v.name.trim()) return;
    e.preventDefault();
    setError(true);
    nameRef.current?.focus();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is visible */
    }
  };

  return (
    <div className="composer" id="write">
      <div className="composer__head">
        <span className="composer__icon" aria-hidden="true">
          <MailIcon width={20} height={20} />
        </span>
        <div>
          <h3 className="composer__title" id="write-title">
            {composer.title}
          </h3>
          <p className="composer__lead">{composer.lead}</p>
        </div>
      </div>
      <form className="composer__form" onSubmit={(e) => e.preventDefault()} noValidate aria-labelledby="write-title">
        <label className="field" data-field="">
          <span className="field__label">{ui.composer.name}</span>
          <input
            ref={nameRef}
            className="input"
            value={v.name}
            onChange={set("name")}
            autoComplete="name"
            required
            aria-invalid={error}
            aria-describedby={error ? "name-error" : undefined}
          />
          {error && (
            <span id="name-error" className="field__error" role="alert">
              {ui.composer.nameError}
            </span>
          )}
        </label>
        <label className="field" data-field="">
          <span className="field__label">{ui.composer.phone}</span>
          <input className="input" type="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" />
        </label>
        <label className="field" data-field="">
          <span className="field__label">{ui.composer.topic}</span>
          <select className="input" value={v.topic} onChange={set("topic")}>
            {composer.topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        {topic.whatsappOnly ? (
          <div className="composer__route" role="status" data-field="">
            <p className="composer__route-title">{bookingNotice.title}</p>
            <p>{bookingNotice.text}</p>
            <p className="muted">{bookingNotice.hours}</p>
            <BookButton className="btn btn--whatsapp" label={ui.continueWhatsapp} />
          </div>
        ) : (
          <>
            <div className="field-row">
              <label className="field" data-field="">
                <span className="field__label">{ui.composer.forWhom}</span>
                <select className="input" value={v.forWhom} onChange={set("forWhom")}>
                  {composer.forWhom.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label className="field" data-field="">
                <span className="field__label">{ui.composer.mode}</span>
                <select className="input" value={v.mode} onChange={set("mode")}>
                  {composer.modes.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="field" data-field="">
              <span className="field__label">{ui.composer.times}</span>
              <input className="input" value={v.times} onChange={set("times")} placeholder={ui.composer.timesPlaceholder} />
            </label>
            <label className="field" data-field="">
              <span className="field__label">{ui.composer.message}</span>
              <textarea className="input textarea" rows={4} maxLength={1000} value={v.message} onChange={set("message")} />
            </label>
            <figure className="composer__preview" aria-label={ui.composer.preview}>
              <figcaption className="kicker">{ui.composer.preview}</figcaption>
              <p className="composer__subject">
                <span>{ui.composer.subject}</span>
                {email.subject}
              </p>
              <pre className="composer__body">{email.body}</pre>
            </figure>
            <div className="composer__actions" data-field="">
              <a className="btn btn--dawn" href={links.gmail} target="_blank" rel="noopener" onClick={guard}>
                {ui.composer.gmail}
                <span className="sr-only"> {ui.opensNewTab}</span>
              </a>
              <a className="btn btn--ghost" href={links.mailto} onClick={guard}>
                {ui.composer.otherApp}
              </a>
            </div>
            <p className="composer__to">
              {ui.composer.sendsTo} <span className="composer__addr">{contact.email}</span>{" "}
              <button type="button" className="btn--quiet composer__copy" onClick={copy}>
                {copied ? ui.composer.copied : ui.composer.copy}
              </button>
            </p>
          </>
        )}
      </form>
    </div>
  );
}
