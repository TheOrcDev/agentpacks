import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authClient.signIn.magicLink({
        email,
        callbackURL: "/portal",
      });
      setSent(true);
    } catch (err) {
      setError("Failed to send magic link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Check your email</h1>
          <p className="mb-6 text-zinc-400">
            We sent a magic link to <span className="text-white">{email}</span>
          </p>
          <p className="text-sm text-zinc-500">
            Click the link in the email to sign in. The link expires in 10 minutes.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-6 text-sm text-purple-400 hover:text-purple-300"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate({ to: "/" })}
          className="mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Mail className="h-6 w-6 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold">Sign in to AgentPacks</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Enter your email to receive a magic link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Magic Link"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Only subscribers can access the portal.{" "}
            <a href="/#pricing" className="text-purple-400 hover:text-purple-300">
              Subscribe here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
