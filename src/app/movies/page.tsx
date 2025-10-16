'use client';

import { useEffect, useState } from "react";
import useMovieAPI from "@/hooks/useMovieAPI";
import Wrap from "@/components/template/Wrap";
import Carrossel from "@/components/template/Carrossel";
import CardHighlightedMovie from "@/components/movies/CardHighlightedMovie";

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const {getLastMovies} = useMovieAPI();
    
    useEffect(() => {
        getLastMovies().then(setMovies)
    },[])

    return (
        <Wrap>
            <Carrossel slideAutomatic>
                {movies.map((movie) => {
                    return <CardHighlightedMovie movie={movie} key={movie.id} />
                })}
            </Carrossel>
        </Wrap>
    )

}