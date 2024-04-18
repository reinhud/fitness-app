"use server"

export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
}

export default async function onSendSupportMessageAction(previousState: FormState, data: FormData): Promise<FormState> {
    console.log("Updating email")
}