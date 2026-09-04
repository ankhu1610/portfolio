import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { Github, Linkedin, Mail, FileText, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border-subtle bg-surface/40 print:hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-text-primary">
              <Terminal className="w-4 h-4 text-accent" />
              <span>Ankit Chaubey</span>
              <span className="text-xs text-text-secondary">· ML Systems Researcher</span>
            </div>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="text-xs font-mono text-text-secondary/80">
              IIT Guwahati (M.Tech Robotics &amp; AI) · ex-Fiserv Cybersecurity
            </div>
          </div>

          {/* Col 2: Sitemap */}
          <div>
            <h4 className="text-xs font-mono text-text-primary uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-mono text-text-secondary">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Socials */}
          <div>
            <h4 className="text-xs font-mono text-text-primary uppercase tracking-wider mb-3">
              Verify &amp; Connect
            </h4>
            <ul className="space-y-2 text-sm font-mono text-text-secondary">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@ankhu1610)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.email}
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Interactive Resume</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-secondary">
          <div>
            &copy; {new Date().getFullYear()} Ankit Chaubey. Built from first principles.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Lab status: Active</span>
            </span>
            <span className="text-border-subtle">|</span>
            <span>Next.js · Tailwind · MDX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
