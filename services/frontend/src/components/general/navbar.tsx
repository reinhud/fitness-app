"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    // Define navigation items
    const navItems = [
        { label: 'Home', icon: 'ion:home', url: '/' },
        { label: 'Foods', icon: 'fluent:food-24-filled', url: '/foods' },
        { label: 'Exercises', icon: 'fa-solid:dumbbell', url: '/exercises' },
        { label: 'Statistics', icon: 'fa-solid:chart-bar', url: '/statistics' },
    ];

    return (
        <nav className="flex sm:flex-row bg-white shadow-md w-full">
            {/* Brand Name */}
            <div className="flex-grow text-center sm:text-left text-2xl font-bold text-black p-4 hidden sm:block">
                MacroSoft
            </div>

            {/* Mobile */}
            <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 rounded-t-lg">
                <ul className="flex justify-around py-3">
                    {navItems.map((item) => (
                        <Link href={item.url} key={item.url}>
                            <div className={`flex items-center text-black hover:text-blue-500 ${pathname === item.url ? 'text-blue-500 font-bold' : ''}`}>
                                <Icon icon={item.icon} className="h-8 w-8" />
                            </div>
                        </Link>
                    ))}
                    
                    <Link href={'/account'}>
                        <div className={`flex items-center text-black hover:text-blue-500`}>
                            <Icon icon={'carbon:user-filled'} className="h-8 w-8" />
                        </div>
                    </Link>
                </ul>
            </div>

            {/* Web */}
            <div className="flex-grow hidden sm:flex justify-end items-center px-4 py-2 space-x-4">
                {navItems.map((item) => (
                    <Link href={item.url} key={item.url}>
                        <div className={`text-black hover:text-blue-500 ${pathname === item.url ? 'text-blue-500 font-bold' : ''}`}>
                            <span className="hidden sm:inline-block ml-2">{item.label}</span>
                        </div>
                    </Link>
                ))}
                <Link href={'/account'}>
                    <Avatar className="size-6 shadow-md border-2 border-gray-200">
                        <AvatarImage src={"/img/default_user_avatar.jpg"} />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>  
                </Link>
            </div>
        </nav>
    );
}
