import React from "react";
import { siteConfig } from "@/content/site.config";
import { Mail, Github, Linkedin, Terminal, ShieldCheck, MapPin, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Contact Ankit Chaubey — ML Systems Researcher at IIT Guwahati.",
};

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-text-secondary">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>DIRECT CONTACT // RESEARCH COLLABORATION</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
          Get In Touch
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Open to research collaborations, technical discussions on transformer and diffusion systems, and machine learning infrastructure engineering roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
        {/* Personal Email Card */}
        <a
          href={siteConfig.links.email}
          className="p-6 rounded-lg bg-surface border border-border-subtle hover:border-accent transition-all group space-y-3 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-accent/10 border border-accent/20 text-accent w-fit group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                Primary Email
              </span>
              <span className="text-sm font-mono font-semibold text-text-primary group-hover:text-accent transition-colors block mt-0.5 break-all">
                chaubeyankit837@gmail.com
              </span>
            </div>
          </div>
          <p className="text-xs text-text-secondary pt-2">
            Direct personal inbox for inquiries &amp; opportunities.
          </p>
        </a>

        {/* Academic Email Card */}
        <a
          href={siteConfig.links.academicEmail}
          className="p-6 rounded-lg bg-surface border border-border-subtle hover:border-accent transition-all group space-y-3 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-accent-warm/10 border border-accent-warm/20 text-accent-warm w-fit group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                Academic Email
              </span>
              <span className="text-sm font-mono font-semibold text-text-primary group-hover:text-accent transition-colors block mt-0.5 break-all">
                ankit.chaubey@iitg.ac.in
              </span>
            </div>
          </div>
          <p className="text-xs text-text-secondary pt-2">
            IIT Guwahati institutional research inbox.
          </p>
        </a>

        {/* LinkedIn Card */}
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-lg bg-surface border border-border-subtle hover:border-accent transition-all group space-y-3 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-surface-raised border border-border-subtle text-text-primary w-fit group-hover:scale-105 transition-transform">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                LinkedIn Profile
              </span>
              <span className="text-sm font-mono font-semibold text-text-primary group-hover:text-accent transition-colors block mt-0.5">
                in/ankit-chaubey
              </span>
            </div>
          </div>
          <p className="text-xs text-text-secondary pt-2">
            Professional network, background &amp; verified career credentials.
          </p>
        </a>

        {/* GitHub Card */}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-lg bg-surface border border-border-subtle hover:border-accent transition-all group space-y-3 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-surface-raised border border-border-subtle text-text-primary w-fit group-hover:scale-105 transition-transform">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                GitHub Repositories
              </span>
              <span className="text-sm font-mono font-semibold text-text-primary group-hover:text-accent transition-colors block mt-0.5">
                @ankitchaubey
              </span>
            </div>
          </div>
          <p className="text-xs text-text-secondary pt-2">
            Inspect all PyTorch and CUDA source code &amp; benchmark scripts.
          </p>
        </a>
      </div>

      {/* Location & Academic Base */}
      <div className="p-6 rounded-lg bg-surface border border-border-subtle max-w-5xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-surface-raised border border-border-subtle text-accent">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-text-primary font-semibold block">
              Indian Institute of Technology (IIT) Guwahati
            </span>
            <span className="text-text-secondary">
              Center for Intelligent Cyber-Physical Systems · Assam, India (IST / UTC+5:30)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-text-secondary">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>PGP / Secure Communications Preferred</span>
        </div>
      </div>
    </div>
  );
}
