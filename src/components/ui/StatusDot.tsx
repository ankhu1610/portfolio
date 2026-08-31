import React from "react";
import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "active" | "paused" | "archived" | "shipped";
  className?: string;
  showLabel?: boolean;
}

export function StatusDot({ status, className, showLabel = true }: StatusDotProps) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-[#5EEAD4] text-[#5EEAD4]";
      case "paused":
        return "bg-amber-400 text-amber-400";
      case "archived":
        return "bg-[#6B6D74] text-[#6B6D74]";
      case "shipped":
        return "bg-emerald-400 text-emerald-400";
      default:
        return "bg-[#5EEAD4] text-[#5EEAD4]";
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case "active":
        return "bg-[#5EEAD4]/10 border-[#5EEAD4]/30";
      case "paused":
        return "bg-amber-400/10 border-amber-400/30";
      case "archived":
        return "bg-neutral-500/10 border-neutral-500/30";
      case "shipped":
        return "bg-emerald-400/10 border-emerald-400/30";
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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EEAD4] opacity-75"></span>
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", getStatusColor().split(" ")[0])}></span>
      </span>
      {showLabel && (
        <span className={cn("font-medium capitalize", getStatusColor().split(" ")[1])}>
          {status}
        </span>
      )}
    </span>
  );
}
