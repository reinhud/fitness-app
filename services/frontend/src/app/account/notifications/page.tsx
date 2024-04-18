'use client';

import FormSubmitButton from '@/components/general/buttons/formSubmitButton';
import InfoMessage from '@/components/general/messages/infoMessage';
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import AccountHeader from '../_components/accountHeader';

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
        <>
            <AccountHeader title="Notification Preferences" />
            <main>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div>
                        <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="accountUpdates"
                            render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
                                    className="data-[state=unchecked]:bg-accent-200 data-[state=checked]:bg-accent-800" 
                                />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marketing"
                            render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
                                    className="data-[state=unchecked]:bg-accent-200 data-[state=checked]:bg-accent-800" 
                                    disabled
                                    aria-readonly
                                />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        </div>
                    </div>
                    <InfoMessage message="You can change your preferences anytime." />
                    <FormSubmitButton title='Save Changes' />
                    </form>
                </Form>
            </main>           
        </>
    );
}