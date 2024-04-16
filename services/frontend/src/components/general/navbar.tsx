"use client";

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    // Define navigation items
    const navItems = [
        { label: 'Home', icon: 'fa-solid:home', url: '/' },
        { label: 'About', icon: 'fa-solid:info-circle', url: '/about' },
        { label: 'Account', icon: 'fa-solid:envelope', url: '/account' },
    ];

    return (
        <nav className="flex flex-col sm:flex-row bg-white shadow-md">
            {/* Brand Name */}
            <div className="flex-grow text-center sm:text-left text-2xl font-bold text-black p-4 hidden sm:block">
                MacroSoft
            </div>

            {/* Mobile */}
            <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
                <ul className="flex justify-around py-2">
                    {navItems.map((item) => (
                        <Link href={item.url} key={item.url}>
                            <div className={`text-black hover:text-blue-500 ${pathname === item.url ? 'font-bold' : ''}`}>
                                <Icon icon={item.icon} className="h-6 w-6" />
                            </div>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Web */}
            <div className="flex-grow hidden sm:flex justify-end items-center px-4 py-2 space-x-4">
                {navItems.map((item) => (
                    <Link href={item.url} key={item.url}>
                        <div className={`text-black hover:text-blue-500 ${pathname === item.url ? 'font-bold' : ''}`}>
                            <span className="hidden sm:inline-block ml-2">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
