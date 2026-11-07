// The informed consent form: download it, sign it, send it back on WhatsApp or
// by email. Nothing is uploaded here; the signed file goes straight from the
// visitor's device to WhatsApp or their email app.
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ChatIcon, DownloadIcon, MailIcon, ShareIcon } from "~/components/Icons";
import { consent, contact, practice, seo, ui } from "~/content/site";
import type { Route } from "./+types/consent";

export const meta: Route.MetaFunction = () => [
  { title: `${consent.title} | ${practice.name}` },
  { name: "description", content: consent.intro },
  { tagName: "link", rel: "canonical", href: `${seo.siteUrl}/consent` },
];

const enc = encodeURIComponent;
const whatsapp = `${contact.whatsappLink}?text=${enc(consent.whatsappText)}`;
const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(contact.email)}&su=${enc(consent.emailSubject)}&body=${enc(consent.emailBody)}`;
const mailto = `mailto:${contact.email}?subject=${enc(consent.emailSubject)}&body=${enc(consent.emailBody)}`;

export default function Consent() {
  const [download, sign, send] = consent.steps;
  return (
    <div className="page tone-light" data-tone="light">
      <div className="container page__inner page__narrow consent">
        <a className="page__back" href="/">
          <ArrowLeftIcon width={16} height={16} /> {ui.backHome}
        </a>
        <header className="consent__head">
          <h1 className="h2">{consent.title}</h1>
          <p className="consent__intro">{consent.intro}</p>
        </header>

        <ol className="consent__steps">
          <li className="cstep">
            <span className="cstep__num" aria-hidden="true">1</span>
            <div className="cstep__body">
              <h2 className="cstep__title">{download.title}</h2>
              <p>{download.text}</p>
              <div className="cstep__actions">
                <a className="btn btn--dawn" href={consent.file} download={consent.fileName}>
                  <DownloadIcon />
                  {ui.consent.download}
                </a>
              </div>
              <p className="cstep__meta muted">{consent.fileInfo}</p>
            </div>
          </li>

          <li className="cstep">
            <span className="cstep__num" aria-hidden="true">2</span>
            <div className="cstep__body">
              <h2 className="cstep__title">{sign.title}</h2>
              <p>{sign.text}</p>
              <ul className="cstep__notes">
                {consent.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </li>

          <li className="cstep">
            <span className="cstep__num" aria-hidden="true">3</span>
            <div className="cstep__body">
              <h2 className="cstep__title">{send.title}</h2>
              <p>{send.text}</p>
              <div className="cstep__actions">
                <a className="btn btn--whatsapp" href={whatsapp} target="_blank" rel="noopener">
                  <ChatIcon />
                  {ui.consent.sendWhatsapp}
                  <span className="sr-only"> {ui.opensNewTab}</span>
                </a>
                <a className="btn btn--ghost" href={gmail} target="_blank" rel="noopener">
                  <MailIcon />
                  {ui.composer.gmail}
                  <span className="sr-only"> {ui.opensNewTab}</span>
                </a>
                <a className="btn btn--ghost" href={mailto}>
                  {ui.composer.otherApp}
                </a>
              </div>
              <p className="cstep__meta muted">
                {ui.consent.sendsTo} <a href={`mailto:${contact.email}`}>{contact.email}</a> · WhatsApp{" "}
                {contact.whatsappDisplay}
              </p>
              <ShareSigned />
            </div>
          </li>
        </ol>

        <p className="consent__privacy muted">{consent.privacyNote}</p>
      </div>
    </div>
  );
}

/**
 * Phones (and some browsers) can share a file straight into WhatsApp or Mail.
 * Shown only where that works. Two taps on purpose: choosing the file, then
 * sharing it, because browsers only allow sharing right after a tap.
 */
function ShareSigned() {
  const [supported, setSupported] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [failed, setFailed] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const probe = new File(["%PDF"], "form.pdf", { type: "application/pdf" });
      setSupported(typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] }));
    } catch {
      setSupported(false);
    }
  }, []);

  if (!supported) return null;

  const share = async () => {
    if (!file) return;
    setFailed(false);
    try {
      if (!navigator.canShare({ files: [file] })) throw new Error("not shareable");
      await navigator.share({ files: [file], title: consent.emailSubject, text: consent.whatsappText });
    } catch (err) {
      if ((err as DOMException)?.name !== "AbortError") setFailed(true);
    }
  };

  return (
    <div className="cshare">
      <p className="cshare__title">{ui.consent.shareTitle}</p>
      <p className="cshare__hint">{ui.consent.shareHint}</p>
      <input
        ref={input}
        type="file"
        accept="application/pdf,image/*"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
          setFailed(false);
        }}
      />
      {file && (
        <p className="cshare__file">
          {ui.consent.chosen} <strong>{file.name}</strong>
        </p>
      )}
      <div className="cstep__actions">
        {file && (
          <button type="button" className="btn btn--deep" onClick={share}>
            <ShareIcon />
            {ui.consent.share}
          </button>
        )}
        <button type="button" className={`btn ${file ? "btn--quiet" : "btn--ghost"}`} onClick={() => input.current?.click()}>
          {file ? ui.consent.chooseAgain : ui.consent.choose}
        </button>
      </div>
      {failed && (
        <p className="cshare__error" role="alert">
          {ui.consent.shareFailed}
        </p>
      )}
    </div>
  );
}
