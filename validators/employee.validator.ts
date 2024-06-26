import {z} from "zod";

export const createEmployeeValidator = z.object({
    name: z.string().min(1),
    employeeID: z.string().min(1),
    email: z.string().email(),
    phoneNo: z.string().length(10),
    alternatePhoneNo: z.string().default(""),
    aadharNo: z.string().length(12),
    password: z.string().min(8).max(20),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeValidator>;

export const loginEmployeeValidator = z.object({
    phoneNo: z.string().length(10),
    password: z.string().min(8).max(20),
});

export const responseEmployeeValidator = z.object({
    id: z.string(),
    name: z.string().min(1),
    email: z.string().email(),
    phoneNo: z.string().length(10),
    alternatePhoneNo: z.string().default(""),
    aadharNo: z.string().length(12),
    employeeID: z.string().min(1),
    profileImage: z.string().nullable().default(""),
    createdAt: z.string(),
})

export const updateEmployeeValidator = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phoneNo: z.string().length(10),
    alternatePhoneNo: z.string().default(""),
    aadharNo: z.string().length(12),
    employeeID: z.string().min(1),
})

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeValidator>;