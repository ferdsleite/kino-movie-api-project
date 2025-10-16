import { useEffect, useState } from "react";
import Flex from "../template/Flex";
import useMovieAPI from "@/hooks/useMovieAPI";
import mergeClasses from "@/utils/mergeClasses";

interface MovieGenresProps {
    idMovie: string;
    big?: boolean;
}

export default function MovieGenres({ idMovie, big }: MovieGenresProps) {
    const [genres, setGenres] = useState<Genre[]>([]);
    const {getMovieGenres} = useMovieAPI();
    useEffect(() => {
        getMovieGenres(idMovie).then(setGenres)
    }, []);

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
    )
}