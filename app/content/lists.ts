// Approaches, FAQs and session policies (appendix). Changes are marked.

const PHONE_DISPLAY = "+91 94638 80582";

export const approachesSection = {
  heading: { before: "Therapeutic ", em: "approaches" },
};

export const approaches = [
  {
    id: "cbt",
    name: "Cognitive Behavioural Therapy",
    short: "CBT",
    text: "Notice unhelpful thought patterns and practise new ways of responding.",
  },
  {
    id: "dbt",
    name: "Dialectical Behaviour Therapy",
    short: "DBT",
    text: "Skills for handling intense emotions, distress and relationships.",
  },
  {
    id: "cpt",
    name: "Cognitive Processing Therapy",
    short: "CPT",
    text: "A structured way to work through the effects of trauma.",
  },
  {
    id: "attachment",
    name: "Attachment-based therapies",
    short: "Attachment",
    text: "Understand how early relationships shape the way you connect now.",
  },
  {
    id: "ifs",
    name: "Internal Family Systems",
    short: "IFS",
    text: "Get to know the different parts of yourself with curiosity, not judgement.",
  },
  {
    id: "couples",
    name: "Couples therapy",
    short: "Couples",
    text: "Space for partners to listen, understand and work through difficulties together.",
  },
] as const;

export const faqSection = {
  heading: { before: "Frequently asked ", em: "questions" },
};

export const faqs = [
  {
    q: "Are sessions online or in person?",
    a: "Both. In-person sessions are at Landmark Hospital, Sector 33, Chandigarh. Online sessions are by video on Google Meet, Zoom or WhatsApp; please join from a quiet, private place with a secure connection.",
  },
  {
    q: "How long is a session, and how often will we meet?",
    a: "Sessions are 50 minutes, usually once a week, though a few may be longer or more frequent. The session time is fixed, so it cannot run over if you join late. There is no set timeline: everyone heals at their own pace.",
  },
  {
    q: "How do payments work?",
    a: `For anything related to payments, please send a WhatsApp message to ${PHONE_DISPLAY}, between 9 am and 7 pm.`,
  },
  {
    q: "What if I need to cancel or reschedule?",
    // Change 4: no "My bookings" on this site.
    a: `Please cancel or reschedule at least 24 hours ahead by sending a WhatsApp message to ${PHONE_DISPLAY}. For anything related to payments, please send a WhatsApp message.`,
  },
  {
    q: "What happens in the first session?",
    a: "We start by understanding your background and the concerns that led you to seek help. Over the first 2–3 sessions we both decide whether to continue, and agree on the goals and the process together.",
  },
  {
    q: "Is what I share kept confidential?",
    a: "Yes. What you share is kept strictly confidential and is only shared with your written permission. The exceptions are a serious risk of harm to you or someone else, a court order, or situations the law requires to be reported. Even then, it will be discussed with you first wherever possible. Sessions are never recorded without your permission.",
  },
  {
    q: "Do you work with teenagers?",
    a: "Yes, adolescent counselling is one of the main areas of work. For clients under 18, parents are kept informed only to the extent that helps the family understand and resolve things, and this is always discussed with the young person first.",
  },
  {
    q: "What approaches do you use?",
    a: "Therapy is trauma-informed and draws on approaches including Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Cognitive Processing Therapy (CPT), attachment-based therapies, Internal Family Systems and couples therapy, chosen to suit you.",
  },
  {
    q: "Can I get in touch between sessions?",
    a: "Yes, by WhatsApp text or voice message between 9 am and 7 pm. Replies may not be immediate during sessions, but will come as soon as possible.",
  },
  {
    q: "What if I need help urgently?",
    a: "This service is not for emergencies. In a crisis, please contact your psychiatrist, go to a hospital with a psychiatric emergency service, or call the Tele-MANAS helpline on 14416 or 1-800-891-4416.",
  },
];

export const policiesSection = {
  heading: { before: "Session ", em: "policies" },
};

export const policies = [
  {
    title: "Appointments and payments",
    points: [
      `For anything related to payments, please send a WhatsApp message to ${PHONE_DISPLAY} (9 am to 7 pm).`,
      "Sessions are 50 minutes, usually once a week. The time is fixed and cannot be extended if you join late, as the next appointment has to be honoured.",
    ],
  },
  {
    title: "Cancelling or rescheduling",
    points: [
      "Please cancel or reschedule at least 24 hours before your appointment.",
      // Change 3: no "My bookings" on this site.
      `To cancel or reschedule, please send a WhatsApp message to ${PHONE_DISPLAY}.`,
    ],
  },
  {
    title: "Online sessions",
    points: [
      "Online sessions take place by video on Google Meet, Zoom or WhatsApp.",
      "Please join from a quiet, private place with a secure connection.",
      "Online sessions have some limits compared with meeting in person, and are not suitable in a crisis. If needed, you may be advised to seek in-person or emergency care.",
      "Despite every precaution, no technology is completely secure.",
    ],
  },
  {
    title: "Confidentiality",
    points: [
      "Everything we discuss is strictly confidential and is only shared with your written permission.",
      "The exceptions are: a high risk of harm to yourself, a plan to harm someone else, a court order for your case history, situations the law requires to be reported, or when you ask for information to be shared.",
      "In those situations your next of kin or another professional may need to be involved. This will be discussed with you first.",
      "Your case may be discussed with a supervisor or peer group with all identifying details removed. Some practice staff may see your information for administrative purposes.",
      "For clients under 18, parents are kept informed only to the extent that helps the family, and this is discussed with you first.",
    ],
  },
  {
    title: "Recordings",
    points: ["Sessions are never audio or video recorded without your permission, by either of us."],
  },
  {
    title: "Contact between sessions",
    points: [
      `You can send a WhatsApp text or voice message to ${PHONE_DISPLAY} between 9 am and 7 pm. Replies will come as soon as possible.`,
      "If either of us will be away, we will let the other know at least a week in advance.",
    ],
  },
  {
    title: "Our working relationship",
    points: [
      "The therapeutic relationship is strictly professional. Gifts, bartering or trading services are not appropriate.",
    ],
  },
  {
    title: "In an emergency",
    emergency: true,
    points: [
      "This service is not for emergencies. Please contact your psychiatrist, a hospital with a psychiatric emergency service, or Tele-MANAS on 14416 or 1-800-891-4416.",
    ],
  },
];
