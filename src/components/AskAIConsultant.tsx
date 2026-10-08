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
    <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5 text-brand-600" />
            <span>Interactive Consultant</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Ask Your AI Consultant
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Discuss your strategy, brainstorm specific hooks, or adjust weekly execution priorities in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Revision Toast Banner */}
      {revisionAppliedToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Strategy updated! Your 30-Day Growth Roadmap now reflects the revised focus.</span>
        </div>
      )}

      {/* Proposed Revision Review Card */}
      {revisionPending && (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span className="font-bold text-slate-900 text-sm">
                Proposed Strategy Revision: {revisionPending.summary}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-100 text-brand-800">
              Needs Confirmation
            </span>
          </div>

          <ul className="space-y-1.5 text-slate-700">
            {revisionPending.changes.map((chg, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                <span>{chg}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleApplyRevision}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply Changes to Strategy</span>
            </button>
            <button
              type="button"
              onClick={() => setRevisionPending(null)}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Feed */}
      <div
        ref={chatContainerRef}
        className="h-[360px] sm:h-[400px] overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100"
      >
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-brand-600 text-white rounded-tr-none shadow-md shadow-brand-500/10"
                    : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm whitespace-pre-wrap"
                }`}
              >
                {msg.content}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-xs text-slate-500 flex items-center gap-2 shadow-sm">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />
              <span>Analyzing business context and preparing advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
          Suggested Consultation Questions
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(promptText)}
              disabled={isSending}
              className="text-left text-[11px] font-medium px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 border border-slate-200 transition-all active:scale-95"
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
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 placeholder:text-slate-400 font-medium"
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-100"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
