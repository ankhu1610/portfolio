import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { Terminal, Cpu, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, Layers } from "lucide-react";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";

export const metadata = {
  title: "About",
  description: "Ankit Chaubey — ML Systems Researcher, M.Tech Robotics & AI at IIT Guwahati, ex-Cybersecurity at Fiserv.",
};

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>BIOGRAPHY &amp; RESEARCH PHILOSOPHY</span>
        </div>

        <TypewriterHeading
          as="h1"
          className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight"
          segments={[
            { text: "About " },
            {
              text: "& Research Ethos",
              className: "text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-300",
            },
          ]}
          speed={32}
        />

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          I build machine learning architectures and low-level systems from the mathematical equations up to hardware-optimized inference kernels.
        </p>
      </div>

      {/* Main Narrative Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Prose Story */}
        <div className="lg:col-span-2 space-y-8 text-text-secondary leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold text-text-primary">
              First-Principles Engineering Over Framework Glue Code
            </h2>
            <p className="text-text-primary/90 leading-relaxed">
              In modern machine learning, it is easy to import high-level wrappers and assemble pre-packaged models without ever confronting the actual physical constraints of hardware: memory bandwidth ceilings during autoregressive decoding, numerical underflow in attention logits, or cache locality across GPU warps.
            </p>
            <p className="text-text-primary/90 leading-relaxed">
              My focus is understanding and constructing these systems from the ground up: writing tokenizers, implementing Rotary Position Embeddings (RoPE), pre-RMSNorm layers, SwiGLU activations, and static KV-cache engines in pure PyTorch and CUDA. The same philosophy governs my work on Latent Diffusion models, building the CLIP text conditioner, Autoencoder KL, and Time-Conditioned Cross-Attention UNet from scratch.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold text-text-primary">
              Academic &amp; Industrial Convergence
            </h2>
            <p className="text-text-primary/90 leading-relaxed">
              Currently pursuing an <strong className="text-text-primary font-semibold">M.Tech in Robotics &amp; Artificial Intelligence at IIT Guwahati</strong>, I combine deep theoretical study in optimization, robot perception, and deep learning architectures with intensive systems implementation.
            </p>
            <p className="text-text-primary/90 leading-relaxed">
              Prior to IIT Guwahati, I worked as a <strong className="text-text-primary font-semibold">Technology Analyst in Cybersecurity at Fiserv</strong>, managing identity governance pipelines (SailPoint IdentityIQ) and mitigating Denial-of-Service (DoS) vectors across critical global fintech infrastructure. This industrial cybersecurity experience instilled a rigorous production discipline: compliance auditing, zero-trust access boundaries, and operational reliability under scale.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-text-primary">
              Core Technical Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md bg-surface border border-border-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Evidence Over Decoration</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Real numbers, empirical benchmarks, and clear architecture diagrams over marketing hype or stock illustrations.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Intellectual Honesty</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Documenting mistakes, failure modes, and hardware bottlenecks transparently in project case studies.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hardware Awareness</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Treating VRAM allocation, memory bandwidth, and tensor layout as first-class algorithmic design constraints.
                </p>
              </div>

              <div className="p-4 rounded-md bg-surface border border-border-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Production Discipline</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Applying enterprise security, testability, and operational rigor learned in regulated banking environments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Facts & Verification Cards */}
        <div className="space-y-6">
          <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-4">
            <h3 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              QUICK PROFILE / VERIFICATION
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-text-secondary block">Current Affiliation:</span>
                <span className="text-text-primary font-medium">IIT Guwahati (M.Tech Robotics &amp; AI)</span>
              </div>
              <div>
                <span className="text-text-secondary block">Primary Focus:</span>
                <span className="text-text-primary font-medium">ML Systems, Transformers, Diffusion Models</span>
              </div>
              <div>
                <span className="text-text-secondary block">Previous Industry:</span>
                <span className="text-text-primary font-medium">Fiserv (Cybersecurity &amp; IAM)</span>
              </div>
              <div>
                <span className="text-text-secondary block">Primary Stack:</span>
                <span className="text-text-primary font-medium">PyTorch, CUDA, Python, C++, Linux</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle">
              <Link
                href="/resume"
                className="w-full py-2 px-3 rounded bg-surface-raised hover:bg-accent/15 border border-border-subtle hover:border-accent text-text-primary hover:text-accent text-xs font-mono flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-3">
            <h3 className="text-xs font-mono text-accent-warm uppercase tracking-wider font-semibold">
              ACTIVE RESEARCH TOPICS
            </h3>
            <ul className="space-y-2 text-xs font-mono text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>MoE Routing &amp; Load Balancing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Paged KV-Cache Compression</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Deterministic SDE/ODE Diffusion Solvers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>DPO Preference Stability &amp; Length Normalization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
