import Link from "next/link";
import { Home, Package } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 text-8xl">🤖</div>
      
      <h1 className="mb-4 text-6xl font-bold">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          404
        </span>
      </h1>
      
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      
      <p className="mb-8 max-w-md text-zinc-400">
        Looks like this agent wandered off. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:opacity-90"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>
        
        <Link
          href="/#packs"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 font-semibold text-white transition-all hover:bg-zinc-800"
        >
          <Package className="h-5 w-5" />
          View Packs
        </Link>
      </div>
    </div>
  );
}
