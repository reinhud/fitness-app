"use server"


import { redirect } from "next/navigation";
import { loginFormSchema } from "../_types/loginFormSchema";


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
        const requestFormData = new FormData();
        requestFormData.append('username', formData.email);
        requestFormData.append('password', formData.password);

        const res = await fetch(`http://fitness-app-backend-dev:8000/auth/login`, {
            method: 'POST',
            body: requestFormData,
        });

        if (!res.ok) {
            const data = await res.json();
            console.log('Failed to log in:', data.detail);
            return {
                message: data.detail || "Failed to log in",
            };
        }

        console.log('Logged in:', await res.json());

        return {
            message: "Logged in successfully",
        };


    } catch (error) {
        console.error('Error logging in:', error);
        return {
            message: (error as Error).message || "An error occurred while logging in",
        };
    } finally {
        console.log('Login action completed');
        redirect("/");
    }



}
