import FormSubmitButton from "@/components/general/buttons/formSubmitButton";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEmailFormSchema } from "@/types/account/accountFormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import onUpdateEmailAction from "../_actions/onUpdateEmailAction";

export default function AccountInfoEmailForm() {
    const [state, formAction] = useFormState(onUpdateEmailAction, {
        message: ""
    })

    const form = useForm<z.infer<typeof updateEmailFormSchema>>({
        resolver: zodResolver(updateEmailFormSchema),
        defaultValues: {
            email: "",
            ...(state.fields ?? {})
        },
    })

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Dialog>
            <DialogTrigger>
                <Icon icon="lucide:edit" className="text-accent-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="max-w-md w-[90%] rounded-md">
                <DialogHeader className="mb-4 text-start">
                    <DialogTitle>Update Email</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-sm text-muted-foreground text-start">
                    We will send you a confirmation email to verify your new contacts.
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
                        <FormSubmitButton title="Update" />  
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}