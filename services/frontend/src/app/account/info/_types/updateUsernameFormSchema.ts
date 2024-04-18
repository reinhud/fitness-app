import { z } from "zod";

export const updateUsernameFormSchema = z.object({
    username: z.string().trim().min(1, { message: "Username must be provided" })
})