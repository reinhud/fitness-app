import { z } from "zod";

export const sendSupportMessageFormSchema = z.object({
    subject: z.string().trim().min(1, { message: "Subject must be provided" }),
    message: z.string().trim().min(1, { message: "Please provide a message" }).max(160, {
        message: "Bio must not be longer than 30 characters.",
    }),
})