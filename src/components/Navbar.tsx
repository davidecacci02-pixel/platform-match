"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-purple-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform border border-white/15">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-white text-lg tracking-tight flex items-center gap-1.5">
              Platform Match
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                2.0
              </span>
            </span>
            <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
              AI Growth Architecture
            </p>
          </div>
        </Link>

        {/* Navigation links & CTA */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/#platforms"
            className="hidden md:inline-flex text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Supported Platforms
          </Link>
          <Link
            href="/#methodology"
            className="hidden md:inline-flex text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Scoring Matrix
          </Link>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 border border-white/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-200" />
            <span>Find My Match</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
