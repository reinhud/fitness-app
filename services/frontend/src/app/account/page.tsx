'use client';

import AccountCard from "@/components/account/accountCard";
import AccountHeader from '@/components/account/accountHeader';
import CloseAccountButton from "@/components/account/closeAccountButton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";


export default function Account() {

    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-100">
            <AccountHeader title={"Account"} />

            {/* User Card */}
            <AccountCard />

            {/* Sections */}
            <div className="p-4">
                {/* Account */}
                <h1 className="font-semibold mb-2">Account</h1> 
                <div className="overflow-hidden rounded-md shadow-md">
                    <Button 
                        onClick={() => {router.push('/account/info');}} 
                        className="w-full bg-white text-blue-500 p-4 rounded-none hover:bg-gray-200 justify-start">
                        <Icon icon="mdi:account" className="text-blue-500" />
                        <span className="ml-2">Account Info</span>
                    </Button>
                    <Button 
                        onClick={() => {router.push('/account/security');}} 
                        className="w-full bg-white text-blue-500 p-4 rounded-none hover:bg-gray-200 justify-start">
                        <Icon icon="mdi:security" className="text-blue-500" />
                        <span className="ml-2">Login and Security</span>
                    </Button>
                    <Button 
                        onClick={() => {router.push('/account/privacy');}} 
                        className="w-full bg-white text-blue-500 p-4 rounded-none hover:bg-gray-200 justify-start">
                        <Icon icon="carbon:view-filled" className="text-blue-500" />
                        <span className="ml-2">Data & Privacy</span>
                    </Button>
                    <Button 
                        onClick={() => {router.push('/account/notifications');}} 
                        className="w-full bg-white text-blue-500 p-4 rounded-none hover:bg-gray-200 justify-start">
                        <Icon icon="mdi:bell" className="text-blue-500" />
                        <span className="ml-2">Notification Preferences</span>
                    </Button>
                </div>
                

                {/* App */}
                <h2 className="font-semibold mt-8 mb-2">App</h2>
                <Dialog>
                    <DialogTrigger className="flex items-center justify-start w-full bg-white text-blue-500 text-sm font-medium pl-4 pr-4 pt-2 pb-2 rounded hover:bg-gray-200 shadow-md">
                        <Icon icon="mdi:palette" className="mr-2" />
                        <span>Themes</span>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[90%] rounded-md">
                        <DialogHeader className="mb-4">
                                <DialogTitle className="text-xl font-semibold">Change Theme</DialogTitle>
                                <DialogDescription className="text-sm text-gray-600">Toggle dark mode for a better viewing experience.</DialogDescription>
                        </DialogHeader>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Dark Mode</span>
                                <Switch
                                    checked={true}
                                    onCheckedChange={() => {}}
                                    className="data-[state=checked]:bg-blue-500" 
                                />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* About */}
                <h2 className="font-semibold mt-8 mb-2">About</h2>
                <Button 
                onClick={() => {router.push('/account/help');}} 
                className="w-full bg-white text-blue-500 p-4 rounded hover:bg-gray-200 justify-start shadow-md">
                    <Icon icon="mdi:help-circle" className="text-blue-500" />
                    <span className="ml-2">Help</span>
                </Button>
                <Button 
                onClick={() => {router.push('/account/about');}} 
                className="w-full bg-white text-blue-500 p-4 rounded hover:bg-gray-200 justify-start shadow-md">
                    <Icon icon="mdi:about" className="text-blue-500" />
                    <span className="ml-2">About</span>
                </Button>
                
                {/* Separator */}
                <div className="mt-8 mb-8 border-t-2 border-gray-300"></div>

                {/* Close Account and Log Out Buttons */}
                <CloseAccountButton />
                <Button className="w-full mt-4 bg-white shadow-md text-blue-500 p-4 rounded hover:bg-gray-200 justify-start">
                    <Icon icon="mdi:logout" className="text-blue-500" />
                    <span className="ml-2">Log Out</span>
                </Button>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center p-4 mt-8">
                <a href="/account/legal" className="text-blue-500 mb-2">Legal Agreements</a>
                <p className="text-sm text-gray-500 opacity-50">Version 1.0.0</p>
            </div>

        </div>
    );
}
