"use client";

import React, { useState } from "react";
import { Experience } from "@/content/schemas/experience.schema";
import { TechBadge } from "./TechBadge";
import { ChevronDown, GraduationCap, Briefcase, ShieldCheck, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  items: Experience[];
  condensed?: boolean;
}

export function Timeline({ items, condensed = false }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getDomainIcon = (domain: Experience["domain"]) => {
    switch (domain) {
      case "ml_research":
        return <Cpu className="w-3.5 h-3.5 text-accent" />;
      case "cybersecurity":
        return <ShieldCheck className="w-3.5 h-3.5 text-accent-warm" />;
      case "robotics":
        return <Cpu className="w-3.5 h-3.5 text-accent" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-text-secondary" />;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-border-subtle">
      {items.map((item) => {
        const isExpanded = expandedId === item.id || !condensed;

        return (
          <div key={item.id} className="relative group">
            {/* Timeline Dot */}
            <div
              className={cn(
                "absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 bg-base transition-colors",
                item.isCurrent
                  ? "border-accent bg-accent"
                  : "border-border-subtle group-hover:border-accent"
              )}
            />

            <div className="p-4 rounded-md bg-surface border border-border-subtle hover:border-accent/40 transition-all">
              <div
                onClick={() => condensed && toggleExpand(item.id)}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
                  condensed && "cursor-pointer"
                )}
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="p-1 rounded-sm bg-surface-raised border border-border-subtle">
                      {getDomainIcon(item.domain)}
                    </span>
                    <h4 className="text-base font-semibold text-text-primary">
                      {item.role}
                    </h4>
                    {item.isCurrent && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-accent/10 text-accent border border-accent/30 uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-text-secondary mt-0.5">
                    <span className="font-medium text-text-primary/90">{item.organization}</span>
                    <span className="mx-2 text-border-subtle">·</span>
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono text-text-secondary">
                  <span>{item.duration}</span>
                  {condensed && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-fast",
                        isExpanded && "rotate-180 text-accent"
                      )}
                    />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-border-subtle/50 text-sm space-y-3">
                  <p className="text-text-primary leading-relaxed">{item.summary}</p>

                  <ul className="space-y-1.5 list-disc list-inside text-text-secondary text-sm">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="text-text-secondary/90">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {item.credentialOrVerification && (
                    <div className="text-xs font-mono text-text-secondary/80 bg-surface-raised p-2 rounded-sm border border-border-subtle flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                      <span>{item.credentialOrVerification}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.technologies.map((tech) => (
                      <TechBadge key={tech} label={tech} variant="outline" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
