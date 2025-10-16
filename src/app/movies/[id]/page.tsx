'use client';

import CardMovieDetails from "@/components/movies/CardMovieDetails";
import Wrap from "@/components/template/Wrap";
import useMovieAPI from "@/hooks/useMovieAPI";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Movie() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const {getMovieDetails} = useMovieAPI();

    useEffect(() => {
        getMovieDetails(String(id)).then(setMovieDetails)
    }, []);

    return (
        <Wrap>
            {movieDetails && <CardMovieDetails movie={movieDetails} />}
        </Wrap>
    );
}