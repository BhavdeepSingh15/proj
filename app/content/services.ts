// Areas of support + their "Learn more" details (appendix, unchanged).
import type { ImageName } from "./images";

export type Service = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  image: ImageName;
  imageAlt: string;
  intro: string;
  helpsWith: string[];
  inSessions: string[];
  howLong: string;
  goodToKnow: string;
  readMore: { label: string; url: string }[];
};

export const supportSection = {
  heading: { before: "Areas of ", em: "support" },
  lead: "All sessions are 50 minutes and available online (Google Meet, Zoom or WhatsApp) or in person at Landmark Hospital, Sector 33, Chandigarh.",
  labels: {
    helpsWith: "It can help with",
    inSessions: "What sessions involve",
    howLong: "How long",
    goodToKnow: "Good to know",
    readMore: "Further reading",
  },
};

export const services: Service[] = [
  {
    slug: "individual-therapy",
    name: "Individual therapy",
    kicker: "For adults",
    description: "One-to-one psychotherapy for adults, drawing on CBT, DBT, CPT and other approaches to suit you.",
    image: "svc-stone",
    imageAlt: "",
    intro:
      "Individual therapy is a one-to-one conversation with a trained psychologist, in a private and confidential space. Depending on what you would like help with, sessions may be an open conversation, specific exercises, or a mix of both.",
    helpsWith: [
      "Stress, worry and feeling overwhelmed",
      "Low mood and loss of motivation",
      "Relationships with family, partners or friends",
      "Difficult experiences, including from childhood",
      "Unhelpful thoughts, feelings or habits",
      "Big life changes and decisions",
    ],
    inSessions: [
      "The first session is about understanding your background, what brings you here and what you hope will change.",
      "Together you agree on goals and an approach, such as CBT, DBT or a more open, exploratory way of working.",
      "You never have to talk about anything you are not ready for. You set the pace.",
      "Some approaches include small exercises or notes to try between sessions.",
    ],
    howLong:
      "Sessions are 50 minutes, usually once a week. Some approaches use a set number of sessions; others are open-ended and reviewed together as you go.",
    goodToKnow:
      "It is common to feel relieved, tired or stirred up after a session. Planning something gentle for afterwards can help, and you can always mention how you felt at the next session.",
    readMore: [
      {
        label: "Mind: what happens in talking therapy",
        url: "https://mind.org.uk/information-support/drugs-and-treatments/talking-therapy-and-counselling/what-happens-in-therapy/",
      },
    ],
  },
  {
    slug: "adolescent-counselling",
    name: "Adolescent counselling",
    kicker: "For teenagers",
    description: "Support for teenagers going through emotional, behavioural or school-related difficulties.",
    image: "svc-leaves",
    imageAlt: "",
    intro:
      "Adolescence brings a lot of change, and it can be hard to tell everyday ups and downs from something that needs support. Counselling gives a teenager a safe space of their own to talk with a professional who understands this stage of life.",
    helpsWith: [
      "Struggles that start affecting school, friendships or home life",
      "Pulling away from friends, family or activities",
      "Big changes in sleep, mood or energy",
      "Anger, worry or sadness that will not settle",
      "Exam pressure, bullying or social difficulties",
      "Family changes and conflict at home",
    ],
    inSessions: [
      "Early sessions focus on getting to know the young person and what is happening for them.",
      "Teenagers take an active part, helping decide what to talk about and what they want to change.",
      "Parents may be invited to a separate or joint conversation to understand the wider family picture.",
      "The first session can feel a little awkward; most young people open up as trust builds.",
    ],
    howLong: "Counselling for teenagers often lasts a few months, with progress reviewed together along the way.",
    goodToKnow:
      "What a teenager shares is kept confidential. Parents are kept informed only to the extent that helps the family, and this is always discussed with the young person first. If you are booking for someone under 18, please send a WhatsApp message first.",
    readMore: [
      {
        label: "Psychology Today: finding a therapist for your teenager",
        url: "https://www.psychologytoday.com/us/basics/therapy/how-to-find-a-therapist-for-your-teenager",
      },
    ],
  },
  {
    slug: "couples-therapy",
    name: "Couples therapy",
    kicker: "For partners",
    description: "Sessions for partners who want to understand each other better and work through difficulties together.",
    image: "svc-ripples",
    imageAlt: "",
    intro:
      "Couples therapy helps partners understand each other, work through conflict and strengthen their relationship. It is for couples at any stage, married or not, and it can also help partners decide on the way forward together.",
    helpsWith: [
      "Communication that keeps breaking down",
      "Frequent arguments or the same fight on repeat",
      "Trust, betrayal or infidelity",
      "Differences over parenting or blended families",
      "Intimacy and emotional distance",
      "Anger or stress spilling into the relationship",
    ],
    inSessions: [
      "Usually both partners attend together; one partner can begin alone if needed.",
      "The therapist helps identify what is really going on, without taking sides or placing blame.",
      "You practise listening, speaking openly and solving problems calmly, with support when emotions run high.",
      "Small exercises to try at home help new habits stick between sessions.",
    ],
    howLong:
      "Couples therapy is often short term, from a few sessions to several months, depending on what you are working through.",
    goodToKnow:
      "Couples therapy is not the right setting if anyone feels unsafe at home. In that situation, please contact the police or a crisis helpline first.",
    readMore: [
      // Open question in the PRD: the label says Mayo Clinic but the URL is mymlc.com.
      {
        label: "Mayo Clinic: marriage and couples counselling",
        url: "https://www.mymlc.com/health-information/tests-and-procedures/m/marriage-counseling2",
      },
    ],
  },
  {
    slug: "trauma-therapy",
    name: "Trauma therapy",
    kicker: "Trauma-informed care",
    description:
      "A careful, trauma-informed approach to working through painful or frightening experiences and their effects.",
    image: "svc-hills",
    imageAlt: "",
    intro:
      "Trauma therapy helps when a frightening or painful experience keeps affecting daily life long after it happened. A trauma-informed approach means going at a pace that feels safe, with your sense of choice and control respected throughout.",
    helpsWith: [
      "Memories or flashbacks that intrude unexpectedly",
      "Avoiding people, places or reminders",
      "Feeling on edge, jumpy or unable to sleep",
      "Guilt, shame or blaming yourself",
      "Difficulty feeling safe or trusting others",
      "Feeling numb or disconnected",
    ],
    inSessions: [
      "You learn how trauma can affect thoughts, feelings and the body, so reactions start to make sense.",
      "Grounding and coping skills come first, so you feel steadier before going further.",
      "Approaches such as Cognitive Processing Therapy help you notice and gently question beliefs the trauma left behind, such as self-blame.",
      "Practice between sessions helps you rebuild a sense of safety, trust and control.",
    ],
    howLong:
      "Structured approaches such as Cognitive Processing Therapy usually take around 12 sessions. Other work is paced to what feels manageable for you.",
    goodToKnow:
      "Trauma-focused therapies, including trauma-focused CBT and Cognitive Processing Therapy, are among the recommended treatments for post-traumatic stress.",
    readMore: [
      {
        label: "APA: Cognitive Processing Therapy",
        url: "https://www.apa.org/ptsd-guideline/treatments/cognitive-processing-therapy.html",
      },
      {
        label: "NHS: treatment for PTSD",
        url: "https://www.nhs.uk/conditions/post-traumatic-stress-disorder-ptsd/treatment/",
      },
    ],
  },
  {
    slug: "depression",
    name: "Depression",
    kicker: "For low mood",
    description: "Help with persistent low mood, loss of interest and the heaviness that can make everyday life hard.",
    image: "svc-dawn",
    imageAlt: "",
    intro:
      "Depression is more than feeling low for a few days. Talking therapy is one of the main treatments: it helps you understand what keeps low mood going and take small, steady steps to change it.",
    helpsWith: [
      "Low mood or sadness that lasts for weeks",
      "Losing interest in things you used to enjoy",
      "Withdrawing from people and activities",
      "Feeling tired, flat or hopeless",
      "Harsh, negative thoughts about yourself",
      "Grief or relationship difficulties linked to low mood",
    ],
    inSessions: [
      "Cognitive Behavioural Therapy looks at how you think, feel and act now, and works on breaking negative cycles.",
      "Behavioural activation reconnects you with activities that matter, gradually and at a pace that works.",
      "Some sessions may focus on relationships, loss or communication when these are part of the picture.",
      "Small, manageable steps between sessions help build momentum.",
    ],
    howLong: "Structured therapy for depression often runs for around 8 to 16 sessions, reviewed together as you go.",
    goodToKnow:
      "If depression feels severe, or you have thoughts of harming yourself, please also speak to a doctor or psychiatrist, or call Tele-MANAS on 14416.",
    readMore: [
      {
        label: "NHS: treatment for depression",
        url: "https://www.nhs.uk/mental-health/conditions/depression-in-adults/treatment/",
      },
    ],
  },
  {
    slug: "anger-management",
    name: "Anger management",
    kicker: "Practical skills",
    description: "Understand what sets anger off and learn practical ways to stay in control of how you respond.",
    image: "svc-rain",
    imageAlt: "",
    intro:
      "Anger is a normal emotion, but it becomes a problem when it feels out of control, leads to things you regret or hurts the people around you. Anger management helps you understand what sets it off and choose how to respond.",
    helpsWith: [
      "Frequent outbursts or constant irritability",
      "Arguments at home or at work",
      "Saying or doing things you later regret",
      "Stress that builds until it boils over",
      "Anger affecting relationships or children",
      "Bottled-up resentment and grudges",
    ],
    inSessions: [
      "You identify your triggers and the early warning signs in your body and thoughts.",
      "You practise pausing before reacting, and calming techniques such as slow breathing.",
      'You learn to express needs clearly and respectfully, using "I" statements instead of blame.',
      "You work on problem-solving, letting go of grudges and handling stress before it builds.",
    ],
    howLong: "Usually a focused set of sessions, with practical skills to use in everyday life.",
    goodToKnow:
      "Everyday habits help too: regular exercise, short breaks during stressful days, and giving yourself time to calm down before discussing a problem.",
    readMore: [
      {
        label: "Mayo Clinic: anger management tips",
        url: "https://mayoclinic.org/healthy-lifestyle/adult-health/in-depth/anger-management/art-20045434",
      },
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);
export const getService = (slug: string | undefined) => services.find((s) => s.slug === slug);
