"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Sparkles, ArrowRight, Menu, X, Compass } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080B11]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform border border-white/10">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight flex items-center gap-1.5">
              Pace Marketing Lab
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/15 text-brand-300 border border-brand-500/20">
                Lubin NYC
              </span>
            </span>
            <p className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
              Student Digital Agency
            </p>
          </div>
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/#services"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#about"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/#why-us"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Why Work With Us
          </Link>
          <Link
            href="/platform-match"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-brand-300 hover:text-white border border-brand-500/30 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-brand-400" />
            <span>Platform Match Tool</span>
          </Link>
          <Link
            href="/#contact"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/platform-match"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow-brand-500/20 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Try Platform Match</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline text-slate-950" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D121F] border-b border-white/[0.08] px-4 py-5 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm">
            <Link
              href="/#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white transition-colors py-1"
            >
              Services
            </Link>
            <Link
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white transition-colors py-1"
            >
              About Us
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white transition-colors py-1"
            >
              Why Work With Us
            </Link>
            <Link
              href="/platform-match"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-brand-300 font-semibold py-1"
            >
              <Compass className="w-4 h-4 text-brand-400" />
              <span>Platform Match (Interactive Tool)</span>
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white transition-colors py-1"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
