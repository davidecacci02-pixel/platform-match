import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Heart } from "lucide-react";
import { SocialIcon } from "./SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/80 pt-12 pb-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Wordmark & mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-base">Platform Match</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-md">
              A strategic decision engine designed for modern founders, CMOs, and marketing leads.
              Stop guessing your social distribution—build on channels mathematically aligned with your
              brand model, audience demographics, and weekly creation budget.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Deterministic scoring • Zero vanity bias • Free & ungated</span>
            </div>
          </div>

          {/* Col 2: Supported Platforms */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Evaluated Platforms
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {ALL_PLATFORM_IDS.map((id) => (
                <li key={id} className="flex items-center gap-1.5 text-slate-600">
                  <SocialIcon platform={id} size={14} className="text-slate-400" />
                  <span>{PLATFORMS_DATA[id].name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/quiz" className="hover:text-brand-600 transition-colors">
                  Take the 2-Minute Quiz
                </Link>
              </li>
              <li>
                <Link href="/#methodology" className="hover:text-brand-600 transition-colors">
                  Scoring Weights & Formulas
                </Link>
              </li>
              <li>
                <Link href="/#platforms" className="hover:text-brand-600 transition-colors">
                  Platform Comparison Matrix
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} Platform Match by Digital Growth Studio. All rights reserved.
          </p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: Scores reflect indicative algorithmic alignment estimates. Organic reach and conversion rates depend on creative execution, consistency, and market dynamics.
          </p>
        </div>
      </div>
    </footer>
  );
}
