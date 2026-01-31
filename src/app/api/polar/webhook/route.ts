import { Webhooks } from "@polar-sh/nextjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";

const webhookSecret = process.env.POLAR_WEBHOOK_SECRET ?? "";

async function handleSubscriptionChange(sub: {
  id: string;
  customerId?: string;
  customer?: { email?: string };
  status: string;
  currentPeriodEnd?: string;
}) {
  const email = sub.customer?.email;
  if (!email) {
    console.error("No email in subscription event");
    return;
  }

  const existing = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.polarSubscriptionId, sub.id))
    .limit(1);

  const status = sub.status === "active" ? "active" : sub.status;
  const periodEnd = sub.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd)
    : null;

  if (existing.length > 0) {
    await db
      .update(subscriptions)
      .set({ status, currentPeriodEnd: periodEnd, updatedAt: new Date() })
      .where(eq(subscriptions.polarSubscriptionId, sub.id));
  } else {
    await db.insert(subscriptions).values({
      email,
      polarCustomerId: sub.customerId,
      polarSubscriptionId: sub.id,
      status,
      currentPeriodEnd: periodEnd,
    });
  }
}

async function handleSubscriptionCancelled(subId: string) {
  await db
    .update(subscriptions)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(subscriptions.polarSubscriptionId, subId));
}

export const POST = Webhooks({
  webhookSecret,
  onPayload: async (payload) => {
    console.log("Polar webhook:", payload.type);

    if (
      payload.type === "subscription.created" ||
      payload.type === "subscription.updated"
    ) {
      await handleSubscriptionChange(payload.data);
    }

    if (
      payload.type === "subscription.canceled" ||
      payload.type === "subscription.revoked"
    ) {
      await handleSubscriptionCancelled(payload.data.id);
    }
  },
});
