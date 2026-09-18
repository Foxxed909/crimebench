"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/methodology", label: "Methodology" },
  { href: "/categories", label: "Categories" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-crime-900/50 bg-dark-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldAlert className="w-7 h-7 text-crime-500 group-hover:text-crime-400 transition" />
          <span className="font-bold text-xl tracking-tight">
            Crime<span className="text-crime-500">Bench</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "text-sm font-medium transition",
                pathname === l.href
                  ? "text-crime-400"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-zinc-400"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-crime-900/50 bg-dark-900 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "block text-sm font-medium",
                pathname === l.href ? "text-crime-400" : "text-zinc-400"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}