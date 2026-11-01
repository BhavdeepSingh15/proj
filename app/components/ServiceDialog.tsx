// "Learn more": a larger card that grows out of the tapped service card (GSAP
// Flip, on every screen size), built on the native <dialog>. The same content is also a
// real page at /services/[slug], which the card links to.
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { getService } from "~/content/services";
import { contact, ui } from "~/content/site";
import { lib } from "~/motion/lib";
import { useMotion } from "~/motion/MotionProvider";
import { BookButton, useBooking } from "./BookingNotice";
import { ChatIcon, CloseIcon, MailIcon } from "./Icons";
import { Modal } from "./Modal";
import { ServiceDetail } from "./ServiceDetail";

type Ctx = { openService: (slug: string, origin?: HTMLElement | null) => void };
const ServiceContext = createContext<Ctx>({ openService: () => {} });
export const useServiceDialog = () => useContext(ServiceContext);

export function ServiceDialogProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const originImg = useRef<HTMLElement | null>(null);
  const flipState = useRef<ReturnType<typeof lib.Flip.getState> | null>(null);
  // The running open/close timeline; each one stops the other, so closing
  // mid-opening (or reopening mid-closing) never leaves stray styles behind.
  const anim = useRef<gsap.core.Timeline | null>(null);
  const { mode, scrollToHash } = useMotion();
  const { openBooking } = useBooking();
  const service = getService(slug ?? undefined);

  const openService = useCallback(
    (s: string, origin?: HTMLElement | null) => {
      trigger.current = origin ?? (document.activeElement as HTMLElement | null);
      const img = origin?.closest("[data-card]")?.querySelector<HTMLElement>("img[data-flip-id]") ?? null;
      originImg.current = img;
      flipState.current = img && mode === "full" && lib.Flip ? lib.Flip.getState(img) : null;
      setSlug(s);
      setOpen(true);
    },
    [mode],
  );

  const close = useCallback(() => setOpen(false), []);

  // Opening: the backdrop fades in (Modal), the tapped card's photo flies out
  // of the card into the header (unclipped, so the whole flight is visible),
  // then the cream panel unrolls downward and the text rises in.
  const enter = useCallback((panel: HTMLElement) => {
    if (!lib.gsap) return false;
    const { gsap, Flip } = lib;
    const sdetail = panel.querySelector<HTMLElement>(".sdetail");
    const imgBox = panel.querySelector<HTMLElement>(".sdetail__img");
    const img = imgBox?.querySelector<HTMLElement>("img");
    const body = panel.querySelector<HTMLElement>(".sdetail__body");
    const parts = panel.querySelectorAll(".sdetail__body > *");
    const closeBtn = panel.querySelector(".modal__close");
    if (!sdetail || !imgBox || !img || !body) return false;
    const state = flipState.current;
    const radius = window.matchMedia("(min-width: 900px)").matches ? "20px 20px 0px 0px" : "0px";
    gsap.set(panel, { autoAlpha: 1 });
    anim.current?.kill();
    const tl = (anim.current = gsap.timeline({
      defaults: { ease: "calm" },
      onComplete: () => gsap.set([sdetail, imgBox, img, body], { clearProps: "overflow,backgroundColor,borderRadius,clipPath" }),
    }));
    if (state) {
      gsap.set([sdetail, imgBox], { overflow: "visible", backgroundColor: "transparent" });
      // The photo leaves its card: hide the original while the dialog is open.
      if (originImg.current) gsap.set(originImg.current, { autoAlpha: 0 });
      tl.add(Flip.from(state, { targets: img, duration: 0.85, ease: "calm" }), 0).fromTo(
        img,
        { borderRadius: "12px" },
        { borderRadius: radius, duration: 0.85 },
        0,
      );
    } else {
      tl.fromTo(panel, { y: 48 }, { y: 0, duration: 0.7, clearProps: "transform" }, 0);
    }
    const t = state ? 0.4 : 0.1;
    tl.fromTo(body, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "glide" }, t)
      .fromTo(parts, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, clearProps: "transform" }, t + 0.2)
      .fromTo(closeBtn, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.45, clearProps: "transform" }, t + 0.35);
    return true;
  }, []);

  // Closing: the reverse. Text fades, the panel rolls up, the photo flies
  // back into its card; the backdrop fades last (Modal).
  const exit = useCallback((panel: HTMLElement, done: () => void) => {
    if (!lib.gsap) return false;
    const { gsap, Flip } = lib;
    const sdetail = panel.querySelector<HTMLElement>(".sdetail");
    const imgBox = panel.querySelector<HTMLElement>(".sdetail__img");
    const img = imgBox?.querySelector<HTMLElement>("img");
    const body = panel.querySelector<HTMLElement>(".sdetail__body");
    const parts = panel.querySelectorAll(".sdetail__body > *");
    const closeBtn = panel.querySelector(".modal__close");
    const card = originImg.current;
    if (!sdetail || !imgBox || !img || !body) return false;
    const toCard = Boolean(flipState.current && card && card.isConnected);
    anim.current?.kill();
    const tl = (anim.current = gsap.timeline({
      defaults: { ease: "calm" },
      onComplete: () => {
        if (card) gsap.set(card, { clearProps: "opacity,visibility" }); // photo is back in its card
        done();
        // The same nodes are reused for the next service, so leave them clean.
        gsap.set([sdetail, imgBox, img, body, closeBtn, ...parts].filter(Boolean), { clearProps: "all" });
      },
    }));
    tl.to([...parts, closeBtn].filter(Boolean), { autoAlpha: 0, duration: 0.18, ease: "ui" }, 0).fromTo(
      body,
      { clipPath: "inset(0% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 100% 0%)", duration: 0.4, ease: "glide" },
      0.08,
    ).to(body, { autoAlpha: 0, duration: 0.08, ease: "none" }, 0.4);
    if (toCard && card) {
      gsap.set([sdetail, imgBox], { overflow: "visible", backgroundColor: "transparent" });
      tl.add(Flip.fit(img, card, { duration: 0.6, ease: "calm" }) as gsap.core.Tween, 0.3).to(img, { borderRadius: "12px", duration: 0.6 }, 0.3);
    } else {
      if (card) gsap.to(card, { autoAlpha: 1, duration: 0.3, clearProps: "opacity,visibility" });
      tl.to(panel, { autoAlpha: 0, y: 24, duration: 0.3, ease: "ui" }, 0.25);
    }
    return true;
  }, []);

  const titleId = "service-title";

  return (
    <ServiceContext.Provider value={{ openService }}>
      {children}
      <Modal
        open={open}
        onClose={close}
        labelledBy={titleId}
        variant="service"
        returnFocus={trigger}
        enter={enter}
        exit={exit}
      >
        {service && (
          <ServiceDetail
            service={service}
            titleId={titleId}
            closeButton={
              <button type="button" className="icon-btn modal__close" onClick={close} aria-label={ui.close} data-autofocus="">
                <CloseIcon />
              </button>
            }
            actions={
              <>
                <BookButton
                  onBeforeOpen={() => {
                    flipState.current = null; // plain fade when handing over to the notice
                    setOpen(false);
                    setTimeout(() => openBooking(trigger.current), 0);
                  }}
                />
                <a className="btn btn--ghost" href={contact.whatsappLink} target="_blank" rel="noopener">
                  <ChatIcon />
                  {ui.messageWhatsapp}
                  <span className="sr-only"> {ui.opensNewTab}</span>
                </a>
                <a
                  className="btn btn--quiet"
                  href="/#write"
                  onClick={(e) => {
                    e.preventDefault();
                    flipState.current = null;
                    setOpen(false);
                    setTimeout(() => scrollToHash("#write"), 260);
                  }}
                >
                  <MailIcon />
                  {ui.writeEmail}
                </a>
              </>
            }
          />
        )}
      </Modal>
    </ServiceContext.Provider>
  );
}
