'use client';

import AccountButtonWithDescription from '@/components/account/accountButtonWithDescription';
import AccountHeader from '@/components/account/accountHeader';
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
import { Icon } from "@iconify/react";

export default function DataAndPrivacy() {
    return (
        <div className="min-h-screen bg-gray-100">
            <AccountHeader title="Data and Privacy" />
            
            <div className="pl-4 pr-4">
                {/* Privacy Section */}
                <h2 className="font-semibold mb-2">Manage your privacy</h2>
                <div className="flex items-center w-full bg-blue-200 rounded-md p-4 shadow-md">
                    <span className="text-blue-500 text-2xl mr-4">
                        <Icon icon="mdi:information-outline" />
                    </span>
                    <p className="text-sm text-gray-600">
                        Currently, we do not collect any usage data from you.
                        We do not use cookies or any other tracking technologies.
                        We do not share any data with third parties.
                    </p>
                </div>


                {/* Data Section */}
                <h2 className="font-semibold mt-8 mb-2">Manage your data</h2>
                <div className='space-y-4'>
                    <AccountButtonWithDescription 
                        title="Download your data"
                        icon="material-symbols:download"
                        description="Download a copy of your data to keep it safe or use it with other services."
                    />
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <AccountButtonWithDescription 
                                title="Delete your data"
                                icon="material-symbols:delete"
                                description="Ask us to delete your data. To do this, we will
                                need to close your account."
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md w-[90%] rounded-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel >Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                
            </div>
            
            

        </div>
    );
}