import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@iconify/react";


const notifications = []; // Replace with actual notifications data

export default function Notifications() {

    return (
        <Dialog>
            <DialogTrigger className="">
                <Icon
                    icon="ic:round-notifications"
                    className="text-xl text-muted-foreground cursor-pointer"
                    onClick={() => {}}
                />
            </DialogTrigger>
            <DialogContent className="max-w-md w-[90%] rounded-md mt-4">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-semibold">Notifications</DialogTitle>
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                        Jokester began sneaking into the castle in the middle of the night and leaving
                        jokes all over the place: under the king&apos;s pillow, in his soup, even in the
                        royal toilet. The king was furious, but he couldn&apos;t seem to stop Jokester. And
                        then, one day, the people of the kingdom discovered that the jokes left by
                        Jokester were so funny that they couldn&apos;t help but laugh. And once they
                        started laughing, they couldn&apos;t stop.
                    </ScrollArea>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
