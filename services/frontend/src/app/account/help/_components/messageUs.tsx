import FormSubmitButton from '@/components/general/buttons/formSubmitButton';
import IconButton from '@/components/general/buttons/iconButton';
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { sendSupportMessageFormSchema } from "@/types/account/accountFormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useRef } from 'react';
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import onSendSupportMessageAction from "../_actions/onSendSupportMessageAction";

const subjects = [
    { label: "Account", value: "Account" },
    { label: "Feature Request", value: "Feature Request" },
    { label: "General", value: "General" },

] as const;



export default function MessageUsPopover() {
    const [state, formAction] = useFormState(onSendSupportMessageAction, {
        message: ""
    })
    
    const form = useForm<z.infer<typeof sendSupportMessageFormSchema>>({
        resolver: zodResolver(sendSupportMessageFormSchema),
        defaultValues: {
            subject: "",
            message: "",
            ...(state.fields ?? {})
        },
    })

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div>
            <Dialog>
                <DialogTrigger className="w-full shadow-md">
                    <IconButton iconName="mdi:palette" title="Leave a message" onClick={() => {}} />
                </DialogTrigger>
                <DialogContent className="max-w-md w-[90%] rounded-md">
                    <DialogHeader className="mb-4 text-start">
                        <DialogTitle>Leave a message</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-sm text-muted-foreground text-start">
                        We will get back to you shortly.
                    </DialogDescription>
                    <Form {...form}>
                        <form 
                            className="space-y-6"
                            ref={formRef} 
                            action={formAction} 
                            onSubmit={form.handleSubmit(() => formRef.current?.submit())} 
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem  className="flex flex-col">
                                            <Label>Subject</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value
                                                            ? subjects.find(
                                                                (subject) => subject.value === field.value
                                                            )?.label
                                                            : "Select subject"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl> 
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput
                                                    placeholder="Search subject..."
                                                    className="h-9"
                                                    />
                                                    <CommandEmpty>No subject found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {subjects.map((subject) => (
                                                            <CommandItem
                                                                value={subject.label}
                                                                key={subject.value}
                                                                onSelect={() => {
                                                                    form.setValue("subject", subject.value);
                                                                }}
                                                            >
                                                                {subject.label}
                                                                <CheckIcon
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        subject.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Message</Label>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Tell us a bit more..."
                                            className="resize-none"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormSubmitButton title='Send Message' />
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    );
}