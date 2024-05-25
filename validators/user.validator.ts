import { z } from "zod";

export const createUserValidator = z.object({
  name: z.string().min(1).max(20).optional(),
  email: z.string().email().optional(),
  phoneNo: z.string().length(10),
  password: z.string().min(8).max(20),
});

export type CreateUserInput = z.infer<typeof createUserValidator>;

export const loginUserValidator = z.object({
  identity: z.string(),
  password: z.string().min(8).max(20),
});

export const responseUserValidator = z.object({
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phoneNo: z.string(),
});
