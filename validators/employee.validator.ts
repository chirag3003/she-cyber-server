import { z } from "zod";

export const createEmployeeValidator = z.object({
  name: z.string().min(1),
  employeeID: z.string().min(1),
  email: z.string().email(),
  phoneNo: z.string().min(1),
  alternatePhoneNo: z.string().optional(),
  aadharNo: z.string().min(1),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeValidator>;
