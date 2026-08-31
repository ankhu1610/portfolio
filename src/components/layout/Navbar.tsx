"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site.config";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Menu, X, FileText, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-fast border-b",
        isScrolled
          ? "bg-base/85 backdrop-blur-md border-border-subtle shadow-sm"
          : "bg-base/60 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-text-primary hover:text-accent transition-colors"
        >
          <span className="p-1 rounded bg-surface-raised border border-border-subtle text-accent">
            <Terminal className="w-4 h-4" />
          </span>
          <span className="font-display text-base font-bold">AC.</span>
          <span className="hidden sm:inline text-xs text-text-secondary font-mono">
            / ml-systems-lab
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-sm text-sm font-mono transition-colors",
                  isActive
                    ? "text-accent bg-accent/10 border border-accent/20 font-medium"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-raised"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Resume CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
            aria-label="Toggle dark/light theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>

          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-medium bg-surface-raised hover:bg-accent/15 border border-border-subtle hover:border-accent text-text-primary hover:text-accent transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Full Height Slide-Over) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 bg-base/98 backdrop-blur-xl p-6 md:hidden flex flex-col justify-between border-t border-border-subtle animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            <span className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1">
              Navigation
            </span>
            {siteConfig.nav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-md text-base font-mono min-h-[48px] border transition-colors",
                    isActive
                      ? "bg-accent/10 border-accent/40 text-accent font-semibold"
                      : "bg-surface border-border-subtle text-text-primary hover:bg-surface-raised"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-text-secondary">&rarr;</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-border-subtle space-y-3">
            <div className="text-xs font-mono text-text-secondary">
              {siteConfig.credibility}
            </div>
            <div className="flex gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-md bg-surface text-center font-mono text-xs border border-border-subtle hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-md bg-surface text-center font-mono text-xs border border-border-subtle hover:text-accent"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
