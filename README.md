# Mind Mysteries — showcase website

A calm, mobile-first website for Mind Mysteries, built with **React + Node**
(React 19, React Router 8 in framework mode, Vite, TypeScript). Node is used to
build the site; the result is plain static files, so it can be hosted anywhere.

- Every word on the site comes from `appendix.md`. The few wordings that had to
  change (because this site makes no bookings) are listed in
  `app/content/changes.ts`, and a test fails if anything else creeps in.
- **No bookings happen on this site.** Every "Book a session" button first shows a
  notice that all booking matters are handled on WhatsApp, then opens her
  WhatsApp (+91 94638 80582). With JavaScript off, the buttons go straight to WhatsApp.
- No fees are shown anywhere. Wherever payments come up, the site says
  "For anything related to payments, please send a WhatsApp message."
- The emergency notice and Tele-MANAS (14416 / 1-800-891-4416) appear in the
  footer, the Contact section and the mobile menu.
- No cookies, analytics or tracking.
- The therapist's name appears only in the About section.

## Quick start

You need **Node.js 22.22 or newer** (`node -v` to check).

```bash
npm install        # once
npm run dev        # live preview at http://localhost:5173
```

To build and preview the real production site:

```bash
npm run build      # writes the static site to build/client
npm run preview    # serves it at http://localhost:4173
```

## Checks

```bash
npm test           # content provenance: every string traces to appendix.md
npm run build && npm run test:built
                   # built pages: name only in About, no prices, safety info present
npm run typecheck  # TypeScript
```

## Where things live

```
appendix.md                 the source content (verbatim)
app/content/                all text, split by section (site, services, lists)
  changes.ts                the approved wording changes, each with its reason
app/sections/               the page sections, top to bottom
app/components/             nav, footer, dialogs, booking notice, email composer
app/motion/                 the animation engine (GSAP + Lenis), one file per section
app/styles/                 tokens (colours, type, spacing), layout, motion states
app/routes/                 home, /services/:slug, /privacy, 404
public/                     logo, favicon, images (AVIF + WebP)
assets-src/                 full-size image masters
scripts/                    image + font generation, post-build, built-site checks
tests/                      the provenance test
```

To change wording, edit `appendix.md` first, then the matching file in
`app/content/`. `npm test` tells you if the two drift apart.

## Colours

The site uses the "Sage & clay" palette: deep moss for the dark sections,
sage for lines and fills, clay for buttons and accents, and warm cream and
sand for the light sections. All colours live in `app/styles/tokens.css`. The
original greens are listed in a comment at the top of that file, so
switching back means pasting those values in.

## Motion

The site reproduces the motion of the reference recording: an opening loader,
the hero headline rising letter by letter, the fog lifting into cream, count-up
numbers, a pinned sideways gallery of services with a progress line, self-drawing
line art, the About collage, circle swatches, the dark "What to expect" and
policies sections, the map with its ripple, and the FAQ.

- Phones get the same effects as desktop: the hero holds while the fog lifts,
  the services gallery pins and slides sideways, the parallax, side slides and
  self-drawing route all run, tuned to the smaller screen. Touch scrolling
  stays native (no smooth-scroll hijacking).
- Every animation has a reduced-motion version. Visitors whose device asks for
  less motion (the "Reduce motion" setting on iPhone, Android, Mac or Windows)
  automatically get the calm static version.
- The opening loader and hero intro are pure CSS, so they never wait for JavaScript.
  The animation engine loads after the page is visible.
- If JavaScript fails or is off, everything is simply shown, nothing stays hidden.

## Images and fonts

The images are original, generated artwork (water, mist, fog). They are already
built into `public/img`, so you only need these if you want to regenerate them:

```bash
pip install numpy pillow     # once
npm run images               # rebuilds assets-src/*.jpg and public/img/*

pip install fonttools brotli # once
python3 scripts/subset-fonts.py   # rebuilds the trimmed fonts in app/fonts
```

## Hosting

`npm run build` produces a static site in `build/client`.

- **Vercel (chosen).** `vercel.json` is included and sets everything: install
  `npm ci`, build `npm run build`, output `build/client`, caching and security
  headers. Import the GitHub repo in Vercel and deploy; every push redeploys.
  Vercel's free Hobby plan is for non-commercial use only, and a practice website
  counts as commercial, so the Pro plan is the one within Vercel's terms.
- **Netlify** also works (free plan allows commercial sites): `netlify.toml` is
  included.

## Before launch

1. Set the real web address in `app/content/site.ts` → `seo.siteUrl`
   (it is used for the sitemap, social previews and search listings), then rebuild.
2. Open questions from the PRD, worth checking with the practice:
   - The "Mayo Clinic" reading link on Couples therapy points to `mymlc.com`,
     not `mayoclinic.org`. It is kept exactly as given in the appendix.

## How it was built (phases)

0. **Foundation:** project setup, design tokens, fonts, generated imagery, content
   files from the appendix and the provenance test.
1. **Static site:** every section, mobile first, fully readable with no JavaScript.
2. **Chrome:** nav, mobile menu, booking notice, service dialogs and pages, footer,
   privacy page, 404.
3. **Motion, part 1:** loader, hero intro, fog, light sections, pinned gallery.
4. **Motion, part 2:** journey, line drawings, About collage, dark sections, map,
   FAQ, contact, and every reduced-motion version.
5. **Hardening:** accessibility (axe: no violations, Lighthouse accessibility 100),
   keyboard and screen-reader paths, 320 px reflow, performance (Lighthouse
   desktop 99 to 100, mobile 93 to 98, layout shift ≈ 0), built-site checks.
6. **Handover:** this README, hosting config.
