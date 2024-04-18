'use client'

import { useFormState } from "react-dom";
import onLoginUserAction from "./_actions/onLoginUserAction";

import FormSubmitButton from "@/components/general/buttons/formSubmitButton";
import IconButton from "@/components/general/buttons/iconButton";
import CardWrapper from "@/components/general/cards/cardWrapper";
import { PasswordInput } from "@/components/general/forms/passwordInput";
import AlertMessage from "@/components/general/messages/alertMessage";
import { Button } from "@/components/ui/button";
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

import Link from 'next/link';
import { loginFormSchema } from "./_types/loginFormSchema";


export default function Login() {
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
        footerText="Don't have an account?"
        backButtonHref="/register"
        backButtonLabel="Register here."
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
                                    <Input placeholder="" {...field} />                             
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
                                <Label>Password</Label>
                                <FormControl>
                                    <PasswordInput placeholder="" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSubmitButton title="Login" />
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

            <Button variant="link" className="text-sm p-2 w-full" asChild>
                <Link href="/forgot-password">
                    Forgot Password?
                </Link>
            </Button>

            

            {/* Seperator */}  
            <div className="flex items-center mt-2 mb-2">
                <hr className="w-full border-muted-200"/>
                <div className="px-4 text-muted-foreground">or</div>
                <hr className="w-full border-muted-200"/>
            </div>

            {/* External auth provider button */}  
            <div className="space-y-2">
                <IconButton iconName="logos:google-icon" title="Continue with Google" onClick={() => console.log('Register with Google')} />
                <IconButton iconName="logos:microsoft-icon" title="Continue with Microsoft" onClick={() => console.log('Register with Microsoft')} />
                <IconButton iconName="ion:logo-apple" title="Continue with Apple" onClick={() => console.log('Register with Apple')} />
            </div>
            
        </CardWrapper>
        
    )
}
