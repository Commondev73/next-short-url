import { z } from "zod";

export const updateShortUrlSchema = z.object({
  original_url: z.url("Invalid URL").optional(),
  title: z.string().max(255).optional(),
  is_active: z.boolean().optional(),
  expires_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

export type UpdateShortUrlDto = z.infer<typeof updateShortUrlSchema>;
