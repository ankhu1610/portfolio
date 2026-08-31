import React from "react";
import { getAllExperiences } from "@/lib/content-api";
import { Timeline } from "@/components/ui/Timeline";
import { Terminal, ShieldCheck, Cpu, Download } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Experience",
  description: "Career and Academic Timeline — IIT Guwahati M.Tech in Robotics & AI, Fiserv Cybersecurity Analyst, DIT B.Tech.",
};

export default function ExperiencePage() {
  const experiences = getAllExperiences();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>CAREER TIMELINE &amp; VERIFIED CREDENTIALS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
          Experience &amp; Education
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Chronological record of academic research, systems engineering positions, and enterprise security roles.
        </p>

        <div className="pt-2">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-surface-raised hover:bg-surface border border-border-subtle hover:border-accent text-xs font-mono text-text-primary transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span>Open Printable Resume View</span>
          </Link>
        </div>
      </div>

      {/* Full Expanded Timeline */}
      <div className="max-w-3xl">
        <Timeline items={experiences} condensed={false} />
      </div>
    </div>
  );
}
