// "Book a session" never books here. It opens this notice, which explains that
// bookings happen on WhatsApp and hands the visitor to the chat.
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { bookingNotice, consent, contact, ui } from "~/content/site";
import { ChatIcon, CloseIcon } from "./Icons";
import { Modal } from "./Modal";

type Ctx = { openBooking: (trigger?: HTMLElement | null) => void };
const BookingContext = createContext<Ctx>({ openBooking: () => {} });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const continueRef = useRef<HTMLAnchorElement>(null);

  const openBooking = useCallback((t?: HTMLElement | null) => {
    trigger.current = t ?? (document.activeElement as HTMLElement | null);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <Modal
        open={open}
        onClose={close}
        labelledBy="booking-title"
        variant="notice"
        initialFocus={continueRef}
        returnFocus={trigger}
      >
        <div className="notice">
          <button type="button" className="icon-btn notice__x" onClick={close} aria-label={ui.close}>
            <CloseIcon />
          </button>
          <h2 id="booking-title" className="notice__title">
            {bookingNotice.title}
          </h2>
          <p className="notice__text">{bookingNotice.text}</p>
          <p className="notice__text muted">{bookingNotice.hours}</p>
          <p className="notice__text notice__consent">
            {consent.reminder}{" "}
            <a className="text-link" href="/consent">
              {ui.consent.open}
            </a>
          </p>
          <div className="notice__actions">
            <a
              ref={continueRef}
              className="btn btn--whatsapp notice__go"
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener"
              onClick={() => setTimeout(close, 300)}
            >
              <ChatIcon />
              {ui.continueWhatsapp}
              <span className="sr-only"> {ui.opensNewTab}</span>
            </a>
            <button type="button" className="btn btn--quiet" onClick={close}>
              {ui.close}
            </button>
          </div>
        </div>
      </Modal>
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);

/** A WhatsApp link that, with JavaScript on, shows the booking notice first. */
export function BookButton({
  className = "btn btn--dawn",
  label = ui.bookSession,
  onBeforeOpen,
}: {
  className?: string;
  label?: string;
  onBeforeOpen?: () => void;
}) {
  const { openBooking } = useBooking();
  return (
    <a
      className={className}
      href={contact.whatsappLink}
      onClick={(e) => {
        e.preventDefault();
        onBeforeOpen?.();
        openBooking(e.currentTarget);
      }}
    >
      {label}
    </a>
  );
}
