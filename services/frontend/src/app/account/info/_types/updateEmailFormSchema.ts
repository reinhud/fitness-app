import { z } from "zod";

export const updateEmailFormSchema = z.object({
    email: z.string().trim().min(1, { message: "E-Mail must be provided"}).email({ message: "Invalid email address" }),
})