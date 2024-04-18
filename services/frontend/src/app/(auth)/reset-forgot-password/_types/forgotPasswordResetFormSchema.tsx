import { z } from "zod";


export const forgotPasswordResetFormSchema = z.object({
    newPassword: z.string().trim().min(4, { message: "Password must be at least 4 characters" }),
    confirmPassword: z.string().trim().min(4, { message: "Password must be at least 4 characters" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});;