import {z} from "zod";

export const complaintStatusValidator = z.enum(["opened",
    "processing",
    "closed",
    "unsolved",
    "solved"
]);

export type ComplaintStatus = z.infer<typeof complaintStatusValidator>;

export const createComplaintValidator = z.object({
    name: z.string(),
    email: z.string().email().optional(),
    phoneNo: z.string().min(10).max(10),
    alternatePhoneNo: z.string().min(10).max(10).optional(),
    relativeName: z.string().optional(),
    aadharNo: z.string().min(12).max(12),
    complaintType: z.string(),
    attachments: z.array(z.string()),
    policeStation: z.string(),
    offenceTime: z.string(),
    description: z.string(),
    additionalDetails: z.string().default(""),
    suspectDetails: z.string().default(""),
    referencedBy: z.string().default(""),
});

export type CreateComplaintInput = z.infer<typeof createComplaintValidator>;

export const createComplaintNoteValidator = z.object({
    complaint: z.string(),
    note: z.string(),
});

export type CreateComplaintNoteInput = z.infer<
    typeof createComplaintNoteValidator
>;
