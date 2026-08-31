"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  variant?: "filled" | "outline";
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TechBadge({
  label,
  variant = "outline",
  active = false,
  onClick,
  className,
}: TechBadgeProps) {
  const isClickable = !!onClick;

  return (
    <span
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono rounded-sm transition-colors duration-fast select-none",
        variant === "outline"
          ? "border border-border-subtle bg-surface/50 text-text-secondary hover:border-accent hover:text-text-primary"
          : "bg-surface-raised text-text-primary border border-border-subtle",
        active && "bg-accent/15 border-accent text-accent font-medium shadow-sm",
        isClickable && "cursor-pointer active:scale-95",
        className
      )}
    >
      {label}
    </span>
  );
}
