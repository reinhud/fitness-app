'use client';

import MessageUsPopover from "@/app/account/help/_components/messageUs";
import IconButton from "@/components/general/buttons/iconButton";
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
import AccountHeader from '../_components/accountHeader';


export default function Help() {

    return (
        <div>
            <AccountHeader title="Help" />
            <main>
                {/* FAQ */}
                <h1 className="font-semibold mb-2">Frequently Asked Questions</h1> 
                <Accordion className='rounded-md shadow-md' type="single" collapsible>
                    <AccordionItem className='pl-2 pr-2' value="item-1">
                        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pl-2 pr-2">
                            You can reset your password by clicking on the &apos;Forgot Password&apos; link on the login page.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='pl-2 pr-2'  value="item-2">
                        <AccordionTrigger>How can i give feedback?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground  pl-2 pr-2">
                            We welcome feedback, so feel free to contact us via the options below.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className='pl-2 pr-2'  value="item-3">
                        <AccordionTrigger>What are the system requirements?</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground  pl-2 pr-2">
                            It should work if you are not using a stone. 
                            If the service doesn&apos;t work, it might be time to update your device. 💩
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Contact */}
                <h1 className="font-semibold mb-2 mt-8">Contact us!</h1> 
                <div className="space-y-2 w-full">
                    <MessageUsPopover />
                    <Dialog>
                        <DialogTrigger className="w-full">
                            <IconButton iconName="mdi:phone" title="Give us a call" onClick={() => {}} />
                        </DialogTrigger>
                        <DialogContent className="max-w-md w-[90%] rounded-md mt-4">
                            <DialogHeader className="mb-4 text-start">
                                <DialogTitle>Give us a call</DialogTitle>    
                            </DialogHeader>
                            <DialogDescription className="text-sm text-muted-foreground text-start">
                                We will try to connect you with customer service to handle your request in person.
                            </DialogDescription>
                            <span className="flex justify-center w-full p-4 text-xl font-bold text-accent-500 hover:cursor-pointer">
                                1-800-123-4567
                            </span>

                        </DialogContent>
                    </Dialog>
                </div>
                
            </main>
        </div>
    );
};
