import { z } from "zod";

export const ExperimentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  objective: z.string(),
  hypothesis: z.string(),
  setup: z.object({
    hardware: z.string(),
    framework: z.string(),
    dataset: z.string(),
    parameters: z.record(z.string()),
  }),
  resultsSummary: z.string(),
  dataPoints: z.array(
    z.object({
      stepOrEpoch: numberOrString(),
      metricA: z.number(),
      metricB: z.number(),
      labelA: z.string().optional(),
      labelB: z.string().optional(),
    })
  ),
  conclusions: z.array(z.string()),
  status: z.enum(["completed", "running", "inconclusive"]),
});

function numberOrString() {
  return z.union([z.number(), z.string()]);
}

export type Experiment = z.infer<typeof ExperimentSchema>;
