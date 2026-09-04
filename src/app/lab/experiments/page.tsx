"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getAllExperiments } from "@/lib/content-api";
import { ArrowLeft, Activity, CheckCircle2, Cpu, Filter, Search, Sparkles, Terminal } from "lucide-react";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";
import { cn } from "@/lib/utils";

export default function ExperimentsPage() {
  const experiments = getAllExperiments();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  const domains = [
    { key: "all", label: "All Trials" },
    { key: "llm", label: "LLM & Alignment" },
    { key: "systems", label: "RAG & Evaluation" },
    { key: "diffusion", label: "Diffusion & Hot-Swapping" },
  ];

  const filteredExperiments = experiments.filter((exp) => {
    // Domain match logic
    const isLlm = exp.slug.includes("sft") || exp.slug.includes("rlhf") || exp.title.toLowerCase().includes("transformer");
    const isSystems = exp.slug.includes("rag") || exp.title.toLowerCase().includes("rag");
    const isDiffusion = exp.slug.includes("lora") || exp.title.toLowerCase().includes("diffusion");

    let matchesDomain = true;
    if (selectedDomain === "llm") matchesDomain = isLlm;
    else if (selectedDomain === "systems") matchesDomain = isSystems;
    else if (selectedDomain === "diffusion") matchesDomain = isDiffusion;

    // Search query match
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      exp.title.toLowerCase().includes(q) ||
      exp.objective.toLowerCase().includes(q) ||
      exp.hypothesis.toLowerCase().includes(q) ||
      exp.setup.hardware.toLowerCase().includes(q);

    return matchesDomain && matchesQuery;
  });

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Back Button */}
      <div className="text-xs font-mono text-text-secondary pb-4 border-b border-border-subtle">
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ML Systems Lab Hub</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-accent-warm">
          <Activity className="w-3.5 h-3.5" />
          <span>EXPERIMENT EXPLORER // REPRODUCIBLE HYPOTHESIS TESTING</span>
        </div>

        <TypewriterHeading
          as="h1"
          className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight"
          segments={[
            { text: "Empirical " },
            {
              text: "Experiment Logs",
              className: "text-transparent bg-clip-text bg-gradient-to-r from-accent-warm to-amber-300",
            },
          ]}
          speed={32}
        />

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Structured telemetry of machine learning experiments: hypothesis formulations, controlled ablation setups, loss trajectories, and hardware profiling logs.
        </p>
      </div>

      {/* Interactive Filter Bar */}
      <div className="p-4 rounded-lg bg-surface border border-border-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Domain Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-text-secondary flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-accent" />
              Filter:
            </span>
            {domains.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDomain(d.key)}
                className={cn(
                  "px-3 py-1 rounded text-xs font-mono transition-colors border",
                  selectedDomain === d.key
                    ? "bg-accent/15 border-accent text-accent font-semibold"
                    : "bg-surface-raised border-border-subtle text-text-secondary hover:text-text-primary"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trials or hardware..."
              className="w-full pl-9 pr-3 py-1.5 rounded bg-surface-raised border border-border-subtle text-xs font-mono text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Experiments List */}
      <div className="space-y-10 max-w-4xl">
        {filteredExperiments.length > 0 ? (
          filteredExperiments.map((exp) => (
            <article
              id={exp.slug}
              key={exp.slug}
              className="p-6 sm:p-8 rounded-lg bg-surface border border-border-subtle space-y-6 scroll-mt-28"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border-subtle pb-4">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                    TRIAL // {exp.slug}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
                    {exp.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-text-secondary flex-shrink-0">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-400/20 uppercase font-semibold">
                    {exp.status}
                  </span>
                  <span>{exp.date}</span>
                </div>
              </div>

              {/* Objective & Hypothesis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded bg-surface-raised border border-border-subtle space-y-1.5">
                  <span className="text-accent uppercase tracking-wider font-semibold block">
                    [OBJECTIVE]
                  </span>
                  <p className="text-text-secondary leading-relaxed font-sans text-xs">
                    {exp.objective}
                  </p>
                </div>

                <div className="p-4 rounded bg-surface-raised border border-accent-warm/30 space-y-1.5">
                  <span className="text-accent-warm uppercase tracking-wider font-semibold block">
                    [HYPOTHESIS]
                  </span>
                  <p className="text-text-secondary leading-relaxed font-sans text-xs">
                    {exp.hypothesis}
                  </p>
                </div>
              </div>

              {/* Experimental Setup Matrix */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                  HARDWARE ENVIRONMENT &amp; EXPERIMENTAL CONTROLS
                </span>
                <div className="p-4 rounded bg-surface-raised border border-border-subtle text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  <div>
                    <span className="text-text-secondary">Hardware: </span>
                    <span className="text-text-primary">{exp.setup.hardware}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Framework: </span>
                    <span className="text-text-primary">{exp.setup.framework}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Dataset: </span>
                    <span className="text-text-primary">{exp.setup.dataset}</span>
                  </div>
                  {Object.entries(exp.setup.parameters).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-text-secondary">{k}: </span>
                      <span className="text-text-primary">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Points Table */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                  MEASURED METRIC TRAJECTORY
                </span>
                <div className="rounded border border-border-subtle overflow-hidden">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-surface-raised border-b border-border-subtle text-text-secondary">
                      <tr>
                        <th className="p-2.5">Trial Step / Variant</th>
                        <th className="p-2.5 text-accent">
                          {exp.dataPoints[0]?.labelA || "Metric A"}
                        </th>
                        <th className="p-2.5 text-accent-warm">
                          {exp.dataPoints[0]?.labelB || "Metric B"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle bg-surface">
                      {exp.dataPoints.map((pt, idx) => (
                        <tr key={idx} className="hover:bg-surface-raised/40">
                          <td className="p-2.5 font-medium text-text-primary">{pt.stepOrEpoch}</td>
                          <td className="p-2.5 text-accent">{pt.metricA}</td>
                          <td className="p-2.5 text-accent-warm">{pt.metricB}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Results Summary */}
              <div className="p-4 rounded bg-surface-raised border border-border-subtle text-xs sm:text-sm text-text-secondary leading-relaxed space-y-1">
                <strong className="text-text-primary font-mono text-xs uppercase block">
                  Results Interpretation:
                </strong>
                <p>{exp.resultsSummary}</p>
              </div>

              {/* Conclusions List */}
              <div className="space-y-2 pt-2 border-t border-border-subtle">
                <span className="text-xs font-mono text-accent uppercase tracking-wider block font-semibold">
                  EMPIRICAL TAKEAWAYS
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary leading-relaxed pl-2 border-l-2 border-accent">
                  {exp.conclusions.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))
        ) : (
          <div className="p-12 text-center rounded-lg bg-surface border border-border-subtle text-text-secondary font-mono text-sm">
            No experiment logs found matching query &quot;{searchQuery}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
