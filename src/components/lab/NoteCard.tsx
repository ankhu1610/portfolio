import React from "react";
import Link from "next/link";
import { Note } from "@/content/schemas/note.schema";
import { TechBadge } from "@/components/ui/TechBadge";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: Note;
  className?: string;
}

export function NoteCard({ note, className }: NoteCardProps) {
  return (
    <div
      className={cn(
        "group relative p-5 rounded-md bg-surface border border-border-subtle hover:border-accent/60 transition-all flex flex-col justify-between overflow-hidden",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-text-secondary mb-2">
          <span className="flex items-center gap-1.5 text-accent">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{note.topic}</span>
          </span>
          <span>{note.date}</span>
        </div>

        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
          <Link href={`/lab/notes/${note.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {note.title}
          </Link>
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {note.excerpt}
        </p>

        {note.mathOrCodeFormula && (
          <div className="mb-4 px-2.5 py-1.5 rounded-sm bg-surface-raised border border-border-subtle text-xs font-mono text-accent-warm">
            Formula: {note.mathOrCodeFormula}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {note.tags.map((tag) => (
            <TechBadge key={tag} label={tag} variant="outline" />
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-border-subtle/50 text-xs font-mono text-text-secondary group-hover:text-text-primary flex items-center justify-between">
        <span>Read Technical Note</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
