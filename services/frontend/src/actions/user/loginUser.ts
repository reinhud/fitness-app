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
        const requestFormData = new FormData();
        requestFormData.append('username', formData.email);
        requestFormData.append('password', formData.password);
        console.log('Logging in:', requestFormData);

        const res = await fetch(`http://fitness-app-backend-dev:8000/auth/login`, {
            method: 'POST',
            body: requestFormData,
        });
        console.log('res:', res);
        if (!res.ok) {
            console.log('Failed to log in:', res.status, res.statusText);
            throw new Error('Failed to log in');
        }

        console.log('Logged in:', await res.json());


    } catch (error) {
        console.error('Error logging in:', error);
        return {
            message: "Error logging in"
        }
    }

    redirect("/");

}
