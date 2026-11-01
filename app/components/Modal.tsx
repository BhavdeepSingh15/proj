// Native <dialog> wrapper used by the booking notice, the mobile menu and the
// service details. showModal() gives focus trapping, Esc and an inert page.
// Layers: a fixed dimmed backdrop (.modal__scrim), then a full-screen scroll
// layer (.modal__scroll) holding the panel. Scrolling anywhere moves only the
// panel; the page behind stays frozen. Clicking the empty area closes.
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { lib } from "~/motion/lib";
import { useMotion } from "~/motion/MotionProvider";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  variant: "notice" | "menu" | "service";
  initialFocus?: RefObject<HTMLElement | null>;
  returnFocus?: RefObject<HTMLElement | null>;
  /** Custom entrance (e.g. Flip from a card). Return true if it handled the panel. */
  enter?: (panel: HTMLElement) => boolean;
  /** Custom exit. Must call done() when finished. Return true if handled. */
  exit?: (panel: HTMLElement, done: () => void) => boolean;
  children: ReactNode;
};

export function Modal({ open, onClose, labelledBy, variant, initialFocus, returnFocus, enter, exit, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { mode, lenis } = useMotion();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const d = ref.current;
    const panel = panelRef.current;
    const scrim = scrimRef.current;
    if (!d || !panel || !scrim) return;
    const animate = mode === "full" && Boolean(lib.gsap);
    const gsap = lib.gsap;
    const sheet = variant === "menu" || window.matchMedia("(max-width: 767px)").matches;

    if (open && !d.open) {
      d.showModal();
      document.documentElement.classList.add("modal-open");
      lenis.current?.stop();
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      panel.scrollTop = 0;
      (initialFocus?.current ?? panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel).focus({ preventScroll: true });
      if (animate) {
        gsap.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "ui" });
        if (!(enter && enter(panel))) {
          if (sheet) gsap.fromTo(panel, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "calm", clearProps: "transform" });
          else gsap.fromTo(panel, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "calm", clearProps: "transform" });
        }
      }
    } else if (!open && d.open) {
      const finish = () => {
        d.close();
        if (gsap) {
          gsap.killTweensOf([panel, scrim]);
          gsap.set([panel, scrim], { clearProps: "all" });
        }
        document.documentElement.classList.remove("modal-open");
        lenis.current?.start();
        returnFocus?.current?.focus({ preventScroll: true });
      };
      if (!animate) return finish();
      if (exit && exit(panel, finish)) {
        // The backdrop stays until the card has almost gone back.
        gsap.to(scrim, { autoAlpha: 0, duration: 0.4, delay: 0.4, ease: "ui" });
      } else {
        gsap.to(scrim, { autoAlpha: 0, duration: 0.25, ease: "ui" });
        gsap.to(panel, { autoAlpha: 0, y: sheet ? 16 : 0, scale: sheet ? 1 : 0.97, duration: 0.2, ease: "ui", onComplete: finish });
      }
    }
  }, [open, mode, variant, enter, exit, initialFocus, returnFocus, lenis]);

  // Esc: animate closed instead of the browser's instant close.
  useEffect(() => {
    const d = ref.current;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onCloseRef.current();
    };
    d?.addEventListener("cancel", onCancel);
    return () => d?.removeEventListener("cancel", onCancel);
  }, []);

  return (
    <dialog ref={ref} className={`modal modal--${variant}`} aria-labelledby={labelledBy}>
      <div ref={scrimRef} className="modal__scrim" aria-hidden="true" />
      <div
        ref={scrollRef}
        className="modal__scroll"
        data-lenis-prevent=""
        onClick={(e) => {
          if (e.target === e.currentTarget) onCloseRef.current();
        }}
      >
        <div ref={panelRef} className="modal__panel" tabIndex={-1}>
          {children}
        </div>
      </div>
    </dialog>
  );
}
