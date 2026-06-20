import { z } from "zod";

export const createShortUrlSchema = z.object({
  original_url: z.url("Invalid URL"),
  title: z.string().max(255).optional(),
  is_active: z.boolean().optional().default(true),
  expires_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export type CreateShortUrlDto = z.infer<typeof createShortUrlSchema>;
