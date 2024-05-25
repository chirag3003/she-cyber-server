import {z} from "zod";

export const createPropertyValidator = z.object({
    name: z.string().min(5),
    about: z.string().min(10),
    area: z.number().positive(),
    price: z.number().positive(),
    soilType: z.string(),
    plantationType: z.string().optional(),
    images: z.array(z.string()).default([]),
    pincode: z.string().length(6),
    fullAddress: z.string(),
    district: z.string(),
})

export type CreatePropertyInput = z.infer<typeof createPropertyValidator>