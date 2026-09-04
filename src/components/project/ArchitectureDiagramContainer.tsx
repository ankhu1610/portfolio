"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Maximize2, X, Info, ExternalLink, Activity, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";
import { ArchitectureComponent } from "@/content/schemas/project.schema";

interface ArchitectureDiagramContainerProps {
  svgPath: string;
  caption: string;
  alt: string;
  components?: ArchitectureComponent[];
  className?: string;
}

export function ArchitectureDiagramContainer({
  svgPath,
  caption,
  alt,
  components = [],
  className,
}: ArchitectureDiagramContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const selectedComponent = components[selectedIdx] || components[0];

  return (
    <figure className={cn("my-6 rounded-lg border border-border-subtle bg-surface overflow-hidden space-y-0", className)}>
      {/* Visual SVG Diagram Canvas */}
      <div className="relative group p-3 sm:p-6 bg-surface-raised flex flex-col items-center justify-center min-h-[300px]">
        {/* Diagram Image / SVG */}
        <div className="w-full max-w-4xl overflow-hidden flex items-center justify-center">
          <img
            src={getAssetPath(svgPath)}
            alt={alt}
            className="w-full h-auto object-contain max-h-[460px] rounded"
            loading="lazy"
          />
        </div>

        {/* Fullscreen Trigger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-3 right-3 p-2 rounded-md bg-surface/85 hover:bg-surface border border-border-subtle text-text-secondary hover:text-accent transition-colors shadow-sm backdrop-blur flex items-center gap-1.5 text-xs font-mono"
          aria-label="Expand architecture diagram in high-resolution zoom"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Zoom Diagram</span>
        </button>

        {/* Subtitle Caption Bar */}
        <div className="w-full text-center mt-3 pt-3 border-t border-border-subtle/60 text-xs font-mono text-text-secondary flex items-center justify-center gap-2">
          <span className="text-accent font-semibold">FIG.01 //</span>
          <span>{caption}</span>
        </div>
      </div>

      {/* Interactive Node Inspector (Requirement 6) */}
      {components && components.length > 0 && (
        <div className="border-t border-border-subtle bg-surface p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Layers className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider">
                INTERACTIVE NODE INSPECTOR // SELECT A SYSTEM COMPONENT
              </span>
            </div>
            <span className="text-xs font-mono text-text-secondary">
              Tap or click a node to view low-level implementation details &amp; empirical links
            </span>
          </div>

          {/* Interactive Node Selector Pills */}
          <div className="flex flex-wrap gap-2 pt-1" role="tablist" aria-label="Architecture Components">
            {components.map((comp, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`node-panel-${idx}`}
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    "px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 text-left border",
                    isSelected
                      ? "bg-accent/15 border-accent text-accent font-semibold shadow-[0_0_10px_rgba(94,234,212,0.15)]"
                      : "bg-surface-raised border-border-subtle text-text-secondary hover:text-text-primary hover:border-neutral-500"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                  <span>{comp.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card */}
          {selectedComponent && (
            <div
              id={`node-panel-${selectedIdx}`}
              role="tabpanel"
              className="p-4 sm:p-5 rounded-md bg-surface-raised border border-border-subtle space-y-3 transition-all animate-fadeIn"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle/80 pb-2">
                <div>
                  <span className="text-[11px] font-mono text-accent uppercase tracking-wider block">
                    LAYER {selectedIdx + 1} OF {components.length} // SYSTEM COMPONENT
                  </span>
                  <h4 className="text-base font-display font-bold text-text-primary mt-0.5">
                    {selectedComponent.name}
                  </h4>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary bg-surface px-2.5 py-1 rounded border border-border-subtle w-fit">
                  <span className="text-text-primary font-medium">{selectedComponent.role}</span>
                </div>
              </div>

              {/* Implementation Detail */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {selectedComponent.implementationDetail}
              </p>

              {/* Cross-Artifact Research Links (Requirement 6 & 15) */}
              {(selectedComponent.relevantExperimentSlug ||
                selectedComponent.relevantNoteSlug ||
                selectedComponent.benchmarkLink) && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle/60 text-xs font-mono">
                  <span className="text-text-secondary text-[11px] uppercase mr-1">Verified Evidence:</span>

                  {selectedComponent.relevantExperimentSlug && (
                    <Link
                      href={`/lab/experiments#${selectedComponent.relevantExperimentSlug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-accent-warm/10 border border-accent-warm/30 text-accent-warm hover:bg-accent-warm/20 transition-colors"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Relevant Experiment &rarr;</span>
                    </Link>
                  )}

                  {selectedComponent.relevantNoteSlug && (
                    <Link
                      href={`/lab/notes/${selectedComponent.relevantNoteSlug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Research Note &rarr;</span>
                    </Link>
                  )}

                  {selectedComponent.benchmarkLink && (
                    <Link
                      href={selectedComponent.benchmarkLink}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/30 dark:border-emerald-400/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 dark:hover:bg-emerald-400/20 transition-colors font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Benchmark Suite &rarr;</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Accessible Text Alternative (Requirement 6) */}
          <details className="text-xs font-mono text-text-secondary pt-2">
            <summary className="cursor-pointer hover:text-accent transition-colors select-none py-1">
              [+] View accessible text breakdown of all architecture components
            </summary>
            <ol className="list-decimal list-inside space-y-2 pl-2 pt-2 text-text-primary/90 leading-relaxed border-l-2 border-border-subtle mt-2 ml-1">
              {components.map((c, i) => (
                <li key={i}>
                  <strong className="text-accent">{c.name}:</strong> {c.role} — {c.implementationDetail}
                </li>
              ))}
            </ol>
          </details>
        </div>
      )}

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between pb-4 max-w-7xl mx-auto w-full">
            <div className="text-sm font-mono text-text-primary">
              <span className="text-accent mr-2">[ZOOM VIEW]</span>
              {caption}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md bg-surface border border-border-subtle text-text-primary hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center overflow-auto max-w-7xl mx-auto w-full p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getAssetPath(svgPath)}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-border-subtle shadow-2xl"
            />
          </div>
        </div>
      )}
    </figure>
  );
}
