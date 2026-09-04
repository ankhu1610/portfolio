import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjects, getAdjacentProjects } from "@/lib/content-api";
import { StatusDot } from "@/components/ui/StatusDot";
import { TechBadge } from "@/components/ui/TechBadge";
import { MetricCard } from "@/components/ui/MetricCard";
import { ChallengeCard } from "@/components/ui/ChallengeCard";
import { SectionNav } from "@/components/project/SectionNav";
import { ArchitectureDiagramContainer } from "@/components/project/ArchitectureDiagramContainer";
import { ExperimentGraph } from "@/components/project/ExperimentGraph";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Code2,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FlaskConical,
  ListTree,
  XCircle,
  ShieldAlert,
  GitBranch,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);

  const navSections = [
    { id: "problem", label: "Problem & Motivation" },
    { id: "architecture", label: "Architecture" },
    { id: "implementation", label: "Implementation" },
    { id: "experiments", label: "Experiments & Evidence" },
    ...(project.ablations && project.ablations.length > 0
      ? [{ id: "ablations", label: "Component Ablations" }]
      : []),
    ...(project.benchmarks && project.benchmarks.length > 0
      ? [{ id: "benchmarks", label: "Benchmarks" }]
      : []),
    ...(project.failedExperiments || project.limitations
      ? [{ id: "failure", label: "Failure & Limitations" }]
      : []),
    { id: "challenges", label: "Challenges" },
    { id: "lessons", label: "Lessons & Future Work" },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Top Breadcrumb & GitHub Link */}
      <div className="flex items-center justify-between gap-4 text-xs font-mono text-text-secondary pb-4 border-b border-border-subtle">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Repository</span>
        </Link>

        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
          >
            <Github className="w-4 h-4" />
            <span>Verify Code on GitHub &rarr;</span>
          </a>
        )}
      </div>

      {/* Case Study Hero Section */}
      <header className="space-y-5 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <StatusDot
            status={project.status}
            verificationStatus={project.verificationStatus}
          />
          <span className="text-xs font-mono text-text-secondary uppercase">
            Domain: {project.domain}
          </span>
          <span className="text-border-subtle">·</span>
          <span className="text-xs font-mono text-text-secondary">
            {project.duration}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-sans">
          {project.summary}
        </p>

        {/* 2. Research Question Callout (Specification Section 2) */}
        <div className="p-4 rounded-md bg-surface-raised border-l-4 border-accent border-y border-r border-border-subtle space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-accent font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>RESEARCH QUESTION // TECHNICAL INQUIRY</span>
          </div>
          <p className="text-sm sm:text-base font-mono text-text-primary font-medium italic leading-relaxed">
            &gt; &quot;{project.researchQuestion}&quot;
          </p>
        </div>

        {/* Development Stage Tracker (Specification Section 12 for Active Projects) */}
        {project.developmentStage && (
          <div className="p-4 rounded-lg bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
              <GitBranch className="w-3.5 h-3.5 text-accent" />
              <span className="font-semibold uppercase tracking-wider text-text-primary">
                RESEARCH LIFECYCLE AUDIT // HONEST PROGRESS TRACKING
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
              {/* Implemented */}
              <div className="p-3 rounded bg-surface-raised border border-border-subtle space-y-1.5">
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  [✓ IMPLEMENTED]
                </span>
                <ul className="space-y-1 text-text-secondary pl-1">
                  {project.developmentStage.implemented.map((item, i) => (
                    <li key={i} className="leading-relaxed">• {item}</li>
                  ))}
                </ul>
              </div>

              {/* In Experiment */}
              <div className="p-3 rounded bg-surface-raised border border-accent-warm/40 space-y-1.5">
                <span className="text-accent-warm font-mono font-semibold flex items-center gap-1">
                  <FlaskConical className="w-3.5 h-3.5" />
                  [⟳ IN EXPERIMENT]
                </span>
                <ul className="space-y-1 text-text-secondary pl-1">
                  {project.developmentStage.inExperiment.map((item, i) => (
                    <li key={i} className="leading-relaxed">• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Planned */}
              <div className="p-3 rounded bg-surface-raised border border-border-subtle space-y-1.5">
                <span className="text-neutral-600 dark:text-neutral-400 font-mono font-semibold flex items-center gap-1">
                  <ListTree className="w-3.5 h-3.5" />
                  [⏳ PLANNED]
                </span>
                <ul className="space-y-1 text-text-secondary pl-1">
                  {project.developmentStage.planned.map((item, i) => (
                    <li key={i} className="leading-relaxed">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} label={tech} variant="filled" />
          ))}
        </div>
      </header>

      {/* Sticky In-Page Section Navigation (Scroll-Spy) */}
      <SectionNav sections={navSections} />

      {/* Main Case Study Content Body */}
      <div className="space-y-16 max-w-4xl">
        {/* 1. Problem & Motivation */}
        <section id="problem" className="space-y-6 pt-4 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 01
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Problem &amp; Motivation
            </h2>
          </div>

          <div className="space-y-4 text-base text-text-secondary leading-relaxed">
            <div>
              <h3 className="text-sm font-mono text-text-primary uppercase tracking-wider mb-2 font-semibold">
                The Problem
              </h3>
              <p className="p-4 rounded-md bg-surface border border-border-subtle text-text-primary/90">
                {project.problem}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-mono text-text-primary uppercase tracking-wider mb-2 font-semibold">
                First-Principles Motivation
              </h3>
              <p className="p-4 rounded-md bg-surface border border-border-subtle">
                {project.motivation}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Architecture */}
        <section id="architecture" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 02
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              System Architecture
            </h2>
          </div>

          <p className="text-base text-text-secondary leading-relaxed">
            {project.architecture.description}
          </p>

          {/* Interactive SVG Diagram with Node Inspector */}
          <ArchitectureDiagramContainer
            svgPath={project.architecture.svgPath}
            caption={project.architecture.caption}
            alt={`${project.title} Architecture Diagram`}
            components={project.architecture.components}
          />
        </section>

        {/* 3. Implementation Decisions & Tradeoffs */}
        <section id="implementation" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 03
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Implementation Decisions &amp; Hardware Tradeoffs
            </h2>
          </div>

          <div className="space-y-6">
            {project.implementation.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-md bg-surface border border-border-subtle space-y-3"
              >
                <div className="flex items-start gap-2">
                  <span className="p-1 rounded bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-semibold text-text-primary">
                    {item.decision}
                  </h3>
                </div>

                <div className="text-sm text-text-secondary leading-relaxed space-y-2">
                  <p>
                    <strong className="text-text-primary font-mono text-xs uppercase block mb-0.5">
                      Rationale:
                    </strong>
                    {item.rationale}
                  </p>

                  <p className="p-3 rounded bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
                    <strong className="text-accent-warm uppercase block mb-1">
                      Hardware &amp; Algorithmic Tradeoff:
                    </strong>
                    {item.tradeoff}
                  </p>

                  {item.codeSnippet && (
                    <div className="mt-3">
                      <div className="text-xs font-mono text-text-secondary mb-1 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-accent" />
                        <span>Core PyTorch Implementation Kernel</span>
                      </div>
                      <pre className="p-4 rounded-md bg-neutral-950 text-neutral-200 text-xs font-mono overflow-x-auto border border-border-subtle leading-relaxed">
                        <code>{item.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Experiments & Empirical Evidence */}
        <section id="experiments" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 04
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Experiments &amp; Quantitative Evidence
            </h2>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">
            {project.experiments.description}
          </p>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.experiments.metrics.map((m, idx) => (
              <MetricCard
                key={idx}
                label={m.label}
                value={m.value}
                delta={m.delta}
                context={m.context}
              />
            ))}
          </div>

          {/* Grounded Evidence Cards (Specification Section 3) */}
          {project.evidence && project.evidence.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                GROUNDED EMPIRICAL EVIDENCE // CLAIMS WITH MEASUREMENT METHODOLOGY
              </h3>
              <div className="space-y-3">
                {project.evidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-surface border border-border-subtle space-y-2 text-xs font-mono"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border-subtle/70 pb-2">
                      <span className="text-text-primary font-semibold text-sm">
                        {ev.claim}
                      </span>
                      <span className="text-accent font-bold text-sm sm:text-base whitespace-nowrap">
                        {ev.value}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-text-secondary pt-1">
                      <div>
                        <strong className="text-text-primary block">Metric &amp; Baseline:</strong>
                        <span>{ev.metric} {ev.baseline ? `(vs ${ev.baseline})` : ""}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <strong className="text-text-primary block">Methodology &amp; Conditions:</strong>
                        <span>{ev.methodology}</span>
                        {ev.hardware && <span className="block text-accent-warm">Hardware: {ev.hardware}</span>}
                        {ev.dataset && <span className="block text-text-secondary">Dataset: {ev.dataset}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Benchmark Chart */}
          {project.experiments.benchmarkData && (
            <ExperimentGraph
              title={`${project.title} — Empirical Measurement Curve`}
              data={project.experiments.benchmarkData}
              baselineLabel="Reference / Naive Baseline"
              optimizedLabel="Our Architecture (Optimized)"
            />
          )}
        </section>

        {/* 5. Component Ablations (Specification Section 4) */}
        {project.ablations && project.ablations.length > 0 && (
          <section id="ablations" className="space-y-6 scroll-mt-28">
            <div className="border-b border-border-subtle pb-2">
              <span className="text-xs font-mono text-accent uppercase tracking-wider">
                SECTION 05
              </span>
              <h2 className="text-2xl font-display font-bold text-text-primary">
                Component Ablation Analysis
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              Evaluating individual component contributions: answering &quot;Which architectural component actually produced the observed gain?&quot;
            </p>

            <div className="rounded-md border border-border-subtle overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-raised border-b border-border-subtle text-text-secondary">
                  <tr>
                    <th className="p-3 font-semibold">Component Variant</th>
                    <th className="p-3 font-semibold">Configuration</th>
                    <th className="p-3 font-semibold text-accent">Observed Result</th>
                    <th className="p-3 font-semibold hidden md:table-cell">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle bg-surface">
                  {project.ablations.map((ab, idx) => (
                    <tr key={idx} className="hover:bg-surface-raised/50">
                      <td className="p-3 font-semibold text-text-primary">{ab.name}</td>
                      <td className="p-3 text-text-secondary">{ab.configuration}</td>
                      <td className="p-3 text-accent font-semibold">{ab.result}</td>
                      <td className="p-3 text-text-secondary hidden md:table-cell leading-relaxed">
                        {ab.interpretation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 6. Reference Benchmarks */}
        {project.benchmarks && project.benchmarks.length > 0 && (
          <section id="benchmarks" className="space-y-6 scroll-mt-28">
            <div className="border-b border-border-subtle pb-2">
              <span className="text-xs font-mono text-accent uppercase tracking-wider">
                SECTION 06
              </span>
              <h2 className="text-2xl font-display font-bold text-text-primary">
                Reference Model Comparison &amp; Speedup
              </h2>
            </div>

            <div className="rounded-md border border-border-subtle overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-raised border-b border-border-subtle text-text-secondary">
                  <tr>
                    <th className="p-3">Benchmark Metric</th>
                    <th className="p-3 text-accent">Our Implementation</th>
                    <th className="p-3">Baseline Reference</th>
                    <th className="p-3">Relative Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle bg-surface">
                  {project.benchmarks.map((b, idx) => (
                    <tr key={idx} className="hover:bg-surface-raised/50">
                      <td className="p-3 font-medium text-text-primary">{b.name}</td>
                      <td className="p-3 text-accent font-semibold">{b.ours}</td>
                      <td className="p-3 text-text-secondary">{b.baseline}</td>
                      <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400">{b.speedup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 7. Failure Analysis & Known Limitations (Specification Section 5) */}
        {(project.failedExperiments || project.limitations) && (
          <section id="failure" className="space-y-6 scroll-mt-28">
            <div className="border-b border-border-subtle pb-2">
              <span className="text-xs font-mono text-accent uppercase tracking-wider">
                SECTION 07
              </span>
              <h2 className="text-2xl font-display font-bold text-text-primary">
                Failure Analysis &amp; Known Limitations
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              Intellectual honesty is central to the lab notebook philosophy: documenting negative results, rejected hypotheses, and precise operational boundaries.
            </p>

            {/* Negative Results & Failed Hypotheses */}
            {project.failedExperiments && project.failedExperiments.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-accent-warm uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>NEGATIVE RESULTS // REJECTED HYPOTHESES</span>
                </h3>

                <div className="space-y-3">
                  {project.failedExperiments.map((fe, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-surface border border-accent-warm/30 space-y-2 text-xs font-mono"
                    >
                      <div className="text-text-primary font-semibold">
                        <span className="text-accent-warm mr-1.5">[HYPOTHESIS]:</span>
                        {fe.hypothesis}
                      </div>
                      <div className="text-text-primary">
                        <span className="text-rose-600 dark:text-rose-400 mr-1.5 font-semibold">[OBSERVED FAILURE]:</span>
                        {fe.result}
                      </div>
                      <div className="text-text-secondary border-t border-border-subtle/60 pt-2">
                        <strong className="text-accent mr-1.5">[ANALYSIS]:</strong>
                        {fe.interpretation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Known Limitations */}
            {project.limitations && project.limitations.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono text-text-secondary uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-accent" />
                  <span>SYSTEM BOUNDARIES &amp; KNOWN LIMITATIONS</span>
                </h3>

                <ul className="space-y-2 text-xs font-mono text-text-secondary pl-2 border-l-2 border-border-subtle">
                  {project.limitations.map((lim, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {lim}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* 8. Engineering Bottlenecks & Solutions */}
        <section id="challenges" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 08
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Engineering Bottlenecks &amp; Solutions
            </h2>
          </div>

          <div className="space-y-4">
            {project.challenges.map((challenge, idx) => (
              <ChallengeCard
                key={idx}
                title={challenge.title}
                problem={challenge.problem}
                rootCause={challenge.rootCause}
                solution={challenge.solution}
                status={challenge.status}
                defaultOpen={idx === 0}
              />
            ))}
          </div>
        </section>

        {/* 9. Lessons Learned & Future Work */}
        <section id="lessons" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 09
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Lessons Learned &amp; Future Research Direction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-3">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider font-semibold">
                What Would Be Done Differently
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent font-mono mt-0.5">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-3">
              <h3 className="text-sm font-mono text-accent-warm uppercase tracking-wider font-semibold">
                Future Systems Work
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.futureImprovements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent-warm font-mono mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-Artifact Navigation Links (Specification Section 15) */}
        <div className="p-6 rounded-lg bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            <span className="text-accent font-semibold block uppercase">
              EXPLORE RELEVANT LAB ARTIFACTS
            </span>
            <span className="text-text-secondary">
              Investigate low-level benchmark logs and empirical derivations connected to {project.title}.
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/lab/benchmarks"
              className="px-3 py-1.5 rounded bg-surface-raised hover:bg-surface border border-border-subtle hover:border-accent text-text-primary transition-colors flex items-center gap-1"
            >
              <span>Benchmark Suite &rarr;</span>
            </Link>
            <Link
              href="/lab/experiments"
              className="px-3 py-1.5 rounded bg-surface-raised hover:bg-surface border border-border-subtle hover:border-accent-warm text-text-primary transition-colors flex items-center gap-1"
            >
              <span>Experiment Logs &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Adjacent Project Navigation Footer */}
        <div className="pt-8 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="p-4 rounded-md bg-surface border border-border-subtle hover:border-accent transition-colors space-y-1 text-left"
            >
              <div className="text-xs font-mono text-text-secondary flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREVIOUS PROJECT</span>
              </div>
              <div className="text-sm font-semibold text-text-primary line-clamp-1">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="p-4 rounded-md bg-surface border border-border-subtle hover:border-accent transition-colors space-y-1 text-right sm:col-start-2"
            >
              <div className="text-xs font-mono text-text-secondary flex items-center justify-end gap-1">
                <span>NEXT PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm font-semibold text-text-primary line-clamp-1">
                {next.title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
