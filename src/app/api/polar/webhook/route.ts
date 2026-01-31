import { Webhooks } from "@polar-sh/nextjs";
import { eq } from "drizzle-orm";
import { db, subscriptions } from "@/db";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    console.log("Polar webhook:", payload.type);

    if (
      payload.type === "subscription.created" ||
      payload.type === "subscription.updated"
    ) {
      const sub = payload.data;
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

      if (existing.length > 0) {
        await db
          .update(subscriptions)
          .set({
            status: sub.status === "active" ? "active" : sub.status,
            currentPeriodEnd: sub.currentPeriodEnd
              ? new Date(sub.currentPeriodEnd)
              : null,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.polarSubscriptionId, sub.id));
      } else {
        await db.insert(subscriptions).values({
          email,
          polarCustomerId: sub.customerId,
          polarSubscriptionId: sub.id,
          status: sub.status === "active" ? "active" : sub.status,
          currentPeriodEnd: sub.currentPeriodEnd
            ? new Date(sub.currentPeriodEnd)
            : null,
        });
      }
    }

    if (
      payload.type === "subscription.canceled" ||
      payload.type === "subscription.revoked"
    ) {
      const sub = payload.data;
      await db
        .update(subscriptions)
        .set({
          status: "cancelled",
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.polarSubscriptionId, sub.id));
    }
  },
});
