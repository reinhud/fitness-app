'use client'
import onRegisterUserAction from "@/actions/user/registerUser";
import { useFormState } from "react-dom";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registrationFormSchema } from "@/types/user/userForms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ExternalAuthProviderButton from "../buttons/externalAuthProviderButton";
import SubmitButton from "../buttons/submitButton";
import CardWrapper from "../card/cardWrapper";
import { PasswordInput } from "./passwordInput";



export default function RegistrationForm() {
    const [state, formAction] = useFormState(onRegisterUserAction, {
        message: ""
    })

        
    const form = useForm<z.infer<typeof registrationFormSchema>>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            ...(state.fields ?? {})
        },
    })

    const formRef = useRef<HTMLFormElement>(null);

    return(
        <CardWrapper
        label="Create an account"
        title="Register"
        backButtonHref="/login"
        backButtonLabel="Already have an account? Login here."
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                    <FormControl>
                                        <Input placeholder="Username" type="text" {...field} />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" type="email"  {...field} />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                    <FormControl>
                                        <PasswordInput placeholder="Password" type="password" {...field} />
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
                                    <FormControl>
                                        <PasswordInput placeholder="Confirm Password" type="password" {...field} />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton>Submit</SubmitButton>
                </form>
                {state?.message && !state.issues && <p className="text-red-500">{state.message}</p>}
                {state.issues && <ul className="text-red-500">
                    {state.issues.map((issue, index) => <li key={index}>{issue}</li>)}
                </ul>}
            </Form>
            {/* Separator */}
            <div className="flex items-center mt-2">
                <hr className="w-full border-gray-300"/>
                <div className="px-4 text-gray-400">or</div>
                <hr className="w-full border-gray-300"/>
            </div>

            {/* External auth provider button */}  
            <ExternalAuthProviderButton iconName="logos:google-icon" title="Continue with Google" onClick={() => console.log('Register with Google')} />
            <ExternalAuthProviderButton iconName="logos:microsoft-icon" title="Continue with Microsoft" onClick={() => console.log('Register with Microsoft')} />
            <ExternalAuthProviderButton iconName="ion:logo-apple" title="Continue with Apple" onClick={() => console.log('Register with Apple')} />
        </CardWrapper>
        
    )
}