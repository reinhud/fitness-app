import { Icon } from "@iconify/react";

export default function ButtonWithDescription({ title, icon, description }: { title: string, icon: string, description: string }) {
    return (
        <div className="w-full text-start rounded-md p-4 border shadow-md hover:cursor-pointer">
            <div className="flex items-center mb-2">
                <Icon icon={icon} className="text-accent-500 text-xl" />
                <span className="ml-3 text-base font-semibold">{title}</span>
            </div>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}