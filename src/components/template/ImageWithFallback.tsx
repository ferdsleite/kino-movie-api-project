'use client';

import { useEffect, useState } from "react";
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
    const [defaultImage, setDefaultImage] = useState(false);

    useEffect(() => {
        fetch(url)
        .then(response => setDefaultImage(!response.ok))
    }, []);

    if(defaultImage || !url) {
        return <Flex col className="h-full w-full absolute -z-30">{children}</Flex>
    }

    return (
        <Image
            fill
            alt={imgAlt}
            src={url}
            className={mergeClasses("object-cover", className)}
            sizes="80vw"
        />
    )
}