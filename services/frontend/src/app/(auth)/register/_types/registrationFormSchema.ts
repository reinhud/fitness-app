import { z } from "zod";


export const registrationFormSchema = z.object({
    username: z.string().trim().min(1, { message: "Username must be provided" }),
    email: z.string().trim().min(1, { message: "E-Mail must be provided"}).email({ message: "Invalid email address" }),
    password: z.string().trim().min(4, { message: "Password must be at least 4 characters" }),
    confirmPassword: z.string().trim().min(4, { message: "Password must be at least 4 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});;