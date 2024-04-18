'use client';

import IconButton from "@/components/general/buttons/iconButton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import AccountCard from "./_components/accountCard";
import AccountHeader from "./_components/accountHeader";
import CloseAccountButton from "./_components/closeAccountButton";


export default function Account() {

    const router = useRouter();
    return (
        <div>
            <AccountHeader title={"Account"} />

            {/* User Card */}
            <AccountCard />

            {/* Sections */}
            <main>
                {/* Account */}
                <h1 className="font-semibold mb-2">Account</h1> 
                <div className="w-full overflow-hidden rounded-md shadow-md border">
                    <IconButton
                        className="border-none rounded-none"
                        iconName="mdi:account"
                        title="Account Info"
                        onClick={() => {router.push('/account/info');}}
                    />
                    <IconButton
                        className="border-none rounded-none"
                        iconName="mdi:security"
                        title="Login and Security"
                        onClick={() => {router.push('/account/security');}}
                    />
                    <IconButton
                        className="border-none rounded-none"
                        iconName="carbon:view-filled"
                        title="Data & Privacy"
                        onClick={() => {router.push('/account/privacy');}}
                    />
                    <IconButton
                        className="border-none rounded-none"
                        iconName="mdi:bell"
                        title="Notification Preferences"
                        onClick={() => {router.push('/account/notifications');}}
                    />
                </div>
                

                {/* App */}
                <h2 className="font-semibold mt-8 mb-2">App</h2>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <IconButton
                            iconName="mdi:palette"
                            title="Themes"
                            onClick={() => {}}
                        />
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-md w-[90%] rounded-md">
                        <DialogHeader className="mb-4 text-start">
                                <DialogTitle>Change Theme</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="text-sm text-muted-foreground text-start">
                            Toggle dark mode for a better viewing experience.
                        </DialogDescription>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">Dark Mode</span>
                            <Switch
                                checked={true}
                                onCheckedChange={() => {}}
                                className="data-[state=checked]:bg-accent-800 data-[state=unchecked]:bg-accent-200" 
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* About */}
                <h2 className="font-semibold mt-8 mb-2">About</h2>
                <div className="overflow-hidden rounded-md shadow-md w-full border">
                    <IconButton
                        className="border-none rounded-none"
                        iconName="mdi:help-circle"
                        title="Help"
                        onClick={() => {router.push('/account/help');}}
                    />
                    <IconButton
                        className="border-none rounded-none"
                        iconName="mdi:about"
                        title="About"
                        onClick={() => {router.push('/account/about');}}
                    />
                </div>
                
                
                {/* Separator */}
                <div className="mt-8 mb-8 border-t-2 border-muted"></div>
                

                {/* Close Account and Log Out Buttons */}
                <div className="space-y-2 w-full">
                    <CloseAccountButton />

                    <IconButton
                        iconName="mdi:logout"
                        title="Log Out"
                        onClick={() => {}}
                    />
                </div>
                
            </main>

            {/* Footer */}
            <div className="flex flex-col items-center p-4 mt-8">
                <a href="/account/legal" className="text-accent-500 mb-2">Legal Agreements</a>
                <p className="text-sm text-gray-500 opacity-50">Version 1.0.0</p>
            </div>

        </div>
    );
}
