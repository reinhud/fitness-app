import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function IconButton({
    iconName,
    title,
    onClick,
    className = "",
}: {
    iconName: string;
    title: string;
    onClick: () => void;
    className?: string;
}) {
    return (
        <Button
        onClick={onClick}
        className={`relative flex border gap-4 items-center 
            justify-start font-semi-bold py-2 px-4 rounded-md 
            bg-primary-foreground text-primary-background 
            hover:bg-accent-200 w-full ${className}`}
        >
        <Icon icon={iconName} className="size-4" />
        {title}
        </Button>
    );
}
