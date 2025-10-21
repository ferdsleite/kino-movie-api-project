'use client';

import mergeClasses from "@/utils/mergeClasses";

interface ContainerProps {
    children: React.ReactNode,
    className?: string,
    bigPadding?: boolean 
}
export default function Container({ children, className, bigPadding }:ContainerProps) {
    return (
        <div className={mergeClasses(
            "w-full max-w-screen-xl mx-auto p-4",
            {"p-20": bigPadding},
            className
        )}>
            {children}
        </div>
    );
}