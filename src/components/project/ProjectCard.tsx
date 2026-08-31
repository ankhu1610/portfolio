"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/content/schemas/project.schema";
import { StatusDot } from "@/components/ui/StatusDot";
import { TechBadge } from "@/components/ui/TechBadge";
import { ArrowRight, Github } from "lucide-react";
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
        "group relative rounded-md bg-surface border border-border-subtle hover:border-accent/60 transition-all duration-fast flex flex-col justify-between overflow-hidden",
        isFlagship ? "p-6" : "p-4",
        className
      )}
    >
      <div>
        {/* Top Metadata Bar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <StatusDot status={project.status} />
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
            "font-display font-semibold text-text-primary group-hover:text-accent transition-colors",
            isFlagship ? "text-xl lg:text-2xl mb-2" : "text-lg mb-1.5"
          )}
        >
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Mini Architecture Feature Highlight (for flagship) */}
        {isFlagship && project.architecture.components && (
          <div className="mb-4 p-3 rounded-sm bg-surface-raised border border-border-subtle/70">
            <div className="text-[11px] font-mono text-accent uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Core System Architecture</span>
              <span className="text-text-secondary font-normal">From Scratch</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-text-secondary">
              {project.architecture.components.slice(0, 3).map((comp, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[11px] px-1.5 py-0.5 rounded-sm bg-base border border-border-subtle text-text-primary/90"
                >
                  {comp.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <TechBadge key={tag} label={tag} variant="outline" />
          ))}
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="flex items-center justify-between pt-3 border-t border-border-subtle/50 text-xs font-mono">
        <span className="text-text-secondary group-hover:text-text-primary transition-colors flex items-center gap-1">
          Read Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
