"use server"
import { registrationFormSchema } from "@/types/user/userForms";
import { redirect } from "next/navigation";


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
            console.log('Failed to register:', res.status, res.statusText);
            throw new Error('Failed to register');
        }
    } catch (error) {
        console.error('Error signing up:', error);
        return {
            message: "Error signing up"
        }
    }

    redirect("/");

}
