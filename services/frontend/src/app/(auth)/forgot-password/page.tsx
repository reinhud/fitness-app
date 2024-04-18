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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import onForgotPasswordAction from "./_actions/onForgotPasswordAction";
import { forgotPasswordFormSchema } from "./_types/forgotPasswordFormSchema";

export default function ForgotPassword() {
    const [state, formAction] = useFormState(onForgotPasswordAction, {
        message: ""
    })

        
    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
            confirmEmail: "",
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Email</Label> 
                                <FormControl>
                                    <Input placeholder="" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmEmail"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Confirm Email</Label> 
                                    <FormControl>
                                        <Input placeholder="" type="email"  {...field} />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSubmitButton title="Send reset mail" />
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
