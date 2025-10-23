import CardMovieDetails from "@/components/movies/CardMovieDetails";
import Cast from "@/components/movies/Cast";
import MovieSuggestions from "@/components/movies/MovieSuggestions";
import Wrap from "@/components/template/Wrap";
import { getMovieDetails } from "@/lib/MovieAPI";

interface MovieProps {
  params: Promise<{ id: string }>;
}

export default async function Movie({ params }: MovieProps) {
  const { id } = await params;
  const movieDetails: MovieDetails = await getMovieDetails(String(id));

    return (
        <Wrap>
            <CardMovieDetails movie={movieDetails} />
            <Cast cast={movieDetails.actors} />
            <MovieSuggestions idMovie={String(id)} />
        </Wrap>
    );
}