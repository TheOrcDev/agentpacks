import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { agentPacks, subscriptions } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Check authentication
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check subscription
  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, session.user.email))
    .limit(1);

  if (!subscription || subscription.status !== "active") {
    return NextResponse.json(
      { error: "No active subscription" },
      { status: 403 }
    );
  }

  // Get pack
  const [pack] = await db
    .select()
    .from(agentPacks)
    .where(eq(agentPacks.slug, slug))
    .limit(1);

  if (!pack) {
    return NextResponse.json({ error: "Pack not found" }, { status: 404 });
  }

  // Read file
  const filePath = resolve(pack.filePath);
  if (!existsSync(filePath)) {
    console.error(`Pack file not found: ${filePath}`);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const file = readFileSync(filePath);
  const filename = `${pack.slug}-v${pack.version}.zip`;

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
