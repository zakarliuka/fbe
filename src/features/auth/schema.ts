import { z } from "zod";

export type UserCredsParams = Zod.infer<typeof userCreds>;

export const userCreds = z.object({
  body: z.object({
    username: z.string().min(2),
    password: z.string().min(6),
  }),
});
