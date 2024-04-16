'use client';

import SubmitButton from '@/components/auth/buttons/submitButton';
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
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";


const subjects = [
    { label: "Account", value: "Account" },
    { label: "Feature Request", value: "Feature Request" },
    { label: "General", value: "General" },

] as const;

const FormSchema = z.object({
    subject: z.string().trim().min(1, { message: "Subject must be provided" }),
    message: z.string().trim().min(1, { message: "Please provide a message" }).max(160, {
        message: "Bio must not be longer than 30 characters.",
    }),
})

export default function MessageUsPopover() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        })
    
        function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Support message sent.",
        })
        }
    return (
        <div>
            <Dialog>
                    <DialogTrigger className="flex items-center justify-start w-full bg-white text-blue-500 text-sm font-medium pl-4 pr-4 pt-2 pb-2 rounded hover:bg-gray-200 shadow-md">
                        <Icon icon="material-symbols:contact-support" className="mr-2" />
                        <span>Leave a message</span>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[90%] rounded-md">
                        <DialogHeader className="mb-4">
                            <DialogTitle>Leave a message</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col bg-white rounded-lg p-3">
                                                <FormLabel className="mb-1">Subject</FormLabel>
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
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col bg-white rounded-lg p-3">
                                                <FormLabel className="mb-1">Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                    placeholder="Tell us a bit more..."
                                                    className="resize-none"
                                                    {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <SubmitButton>Send</SubmitButton>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

        </div>
    );
}