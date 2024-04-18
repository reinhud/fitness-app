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
import IconButton from "../../../components/general/buttons/iconButton";

export default function CloseAccountButton() {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full">
                <IconButton iconName="mdi:account-off" title="Close Account" onClick={() => {}} />
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md w-[90%] rounded-md">
                <AlertDialogHeader>
                    <AlertDialogTitle  className="mb-4 text-start">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription  className="text-start">
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='font-bold' >Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive-500 hover:bg-destructive-700 font-bold py-2 px-4 rounded w-full">
                        Continue
                    </AlertDialogAction> 
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

