import { z } from "zod";


export const loginFormSchema = z.object({
    username: z.string().min(1, { message: "E-Mail must be provided" }).email({ message: "Invalid email address" }),
    password: z.string().min(4, { message: "Password must be at least 8 characters" }),
})

export const registrationFormSchema = z.object({
    username: z.string().min(1, { message: "E-Mail must be provided"}).email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});;

export const passwordResetFormSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

