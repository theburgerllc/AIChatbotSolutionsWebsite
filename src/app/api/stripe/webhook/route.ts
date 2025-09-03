import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { findUserByStripeCustomerId, updateSubscriptionForUser } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const payload = await req.text();
  let event: unknown;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (e) {
    const msg = (e as { message?: string }).message || '';
    return NextResponse.json({ error: `Invalid signature: ${msg}` }, { status: 400 });
  }

  try {
    const evt = event as { type: string; data: { object: { customer?: string; status?: string; current_period_end?: number; cancel_at_period_end?: boolean } } };
    if (evt.type.startsWith('customer.subscription.')) {
      const sub = evt.data.object;
      const customerId = String(sub.customer);
      let user = await findUserByStripeCustomerId(customerId);
      if (!user) {
        // Fallback: fetch customer to match on email (optional in your flow)
        try {
          await stripe.customers.retrieve(customerId);
          // If you want to attach by email, add a query here to find user by email and persist stripeCustomerId.
          // Intentionally omitted to avoid unintended data linking.
        } catch { /* ignore */ }
      }
      if (user?.id) {
        await updateSubscriptionForUser(user.id, {
          status: String(sub.status || 'unknown'),
          currentPeriodEnd: sub.current_period_end ? Number(sub.current_period_end) : undefined,
          cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end ?? false),
        });
      }
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    const msg = (e as { message?: string }).message || 'Handler error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

