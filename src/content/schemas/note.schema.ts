import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().max(250),
  date: z.string(),
  topic: z.string(),
  tags: z.array(z.string()),
  relatedProjectSlug: z.string().optional(),
  content: z.string(),
  keyTakeaways: z.array(z.string()).optional(),
  mathOrCodeFormula: z.string().optional(),
});

export type Note = z.infer<typeof NoteSchema>;
