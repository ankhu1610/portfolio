"use client";

import React from "react";
import { Printer } from "lucide-react";

export function ResumePrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-surface-raised hover:bg-surface border border-border-subtle hover:border-accent text-text-primary hover:text-accent font-mono text-xs transition-colors"
      aria-label="Print resume"
    >
      <Printer className="w-3.5 h-3.5 text-accent" />
      <span>Print / PDF</span>
    </button>
  );
}
