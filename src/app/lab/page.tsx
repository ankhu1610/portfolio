import React from "react";
import Link from "next/link";
import { getAllNotes, getAllExperiments, getAllProjects } from "@/lib/content-api";
import { NoteCard } from "@/components/lab/NoteCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { Terminal, BookOpen, Activity, Cpu, ArrowRight, CheckCircle2, FlaskConical, Layers } from "lucide-react";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

export const metadata = {
  title: "Lab",
  description: "The ML Systems Lab — Empirical benchmarks, ablation trials, and mathematical research notes.",
};

export default function LabPage() {
  const notes = getAllNotes();
  const experiments = getAllExperiments();
  const projects = getAllProjects();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>RESEARCH LAB NOTEBOOK // CENTRAL EVIDENCE LAYER</span>
        </div>

        <TypewriterHeading
          as="h1"
          className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight"
          segments={[
            { text: "The " },
            {
              text: "ML Systems Lab",
              className: "text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-300",
            },
          ]}
          speed={32}
        />

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          A standing research log for low-level experimentation, mathematical derivations, ablation studies, and hardware profiling runs that ground the core systems in empirical reality.
        </p>
      </div>

      {/* Lab Central Hub Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Research Notes Card */}
        <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-3 flex flex-col justify-between hover:border-accent/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent text-xs font-mono font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>RESEARCH NOTES ({notes.length})</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Mathematical derivations and deep dives into attention mechanics, guidance mathematics, and KV-cache geometries.
            </p>
          </div>
          <span className="text-xs font-mono text-text-secondary">
            {notes.length} Technical Notes Available
          </span>
        </div>

        {/* Experiment Logs Card */}
        <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-3 flex flex-col justify-between hover:border-accent-warm/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent-warm text-xs font-mono font-semibold">
              <Activity className="w-4 h-4" />
              <span>EXPERIMENT EXPLORER ({experiments.length})</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Controlled ablation trials testing hypotheses around training stability, RAG fault isolation, and LoRA transfer speed.
            </p>
          </div>
          <Link
            href="/lab/experiments"
            className="text-xs font-mono text-accent-warm hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>Open Experiment Explorer &rarr;</span>
          </Link>
        </div>

        {/* Benchmark Suite Card */}
        <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold">
              <Cpu className="w-4 h-4" />
              <span>BENCHMARK SUITE</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Comparative latency, VRAM, and tokens/sec profiling logs on NVIDIA workstation hardware.
            </p>
          </div>
          <Link
            href="/lab/benchmarks"
            className="text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>View Benchmark Dashboard &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Highlight Empirical Evidence Across Systems */}
      <section className="space-y-4">
        <div className="border-b border-border-subtle pb-2">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
            VERIFIED EXPERIMENTAL METRICS
          </span>
          <h2 className="text-xl font-display font-bold text-text-primary">
            Key Systems Metrics at a Glance
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard
            label="Inference Decode"
            value="84.6 tok/s"
            delta="+280%"
            context="LLM From Scratch with pre-allocated KV-cache"
          />
          <MetricCard
            label="RAG Diagnostic F1"
            value="91.8%"
            delta="+27.3% vs LLM"
            context="RAGDoctor fault isolation on 245 controlled cases"
          />
          <MetricCard
            label="LoRA Hot-Swap"
            value="85 ms"
            delta="-97.4%"
            context="ProductStudio AI in-place weight delta fusion"
          />
          <MetricCard
            label="Sequential Recall@10"
            value="34.2%"
            delta="+131% vs MF"
            context="NextSense SASRec causal self-attention"
          />
        </div>
      </section>

      {/* Recent Experiments Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border-subtle pb-2">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
              EMPIRICAL TRIALS
            </span>
            <h2 className="text-xl font-display font-bold text-text-primary">
              Recent Experiment Logs
            </h2>
          </div>
          <Link
            href="/lab/experiments"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            <span>Explore all {experiments.length} trials &rarr;</span>
          </Link>
        </div>

        <div className="space-y-3">
          {experiments.map((exp) => (
            <div
              key={exp.slug}
              className="p-5 rounded-lg bg-surface border border-border-subtle space-y-2 hover:border-border-subtle/80 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base font-display font-semibold text-text-primary">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-400/20 uppercase font-semibold text-[10px]">
                    {exp.status}
                  </span>
                  <span>{exp.date}</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong className="text-accent-warm font-mono mr-1">[HYPOTHESIS]:</strong>
                {exp.hypothesis}
              </p>
              <div className="pt-1 flex items-center justify-between text-xs font-mono">
                <span className="text-text-secondary">Hardware: {exp.setup.hardware}</span>
                <Link
                  href={`/lab/experiments#${exp.slug}`}
                  className="text-accent hover:underline flex items-center gap-1"
                >
                  <span>Read Log Data &rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Notes Grid */}
      <section className="space-y-4">
        <div className="border-b border-border-subtle pb-2">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-0.5">
            THEORETICAL DERIVATIONS
          </span>
          <h2 className="text-xl font-display font-bold text-text-primary">
            Research Notes &amp; Technical Analysis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}
