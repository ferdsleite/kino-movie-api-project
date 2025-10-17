import useMovieAPI from "@/hooks/useMovieAPI";
import Container from "../template/Container";
import MoviesList from "../movies/MoviesList";
import { useEffect, useState } from "react";

interface AnotherMoviesProps {
    idActor: string;
}

export default function AnotherMovies({ idActor }: AnotherMoviesProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { getAnotherMovies } = useMovieAPI();
    useEffect(() => {
        getAnotherMovies(idActor).then(setMovies)
    }, [])
    return (
        <Container className="my-16 bg-neutral-950 rounded-lg lg:pt-10" >
            <MoviesList movies={movies} title="Filmography"/>
        </Container>
    )
}