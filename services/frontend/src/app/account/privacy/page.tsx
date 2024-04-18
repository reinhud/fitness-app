'use client';

import ButtonWithDescription from '@/components/general/buttons/buttonWithDescription';
import InfoMessage from '@/components/general/messages/infoMessage';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AccountHeader from '../_components/accountHeader';

export default function DataAndPrivacy() {
    return (
        <>
            <AccountHeader title="Data and Privacy" />    
            <main>
                <InfoMessage 
                message='We take your privacy seriously. We do not collect any usage data from you. We do not use cookies or any other tracking technologies. We do not share any data with third parties.'
                />
                {/* Data Section */}
                <h2 className="font-semibold mt-8 mb-2">Manage your data</h2>
                <div className='space-y-4'>
                    <ButtonWithDescription 
                        title="Download your data"
                        icon="material-symbols:download"
                        description="Download a copy of your data to keep it safe or use it with other services."
                    />
                    <AlertDialog>
                        <AlertDialogTrigger className=''>
                            <ButtonWithDescription 
                                title="Delete your data"
                                icon="material-symbols:delete"
                                description="Ask us to delete your data. To do this, we will
                                need to close your account."
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md w-[90%] rounded-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="mb-4 text-start">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-start">
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='font-bold'>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive-500 hover:bg-destructive-700 font-bold py-2 px-4 rounded w-full">
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>          
            </main>
        </>
    );
}