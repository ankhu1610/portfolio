import React from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/content-api";
import { ExperimentGraph } from "@/components/project/ExperimentGraph";
import { MetricCard } from "@/components/ui/MetricCard";
import { ArrowLeft, Cpu, HardDrive, Zap, BarChart3 } from "lucide-react";

export default function BenchmarksPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Back Button */}
      <div className="text-xs font-mono text-text-secondary pb-4 border-b border-border-subtle">
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Lab</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-emerald-400">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>SYSTEMS PROFILING // HARDWARE BENCHMARKS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
          Benchmark Suite
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Aggregated performance measurements, inference speedup metrics, VRAM allocation ceilings, and FLOPs efficiency across all from-scratch ML systems.
        </p>
      </div>

      {/* Top Level Metric Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Transformer Peak Throughput"
          value="88.4 tok/s"
          delta="+280%"
          context="Static KV-Cache on RTX 4090"
        />
        <MetricCard
          label="Diffusion Sampling Latency"
          value="1.42s"
          delta="20x speedup"
          context="50-step DDIM (512x512 resolution)"
        />
        <MetricCard
          label="KV-Cache Memory Reduction"
          value="75%"
          delta="-75% VRAM"
          context="Grouped-Query Attention (GQA)"
        />
        <MetricCard
          label="VAE Compression Ratio"
          value="48x"
          delta="Spatial reduction"
          context="Latent vs pixel space FLOPs"
        />
      </div>

      {/* Project Benchmark Graphs */}
      <div className="space-y-10 max-w-4xl">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="p-6 rounded-lg bg-surface border border-border-subtle space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                  SYSTEM PROFILING // {project.domain}
                </span>
                <h2 className="text-xl font-display font-bold text-text-primary">
                  {project.title}
                </h2>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="text-xs font-mono text-accent hover:underline"
              >
                View Case Study &rarr;
              </Link>
            </div>

            {project.experiments.benchmarkData && (
              <ExperimentGraph
                title={`${project.title} — Scaling & Efficiency Curve`}
                data={project.experiments.benchmarkData}
                baselineLabel="Unoptimized Baseline"
                optimizedLabel="Our Custom Kernel Implementation"
              />
            )}

            {project.benchmarks && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                  Detailed Comparative Metrics
                </span>
                <div className="rounded border border-border-subtle overflow-hidden">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-surface-raised border-b border-border-subtle text-text-secondary">
                      <tr>
                        <th className="p-3">Measurement</th>
                        <th className="p-3 text-accent">Our Implementation</th>
                        <th className="p-3">Reference</th>
                        <th className="p-3">Relative Gain</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle bg-surface">
                      {project.benchmarks.map((b, idx) => (
                        <tr key={idx} className="hover:bg-surface-raised/40">
                          <td className="p-3 font-medium text-text-primary">{b.name}</td>
                          <td className="p-3 text-accent font-semibold">{b.ours}</td>
                          <td className="p-3 text-text-secondary">{b.baseline}</td>
                          <td className="p-3 font-semibold text-emerald-400">{b.speedup}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
