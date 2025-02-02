import { z } from "zod";

const positionSchema = z.object({
  name: z.string(),
  position: z.coerce.number(),
});
export type Position = z.infer<typeof positionSchema>;

export const configSchema = z.object({
  ip: z.string().ip(),
  positions: z.array(positionSchema),
});
export type Config = z.infer<typeof configSchema>;
