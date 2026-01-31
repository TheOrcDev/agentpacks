import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed top-4 right-0 left-0 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-zinc-800/60 bg-zinc-950/70 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md sm:px-6">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="AgentPacks"
            height={32}
            priority
            src="/agent-packs-logo.png"
            width={32}
          />
          <span className="font-bold text-xl">
            Agent<span className="text-purple-400">Packs</span>
          </span>
        </Link>

        <Link
          className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 font-medium text-sm text-zinc-200 transition-all hover:bg-zinc-800 hover:text-white"
          href="/login"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
