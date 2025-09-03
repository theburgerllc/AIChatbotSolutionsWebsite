export const VARIANT_A_HEADLINE = "AI Video Sales Rep that Meets Every Visitor";
export const VARIANT_B_HEADLINE = "Convert More Buyers with a Human-like AI that Answers, Qualifies, and Books Meetings";

export const CTA_PRIMARY = "Watch the AI talk now";
export const CTA_SECONDARY = "Book a strategy call";
export const BENEFITS_BULLETS = [
  "Answers objections in real time",
  "Qualifies leads and routes automatically",
  "Books meetings while your team sleeps"
];

export const VERTICALS = {
  legal: {
    title: "Legal",
    description: "Qualify prospects, answer intake questions, and book consultations.",
    faqs: [
      { q: "Is the AI secure for client data?", a: "Yes. Data is encrypted in transit and at rest. Configure retention per compliance." },
      { q: "Does it integrate with calendars?", a: "Yes. Use Calendly or your own calendar with API routing." }
    ],
    metrics: { uplift: "+18% lead-to-meeting", csat: "4.7/5" }
  },
  ecommerce: {
    title: "Ecommerce",
    description: "Guide shoppers, resolve objections, and recover carts.",
    faqs: [
      { q: "Will it increase AOV?", a: "Typically yes—personalized guidance increases bundle and add-on rates." },
      { q: "How is it embedded?", a: "Drop-in snippet with CSS variables to match your brand." }
    ],
    metrics: { uplift: "+12% conversion", aov: "+9% AOV" }
  },
  healthcare: {
    title: "Healthcare",
    description: "Triage questions, share directions, and schedule appointments.",
    faqs: [
      { q: "HIPAA ready?", a: "Consult your compliance lead. We support data minimization and configurable retention." },
      { q: "What about accessibility?", a: "Keyboard-friendly, captions preferred, and respects reduced motion." }
    ],
    metrics: { uplift: "+22% scheduling", csat: "4.8/5" }
  }
} as const;

export const ROI_DEFAULTS = {
  leadsPerMonth: 1000,
  baselineConv: 0.02,
  improvedConv: 0.03,
  avgOrderValue: 120,
  monthlyCost: 699
} as const;

export const STAGE_COPY = {
  discover: {
    headline: "Meet your 24/7 AI rep",
    sub: "Greets every visitor, answers questions, and moves qualified leads forward."
  },
  validate: {
    headline: "Proof that compounds",
    sub: "Show uplift, watch sessions, and export transcripts for QA."
  }
} as const;

export const ANALYTICS_LABELS = {
  demo_start: "demo_start",
  cvi_message_in: "cvi_message_in",
  cvi_message_out: "cvi_message_out",
  lead_qualified: "lead_qualified",
  proof_viewed: "proof_viewed",
  pricing_viewed: "pricing_viewed",
  checkout_start: "checkout_start",
  purchase_success: "purchase_success",
  thank_you_view: "thank_you_view",
  sticky_cta_show: "sticky_cta_show",
  sticky_cta_demo: "sticky_cta_demo",
  sticky_cta_book: "sticky_cta_book",
  scheduler_open: "scheduler_open"
} as const;

export const ROUTE_VARIANT_B_OVERRIDES = {
  "/": {
    headline: VARIANT_B_HEADLINE
  }
} as const;

export const CTA_VARIANTS = {
  A: { primary: CTA_PRIMARY, secondary: CTA_SECONDARY },
  B: { primary: CTA_PRIMARY, secondary: CTA_SECONDARY }
} as const;

