import crypto from "node:crypto";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { eq } from "drizzle-orm";
import { db, subscriptions } from "../../../db";

// Verify Polar webhook signature
function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export const APIRoute = createAPIFileRoute("/api/webhooks/polar")({
  POST: async ({ request }) => {
    const secret = process.env.POLAR_WEBHOOK_SECRET;
    if (!secret) {
      console.error("POLAR_WEBHOOK_SECRET not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    // Get raw body and signature
    const payload = await request.text();
    const signature = request.headers.get("polar-signature") || "";

    // Verify signature (optional but recommended)
    // if (!verifySignature(payload, signature, secret)) {
    //   return new Response("Invalid signature", { status: 401 });
    // }

    const event = JSON.parse(payload);
    console.log("Polar webhook event:", event.type);

    try {
      switch (event.type) {
        case "subscription.created":
        case "subscription.updated": {
          const sub = event.data;
          const email = sub.customer?.email || sub.user?.email;

          if (!email) {
            console.error("No email in subscription event");
            return new Response("No email found", { status: 400 });
          }

          // Upsert subscription
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
                currentPeriodEnd: sub.current_period_end
                  ? new Date(sub.current_period_end)
                  : null,
                updatedAt: new Date(),
              })
              .where(eq(subscriptions.polarSubscriptionId, sub.id));
          } else {
            await db.insert(subscriptions).values({
              email,
              polarCustomerId: sub.customer?.id || sub.user?.id,
              polarSubscriptionId: sub.id,
              status: sub.status === "active" ? "active" : sub.status,
              currentPeriodEnd: sub.current_period_end
                ? new Date(sub.current_period_end)
                : null,
            });
          }
          break;
        }

        case "subscription.canceled":
        case "subscription.revoked": {
          const sub = event.data;
          await db
            .update(subscriptions)
            .set({
              status: "cancelled",
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.polarSubscriptionId, sub.id));
          break;
        }

        default:
          console.log("Unhandled webhook event:", event.type);
      }

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response("Internal error", { status: 500 });
    }
  },
});
