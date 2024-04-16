'use client'
import onLoginUserAction from "@/actions/user/loginUser";
import { useFormState } from "react-dom";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/types/user/userForms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ExternalAuthProviderButton from "../buttons/externalAuthProviderButton";
import SubmitButton from "../buttons/submitButton";
import CardWrapper from "../card/cardWrapper";
import { PasswordInput } from "./passwordInput";



export default function LoginForm() {
    const [state, formAction] = useFormState(onLoginUserAction, {
        message: ""
    })

        
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            ...(state.fields ?? {})
        },
    })

    const formRef = useRef<HTMLFormElement>(null);

    return(
        <CardWrapper
        label="Login to your account"
        title="Login"
        backButtonHref="/register"
        backButtonLabel="Don't have an account? Register here."
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
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
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
                    <SubmitButton>Submit</SubmitButton>
                </form>
                {state?.message && !state.issues && <p className="text-blue-500">{state.message}</p>}
                {state.issues && <ul className="text-red-500">
                    {state.issues.map((issue, index) => <li key={index}>{issue}</li>)}
                </ul>}
            </Form>  
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