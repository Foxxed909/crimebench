"use client";

import { Twitter, Link2, Check } from "lucide-react";
import { useState } from "react";

const SHARE_TEXT =
  "CrimeBench: open benchmark for AI criminal propensity — 19 live suites, free-model leaderboard, full transcripts. https://crimebench.vercel.app";

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText("https://crimebench.vercel.app");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white text-sm font-medium transition"
      >
        <Twitter className="w-4 h-4" />
        Share on X
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-sm font-medium transition"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
