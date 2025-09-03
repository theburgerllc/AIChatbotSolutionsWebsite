import PlansTable from '@/components/pricing/PlansTable';
import SocialProof from '@/components/SocialProof';

export const metadata = { title: 'Pricing — AI Chatbot Solutions' };

export default function PricingPage() {
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold">Pricing</h1>
      <p className="mt-2 text-white/70">Choose a plan that fits. Upgrade or cancel anytime.</p>

      <PlansTable />
      <SocialProof />
    </main>
  );
}

