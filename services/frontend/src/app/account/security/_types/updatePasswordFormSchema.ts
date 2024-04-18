import { z } from "zod";

export const updatePasswordFormSchema = z.object({
    currentPassword: z.string().trim().min(4, { message: "Must be at least 4 characters" }),
    password: z.string().trim().min(4, { message: "Must be at least 4 characters" }),
    confirmPassword: z.string().trim().min(4, { message: "Must be at least 4 characters" })
})