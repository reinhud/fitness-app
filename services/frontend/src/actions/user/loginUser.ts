"use server"
import { loginFormSchema } from "@/types/user/userForms";
import { redirect } from "next/navigation";


export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
}

export default async function onLoginUserAction(previousState: FormState, data: FormData): Promise<FormState> {

    const formData = Object.fromEntries(data);
    const parsed = loginFormSchema.safeParse(formData);

    if (!parsed.success) {
        const fields: Record<string, string> = {};
        for (const key of Object.keys(formData)) {
            fields[key] = formData[key].toString()
        }
        return {
            message: "Invalid form data",
            fields,
            issues: parsed.error.issues.map(issue => issue.message),
        }
    }

    try {
        // Send POST request to example API endpoint (JSONPlaceholder)
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!res.ok) {
            console.log('Failed to log in:', res.status, res.statusText);
            throw new Error('Failed to log in');
        }

        // Parse response JSON
        const responseData = await res.json();

        console.log('Logged in:', responseData);


    } catch (error) {
        console.error('Error logging in:', error);
        return {
            message: "Error logging in"
        }
    }

    redirect("/");

}
