import {
  ArrowRight,
  Check,
  Code,
  Download,
  Rocket,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ColorBends from "@/components/color-bends";

const PACKS = [
  {
    name: "Content Creator Pack",
    icon: "🎬",
    description: "AI agents for content creators",
    agents: [
      { name: "Mia", role: "Content Strategist", emoji: "🎯" },
      { name: "Blake", role: "Script Writer", emoji: "✍️" },
      { name: "Jordan", role: "Social Manager", emoji: "📱" },
    ],
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Dev Team Pack",
    icon: "💻",
    description: "AI agents for developers and engineering teams",
    agents: [
      { name: "Marcus", role: "Tech Lead", emoji: "🏗️" },
      { name: "Elena", role: "Code Reviewer", emoji: "🔍" },
      { name: "Sam", role: "Documentation", emoji: "📚" },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Solopreneur Pack",
    icon: "🚀",
    description: "AI agents for indie hackers and entrepreneurs",
    agents: [
      { name: "Claire", role: "Executive Assistant", emoji: "📋" },
      { name: "Leo", role: "Research Analyst", emoji: "🔬" },
      { name: "Harper", role: "Outreach Specialist", emoji: "📧" },
    ],
    color: "from-purple-500 to-violet-500",
  },
];

const FEATURES = [
  "All 3 packs included",
  "9 specialized AI agents",
  "SOUL.md configurations",
  "Ready-to-use setup",
  "Monthly updates",
  "New packs as released",
];

// Hardcoded product ID for AgentPacks subscription
const AGENTPACKS_PRODUCT_ID = process.env.POLAR_PRODUCT_ID;

export default function Home() {
  const checkoutUrl = `/api/checkout?products=${AGENTPACKS_PRODUCT_ID}`;

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-zinc-800/50 border-b bg-zinc-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link className="flex items-center gap-3" href="/">
            <Image
              alt="AgentPacks"
              className="dark:invert"
              height={32}
              src="/agent-packs-logo.png"
              width={32}
            />
            <span className="font-bold text-xl">
              Agent<span className="text-purple-400">Packs</span>
            </span>
          </Link>
          <Link
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 font-medium text-sm text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
            href="/login"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden px-4 pt-32 pb-20 sm:pt-40 sm:pb-32">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          {/* Color Bends (ReactBits) */}
          <div className="absolute inset-0 opacity-70">
            <ColorBends
              autoRotate={0}
              colors={["#a855f7", "#ec4899", "#22d3ee"]}
              frequency={1}
              mouseInfluence={1}
              noise={0.08}
              parallax={0.5}
              rotation={0}
              scale={1}
              speed={0.2}
              transparent
              warpStrength={1}
            />
          </div>
          {/* Darken for readability */}
          <div className="absolute inset-0" />
          {/* Extra top glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/25 via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-purple-300 text-sm">
            <Sparkles className="h-4 w-4" />
            Premium Clawdbot Configurations
          </div>

          <h1 className="mb-6 font-bold text-5xl tracking-tight sm:text-7xl">
            Pre-built AI Agent Teams
            <br />
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Deploy
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-zinc-400">
            Stop configuring. Start building. Get professionally crafted agent
            configurations for Clawdbot — install in minutes, customize to your
            needs.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-lg text-white transition-all hover:opacity-90"
              href={checkoutUrl}
            >
              Get All Packs — $19/mo
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-8 py-4 font-semibold text-lg text-white transition-all hover:bg-zinc-800"
              download
              href="/packs/free-sample.zip"
            >
              <Download className="h-5 w-5" />
              Free Sample
            </a>
          </div>
        </div>
      </section>

      {/* Packs */}
      <section className="px-4 py-20" id="packs">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Choose Your Team
            </h2>
            <p className="text-zinc-400">
              All packs included with your subscription
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PACKS.map((pack) => (
              <div
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700"
                key={pack.name}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${pack.color}`}
                />

                <div className="mb-4 text-5xl">{pack.icon}</div>
                <h3 className="mb-2 font-bold text-xl">{pack.name}</h3>
                <p className="mb-6 text-sm text-zinc-400">{pack.description}</p>

                <div className="space-y-3">
                  {pack.agents.map((agent) => (
                    <div
                      className="flex items-center gap-3 rounded-lg bg-zinc-800/50 px-3 py-2"
                      key={agent.name}
                    >
                      <span className="text-xl">{agent.emoji}</span>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-zinc-500">
                          {agent.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-zinc-800 border-y bg-zinc-900/30 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl">
              What&apos;s Inside Each Pack
            </h2>
            <p className="text-zinc-400">
              Everything you need to get your AI team running
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="h-6 w-6" />,
                title: "SOUL.md Files",
                desc: "Personality configs for each agent",
              },
              {
                icon: <Code className="h-6 w-6" />,
                title: "IDENTITY.md",
                desc: "Role definitions and boundaries",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Clawdbot Config",
                desc: "Ready-to-merge JSON config",
              },
              {
                icon: <Rocket className="h-6 w-6" />,
                title: "Setup Guide",
                desc: "Step-by-step instructions",
              },
              {
                icon: <Star className="h-6 w-6" />,
                title: "Team Overview",
                desc: "AGENTS.md with workflows",
              },
              {
                icon: <Download className="h-6 w-6" />,
                title: "ZIP Download",
                desc: "Extract and you're ready",
              },
            ].map((item) => (
              <div
                className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                key={item.title}
              >
                <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                  {item.icon}
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-zinc-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-20" id="pricing">
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-center">
              <h2 className="font-bold text-2xl text-white">AgentPacks Pro</h2>
              <p className="text-purple-100">All packs, all updates</p>
            </div>

            <div className="p-8">
              <div className="mb-6 text-center">
                <span className="font-bold text-5xl">$19</span>
                <span className="text-zinc-400">/month</span>
              </div>

              <ul className="mb-8 space-y-3">
                {FEATURES.map((feature) => (
                  <li className="flex items-center gap-3" key={feature}>
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                className="block w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-center font-semibold text-lg text-white transition-all hover:opacity-90"
                href={checkoutUrl}
              >
                Subscribe Now
              </Link>

              <p className="mt-4 text-center text-sm text-zinc-500">
                Secure payment via Polar • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-zinc-800 border-t px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-12 text-center font-bold text-3xl">FAQ</h2>

          <div className="space-y-6">
            {[
              {
                q: "What do I get?",
                a: "ZIP files containing SOUL.md, IDENTITY.md, AGENTS.md, and clawdbot config for each agent team. Download, extract, and you're ready to go.",
              },
              {
                q: "How do I install a pack?",
                a: "Download the ZIP, extract to your Clawdbot workspace, merge the config into your clawdbot.json, and restart the gateway. Takes about 2 minutes.",
              },
              {
                q: "Are agents updated?",
                a: "Yes! All agents are continuously updated with the latest OpenClaw trends and best practices. You'll always have access to the most current configurations.",
              },
              {
                q: "Will there be more packs?",
                a: "Absolutely! New agent teams are added regularly. As a subscriber, you get instant access to all new packs as they're released.",
              },
              {
                q: "Can I customize the agents?",
                a: "Absolutely! The SOUL.md files are yours to modify. Tweak personalities, add domain knowledge, adjust communication styles.",
              },
              {
                q: "What if I cancel?",
                a: "You keep everything you've downloaded. Cancel anytime from your Polar dashboard, no questions asked.",
              },
            ].map((item) => (
              <div
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                key={item.q}
              >
                <h3 className="mb-2 font-semibold">{item.q}</h3>
                <p className="text-zinc-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-zinc-800 border-t px-4 py-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-zinc-500">
            Made with 🪓 by{" "}
            <a
              className="text-zinc-300 hover:text-white"
              href="https://twitter.com/theorcdev"
              rel="noopener noreferrer"
              target="_blank"
            >
              OrcDev
            </a>
          </p>
          <p className="mt-2 text-sm text-zinc-600">For the Horde! ⚔️</p>
        </div>
      </footer>
    </div>
  );
}
