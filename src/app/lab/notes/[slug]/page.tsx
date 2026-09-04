import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getNoteBySlug, getAllNotes, getProjectBySlug } from "@/lib/content-api";
import { TechBadge } from "@/components/ui/TechBadge";
import { MathFormula } from "@/components/ui/MathFormula";
import { ArrowLeft, BookOpen, CheckCircle2, Terminal } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const note = getNoteBySlug(params.slug);
  if (!note) return { title: "Note Not Found" };
  return {
    title: note.title,
    description: note.excerpt,
  };
}

export default function NoteDetailPage({ params }: { params: { slug: string } }) {
  const note = getNoteBySlug(params.slug);
  if (!note) notFound();

  const relatedProject = note.relatedProjectSlug
    ? getProjectBySlug(note.relatedProjectSlug)
    : undefined;

  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* Top Nav */}
      <div className="text-xs font-mono text-text-secondary pb-4 border-b border-border-subtle flex items-center justify-between">
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Lab</span>
        </Link>
        <span>{note.date}</span>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-accent">
          <BookOpen className="w-4 h-4" />
          <span>{note.topic}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-display font-bold text-text-primary tracking-tight leading-tight">
          {note.title}
        </h1>

        <p className="text-base text-text-secondary leading-relaxed italic border-l-2 border-accent pl-3">
          {note.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {note.tags.map((tag) => (
            <TechBadge key={tag} label={tag} variant="outline" />
          ))}
        </div>
      </header>

      {/* Related Project Banner */}
      {relatedProject && (
        <div className="p-4 rounded-md bg-surface border border-border-subtle flex items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-text-secondary block">Related Project System:</span>
            <span className="text-text-primary font-semibold">{relatedProject.title}</span>
          </div>
          <Link
            href={`/projects/${relatedProject.slug}`}
            className="px-3 py-1 rounded bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
          >
            Open Case Study &rarr;
          </Link>
        </div>
      )}

      {/* Body Content */}
      <article className="prose prose-invert max-w-none text-text-primary/90 text-sm sm:text-base leading-relaxed space-y-6">
        {note.content.split("\n\n").map((para, idx) => {
          if (para.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-xl font-display font-bold text-text-primary pt-4 pb-1 border-b border-border-subtle">
                {para.replace("### ", "")}
              </h3>
            );
          }
          if (para.startsWith("$$") && para.endsWith("$$")) {
            return (
              <div key={idx} className="p-4 my-4 rounded-md bg-surface border border-border-subtle text-center overflow-x-auto">
                <MathFormula math={para.replaceAll("$$", "").trim()} displayMode={true} />
              </div>
            );
          }
          if (para.startsWith("1. ") || para.startsWith("- ")) {
            return (
              <div key={idx} className="p-4 rounded-md bg-surface border border-border-subtle space-y-2 text-sm text-text-secondary leading-relaxed">
                {para}
              </div>
            );
          }
          return (
            <p key={idx} className="leading-relaxed text-text-secondary">
              {para}
            </p>
          );
        })}
      </article>

      {/* Key Takeaways */}
      {note.keyTakeaways && (
        <div className="p-5 rounded-md bg-surface border border-border-subtle space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Empirical Takeaways</span>
          </div>
          <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
            {note.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent font-mono text-xs mt-0.5">&bull;</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Nav */}
      <div className="pt-8 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-secondary">
        <Link href="/lab" className="hover:text-accent transition-colors">
          &larr; Return to Lab
        </Link>
        <Link href="/projects" className="hover:text-accent transition-colors">
          Explore Projects &rarr;
        </Link>
      </div>
    </div>
  );
}
