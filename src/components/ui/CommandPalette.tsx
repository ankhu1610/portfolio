"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Terminal, BookOpen, Activity, Cpu, ArrowRight, CornerDownLeft } from "lucide-react";
import { getAllProjects, getAllNotes, getAllExperiments } from "@/lib/content-api";

interface SearchResultItem {
  id: string;
  category: "Projects" | "Notes" | "Experiments" | "Benchmarks";
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const projects = getAllProjects();
  const notes = getAllNotes();
  const experiments = getAllExperiments();

  const benchmarkItems: SearchResultItem[] = [
    {
      id: "bench-llm",
      category: "Benchmarks",
      title: "LLM Decode Throughput Curve",
      subtitle: "Throughput & memory scaling across 512 to 4096 context lengths",
      href: "/lab/benchmarks#kv-cache",
      badge: "84.6 tok/s",
    },
    {
      id: "bench-rag",
      category: "Benchmarks",
      title: "RAGDoctor Fault Isolation F1",
      subtitle: "Diagnostic Macro-F1 across 245 controlled fault-injected cases",
      href: "/lab/benchmarks#rag-retrieval",
      badge: "91.8% F1",
    },
    {
      id: "bench-lora",
      category: "Benchmarks",
      title: "LoRA Hot-Swap Latency",
      subtitle: "Multi-tenant adapter transition time over PCI-e Gen4 bus",
      href: "/lab/benchmarks#lora-switching",
      badge: "85 ms",
    },
    {
      id: "bench-recsys",
      category: "Benchmarks",
      title: "NextSense Sequential Recall@10",
      subtitle: "Holdout candidate generation accuracy across model architectures",
      href: "/lab/benchmarks#recsys-ranking",
      badge: "34.2% Recall",
    },
    {
      id: "bench-hinglish",
      category: "Benchmarks",
      title: "HinglishLM Subword Fertility",
      subtitle: "Tokens/word and character compression across tokenizers",
      href: "/lab/benchmarks#tokenization-fertility",
      badge: "1.74 tok/w",
    },
  ];

  // Global Keydown Listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Autofocus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Search indexing
  const q = query.toLowerCase().trim();

  const filteredProjects: SearchResultItem[] = projects
    .filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
    .map((p) => ({
      id: `proj-${p.slug}`,
      category: "Projects",
      title: p.title,
      subtitle: p.summary,
      href: `/projects/${p.slug}`,
      badge: p.status,
    }));

  const filteredNotes: SearchResultItem[] = notes
    .filter(
      (n) =>
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    )
    .map((n) => ({
      id: `note-${n.slug}`,
      category: "Notes",
      title: n.title,
      subtitle: n.excerpt,
      href: `/lab/notes/${n.slug}`,
      badge: n.topic,
    }));

  const filteredExperiments: SearchResultItem[] = experiments
    .filter(
      (e) =>
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.objective.toLowerCase().includes(q) ||
        e.hypothesis.toLowerCase().includes(q)
    )
    .map((e) => ({
      id: `exp-${e.slug}`,
      category: "Experiments",
      title: e.title,
      subtitle: e.hypothesis,
      href: `/lab/experiments#${e.slug}`,
      badge: e.status,
    }));

  const filteredBenchmarks = benchmarkItems.filter(
    (b) => !q || b.title.toLowerCase().includes(q) || b.subtitle.toLowerCase().includes(q)
  );

  const allResults: SearchResultItem[] = [
    ...filteredProjects,
    ...filteredNotes,
    ...filteredExperiments,
    ...filteredBenchmarks,
  ];

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (allResults.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allResults.length) % (allResults.length || 1));
    } else if (e.key === "Enter" && allResults[selectedIndex]) {
      e.preventDefault();
      navigateTo(allResults[selectedIndex].href);
    }
  };

  const navigateTo = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-surface border border-border-subtle shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-border-subtle flex items-center gap-3 bg-surface-raised">
          <Search className="w-4 h-4 text-accent flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search projects, research notes, experiments, benchmarks..."
            className="w-full bg-transparent text-sm font-mono text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-surface border border-border-subtle text-[10px] font-mono text-text-secondary">
            ESC
          </kbd>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close search modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-border-subtle/40">
          {allResults.length > 0 ? (
            allResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => navigateTo(item.href)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                    isSelected ? "bg-surface-raised border border-accent/40" : "hover:bg-surface-raised/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="p-1.5 rounded bg-surface border border-border-subtle text-accent mt-0.5 flex-shrink-0">
                      {item.category === "Projects" && <Terminal className="w-3.5 h-3.5" />}
                      {item.category === "Notes" && <BookOpen className="w-3.5 h-3.5" />}
                      {item.category === "Experiments" && <Activity className="w-3.5 h-3.5" />}
                      {item.category === "Benchmarks" && <Cpu className="w-3.5 h-3.5" />}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-accent uppercase font-semibold">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-text-primary truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] font-mono text-text-secondary line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface border border-border-subtle text-text-secondary uppercase">
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-accent hidden sm:block" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs font-mono text-text-secondary">
              No matching artifacts found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-2.5 px-4 bg-surface-raised border-t border-border-subtle text-[11px] font-mono text-text-secondary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to dismiss</span>
          </div>
          <span className="text-accent">ML Systems Lab Explorer</span>
        </div>
      </div>
    </div>
  );
}
