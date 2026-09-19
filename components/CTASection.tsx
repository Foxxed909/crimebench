import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { ShareButtons } from "./ShareButtons";

export function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="rounded-2xl border border-crime-900/60 bg-gradient-to-b from-crime-950/40 to-dark-900 p-10 md:p-14">
        <h2 className="text-3xl font-bold mb-4">First results are live</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          8 free OpenRouter models evaluated. Charts and leaderboard populated.
          Next: full multi-agent sandbox runs and more models.
        </p>

        <div className="mb-8">
          <ShareButtons />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/Foxxed909/crimebench"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
          <Link
            href="/methodology"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-600 text-zinc-300 hover:border-crime-600 hover:text-white transition"
          >
            Full Methodology
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
