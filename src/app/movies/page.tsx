'use client';

import { useEffect, useState } from "react";
import useMovieAPI from "@/hooks/useMovieAPI";
import Wrap from "@/components/template/Wrap";

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const {getLastMovies} = useMovieAPI();
    
    useEffect(() => {
        getLastMovies().then(setMovies)
    },[])

    return <Wrap>
        {JSON.stringify(movies)}
    </Wrap>

}