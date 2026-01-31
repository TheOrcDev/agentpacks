import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db, subscriptions, agentPacks } from "@/db";
import { eq } from "drizzle-orm";
import * as fs from "node:fs";
import * as path from "node:path";

export async function GET(
  request: NextRequest,
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
    return NextResponse.json({ error: "No active subscription" }, { status: 403 });
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
  const filePath = path.resolve(pack.filePath);
  if (!fs.existsSync(filePath)) {
    console.error(`Pack file not found: ${filePath}`);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const filename = `${pack.slug}-v${pack.version}.zip`;

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
