// ─────────────────────────────────────────────────────────────────────────────
// Every word on the site lives in app/content. Text here comes from appendix.md
// (the approved copy). Anything adapted or added is listed in
// app/content/changes.ts, and `npm test` fails if a string can't be traced.
//
// Rule: the therapist's name appears ONLY in the About section (about.name).
// ─────────────────────────────────────────────────────────────────────────────

const PHONE_DISPLAY = "+91 94638 80582";
const PHONE_DIGITS = "919463880582";
const GOOGLE_PROFILE = "https://share.google/vqAyCZi9v7Z0cPVcf";

export const practice = {
  name: "Stillwater Counselling",
  wordmark: "Stillwater",
  tagline: "Clinical psychologist, Chandigarh",
  city: "Chandigarh",
  availability: "Accepting new clients, online and in person",
};

export const contact = {
  whatsappDisplay: PHONE_DISPLAY,
  whatsappLink: `https://wa.me/${PHONE_DIGITS}`,
  whatsappHours: "9 am to 7 pm",
  responseNote: "WhatsApp messages sent between 9 am and 7 pm are answered as soon as possible.",
  email: "anoopkaur1712@outlook.com",
  instagram: "https://www.instagram.com/aneek_mindcareclinic/",
  linkedin: "https://www.linkedin.com/in/anoop-inder-kaur-0b75b4252",
  location: "Landmark Hospital, Sector 33, Chandigarh",
  googleProfile: GOOGLE_PROFILE,
  googleProfileLabel: "See reviews and directions on Google",
  payments: `For anything related to payments, please send a WhatsApp message to ${PHONE_DISPLAY}.`,
};

export const hero = {
  kicker: "RCI-licensed Clinical Psychologist, Landmark Hospital, Chandigarh",
  specialties: "Online and in-person therapy for teenagers, adults and couples",
  headline: "You don’t have to carry it all on your own.",
  // Change 1: the booking-app sentence is replaced (see changes.ts).
  intro:
    "Trauma-informed psychotherapy and counselling for low mood, anger, relationship difficulties, painful experiences and the weight of everyday life. Send a WhatsApp message to choose a time that suits you.",
};

export const reassurance = {
  // Closing headline from the appendix, split over three lines for the arch.
  lines: ["A safe space", "can begin", "with one small step."],
  full: "A safe space can begin with one small step.",
  text: "It takes a lot of effort to reach out for support. You don’t need to have it all figured out first.",
};

export const glance = {
  heading: { before: "Online and in-person therapy for ", em: "teenagers, adults and couples" },
  facts: [
    { value: 50, unit: "min", label: "One-to-one sessions, usually weekly" },
    { text: "RCI", label: "Licensed clinical psychologist" },
    { value: 6, unit: "", label: "Therapy approaches she is trained in" },
    { value: 2, unit: "ways", label: "Online, or in person in Chandigarh" },
  ],
};

export const credentials = {
  kicker: "Credentials",
  heading: { before: "Trauma-informed, ", em: "CBT, DBT", after: " and more" },
  teaser:
    "An RCI-licensed Clinical Psychologist at Landmark Hospital, Chandigarh, and a trauma-informed therapist trained in CBT, DBT, CPT, attachment-based therapies, Internal Family Systems and couples therapy. She is also a co-author of books on mental health conditions.",
  rows: [
    { label: "Licence", value: "Rehabilitation Council of India (RCI)" },
    { label: "Training", value: "Masters and Professional Diploma in Clinical Psychology" },
    { label: "Approach", value: "Trauma-informed, CBT, DBT and more" },
  ],
};

export const firstSession = {
  heading: { before: "Your ", em: "first", after: " session" },
  steps: [
    // Change 2: "Before" says how to book.
    { title: "Before", text: "Book a time that suits you on WhatsApp. Online sessions need a quiet, private space." },
    {
      title: "During",
      text: "We start by understanding your background and what brings you here. You share only what you are comfortable with.",
    },
    {
      title: "After",
      text: "Over the first 2–3 sessions we decide together whether to continue and agree on goals. Sessions are usually weekly.",
    },
  ],
};

export const about = {
  kicker: "About",
  name: "Anoop Inder Kaur",
  title: "RCI-licensed Clinical Psychologist",
  registration: "Licensed by the Rehabilitation Council of India (RCI)",
  workplaceLabel: "Works at",
  workplace: "Landmark Hospital, Sector 33, Chandigarh",
  empanelledLabel: "Empanelled with",
  empanelled: "The Indian Army",
  bio: [
    "I am a Clinical Psychologist licensed by the Rehabilitation Council of India (RCI), offering psychotherapy and counselling online and in person. I work at Landmark Hospital, Sector 33, Chandigarh.",
    "I am a trauma-informed therapist, trained and certified in a range of approaches including CBT, DBT, CPT, attachment-based therapies, Internal Family Systems and couples therapy. I am also a co-author of books on mental health conditions.",
    "I understand that it takes a lot of effort to reach out for support. Therapy is a two-way process: we begin by understanding your background and what brings you here, then agree together on the goals and the way forward. Every person is unique, and you will have the time and space you need to heal and make the changes you are looking for.",
  ],
  pullQuote:
    "Every person is unique, and you will have the time and space you need to heal and make the changes you are looking for.",
  qualificationsLabel: "Qualifications",
  qualifications: [
    "Professional Diploma in Clinical Psychology (RCI)",
    "Masters in Clinical Psychology",
    "Diploma in Counselling and Guidance",
  ],
  approachesLabel: "Therapeutic approaches",
  approaches: [
    "Cognitive Behavioural Therapy (CBT)",
    "Dialectical Behaviour Therapy (DBT)",
    "Cognitive Processing Therapy (CPT)",
    "Attachment-based therapies",
    "Internal Family Systems (IFS)",
    "Couples therapy",
  ],
  notSuitableFor:
    "Sessions are by appointment only and are not an emergency service. If you are in crisis, please contact your psychiatrist, a hospital emergency service, or Tele-MANAS on 14416.",
  portraitAlt: "Portrait of Anoop Inder Kaur",
};

export const worksWith = {
  kicker: "Works with",
  heading: { before: "Common reasons people ", em: "reach out" },
  groups: [
    { label: "Adolescents", service: "adolescent-counselling", glyph: "small" },
    { label: "Adults", service: "individual-therapy", glyph: "one" },
    { label: "Couples", service: "couples-therapy", glyph: "two" },
  ],
  concerns: [
    "Depression and low mood",
    "Anger management",
    "Trauma and difficult experiences",
    "Teenage worries and behaviour",
    "Relationship and couple difficulties",
    "Stress and emotional overwhelm",
  ],
};

export const expect = {
  heading: { before: "Therapy is a ", em: "two-way", after: " process" },
  columns: [
    {
      title: "Confidentiality",
      lines: ["Everything we discuss is strictly confidential and is only shared with your written permission."],
    },
    { title: "50-minute sessions", lines: ["Sessions are 50 minutes, usually once a week."] },
    {
      title: "Online and in person",
      lines: ["In person: Landmark Hospital, Sector 33, Chandigarh", "Online: Google Meet, Zoom or WhatsApp video"],
    },
    { title: "You set the pace.", lines: ["You never have to talk about anything you are not ready for."] },
  ],
};

export const where = {
  heading: { before: "Where sessions ", em: "happen" },
  places: [
    {
      id: "in-person",
      label: "In person",
      value: "Landmark Hospital, Sector 33, Chandigarh",
      extra: "",
      link: { label: "See reviews and directions on Google", href: GOOGLE_PROFILE },
    },
    {
      id: "online",
      label: "Online",
      value: "Google Meet, Zoom or WhatsApp video",
      extra: "Please join from a quiet, private place with a secure connection.",
      link: null,
    },
  ],
  mapLabel: "Sector 33",
};

export const contactSection = {
  kicker: "Contact",
  heading: { before: "Have a question ", em: "first", after: "?" },
  text: "Send a WhatsApp text or voice message before booking. Messages between 9 am and 7 pm are answered as soon as possible.",
  closing: "When you feel ready, pick a time that suits you, online or in person.",
};

export const safety = {
  notice: "This website is not for emergencies.",
  helplines: [
    { name: "Tele-MANAS (national mental health helpline)", number: "14416", tel: "14416" },
    { name: "Tele-MANAS toll-free", number: "1-800-891-4416", tel: "18008914416" },
  ],
};

// Change 6: shown by every "Book a session" button before WhatsApp opens.
export const bookingNotice = {
  title: "Bookings are made on WhatsApp",
  text: "All bookings, changes and cancellations are handled on WhatsApp.",
  hours: "Messages between 9 am and 7 pm are answered as soon as possible.",
};

// "Write an email" composer. Template sentences are copied from the booking
// site's EmailComposer so both sites send the same email.
export const composer = {
  title: "Write an email",
  lead: "Fill in a few details and your email will open with a polite, ready-to-send message. Nothing is sent from this website: you can read and change it before sending.",
  greeting: "Dear Ma’am,",
  topics: [
    { id: "first", label: "Booking a first session", phrase: "booking a first session", whatsappOnly: true },
    { id: "question", label: "A question before booking", phrase: "a question I have before booking a session", whatsappOnly: false },
    { id: "existing", label: "An existing appointment", phrase: "my existing appointment", whatsappOnly: true },
    { id: "payment", label: "Payments", phrase: "a payment-related query", whatsappOnly: true },
    { id: "other", label: "Something else", phrase: "a general enquiry", whatsappOnly: false },
  ],
  forWhom: ["Myself", "My child (under 18)", "My partner and me", "Someone else"],
  modes: ["Online", "In person", "Not sure yet"],
  template: {
    opening: "I hope this message finds you well.",
    regarding: (name: string, phrase: string) => `My name is ${name}, and I am writing regarding ${phrase}.`,
    detailsIntro: "A few details that may help:",
    forWhom: "Session is for",
    mode: "Preferred mode",
    times: "Preferred days or times",
    phone: "Phone / WhatsApp",
    nextSteps: "I would be grateful if you could let me know the next steps at your convenience.",
    thanks: "Thank you for your time.",
    signOff: "Kind regards,",
    subject: (label: string, name: string) => `Enquiry: ${label} – ${name}`,
    namePlaceholder: "(your name)",
  },
};

export const privacy = {
  title: "Privacy",
  // Change 5: rewritten for a static site that stores nothing.
  paragraphs: [
    "This website does not use cookies, sign-in, analytics or tracking.",
    "The “Write an email” form works only inside your browser. It opens Gmail or your email app with a message you can read and change before sending. Nothing is sent from this website or saved.",
    "This website saves one small setting in your own browser: whether the opening animation has already played. It never leaves your device.",
    "When you tap WhatsApp, Instagram, LinkedIn or Google, you leave this website and that service’s own privacy policy applies. Like any website, the hosting provider processes technical data such as your IP address to deliver pages securely.",
    "No clinical notes are stored here, and your information is never sold or shared.",
    "If you have a question about privacy, please send a WhatsApp message using the details on the Contact page.",
  ],
};

export const seo = {
  title: "Stillwater Counselling | Clinical psychologist, Chandigarh",
  description:
    "RCI-licensed Clinical Psychologist, Landmark Hospital, Chandigarh. Online and in-person therapy for teenagers, adults and couples.",
  // Set this to the final domain before launch (used for canonical and OG URLs).
  siteUrl: "https://stillwater-counselling.vercel.app",
};

// Interface labels (not appendix copy). Listed in the PRD for approval.
export const ui = {
  nav: [
    { label: "Support", href: "/#support" },
    { label: "Approaches", href: "/#approaches" },
    { label: "About", href: "/#about" },
    { label: "Policies", href: "/#policies" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
  bookSession: "Book a session",
  continueWhatsapp: "Continue to WhatsApp",
  messageWhatsapp: "Message on WhatsApp",
  writeEmail: "Write an email",
  learnMore: "Learn more",
  close: "Close",
  menu: "Menu",
  skip: "Skip to content",
  previous: "Previous",
  next: "Next",
  pageNotFound: "Page not found",
  home: "Home",
  backHome: "Back to home",
  opensNewTab: "(opens in a new tab)",
  copyright: "© 2026 Stillwater Counselling",
  composer: {
    name: "Your name *",
    phone: "Phone or WhatsApp (optional)",
    topic: "What is it about?",
    forWhom: "Session is for",
    mode: "Preferred mode",
    times: "Preferred days or times (optional)",
    timesPlaceholder: "e.g. weekday evenings",
    message: "Anything you would like to add (optional)",
    gmail: "Open in Gmail",
    otherApp: "Use another email app",
    sendsTo: "Sends to",
    copy: "Copy address",
    copied: "Copied",
    preview: "Preview",
    subject: "Subject",
    nameError: "Please add your name so the email can be signed.",
  },
  footerLinks: [
    { label: "Areas of support", href: "/#support" },
    { label: "Approaches", href: "/#approaches" },
    { label: "About", href: "/#about" },
    { label: "Session policies", href: "/#policies" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};
