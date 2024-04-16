'use client';

import AccountHeader from '@/components/account/accountHeader';
import MessageUsPopover from '@/components/account/help/messageUs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const subjects = [
    { label: "Account", value: "Account" },
    { label: "Feedback", value: "Feedback" },
    { label: "Feature Request", value: "Feature Request" },
    { label: "General", value: "General" },

] as const;

const FormSchema = z.object({
    subject: z.string().trim().min(1, { message: "Subject must be provided" }),
    message: z.string().trim().min(1, { message: "Please provide a message" }).max(160, {
        message: "Bio must not be longer than 30 characters.",
    }),
})

export default function Help() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        })
    
        function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Support message sent.",
        })
        }

    return (
        <div className="min-h-screen bg-gray-100">
            <AccountHeader title="Help" />
            <div className='pl-4 pr-4'>
                {/* FAQ */}
                <h1 className="font-semibold mb-2">Frequently Asked Questions</h1> 
                <Accordion className='rounded-md shadow-md bg-white' type="single" collapsible>
                    <AccordionItem className='pl-2 pr-2' value="item-1">
                        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600 pl-2 pr-2">
                            You can reset your password by clicking on the &apos;Forgot Password&apos; link on the login page.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='pl-2 pr-2'  value="item-2">
                        <AccordionTrigger>How can i give feedback?</AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600 pl-2 pr-2">
                            We welcome feedback, so feel free to contact us via the options below.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='pl-2 pr-2'  value="item-3">
                        <AccordionTrigger>What are the system requirements?</AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600 pl-2 pr-2">
                            It should work if you are not using a stone. 
                            If the service doesn&apos;t work, it might be time to update your device. 💩
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Contact */}
                <h1 className="font-semibold mb-2 mt-8">Contact us!</h1> 
                <MessageUsPopover />
                <Dialog>
                    <DialogTrigger className="flex items-center justify-start w-full bg-white text-blue-500 text-sm font-medium pl-4 pr-4 pt-2 pb-2  rounded hover:bg-gray-200 shadow-md">
                        <Icon icon="mdi:support" className="mr-2" />
                        <span>Give us a call</span>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[90%] rounded-md mt-4">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-xl font-semibold">Give us a call</DialogTitle>
                            <DialogDescription className="text-sm text-gray-600">We will try to connect you with customer service to handle your request in person.</DialogDescription>
                        </DialogHeader>
                        <span className="flex justify-center w-full rounded-md p-4 shadow-md text-sm text-blue-500 hover:cursor-pointer">1-800-123-4567</span>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
