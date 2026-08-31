"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { getAllExperiences, getAllProjects } from "@/lib/content-api";
import { Printer, Download, ArrowLeft, Mail, Github, Linkedin, ExternalLink, ShieldCheck, GraduationCap } from "lucide-react";

export default function ResumePage() {
  const experiences = getAllExperiences();
  const projects = getAllProjects();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle text-xs font-mono">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-accent text-neutral-950 font-semibold hover:bg-teal-300 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Rendered Resume Document Container */}
      <div className="p-6 sm:p-12 rounded-lg bg-surface border border-border-subtle shadow-sm space-y-10 text-text-primary print:border-none print:p-0 print:bg-white print:text-black">
        {/* Resume Header */}
        <div className="border-b border-border-subtle pb-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-text-primary print:text-black">
              Ankit Chaubey
            </h1>
            <div className="text-xs font-mono text-accent print:text-neutral-800">
              ML Systems Researcher &amp; Engineer
            </div>
          </div>

          <p className="text-sm text-text-secondary print:text-neutral-700 leading-relaxed max-w-2xl">
            M.Tech candidate in Robotics &amp; AI at IIT Guwahati with production cybersecurity engineering experience at Fiserv. Focused on building from-scratch deep learning architectures (Transformers, Diffusion models) and optimizing memory/compute infrastructure.
          </p>

          <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs font-mono text-text-secondary print:text-neutral-700 pt-1">
            <a href="mailto:chaubeyankit837@gmail.com" className="flex items-center gap-1 hover:text-accent">
              <Mail className="w-3 h-3" />
              <span>chaubeyankit837@gmail.com</span>
            </a>
            <span>·</span>
            <a href="mailto:ankit.chaubey@iitg.ac.in" className="flex items-center gap-1 hover:text-accent">
              <GraduationCap className="w-3 h-3" />
              <span>ankit.chaubey@iitg.ac.in</span>
            </a>
            <span>·</span>
            <a href="https://github.com/ankitchaubey" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent">
              <Github className="w-3 h-3" />
              <span>github.com/ankitchaubey</span>
            </a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/ankit-chaubey-6b9a141b2/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent">
              <Linkedin className="w-3 h-3" />
              <span>linkedin.com/in/ankit-chaubey-6b9a141b2</span>
            </a>
            <span>·</span>
            <span>Guwahati / Bengaluru, India</span>
          </div>
        </div>

        {/* 1. Education */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold border-b border-border-subtle pb-1">
            Education
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-semibold text-text-primary print:text-black">
                  Indian Institute of Technology (IIT) Guwahati
                </span>
                <span className="text-xs font-mono text-text-secondary print:text-neutral-700">
                  2025 – Present
                </span>
              </div>
              <div className="text-xs font-mono text-accent-warm">
                Master of Technology (M.Tech) in Robotics &amp; Artificial Intelligence
              </div>
              <p className="text-xs text-text-secondary print:text-neutral-700 leading-relaxed pt-1">
                Research focus: From-scratch Transformer architectures, Rotary Position Embeddings (RoPE), KV-cache optimization, and Deep Generative Diffusion Models.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-semibold text-text-primary print:text-black">
                  Dehradun Institute of Technology (DIT University)
                </span>
                <span className="text-xs font-mono text-text-secondary print:text-neutral-700">
                  2020 – 2024
                </span>
              </div>
              <div className="text-xs font-mono text-text-secondary">
                Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering
              </div>
              <p className="text-xs text-text-secondary print:text-neutral-700 leading-relaxed pt-0.5">
                First Class with Distinction. Core coursework in Data Structures, Algorithms, Computer Systems, and Operating Systems.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Flagship ML Systems Projects */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold border-b border-border-subtle pb-1">
            Selected ML Systems Projects (Built From Scratch)
          </h2>

          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.slug} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <span className="font-semibold text-text-primary print:text-black flex items-center gap-2">
                    {proj.title}
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-accent/10 text-accent border border-accent/20">
                      {proj.technologies.join(", ")}
                    </span>
                  </span>
                  <span className="text-xs font-mono text-text-secondary print:text-neutral-700">
                    {proj.duration}
                  </span>
                </div>

                <p className="text-xs text-text-secondary print:text-neutral-800 leading-relaxed">
                  {proj.summary}
                </p>

                <ul className="list-disc list-inside text-xs text-text-secondary print:text-neutral-700 space-y-1 pl-1">
                  {proj.implementation.slice(0, 2).map((imp, idx) => (
                    <li key={idx}>
                      <strong className="text-text-primary print:text-black">{imp.decision}:</strong> {imp.rationale}
                    </li>
                  ))}
                  {proj.benchmarks && proj.benchmarks[0] && (
                    <li>
                      <strong className="text-text-primary print:text-black">Benchmark Metric:</strong> {proj.benchmarks[0].name} achieved {proj.benchmarks[0].ours} ({proj.benchmarks[0].speedup} over baseline).
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Industry Experience */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold border-b border-border-subtle pb-1">
            Industry Experience
          </h2>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-semibold text-text-primary print:text-black">
                  Technology Analyst — Cybersecurity &amp; Identity Governance
                </span>
                <span className="text-xs font-mono text-text-secondary print:text-neutral-700">
                  2024 – 2025
                </span>
              </div>
              <div className="text-xs font-mono text-accent-warm">
                Fiserv · Global Technology Solutions
              </div>
              <ul className="list-disc list-inside text-xs text-text-secondary print:text-neutral-700 space-y-1 pt-1">
                <li>
                  Engineered and automated identity governance and role-based access control (RBAC) schemas in SailPoint IdentityIQ for 40,000+ enterprise accounts in regulated fintech environments.
                </li>
                <li>
                  Reduced compliance auditing overhead by 35% through automated certification workflows and identity lifecycle pipelines.
                </li>
                <li>
                  Hardened internal banking API endpoints against automated Denial-of-Service (DoS) and account takeover vectors via rate limiting and session validation logic.
                </li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-semibold text-text-primary print:text-black">
                  Cybersecurity Engineering Intern
                </span>
                <span className="text-xs font-mono text-text-secondary print:text-neutral-700">
                  2023
                </span>
              </div>
              <div className="text-xs font-mono text-text-secondary">
                Fiserv
              </div>
              <ul className="list-disc list-inside text-xs text-text-secondary print:text-neutral-700 space-y-1 pt-1">
                <li>
                  Automated identity connector reconciliations using Java and REST APIs, reducing synchronization failure rates.
                </li>
                <li>
                  Conducted vulnerability assessments and built telemetry dashboards for security access logs.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Technical Skills */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold border-b border-border-subtle pb-1">
            Technical Skills &amp; Domain Expertise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <span className="text-text-secondary print:text-neutral-700 block">ML Architectures &amp; Math:</span>
              <span className="text-text-primary print:text-black">
                Transformers, Diffusion Models, RoPE, RMSNorm, SwiGLU, KV-Cache, DPO, DDPM, DDIM, CFG, Cross-Attention
              </span>
            </div>
            <div>
              <span className="text-text-secondary print:text-neutral-700 block">Languages &amp; Frameworks:</span>
              <span className="text-text-primary print:text-black">
                PyTorch, Python, CUDA, C++, Java, Linux / Bash, Git, Docker, ROS2
              </span>
            </div>
            <div>
              <span className="text-text-secondary print:text-neutral-700 block">Systems &amp; Optimization:</span>
              <span className="text-text-primary print:text-black">
                PagedAttention, Kernel Profiling, Mixed Precision (FP16/BF16), GPU Memory Management
              </span>
            </div>
            <div>
              <span className="text-text-secondary print:text-neutral-700 block">Security &amp; Infrastructure:</span>
              <span className="text-text-primary print:text-black">
                SailPoint IdentityIQ, RBAC, IAM Governance, Zero-Trust Architecture, DoS Mitigation, API Hardening
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
