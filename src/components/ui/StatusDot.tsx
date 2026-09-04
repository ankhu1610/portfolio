import React from "react";
import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "active" | "paused" | "archived" | "shipped";
  verificationStatus?: "verify" | "verified";
  className?: string;
  showLabel?: boolean;
}

export function StatusDot({
  status,
  verificationStatus,
  className,
  showLabel = true,
}: StatusDotProps) {
  const getDotColor = () => {
    switch (status) {
      case "active":
        return "bg-accent";
      case "paused":
        return "bg-amber-600 dark:bg-amber-400";
      case "archived":
        return "bg-neutral-500 dark:bg-neutral-400";
      case "shipped":
        return "bg-emerald-600 dark:bg-emerald-400";
      default:
        return "bg-accent";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "active":
        return "text-accent font-semibold";
      case "paused":
        return "text-amber-800 dark:text-amber-300 font-semibold";
      case "archived":
        return "text-text-secondary font-medium";
      case "shipped":
        return "text-emerald-700 dark:text-emerald-400 font-semibold";
      default:
        return "text-accent font-semibold";
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case "active":
        return "bg-accent/10 border-accent/30";
      case "paused":
        return "bg-amber-500/10 border-amber-500/30 dark:bg-amber-400/10 dark:border-amber-400/30";
      case "archived":
        return "bg-surface-raised border-border-subtle";
      case "shipped":
        return "bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-400/10 dark:border-emerald-400/30";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-mono border",
        getStatusBg(),
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {status === "active" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", getDotColor())}></span>
      </span>
      {showLabel && (
        <span className={cn("capitalize flex items-center gap-1", getTextColor())}>
          <span>{status}</span>
          {verificationStatus === "verify" && (
            <span className="text-text-secondary font-mono text-[10px] lowercase font-normal opacity-90">
              / verify
            </span>
          )}
        </span>
      )}
    </span>
  );
}
