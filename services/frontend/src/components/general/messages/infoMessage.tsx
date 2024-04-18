import { Icon } from "@iconify/react";
import { ReactNode } from "react";

interface InfoMessageProps {
    message: ReactNode;
}

export default function InfoMessage({ message }: InfoMessageProps) {
    return (
        <div className="flex items-center w-full bg-info-200 rounded-md p-4 shadow-md">
            <span className="text-info-500 text-2xl mr-4 flex-shrink-0">
                <Icon icon="mdi:information-outline" />
            </span>
            <p className="text-sm text-info-600">
                {message}
            </p>
        </div>
    );
}
