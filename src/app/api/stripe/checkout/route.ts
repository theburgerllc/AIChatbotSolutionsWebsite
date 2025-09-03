import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe not configured');
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const planInput = String(body?.plan || '').toLowerCase();
    const discountCode = String(body?.discount_code || '').toUpperCase();

    const priceMap: Record<string, string | undefined> = {
      starter: process.env.STRIPE_PRICE_STARTER,
      growth: process.env.STRIPE_PRICE_GROWTH,
    };
    const priceId = priceMap[planInput];
    if (!priceId) {
      return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const stripe = getStripe();

    const discounts: { promotion_code: string }[] = [];
    if (discountCode === 'SAVE15') {
      const promo = planInput === 'starter' ? process.env.STRIPE_PROMO_STARTER : process.env.STRIPE_PROMO_GROWTH;
      if (promo) discounts.push({ promotion_code: promo });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing#cancelled`,
      allow_promotion_codes: true,
      ...(discounts.length ? { discounts } : {}),
      billing_address_collection: 'auto',
      customer_creation: 'if_required',
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

