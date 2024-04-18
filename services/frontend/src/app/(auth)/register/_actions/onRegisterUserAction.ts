"use server"

import { redirect } from "next/navigation";
import { registrationFormSchema } from "../_types/registrationFormSchema";


export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
}

export default async function onRegisterUserAction(previousState: FormState, data: FormData): Promise<FormState> {

    const formData = Object.fromEntries(data);
    const parsed = registrationFormSchema.safeParse(formData);

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
        const requestFormData = new FormData();
        requestFormData.append('username', formData.email);
        requestFormData.append('password', formData.password);
        requestFormData.append('name', formData.username);


        const res = await fetch(`http://fitness-app-backend-dev:8000/auth/register`, {
            method: 'POST',
            body: requestFormData
        });

        if (!res.ok) {
            const data = await res.json();
            console.log('Failed to register:', data.detail);
            return {
                message: data.detail || "Failed to register",
            };
        }

    } catch (error) {
        console.error('Error signing up:', error);
        return {
            message: (error as Error).message || "An error occurred while signing up",
        }
    }

    redirect("/register/confirmation");

}
