import useMovieAPI from "@/hooks/useMovieAPI";
import Container from "../template/Container";
import Title from "../template/Title";
import MoviesList from "./MoviesList";
import { useEffect, useState } from "react";

interface MovieSuggestionsProps {
    idMovie: string;
}

export default function MovieSuggestions({ idMovie }: MovieSuggestionsProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const {getSimilarMovies} = useMovieAPI();
    useEffect(() => {
        getSimilarMovies(idMovie).then(setMovies)
    }, [])
    return (
        <Container className="my-16 bg-neutral-950 rounded-lg lg:pt-10" >
            <MoviesList movies={movies} title="Recommended Movies"/>
        </Container>
    )
}