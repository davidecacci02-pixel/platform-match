import React from "react";
import Link from "next/link";
import { GraduationCap, Compass, ShieldCheck, Mail, MapPin } from "lucide-react";
import { SocialIcon } from "./SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";

export function Footer() {
  return (
    <footer className="w-full bg-[#06090E] border-t border-white/[0.08] pt-14 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Agency Mission & University Affiliation */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 border border-white/10">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white text-base block">Pace Marketing Lab</span>
                <span className="text-[10px] text-slate-500 font-medium">Lubin School of Business • NYC</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-normal">
              A student-led digital marketing lab at Pace University dedicated to helping small businesses, startups,
              and nonprofits grow through research-backed digital marketing strategies, AI-driven channel diagnostics,
              and creative execution.
            </p>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                <span>One Pace Plaza, New York, NY 10038</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Student-driven perspectives • Faculty-mentored academic rigor</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#services" className="text-slate-400 hover:text-white transition-colors">
                  Social Media Strategy
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-400 hover:text-white transition-colors">
                  Content Creation &amp; Reels
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-400 hover:text-white transition-colors">
                  SEO &amp; AI Search Optimization
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-400 hover:text-white transition-colors">
                  Digital Advertising (PPC)
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-400 hover:text-white transition-colors">
                  Marketing Analytics &amp; GA4
                </Link>
              </li>
              <li>
                <Link href="/platform-match" className="text-brand-300 hover:text-white font-medium transition-colors">
                  Platform Match (Lab Tool)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Match Tool */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Platform Match Tool
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/quiz" className="text-slate-400 hover:text-brand-400 transition-colors">
                  Take the 3-Minute Quiz
                </Link>
              </li>
              <li>
                <Link href="/platform-match#methodology" className="text-slate-400 hover:text-brand-400 transition-colors">
                  6-Factor Scoring Matrix
                </Link>
              </li>
              <li>
                <Link href="/platform-match#platforms" className="text-slate-400 hover:text-brand-400 transition-colors">
                  Evaluated Social Networks
                </Link>
              </li>
              <li>
                <Link href="/platform-match" className="text-slate-400 hover:text-brand-400 transition-colors">
                  Platform Match Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Lab Navigation & Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Connect With Us
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#about" className="text-slate-400 hover:text-white transition-colors">
                  About Our Student Lab
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="text-slate-400 hover:text-white transition-colors">
                  Why Work With Us
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-slate-400 hover:text-white transition-colors">
                  Request Free Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Digital Marketing Lab at Pace University • Lubin School of Business. All rights reserved.
          </p>
          <p className="max-w-xl text-center md:text-right">
            Student academic project developed for research, education, and community business development in New York City.
          </p>
        </div>
      </div>
    </footer>
  );
}
