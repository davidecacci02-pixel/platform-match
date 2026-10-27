"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

export function AgencyContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to submit message. Please try again.");
      }

      setSubmittedName(formData.name);
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#0D121F] rounded-3xl p-8 border border-emerald-500/30 text-center space-y-5 shadow-2xl animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">Message Received!</h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            Thank you, <strong className="text-white font-semibold">{submittedName}</strong>. Your consultation
            inquiry has been successfully received by our student consultants at the Pace University Digital Marketing Lab.
          </p>
          <p className="text-xs text-slate-400">
            We will review your business needs and reply within 24–48 hours.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setStatus("idle")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
          >
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0D121F] rounded-3xl p-7 sm:p-9 border border-white/[0.08] shadow-2xl space-y-5">
      <div className="space-y-1 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h3 className="text-xl font-bold text-white">Let&apos;s Build Your Growth Strategy</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Tell us about your brand or marketing bottleneck. Our student consultants will analyze your needs free of charge.
        </p>
      </div>

      {status === "error" && (
        <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
            Your Name <span className="text-brand-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alex Morgan"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
          />
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300">
            Email Address <span className="text-brand-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. alex@yourbrand.com"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
          />
        </div>
      </div>

      {/* Company / Brand Name */}
      <div className="space-y-1.5">
        <label htmlFor="contact-company" className="block text-xs font-medium text-slate-300">
          Company or Organization <span className="text-slate-500 text-[11px] font-normal">(Optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="e.g. Brooklyn Roasters LLC / Non-profit Initiative"
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">
          How can we help your business? <span className="text-brand-400">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your current marketing goals, challenge, or what services you are interested in exploring with our student lab..."
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-950 text-sm font-bold rounded-xl shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            <span>Sending to Lab...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-brand-600" />
            <span>Send Message to Marketing Lab</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center leading-relaxed">
        Pace University Digital Marketing Lab • Lubin School of Business • One Pace Plaza, New York, NY
      </p>
    </form>
  );
}
