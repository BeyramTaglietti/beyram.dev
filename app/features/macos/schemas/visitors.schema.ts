import { z } from "zod";

export const addVisitorSchema = z.object({
  visitor_name: z.string().min(4).max(20),
});
