// Strings that are NOT verbatim appendix text, each with its reason.
// The provenance test (tests/provenance.test.ts) allows exactly these.
// Interface labels live in `ui` (site.ts) and are approved as a set.

export const approvedChanges: { text: string; reason: string }[] = [
  {
    text: "Trauma-informed psychotherapy and counselling for low mood, anger, relationship difficulties, painful experiences and the weight of everyday life. Send a WhatsApp message to choose a time that suits you.",
    reason: "Change 1: no online booking on this site",
  },
  {
    text: "Book a time that suits you on WhatsApp. Online sessions need a quiet, private space.",
    reason: "Change 2: bookings happen on WhatsApp",
  },
  {
    text: "To cancel or reschedule, please send a WhatsApp message to +91 94638 80582.",
    reason: "Change 3: no My bookings page",
  },
  {
    text: "Please cancel or reschedule at least 24 hours ahead by sending a WhatsApp message to +91 94638 80582. For anything related to payments, please send a WhatsApp message.",
    reason: "Change 4: no My bookings page",
  },
  { text: "Bookings are made on WhatsApp", reason: "Change 6: booking notice (owner's instruction, 26 Oct 2026)" },
  {
    text: "All bookings, changes and cancellations are handled on WhatsApp.",
    reason: "Change 6: booking notice (owner's instruction, 26 Oct 2026)",
  },
  { text: "Empanelled with", reason: "Change 7: Indian Army empanelment (owner's instruction, 27 Oct 2026)" },
  { text: "The Indian Army", reason: "Change 7: Indian Army empanelment (owner's instruction, 27 Oct 2026)" },
  { text: "Privacy", reason: "Page title" },
  { text: "This website does not use cookies, sign-in, analytics or tracking.", reason: "Change 5: privacy rewrite" },
  {
    text: "The “Write an email” form works only inside your browser. It opens Gmail or your email app with a message you can read and change before sending. Nothing is sent from this website or saved.",
    reason: "Change 5: privacy rewrite",
  },
  {
    text: "This website saves one small setting in your own browser: whether the opening animation has already played. It never leaves your device.",
    reason: "Change 5: privacy rewrite",
  },
  {
    text: "When you tap WhatsApp, Instagram, LinkedIn or Google, you leave this website and that service’s own privacy policy applies. Like any website, the hosting provider processes technical data such as your IP address to deliver pages securely.",
    reason: "Change 5: privacy rewrite",
  },
  {
    text: "If you have a question about privacy, please send a WhatsApp message using the details on the Contact page.",
    reason: "Change 5: privacy rewrite (adapted from the account-deletion line)",
  },
  { text: "Stillwater Counselling | Clinical psychologist, Chandigarh", reason: "SEO title: practice name + tagline" },
  {
    text: "RCI-licensed Clinical Psychologist, Landmark Hospital, Chandigarh. Online and in-person therapy for teenagers, adults and couples.",
    reason: "SEO description: hero kicker + specialties line",
  },
  { text: "Portrait of Anoop Inder Kaur", reason: "Alt text for the portrait (About only)" },
  // Composer template sentences, copied from the booking site's EmailComposer.
  { text: "booking a first session", reason: "Composer phrase (booking site)" },
  { text: "a question I have before booking a session", reason: "Composer phrase (booking site)" },
  { text: "my existing appointment", reason: "Composer phrase (booking site)" },
  { text: "a payment-related query", reason: "Composer phrase (booking site)" },
  { text: "a general enquiry", reason: "Composer phrase (booking site)" },
  { text: "I hope this message finds you well.", reason: "Composer template (booking site)" },
  { text: "A few details that may help:", reason: "Composer template (booking site)" },
  { text: "Preferred days or times", reason: "Composer template (booking site)" },
  { text: "Phone / WhatsApp", reason: "Composer template (booking site)" },
  {
    text: "I would be grateful if you could let me know the next steps at your convenience.",
    reason: "Composer template (booking site)",
  },
  { text: "Thank you for your time.", reason: "Composer template (booking site)" },
  { text: "Kind regards,", reason: "Composer template (booking site)" },
  { text: "(your name)", reason: "Composer template (booking site)" },
];
