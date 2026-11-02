"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ArrowRight, Menu, X, Compass, Users, Sparkles, BookOpen, Layers, Instagram, Mail, Share2 } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
            <span className="text-slate-300">Pace Digital Marketing Lab</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <a
              href="https://instagram.com/platform_match"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#FFB81C] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span className="font-semibold">@platform_match</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="text-slate-300 italic font-serif">Opportunitas • Est. 1906</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2.5 flex items-center justify-between">
          {/* Brand Logo & Wordmark: Pace Digital Marketing Lab linking to / */}
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
                <span className="font-black text-[#002D72] text-lg sm:text-xl tracking-tight leading-none font-sans">
                  Pace Digital Marketing Lab
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                Lubin School of Business • NYC
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links:
              Home (/) | Services (/#services) | Platform Match (/platform-match) | Resources (/best-social-media-platforms-for-business) | About (/about)
          */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={`text-xs font-bold transition-colors px-2 py-1 rounded-md ${
                pathname === "/" ? "text-[#002D72]" : "text-slate-700 hover:text-[#002D72]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="text-xs font-semibold text-slate-700 hover:text-[#002D72] transition-colors px-2 py-1"
            >
              Services
            </Link>
            <Link
              href="/platform-match"
              className={`text-xs font-semibold transition-colors px-2 py-1 rounded-md ${
                pathname === "/platform-match" ? "text-[#002D72] font-bold" : "text-slate-700 hover:text-[#002D72]"
              }`}
            >
              Platform Match
            </Link>
            <Link
              href="/best-social-media-platforms-for-business"
              className={`text-xs font-semibold transition-colors px-2 py-1 rounded-md ${
                pathname === "/best-social-media-platforms-for-business"
                  ? "text-[#002D72] font-bold"
                  : "text-slate-700 hover:text-[#002D72]"
              }`}
            >
              Resources
            </Link>
            <Link
              href="/about"
              className={`text-xs font-semibold transition-colors px-2 py-1 rounded-md ${
                pathname === "/about" ? "text-[#002D72] font-bold" : "text-slate-700 hover:text-[#002D72]"
              }`}
            >
              About
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Instagram Link (Mobile/Tablet visible icon) */}
            <a
              href="https://instagram.com/platform_match"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#002D72] text-xs font-bold transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span className="hidden xl:inline">@platform_match</span>
            </a>

            {/* Standardized CTA button: "Get a Free Review" linking to /#contact */}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[#002D72] hover:bg-[#001C48] text-white text-xs sm:text-sm font-bold rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D72] border border-[#002D72]"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span>Get a Free Review</span>
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
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-slate-800 hover:text-[#002D72] font-bold py-1"
            >
              <span>Home</span>
            </Link>
            <Link
              href="/#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              Services
            </Link>
            <Link
              href="/platform-match"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              <Compass className="w-4 h-4 text-[#002D72]" />
              <span>Platform Match</span>
            </Link>
            <Link
              href="/best-social-media-platforms-for-business"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              Resources
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              <Users className="w-4 h-4 text-[#002D72]" />
              <span>About</span>
            </Link>
            <a
              href="https://instagram.com/platform_match"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-slate-700 hover:text-[#002D72] transition-colors py-1"
            >
              <Instagram className="w-4 h-4 text-[#FFB81C]" />
              <span>Instagram (@platform_match)</span>
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#002D72] text-white font-bold text-xs rounded-full shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span>Get a Free Review</span>
            </Link>

            <Link
              href="/quiz"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#FFB81C]/25 text-[#001C48] text-xs font-bold border border-[#FFB81C]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#001C48]" />
              <span>Try Platform Match Quiz</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
