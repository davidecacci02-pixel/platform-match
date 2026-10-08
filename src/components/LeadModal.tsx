"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PlatformId, QuizAnswers } from "@/lib/quiz-schema";
import { PLATFORMS_DATA } from "@/lib/platforms";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryPlatform?: PlatformId;
  answers?: QuizAnswers;
}

export function LeadModal({
  isOpen,
  onClose,
  primaryPlatform,
  answers,
}: LeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [challenge, setChallenge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    mode: "database" | "demo";
    message: string;
  } | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || name.length < 2) {
      setErrorMessage("Please enter a valid name (at least 2 characters).");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!company.trim()) {
      setErrorMessage("Please enter your company or brand name.");
      return;
    }
    if (!challenge.trim() || challenge.length < 5) {
      setErrorMessage("Please share a brief sentence on your main marketing challenge.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          challenge: challenge.trim(),
          primaryPlatform,
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSuccessResult({
        mode: data.mode || "demo",
        message:
          data.mode === "database"
            ? "Your request was saved directly to our client pipeline."
            : "Request captured in Demo Mode! (Supabase is ready to connect for live CRM persistence).",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission error occurred";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setChallenge("");
    setErrorMessage(null);
    setSuccessResult(null);
    onClose();
  };

  const platformName = primaryPlatform ? PLATFORMS_DATA[primaryPlatform]?.name : "Your Top Match";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Strategy Session Requested!</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-slate-900">{name}</span>. Our growth team has received your profile for{" "}
              <span className="font-semibold text-slate-900">{company}</span> targeting{" "}
              <span className="font-semibold text-slate-900">{platformName}</span>.
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-left text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                Integration Status:
              </div>
              <p>{successResult.message}</p>
              <p className="text-slate-500 text-[11px]">
                {successResult.mode === "demo"
                  ? "Note: Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env to store live production submissions."
                  : "Database record stored successfully in table `leads`."}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-4 py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-semibold rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Tailored 30-Day Agency Execution
              </div>
              <h2 id="lead-modal-title" className="text-2xl font-bold text-slate-900 tracking-tight">
                Build My Social Strategy
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Receive an agency-crafted 30-day tactical roadmap for{" "}
                <span className="font-semibold text-brand-600">{company || platformName}</span>. We never spam or sell your details.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="alex@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Brand *
                  </label>
                  <input
                    id="lead-company"
                    type="text"
                    required
                    placeholder="e.g. Apex Health"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-challenge" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Biggest Marketing Bottleneck *
                </label>
                <textarea
                  id="lead-challenge"
                  rows={3}
                  required
                  placeholder="e.g., We spend too much time filming videos that only get 200 views and don't convert to demo calls..."
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {primaryPlatform && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Calculated Top Platform:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    {platformName}
                  </span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-brand-500/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Strategy Request...
                    </>
                  ) : (
                    <>
                      Request My Strategy
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 mt-2">
                Never gated • 100% free consultation proposal • Unsubscribe anytime
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
