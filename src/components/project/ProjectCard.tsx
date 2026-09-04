"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/content/schemas/project.schema";
import { StatusDot } from "@/components/ui/StatusDot";
import { TechBadge } from "@/components/ui/TechBadge";
import { ArrowRight, Github, HelpCircle, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  variant?: "flagship" | "compact";
  className?: string;
}

export function ProjectCard({
  project,
  variant = "flagship",
  className,
}: ProjectCardProps) {
  const isFlagship = variant === "flagship";

  return (
    <div
      className={cn(
        "group relative rounded-lg bg-surface border border-border-subtle hover:border-accent/60 transition-all duration-fast flex flex-col justify-between overflow-hidden",
        isFlagship ? "p-6 sm:p-7" : "p-4 sm:p-5",
        className
      )}
    >
      <div>
        {/* Top Metadata Bar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <StatusDot
              status={project.status}
              verificationStatus={project.verificationStatus}
            />
            <span className="text-xs font-mono text-text-secondary uppercase">
              {project.domain}
            </span>
          </div>
          <span className="text-xs font-mono text-text-secondary">
            {project.duration}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-display font-bold text-text-primary group-hover:text-accent transition-colors",
            isFlagship ? "text-xl lg:text-2xl mb-2" : "text-lg mb-1.5"
          )}
        >
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          {project.summary}
        </p>

        {/* Research Question Callout */}
        {project.researchQuestion && (
          <div className="mb-4 p-2.5 rounded bg-surface-raised border-l-2 border-l-accent border-y border-r border-border-subtle/80 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-accent text-[11px] font-semibold uppercase tracking-wider mb-1">
              <HelpCircle className="w-3 h-3" />
              <span>Research Question</span>
            </div>
            <p className="text-text-primary line-clamp-2 italic text-[11.5px] font-medium leading-relaxed">
              &gt; {project.researchQuestion}
            </p>
          </div>
        )}

        {/* Mini Architecture Feature Highlight (for flagship) */}
        {isFlagship && project.architecture.components && (
          <div className="mb-4 p-3 rounded-md bg-surface-raised/60 border border-border-subtle/70">
            <div className="text-[11px] font-mono text-accent uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Core System Architecture</span>
              <span className="text-text-secondary font-normal">From Scratch</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-text-secondary">
              {project.architecture.components.slice(0, 3).map((comp, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-base border border-border-subtle text-text-primary/90"
                >
                  {comp.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <TechBadge key={tag} label={tag} variant="outline" />
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] font-mono text-text-secondary self-center">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="flex items-center justify-between pt-3 border-t border-border-subtle/60 text-xs font-mono">
        <span className="text-accent group-hover:text-accent transition-colors flex items-center gap-1 font-semibold">
          Explore Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>

        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 text-text-secondary hover:text-accent p-1 transition-colors"
            aria-label={`GitHub repo for ${project.title}`}
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
