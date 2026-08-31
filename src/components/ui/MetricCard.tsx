import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  context?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  delta,
  context,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-md bg-surface border border-border-subtle hover:border-accent/50 transition-colors flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
          {label}
        </span>
        {delta && (
          <span className="text-xs font-mono px-1.5 py-0.5 rounded-sm bg-accent/10 text-accent border border-accent/20">
            {delta}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl lg:text-3xl font-display font-semibold text-text-primary tracking-tight">
          {value}
        </div>
        {context && (
          <p className="mt-1 text-xs text-text-secondary leading-relaxed">
            {context}
          </p>
        )}
      </div>
    </div>
  );
}
