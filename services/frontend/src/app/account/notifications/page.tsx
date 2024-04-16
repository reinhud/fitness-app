'use client';

import AccountHeader from '@/components/account/accountHeader';
import SubmitButton from '@/components/auth/buttons/submitButton';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    accountUpdates: z.boolean().default(false).optional(),
    marketing: z.boolean(),
})

export default function NotificationPreferences() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            accountUpdates: true,
            marketing: true,
        },
        })
    
        function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
        }
    return (
        <div className="min-h-screen bg-gray-100">
            <AccountHeader title="Notification Preferences" />
            <div className='pl-4 pr-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div>
                        <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="accountUpdates"
                            render={({ field }) => (
                            <FormItem className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                <FormLabel>Account updates</FormLabel>
                                <FormDescription>
                                    Receive notifications about your account.
                                </FormDescription>
                                </div>
                                <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-500" 
                                />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marketing"
                            render={({ field }) => (
                            <FormItem className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                <FormLabel>Marketing</FormLabel>
                                <FormDescription>
                                    Receive notifications about new products, features, and more.
                                </FormDescription>
                                </div>
                                <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-500" 
                                    disabled
                                    aria-readonly
                                />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        </div>
                    </div>
                    <div className="flex items-center w-full bg-blue-200 rounded-md p-4 shadow-md">
                        <span className="text-blue-500 text-2xl mr-4">
                            <Icon icon="mdi:information-outline" />
                        </span>
                        <p className="text-sm text-gray-600">
                        You can change your preferences anytime.
                        </p>
                    </div>
                    <SubmitButton>Save Changes</SubmitButton>
                    </form>
                </Form>
            </div>
            
        </div>
    );
}