// Section 1: intro loader. Shown once per session on the home page, decided by
// the inline <head> script (adds .show-loader). Animated purely in CSS so it
// starts at first paint, without waiting for JavaScript; see styles/motion.css.
import { practice } from "~/content/site";

export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__inner">
        <p className="loader__word">{practice.name}</p>
        <svg className="loader__ripple" viewBox="0 0 160 24" fill="none">
          <path
            d="M2 12 C 8 4, 14 4, 20 12 S 32 20, 38 12 S 50 6, 56 12 S 66 17, 72 12 S 82 8, 88 12 S 97 15, 102 12 S 111 10, 116 12 S 124 13.5, 130 12 S 140 11.5, 158 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <p className="loader__label">{practice.motto}</p>
      </div>
    </div>
  );
}
