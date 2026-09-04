"use client";

import React, { useState } from "react";
import { ChevronDown, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  title: string;
  problem: string;
  rootCause: string;
  solution: string;
  status: "resolved" | "in-progress" | "mitigated";
  defaultOpen?: boolean;
}

export function ChallengeCard({
  title,
  problem,
  rootCause,
  solution,
  status,
  defaultOpen = false,
}: ChallengeCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getStatusBadge = () => {
    switch (status) {
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10 px-2 py-0.5 rounded-sm border border-emerald-500/30 dark:border-emerald-400/20">
            <CheckCircle2 className="w-3 h-3" /> Resolved
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-amber-800 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-400/10 px-2 py-0.5 rounded-sm border border-amber-500/30 dark:border-amber-400/20">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      case "mitigated":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-cyan-800 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/10 px-2 py-0.5 rounded-sm border border-cyan-500/30 dark:border-cyan-400/20">
            <AlertCircle className="w-3 h-3" /> Mitigated
          </span>
        );
    }
  };

  return (
    <div className="rounded-md border border-border-subtle bg-surface transition-all overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-surface-raised transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-text-primary truncate">
            {title}
          </span>
          {getStatusBadge()}
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-text-secondary transition-transform duration-fast flex-shrink-0",
            isOpen && "rotate-180 text-accent"
          )}
        />
      </button>

      {isOpen && (
        <div className="p-4 pt-2 border-t border-border-subtle/60 text-sm space-y-3 bg-surface/60">
          <div>
            <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block mb-1">
              The Problem &amp; Failure Mode
            </span>
            <p className="text-text-primary leading-relaxed text-sm">{problem}</p>
          </div>

          <div>
            <span className="text-xs font-mono text-accent-warm uppercase tracking-wider block mb-1">
              Root Cause
            </span>
            <p className="text-text-secondary leading-relaxed text-sm font-mono text-[13px] bg-surface-raised p-2.5 rounded-sm border border-border-subtle">
              {rootCause}
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
              Engineering Solution &amp; Fix
            </span>
            <p className="text-text-primary leading-relaxed text-sm">{solution}</p>
          </div>
        </div>
      )}
    </div>
  );
}
