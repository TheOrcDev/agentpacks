import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db, subscriptions, agentPacks } from "@/db";
import { eq } from "drizzle-orm";
import { Download, Calendar, LogOut, AlertCircle, Package } from "lucide-react";
import { SignOutButton } from "./sign-out-button";

async function getSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
}

async function getSubscription(email: string) {
  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))
    .limit(1);
  return subscription;
}

async function getPacks() {
  return db.select().from(agentPacks).orderBy(agentPacks.name);
}

export default async function PortalPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const [subscription, packs] = await Promise.all([
    getSubscription(session.user.email),
    getPacks(),
  ]);

  const isActive = subscription?.status === "active";

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Your Agent Packs</h1>
            <p className="text-zinc-400">{session.user.email}</p>
          </div>
          <SignOutButton />
        </div>

        {/* Subscription Status */}
        {!isActive && (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-500">No active subscription</p>
              <p className="text-sm text-yellow-500/80">
                Subscribe to download all agent packs.{" "}
                <Link href="/#pricing" className="underline hover:no-underline">
                  Subscribe now
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Packs Grid */}
        {packs.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
            <p className="text-zinc-400">No packs available yet</p>
            <p className="text-sm text-zinc-500">Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="text-4xl">{pack.icon || "📦"}</div>
                  <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                    v{pack.version}
                  </span>
                </div>

                <h3 className="mb-1 text-lg font-semibold">{pack.name}</h3>
                <p className="mb-4 text-sm text-zinc-400">{pack.description}</p>

                <div className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
                  <Calendar className="h-3 w-3" />
                  Updated {new Date(pack.updatedAt).toLocaleDateString()}
                </div>

                {isActive ? (
                  <a
                    href={`/api/download/${pack.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-zinc-800 py-2 text-sm font-semibold text-zinc-500"
                  >
                    <Download className="h-4 w-4" />
                    Subscribe to Download
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-zinc-500">
          <p>
            Need help?{" "}
            <a
              href="mailto:support@agentpacks.dev"
              className="text-purple-400 hover:text-purple-300"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
