"use client";

import React, { useState } from "react";
import { getAllProjects } from "@/lib/content-api";
import { ProjectCard } from "@/components/project/ProjectCard";
import { TechBadge } from "@/components/ui/TechBadge";
import { TAXONOMY } from "@/content/_taxonomy";
import { Terminal, Filter } from "lucide-react";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  const domains = [
    { key: "all", label: "All Projects" },
    { key: "llm", label: "LLMs & Transformers" },
    { key: "diffusion", label: "Diffusion Models" },
    { key: "systems", label: "Systems & Evaluation" },
    { key: "rec-sys", label: "Sequential RecSys" },
    { key: "security", label: "Cybersecurity & IAM" },
  ];

  const filteredProjects =
    selectedDomain === "all"
      ? allProjects
      : allProjects.filter((p) => p.domain === selectedDomain);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>PROJECT REPOSITORY // FIRST-PRINCIPLES SYSTEMS</span>
        </div>

        <TypewriterHeading
          as="h1"
          className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight"
          segments={[
            { text: "Systems " },
            {
              text: "& Architectures",
              className: "text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-300",
            },
          ]}
          speed={32}
        />

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Complete end-to-end architectures implemented from the raw mathematical equations and low-level kernels. Every project contains an architecture diagram, engineering bottlenecks, and real benchmark numbers.
        </p>
      </div>

      {/* Filter Bar (Phase 7.5) */}
      <div className="p-4 rounded-md bg-surface border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
          <Filter className="w-3.5 h-3.5 text-accent" />
          <span>Domain Filter:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <TechBadge
              key={d.key}
              label={d.label}
              active={selectedDomain === d.key}
              onClick={() => setSelectedDomain(d.key)}
            />
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="flagship" />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-md bg-surface border border-border-subtle text-text-secondary font-mono text-sm">
          No projects currently found matching domain &quot;{selectedDomain}&quot;.
        </div>
      )}
    </div>
  );
}
