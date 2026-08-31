"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
  className?: string;
}

export function SectionNav({ sections, className }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => {
      const element = document.getElementById(s.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-16 z-20 py-2.5 px-3 rounded-md bg-surface/90 backdrop-blur border border-border-subtle overflow-x-auto no-scrollbar",
        className
      )}
      aria-label="In-page Table of Contents"
    >
      <ul className="flex items-center gap-1 min-w-max text-xs font-mono">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => scrollToSection(e, section.id)}
                className={cn(
                  "px-2.5 py-1 rounded-sm transition-colors block select-none",
                  isActive
                    ? "bg-accent/15 text-accent font-medium border border-accent/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-raised"
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
