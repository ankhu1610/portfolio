"use client";

import React, { useState } from "react";
import { Maximize2, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramContainerProps {
  svgPath: string;
  caption: string;
  alt: string;
  className?: string;
}

export function ArchitectureDiagramContainer({
  svgPath,
  caption,
  alt,
  className,
}: ArchitectureDiagramContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <figure className={cn("my-6 rounded-lg border border-border-subtle bg-surface overflow-hidden", className)}>
      <div className="relative group p-2 sm:p-4 bg-surface-raised flex items-center justify-center min-h-[280px]">
        {/* Diagram Image / Object */}
        <div className="w-full max-w-4xl overflow-hidden flex items-center justify-center">
          <img
            src={svgPath}
            alt={alt}
            className="w-full h-auto object-contain max-h-[460px] rounded"
            loading="lazy"
          />
        </div>

        {/* Fullscreen Trigger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-3 right-3 p-2 rounded-md bg-surface/80 hover:bg-surface border border-border-subtle text-text-secondary hover:text-accent transition-colors shadow-sm backdrop-blur flex items-center gap-1.5 text-xs font-mono"
          aria-label="Expand architecture diagram"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Expand</span>
        </button>
      </div>

      <figcaption className="p-3.5 text-xs font-mono text-text-secondary border-t border-border-subtle flex items-start gap-2 bg-surface">
        <span className="text-accent font-semibold flex-shrink-0">FIG.01 //</span>
        <span>{caption}</span>
      </figcaption>

      {/* Fullscreen Lightbox Modal */}
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
              src={svgPath}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-border-subtle shadow-2xl"
            />
          </div>
        </div>
      )}
    </figure>
  );
}
