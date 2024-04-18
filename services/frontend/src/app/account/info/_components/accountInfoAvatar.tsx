import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import Dropzone from 'react-dropzone';


export default function AccountInfoAvatar() {
    return (
        <div className="relative flex justify-center items-center">
            <div className="relative">
                <Avatar className="w-[7rem] h-[7rem] shadow-md border-2">
                    <AvatarImage src={"/img/default_user_avatar.jpg"} />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                {/* Icon at Bottom Right as Button */}
                <Dialog>
                    <DialogTrigger className="bg-background absolute bottom-0 right-0 mb-3 mr-[-10px] rounded-full p-2 shadow-md border-2 z-20 transition-transform duration-300 hover:scale-110">
                        <Icon icon="ic:round-camera-alt" className="text-accent-500" />
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[90%] rounded-md">
                        <DialogHeader className="mb-4">
                            <DialogTitle>Update Avatar</DialogTitle>
                        </DialogHeader>
                        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <div 
                                    {...getRootProps()} 
                                    className="relative overflow-hidden"
                                    style={{ paddingTop: '100%' }}
                                >
                                    <div 
                                        className="absolute top-0 left-0 w-full h-full p-4 border-dashed border-2 rounded-md text-center flex flex-col items-center justify-center hover:cursor-pointer"
                                    >   
                                        <Icon icon="ic:round-camera-alt" className="text-accent-500 text-4xl mb-2 size-40" />
                                        <input {...getInputProps()} />
                                        <p className="text-muted-foreground">Drag &apos;n&apos; drop your profile picture here, or click to select files</p>
                                    </div>
                                </div>
                            )}
                        </Dropzone>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}