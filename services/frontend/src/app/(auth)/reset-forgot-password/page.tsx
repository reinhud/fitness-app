'use client'

import { useFormState } from "react-dom";

import FormSubmitButton from "@/components/general/buttons/formSubmitButton";
import CardWrapper from "@/components/general/cards/cardWrapper";
import AlertMessage from "@/components/general/messages/alertMessage";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { PasswordInput } from "@/components/general/forms/passwordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import onForgotPasswordResetAction from "./_actions/onForgotPasswordResetAction";
import { forgotPasswordResetFormSchema } from "./_types/forgotPasswordResetFormSchema";

export default function ForgotPasswordReset() {
    const [state, formAction] = useFormState(onForgotPasswordResetAction, {
        message: ""
    })

        
    const form = useForm<z.infer<typeof forgotPasswordResetFormSchema>>({
        resolver: zodResolver(forgotPasswordResetFormSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
            ...(state.fields ?? {})
        },
    })
    const formRef = useRef<HTMLFormElement>(null);

    return(
        <CardWrapper
        label="Dont worry, we will help you out! You will receive an email with instructions on how to reset your password."
        title="Forgot Password"
        footerText="Already have an account?"
        backButtonHref="/login"
        backButtonLabel="Login here."
        >
            <Form {...form}>
                <form 
                    className="space-y-6"
                    ref={formRef} 
                    action={formAction} 
                    onSubmit={form.handleSubmit(() => formRef.current?.submit())} 
                    
                >   
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <Label>New Password</Label> 
                                <FormControl>
                                    <PasswordInput placeholder="" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Confirm Password</Label> 
                                    <FormControl>
                                        <PasswordInput placeholder="" type="password" {...field} />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSubmitButton title="Reset password" />
                </form>
                <div className="mt-2">
                    {state?.message && !state.issues && <AlertMessage message={state.message} />}
                    {state.issues && 
                        <AlertMessage message={
                            <ul>
                                {state.issues.map((issue, index) => <li key={index}>{issue}</li>)}
                            </ul>} 
                        /> 
                    }
                </div>
            </Form>
        </CardWrapper>
        
    )
}
