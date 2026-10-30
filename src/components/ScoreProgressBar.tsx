"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ScoreProgressBarProps {
  score: number;
  colorClass?: string;
  className?: string;
  heightClass?: string;
  showLabel?: boolean;
  trackClass?: string;
}

export function ScoreProgressBar({
  score,
  colorClass = "bg-[#002D72]",
  className,
  heightClass = "h-2.5",
  showLabel = false,
  trackClass = "bg-slate-100 border-slate-200",
}: ScoreProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, score));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
          <span>Match Compatibility</span>
          <span className="font-extrabold text-[#002D72]">{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full overflow-hidden p-0.5 border shadow-inner",
          trackClass,
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
            "h-full rounded-full transition-all duration-1000 ease-out shadow-sm",
            colorClass
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
