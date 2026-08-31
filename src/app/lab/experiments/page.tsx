import React from "react";
import Link from "next/link";
import { getAllExperiments } from "@/lib/content-api";
import { ArrowLeft, Activity, CheckCircle2, Cpu } from "lucide-react";

export default function ExperimentsPage() {
  const experiments = getAllExperiments();

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-accent-warm">
          <Activity className="w-3.5 h-3.5" />
          <span>EXPERIMENT LOGS &amp; ABLATION RUNS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
          Empirical Experiments
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Structured logs of machine learning experiments, hypothesis formulations, loss trajectories, and training convergence dynamics.
        </p>
      </div>

      {/* Experiments List */}
      <div className="space-y-8 max-w-4xl">
        {experiments.map((exp) => (
          <div
            key={exp.slug}
            className="p-6 rounded-lg bg-surface border border-border-subtle space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                  EXPERIMENT // {exp.slug}
                </span>
                <h2 className="text-xl font-display font-bold text-text-primary">
                  {exp.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                <span className="px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 uppercase font-semibold">
                  {exp.status}
                </span>
                <span>{exp.date}</span>
              </div>
            </div>

            {/* Objective & Hypothesis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded bg-surface-raised border border-border-subtle space-y-1.5">
                <span className="text-accent uppercase font-semibold block">Objective</span>
                <p className="text-text-primary font-sans text-sm leading-relaxed">{exp.objective}</p>
              </div>
              <div className="p-4 rounded bg-surface-raised border border-border-subtle space-y-1.5">
                <span className="text-accent-warm uppercase font-semibold block">Hypothesis</span>
                <p className="text-text-primary font-sans text-sm leading-relaxed">{exp.hypothesis}</p>
              </div>
            </div>

            {/* Setup Parameters */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                Experimental Setup &amp; Hardware
              </span>
              <div className="p-4 rounded bg-surface-raised border border-border-subtle grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-text-secondary block">Hardware:</span>
                  <span className="text-text-primary">{exp.setup.hardware}</span>
                </div>
                <div>
                  <span className="text-text-secondary block">Framework:</span>
                  <span className="text-text-primary">{exp.setup.framework}</span>
                </div>
                <div>
                  <span className="text-text-secondary block">Dataset:</span>
                  <span className="text-text-primary">{exp.setup.dataset}</span>
                </div>
                {Object.entries(exp.setup.parameters).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-text-secondary block">{key}:</span>
                    <span className="text-text-primary">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Points Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                Logged Trajectory Metric Data
              </span>
              <div className="rounded border border-border-subtle overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface-raised border-b border-border-subtle text-text-secondary">
                    <tr>
                      <th className="p-2.5">Step / Interval</th>
                      <th className="p-2.5 text-accent">{exp.dataPoints[0]?.labelA || "Metric A"}</th>
                      <th className="p-2.5 text-accent-warm">{exp.dataPoints[0]?.labelB || "Metric B"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle bg-surface">
                    {exp.dataPoints.map((dp, idx) => (
                      <tr key={idx} className="hover:bg-surface-raised/40">
                        <td className="p-2.5 font-medium text-text-primary">{dp.stepOrEpoch}</td>
                        <td className="p-2.5 text-accent">{dp.metricA}</td>
                        <td className="p-2.5 text-accent-warm">{dp.metricB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Result & Conclusions */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded bg-base border border-border-subtle text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary font-mono text-xs uppercase block mb-1">
                  Empirical Result:
                </strong>
                {exp.resultsSummary}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold block">
                  Key Conclusions
                </span>
                <ul className="space-y-1.5 text-xs text-text-secondary">
                  {exp.conclusions.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
