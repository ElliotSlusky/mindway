"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function SideNavButton({
    children,
    className,
    to,
    icon,
    ...props
}: {
    icon: ReactNode;
    children: ReactNode;
    className?: string;
    to: string;
}) {
    const pathname = usePathname();
    const isActive = pathname === to;
    return (
        <Link href={to}>
            <button
                {...props}
                className={twMerge(
                    "flex gap-6 w-full font-bold rounded-lg bg-white px-4 group py-3 leading-6 text-black hover:bg-blue-50 hover:text-blue-500",
                    isActive && "text-blue-600 bg-blue-100",
                    className
                )}
            >
                <span
                    className={twMerge(
                        "text-slate-500 group-hover:text-blue-500",
                        isActive && "text-blue-600"
                    )}
                >
                    {icon}
                </span>
                {children}
            </button>
        </Link>
    );
}
