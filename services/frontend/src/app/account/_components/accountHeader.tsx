'use client';

import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';
import Notifications from "../../../components/general/notifications";

export default function AccountHeader({ title }: { title: string }) {  // Destructure the props and specify the type of 'title' as string
    const router = useRouter();
    return (
        <header className="flex justify-between items-center p-4 shadow-md mb-8">
            {/* Back Arrow */}
            <Icon
                icon="ep:back"
                className="text-xl text-muted-foreground cursor-pointer"
                onClick={() => {
                    router.back();
                }}
            />
            <h1>{title}</h1>
            {/* Placeholder for Notifications */}
            <Notifications/>
        </header>
    );
}
