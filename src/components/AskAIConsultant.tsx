"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  Bot,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import {
  BusinessDiscovery,
  MarketingAssessmentExtension,
  BusinessSnapshot,
  AIStrategyOutput,
  ConsultantMessage,
} from "@/lib/business-schema";
import { QuizAnswers } from "@/lib/quiz-schema";
import { RecommendationEngineResult } from "@/lib/recommendation-engine";
import { PLATFORMS_DATA } from "@/lib/platforms";
import {
  loadStoredChatHistory,
  saveStoredChatHistory,
} from "@/lib/session";

interface AskAIConsultantProps {
  business: BusinessDiscovery;
  quizAnswers: QuizAnswers;
  extension: MarketingAssessmentExtension;
  scoringResults: RecommendationEngineResult;
  snapshot: BusinessSnapshot;
  strategy: AIStrategyOutput;
  onStrategyUpdate?: (updatedStrategy: AIStrategyOutput) => void;
}

const QUICK_PROMPTS = [
  "Why is this platform best for my business?",
  "What if I only have two hours per week?",
  "Give me five high-converting Reel hooks",
  "How should I start if I have zero followers?",
  "Can you make this strategy more focused on sales?",
  "What should I publish next Monday?",
];

export function AskAIConsultant({
  business,
  quizAnswers,
  extension,
  scoringResults,
  snapshot,
  strategy,
  onStrategyUpdate,
}: AskAIConsultantProps) {
  const [messages, setMessages] = useState<ConsultantMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [revisionPending, setRevisionPending] = useState<{
    summary: string;
    changes: string[];
    revisedStrategy?: Partial<AIStrategyOutput>;
  } | null>(null);
  const [revisionAppliedToast, setRevisionAppliedToast] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasUserSentMessage = useRef(false);

  // Initialize chat history from storage or set default welcome message
  useEffect(() => {
    const saved = loadStoredChatHistory();
    if (saved && saved.length > 0) {
      setMessages(saved);
    } else {
      const primaryName = PLATFORMS_DATA[scoringResults.primaryPlatform].name;
      const initialWelcome: ConsultantMessage = {
        id: "welcome-1",
        role: "assistant",
        content: `Hello! I'm your AI Social Media Consultant for **${business.businessName}**. 

I've analyzed your business positioning, audience demographics, and weekly time budget. Based on our compatibility engine, **${primaryName}** is your primary growth channel (${scoringResults.rankedPlatforms[0].score}% match).

Ask me anything about your strategy, content ideas, format execution, or click any prompt below to get started!`,
        timestamp: new Date().toISOString(),
      };
      setMessages([initialWelcome]);
      saveStoredChatHistory([initialWelcome]);
    }
  }, [business.businessName, scoringResults]);

  // Scroll internally within chat box ONLY when user has sent a message
  useEffect(() => {
    if (hasUserSentMessage.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isSending) return;

    hasUserSentMessage.current = true;

    setInput("");
    const userMsg: ConsultantMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveStoredChatHistory(updatedMessages);
    setIsSending(true);

    try {
      const res = await fetch("/api/consultant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: query,
          history: updatedMessages,
          business,
          quizAnswers,
          extension,
          snapshot,
          strategy,
        }),
      });

      if (!res.ok) {
        throw new Error("Consultant service is temporarily busy. Please try again.");
      }

      const data = await res.json();
      const assistantMsg: ConsultantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toISOString(),
        proposedRevision: data.proposedRevision,
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);
      saveStoredChatHistory(finalMessages);

      if (data.proposedRevision) {
        setRevisionPending(data.proposedRevision);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not complete request.";
      const errorReply: ConsultantMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `I ran into an issue connecting to the consultation engine: ${msg}. Please try asking again.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsSending(false);
    }
  };

  const handleApplyRevision = () => {
    if (!revisionPending || !revisionPending.revisedStrategy) return;

    const mergedStrategy: AIStrategyOutput = {
      ...strategy,
      ...revisionPending.revisedStrategy,
      strategicSummary:
        revisionPending.revisedStrategy.strategicSummary || strategy.strategicSummary,
    };

    if (onStrategyUpdate) {
      onStrategyUpdate(mergedStrategy);
    }

    setRevisionPending(null);
    setRevisionAppliedToast(true);
    setTimeout(() => setRevisionAppliedToast(false), 4000);

    const confirmationMsg: ConsultantMessage = {
      id: `conf-${Date.now()}`,
      role: "assistant",
      content: `✅ **Strategy Updated**: I've successfully applied the revisions to your 30-Day Growth Roadmap!`,
      timestamp: new Date().toISOString(),
    };
    const updated = [...messages, confirmationMsg];
    setMessages(updated);
    saveStoredChatHistory(updated);
  };

  const handleClearChat = () => {
    const primaryName = PLATFORMS_DATA[scoringResults.primaryPlatform].name;
    const initialWelcome: ConsultantMessage = {
      id: `welcome-${Date.now()}`,
      role: "assistant",
      content: `Chat session refreshed. I'm ready to answer any questions about your social strategy on **${primaryName}**!`,
      timestamp: new Date().toISOString(),
    };
    setMessages([initialWelcome]);
    saveStoredChatHistory([initialWelcome]);
    setRevisionPending(null);
  };

  return (
    <section className="bg-white rounded-[2.5rem] border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-6 text-slate-900 relative overflow-hidden">
      {/* Top Accent Strip */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#002D72] via-[#FFB81C] to-[#001C48]" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002D72]/10 border border-[#002D72]/20 text-[#002D72] text-xs font-bold">
            <Bot className="w-3.5 h-3.5 text-[#002D72]" />
            <span>AI Strategic Consultant</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            Chat With Your Strategy Consultant
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Discuss your strategy, brainstorm specific hooks, or adjust weekly execution priorities in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors self-start sm:self-auto px-3 py-1.5 rounded-full hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Revision Toast Banner */}
      {revisionAppliedToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Strategy updated! Your 30-Day Growth Roadmap now reflects the revised focus.</span>
        </div>
      )}

      {/* Proposed Revision Review Card */}
      {revisionPending && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#002D72]/5 border border-[#002D72]/20 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#002D72]" />
              <span className="font-bold text-slate-900 text-sm">
                Proposed Strategy Revision: {revisionPending.summary}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FFB81C]/30 text-[#855B00] border border-[#FFB81C]/50">
              Needs Confirmation
            </span>
          </div>

          <ul className="space-y-1.5 text-slate-700">
            {revisionPending.changes.map((chg, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#002D72] mt-1.5 flex-shrink-0" />
                <span>{chg}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleApplyRevision}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span>Apply Changes to Strategy</span>
            </button>
            <button
              type="button"
              onClick={() => setRevisionPending(null)}
              className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Feed */}
      <div
        ref={chatContainerRef}
        className="h-[360px] sm:h-[400px] overflow-y-auto space-y-4 p-5 rounded-[2rem] bg-[#FAF9F6] border border-slate-200/90 shadow-inner"
      >
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#002D72] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4 text-[#FFB81C]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-[#002D72] text-white rounded-tr-none shadow-md"
                    : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none whitespace-pre-wrap font-medium"
                }`}
              >
                {msg.content}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-full bg-[#002D72] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4 text-[#FFB81C]" />
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-3.5 text-xs text-slate-600 flex items-center gap-2 shadow-sm font-semibold">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#002D72]" />
              <span>Analyzing business context and synthesizing response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips (Linktree-Style Pill Chips) */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
          Suggested Consultation Questions
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(promptText)}
              disabled={isSending}
              className="text-left text-[11px] font-bold px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#002D72] hover:text-white text-slate-700 border border-slate-200 transition-all active:scale-95 shadow-sm"
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2 pt-2 border-t border-slate-100"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask anything about ${business.businessName}'s strategy, hooks, or posting rhythm...`}
          disabled={isSending}
          className="flex-1 px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#002D72] focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium transition-colors"
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#002D72] hover:bg-[#001C48] disabled:opacity-40 disabled:hover:bg-[#002D72] text-white text-xs font-black shadow-md transition-all hover:scale-105 active:scale-95"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <>
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5 text-[#FFB81C]" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
