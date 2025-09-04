import { prisma } from "@/lib/prisma";

export type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  stripeCustomerId?: string | null;
  subscriptionStatus?: string | null;
  subscriptionCurrentPeriodEnd?: number | null;
  subscriptionCancelAtPeriodEnd?: boolean | null;
};

export function findUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}

export function findUserByStripeCustomerId(customerId: string) {
  return prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
}

export async function setStripeCustomerId(userId: string, customerId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customerId },
  });
}

export async function updateSubscriptionForUser(
  userId: string,
  data: { status: string; currentPeriodEnd?: number; cancelAtPeriodEnd?: boolean }
): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: data.status,
      subscriptionCurrentPeriodEnd: data.currentPeriodEnd ?? null,
      subscriptionCancelAtPeriodEnd: data.cancelAtPeriodEnd ?? false,
    },
  });
}

