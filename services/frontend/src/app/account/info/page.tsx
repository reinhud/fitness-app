'use client';

import AccountHeader from '@/components/account/accountHeader';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import Dropzone from 'react-dropzone';

export default function AccountInfo() {

    return (
        <div className="min-h-screen bg-gray-100">
            <AccountHeader title={"Account Info"} />

            {/* Avatar */}
            <div className="relative flex justify-center items-center">
                <div className="relative">
                    <Avatar className="w-[7rem] h-[7rem] shadow-md border-2 border-gray-200">
                        <AvatarImage src={"/img/default_user_avatar.jpg"} />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    {/* Icon at Bottom Right as Button */}
                    <Dialog>
                        <DialogTrigger className="absolute bottom-0 right-0 mb-3 mr-[-10px] bg-white rounded-full p-2 shadow-md border-2 border-blue-500 z-20 transition-transform duration-300 hover:scale-110">
                            <Icon icon="ic:round-camera-alt" className="text-blue-500" />
                        </DialogTrigger>
                        <DialogContent className="max-w-md w-[90%] rounded-md">
                            <DialogHeader className="mb-4">
                                <DialogTitle>Change Avatar</DialogTitle>
                            </DialogHeader>
                            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                {({ getRootProps, getInputProps }) => (
                                    <div 
                                        {...getRootProps()} 
                                        className="relative overflow-hidden"
                                        style={{ paddingTop: '100%' }}
                                    >
                                        <div 
                                            className="absolute top-0 left-0 w-full h-full p-4 border-dashed border-2 border-gray-300 rounded-md text-center flex flex-col items-center justify-center hover:cursor-pointer"
                                        >   
                                            <Icon icon="ic:round-camera-alt" className="text-blue-500 text-4xl mb-2 size-40" />
                                            <input {...getInputProps()} />
                                            <p>Drag &apos;n&apos; drop your profile picture here, or click to select files</p>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>

                        </DialogContent>
                    </Dialog>

                </div>
            </div>


            {/* User Info */}
            <div className="p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Username */}
                    <div className="flex justify-between items-center">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <p className="text-gray-700">JohnDoe</p>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <Icon icon="lucide:edit" className="text-blue-500 cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent className="max-w-md w-[90%] rounded-md">
                                <DialogHeader className="mb-4">
                                    <DialogTitle>Change Username</DialogTitle>
                                </DialogHeader>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            New Username
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 border rounded-md p-2"
                                            placeholder="Enter new username"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Separator */}
                    <div className="border-b border-gray-300 mb-4 mt-4"></div>

                    {/* Email */}
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <p className="text-gray-700">jondoe@example.com</p>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <Icon icon="lucide:edit" className="text-blue-500 cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent className="max-w-md w-[90%] rounded-md">
                                <DialogHeader className="mb-4">
                                    <DialogTitle>Change Email</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    We will send you a confirmation email to verify your new email address.
                                </DialogDescription>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            New Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full border-gray-300 border rounded-md p-2"
                                            placeholder="Enter new email"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                </div>
            </div>
        </div>
    );
}
