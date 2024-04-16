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

export default function CloseAccountButton() {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex items-center justify-start w-full bg-white text-blue-500 text-sm font-medium pl-4 pr-4 pt-2 pb-2  rounded hover:bg-gray-200 shadow-md">
                <Icon icon="mdi:account-off" className="mr-2" />
                <span>Close Account</span>
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
    )
}

