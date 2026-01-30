import { createAPIFileRoute } from "@tanstack/react-start/api";
import { auth } from "../../../lib/auth";
import { db, subscriptions, agentPacks } from "../../../db";
import { eq } from "drizzle-orm";
import * as fs from "node:fs";
import * as path from "node:path";

export const APIRoute = createAPIFileRoute("/api/download/$slug")({
  GET: async ({ request, params }) => {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.email) {
      return new Response("Unauthorized - please sign in", { status: 401 });
    }

    // Check subscription
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.email, session.user.email))
      .limit(1);

    if (!subscription || subscription.status !== "active") {
      return new Response("No active subscription", { status: 403 });
    }

    // Get pack
    const [pack] = await db
      .select()
      .from(agentPacks)
      .where(eq(agentPacks.slug, params.slug))
      .limit(1);

    if (!pack) {
      return new Response("Pack not found", { status: 404 });
    }

    // Read file
    const filePath = path.resolve(pack.filePath);
    if (!fs.existsSync(filePath)) {
      console.error(`Pack file not found: ${filePath}`);
      return new Response("Pack file not found on server", { status: 404 });
    }

    const file = fs.readFileSync(filePath);
    const filename = `${pack.slug}-v${pack.version}.zip`;

    return new Response(file, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  },
});
