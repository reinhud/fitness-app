'use client';

import AccountHeader from '@/components/account/accountHeader';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";

export default function LoginAndSecurity() {
    return (
        <div className="min-h-screen bg-gray-100">
            <AccountHeader title={"Login & Security"} />
            <div className="pl-4 pr-4">
                <Dialog>
                    <DialogTrigger className="flex items-center justify-start w-full bg-white text-blue-500 text-sm font-medium pl-4 pr-4 pt-2 pb-2  rounded hover:bg-gray-200 shadow-md">
                        <Icon icon="mdi:password-add" className="mr-2" />
                        <span>Change Password</span>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[90%] rounded-md mt-4">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-xl font-semibold">Change Password</DialogTitle>
                            <DialogDescription className="text-sm text-gray-600">Change your password to keep your account secure.</DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full border-gray-300 border rounded-md p-2"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full border-gray-300 border rounded-md p-2"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full border-gray-300 border rounded-md p-2"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
