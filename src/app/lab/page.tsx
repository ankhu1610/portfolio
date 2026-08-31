import React from "react";
import Link from "next/link";
import { getAllNotes, getAllExperiments } from "@/lib/content-api";
import { NoteCard } from "@/components/lab/NoteCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { Terminal, BookOpen, Activity, Cpu, ArrowRight } from "lucide-react";

export default function LabPage() {
  const notes = getAllNotes();
  const experiments = getAllExperiments();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>RESEARCH LAB NOTEBOOK // EMPIRICAL LOGS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
          The ML Systems Lab
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          A standing research log for low-level experimentation, mathematical derivations, ablation studies, and hardware profiling runs that support the core systems.
        </p>
      </div>

      {/* Lab Category Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-2">
          <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>RESEARCH NOTES ({notes.length})</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Mathematical derivations and deep dives into attention mechanics and guidance.
          </p>
        </div>

        <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-2">
          <div className="flex items-center gap-2 text-accent-warm text-xs font-mono font-semibold">
            <Activity className="w-4 h-4" />
            <span>EXPERIMENT LOGS ({experiments.length})</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Ablation trials testing hypotheses around training stability and preference optimization.
          </p>
          <Link
            href="/lab/experiments"
            className="text-xs font-mono text-accent-warm hover:underline inline-flex items-center gap-1"
          >
            View Experiments &rarr;
          </Link>
        </div>

        <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
            <Cpu className="w-4 h-4" />
            <span>BENCHMARK SUITE</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Latency, VRAM, and tokens/sec profiling logs on NVIDIA hardware.
          </p>
          <Link
            href="/lab/benchmarks"
            className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            View Benchmarks &rarr;
          </Link>
        </div>
      </div>

      {/* Research Notes List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
            Technical Research Notes
          </h2>
          <span className="text-xs font-mono text-text-secondary">
            {notes.length} Active Notes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>

      {/* Experiments Highlights */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary">
            Empirical Convergence Trials
          </h2>
          <Link
            href="/lab/experiments"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            <span>All Experiments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {experiments.map((exp) => (
            <div
              key={exp.slug}
              className="p-5 rounded-md bg-surface border border-border-subtle space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-text-primary">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                  <span className="px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 uppercase">
                    {exp.status}
                  </span>
                  <span>{exp.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-text-secondary">
                <div className="p-3 rounded bg-surface-raised border border-border-subtle space-y-1">
                  <span className="text-accent uppercase font-semibold block">Objective:</span>
                  <p className="text-text-primary font-sans">{exp.objective}</p>
                </div>
                <div className="p-3 rounded bg-surface-raised border border-border-subtle space-y-1">
                  <span className="text-accent-warm uppercase font-semibold block">Hypothesis:</span>
                  <p className="text-text-primary font-sans">{exp.hypothesis}</p>
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed bg-base p-3 rounded border border-border-subtle">
                <strong className="text-text-primary block font-mono mb-1">Result Summary:</strong>
                {exp.resultsSummary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
