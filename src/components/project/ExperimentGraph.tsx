"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface DataPoint {
  xLabel: string;
  baseline: number;
  optimized: number;
  unit?: string;
}

interface ExperimentGraphProps {
  title: string;
  data: DataPoint[];
  baselineLabel?: string;
  optimizedLabel?: string;
  unit?: string;
  className?: string;
}

export function ExperimentGraph({
  title,
  data,
  baselineLabel = "Standard / Baseline",
  optimizedLabel = "Our Implementation (Optimized)",
  unit = "tokens/s",
  className,
}: ExperimentGraphProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Compute maximum for scale
  const allValues = data.flatMap((d) => [d.baseline, d.optimized]);
  const maxValue = Math.max(...allValues, 1);

  return (
    <div className={cn("p-5 rounded-lg bg-surface border border-border-subtle my-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
            BENCHMARK LOG
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
      <div className="space-y-4 pt-2">
        {data.map((item, idx) => {
          const baselinePercent = (item.baseline / maxValue) * 100;
          const optimizedPercent = (item.optimized / maxValue) * 100;
          const speedupRatio = (item.optimized / (item.baseline || 1)).toFixed(1);

          return (
            <div
              key={idx}
              className="space-y-1.5 text-xs font-mono"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center justify-between text-text-secondary">
                <span className="font-medium text-text-primary">{item.xLabel}</span>
                <span className="text-accent">
                  +{speedupRatio}x speedup ({item.optimized} vs {item.baseline} {item.unit || unit})
                </span>
              </div>

              <div className="space-y-1">
                {/* Baseline Bar */}
                <div className="h-3.5 w-full bg-surface-raised rounded-sm overflow-hidden flex">
                  <div
                    style={{ width: `${baselinePercent}%` }}
                    className="h-full bg-neutral-600 transition-all duration-300 rounded-sm"
                  />
                </div>

                {/* Optimized Bar */}
                <div className="h-4 w-full bg-surface-raised rounded-sm overflow-hidden flex">
                  <div
                    style={{ width: `${optimizedPercent}%` }}
                    className="h-full bg-accent transition-all duration-300 rounded-sm shadow-[0_0_8px_rgba(94,234,212,0.3)]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-[11px] font-mono text-text-secondary">
        <span>Hardware: NVIDIA RTX 4090 · CUDA 12.4 · PyTorch 2.4</span>
        <span className="text-accent">Normalized Throughput Metric</span>
      </div>
    </div>
  );
}
