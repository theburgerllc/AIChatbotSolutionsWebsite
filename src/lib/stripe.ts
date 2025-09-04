import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Do not throw at import time during build; handlers will validate at runtime
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

