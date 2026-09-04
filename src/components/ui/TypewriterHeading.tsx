"use client";

import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface TextSegment {
  text: string;
  className?: string;
}

interface TypewriterHeadingProps {
  segments?: TextSegment[];
  text?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  className?: string;
  speed?: number; // ms per character
  delay?: number; // initial delay before typing starts
  cursor?: boolean;
}

export function TypewriterHeading({
  segments: rawSegments,
  text,
  as: Component = "h1",
  className,
  speed = 32,
  delay = 80,
  cursor = true,
}: TypewriterHeadingProps) {
  const segments = useMemo<TextSegment[]>(() => {
    if (rawSegments && rawSegments.length > 0) return rawSegments;
    if (text) return [{ text }];
    return [];
  }, [rawSegments, text]);

  const fullText = useMemo(() => segments.map((s) => s.text).join(""), [segments]);
  const totalLength = fullText.length;

  const [charCount, setCharCount] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    // Respect accessibility prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCharCount(totalLength);
      setIsTypingComplete(true);
      return;
    }

    setCharCount(0);
    setIsTypingComplete(false);

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCharCount((prev) => {
          if (prev + 1 >= totalLength) {
            clearInterval(interval);
            setIsTypingComplete(true);
            return totalLength;
          }
          return prev + 1;
        });
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [totalLength, speed, delay]);

  // Compute slice for each segment based on current charCount
  let remainingChars = charCount;
  const renderedSegments = segments.map((seg, idx) => {
    const charsForSegment = Math.max(0, Math.min(seg.text.length, remainingChars));
    remainingChars -= charsForSegment;
    const displayText = seg.text.slice(0, charsForSegment);

    return (
      <span key={idx} className={seg.className}>
        {displayText}
      </span>
    );
  });

  return (
    <Component
      aria-label={fullText}
      className={cn("inline-block tracking-tight", className)}
    >
      {renderedSegments}
      {cursor && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block w-[3px] h-[0.82em] bg-accent ml-1 align-baseline transition-opacity",
            isTypingComplete ? "animate-cursor opacity-80" : "opacity-100"
          )}
        />
      )}
    </Component>
  );
}
