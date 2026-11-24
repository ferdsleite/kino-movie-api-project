'use client';

import { useState } from "react";
import Flex from "./Flex";
import Image from "next/image";
import mergeClasses from "@/utils/mergeClasses";

interface ImageWithFallbackProps {
    url: string;
    imgAlt: string;
    className?: string;
    children: React.ReactNode;
}

export default function ImageWithFallback({ url, imgAlt, className, children }:ImageWithFallbackProps) {
    // Use the image's own error event instead of downloading every image twice with fetch()
    const [failed, setFailed] = useState(false);

    if(failed || !url) {
        return <Flex col className="h-full w-full absolute -z-30">{children}</Flex>
    }

    return (
        <Image
            fill
            alt={imgAlt}
            src={url}
            className={mergeClasses("object-cover", className)}
            sizes="80vw"
            onError={() => setFailed(true)}
        />
    )
}
