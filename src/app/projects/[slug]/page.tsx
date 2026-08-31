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
import { ArrowLeft, ArrowRight, Github, ExternalLink, Code2, Cpu, CheckCircle2, AlertTriangle } from "lucide-react";
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
    { id: "challenges", label: "Challenges" },
    { id: "experiments", label: "Experiments & Benchmarks" },
    { id: "lessons", label: "Lessons Learned" },
    { id: "future", label: "Future Work" },
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
          <span>Back to Projects</span>
        </Link>

        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository &rarr;</span>
          </a>
        )}
      </div>

      {/* Case Study Hero Section */}
      <header className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <StatusDot status={project.status} />
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

        <div className="flex flex-wrap gap-2 pt-2">
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

          {/* Interactive SVG Diagram with Zoom Lightbox */}
          <ArchitectureDiagramContainer
            svgPath={project.architecture.svgPath}
            caption={project.architecture.caption}
            alt={`${project.title} Architecture Diagram`}
          />

          {/* Component Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono text-text-primary uppercase tracking-wider font-semibold">
              Component &amp; Kernel Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.architecture.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-md bg-surface border border-border-subtle space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-accent font-semibold">{comp.name}</span>
                    <span className="text-text-secondary">LAYER {idx + 1}</span>
                  </div>
                  <div className="text-xs font-medium text-text-primary">
                    {comp.role}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {comp.implementationDetail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Implementation */}
        <section id="implementation" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 03
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Implementation Decisions &amp; Tradeoffs
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

        {/* 4. Engineering Challenges */}
        <section id="challenges" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 04
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Engineering Bottlenecks &amp; Solutions
            </h2>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">
            Real systems engineering involves debugging memory fragmentation, numerical underflow, and convergence instabilities. Below are key roadblocks encountered during development:
          </p>

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

        {/* 5. Experiments & Benchmarks */}
        <section id="experiments" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 05
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Experiments &amp; Quantitative Benchmarks
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

          {/* Interactive Benchmark Chart */}
          {project.experiments.benchmarkData && (
            <ExperimentGraph
              title={`${project.title} — Throughput & Scaling Curve`}
              data={project.experiments.benchmarkData}
              baselineLabel="Naive PyTorch Baseline"
              optimizedLabel="First-Principles Optimized"
            />
          )}

          {/* Benchmarks Comparative Table */}
          {project.benchmarks && project.benchmarks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono text-text-primary uppercase tracking-wider font-semibold">
                Reference Model Comparison
              </h3>
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
                        <td className="p-3 font-semibold text-emerald-400">{b.speedup}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* 6. Lessons Learned */}
        <section id="lessons" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 06
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Lessons Learned &amp; Intellectual Honesty
            </h2>
          </div>

          <ul className="space-y-3">
            {project.lessonsLearned.map((lesson, idx) => (
              <li
                key={idx}
                className="p-4 rounded-md bg-surface border border-border-subtle text-sm text-text-secondary leading-relaxed flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Future Improvements */}
        <section id="future" className="space-y-6 scroll-mt-28">
          <div className="border-b border-border-subtle pb-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              SECTION 07
            </span>
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Future Roadmap &amp; Next Iterations
            </h2>
          </div>

          <ul className="space-y-3">
            {project.futureImprovements.map((item, idx) => (
              <li
                key={idx}
                className="p-4 rounded-md bg-surface border border-border-subtle text-sm text-text-secondary leading-relaxed flex items-start gap-3"
              >
                <Cpu className="w-4 h-4 text-accent-warm flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Prev / Next Project Navigation (Phase 3.4) */}
      <nav className="pt-8 border-t border-border-subtle flex items-center justify-between gap-4 text-xs font-mono">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="p-3 rounded-md bg-surface border border-border-subtle hover:border-accent flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors max-w-[45%]"
          >
            <ArrowLeft className="w-4 h-4 text-accent flex-shrink-0" />
            <div className="text-left truncate">
              <span className="text-[10px] text-text-secondary block">PREVIOUS</span>
              <span className="text-text-primary font-medium truncate block">{prev.title}</span>
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="p-3 rounded-md bg-surface border border-border-subtle hover:border-accent flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors max-w-[45%]"
          >
            <div className="text-right truncate">
              <span className="text-[10px] text-text-secondary block">NEXT</span>
              <span className="text-text-primary font-medium truncate block">{next.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
          </Link>
        ) : <div />}
      </nav>

      {/* Mobile Sticky Bottom Action Bar (Phase 3.3) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-base/95 backdrop-blur-md border-t border-border-subtle flex items-center justify-between gap-3 shadow-lg">
        <Link
          href="/projects"
          className="flex-1 py-2.5 px-4 rounded-md bg-surface border border-border-subtle text-xs font-mono text-center text-text-primary"
        >
          &larr; Projects
        </Link>
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-md bg-accent text-neutral-950 font-mono text-xs font-semibold text-center flex items-center justify-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub &rarr;</span>
          </a>
        )}
      </div>
    </div>
  );
}
