import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

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
          <h1 className="mb-2 font-bold text-2xl">Check your email</h1>
          <p className="mb-6 text-zinc-400">
            We sent a magic link to <span className="text-white">{email}</span>
          </p>
          <p className="text-sm text-zinc-500">
            Click the link in the email to sign in. The link expires in 10
            minutes.
          </p>
          <button
            className="mt-6 text-purple-400 text-sm hover:text-purple-300"
            onClick={() => setSent(false)}
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
          className="mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
          onClick={() => navigate({ to: "/" })}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Mail className="h-6 w-6 text-purple-400" />
            </div>
            <h1 className="font-bold text-2xl">Sign in to AgentPacks</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Enter your email to receive a magic link
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block font-medium text-sm" htmlFor="email">
                Email address
              </label>
              <input
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading || !email}
              type="submit"
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
            <a
              className="text-purple-400 hover:text-purple-300"
              href="/#pricing"
            >
              Subscribe here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
