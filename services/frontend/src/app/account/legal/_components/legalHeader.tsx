'use client';

import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';

export default function LegalHeader({ title }: { title: string }) {
    const router = useRouter();
    return(
        <header className="flex justify-between items-center p-4 shadow-md mb-8">
            {/* Back Arrow */}
            <Icon
                icon="ep:back"
                className="text-xl text-muted-foreground cursor-pointer"
                onClick={() => {
                    router.back();
                }}
            />
            {/* Title */}
            <h1>{title}</h1>
            {/* Placeholder for right content */}
            <div></div>
        </header>
    )
}