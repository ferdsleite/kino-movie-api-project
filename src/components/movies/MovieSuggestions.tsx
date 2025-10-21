import { getSimilarMovies } from "@/lib/MovieAPI";
import Container from "../template/Container";
import MoviesList from "./MoviesList";

interface MovieSuggestionsProps {
    idMovie: string;
}

export default async function MovieSuggestions({ idMovie }: MovieSuggestionsProps) {
    const movies: Movie[] = await getSimilarMovies(idMovie);

    return (
        <Container className="my-16 bg-neutral-950 rounded-lg lg:pt-10" >
            <MoviesList movies={movies} title="Recommended Movies"/>
        </Container>
    );
}