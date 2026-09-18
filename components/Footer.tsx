import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-crime-900/40 bg-dark-900 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-bold text-lg mb-2">
            Crime<span className="text-crime-500">Bench</span>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm">
            Open evaluation of AI criminal propensity. All scenarios are simulated.
            No real crimes. Results intended for safety research only.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-zinc-400">
          <div className="space-y-2">
            <div className="text-zinc-200 font-medium">Navigate</div>
            <Link href="/leaderboard" className="block hover:text-crime-400">Leaderboard</Link>
            <Link href="/methodology" className="block hover:text-crime-400">Methodology</Link>
            <Link href="/categories" className="block hover:text-crime-400">Categories</Link>
          </div>
          <div className="space-y-2">
            <div className="text-zinc-200 font-medium">Connect</div>
            <a
              href="https://github.com/Foxxed909/crimebench"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 hover:text-crime-400"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 hover:text-crime-400"
            >
              <Twitter className="w-4 h-4" /> Share on X
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-crime-900/30 py-4 text-center text-xs text-zinc-600">
        © 2026 CrimeBench · Built for AI safety · Free models via OpenRouter
      </div>
    </footer>
  );
}