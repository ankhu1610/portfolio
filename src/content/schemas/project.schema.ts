import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string().max(250),
  duration: z.string(),
  status: z.enum(["active", "paused", "archived", "shipped"]),
  domain: z.enum(["llm", "diffusion", "systems", "security", "other"]),
  tags: z.array(z.string()),
  technologies: z.array(z.string()),
  heroImage: z.string().optional(),
  featured: z.boolean().default(false),
  links: z.object({
    github: z.string().url().optional(),
    paper: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
  // Case Study Sections
  problem: z.string(),
  motivation: z.string(),
  architecture: z.object({
    caption: z.string(),
    description: z.string(),
    svgPath: z.string(),
    components: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        implementationDetail: z.string(),
      })
    ),
  }),
  implementation: z.array(
    z.object({
      decision: z.string(),
      rationale: z.string(),
      tradeoff: z.string(),
      codeSnippet: z.string().optional(),
    })
  ),
  challenges: z.array(
    z.object({
      title: z.string(),
      problem: z.string(),
      rootCause: z.string(),
      solution: z.string(),
      status: z.enum(["resolved", "in-progress", "mitigated"]),
    })
  ),
  experiments: z.object({
    description: z.string(),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        delta: z.string().optional(),
        context: z.string(),
      })
    ),
    benchmarkData: z.array(
      z.object({
        xLabel: z.string(),
        baseline: z.number(),
        optimized: z.number(),
        unit: z.string().optional(),
      })
    ).optional(),
  }),
  benchmarks: z.array(
    z.object({
      name: z.string(),
      ours: z.string(),
      baseline: z.string(),
      speedup: z.string(),
      notes: z.string(),
    })
  ).optional(),
  lessonsLearned: z.array(z.string()),
  futureImprovements: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;
