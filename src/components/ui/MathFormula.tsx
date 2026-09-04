import React from "react";
import katex from "katex";
import { cn } from "@/lib/utils";

interface MathFormulaProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export function MathFormula({ math, displayMode = false, className }: MathFormulaProps) {
  let html = "";
  try {
    html = katex.renderToString(math, {
      displayMode,
      throwOnError: false,
      output: "htmlAndMathml",
    });
  } catch {
    html = math;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center text-accent font-sans selection:bg-accent/20",
        displayMode ? "justify-center my-1 w-full text-sm sm:text-base" : "text-xs sm:text-sm",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
