import { Project, ProjectSchema } from "@/content/schemas/project.schema";
import { Note, NoteSchema } from "@/content/schemas/note.schema";
import { Experiment, ExperimentSchema } from "@/content/schemas/experiment.schema";
import { Experience, ExperienceSchema } from "@/content/schemas/experience.schema";

import { llmFromScratchProject } from "@/content/data/projects/llm-from-scratch";
import { stableDiffusionProject } from "@/content/data/projects/stable-diffusion-from-scratch";
import { kvCacheNote } from "@/content/data/notes/kv-cache-memory-tradeoffs";
import { cfgScaleNote } from "@/content/data/notes/cfg-scale-vs-diversity";
import { sftVsRlhfExperiment } from "@/content/data/experiments/sft-vs-rlhf-convergence";
import { experiencesData } from "@/content/data/experience/timeline";

// Raw lists
const rawProjects: Project[] = [llmFromScratchProject, stableDiffusionProject];
const rawNotes: Note[] = [kvCacheNote, cfgScaleNote];
const rawExperiments: Experiment[] = [sftVsRlhfExperiment];
const rawExperiences: Experience[] = experiencesData;

// Validate all content at module evaluation time with Zod
export function getAllProjects(): Project[] {
  return rawProjects.map((p) => ProjectSchema.parse(p));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const project = rawProjects.find((p) => p.slug === slug);
  if (!project) return undefined;
  return ProjectSchema.parse(project);
}

export function getAdjacentProjects(currentSlug: string): {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
} {
  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? { title: all[index - 1].title, slug: all[index - 1].slug } : undefined,
    next: index < all.length - 1 ? { title: all[index + 1].title, slug: all[index + 1].slug } : undefined,
  };
}

export function getAllNotes(): Note[] {
  return rawNotes.map((n) => NoteSchema.parse(n));
}

export function getNoteBySlug(slug: string): Note | undefined {
  const note = rawNotes.find((n) => n.slug === slug);
  if (!note) return undefined;
  return NoteSchema.parse(note);
}

export function getAllExperiments(): Experiment[] {
  return rawExperiments.map((e) => ExperimentSchema.parse(e));
}

export function getExperimentBySlug(slug: string): Experiment | undefined {
  const exp = rawExperiments.find((e) => e.slug === slug);
  if (!exp) return undefined;
  return ExperimentSchema.parse(exp);
}

export function getAllExperiences(): Experience[] {
  return rawExperiences.map((e) => ExperienceSchema.parse(e));
}
