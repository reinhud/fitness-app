'use client';

import FormSubmitButton from "@/components/general/buttons/formSubmitButton";
import IconButton from "@/components/general/buttons/iconButton";
import { PasswordInput } from "@/components/general/forms/passwordInput";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AccountHeader from '../_components/accountHeader';
import onUpdatePasswordAction from './_actions/onUpdatePasswordAction';
import { updatePasswordFormSchema } from "./_types/updatePasswordFormSchema";

export default function LoginAndSecurity() {

    const [state, formAction] = useFormState(onUpdatePasswordAction, {
        message: ""
    })

    const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
            ...(state.fields ?? {})
        },
    })

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <AccountHeader title={"Login & Security"} />
            <main>
                <Dialog>
                    <DialogTrigger className="w-full shadow-md">
                        <IconButton
                            iconName="mdi:password-add"
                            title="Update Password"
                            onClick={() => {}}
                        />
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[90%] rounded-md mt-4">
                        <DialogHeader className="mb-4 text-start">
                            <DialogTitle>Update Password</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="text-sm text-muted-foreground">
                            We will send you a confirmation email. After you confirm, 
                            your password will be updated.
                        </DialogDescription>
                        <Form {...form}>
                            <form
                                className="space-y-6"
                                ref={formRef}
                                action={formAction}
                                onSubmit={form.handleSubmit(() => formRef.current?.submit())}

                            >
                                <FormField
                                    control={form.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Current Password</Label>
                                            <FormControl>
                                                <PasswordInput placeholder="" {...field} />                             
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
                                            <Label>New Password</Label>
                                            <FormControl>
                                                <PasswordInput placeholder="" {...field} />                             
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
                                                <PasswordInput placeholder="" {...field} />                             
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormSubmitButton title="Update" />  
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </main>
        </>
    );
}
