'use client';

import Link from "next/link";
import Flex from "./Flex";
import Wrap from "./Wrap";
import { Popcorn } from "lucide-react";

export default function Header() {
    return (
        <Wrap className="bg-neutral-900">
            <header className="p-4 px-10 md:px-32">
                <Flex className="justify-between">
                    <Link 
                        href="/" 
                        className="font-bold px-4 py-2 bg-red-kino hover:bg-red-kino/80 flex gap-1 items-center justify-center rounded-lg"
                    >
                        <Popcorn size={20}/>
                        Kino
                    </Link>
                    <Link 
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        className="font-bold text-white px-4 hover:brightness-75"
                    >
                        The Movie DB
                    </Link>
                </Flex>
            </header>
        </Wrap>
    )
}