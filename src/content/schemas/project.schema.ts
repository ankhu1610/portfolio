import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string().max(250),
  researchQuestion: z.string(),
  duration: z.string(),
  status: z.enum(["active", "paused", "archived", "shipped"]),
  verificationStatus: z.enum(["verify", "verified"]).optional(),
  domain: z.enum(["llm", "diffusion", "systems", "rec-sys", "security", "other"]),
  tags: z.array(z.string()),
  technologies: z.array(z.string()),
  heroImage: z.string().optional(),
  featured: z.boolean().default(false),
  links: z.object({
    github: z.string().url().optional(),
    paper: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),

  // Optional lifecycle stage breakdown (crucial for honest tracking of active research)
  developmentStage: z
    .object({
      implemented: z.array(z.string()),
      inExperiment: z.array(z.string()),
      planned: z.array(z.string()),
    })
    .optional(),

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
        nodeId: z.string().optional(),
        relevantExperimentSlug: z.string().optional(),
        relevantNoteSlug: z.string().optional(),
        benchmarkLink: z.string().optional(),
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
    benchmarkData: z
      .array(
        z.object({
          xLabel: z.string(),
          baseline: z.number(),
          optimized: z.number(),
          unit: z.string().optional(),
        })
      )
      .optional(),
  }),

  // Evidence Model: Grounded quantitative claims with methodology & conditions
  evidence: z
    .array(
      z.object({
        claim: z.string(),
        metric: z.string(),
        value: z.string(),
        baseline: z.string().optional(),
        methodology: z.string(),
        hardware: z.string().optional(),
        dataset: z.string().optional(),
        artifact: z.string().optional(),
      })
    )
    .optional(),

  // Component Ablation Model: Answering "Which component produced the gain?"
  ablations: z
    .array(
      z.object({
        name: z.string(),
        configuration: z.string(),
        metric: z.string(),
        result: z.string(),
        interpretation: z.string(),
      })
    )
    .optional(),

  // Failure Analysis: Intellectual honesty on failed hypotheses & negative results
  failedExperiments: z
    .array(
      z.object({
        hypothesis: z.string(),
        result: z.string(),
        interpretation: z.string(),
      })
    )
    .optional(),

  // Known Limitations & Boundary Conditions
  limitations: z.array(z.string()).optional(),

  benchmarks: z
    .array(
      z.object({
        name: z.string(),
        ours: z.string(),
        baseline: z.string(),
        speedup: z.string(),
        notes: z.string(),
      })
    )
    .optional(),
  lessonsLearned: z.array(z.string()),
  futureImprovements: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ArchitectureComponent = z.infer<typeof ProjectSchema>["architecture"]["components"][number];
export type EvidenceItem = NonNullable<z.infer<typeof ProjectSchema>["evidence"]>[number];
export type AblationItem = NonNullable<z.infer<typeof ProjectSchema>["ablations"]>[number];
export type FailedExperimentItem = NonNullable<z.infer<typeof ProjectSchema>["failedExperiments"]>[number];
