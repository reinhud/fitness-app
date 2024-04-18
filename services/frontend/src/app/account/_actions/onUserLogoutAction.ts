"use server"

import { redirect } from "next/navigation";


export default async function onUserLogoutAction() {
    try {
        const res = await fetch("http://fitness-app-backend-dev:8000/auth/logout", {
            method: 'POST',
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

    redirect("/login");
}
