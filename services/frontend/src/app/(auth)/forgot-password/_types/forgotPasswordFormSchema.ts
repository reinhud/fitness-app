import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
    email: z.string().trim().min(1, { message: "E-Mail must be provided"}).email({ message: "Invalid email address" }),
    confirmEmail: z.string().trim().min(1, { message: "E-Mail must be provided"}).email({ message: "Invalid email address" }),
}).refine((data) => data.email === data.confirmEmail, {
    message: "E-Mails do not match",
    path: ["confirmEmail"], // path of error
});;