"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface DataPoint {
  xLabel: string;
  baseline: number;
  optimized: number;
  unit?: string;
  notes?: string;
}

interface ExperimentGraphProps {
  title: string;
  data: DataPoint[];
  baselineLabel?: string;
  optimizedLabel?: string;
  unit?: string;
  lowerIsBetter?: boolean;
  className?: string;
}

export function ExperimentGraph({
  title,
  data,
  baselineLabel = "Standard / Baseline",
  optimizedLabel = "Our Implementation (Optimized)",
  unit = "tokens/s",
  lowerIsBetter = false,
  className,
}: ExperimentGraphProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Compute maximum for scale
  const allValues = data.flatMap((d) => [d.baseline, d.optimized]);
  const maxValue = Math.max(...allValues, 1);

  return (
    <div className={cn("p-5 rounded-lg bg-surface border border-border-subtle my-6 space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-3">
        <div>
          <span className="text-[11px] font-mono text-accent uppercase tracking-wider block mb-0.5 font-semibold">
            EMPIRICAL BENCHMARK // REPRODUCIBLE LOG
          </span>
          <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-neutral-600 inline-block" />
            <span className="text-text-secondary">{baselineLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-accent inline-block" />
            <span className="text-accent font-medium">{optimizedLabel}</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="space-y-4 pt-1">
        {data.map((item, idx) => {
          const baselinePercent = (item.baseline / maxValue) * 100;
          const optimizedPercent = (item.optimized / maxValue) * 100;
          const isHovered = hoveredIdx === idx;

          let deltaBadge = "";
          if (lowerIsBetter) {
            const reduction = (((item.baseline - item.optimized) / (item.baseline || 1)) * 100).toFixed(1);
            deltaBadge = `-${reduction}% reduction`;
          } else {
            const speedupRatio = (item.optimized / (item.baseline || 1)).toFixed(1);
            deltaBadge = `+${speedupRatio}x speedup`;
          }

          return (
            <div
              key={idx}
              className={cn(
                "space-y-1.5 text-xs font-mono p-2 rounded transition-colors",
                isHovered ? "bg-surface-raised" : "bg-transparent"
              )}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center justify-between text-text-secondary">
                <span className="font-semibold text-text-primary">{item.xLabel}</span>
                <span className="text-accent font-medium">
                  {deltaBadge} ({item.optimized} vs {item.baseline} {item.unit || unit})
                </span>
              </div>

              <div className="space-y-1">
                {/* Baseline Bar */}
                <div className="h-3.5 w-full bg-surface-raised rounded-sm overflow-hidden flex" title={`${baselineLabel}: ${item.baseline} ${item.unit || unit}`}>
                  <div
                    style={{ width: `${Math.min(baselinePercent, 100)}%` }}
                    className="h-full bg-neutral-600 transition-all duration-300 rounded-sm"
                  />
                </div>

                {/* Optimized Bar */}
                <div className="h-4 w-full bg-surface-raised rounded-sm overflow-hidden flex" title={`${optimizedLabel}: ${item.optimized} ${item.unit || unit}`}>
                  <div
                    style={{ width: `${Math.min(optimizedPercent, 100)}%` }}
                    className="h-full bg-accent transition-all duration-300 rounded-sm shadow-[0_0_8px_rgba(94,234,212,0.25)]"
                  />
                </div>
              </div>

              {item.notes && (
                <div className="text-[11px] text-text-secondary pt-0.5">
                  &gt; {item.notes}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
