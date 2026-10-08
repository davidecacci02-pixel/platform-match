"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ScoreProgressBarProps {
  score: number;
  colorClass?: string;
  className?: string;
  heightClass?: string;
  showLabel?: boolean;
}

export function ScoreProgressBar({
  score,
  colorClass = "bg-brand-600",
  className,
  heightClass = "h-3",
  showLabel = false,
}: ScoreProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, score));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600">
          <span>Match Compatibility</span>
          <span className="font-bold text-slate-900">{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/70",
          heightClass
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${clamped}% compatibility match`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            colorClass
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
