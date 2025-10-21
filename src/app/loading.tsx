'use client';

import { Clock } from "lucide-react";

export default function Loading() {
    return (
        <div className="absolute w-full top-1/2">
            <Clock size={80} strokeWidth={2} className="text-white animate-spin m-auto" />
        </div>
    )
}