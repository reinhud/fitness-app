"use server"

import { redirect } from "next/navigation";
import { forgotPasswordFormSchema } from "../_types/forgotPasswordFormSchema";


export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
}

export default async function onForgotPasswordAction(previousState: FormState, data: FormData): Promise<FormState> {

    const formData = Object.fromEntries(data);
    const parsed = forgotPasswordFormSchema.safeParse(formData);

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
        requestFormData.append('email', formData.email);
        requestFormData.append('confirm_email', formData.confirmEmail);

        const res = await fetch(`http://fitness-app-backend-dev:8000/user/forgot-password`, {
            method: 'POST',
            body: requestFormData,
        });

        if (!res.ok) {
            const data = await res.json();
            console.log('Failed to trigger forgot password:', data.detail);
            return {
                message: data.detail || "Failed to trigger forgot password",
            };
        }

    } catch (error) {
        console.error('Error trigger forgot password:', error);
        return {
            message: (error as Error).message || "An error occurred while trigger forgot password",
        };
    }

    redirect("/forgot-password/confirmation");
}
