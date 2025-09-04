export default function SocialProof() {
  return (
    <section className="mt-12" aria-label="Trusted by">
      <div className="text-white/60 text-sm">Trusted by fast-growing teams</div>
      <div className="mt-3 grid grid-cols-3 gap-4 items-center">
        <img src="/logos/brand.svg" alt="AI Chatbot Solutions logo" className="h-10 opacity-80" />
        <img src="/logos/tavus.svg" alt="Tavus logo" className="h-8 opacity-80" />
        <img src="/logos/stripe.svg" alt="Stripe logo" className="h-8 opacity-80" />
      </div>
      <blockquote className="mt-6 text-white/80 text-sm border-l-2 border-white/20 pl-3">“We saw a double-digit lift in qualified meetings within two weeks.”</blockquote>
    </section>
  );
}

