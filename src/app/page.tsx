import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { getFeaturedProjects, getAllProjects, getAllNotes, getAllExperiences } from "@/lib/content-api";
import { ProjectCard } from "@/components/project/ProjectCard";
import { NoteCard } from "@/components/lab/NoteCard";
import { Timeline } from "@/components/ui/Timeline";
import { ArrowRight, Terminal, Cpu, ShieldCheck, Download, Sparkles, BookOpen, Activity, GitBranch } from "lucide-react";

import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const allProjects = getAllProjects();
  const recentNotes = getAllNotes().slice(0, 3);
  const experiences = getAllExperiences();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="space-y-6 pt-4 sm:pt-8 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>ML Systems Researcher &amp; Engineer</span>
        </div>

        <TypewriterHeading
          as="h1"
          className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-text-primary tracking-tight leading-[1.1]"
          segments={[
            { text: "Building ML systems " },
            {
              text: "from first principles.",
              className: "text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-300",
            },
          ]}
          speed={32}
        />

        <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
          Transformers, diffusion models, and the low-level infrastructure underneath them. An evidence-backed research lab grounded in hardware constraints and empirical telemetry.
        </p>

        {/* Credibility Strip */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm font-mono text-text-secondary pt-2 border-l-2 border-accent pl-4">
          <span className="text-text-primary font-medium">IIT Guwahati (M.Tech Robotics &amp; AI)</span>
          <span className="text-border-subtle">·</span>
          <span>ex-Cybersecurity, Fiserv</span>
          <span className="text-border-subtle">·</span>
          <span className="text-accent">Systems Built &amp; Evaluated From Scratch</span>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-neutral-950 font-mono text-sm font-semibold hover:bg-teal-300 transition-colors shadow-sm"
          >
            <span>Explore Projects ({allProjects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-surface-raised hover:bg-surface border border-border-subtle hover:border-accent text-text-primary font-mono text-sm transition-colors"
          >
            <Activity className="w-4 h-4 text-accent" />
            <span>Enter Research Lab</span>
          </Link>

          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-text-secondary hover:text-text-primary font-mono text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Resume</span>
          </Link>
        </div>
      </section>

      {/* 2. CURRENT FOCUS (Live status strip) */}
      <section className="p-4 sm:p-5 rounded-md bg-surface border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <span className="p-1.5 rounded bg-accent/10 border border-accent/20 text-accent flex-shrink-0 mt-0.5 sm:mt-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              CURRENT RESEARCH FOCUS
            </div>
            <p className="text-sm text-text-primary font-mono mt-0.5">
              &gt; {siteConfig.currentFocus.text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary flex-shrink-0 sm:border-l sm:border-border-subtle sm:pl-4">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>Active — {siteConfig.currentFocus.date}</span>
        </div>
      </section>

      {/* 3. SELECTED WORK (Prioritized Flagship Projects) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-border-subtle">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
              ACTIVE SYSTEMS INVESTIGATION // FLAGSHIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
              Core Research Systems
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-text-secondary hover:text-accent flex items-center gap-1 transition-colors"
          >
            <span>Browse complete portfolio ({allProjects.length} projects)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Flagship Projects Hierarchy: LLM Systems, Evaluation / Applied ML, Sequential RecSys */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="flagship" />
          ))}
        </div>
      </section>

      {/* 4. RESEARCH NOTES & LAB PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-border-subtle">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
              TECHNICAL EXPERIMENTS &amp; BENCHMARKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
              Research Notes &amp; Lab Logs
            </h2>
          </div>
          <Link
            href="/lab"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            <span>View Full Lab &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentNotes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>

      {/* 5. EXPERIENCE (Condensed Timeline) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-border-subtle">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
              CAREER &amp; ACADEMIC BACKGROUND
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
              Experience &amp; Education
            </h2>
          </div>
          <Link
            href="/experience"
            className="text-xs font-mono text-text-secondary hover:text-accent flex items-center gap-1 transition-colors"
          >
            <span>View detailed timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <Timeline items={experiences} condensed={true} />
      </section>

      {/* 6. CALL TO ACTION & RESEARCH COLLABORATION */}
      <section className="p-8 rounded-lg bg-surface border border-border-subtle text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex p-3 rounded-full bg-surface-raised border border-border-subtle text-accent mb-2">
          <Terminal className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-display font-bold text-text-primary">
          Interested in First-Principles ML Systems?
        </h3>
        <p className="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
          Open to technical discussions on transformer efficiency, diffusion architectures, retrieval diagnostics, and machine learning infrastructure engineering.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={siteConfig.links.email}
            className="px-4 py-2 rounded-md bg-accent text-neutral-950 font-mono text-xs font-semibold hover:bg-teal-300 transition-colors"
          >
            Get In Touch (Email)
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-surface-raised hover:bg-surface border border-border-subtle font-mono text-xs text-text-primary hover:text-accent transition-colors"
          >
            Verify Code on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
