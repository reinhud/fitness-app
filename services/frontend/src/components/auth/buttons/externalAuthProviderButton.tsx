import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function ExternalAuthProviderButton({ iconName, title, onClick }: { iconName: string, title: string, onClick: () => void }) {
    return (
        <Button onClick={onClick} className="relative flex border mt-2 gap-4 items-center justify-start bg-white text-black hover:bg-blue-100 font-semi-bold py-2 px-4 rounded w-full">
            <Icon
                icon={iconName}
                className="h-4 w-4"
            />
            {title}
        </Button>
    );
}