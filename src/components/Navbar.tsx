"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Sparkles, ArrowRight, Menu, X, Compass, Users } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full transition-all shadow-sm">
      {/* 1. Official Pace Top Institutional Bar */}
      <div className="bg-[#001C48] text-white text-[11px] font-medium border-b border-[#002D72]/40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider uppercase text-[#FFB81C]">Pace University</span>
            <span className="text-white/30">•</span>
            <span className="text-slate-200">Lubin School of Business</span>
            <span className="text-white/30">•</span>
            <span className="text-slate-300">One Pace Plaza, New York, NY 10038</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="text-slate-300 italic font-serif">Opportunitas • Est. 1906</span>
            <span className="text-white/20">|</span>
            <span className="inline-flex items-center gap-1 text-[#FFB81C] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB81C] animate-pulse" />
              Student Digital Marketing Lab
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2 flex items-center justify-between">
          {/* Brand Logo & Wordmark matching pace.edu */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D72] rounded-xl p-1"
          >
            {/* Collegiate Pace Crest / Monogram Badge */}
            <div className="w-10 h-10 rounded-xl bg-[#002D72] flex items-center justify-center text-white shadow-md shadow-[#002D72]/20 group-hover:bg-[#001C48] transition-colors border border-[#002D72]/30 relative overflow-hidden flex-shrink-0">
              <div className="absolute top-0 right-0 w-3 h-3 bg-[#FFB81C] rounded-bl-lg" />
              <GraduationCap className="w-5 h-5 text-white" />
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-[#002D72] text-xl tracking-tight leading-none font-sans">
                  PACE
                </span>
                <span className="text-[11px] font-bold text-slate-700 tracking-wider uppercase">
                  Marketing Lab
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFB81C]/20 text-[#855B00] border border-[#FFB81C]/40">
                  Lubin NYC
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                Digital Marketing &amp; Strategy Lab
              </p>
            </div>
          </Link>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/#services"
              className="text-xs font-semibold text-slate-700 hover:text-[#002D72] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#about"
              className="text-xs font-semibold text-slate-700 hover:text-[#002D72] transition-colors"
            >
              About Lab
            </Link>
            <Link
              href="/#team"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#002D72] transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#002D72]" />
              <span>Our Team</span>
            </Link>
            <Link
              href="/#why-us"
              className="text-xs font-semibold text-slate-700 hover:text-[#002D72] transition-colors"
            >
              Why Pace
            </Link>
            <Link
              href="/platform-match"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#002D72]/5 hover:bg-[#002D72]/10 text-[#002D72] border border-[#002D72]/20 transition-all hover:scale-[1.02]"
            >
              <Compass className="w-3.5 h-3.5 text-[#002D72]" />
              <span>Platform Match</span>
            </Link>
            <Link
              href="/#contact"
              className="text-xs font-semibold text-slate-700 hover:text-[#002D72] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] text-xs sm:text-sm font-extrabold rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D72] border border-[#E5A417]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#001C48]" />
              <span>Try Platform Match</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline text-[#001C48]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <Link
              href="/#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              Services
            </Link>
            <Link
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              About Lab
            </Link>
            <Link
              href="/#team"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#002D72] transition-colors py-1 font-semibold flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#002D72]" />
              <span>Our Team &amp; Researchers</span>
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              Why Work With Us
            </Link>
            <Link
              href="/platform-match"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-[#002D72] font-bold py-1"
            >
              <Compass className="w-4 h-4 text-[#002D72]" />
              <span>Platform Match (Diagnostic Tool)</span>
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/quiz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFB81C] text-[#001C48] font-black text-xs shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#001C48]" />
                <span>Try Platform Match (3-Min Quiz)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

