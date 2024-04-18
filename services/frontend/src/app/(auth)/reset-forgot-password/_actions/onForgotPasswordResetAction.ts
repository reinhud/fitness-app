"use server"

import { redirect } from "next/navigation";
import { forgotPasswordResetFormSchema } from "../_types/forgotPasswordResetFormSchema";


export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
}

export default async function onForgotPasswordResetAction(previousState: FormState, data: FormData): Promise<FormState> {

    const formData = Object.fromEntries(data);
    const parsed = forgotPasswordResetFormSchema.safeParse(formData);

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
        requestFormData.append('new_password', formData.newPassword);
        requestFormData.append('confirm_password', formData.confirmPassword);

        const res = await fetch(`http://fitness-app-backend-dev:8000/user/reset-forgot-password`, {
            method: 'POST',
            body: requestFormData,
            credentials: 'include',
        });

        if (!res.ok) {
            const data = await res.json();
            console.log('Failed to reset forgot password:', data.detail);
            return {
                message: data.detail || "Failed to reset forgot password",
            };
        }

    } catch (error) {
        console.error('Error reset forgot password:', error);
        return {
            message: (error as Error).message || "An error occurred while reset forgot password",
        };
    }

    redirect("/forgot-password/confirmation");
}
