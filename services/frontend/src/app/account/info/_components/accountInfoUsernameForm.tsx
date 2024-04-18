import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormSubmitButton from "@/components/general/buttons/formSubmitButton";
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
import onUpdateUsernameAction from "../_actions/onUpdateUsernameAction";
import { updateUsernameFormSchema } from "../_types/updateUsernameFormSchema";


export default function AccountInfoUsernameForm() {
    const [state, formAction] = useFormState(onUpdateUsernameAction, {
        message: ""
    })

    const form = useForm<z.infer<typeof updateUsernameFormSchema>>({
        resolver: zodResolver(updateUsernameFormSchema),
        defaultValues: {
            username: "",
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
                    <DialogTitle>Update Username</DialogTitle>
                </DialogHeader>
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
                                    <Label>Username</Label>
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