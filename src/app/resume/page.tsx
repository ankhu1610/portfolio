import React from "react";
import Link from "next/link";
import { getAllProjects, getFeaturedProjects } from "@/lib/content-api";
import { siteConfig } from "@/content/site.config";
import {
  Download,
  Printer,
  ExternalLink,
  ArrowLeft,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Terminal,
} from "lucide-react";
import { ResumePrintButton } from "@/components/ui/ResumePrintButton";
import { getAssetPath } from "@/lib/utils";

export const metadata = {
  title: "Resume",
  description: "Ankit Chaubey — ML Systems Researcher & Engineer Resume. Education, Systems, Experience, and Skills.",
};

export default function ResumePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="flex items-center justify-between gap-4 text-xs font-mono text-text-secondary pb-4 border-b border-border-subtle print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <ResumePrintButton />
          <a
            href={getAssetPath("/resume.pdf")}
            download="Ankit_Chaubey_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-accent text-neutral-950 font-semibold hover:bg-teal-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main Resume Canvas Document */}
      <article className="p-6 sm:p-10 rounded-lg bg-surface border border-border-subtle space-y-8 print:p-0 print:border-none print:bg-transparent">
        {/* Header / Identity */}
        <div className="border-b border-border-subtle pb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary print:text-black tracking-tight">
            Ankit Chaubey
          </h1>
          <p className="text-sm sm:text-base font-mono text-accent print:text-neutral-800">
            Machine Learning Systems Researcher &amp; Engineer
          </p>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs font-mono text-text-secondary print:text-neutral-600 pt-1">
            <a href={`mailto:${siteConfig.links.email}`} className="flex items-center gap-1 hover:text-accent">
              <Mail className="w-3 h-3" />
              <span>{siteConfig.links.email}</span>
            </a>
            <span>·</span>
            <a href="https://github.com/ankhu1610" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent">
              <Github className="w-3 h-3" />
              <span>github.com/ankhu1610</span>
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
                Research focus: From-scratch Transformer architectures, Rotary Position Embeddings (RoPE), KV-cache optimization, deep generative diffusion models, and sequential recommendation systems.
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
          <div className="flex items-center justify-between border-b border-border-subtle pb-1">
            <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              Flagship ML Systems Projects (Built &amp; Evaluated From Scratch)
            </h2>
            <Link href="/projects" className="text-[11px] font-mono text-text-secondary hover:text-accent print:hidden">
              View All 6 Projects &rarr;
            </Link>
          </div>

          <div className="space-y-5">
            {featuredProjects.map((proj) => (
              <div key={proj.slug} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <span className="font-semibold text-text-primary print:text-black flex items-center gap-2">
                    {proj.title}
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-accent/10 text-accent border border-accent/20">
                      {proj.technologies.slice(0, 4).join(", ")}
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
                  {proj.evidence && proj.evidence[0] && (
                    <li>
                      <strong className="text-text-primary print:text-black">Measured Metric:</strong> {proj.evidence[0].claim} ({proj.evidence[0].value} vs {proj.evidence[0].baseline || "baseline"}).
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Experience (Industry & Academic Appointments) */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold border-b border-border-subtle pb-1">
            Experience &amp; Academic Appointments
          </h2>

          <div className="space-y-5">
            {/* Teaching Assistant - IIT Guwahati */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-semibold text-text-primary print:text-black">
                  Teaching Assistant — Introduction to Robotics
                </span>
                <span className="text-xs font-mono text-text-secondary print:text-neutral-700">
                  Jul 2026 – Nov 2026
                </span>
              </div>
              <div className="text-xs font-mono text-accent-warm">
                Indian Institute of Technology (IIT) Guwahati
              </div>
              <ul className="list-disc list-inside text-xs text-text-secondary print:text-neutral-700 space-y-1 pt-1">
                <li>
                  Assisted in delivering laboratory sessions covering forward and inverse kinematics, path planning algorithms, and rigid-body transforms.
                </li>
                <li>
                  Mentored undergraduate students on ROS / Python implementations and graded coursework and laboratory demonstrations.
                </li>
              </ul>
            </div>

            {/* Fiserv Technology Analyst */}
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

            {/* Fiserv Intern */}
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
                Transformers, Diffusion Models, RoPE, RMSNorm, SwiGLU, KV-Cache, DPO, DDPM, DDIM, CFG, SASRec, RRF, Cross-Encoders
              </span>
            </div>
            <div>
              <span className="text-text-secondary print:text-neutral-700 block">Languages &amp; Frameworks:</span>
              <span className="text-text-primary print:text-black">
                Python, PyTorch, C++, CUDA (basic), TypeScript, Next.js, React, Java
              </span>
            </div>
            <div>
              <span className="text-text-secondary print:text-neutral-700 block">Infrastructure &amp; Systems:</span>
              <span className="text-text-primary print:text-black">
                FAISS, BM25, Linux Kernel, Git, Docker, HuggingFace Transformers &amp; Diffusers, ONNX Runtime
              </span>
            </div>
            <div>
              <span className="text-text-secondary print:text-neutral-700 block">Systems Evaluation:</span>
              <span className="text-text-primary print:text-black">
                Ablation Studies, Latency Profiling (torch.profiler), VRAM Allocation Ceilings, NLI Claim Verification, Perplexity
              </span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
