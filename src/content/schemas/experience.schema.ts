import { z } from "zod";

export const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  organization: z.string(),
  location: z.string(),
  duration: z.string(),
  period: z.string(),
  type: z.enum(["academic", "industry", "research"]),
  isCurrent: z.boolean().default(false),
  summary: z.string(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()),
  domain: z.enum(["ml_research", "cybersecurity", "robotics", "engineering"]),
  credentialOrVerification: z.string().optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
