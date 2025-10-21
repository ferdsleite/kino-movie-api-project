'use client';

import { useEffect, useState } from "react";
import Flex from "../template/Flex";
import mergeClasses from "@/utils/mergeClasses";
import Skeleton from "../template/Skeleton";

interface MovieGenresProps {
    idMovie: string;
    big?: boolean;
    genresDefault?: Genre[];
}

export default function MovieGenres({ idMovie, big, genresDefault }: MovieGenresProps) {
    const [genres, setGenres] = useState<Genre[] | null>(null);
 
    useEffect(() => {
        if(genresDefault && genresDefault.length > 0) {
            setGenres(genresDefault)
            return;
        }

        async function fetchGenres() {
            try {
                const res = await fetch(`/api/genres/${idMovie}`);
                if(!res.ok) throw new Error("Failed to fecth genres");
                const data = await res.json();
                setGenres(data);
            }  catch (error) {
                console.error(error);
            }
        }
        fetchGenres();
    }, [idMovie]);

    if(!genres) {
        return (
            <Flex className="flex-wrap justify-start">
                {Array(4)
                    .fill(0)
                    .map((_, i) => {
                        return <Skeleton key={i} className="rounded-lg h-8 w-16" />
                })}
            </Flex>            
        )
    }

    return (
        <Flex className="flex-wrap justify-start">
            {genres.map((genre) => {
                return (
                    <span 
                        key={genre.id} 
                        className={mergeClasses(`bg-red-kino/50 font-semibold
                            backdrop-blur-md p-1 rounded-lg text-xs`,
                            {"text-lg": big},
                    )}>
                        {genre.name}
                    </span>
                )
            })}
        </Flex>
    );
}