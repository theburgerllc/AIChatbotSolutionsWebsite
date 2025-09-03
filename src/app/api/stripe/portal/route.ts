import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSessionUser } from '@/lib/auth';
import { findUserById, setStripeCustomerId } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const ret = process.env.STRIPE_PORTAL_RETURN_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });

  const su = await getSessionUser();
  if (!su) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    let cid = undefined as string | undefined;
    // Try to read from DB first
    const user = await findUserById(su.id);
    cid = (user && (user as { stripeCustomerId?: string | null }).stripeCustomerId) || undefined;

    if (!cid) {
      // Create a Stripe customer for this user and persist
      const cust = await stripe.customers.create({ email: (user as { email?: string | null } | null | undefined)?.email ?? su.email ?? undefined, metadata: { userId: su.id } });
      cid = cust.id;
      await setStripeCustomerId(su.id, cid);
    }

    const session = await stripe.billingPortal.sessions.create({ customer: cid!, return_url: ret });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}

