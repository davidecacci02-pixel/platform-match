"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b border-slate-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight flex items-center gap-1.5">
              Platform Match
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                MVP
              </span>
            </span>
            <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">
              Digital Marketing Studio
            </p>
          </div>
        </Link>

        {/* Navigation links & CTA */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/#platforms"
            className="hidden md:inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Supported Platforms
          </Link>
          <Link
            href="/#methodology"
            className="hidden md:inline-flex text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Scoring Matrix
          </Link>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow-md shadow-brand-500/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find My Match</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
