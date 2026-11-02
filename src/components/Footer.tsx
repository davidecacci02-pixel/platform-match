import React from "react";
import Link from "next/link";
import { GraduationCap, Compass, ShieldCheck, Mail, MapPin, Users, Instagram, Sparkles, BookOpen, Share2 } from "lucide-react";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";

export function Footer() {
  return (
    <footer className="w-full bg-[#001C48] border-t-4 border-[#FFB81C] pt-14 pb-12 text-slate-300 text-xs relative overflow-hidden">
      {/* Subtle University background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001538]/50 to-[#000E26] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Lab Identity, Brand & University Affiliation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002D72] flex items-center justify-center text-white shadow-md border border-white/20 relative overflow-hidden flex-shrink-0">
                <div className="absolute top-0 right-0 w-3 h-3 bg-[#FFB81C] rounded-bl" />
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block">
                  Pace Digital Marketing Lab
                </span>
                <span className="text-[11px] text-[#FFB81C] font-bold tracking-wider uppercase block">
                  Lubin School of Business, Pace University, New York, NY
                </span>
              </div>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm font-normal">
              A student-led digital marketing and research lab at Pace University helping NYC small businesses grow through empirical digital marketing strategies, channel diagnostics, hands-on student projects, and practical planning tools.
            </p>
            <div className="space-y-2 text-[11px] text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFB81C] flex-shrink-0" />
                <span>One Pace Plaza, Downtown Manhattan, New York, NY 10038</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com/platform_match"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-200 hover:text-[#FFB81C] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#FFB81C] flex-shrink-0" />
                  <span>Instagram: @platform_match</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Opportunitas • Student Energy &amp; Faculty-Mentored Rigor</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB81C]" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Home (/)
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Services (/#services)
                </Link>
              </li>
              <li>
                <Link href="/platform-match" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Platform Match (/platform-match)
                </Link>
              </li>
              <li>
                <Link href="/best-social-media-platforms-for-business" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Resources (/best-social-media-platforms-for-business)
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  About (/about)
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Contact (/#contact)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Match Tool */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB81C]" />
              Platform Match Tool
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/quiz" className="text-[#FFB81C] hover:underline font-bold transition-colors">
                  Take the 3-Minute Quiz (/quiz)
                </Link>
              </li>
              <li>
                <Link href="/platform-match" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Tool Overview &amp; Features
                </Link>
              </li>
              <li>
                <Link href="/platform-match#methodology" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  6-Factor Scoring Formula
                </Link>
              </li>
              <li>
                <Link href="/platform-match#platforms" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  6 Evaluated Platforms
                </Link>
              </li>
              <li>
                <Link href="/best-social-media-platforms-for-business" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Social Platform Selection Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Lab & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB81C]" />
              Connect With Us
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about#team" className="text-white hover:text-[#FFB81C] transition-colors font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#FFB81C]" />
                  <span>Meet Our 6 Researchers</span>
                </Link>
              </li>
              <li>
                <Link href="/about#mission" className="text-slate-300 hover:text-[#FFB81C] transition-colors">
                  Lab Mission &amp; Academic Heritage
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[#FFB81C] hover:underline transition-colors font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Get a Free Review</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/platform_match"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#FFB81C] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#FFB81C]" />
                  <span>Instagram: @platform_match</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Clear Academic Student Project Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} Pace Digital Marketing Lab • Lubin School of Business, Pace University, New York, NY.
          </p>
          <p className="max-w-xl text-center md:text-right text-slate-400">
            Student academic project conducted for research, education, and community business development in New York City.
          </p>
        </div>
      </div>
    </footer>
  );
}
