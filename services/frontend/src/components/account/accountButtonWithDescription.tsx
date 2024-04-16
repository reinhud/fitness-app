import { Icon } from "@iconify/react";

export default function AccountButtonWithDescription({ title, icon, description }: { title: string, icon: string, description: string }) {
    return (
        <div className="w-full bg-white rounded-md p-4 hover:bg-gray-200 shadow-md hover:cursor-pointer">
            <div className="flex items-center justify-start mb-2">
                <Icon icon={icon} className="text-blue-500 text-xl" />
                <span className="ml-3 text-base font-semibold">{title}</span>
            </div>
            <p className="text-sm text-gray-600">
                {description}
            </p>
        </div>
    );
}