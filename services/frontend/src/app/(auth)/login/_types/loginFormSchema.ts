import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().trim().min(1, { message: "E-Mail must be provided" }).email({ message: "Invalid email address" }),
    password: z.string().trim().min(4, { message: "Password must be at least 4 characters" }),
})
