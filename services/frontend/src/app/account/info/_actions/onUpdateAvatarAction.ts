

"use server"
import { z } from "zod";

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
}

const updateAvatarFormSchema = z.object({
    Avatar: z.any()
})


export default async function onUpdateAvatarAction() {
    console.log("Updating Avatar")
}